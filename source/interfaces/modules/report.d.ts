// ==| Raw Report |== //
export interface RawReport {
  crn: string;
  idcurso: string;
  caliordinario: string | "AC";
  caliordiletra: string;
  caliordirolad: string;

  caliextraordi: string | null | "AC";
  caliextrletra: string | null;
  caliextrrolad: string;
  idciclo: string;
}

// ==| Report Object |== //
export interface ReportItem {
  grade: string | number;
  gradeString: string;
  definitive: boolean;
}

export interface Report {
  courseId: string;
  sectionId: string;
  cycleId: string;

  ordinary: ReportItem;
  extraordinary?: ReportItem;
}
