/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
*/

export namespace SessionToken {

  const MAGIC_KEY = "b8d0343efc18fb979821e53db80b8496";
  const SEPARATOR = "~";
  const TOKEN_KEY = "yvICnGtE@IENOuAv$tIFLyABLAALnMBI~$4"

  function retrivetoMove(transformed: string) {
    const cositaPosition = transformed.indexOf(SEPARATOR);
    return transformed.slice(cositaPosition + 1, cositaPosition + 2)
      .charCodeAt(0);
  }
  // function n->9988->nd.
  function clean(token: string) {
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
  function encode(sessionID: string, key: string = MAGIC_KEY): string {
    const sessionIDLenght = sessionID.length;
    const toMove = Math.floor(15 * Math.random() + 33);

    const magic = 122 - toMove + 1;
    let text = "";

    for (let i = 0; i < sessionIDLenght; i++) {
      let acc = (
        sessionID.charCodeAt(i) - toMove
        + key.charCodeAt(i) - toMove
      )

      text += String.fromCharCode((acc % magic) + toMove)
    }

    text += SEPARATOR + String.fromCharCode(toMove) + text;
    return clean(text);
  }

  export function decode(transformedSessionID: string, key: string = MAGIC_KEY): string {
    const toMoved = retrivetoMove(transformedSessionID);
    const length = transformedSessionID.slice(0, transformedSessionID.indexOf(SEPARATOR)).length;
    const transformToMoved = 122 - toMoved + 1;

    let token = "";
    for (let i = 0; i < length; i++) {
      let acc = transformedSessionID.charCodeAt(i)
        - key.charCodeAt(i);
      if (acc < 0) acc = transformToMoved + acc;
      token += String.fromCharCode(acc + toMoved);
    }

    console.log(token, transformedSessionID)
    return token;
  }
  export class Session {
    constructor(
      public sessionID: string,
      public userID: string
    ) { }
    getSessionToken() {
      const key = decode(clean(TOKEN_KEY));
      const encodedStudentID = encode(this.sessionID, key);
      return encodedStudentID;
    }
  }
}
