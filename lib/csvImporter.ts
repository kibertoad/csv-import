import { Options, parse } from 'csv-parse'
import { Readable } from 'stream'
import { Mapper } from './mappers'
import { ValidationContext, ValidationResult } from './validation'

export type ColumnDefinition<T> = {
  column: string
  entityField: string
  mapper: Mapper<T>
  defaultValue?: T
}

export type ColumnDefinitions = ColumnDefinition<any>[]

export type ImportResult<T> = {
  data: T[]
  validationResult: ValidationResult
  importTime: number
}

export function loadFromCsv<T extends Record<string, any>>(
  stream: Readable | Buffer | string,
  columnConfig: ColumnDefinitions,
  csvOptions: Omit<Options, 'columns'>
): Promise<ImportResult<T>> {
  return new Promise((resolve, reject) => {
    const startTime = new Date()
    const validationContext = new ValidationContext({
      fromLine: csvOptions.fromLine || csvOptions.from_line,
    })
    const result: T[] = []
    const columns = columnConfig.map((column) => column.column)
    const parser =
      stream instanceof Readable
        ? parse({
            ...csvOptions,
            columns,
          })
        : parse(stream, {
            ...csvOptions,
            columns,
          })

    parser.on('readable', () => {
      let row
      while ((row = parser.read()) !== null) {
        const entity: Record<string, any> = {}
        for (let i = 0; i < columnConfig.length; i++) {
          const columnConfigEntry = columnConfig[i]
          entity[columnConfigEntry.entityField] = columnConfigEntry.mapper(
            columnConfigEntry.column,
            row[columnConfigEntry.column],
            validationContext,
            columnConfigEntry.defaultValue ?? undefined
          )
        }
        result.push(entity as T)
        validationContext.nextRow()
      }
    })
    parser.on('error', (err) => {
      reject(err)
    })
    parser.on('end', () => {
      const endDate = new Date()
      resolve({
        data: result,
        validationResult: validationContext.getResult(),
        importTime: endDate.getTime() - startTime.getTime(),
      })
    })

    if (stream instanceof Readable) {
      stream.pipe(parser)
    }
  })
}
