export function cleanResponse<T>(d: Partial<T>): T {
  return ({
    ...(d || {}),
    password: undefined,
    keywords: undefined,
  } as unknown) as T;
}
