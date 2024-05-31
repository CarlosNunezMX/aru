import {Kardex, Login} from "../source/index.ts";
import common from "./common.ts";

import { expect, test } from "bun:test"

if( !common.StudentCode )
    await common.exec();

const kardex = new Kardex(common);
const data = await kardex.exec();
test("Kardex", async () => {
    expect(data).toBeObject();
    expect(data.certificado).toBeString();
    expect(data.creditos).toBeObject();
    expect(data.informacion).toBeString();
    expect(data.historiaAcademicaKardex).toBeArray();
})