import { resolve } from 'path'
import { getFileStream } from './utils/fileUtils'
import { ColumnDefinitions, loadEntities } from '../lib/csvImporter'
import {
  toMandatoryDate,
  toMandatoryInteger,
  toMandatoryString,
  toOptionalBoolean,
  toOptionalDate,
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
      const result = await loadEntities(stream, columnConfig, {
        fromLine: 2,
      })
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
      const result = await loadEntities(stream, columnConfig, {
        fromLine: 2,
      })
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
      const result = await loadEntities(stream, columnConfig, {
        fromLine: 2,
      })
      console.log(`Import time: ${result.importTime}`)
      expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(7)
      expect(result.data).toMatchSnapshot()
    })
  })
})
