import {Login, type UserCredentials, Kardex, StudentPlans} from "../source/index";
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
await kardex.exec()