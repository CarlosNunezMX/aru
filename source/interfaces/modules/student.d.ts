export interface RawStudent {
  alumcodigo: string;
  nombre: string;
  genero: "M" | "F";
  fechnacimient: string;
  curp: string;
  rfc: string | null;
  imss: string;
  email: string;
  teleemergenci: string;
  foto: string;
  firma: string;
  tiposangre: string | null;
  desctiposangr: string | null;
  lugadomicilioDB: string;
  domicilio: string;
  lugadomicilio: RawAddress;
}

interface RawAddress {
  pais: string;
  estado: string;
  municipio: string;
  cp: string;
}

// ==| New Student Object |==

export interface Address {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
}

export interface Student {
  studentId: string;
  name: string;
  genre: "M" | "F";
  birthdate: Date;

  curp: string;
  rfc: string | null;
  imss: string;

  email: string;
  emergencyPhone: string;
  photo: string;
  sign: string;

  blodId: string | null;
  blodType: string | null;
  fullAddress: string;
  address: Address;
}
