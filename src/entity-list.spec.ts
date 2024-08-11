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
    const homeAutomation = {
      helpers: { doStuff: vi.fn(), theSun: { onUpdate: vi.fn() } },
    }

    // @ts-expect-error these are not fully fledged out as this is a quick example
    EntityList({ hass, homeAutomation, logger })
    expect(hass.socket.onConnect).toHaveBeenCalledTimes(1)
    expect(homeAutomation.helpers.theSun.onUpdate).toHaveBeenCalledTimes(1)
  })
})
