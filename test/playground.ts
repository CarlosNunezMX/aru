import {Schedule, Login, type ScheduleInit, type UserCredentials} from "../source/index";
const Creds: UserCredentials = {
    // @ts-ignore
    Password: process.env.LEO_PASSWORD,
    // @ts-ignore
    User: process.env.LEO_USER
}

const session = new Login(Creds);
await session.exec();

const options: ScheduleInit = {
    ciclo: "2024A",
    program: "BGC"
};

const schedule = new Schedule(session, options);
await schedule.exec();