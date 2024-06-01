import { StudentCard } from "../source/index.ts";
import common from "./common.ts";

import { expect, test } from "bun:test"

if( !common.StudentCode )
    await common.exec();

const card = new StudentCard(common);
const info = await card.exec()

test("StudentCard", async () => {
    expect(info).toBeObject();
    expect(info.apellido_paterno).toBeString();
    expect(info.apellido_materno).toBeString();
    expect(info.curp).toBeString();
    expect(info.sede).toBeString();
    expect(info.foto).toBeString();
    expect(info.firma).toBeString();
    expect(info.centro).toBeString();
    expect(info.nombre).toBeString();
})