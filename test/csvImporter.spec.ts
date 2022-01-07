import { resolve } from 'path'
import { getFileStream } from './utils/fileUtils'
import { ColumnDefinitions, loadFromCsv } from '../lib/csvImporter'
import {
  toMandatoryDate,
  toMandatoryFloat,
  toMandatoryInteger,
  toMandatoryString,
  toOptionalBoolean,
  toOptionalDate,
  toOptionalFloat,
  toOptionalInteger,
  toOptionalString,
} from '../lib/mappers'

describe('csvImporter', () => {
  describe('loadEntities', () => {
    it('correctly loads large file', async () => {
      const filePath = resolve(__dirname, 'data', 'stop_times.csv')
      const stream = getFileStream(filePath)
      const columnConfig: ColumnDefinitions = [
        {
          column: 'trip_id',
          entityField: 'tripId',
          mapper: toMandatoryInteger,
        },
        {
          column: 'arrival_time',
          entityField: 'arrival_time',
          mapper: toOptionalString,
        },
        {
          column: 'departure_time',
          entityField: 'departure_time',
          mapper: toMandatoryString,
        },
        {
          column: 'stop_id',
          entityField: 'stop_id',
          mapper: toMandatoryInteger,
        },
        {
          column: 'stop_sequence',
          entityField: 'stop_sequence',
          mapper: toMandatoryInteger,
        },
        {
          column: 'pickup_type',
          entityField: 'pickup_type',
          mapper: toMandatoryInteger,
        },
        {
          column: 'drop_off_type',
          entityField: 'drop_off_type',
          mapper: toMandatoryInteger,
        },
        {
          column: 'destinationTraveled',
          entityField: 'destinationTraveled',
          mapper: toOptionalInteger,
          defaultValue: 0,
        },
        {
          column: 'priority',
          entityField: 'priority',
          mapper: toOptionalBoolean,
          defaultValue: false,
        },
      ]
      const delimiter = ','
      const result = await loadFromCsv(
        stream,
        columnConfig,
        {
          fromLine: 2,
        },
        delimiter
      )
      console.log(`Import time: ${result.importTime}`)
      expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(512781)
      expect(result.data[0]).toMatchSnapshot()
      expect(result.data[8785]).toMatchSnapshot()
      expect(result.data[112780]).toMatchSnapshot()
      expect(result.data[212780]).toMatchSnapshot()
      expect(result.data[312780]).toMatchSnapshot()
      expect(result.data[512760]).toMatchSnapshot()
      expect(result.data[512780]).toMatchSnapshot()
    }, 90000)

    it('correctly loads medium file', async () => {
      const filePath = resolve(__dirname, 'data', 'stop_times_mid.csv')
      const stream = getFileStream(filePath)
      const columnConfig: ColumnDefinitions = [
        {
          column: 'trip_id',
          entityField: 'tripId',
          mapper: toMandatoryInteger,
        },
        {
          column: 'arrival_time',
          entityField: 'arrival_time',
          mapper: toOptionalString,
        },
        {
          column: 'departure_time',
          entityField: 'departure_time',
          mapper: toMandatoryString,
        },
        {
          column: 'stop_id',
          entityField: 'stop_id',
          mapper: toMandatoryInteger,
        },
        {
          column: 'stop_sequence',
          entityField: 'stop_sequence',
          mapper: toMandatoryInteger,
        },
        {
          column: 'pickup_type',
          entityField: 'pickup_type',
          mapper: toMandatoryInteger,
        },
        {
          column: 'drop_off_type',
          entityField: 'drop_off_type',
          mapper: toMandatoryInteger,
        },
        {
          column: 'destinationTraveled',
          entityField: 'destinationTraveled',
          mapper: toOptionalFloat,
          defaultValue: 0.0,
        },
        {
          column: 'priority',
          entityField: 'priority',
          mapper: toOptionalBoolean,
          defaultValue: true,
        },
      ]
      const delimiter = ','
      const result = await loadFromCsv(
        stream,
        columnConfig,
        {
          fromLine: 2,
        },
        delimiter
      )
      console.log(`Import time: ${result.importTime}`)
      expect(result.data.length).toEqual(5040)
      expect(result.data[0]).toMatchSnapshot()
      expect(result.data[1020]).toMatchSnapshot()
      expect(result.data[5030]).toMatchSnapshot()
      expect(result.data[5039]).toMatchSnapshot()
    }, 90000)

    it('correctly returns errors', async () => {
      const filePath = resolve(__dirname, 'data', 'stop_times_errors.csv')
      const stream = getFileStream(filePath)
      const columnConfig: ColumnDefinitions = [
        {
          column: 'trip_id',
          entityField: 'tripId',
          mapper: toMandatoryString,
        },
        {
          column: 'arrival_time',
          entityField: 'arrival_time',
          mapper: toOptionalDate,
        },
        {
          column: 'departure_time',
          entityField: 'departure_time',
          mapper: toMandatoryDate,
        },
        {
          column: 'stop_id',
          entityField: 'stop_id',
          mapper: toMandatoryInteger,
        },
        {
          column: 'stop_sequence',
          entityField: 'stop_sequence',
          mapper: toMandatoryInteger,
        },
        {
          column: 'pickup_type',
          entityField: 'pickup_type',
          mapper: toMandatoryInteger,
        },
        {
          column: 'drop_off_type',
          entityField: 'drop_off_type',
          mapper: toMandatoryInteger,
        },
        {
          column: 'destinationTraveled',
          entityField: 'destinationTraveled',
          mapper: toOptionalString,
        },
        {
          column: 'priority',
          entityField: 'priority',
          mapper: toOptionalBoolean,
        },
      ]
      const delimiter = ','
      const result = await loadFromCsv(
        stream,
        columnConfig,
        {
          fromLine: 2,
        },
        delimiter
      )
      console.log(`Import time: ${result.importTime}`)
      expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(7)
      expect(result.data).toMatchSnapshot()
    })

    it('correctly loads medium file if columns separated by ;', async () => {
      const filePath = resolve(__dirname, 'data', 'stop_times_separated_by_semi.csv')
      const stream = getFileStream(filePath)
      const columnConfig: ColumnDefinitions = [
        {
          column: 'trip_id',
          entityField: 'tripId',
          mapper: toMandatoryInteger,
        },
        {
          column: 'arrival_time',
          entityField: 'arrival_time',
          mapper: toOptionalString,
        },
        {
          column: 'departure_time',
          entityField: 'departure_time',
          mapper: toMandatoryString,
        },
        {
          column: 'stop_id',
          entityField: 'stop_id',
          mapper: toMandatoryFloat,
        },
      ]
      const delimiter = ';'
      const result = await loadFromCsv(
        stream,
        columnConfig,
        {
          fromLine: 2,
        },
        delimiter
      )
      console.log(`Import time: ${result.importTime}`)
      expect(result.data.length).toEqual(2)
      expect(result.data[0]).toMatchSnapshot()
      expect(result.data[1]).toMatchSnapshot()
    }, 90000)
  })
})
