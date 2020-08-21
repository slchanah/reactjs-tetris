import { useState, useCallback } from 'react'

import { TETROMINOS, getRandomTetrominos } from '../utils/tetrominos'
import { STAGE_WIDTH, checkCollision } from '../utils/gameHelper'

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    })

    const rotate = (matrix, direction) => {
        const rotatedTetro = matrix.map((_, i) =>
            matrix.map(col => col[i])
        )

        if (direction > 0) {
            return rotatedTetro.map(row => row.reverse())
        }
        return rotatedTetro.reverse()
    }

    const playerRotate = (stage, direction) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, direction)

        // const pos = clonedPlayer.pos.x
        let offset = 1
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            if (offset > clonedPlayer.tetromino[0].length) {
                // rotate(clonedPlayer.tetromino, -direction)
                // clonedPlayer.pos.x = pos
                return
            }
        }

        setPlayer(clonedPlayer)
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prevState => {
            return {
                ...prevState,
                pos: {
                    x: prevState.pos.x += x,
                    y: prevState.pos.y += y
                },
                collided
            }
        })
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {
                x: STAGE_WIDTH / 2 - 2,
                y: 0
            },
            tetromino: getRandomTetrominos().shape,
            collided: false
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate]
}