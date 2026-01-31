// source/auth/tokens/createSessionToken.ts
var SessionToken;
((SessionToken2) => {
  const MAGIC_KEY = "b8d0343efc18fb979821e53db80b8496";
  const SEPARATOR = "~";
  const TOKEN_KEY = "yvICnGtE@IENOuAv$tIFLyABLAALnMBI~$4";
  function retrivetoMove(transformed) {
    const cositaPosition = transformed.indexOf(SEPARATOR);
    return transformed.slice(cositaPosition + 1, cositaPosition + 2).charCodeAt(0);
  }
  function clean(token) {
    const separatorIndex = token.indexOf(SEPARATOR);
    const separated = token.slice(0, separatorIndex);
    const toMove = token.charAt(separatorIndex + 1);
    const numb = token.charAt(separatorIndex + 2);
    const reduce = separated.slice(numb);
    const reduced = token.slice(0, numb);
    return reduce + reduced + SEPARATOR + toMove;
  }
  SessionToken2.clean = clean;
  function encode(sessionID, key = MAGIC_KEY) {
    const sessionIDLenght = sessionID.length;
    const toMove = Math.floor(15 * Math.random() + 33);
    const magic = 122 - toMove + 1;
    let text = "";
    for (let i = 0; i < sessionIDLenght; i++) {
      let acc = sessionID.charCodeAt(i) - toMove + key.charCodeAt(i) - toMove;
      text += String.fromCharCode(acc % magic + toMove);
    }
    text += SEPARATOR + String.fromCharCode(toMove) + text;
    return clean(text);
  }
  SessionToken2.encode = encode;
  function decode(transformedSessionID, key = MAGIC_KEY) {
    const toMoved = retrivetoMove(transformedSessionID);
    const length = transformedSessionID.slice(0, transformedSessionID.indexOf(SEPARATOR)).length;
    const transformToMoved = 122 - toMoved + 1;
    let token = "";
    for (let i = 0; i < length; i++) {
      let acc = transformedSessionID.charCodeAt(i) - key.charCodeAt(i);
      if (acc < 0) acc = transformToMoved + acc;
      token += String.fromCharCode(acc + toMoved);
    }
    return token;
  }
  SessionToken2.decode = decode;
  class Session {
    constructor(sessionID, userID) {
      this.sessionID = sessionID;
      this.userID = userID;
    }
    getSessionToken() {
      const key = decode(clean(TOKEN_KEY));
      const encodedStudentID = encode(this.sessionID, key);
      return encodedStudentID;
    }
  }
  SessionToken2.Session = Session;
})(SessionToken || (SessionToken = {}));
/****
 * @author CarlosNuñezMX
 * @url ../../../docs/sessionTokens.md
 * @license GPLv3 and Universidad de Guadalajara
*/

export { SessionToken };
