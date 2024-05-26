import { Login } from "../source/auth/Login";
import { StudentInfo } from "../source/student/StudentInfo";
import {expect, test} from "bun:test"

const auth =  new Login({
    // @ts-ignore
    User: process.env.LEO_USER,
    // @ts-ignore
    Password: process.env.LEO_PASSWORD
})

await auth.exec()

const studentInfo = new StudentInfo(auth);
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