/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
 */
const MAGIC_KEY = "b8d0343efc18fb979821e53db80b8496";
const SEPARATOR = "~";
const TOKEN_KEY = "yvICnGtE@IENOuAv$tIFLyABLAALnMBI~$4";

export default class SecurityToken {
  private static retrivetoMove(transformed: string) {
    const cositaPosition = transformed.indexOf(SEPARATOR);
    return transformed
      .slice(cositaPosition + 1, cositaPosition + 2)
      .charCodeAt(0);
  }
  // function n->9988->nd.
  static clean(token: string) {
    const separatorIndex = token.indexOf(SEPARATOR);
    const separated = token.slice(0, separatorIndex);
    const toMove = token.charAt(separatorIndex + 1);
    // @ts-ignore
    const numb = token.charAt(separatorIndex + 2) as number;
    const reduce = separated.slice(numb);
    const reduced = token.slice(0, numb);

    return reduce + reduced + SEPARATOR + toMove;
  }
  // Equivale a n->9988->nc
  static encode(sessionID: string, key: string = MAGIC_KEY): string {
    const sessionIDLenght = sessionID.length;
    const toMove = Math.floor(15 * Math.random() + 33);

    const magic = 122 - toMove + 1;
    let text = "";

    for (let i = 0; i < sessionIDLenght; i++) {
      let acc = sessionID.charCodeAt(i) - toMove + key.charCodeAt(i) - toMove;

      text += String.fromCharCode((acc % magic) + toMove);
    }

    text += SEPARATOR + String.fromCharCode(toMove) + text;
    return this.clean(text);
  }

  // Equivale a n->9988->dc
  public static decode(
    transformedSessionID: string,
    key: string = MAGIC_KEY,
  ): string {
    const toMoved = this.retrivetoMove(transformedSessionID);
    const length = transformedSessionID.slice(
      0,
      transformedSessionID.indexOf(SEPARATOR),
    ).length;
    const transformToMoved = 122 - toMoved + 1;

    let token = "";
    for (let i = 0; i < length; i++) {
      let acc = transformedSessionID.charCodeAt(i) - key.charCodeAt(i);
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
