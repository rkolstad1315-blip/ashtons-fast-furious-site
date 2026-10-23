import { workUnitAsyncStorage } from "next/dist/server/app-render/work-unit-async-storage.external";

export function requestPathname(): string {
  const store = workUnitAsyncStorage.getStore();
  if (store && "url" in store) {
    return store.url.pathname || "/";
  }
  return "/";
}
