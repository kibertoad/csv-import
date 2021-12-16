export type Error = {
  code: string
  column: string
  line: number
}

export type ValidationOptions = {
  fromLine?: number
}

export type ValidationResult = {
  isValid: boolean
  errors: Error[]
}

export class ValidationContext {
  private currentRow: number
  private errors: Error[]

  constructor(options: ValidationOptions = {}) {
    this.currentRow = options.fromLine ? options.fromLine : 1
    this.errors = []
  }

  public nextRow(): void {
    this.currentRow++
  }

  addError(column: string, errorCode: string): void {
    this.errors.push({
      column,
      line: this.currentRow,
      code: errorCode,
    })
  }

  getResult(): ValidationResult {
    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
    }
  }
}
