export const fixtureFactory = <T>(defaults: T) => (
  params: Partial<T> = {}
) => ({
  ...defaults,
  ...params,
});
