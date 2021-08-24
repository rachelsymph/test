type DateParam = string | Date | undefined | null;

export function parseDate(dateParam: DateParam): null | Date {
  const date = new Date(dateParam as string);

  return dateParam && isFinite((date as unknown) as number) ? date : null;
}
