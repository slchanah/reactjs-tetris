const GAMEOVER_IMG_NUMBER = 5
const SHOW_IMG_NUMBER = 6

const GAMEOVER_IMG_PREFIX = 'gameover_'
const SHOW_IMG_PREFIX = 'show_'

const IMAGE_SUFFIX = '.jpeg'

let usedImg = []

export const getRandomGameOverImg = () => {
    return GAMEOVER_IMG_PREFIX + Math.floor(Math.random() * (GAMEOVER_IMG_NUMBER + 1)).toString() + IMAGE_SUFFIX
}

export const getNextImg = () => {
    if (usedImg.length === SHOW_IMG_NUMBER + 1) {
        usedImg = []
    }

    let randomNumber = Math.floor(Math.random() * (SHOW_IMG_NUMBER + 1))
    while (usedImg.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * (SHOW_IMG_NUMBER + 1))
    }

    usedImg.push(randomNumber)
    return SHOW_IMG_PREFIX + randomNumber.toString() + IMAGE_SUFFIX
}