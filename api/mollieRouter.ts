import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { createMollieClient } from "@mollie/api-client";

const apiKey = process.env.MOLLIE_API_KEY || "";
const mollieClient = createMollieClient({ apiKey });

// Helper: build Mollie payment description from booking data
function buildDescription(data: {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  days: number;
}): string {
  return `Parking Free Day Parking Beauvais — ${data.firstName} ${data.lastName} — ${data.days} jours du ${data.startDate} au ${data.endDate}`;
}

export const mollieRouter = createRouter({
  createPayment: publicQuery
    .input(
      z.object({
        amount: z.number().positive(),
        currency: z.string().default("EUR"),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        licensePlate: z.string().optional(),
        carModel: z.string().optional(),
        startDate: z.string(), // dd/MM/yyyy
        endDate: z.string(),
        days: z.number(),
        startTime: z.string(),
        endTime: z.string(),
        travelers: z.number().default(1),
        bags: z.number().default(0),
        billingAddress: z.string(),
        billingPostalCode: z.string(),
        billingCity: z.string(),
        parkingType: z.enum(["indoor", "outdoor"]).default("outdoor"),
      })
    )
    .mutation(async ({ input }) => {
      if (!apiKey) {
        throw new Error("MOLLIE_API_KEY is not configured");
      }

      // Build description
      const description = buildDescription({
        firstName: input.firstName,
        lastName: input.lastName,
        startDate: input.startDate,
        endDate: input.endDate,
        days: input.days,
      });

      // Build redirect URL with booking data encoded
      const baseUrl = process.env.SITE_URL || "https://www.freedayparkingbeauvais.com";
      const redirectUrl = `${baseUrl}/success`;

      try {
        const payment = await mollieClient.payments.create({
          amount: {
            currency: input.currency,
            value: input.amount.toFixed(2),
          },
          description,
          redirectUrl,
          webhookUrl: `${baseUrl}/api/mollie/webhook`,
          metadata: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            licensePlate: input.licensePlate,
            carModel: input.carModel,
            startDate: input.startDate,
            endDate: input.endDate,
            days: input.days,
            startTime: input.startTime,
            endTime: input.endTime,
            travelers: input.travelers,
            bags: input.bags,
            billingAddress: input.billingAddress,
            billingPostalCode: input.billingPostalCode,
            billingCity: input.billingCity,
            parkingType: input.parkingType,
          },
        });

        return {
          checkoutUrl: payment.getCheckoutUrl(),
          paymentId: payment.id,
        };
      } catch (error: any) {
        console.error("Mollie payment creation failed:", error);
        throw new Error(`Payment creation failed: ${error.message}`);
      }
    }),

  getPayment: publicQuery
    .input(z.object({ paymentId: z.string() }))
    .query(async ({ input }) => {
      if (!apiKey) {
        throw new Error("MOLLIE_API_KEY is not configured");
      }
      try {
        const payment = await mollieClient.payments.get(input.paymentId);
        return {
          id: payment.id,
          status: payment.status,
          amount: payment.amount,
          description: payment.description,
          metadata: payment.metadata,
          paidAt: payment.paidAt,
        };
      } catch (error: any) {
        throw new Error(`Failed to get payment: ${error.message}`);
      }
    }),
});
