import { TServiceParams } from '@digital-alchemy/core'

export function RuntimePrecedence({ logger, config, hass, lifecycle }: TServiceParams) {
  // Whether this runtime is in development mode or not
  const isDevelop = config.homeAutomation.NODE_ENV === 'development'

  // When developing locally, the production runtime will pause and the development runtime will take over
  // @ts-expect-error - Entity will be created by setting the state here.
  const isDevelopmentActive = hass.refBy.id('binary_sensor.is_development_runtime_active')

  // Block outgoing commands and most incoming messages in prod when dev overrides it.
  isDevelopmentActive.onUpdate(() => {
    if (isDevelopmentActive.state === 'on') {
      logger.info('Development runtime takes over')
      // dev takes over, prod pauses
      hass.socket.pauseMessages = !isDevelop
    } else {
      logger.info('Resuming production runtime')
      // prod resumes, dev pauses
      hass.socket.pauseMessages = isDevelop
    }
  })

  // Update the state on startup
  lifecycle.onReady(() => {
    if (isDevelop) isDevelopmentActive.state = 'on'
  })

  // Give the go ahead for production to take over again when shutting down
  lifecycle.onPreShutdown(async () => {
    if (!isDevelop) return

    isDevelopmentActive.state = 'off'

    const result = await isDevelopmentActive.nextState(5000)
    if (!result) return logger.error(`Unable to verify that production runtime has taken over.`)

    logger.info(`Production runtime has taken over. Development: ${result.state}`)
  })
}
