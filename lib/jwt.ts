// lib/jwt.ts
import { SignJWT, jwtVerify } from "jose";

let _key: Uint8Array | null = null;

function getKey(): Uint8Array {
  const raw = process.env.AUTH_SECRET;
  if (!raw || raw.trim().length < 32) {
    // enforce a real secret and a helpful message in dev
    throw new Error(
      "AUTH_SECRET is missing or too short. Add a long random string to .env.local (>=32 chars)."
    );
  }
  if (_key) return _key;
  _key = new TextEncoder().encode(raw);
  return _key;
}

export async function signSession(payload: object, exp: string = "7d") {
  const key = getKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(key);
}

export async function verifySession<T = unknown>(token: string): Promise<T | null> {
  try {
    const key = getKey();
    const { payload } = await jwtVerify(token, key);
    return payload as T;
  } catch {
    return null;
  }
}
