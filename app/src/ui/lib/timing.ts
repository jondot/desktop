import { Repository, nameOf } from '../../models/repository'

export function startTimer(task: string, repository: Repository) {
  const startTime = performance && performance.now ? performance.now() : null

  if (startTime === null) {
    log.warn(
      `[start] invoked but performance.now not found - are you using this outside the renderer?`
    )
  }

  return {
    done: () => {
      if (!startTime) {
        return
      }

      const rawTime = performance.now() - startTime
      const timeInSeconds = (rawTime / 1000).toFixed(3)
      const message = `Action '${task}' for '${nameOf(
        repository
      )}' took ${timeInSeconds}s`
      log.info(message)
    },
  }
}
