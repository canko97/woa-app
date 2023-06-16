import jwt from 'jsonwebtoken';
import config from 'config';

export function verifyJwt<T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
    'ascii'
  );

  try {
    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
