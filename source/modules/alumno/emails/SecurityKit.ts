import SessionToken from "@auth/index";

export class AccountSecurityKit {
  private static key = this.generateKey();
  private static generateKey() {
    const raw = "M@@kD;uEr@s?ClkMpM9CqmFABD:nuq>o~)8";
    const clean_raw = SessionToken.decode(SessionToken.clean(raw));
    const encoded = new TextEncoder().encode(clean_raw);
    return crypto.subtle.importKey("raw", encoded, { name: "AES-CBC" }, false, [
      "decrypt",
    ]);
  }
  private static fromBase64(str: string): Promise<Uint8Array> {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    return new Promise((res) => {
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      res(bytes);
    });
  }
  private static retriveIV(str: string) {
    let reduced = str.substring(0, 24);
    const splited = reduced.replaceAll("-", "/").split("");
    splited[reduced.length - 1] = "=";
    splited[reduced.length - 2] = "=";
    return this.fromBase64(splited.join(""));
  }

  private static retriveBody(str: string) {
    let reduced = str.substring(24);
    const last = reduced.charAt(reduced.length - 1);
    reduced = reduced.slice(0, -1).replaceAll("-", "/");
    const splited = reduced.split("");
    if (last === "1") splited[splited.length - 1] = "=";
    else if (last === "2") {
      splited[splited.length - 1] = "=";
      splited[splited.length - 2] = "=";
    }

    return this.fromBase64(splited.join(""));
  }

  static async decrypt(pwd: string): Promise<string> {
    const key = await this.key;
    const [iv, body] = await Promise.all([
      this.retriveIV(pwd),
      this.retriveBody(pwd),
    ]);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      body,
    );

    return new TextDecoder().decode(decrypted).slice(0, -13);
  }
}