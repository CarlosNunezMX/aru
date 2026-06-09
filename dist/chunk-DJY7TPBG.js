import { sign } from 'jsonwebtoken';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// source/auth/session.ts
var Session = class {
  constructor(sessionID, userID, expiration) {
    this.sessionID = sessionID;
    this.userID = userID;
    this.expiration = expiration;
  }
  isExpirated() {
    return this.expiration >= /* @__PURE__ */ new Date();
  }
};

// source/auth/password.ts
async function hashPassword(password) {
  if (typeof Bun !== "undefined") {
    return Bun.password.hashSync(password, "bcrypt");
  }
  const bcrypt = await import('bcrypt');
  return bcrypt.hash(password, 10);
}

// source/auth/login.ts
async function createSession(usr, pwd, fetch, hashedPassword) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/login/validar";
  const res = await fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      usr,
      pwd: hashedPassword ? pwd : await hashPassword(pwd)
    })
  });
  return new Session(res.id_token, res.usua_id, new Date(res.vigencia));
}
var createISS_default = (key) => sign({}, key, {
  algorithm: "RS256",
  expiresIn: 60,
  issuer: "I0wzMC00THVNbjBzKg=="
});

// source/auth/securityTokens.ts
var MAGIC_KEY = "b8d0343efc18fb979821e53db80b8496";
var SEPARATOR = "~";
var TOKEN_KEY = "yvICnGtE@IENOuAv$tIFLyABLAALnMBI~$4";
var SecurityToken = class {
  static padKey(targetLength, key) {
    if (targetLength <= 0) return "";
    let padded = "";
    let repeats = Math.floor(targetLength / key.length + 1);
    while (repeats > 0) {
      padded += key;
      repeats--;
    }
    return padded.substring(0, targetLength);
  }
  static retrivetoMove(transformed) {
    const cositaPosition = transformed.indexOf(SEPARATOR);
    return transformed.slice(cositaPosition + 1, cositaPosition + 2).charCodeAt(0);
  }
  // Equivale a n->9988->nd.
  static clean(token) {
    const separatorIndex = token.indexOf(SEPARATOR);
    const separated = token.slice(0, separatorIndex);
    const toMove = token.charAt(separatorIndex + 1);
    const numbStr = token.slice(separatorIndex + 2);
    const numb = parseInt(numbStr, 10);
    const reduce = separated.slice(numb);
    const reduced = separated.slice(0, numb);
    return reduce + reduced + SEPARATOR + toMove;
  }
  // Equivale a n->9988->nc
  static encode(sessionID, key = MAGIC_KEY) {
    const sessionIDLenght = sessionID.length;
    const toMove = Math.floor(15 * Math.random() + 33);
    const magic = 122 - toMove + 1;
    const paddedKey = this.padKey(sessionIDLenght, key);
    let text = "";
    for (let i = 0; i < sessionIDLenght; i++) {
      let acc = sessionID.charCodeAt(i) - toMove + paddedKey.charCodeAt(i) - toMove;
      text += String.fromCharCode(acc % magic + toMove);
    }
    text += SEPARATOR + String.fromCharCode(toMove);
    return text;
  }
  // Equivale a n->9988->dc
  static decode(transformedSessionID, key = MAGIC_KEY) {
    const toMoved = this.retrivetoMove(transformedSessionID);
    const separatorIndex = transformedSessionID.indexOf(SEPARATOR);
    const separated = transformedSessionID.slice(0, separatorIndex);
    const length = separated.length;
    const transformToMoved = 122 - toMoved + 1;
    const paddedKey = this.padKey(length, key);
    let token = "";
    for (let i = 0; i < length; i++) {
      let acc = separated.charCodeAt(i) - paddedKey.charCodeAt(i);
      if (acc < 0) acc = transformToMoved + acc;
      token += String.fromCharCode(acc + toMoved);
    }
    return token;
  }
  static getSessionToken(sessionID) {
    const key = this.decode(this.clean(TOKEN_KEY));
    const encodedStudentID = this.encode(sessionID, key);
    return encodedStudentID;
  }
};

// source/auth/index.ts
var auth_default = SecurityToken;

// source/common/httpError.ts
var HttpError = class extends Error {
  constructor(code, message) {
    super(typeof message === "string" ? message : JSON.stringify(message));
    this.code = code;
  }
};

// source/common/url.ts
function buildURL(url, req) {
  const keys = Object.keys(req);
  let newURL = url;
  for (let key of keys)
    newURL = newURL.replace(`:${key}`, req[key]);
  return newURL;
}
/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
 */

export { HttpError, Session, __export, auth_default, buildURL, createISS_default, createSession };
