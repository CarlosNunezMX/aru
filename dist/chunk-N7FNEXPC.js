// source/modules/oferta/Oferta.ts
async function OfertaAcademica(client, { carrera, ciclo, idCentro }) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/ofertas/horas-nrc";
  return client.fetch.fetch(url, {
    method: "POST",
    body: JSON.stringify({
      idcentro: idCentro,
      idprograma: carrera,
      idciclo: ciclo
    })
  });
}

export { OfertaAcademica };
