import { TServiceParams } from '@digital-alchemy/core'
import { Database } from 'bun:sqlite'

// This service will be loaded first. Use it to do any global setup.
export function Setup({ synapse }: TServiceParams) {
  synapse.sqlite.setDriver(Database)
}
