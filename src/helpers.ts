import { TServiceParams } from '@digital-alchemy/core'

export function Helpers({ logger, config, hass }: TServiceParams) {
  const theSun = hass.refBy.id('sun.sun')

  const doStuff = (): string => {
    logger.info('doStuff was called!')

    return config.homeAutomation.MY_CONFIG_SETTING
  }

  return { theSun, doStuff }
}
