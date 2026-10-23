const dash = /[\u2013\u2014]/;

export function assertNoDash(value: unknown, label: string): void {
  if (dash.test(JSON.stringify(value))) {
    throw new Error(`Em dash or en dash in ${label}.`);
  }
}

export function assertMetaLength(title: string, description: string, label: string): void {
  if (title.length >= 60) {
    throw new Error(`${label} title is not under 60 characters.`);
  }
  if (description.length >= 155) {
    throw new Error(`${label} description is not under 155 characters.`);
  }
  assertNoDash({ title, description }, label);
}
