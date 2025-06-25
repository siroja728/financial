import crypto from "crypto";

export function liqpayData(params: unknown): string {
  const json = JSON.stringify(params);
  return Buffer.from(json).toString("base64");
}

export function liqpaySignature(data: string, privateKey: string): string {
  const str = privateKey + data + privateKey;
  return crypto.createHash("sha1").update(str).digest("base64");
}
