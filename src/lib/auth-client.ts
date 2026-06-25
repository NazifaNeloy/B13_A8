import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Dynamically resolve base URL on the client to prevent pointing to localhost in production
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
});
