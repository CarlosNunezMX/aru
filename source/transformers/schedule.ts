import type { Hour, Item, ItemRaw, RawHour, RawSchedule, RawTeacher, Schedule, Teacher } from "@interfaces/modules";

export class ScheduleTransformer {
  public static transformHour(raw: RawHour): Hour {
    const [start, end] = raw.hora.split("-");
    const startHour = start.slice(0, 2),
      startMinutes = start.slice(-2);

    const endHour = end.slice(0, 2),
      endMinutes = end.slice(-2);
    return {
      building: raw.edificio,
      buildingId: raw.idedificio,
      day: raw.dia,
      classroom: raw.edificio,
      end: `${endHour}:${endMinutes}`,
      start: `${startHour}:${startMinutes}`,
    };
  }

  public static transformSchedule(
    raw: RawSchedule,
  ): Schedule {
    const transformDateString = (str: string) => {
      const [day, month, year] = str.trim().split("-");
      return `${year}/${month}/${day}`;
    };
    return {
      end: new Date(transformDateString(raw.fechafin)),
      start: new Date(transformDateString(raw.fechainicio)),
      horas: raw.horas.map((hour) => this.transformHour(hour)),
    };
  }

  public static transformTeacher(raw: RawTeacher): Teacher {
    return {
      id: raw.idprofesor,
      lastName: raw.apellidos,
      name: raw.nombres,
    };
  }

  public static transform(raw: ItemRaw): Item {
    return {
      campusId: raw.idcampus,
      courseId: raw.idcurso,
      courseName: raw.nombrecurso,
      teachers: raw.profesores.map((profesor) =>
        this.transformTeacher(profesor),
      ),
      credits: Number(raw.creditos),
      registryType: raw.tiporegistro,
      sectionId: raw.crn,
      sectionName: raw.numeseccion,
      schedule: raw.horarios.map((horario) => this.transformSchedule(horario)),
    };
  }
}
