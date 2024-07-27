import { Fn } from 'types/fn'
import { Unknown } from 'types/unknown'
import { cast } from 'utils/cast'

/**
 *
 * @param {Value} value - The value to be evaluated
 * @returns {Given<Value, never>} A `Given` object that allows you to define the possible outcomes
 * @summary A function that allows you to define the possible outcomes of a value
 * @example
 * const value = given(1)
 *    .when(1, (v) => 'one')
 *    .when(2, (v) => 'two')
 *    .otherwise((v) => 'unknown')
 *
 * const value = given(true)
 *   .when(true, () => 'true')
 *   .otherwise(() => 'false')
 *
 * @author Valentin Spasov
 *
 */
export const given = <const Value>(value: Value): Given<Value> => __given__(value)

export type Given<Value, Result = never> = {
    when<const LocalValue extends Unknown<Value>, const LocalResult>(
        value: LocalValue,
        callback: Callback<LocalValue, LocalResult>,
    ): Given<Exclude<Value, LocalValue>, Result | WithResult<Value, LocalResult>>
    otherwise<const LocalResult = never>(callback: Callback<Value, LocalResult>): Result | WithResult<Value, LocalResult>
}

type Callback<Value, Result> = Fn<[value: Value], Result>
type WithResult<Value, Result> = Value extends never ? never : Result

const __given__ = <const Value, const Return = never>(value: Value, internal?: Callback<Value, Return>): Given<Value, Return> => ({
    when: (...args) => when([value, internal], args),
    otherwise: callback => otherwise(value, cast(internal || callback)),
})

const when = <const Value, const Result, const LocalValue extends Unknown<Value>, const LocalResult>(
    root: [value: Value, callback?: Callback<Value, Result>],
    self: [value: LocalValue, callback: Callback<LocalValue, LocalResult>],
) =>
    __given__(
        cast<Exclude<Value, LocalValue>>(root[0]),
        cast<Callback<Exclude<Value, LocalValue>, Result> | undefined>(self[0] === root[0] && !root[1] ? self[1] : root[1]),
    )

const otherwise = <const Value, const Result = never>(value: Value, callback: Callback<Value, Result>) => callback(value)
