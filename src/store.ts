import Storage from 'expo-sqlite/kv-store';

// Native: SQLite-backed key-value store (sync API, survives app restarts).
export const load = (key: string) => Storage.getItemSync(key);
export const save = (key: string, value: string) => Storage.setItemSync(key, value);
