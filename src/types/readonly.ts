/**
 *
 * @param {T} T The type to make read only
 * @returns The readonly value from ReadOnlyTransformer or the native Readonly type
 * @summary Type to make a value read only by registering a transform type in ReadOnlyTransformer
 *
 * @example
 *
 * // File: value.ts
 *
 * declare module 'types/readonly' {
 *     interface ReadOnlyTransformer<T> {
 *         Value: T extends Value<infer G> ? ReadOnlyValue<G> : never
 *     }
 * }
 *
 * interface ReadOnlyValue<T> {
 *     getValue(): T
 * }
 *
 * interface Value<T> extends ReadOnlyValue<T> {
 *     setValue(value: T): void
 * }
 *
 * const value: ReadOnly<Value<number>> = {
 *     getValue: () => 5,
 * }
 *
 */
export type ReadOnly<T> = ReadOnlyTransformer<T>[keyof ReadOnlyTransformer<T>] extends never
    ? Readonly<T>
    : ReadOnlyTransformer<T>[keyof ReadOnlyTransformer<T>]

export interface ReadOnlyTransformer<T> {
    never: T extends never ? T : never
}

type String = ReadOnly<string>
type Number = ReadOnly<number>
type Boolean = ReadOnly<boolean>
type Array = ReadOnly<string[]>
type Object = ReadOnly<{ test: number }>
