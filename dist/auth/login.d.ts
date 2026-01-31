import Fetch from '../common/fetch.js';
import { SessionToken } from './tokens/createSessionToken.js';
import 'jsonwebtoken';

declare function createSession(usr: string, pwd: string, fetch: Fetch, hashedPassword?: boolean): Promise<SessionToken.Session>;

export { createSession as default };
