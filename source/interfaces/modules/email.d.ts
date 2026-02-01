export interface CorreoElectronico {
  idalumno: string;
  correos: {
    correlectro: string;
    contrasenia: string;
    estacuenta: string;
  }[];
}

export interface Email {
    mail: string;
    status: boolean;
    password: string;
}
