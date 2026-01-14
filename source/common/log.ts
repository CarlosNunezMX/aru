export namespace DebugLogger {
    export type ERROR_TYPE = "CRITICAL" | "ERROR"; 

    export class DebugLogger {
        private getInfo(){
            const date = new Date(Date.now()).toUTCString();
            return {
                date
            }
        }
        private get isDev(){
            return process.env["NODE_ENV"] !== "production";
        }
        error(type: ERROR_TYPE, ...log: any) {
            console.log(this.isDev)
            if(!this.isDev)
                return;
            const info = this.getInfo();
            console.error(`[${type}] at ${info.date} - `, ...log);
        }
    }

}


export const debugLogger = new DebugLogger.DebugLogger();