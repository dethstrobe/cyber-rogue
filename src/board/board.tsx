import React, { useEffect, useCallback } from "react"
import { moveActions } from "../reducers/move"
import { State } from "../reducers/State"
import {
  PlayerState,
  GameMap,
  EnemyState,
  EnemyLocation,
  Coordinates,
} from "../reducers/types"
import { connect } from "react-redux"
import { renderBoard } from "./renderBoard"
import { PlayerActions } from "../Menu/Menu"
import { AttackAction } from "../reducers/attack"

interface StateProps {
  player: PlayerState
  map: GameMap
  enemyLocations: EnemyLocation
  enemies: EnemyState[]
}

interface OwnProps {
  selectedPlayerAction: PlayerActions
}

interface DispatchProps {
  move: (payload: Coordinates) => void
  attack: (payload: Coordinates) => void
}

export type Props = StateProps & DispatchProps & OwnProps

const scale = 100

const Board: React.FC<Props> = ({
  move,
  attack,
  player,
  map,
  enemies,
  enemyLocations,
  selectedPlayerAction,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const findCenter = useCallback((canvas: HTMLCanvasElement) => {
    const halfScale = scale / 2

    return {
      x: canvas.width / 2 - halfScale,
      y: canvas.height / 2 - halfScale,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    const ctx = canvas.getContext("2d"),
      center = findCenter(canvas)
    if (ctx)
      renderBoard(ctx, {
        scale,
        center,
        player,
        map,
        enemies,
      })
  }, [player, enemies, map, enemyLocations, findCenter])

  return (
    <canvas
      data-testid="game-board"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        if (!canvasRef.current) return
        const center = findCenter(canvasRef.current)
        const clickLoc = {
          x: Math.floor((e.clientX - center.x) / scale),
          y: Math.floor((e.clientY - center.y) / scale),
        }

        if (selectedPlayerAction === "move") {
          move({ x: player.x + clickLoc.x, y: player.y + clickLoc.y })
        } else if (selectedPlayerAction === "attack") {
          attack({ x: player.x + clickLoc.x, y: player.y + clickLoc.y })
        }
      }}
    />
  )
}

export default connect<StateProps, DispatchProps, OwnProps, State>(
  ({ player, map, enemies, enemyLocations }) => ({
    player,
    map,
    enemies,
    enemyLocations,
  }),
  { ...moveActions, attack: AttackAction },
)(Board)
export { Board }
