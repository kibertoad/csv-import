import { ValidationContext } from './validation'

export enum ErrorCodes {
  MISSING_MANDATORY_FIELD = 'MISSING_MANDATORY_FIELD',
  INVALID_DATE_FORMAT = 'INVALID_DATE_FORMAT',
  INVALID_BOOLEAN_FORMAT = 'INVALID_BOOLEAN_FORMAT',
  INVALID_INTEGER_FORMAT = 'INVALID_INTEGER_FORMAT',
  INVALID_FLOAT_FORMAT = 'INVALID_FLOAT_FORMAT',
}

export type Mapper<T> = (
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: T | undefined
) => T

export function toOptionalString(
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: string | undefined
): string | undefined {
  if (input.length) {
    return input
  }
  return defaultValue
}

export function toMandatoryString(
  column: string,
  input: string,
  validationContext: ValidationContext
): string | undefined {
  if (input.length) {
    return input
  }
  validationContext.addError(column, ErrorCodes.MISSING_MANDATORY_FIELD)
  return undefined
}

export function toMandatoryInteger(
  column: string,
  input: string,
  validationContext: ValidationContext
): number | undefined {
  if (input.length) {
    const value = parseInt(input)
    if (!Number.isNaN(value)) {
      return value
    }
    validationContext.addError(column, ErrorCodes.INVALID_INTEGER_FORMAT)
    return undefined
  }
  validationContext.addError(column, ErrorCodes.MISSING_MANDATORY_FIELD)
  return undefined
}

export function toOptionalInteger(
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: number | undefined
): number | undefined {
  if (input.length) {
    const value = parseInt(input)
    if (!Number.isNaN(value)) {
      return value
    }
    validationContext.addError(column, ErrorCodes.INVALID_INTEGER_FORMAT)
    return undefined
  }
  return defaultValue
}

export function toMandatoryFloat(
  column: string,
  input: string,
  validationContext: ValidationContext
): number | undefined {
  if (input.length) {
    const value = parseFloat(input)
    if (!Number.isNaN(value)) {
      return value
    }
    validationContext.addError(column, ErrorCodes.INVALID_FLOAT_FORMAT)
    return undefined
  }
  validationContext.addError(column, ErrorCodes.MISSING_MANDATORY_FIELD)
  return undefined
}

export function toOptionalFloat(
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: number | undefined
): number | undefined {
  if (input.length) {
    const value = parseFloat(input)
    if (!Number.isNaN(value)) {
      return value
    }
    validationContext.addError(column, ErrorCodes.INVALID_FLOAT_FORMAT)
    return undefined
  }
  return defaultValue
}

export function toMandatoryBoolean(
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: boolean | undefined
): boolean | undefined {
  if (input.length) {
    if (input.toLowerCase() === 'true' || input === '1') {
      return true
    }
    if (input.toLowerCase() === 'false' || input === '0') {
      return false
    }
    validationContext.addError(column, ErrorCodes.INVALID_BOOLEAN_FORMAT)
    return undefined
  }
  return defaultValue
}

export function toOptionalBoolean(
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: '' | boolean | undefined
): boolean | undefined | '' {
  if (input.length) {
    if (input == '1') {
      return true
    }
    if (!input) {
      return false
    }
    validationContext.addError(column, ErrorCodes.INVALID_BOOLEAN_FORMAT)
    return undefined
  }
  return defaultValue
}

export function toOptionalDate(
  column: string,
  input: string,
  validationContext: ValidationContext,
  defaultValue: Date | undefined
): Date | undefined {
  if (input.length) {
    const value = new Date(input)
    if (isNaN(value.getTime())) {
      validationContext.addError(column, ErrorCodes.INVALID_DATE_FORMAT)
      return undefined
    }
    return value
  }
  return defaultValue
}

export function toMandatoryDate(
  column: string,
  input: string,
  validationContext: ValidationContext
): Date | undefined {
  if (input.length) {
    const value = new Date(input)
    if (isNaN(value.getTime())) {
      validationContext.addError(column, ErrorCodes.INVALID_DATE_FORMAT)
      return undefined
    }
    return value
  }
  validationContext.addError(column, ErrorCodes.MISSING_MANDATORY_FIELD)
  return undefined
}
