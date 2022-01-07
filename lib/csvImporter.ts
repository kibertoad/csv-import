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
  stream: Readable,
  columnConfig: ColumnDefinitions,
  csvOptions: Omit<Options, 'columns'>,
  delimiter?: string
): Promise<ImportResult<T>> {
  const x = csvOptions.delimiter
  let csvOprionsWithDelimiter = csvOptions
  if (delimiter) {
    csvOprionsWithDelimiter = { ...csvOptions, delimiter }
  }
  return new Promise((resolve, reject) => {
    const startTime = new Date()
    const validationContext = new ValidationContext({
      fromLine: csvOptions.fromLine || csvOptions.from_line,
    })
    const result: T[] = []
    const columns = columnConfig.map((column) => column.column)
    const parser = parse({
      ...csvOprionsWithDelimiter,
      columns,
    })
    parser.on('readable', function () {
      let row
      while ((row = parser.read()) !== null) {
        const entity: Record<string, any> = {}
        for (var i = 0; i < columnConfig.length; i++) {
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
    parser.on('error', function (err) {
      reject(err)
    })
    parser.on('end', function () {
      const endDate = new Date()
      resolve({
        data: result,
        validationResult: validationContext.getResult(),
        importTime: endDate.getTime() - startTime.getTime(),
      })
    })
    stream.pipe(parser)
  })
}
