import type {
  Address,
  RawAddress,
  RawStudent,
  Student,
} from "@interfaces/modules";

export default class StudentTransformer {
  private static transformAddres(raw: RawAddress, street: string): Address {
    return {
      country: raw.pais,
      state: raw.pais,
      city: raw.municipio,
      zipCode: raw.cp,
      street,
    };
  }
  static transform(raw: RawStudent): Student {
    return {
      name: raw.nombre,
      studentId: raw.alumcodigo,
      birthdate: new Date(raw.fechnacimient),
      genre: raw.genero,

      blodId: raw.tiposangre,
      blodType: raw.desctiposangr,

      curp: raw.curp,
      rfc: raw.rfc,
      email: raw.email,
      imss: raw.imss,

      emergencyPhone: raw.teleemergenci,
      fullAddress: raw.lugadomicilioDB,
      address: this.transformAddres(raw.lugadomicilio, raw.domicilio),

      photo: raw.foto,
      sign: raw.firma,
    };
  }
}
