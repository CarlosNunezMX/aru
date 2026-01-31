/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
*/
declare namespace SessionToken {
    function clean(token: string): string;
    function encode(sessionID: string, key?: string): string;
    function decode(transformedSessionID: string, key?: string): string;
    class Session {
        sessionID: string;
        userID: string;
        constructor(sessionID: string, userID: string);
        getSessionToken(): string;
    }
}

export { SessionToken };
