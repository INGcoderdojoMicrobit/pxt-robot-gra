function doFDown (ile: number) {
    for (let index = 0; index < ile; index++) {
        doDown()
    }
}
function doFRight (ile: number) {
    for (let index = 0; index < ile; index++) {
        doRight()
    }
}
function doFUp (ile: number) {
    for (let index = 0; index < ile; index++) {
        doUp()
    }
}
function doRight () {
    oldry = ry
    oldrx = rx
    rx += 1
    if (rx > 4) {
        rx = 0
    }
    robot.set(LedSpriteProperty.X, rx)
    doCheckSkarb()
}
function doCheckSkarb () {
    score += 1
    paliwo += -1
    basic.pause(pausa)
    if (paliwo <= 0) {
        basic.showIcon(IconNames.Skull)
        basic.pause(500)
        basic.showNumber(score)
        basic.pause(5000)
        game.setScore(score)
        game.gameOver()
    }
    if (rx == skarb.get(LedSpriteProperty.X) && ry == skarb.get(LedSpriteProperty.Y)) {
        basic.showIcon(IconNames.Heart)
        basic.pause(500)
        game.setScore(score)
        basic.showNumber(score)
        basic.pause(2000)
        game.gameOver()
    }
}
function doFLeft (ile: number) {
    for (let index = 0; index < ile; index++) {
        doLeft()
    }
}
function doDown () {
    oldry = ry
    oldrx = rx
    ry += 1
    if (ry > 4) {
        ry = 0
    }
    robot.set(LedSpriteProperty.Y, ry)
    doCheckSkarb()
}
function doAdam () {
    kierunek = randint(1, 8)
    if (kierunek == 1) {
        doDown()
    } else if (kierunek == 2) {
        doRight()
    } else if (kierunek == 3) {
        doLeft()
    } else if (kierunek == 4) {
        doUp()
    } else if (kierunek == 5) {
        doFRight(randint(1, 3))
    } else if (kierunek == 6) {
        doFLeft(randint(1, 3))
    } else if (kierunek == 7) {
        doFUp(randint(1, 3))
    } else if (kierunek == 8) {
        doFDown(randint(1, 3))
    }
}
function doLeft () {
    oldry = ry
    oldrx = rx
    rx += -1
    if (rx < 0) {
        rx = 4
    }
    robot.set(LedSpriteProperty.X, rx)
    doCheckSkarb()
}
function doUp () {
    oldry = ry
    oldrx = rx
    ry += -1
    if (ry < 0) {
        ry = 4
    }
    robot.set(LedSpriteProperty.Y, ry)
    doCheckSkarb()
}
let kierunek = 0
let score = 0
let oldrx = 0
let oldry = 0
let skarb: game.LedSprite = null
let robot: game.LedSprite = null
let ry = 0
let rx = 0
let paliwo = 0
let pausa = 0
pausa = 100
paliwo = 100
rx = 0
ry = 0
let slad = 100
robot = game.createSprite(rx, ry)
robot.set(LedSpriteProperty.Blink, 0)
skarb = game.createSprite(3, 4)
skarb.set(LedSpriteProperty.Blink, 400)
basic.forever(function () {
    doAdam()
})
