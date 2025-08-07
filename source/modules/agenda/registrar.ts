import type SessionToken from "@auth/index";
import type Fetch from "@common/fetch";
import buildURL from "@common/url";
import type { AruCarreras } from "@interfaces/carreras/Carreras";
import type { LaunchCB } from "@interfaces/Client";
import type { RegistroInit } from "@interfaces/modules/agenda/registro";

export const RegistroMaterias =
    (materias: string[], carrera: AruCarreras.AnyCentro, centro: string, ciclo: string, nivel = "LI") => {
        return async (fetch: Fetch, session: SessionToken.Session) => {
            const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/";
            const body = {
                cursos: materias,
                idalumno: session.userID,
                idcentro: centro,
                idciclo: ciclo,
                idprograma: carrera,
                nivel
            } satisfies RegistroInit;


            const res = await fetch.fetch<never>(url, {
                method: "POST",
                body: JSON.stringify(body)
            })

        }
    }
    ;
