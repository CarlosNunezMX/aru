import {StudentPlans} from '../source/index';
import {Login} from '../source/auth/Login';

import {expect, test} from 'bun:test';

const session = new Login({
    // @ts-ignore
    User: process.env.LEO_USER,
    // @ts-ignore
    Password: process.env.LEO_PASSWORD
});

await session.exec();

const plans = new StudentPlans(session);
const data = await plans.exec();

test("Student.plans", () => {
    expect(data).not.toBeNull();
    expect(data).toBeArray();
    expect(data[0]).toBeObject();

    expect(data[0].cicladmision).toBeString();
    expect(data[0].ciclefectivo).toBeString();
    expect(data[0].idcentro).toBeString();

    expect(data[0].idprograma).toBeString();
    expect(data[0].idsede).toBeString();
    expect(data[0].emailudg).toBeString();
    expect(data[0].descnivel).toBeString();
    expect("").toBeNumber()
})