import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { app } from "../../api/serverless";

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const url = new URL(event.rawUrl);
  
  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: new Headers(
      Object.entries(event.headers).reduce((acc, [k, v]) => {
        if (v !== undefined && v !== null) acc[k] = String(v);
        return acc;
      }, {} as Record<string, string>)
    ),
    body: event.body
      ? event.isBase64Encoded
        ? Buffer.from(event.body, "base64")
        : event.body
      : undefined,
  });

  const response = await app.fetch(request, {
    ...context,
    waitUntil: (promise: Promise<any>) => context.waitUntil?.(promise),
  });

  const body = await response.text();

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body,
    isBase64Encoded: false,
  };
};
