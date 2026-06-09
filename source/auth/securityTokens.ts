/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
 */
const MAGIC_KEY = "b8d0343efc18fb979821e53db80b8496";
const SEPARATOR = "~";
const TOKEN_KEY = "yvICnGtE@IENOuAv$tIFLyABLAALnMBI~$4";

export default class SecurityToken {
  private static padKey(targetLength: number, key: string): string {
    if (targetLength <= 0) return "";
    let padded = "";
    let repeats = Math.floor(targetLength / key.length + 1);
    while (repeats > 0) {
      padded += key;
      repeats--;
    }
    return padded.substring(0, targetLength);
  }

  private static retrivetoMove(transformed: string) {
    const cositaPosition = transformed.indexOf(SEPARATOR);
    return transformed
      .slice(cositaPosition + 1, cositaPosition + 2)
      .charCodeAt(0);
  }

  // Equivale a n->9988->nd.
  static clean(token: string) {
    const separatorIndex = token.indexOf(SEPARATOR);
    const separated = token.slice(0, separatorIndex);
    const toMove = token.charAt(separatorIndex + 1);

    const numbStr = token.slice(separatorIndex + 2);
    const numb = parseInt(numbStr, 10);

    const reduce = separated.slice(numb);
    const reduced = separated.slice(0, numb); // CORRECCIÓN: Extraer de 'separated', no de 'token'

    return reduce + reduced + SEPARATOR + toMove;
  }

  // Equivale a n->9988->nc
  static encode(sessionID: string, key: string = MAGIC_KEY): string {
    const sessionIDLenght = sessionID.length;
    const toMove = Math.floor(15 * Math.random() + 33);
    const magic = 122 - toMove + 1;

    const paddedKey = this.padKey(sessionIDLenght, key);

    let text = "";
    for (let i = 0; i < sessionIDLenght; i++) {
      let acc =
        sessionID.charCodeAt(i) - toMove + paddedKey.charCodeAt(i) - toMove;
      text += String.fromCharCode((acc % magic) + toMove);
    }

    text += SEPARATOR + String.fromCharCode(toMove);
    return text;
  }

  // Equivale a n->9988->dc
  public static decode(
    transformedSessionID: string,
    key: string = MAGIC_KEY,
  ): string {
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

  static getSessionToken(sessionID: string): string {
    const key = this.decode(this.clean(TOKEN_KEY));
    const encodedStudentID = this.encode(sessionID, key);
    return encodedStudentID;
  }
}
