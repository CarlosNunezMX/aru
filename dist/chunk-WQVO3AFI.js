// source/common/sessionError.ts
var NotSessionError = class extends Error {
  constructor() {
    super("No hay una sesi\xF3n iniciada");
  }
};

export { NotSessionError };
