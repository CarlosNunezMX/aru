import { Centros, ProgramasCentros, Login, Ciclos } from "../source/index.ts";
import common from "./common.ts";

import { expect, test } from "bun:test"

if (!common.StudentCode)
    await common.exec();

const RespCentros = new Centros(common);
const centros = await RespCentros.exec();

test("Centros", () => {
    expect(centros)
        .toBeArray()
    expect(centros[0])
        .toBeObject()
    expect(centros[0].siglas)
        .toBeString()
    expect(centros[0].descripcion)
        .toBeString()
    expect(centros[0].idcentro)
        .toBeString()
})

const Carreras = new ProgramasCentros(common, "D");
const carreras = await Carreras.exec()
const [testing] = carreras;
test("Carreras Centros", () => {
    expect(carreras)
        .toBeArray()
    expect(testing)
        .toBeObject()
    expect(testing.descprograma)
        .toBeString()
    expect(testing.idcentro)
        .toBeString()
    expect(testing.programa)
        .toBeString()
})

const Calendarios = await new Ciclos(common, testing.programa).exec();
test("Ciclos", () => {
    expect(Calendarios).toBeArray()
    expect(Calendarios[0].ciclo).toBeString()
    expect(Calendarios[0].descripcion).toBeString()
})