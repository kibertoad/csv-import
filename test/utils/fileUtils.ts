import { createReadStream, existsSync } from 'fs'

export function getFileStream(filepath: string) {
  if (!existsSync(filepath)) {
    throw new Error(`${filepath} does not exist`)
  }
  const stream = createReadStream(filepath)
  return stream
}
