import { Login } from "../source";

if(!process.env.LEO_USER || !process.env.LEO_PASSWORD) {
    throw "Set environment variables LEO_USER and LEO_PASSWORD to run tests"
}

const session = new Login({
    User: process.env.LEO_USER,
    Password: process.env.LEO_PASSWORD
}, {createCache: true})

export default session;