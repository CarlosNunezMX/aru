// source/modules/agenda/Registrar.ts
async function RegistrarMaterias(client, { carrera, centro, ciclo, materias, nivel = "LI" }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/";
  const body = {
    cursos: materias,
    idalumno: client.session.userID,
    idcentro: centro,
    idciclo: ciclo,
    idprograma: carrera,
    nivel
  };
  await client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export { RegistrarMaterias };
