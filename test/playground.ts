import {Login, type UserCredentials, Projections, Credits, StudentPlans} from "../source/index";
const Creds: UserCredentials = {
    // @ts-ignore
    Password: process.env.LEO_PASSWORD,
    // @ts-ignore
    User: process.env.LEO_USER
}

const session = new Login(Creds, {createCache: true});
await session.exec();


const projection = new Projections(session);
const studentProjection = await projection.exec();

const credits = new Credits(session);
await credits.exec();

const plans = new StudentPlans(session);
const studentPlan = await plans.exec();



console.log(session.Cache);