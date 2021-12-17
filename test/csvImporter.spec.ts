import { resolve } from 'path'
import { getFileStream } from './utils/fileUtils'
import { ColumnDefinitions, loadFromCsv } from '../lib/csvImporter'
import {
  toMandatoryBoolean,
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
      const result = await loadFromCsv(stream, columnConfig, {
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
    it('correctly loads large file stopsWithErrors', async () => {
      const filePath = resolve(__dirname, 'data', 'stopsWithErrors.csv')
      const stream = getFileStream(filePath)
      const columnConfig: ColumnDefinitions = [
        {
          column: 'stopId',
          entityField: 'stopId',
          mapper: toMandatoryString,
        },
        {
          column: 'code',
          entityField: 'code',
          mapper: toOptionalInteger,
        },
        {
          column: 'name',
          entityField: 'name',
          mapper: toMandatoryString,
        },
        {
          column: 'description',
          entityField: 'description',
          mapper: toOptionalString,
        },
        {
          column: 'latitude',
          entityField: 'latitude',
          mapper: toMandatoryFloat,
        },
        {
          column: 'longitude',
          entityField: 'longitude',
          mapper: toMandatoryFloat,
        },
        {
          column: 'url',
          entityField: 'url',
          mapper: toOptionalString,
        },
        {
          column: 'stopTypeId',
          entityField: 'stopTypeId',
          mapper: toMandatoryString,
        },
        {
          column: 'hasWifi',
          entityField: 'hasWifi',
          mapper: toOptionalBoolean,
        },
        {
          column: 'managerId',
          entityField: 'managerId',
          mapper: toOptionalString,
        },

        {
          column: 'geom',
          entityField: 'geom',
          mapper: toOptionalString,
        },
        {
          column: 'isActive',
          entityField: 'isActive',
          mapper: toMandatoryBoolean,
        },
      ]
      const result = await loadFromCsv(stream, columnConfig, {
        fromLine: 2,
      })
      console.log(result.data, `Import time: ${result.importTime}`)
      // expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(6)
      // expect(result.data).toMatchSnapshot()
      // expect(result.data[8785]).toMatchSnapshot()
      // expect(result.data[112780]).toMatchSnapshot()
      // expect(result.data[212780]).toMatchSnapshot()
      // expect(result.data[312780]).toMatchSnapshot()
      // expect(result.data[512760]).toMatchSnapshot()
      // expect(result.data[512780]).toMatchSnapshot()
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
      const result = await loadFromCsv(stream, columnConfig, {
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
      const result = await loadFromCsv(stream, columnConfig, {
        fromLine: 2,
      })
      console.log(`Import time: ${result.importTime}`)
      expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(7)
      expect(result.data).toMatchSnapshot()
    })
  })
})
