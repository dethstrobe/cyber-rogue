import { EnemyState, EnemyLocation, GameMap, PlayerState } from "./types"

export const _ = undefined

const defaultEnemies = [
  new EnemyState({
    x: 2,
    y: 2,
    actions: [
      { x: 2, y: 2 },
      { x: 4, y: 7 },
    ],
    actionIndex: 0,
  }),
  new EnemyState({
    hp: 5,
    x: 5,
    y: 5,
    actions: [
      { x: 9, y: 5 },
      { x: 5, y: 5 },
    ],
    actionIndex: 0,
  }),
]

export class State {
  constructor(enemies: EnemyState[] = defaultEnemies) {
    this.enemies = enemies
    enemies.forEach(({ x, y }, index) => {
      this.enemyLocations[y][x] = index
    })
  }
  player: PlayerState = {
    x: 0,
    y: 0,
    speed: 2.5,
    steps: [],
  }
  map: GameMap = [
    ["O", "O", "O", "X", "O", "O", "O", "X", "O", "O"],
    ["O", "O", "O", "X", "O", "O", "O", "X", "O", "O"],
    ["O", "O", "O", "X", "X", "O", "X", "X", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
  ]
  enemyLocations: EnemyLocation = [
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
    [_, _, _, _, _, _, _, _, _, _],
  ]
  enemies: EnemyState[] = []
}
