import { ReducerFunction } from "../game.reducer"
import { Coordinates, EnemyLocation } from "../types"
import { isTileBlocked, findSteps } from "../move"

interface EnemyUpdater {
  index: number
  newLocation: Coordinates
  actionIndex: number
}

export const enemyReducer: ReducerFunction = state => {
  const enemyUpdateQue: EnemyUpdater[] = [],
    enemies = [...state.enemies]

  const newEnemyLocations: EnemyLocation = state.enemyLocations.map((row, y) =>
    row.map((tile, x) => {
      if (typeof tile === "number") {
        const enemy = state.enemies[tile]
        let { actionIndex = 0 } = enemy,
          waypoint = enemy.actions[actionIndex]

        if (waypoint) {
          if (waypoint.x === x && waypoint.y === y) {
            actionIndex += actionIndex === enemy.actions.length - 1 ? -1 : 1
            waypoint = enemy.actions[actionIndex]
          }
          const theta = Math.atan2(waypoint.y - y, waypoint.x - x),
            newLocation = {
              x: Math.round(Math.cos(theta) * enemy.speed) + x,
              y: Math.round(Math.sin(theta) * enemy.speed) + y,
            }

          if (
            isTileBlocked(newLocation, state.map) ||
            enemyUpdateQue.some(
              ({ newLocation: { x: quedX, y: quedY } }) =>
                quedX === newLocation.x && quedY === newLocation.y,
            ) ||
            (newLocation.x === state.player.x &&
              newLocation.y === state.player.y)
          ) {
            enemies[tile] = { ...enemies[tile], steps: [] }
            return tile
          }

          enemyUpdateQue.push({ index: tile, newLocation, actionIndex })
          return undefined
        }
      }

      return tile
    }),
  )

  if (enemyUpdateQue.length === 0)
    return {
      ...state,
      enemies: [...enemies.map(enemy => ({ ...enemy, steps: [] }))],
    }

  enemyUpdateQue.forEach(({ index, newLocation, actionIndex }) => {
    newEnemyLocations[newLocation.y][newLocation.x] = index

    enemies[index] = {
      ...state.enemies[index],
      ...newLocation,
      steps: findSteps(enemies[index], newLocation, state.map),
      actionIndex,
    }
  })

  return { ...state, enemyLocations: newEnemyLocations, enemies }
}
