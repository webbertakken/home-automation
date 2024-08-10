import { describe, expect, it, vi } from 'vitest'

import { EntityList } from './entity-list'
describe('EntityList', () => {
  it('compiles', () => {
    const hass = {
      socket: {
        onConnect: vi.fn(),
        onDisconnect: vi.fn(),
        onUpdate: vi.fn(),
      },
    }
    const logger = { debug: vi.fn(), info: vi.fn() }
    const home_automation = {
      helper: { doStuff: vi.fn(), theChosenEntity: { onUpdate: vi.fn() } },
    }

    // @ts-expect-error these are not fully fledged out as this is a quick example
    EntityList({ hass, home_automation, logger })
    expect(hass.socket.onConnect).toHaveBeenCalledTimes(1)
    expect(home_automation.helper.theChosenEntity.onUpdate).toHaveBeenCalledTimes(1)
  })
})
