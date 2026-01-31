// source/common/httpError.ts
var HttpError = class extends Error {
  constructor(code, message) {
    super(typeof message === "string" ? message : JSON.stringify(message));
    this.code = code;
  }
};

export { HttpError };
