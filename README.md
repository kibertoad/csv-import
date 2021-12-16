# csv-import
Node.js library for importing data from CSV files

## Getting starte

First install the package:

```bash
npm i csv-import
```

Next, describe your import configuration:

```ts
  import { createReadStream } from 'fs'
  import { resolve } from 'path'
  import { 
    loadFromCsv,
    toOptionalString,
    toMandatoryString,
    toMandatoryInteger,
    toOptionalFloat,
    toOptionalBoolean  
  } from 'csv-import'

  const filePath = resolve(__dirname, 'data', 'stop_times_mid.csv')
  const stream = createReadStream(filePath)
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
      defaultValue: 0.0
    },
    {
      column: 'priority',
      entityField: 'priority',
      mapper: toOptionalBoolean,
      defaultValue: true
    },
    ]
    
  const result = await loadEntities(stream, columnConfig, {
    fromLine: 2, // If CSV file has headers included, this will skip them
  })
  console.log(`Import time: ${result.importTime}`)
  expect(result.data.length).toEqual(5040)
  expect(result.data[0]).toMatchSnapshot()
```
