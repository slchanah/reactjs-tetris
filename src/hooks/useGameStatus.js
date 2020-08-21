import { useState, useEffect, useCallback } from 'react'

export const useGameStatus = clearedRows => {
    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)
    const [level, setLevel] = useState(0)

    const linePoints = [40, 100, 300, 1200]

    const calcScore = useCallback(() => {
        if (clearedRows > 0) {
            setScore(prevScore => prevScore + linePoints[clearedRows - 1] * (level + 1))
            setRows(prevRows => prevRows + clearedRows)
        }
    }, [clearedRows, level, linePoints])

    useEffect(() => {
        calcScore()
    }, [clearedRows, calcScore])

    return [score, setScore, rows, setRows, level, setLevel]
}