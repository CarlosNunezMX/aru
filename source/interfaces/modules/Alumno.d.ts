export interface IAlumno {
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
  lugadomicilio: IDireccion;
}

interface IDireccion {
  pais: string;
  estado: string;
  municipio: string;
  cp: string;
}
