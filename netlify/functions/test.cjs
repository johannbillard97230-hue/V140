exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok: true,
      env: {
        hasApiKey: !!process.env.MOLLIE_API_KEY,
        hasSiteUrl: !!process.env.SITE_URL,
      },
    }),
  };
};
