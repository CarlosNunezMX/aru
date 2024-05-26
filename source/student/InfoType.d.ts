import type { DirtyType } from "../utils/generics/ResponseOK";

export type StudentInfoType = {
    alumcodigo: string;
    nombre: string;
    genero: "M" | "F";
    curp: string;
    fechnacimient: string;
    curp: string;
    rfc: string | null;
    imss: string;
    email: string;
    teleemergenci: string;
    /** Foto del alumno codificada en Base64 */
    foto: string;
    /** Firma del alumno codificada en Base64 */
    firma: string;
    tiposangre: string | null;
    desctiposangr: string | null;
    lugadomicilioDB: string;
    lugadomicilio: DomicilioFormated;
    domicilio: string;
}

export type DomicilioFormated = {
    pais: string;
    estado: string;
    municipio: string;
    cp: string;
}

export type DirtyStudentInfoType = DirtyType<StudentInfoType>