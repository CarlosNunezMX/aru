import {Login, type UserCredentials, Kardex, StudentPlans, RegisterSubject } from "../source/index";
const Creds: UserCredentials = {
    // @ts-ignore
    Password: process.env.LEO_PASSWORD,
    // @ts-ignore
    User: process.env.LEO_USER
}

const session = new Login(Creds);
await session.exec();

const plans = new StudentPlans(session);
const studentPlans = await plans.exec();

const data: Kardex.KardexInit = {
    campus: studentPlans[0].idcentro,
    ciclo: "2024-A",
    cede: studentPlans[0].idsede,
    progam: studentPlans[0].idprograma,
    cicloAdmision: studentPlans[0].cicladmision
}

const kardex = new Kardex.Kardex(session, data);
const kardexRes = await kardex.exec();
console.log(kardexRes);

const registerSubject = new RegisterSubject(session, {
    idalumno: Creds.User,
    idprograma: studentPlans[0].idprograma,
    nivel: studentPlans[0].nivel,
    idciclo: "2024-B",
    idcentro: studentPlans[0].idcentro,
    cursos: ["1234"]
})
const registerRes = await registerSubject.exec();
console.log(registerRes);