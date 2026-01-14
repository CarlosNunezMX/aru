import {Client} from "../source/client"
const Session = new Client(process.env["LEO_KEY"]!)
    .login(process.env["LEO_USER"]!, process.env["LEO_PASSWORD"]!);

export default Session;