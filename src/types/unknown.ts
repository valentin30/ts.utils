export type Unknown<T> = T | Omit<unknown, T & string>
