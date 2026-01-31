declare namespace DebugLogger {
    type ERROR_TYPE = "CRITICAL" | "ERROR";
    class DebugLogger {
        private getInfo;
        private get isDev();
        error(type: ERROR_TYPE, ...log: any): void;
    }
}
declare const debugLogger: DebugLogger.DebugLogger;

export { DebugLogger, debugLogger };
