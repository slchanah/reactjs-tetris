import { useState, useEffect, } from 'react'
import { createStage } from '../utils/gameHelper'

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage())
    const [clearedRows, setClearedRows] = useState(0)

    useEffect(() => {
        setClearedRows(0)
        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setClearedRows(prevState => prevState + 1)
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']))
                    return ack
                }
                ack.push(row)
                return ack
            }, [])

        setStage(prevStage => {
            const newStage = prevStage.map(row =>
                row.map(cell =>
                    cell[1] === 'clear' ? [0, 'clear'] : cell))

            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value, `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                })
            })

            if (player.collided) {
                resetPlayer()
                return sweepRows(newStage)
            }

            return newStage
        })
    }, [player, resetPlayer])

    return [stage, setStage, clearedRows]
}