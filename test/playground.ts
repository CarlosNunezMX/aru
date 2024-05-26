import {AverageAdvance, Login, type AverageAdvanceInit, type UserCredentials} from "../source/index";
const Creds: UserCredentials = {
    // @ts-ignore
    Password: process.env.LEO_PASSWORD,
    // @ts-ignore
    User: process.env.LEO_USER
}

const session = new Login(Creds);
await session.exec();

const options: AverageAdvanceInit = {
    initialCiclo: "2021-B",
    program: "BGC"
};

const schedule = new AverageAdvance(session, options);
await schedule.exec();