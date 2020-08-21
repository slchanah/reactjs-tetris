import React, { useState } from 'react'

import { createStage, checkCollision } from '../utils/gameHelper'

import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus'
// import { useImage } from '../hooks/useImage'

import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import Header from './Header'

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const [stage, setStage, clearedRows] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(clearedRows)
    // const [threshold, setThreshold, imageUrl, setImageUrl] = useImage(score, level, gameOver)

    const moveLeftRightPlayer = direction => {
        if (!checkCollision(player, stage, { x: direction, y: 0 })) {
            updatePlayerPos({ x: direction, y: 0, collided: false })
        }
    }

    const startGame = () => {
        setStage(createStage())
        setDropTime(700)
        resetPlayer()
        setGameOver(false)
        setScore(0)
        setRows(0)
        setLevel(0)
        // setThreshold(100)
        // setImageUrl()
    }

    const drop = () => {
        if (rows > (level + 1) * 10) {
            setLevel(prevLevel => prevLevel + 1)
            setDropTime(700 / (level + 1) + 200)
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        }
        else {
            if (player.pos.y < 1) {
                console.log('Game Over')
                setGameOver(true)
                setDropTime(null)
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        }
    }

    const dropPlayer = () => {
        setDropTime(null)
        drop()
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 40:
                    setDropTime(700 / (level + 1) + 200)
                    break
                default:
            }
        }
    }

    const keyDown = ({ keyCode }) => {
        if (!gameOver) {
            switch (keyCode) {
                case 37:
                    moveLeftRightPlayer(-1)
                    break;
                case 39:
                    moveLeftRightPlayer(1)
                    break;
                case 40:
                    dropPlayer()
                    break;
                case 38:
                    playerRotate(stage, 1)
                    break;
                default:
            }
        }
    }

    useInterval(() => {
        drop()
    }, dropTime)

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => keyDown(e)} onKeyUp={e => keyUp(e)}>
            <Header />
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? <Display gameOver={gameOver} text="Game Over" /> : null}
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </div>
                    <StartButton callback={startGame} />
                </aside>
                {/* {imageUrl ? <img width="30%" src={process.env.PUBLIC_URL + '/img/' + imageUrl} alt=""></img> : null} */}
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris