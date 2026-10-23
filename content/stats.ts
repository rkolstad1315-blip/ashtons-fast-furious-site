export type Stats = {
  sessionsRun: number | null;
  dogsServed: number | null;
};

export const stats: Stats = {
  sessionsRun: null,
  dogsServed: null,
};

export function shouldShowStats(value: Stats): boolean {
  return value.sessionsRun !== null && value.dogsServed !== null;
}
