import { sign } from 'jsonwebtoken';

// source/auth/tokens/createISS.ts
var createISS_default = (key) => sign({}, key, {
  algorithm: "RS256",
  expiresIn: 60,
  issuer: "I0wzMC00THVNbjBzKg=="
});

export { createISS_default };
