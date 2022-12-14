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

    it('correctly loads string stream', async () => {
      const input =
        'vehicleGarageNumber,longitude,latitude,speed,azimuth,tripStartInMinutes,deflectionInSeconds,time,vehicleType,routeShortName\n7015,25.20696,54.64424,0,260,1314,0,2021-12-13 19:30:28,bus,51\n8048,25.17336,54.70325,37,210,1315,0,2021-12-13 19:30:28,bus,4G\n7044,25.20286,54.68304,30,246,1339,5,2021-12-13 19:30:28,bus,116\n3039,25.29422,54.67497,38,80,1347,114,2021-12-13 19:30:28,bus,31\n2691,25.22013,54.69601,46,24,1329,-66,2021-12-13 19:30:28,trolleybus,16\n'

      const columnConfig: ColumnDefinitions = [
        {
          column: 'vehicleGarageNumber',
          entityField: 'vehicleGarageNumber',
          mapper: toMandatoryString,
        },
        {
          column: 'longitude',
          entityField: 'longitude',
          mapper: toMandatoryFloat,
        },
        {
          column: 'latitude',
          entityField: 'latitude',
          mapper: toMandatoryFloat,
        },
        {
          column: 'speed',
          entityField: 'speed',
          mapper: toMandatoryInteger,
        },
        {
          column: 'azimuth',
          entityField: 'azimuth',
          mapper: toMandatoryInteger,
        },
        {
          column: 'tripStartInMinutes',
          entityField: 'tripStartInMinutes',
          mapper: toOptionalInteger,
        },
        {
          column: 'deflectionInSeconds',
          entityField: 'deflectionInSeconds',
          mapper: toOptionalInteger,
        },
        {
          column: 'time',
          entityField: 'time',
          mapper: toMandatoryDate,
        },
        {
          column: 'vehicleTypeName',
          entityField: 'vehicleTypeName',
          mapper: toMandatoryString,
        },

        {
          column: 'routeShortName',
          entityField: 'routeShortName',
          mapper: toMandatoryString,
        },
      ]
      const result = await loadFromCsv(input, columnConfig, {
        fromLine: 2,
      })
      console.log(`Import time: ${result.importTime}`)
      expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(5)
      expect(result.data).toMatchSnapshot()
    })

    it('correctly returns string stream errors', async () => {
      const input =
        'vehicleGarageNumber,longitude,latitude,speed,azimuth,tripStartInMinutes,deflectionInSeconds,time,vehicleType,routeShortName\n7015,long,54.64424,0,260,1314,0,2021-12-13 19:30:28,bus,51\n8048,25.17336,54.70325,37,210,1315,0,datt,bus,4G\n7044,25.20286,54.68304,30,246,1339,5,2021-12-13 19:30:28,bus,116\n3039,25.29422,54.67497,speed,80,1347,114,2021-12-13 19:30:28,bus,31\n2691,25.22013,54.69601,46,24,1329,-66,2021-12-13 19:30:28,trolleybus,16\n'

      const columnConfig: ColumnDefinitions = [
        {
          column: 'vehicleGarageNumber',
          entityField: 'vehicleGarageNumber',
          mapper: toMandatoryString,
        },
        {
          column: 'longitude',
          entityField: 'longitude',
          mapper: toMandatoryFloat,
        },
        {
          column: 'latitude',
          entityField: 'latitude',
          mapper: toMandatoryFloat,
        },
        {
          column: 'speed',
          entityField: 'speed',
          mapper: toMandatoryInteger,
        },
        {
          column: 'azimuth',
          entityField: 'azimuth',
          mapper: toMandatoryInteger,
        },
        {
          column: 'tripStartInMinutes',
          entityField: 'tripStartInMinutes',
          mapper: toOptionalInteger,
        },
        {
          column: 'deflectionInSeconds',
          entityField: 'deflectionInSeconds',
          mapper: toOptionalInteger,
        },
        {
          column: 'time',
          entityField: 'time',
          mapper: toMandatoryDate,
        },
        {
          column: 'vehicleTypeName',
          entityField: 'vehicleTypeName',
          mapper: toMandatoryString,
        },

        {
          column: 'routeShortName',
          entityField: 'routeShortName',
          mapper: toMandatoryString,
        },
      ]
      const result = await loadFromCsv(input, columnConfig, {
        fromLine: 2,
      })
      console.log(`Import time: ${result.importTime}`)
      expect(result.validationResult).toMatchSnapshot()
      expect(result.data.length).toEqual(5)
      expect(result.data).toMatchSnapshot()
    })
  })
})
