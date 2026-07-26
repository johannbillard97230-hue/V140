import type { Handler } from "@netlify/functions";
import { createMollieClient } from "@mollie/api-client";

const apiKey = process.env.MOLLIE_API_KEY || "";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const params = new URLSearchParams(event.body || "");
    const paymentId = params.get("id");

    if (!paymentId || !apiKey) {
      return { statusCode: 400, body: "Missing payment ID or API key" };
    }

    const mollieClient = createMollieClient({ apiKey });
    const payment = await mollieClient.payments.get(paymentId);

    console.log("Webhook received for payment:", payment.id, "Status:", payment.status);

    // Here you could store the payment status in a database
    // or send an email notification

    return { statusCode: 200, body: "OK" };
  } catch (error: any) {
    console.error("Webhook error:", error);
    return { statusCode: 500, body: "Error processing webhook" };
  }
};
