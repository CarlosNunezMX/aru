import type {
  RawOfferCourse,
  OfferCourse,
  Schedule,
  RawOfferHours,
  RawOfferSchedule,
  RawOfferHost,
  OfferHost,
  RawOfferProgram,
  OfferProgram,
  RawOfferCycle,
  OfferCycle,
} from "@interfaces/modules";

export class OfferTransformer {
  static transformHours(raw: RawOfferHours): Schedule.Hour {
    const parseRawHourStr = (str: string) =>
      `${str.slice(0, 2)}:${str.slice(-2)}`;
    return {
      building: raw.descedificio,
      buildingId: raw.idedificio,
      classroom: raw.aula,
      day: raw.dia,
      end: parseRawHourStr(raw.horafin),
      start: parseRawHourStr(raw.horainicio),
    };
  }

  static transformSchedule(raw: RawOfferSchedule): Schedule.Schedule {
    return {
      end: new Date(raw.fechfin),
      start: new Date(raw.fechinicio),
      horas: raw.horas.map((h) => this.transformHours(h)),
    };
  }

  static transform(raw: RawOfferCourse): OfferCourse {
    return {
      cycleId: raw.idciclo,
      subject: raw.subjmateria,
      hostId: raw.idsede,
      programId: raw.idprograma,
      program: raw.descarrera,

      courseId: raw.idmateria,
      courseName: raw.descmateria,
      subjectId: raw.idmateria,

      section: raw.seccion,
      seats: Number(raw.cupos),
      availableSeats: Number(raw.cupodisponibl),
      credits: Number(raw.creditos),

      teachers: raw.profesores.map((prof) => prof.nombprofesor),
      schedule: raw.horarios.map((schedule) =>
        this.transformSchedule(schedule),
      ),
    };
  }

  static transformOfferHost(host: RawOfferHost): OfferHost {
    return {
      id: host.idcentro,
      acronym: host.siglas,
      name: host.descripcion,
    };
  }

  static transformOfferProgram(raw: RawOfferProgram): OfferProgram {
    return {
      hostId: raw.idcentro,
      program: raw.desprograma,
      programId: raw.programa,
    };
  }

  static transformOfferCycle(raw: RawOfferCycle): OfferCycle {
    return {
      cycle: raw.descripcion,
      id: raw.ciclo,
    };
  }
}
