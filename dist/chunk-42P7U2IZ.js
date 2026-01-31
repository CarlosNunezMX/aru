// source/modules/oferta/Centros.ts
async function Centros(client) {
  const url = "https://leoalumnos-svc.udg.mx/alum/api/programas/centros";
  return await client.fetch.fetch(url);
}
var Centros_default = Centros;

export { Centros, Centros_default };
