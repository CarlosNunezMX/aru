// source/modules/agenda/Eliminar.ts
async function EliminarMateria(client, { carrera, centro, ciclo, cursos, nivel = "LI" }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/registro/cursos";
  const body = {
    idalumno: client.session.userID,
    idprograma: carrera,
    nivel,
    idciclo: ciclo,
    idcentro: centro,
    cursos
  };
  await client.fetch.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body)
  });
}

export { EliminarMateria };
