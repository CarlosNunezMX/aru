const months: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};

export function parseRegistrationPeriod(text: string): {
  start: Date;
  end: Date;
} {
  const regex =
    /(\d{2}) de (\w+) de (\d{4}) a (?:partir de )?las (\d{2}:\d{2})/gi;

  const matches = [...text.matchAll(regex)];

  if (matches.length !== 2) {
    throw new Error("No se pudo extraer el periodo de registro.");
  }

  const toDate = (match: RegExpMatchArray): Date => {
    const [, day, month, year, time] = match;
    const [hour, minute] = time.split(":").map(Number);

    return new Date(
      Number(year),
      months[month.toLowerCase()],
      Number(day),
      hour,
      minute,
    );
  };

  return {
    start: toDate(matches[0]),
    end: toDate(matches[1]),
  };
}
