import {StudentPlans} from '../source/index';
import common from "./common.ts";

import {expect, test} from 'bun:test';

if (!common.StudentCode)
    await common.exec();

const plans = new StudentPlans(common);
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
})