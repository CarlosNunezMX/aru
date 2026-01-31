import { SessionToken } from './chunk-K4QGC3NG.js';
import { hashPassword } from './chunk-LQEPJUQC.js';

// source/auth/login.ts
async function createSession(usr, pwd, fetch, hashedPassword) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/login/validar";
  const res = await fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      usr,
      pwd: hashedPassword ? pwd : hashPassword(pwd)
    })
  });
  return new SessionToken.Session(
    res.id_token,
    res.usua_id
  );
}

export { createSession };
