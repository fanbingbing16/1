import * as Random from "@supercharge/strings";

export async function getRandomString(
  length: number = 10,
  type: "hex" | "base64" | "url-safe" | "numeric" = "url-safe"
): Promise<string> {
  return Random.random(length);
}
