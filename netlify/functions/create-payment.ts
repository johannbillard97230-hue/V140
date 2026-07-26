import type { Handler } from "@netlify/functions";

const API_KEY = (process.env.MOLLIE_API_KEY || "").trim();
const SITE_URL = (process.env.SITE_URL || "").trim();

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  try {
    // === LOG EVERYTHING ===
    console.log("=== FUNCTION CALLED ===");
    console.log("HTTP Method:", event.httpMethod);
    console.log("Raw body:", event.body);
    console.log("SITE_URL env:", SITE_URL);
    console.log("API_KEY configured:", !!API_KEY);

    const body = JSON.parse(event.body || "{}");
    console.log("Parsed body:", JSON.stringify(body, null, 2));

    const { amount, description, metadata } = body;

    // === VALIDATE amount.value ===
    console.log("amount.value:", amount?.value);
    console.log("amount.value type:", typeof amount?.value);
    console.log("amount.currency:", amount?.currency);

    let valueStr: string;
    if (typeof amount?.value === "string") {
      valueStr = amount.value.replace(",", ".");
    } else if (typeof amount?.value === "number") {
      valueStr = amount.value.toFixed(2);
    } else {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "amount.value must be string or number" }) };
    }

    console.log("Formatted valueStr:", valueStr);

    // Validate pattern XX.XX
    if (!/^\d+\.\d{2}$/.test(valueStr)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: `Bad format: "${valueStr}"` }) };
    }

    // === VALIDATE ENV ===
    if (!API_KEY) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "MOLLIE_API_KEY not set" }) };
    }
    if (!SITE_URL) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "SITE_URL not set" }) };
    }

    // === BUILD URLS ===
    const redirectUrl = `${SITE_URL}/success`;
    console.log("redirectUrl:", redirectUrl);

    if (!redirectUrl.startsWith("https://")) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "SITE_URL must be https" }) };
    }

    // === BUILD DESCRIPTION ===
    const desc = (description || "Parking Beauvais").replace(/[^a-zA-Z0-9\s\-.,]/g, "").substring(0, 255);
    console.log("Description:", desc);

    // === BUILD PAYLOAD ===
    const payload: any = {
      amount: { currency: "EUR", value: valueStr },
      description: desc,
      redirectUrl: redirectUrl,
    };

    // Only add metadata if it's a flat object of strings
    if (metadata && typeof metadata === "object") {
      const safeMeta: Record<string, string> = {};
      for (const [key, val] of Object.entries(metadata)) {
        safeMeta[key] = String(val);
      }
      payload.metadata = safeMeta;
    }

    console.log("=== PAYLOAD TO MOLLIE ===");
    console.log(JSON.stringify(payload, null, 2));

    // === CALL MOLLIE ===
    const resp = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();

    console.log("=== MOLLIE RESPONSE ===");
    console.log("Status:", resp.status);
    console.log("Body:", JSON.stringify(data, null, 2));

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers,
        body: JSON.stringify({
          error: data.detail || data.title || "Mollie error",
          field: data.field,
          // Return what we sent for comparison
          sent: payload,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        paymentId: data.id,
        checkoutUrl: data._links?.checkout?.href,
      }),
    };

  } catch (e: any) {
    console.error("CRASH:", e);
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
