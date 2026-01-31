// source/common/log.ts
var DebugLogger;
((_DebugLogger) => {
  class DebugLogger2 {
    getInfo() {
      const date = new Date(Date.now()).toUTCString();
      return {
        date
      };
    }
    get isDev() {
      return process.env["NODE_ENV"] !== "production";
    }
    error(type, ...log) {
      if (!this.isDev)
        return;
      const info = this.getInfo();
      console.error(`[${type}] at ${info.date} - `, ...log);
    }
  }
  _DebugLogger.DebugLogger = DebugLogger2;
})(DebugLogger || (DebugLogger = {}));
var debugLogger = new DebugLogger.DebugLogger();

export { DebugLogger, debugLogger };
