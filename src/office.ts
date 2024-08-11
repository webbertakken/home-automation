import { TServiceParams } from '@digital-alchemy/core'

export function Office({ hass, lifecycle, config }: TServiceParams) {
  // logic to run when everything is connected and good to go
  lifecycle.onReady(async () => {
    const { NODE_ENV } = config.homeAutomation
    await hass.call.notify.notify({
      message: `Your application is running in ${NODE_ENV}!`,
      title: 'Hello world 🔮',
    })
  })
}
