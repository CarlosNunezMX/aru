export interface PersonalData {
  alumcodigo: string;
  nombre: string;
  genero: "M" | "F";
  fechnacimient: string;
  curp: string;
  rfc?: string;
  imss: string;
  email: string;
  teleemergenci: string;
  foto: string;
  firma: string;
  tiposangre?: string;
  desctiposangr?: string;
  lugadomicilioDB: string;
  domicilio: string;
  lugadomicilio: Address;
}

interface Address {
  pais: string;
  estado: string;
  municipio: string;
  cp: string;
}
