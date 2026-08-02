import type { RawReport, Report, ReportItem } from "@interfaces/modules/report";

export function ReportTransformer(raw: RawReport): Report {
  const buildGrade = (grade: string, str: string, definitive: string) =>
    ({
      grade: grade !== "AC" ? Number(grade) : grade,
      gradeString: str,
      definitive: definitive === "SI",
    }) satisfies ReportItem;
  return {
    courseId: raw.idcurso,
    cycleId: raw.idciclo,
    sectionId: raw.crn,
    ordinary: buildGrade(
      raw.caliordinario,
      raw.caliordiletra,
      raw.caliordirolad,
    ),
    extraordinary:
      raw.caliextraordi !== null
        ? buildGrade(raw.caliextraordi, raw.caliextrletra!, raw.caliextrrolad)
        : undefined,
  };
}
