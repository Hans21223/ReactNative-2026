// Web: localStorage, so the web build needs no SQLite wasm setup.
// It can be blocked in private windows, which is why errors are ignored.
export const load = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
export const save = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};
