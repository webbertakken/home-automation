import { LIB_AUTOMATION } from '@digital-alchemy/automation'
import { CreateApplication, StringConfig } from '@digital-alchemy/core'
import { LIB_HASS } from '@digital-alchemy/hass'
import { LIB_SYNAPSE } from '@digital-alchemy/synapse'

import { RuntimePrecedence } from './core/runtime-precedence'
import { Setup } from './core/setup'
import { Helpers } from './helpers'
import { Office } from './office'

type AutomationEnvironments = 'development' | 'production' | 'test'

const HOME_AUTOMATION = CreateApplication({
  name: 'homeAutomation',
  configuration: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
      enum: ['development', 'production', 'test'],
      description: "Code runner addon can set with it's own NODE_ENV",
    } satisfies StringConfig<AutomationEnvironments>,

    MY_CONFIG_SETTING: {
      default: 'foo',
      description: 'A configuration defined as an example',
      type: 'string',
    },
  },

  // Plugins for TSServiceParams
  libraries: [LIB_HASS, LIB_SYNAPSE, LIB_AUTOMATION],

  // Service initialization order
  priorityInit: ['setup', 'runtimePrecedence', 'helpers'],
  services: {
    setup: Setup,
    runtimePrecedence: RuntimePrecedence,
    helpers: Helpers,
    office: Office,
  },
})

// Do some magic to make all the types work
declare module '@digital-alchemy/core' {
  export interface LoadedModules {
    homeAutomation: typeof HOME_AUTOMATION
  }
}

// bootstrap application
setImmediate(
  async () =>
    await HOME_AUTOMATION.bootstrap({
      configuration: {
        boilerplate: { LOG_LEVEL: 'info' },
      },
    }),
)
