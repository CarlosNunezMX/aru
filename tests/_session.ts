import { Client } from "../source/client";
import { ClientCredentials } from "../source/auth";

const user = process.env["LEO_USER"]!;
const password = process.env["LEO_PASSWORD"]!;

const credentials = new ClientCredentials(user, password);
const Session = new Client(process.env["LEO_KEY"]!)
  .setCredentials(credentials)
  .login();

export default Session;
