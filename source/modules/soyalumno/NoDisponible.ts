export default class SoyAlumnoNoDisponible extends Error {
  constructor() {
    super("Soy Alumno no disponible");
    this.name = "SoyAlumnoNoDisponible";
  }
}
