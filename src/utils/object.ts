/**
 * Check if the input is an object
 *
 * @param input - The input to check
 * @returns True if the input is an object, false otherwise
 */
export const isObject = <T>(input: T): input is T & object => input !== null && typeof input === 'object'
