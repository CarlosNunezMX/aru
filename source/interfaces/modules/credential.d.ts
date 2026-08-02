export type RawStudentCard = {
  sede: string;
  firmaRector: string;
  imss: string;
  nombre: string;
  error?: string;
  nombreRector: string;
  apellido_paterno: string;
  apellido_materno: string;
  centro: string;
  curp: string;
  qr: string;
  foto: string;
  centroDesc: string;
  firma: string;

  tarjeta_informador: Array<unknown>;
};

// ==| Student Card |==
// @TODO: next update

export interface Signature {
  signaturer: string;
  signature: string;
}

export interface StudentCard {
  name: string;
  lastName: string;

  imss: string;
  curp: string;

  idHost: string;
  host: string;
  venue: string;

  rectorSignature: Signature;
  signature: string;

  photo: string;
  qr: string;

  tarjeta_informador: Array<unknown>;
}
