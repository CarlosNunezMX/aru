import type {
  RawStudentCard,
  Signature,
  StudentCard,
} from "@interfaces/modules";

export default function StudentCardTransformer(
  raw: RawStudentCard,
): StudentCard {
  const toSignature = (signaturer: string, signature: string): Signature => ({
    signature,
    signaturer,
  });
  return {
    name: raw.nombre,
    lastName: `${raw.apellido_paterno} ${raw.apellido_materno}`,

    curp: raw.curp,
    imss: raw.imss,

    host: raw.centroDesc,
    idHost: raw.centro,
    venue: raw.sede,

    photo: raw.foto,
    qr: raw.qr,

    signature: raw.firma,
    rectorSignature: toSignature(raw.nombreRector, raw.firmaRector),

    tarjeta_informador: raw.tarjeta_informador,
  };
}
