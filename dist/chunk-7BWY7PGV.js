var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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

export { HttpError, __export, buildURL };
