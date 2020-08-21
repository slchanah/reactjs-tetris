import { useState, useEffect } from 'react'

import { getNextImg, getRandomGameOverImg } from '../utils/imgHelper'

export const useImage = (score, level, gameOver) => {
    const [threshold, setThreshold] = useState(100)
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if (score >= threshold) {
            setThreshold(Math.ceil(score / 100) * 100 + 100 * level)
            setImageUrl(getNextImg())
        }
        if (gameOver) {
            setImageUrl(getRandomGameOverImg())
        }
    }, [score, level, threshold, gameOver])

    return [threshold, setThreshold, imageUrl, setImageUrl]
}