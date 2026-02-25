import { type PrivateKey, sign } from "jsonwebtoken";
export default (key: PrivateKey) =>
  sign({}, key, {
    algorithm: "RS256",
    expiresIn: 60,
    issuer: "I0wzMC00THVNbjBzKg==",
  });
