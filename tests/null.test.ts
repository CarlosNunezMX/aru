import buildURL from "../source/common/url";
import type { IAlumno } from "../source/interfaces/modules/Alumno";
import type { Client } from "../source/client";

async function Alumno(client: Client): Promise<IAlumno> {
  const { fetch, session } = client;
  const url = buildURL(
    "https://leoalumnos-svc.udg.mx/alum/api/alumnos-sii/:codigo/datos-personales",
    { codigo: session!.userID },
  );
  
  const result = await fetch.fetch<IAlumno>(url);
  
  // Haz hover sobre estas líneas - ¿qué tipo muestran?
  result.nombre; // ¿Muestra string?
  result.genero; // ¿Muestra "M" | "F"?
  result.lugadomicilio.pais; // ¿Muestra string?
  
  return result;
}

export default Alumno;