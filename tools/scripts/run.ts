import { execSync, ExecSyncOptions } from 'child_process'

export function runCommandSyncWithTTY(command: string): void {
  try {
    // Using stdio: 'inherit' to forward stdin, stdout, and stderr
    const options: ExecSyncOptions = { stdio: 'inherit' }
    execSync(command, options)
  } catch (error) {
    console.error(`Error executing command: ${error}`)
  }
}
