import common from "./common";
import { StudentInfo } from "../source/student/StudentInfo/StudentInfo";
import {expect, test} from "bun:test"


if (!common.StudentCode)
    await common.exec();

const studentInfo = new StudentInfo(common);
const info = await studentInfo.exec();

test("Student.info", () => {
    expect(info).not.toBeNull();
    expect(info.alumcodigo).toBeString()
    expect(info.curp).toBeString();
    expect(info.nombre).toBeString();
})

test("Student.photo", () => {
    expect(info.foto).not.toBeNull();
})

test("Student.signature", () => {
    expect(info.firma).not.toBeNull();
})