import { TServiceParams } from '@digital-alchemy/core'

export function EntityList({ hass, logger, homeAutomation }: TServiceParams) {
  const { theSun } = homeAutomation.helpers

  hass.socket.onConnect(async () => {
    const resultText = homeAutomation.helpers.doStuff()
    const entities = hass.entity.listEntities()
    logger.info({ entities, resultText }, 'hello world')
    await hass.call.notify.notify({
      message: 'Hello world from digital-alchemy',
    })
  })

  theSun.onUpdate(() => {
    logger.debug(
      {
        attributes: theSun.attributes,
        state: theSun.state,
      },
      `theChosenEntity updated`,
    )
  })
}
