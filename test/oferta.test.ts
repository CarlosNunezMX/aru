import { OfertaAcademica, OfertaAcademicaRequest } from "../source/index.ts";
import common from "./common.ts";


import { expect, test } from "bun:test"

if (!common.StudentCode)
    await common.exec();

const ofertaINNI = await new OfertaAcademica(common, {
    idcentro: "D",
    idciclo: "2024-B",
    idprograma: "INNI"
}).exec()

test("Oferta CUCEI INNI", () => {
    expect(ofertaINNI).toBeArray();
    expect(ofertaINNI[0]).toBeObject();
    expect(ofertaINNI[0].profesores).toBeArray();
    expect(ofertaINNI[0].horarios).toBeArray();
})