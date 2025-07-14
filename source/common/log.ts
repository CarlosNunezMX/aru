export namespace DebugLogger {
    export type ERROR_TYPE = "CRITICAL" | "ERROR"; 

    export class DebugLogger {
        private getInfo(){
            const date = new Date(Date.now()).toUTCString();
            return {
                date
            }
        }
        private handle(){
            const isDEV = process.env["NODE_ENV"] === "production";
            return isDEV;
        }
        error(type: ERROR_TYPE, ...log: any) {
            if(!this.handle())
                return;
            const info = this.getInfo();
            console.error(`[${type}] at ${info.date} - `, ...log);
        }
    }

}


export const debugLogger = new DebugLogger.DebugLogger();