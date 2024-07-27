/**
 * Cast a value to a specific type.
 *
 * @param value - The value to cast.
 * @returns The value casted to the specified type.
 */
export const cast = <T>(value: unknown): T => value as T
