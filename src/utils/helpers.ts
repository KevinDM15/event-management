export function excelDateToJSDate(excelSerialDate: number) {
  const excelEpoch = new Date(1900, 0, 1);
  const msPerDay = 86400000;

  const serialDays = excelSerialDate - 1;

  const jsDate = new Date(excelEpoch.getTime() + serialDays * msPerDay);
  return jsDate.toISOString().split('T')[0];
}

export function excelTimeToJS(timeValue: number) {
  const totalHours = timeValue * 24;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  // Formatear con ceros a la izquierda
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

