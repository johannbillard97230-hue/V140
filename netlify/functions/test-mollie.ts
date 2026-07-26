import type { Handler } from "@netlify/functions";

const API_KEY = (process.env.MOLLIE_API_KEY || "").trim();
const SITE_URL = process.env.SITE_URL || "";

export const handler: Handler = async () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  // Step 1: Verify env vars
  if (!API_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "MOLLIE_API_KEY missing" }) };
  }
  if (!SITE_URL) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "SITE_URL missing" }) };
  }

  // Step 2: Build minimal payload (only required fields)
  const payload = {
    amount: {
      currency: "EUR",
      value: "25.00",
    },
    description: "Test payment",
    redirectUrl: `${SITE_URL}/success`,
  };

  // Step 3: Call Mollie API
  try {
    const resp = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();

    return {
      statusCode: resp.status,
      headers,
      body: JSON.stringify({
        mollieStatus: resp.status,
        mollieOk: resp.ok,
        response: data,
        debug: {
          apiKeyPrefix: API_KEY.substring(0, 4),
          apiKeyLength: API_KEY.length,
          siteUrl: SITE_URL,
          sentPayload: payload,
        },
      }),
    };
  } catch (e: any) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
