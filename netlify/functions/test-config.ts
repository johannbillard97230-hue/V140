import type { Handler } from "@netlify/functions";

const API_KEY = process.env.MOLLIE_API_KEY || "";
const SITE_URL = process.env.SITE_URL || "";

export const handler: Handler = async () => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  // Test 1: Check env vars
  const hasApiKey = !!API_KEY;
  const hasSiteUrl = !!SITE_URL;
  const apiKeyPrefix = API_KEY ? API_KEY.substring(0, 8) : null;
  const apiKeyLength = API_KEY ? API_KEY.trim().length : 0;
  const isHttps = SITE_URL.startsWith("https://");

  // Test 2: Call Mollie API to verify key works
  let mollieTest = null;
  try {
    const resp = await fetch("https://api.mollie.com/v2/payments?limit=1", {
      headers: { Authorization: `Bearer ${API_KEY.trim()}` },
    });
    mollieTest = {
      status: resp.status,
      ok: resp.ok,
    };
  } catch (e: any) {
    mollieTest = { error: e.message };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      env: {
        hasApiKey,
        hasSiteUrl,
        siteUrl: SITE_URL,
        apiKeyPrefix,
        apiKeyLength,
        isHttps,
      },
      mollieConnection: mollieTest,
      message: hasApiKey && hasSiteUrl && isHttps
        ? "Config looks OK. Check mollieConnection status."
        : "FIX NEEDED: Check the false values above.",
    }),
  };
};
