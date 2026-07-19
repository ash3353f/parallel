// Global & Domain Type Definitions
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
