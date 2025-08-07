import buildURL from "@common/url";
import type { Card } from "@interfaces/modules/soyalumno";

function Encode(code: string): string {
    const format = `${code}-${Math.floor(Date.now() / 1e3)}`;
    return btoa(btoa(format));
}

export default async function Credencial(id: string) {
    const url = buildURL("https://soyudg.udg.mx/alumnos/show?encryptedId=:studentCode", {
        studentCode: Encode(id)
    });

    const data = await fetch(url, {
        tls: {
            rejectUnauthorized: false
        }
    })
    const json = await data.json() as { data: Card };

    return json.data;
}
