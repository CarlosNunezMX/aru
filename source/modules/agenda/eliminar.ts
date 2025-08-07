import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import type { AruCarreras } from "@interfaces/carreras/Carreras";

export default function EliminarMateria(cursos: string[], carrera: AruCarreras.AnyCentro, centro: string, ciclo: string, nivel: string = "LI") {
    return async (fetch: Fetch, session: SessionToken.Session) => {

        const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/cursos";
        const body = {
            idalumno: session.userID,
            idprograma: carrera,
            nivel,
            idciclo: ciclo,
            idcentro: centro,
            cursos
        };

        const res = await fetch.fetch(url, {
            method: "DELETE",
            body: JSON.stringify(body)
        })
    }
}