import { Login } from "../source/auth/Login";
import { expect, test} from "bun:test";

const Auth = new Login({
    // @ts-ignore
    User: process.env.LEO_USER,
    // @ts-ignore
    Password: process.env.LEO_PASSWORD
})

await Auth.exec()

test("Login Vigencia", async () => {
    expect(Auth.getToken().token).not.toBeNull();
    expect(Auth.getToken().vigencia).not.toBeNull();
})

test("StudentCode", () => {
    expect(Auth.StudentCode).not.toBeNull();
})