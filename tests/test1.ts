import Horario from "../source/modules/alumno/Horario";
import Session from "./_session";

const schedule = await Horario({carrera: "INFO", ciclo: "2026-B"}, await Session);