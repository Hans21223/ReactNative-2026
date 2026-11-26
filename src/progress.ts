import { useSyncExternalStore } from 'react';
import { load, save } from '@/store';

// Keys: "<lessonKey>" when a lesson is done, "quiz:<moduleKey>" → best score, "last" → last opened lesson.
type Progress = Record<string, number | string>;

const parse = (s: string | null): Progress => {
  try {
    return s ? JSON.parse(s) : {};
  } catch {
    return {}; // corrupt data: start over rather than crash
  }
};

let state: Progress = parse(load('progress'));
const EMPTY: Progress = {};
const listeners = new Set<() => void>();

function set(patch: Progress) {
  state = { ...state, ...patch };
  save('progress', JSON.stringify(state));
  listeners.forEach((l) => l());
}

export const completeLesson = (key: string) => set({ [key]: 1, last: key });
export const openLesson = (key: string) => state.last !== key && set({ last: key });
export const saveQuiz = (module: string, score: number) => set({ [`quiz:${module}`]: Math.max(score, Number(state[`quiz:${module}`] ?? 0)) });
export const resetProgress = () => {
  state = {};
  set({});
};

export const useProgress = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => EMPTY, // web server render: no saved progress yet, the client fills it in after hydration
  );
