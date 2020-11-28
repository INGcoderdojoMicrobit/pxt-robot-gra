function doStart (robotx: number, roboty: number, skarbx: number, skarby: number, ilePaliwo: number) {
    // 0-Puste
    // 1-Brakło paliwa
    // 2-Wygrałeś
    Efekt = 0
    paliwo = ilePaliwo
    score = 0
    rx = robotx
    ry = roboty
    robot.set(LedSpriteProperty.X, rx)
    robot.set(LedSpriteProperty.Y, ry)
    skarb.set(LedSpriteProperty.X, skarbx)
    skarb.set(LedSpriteProperty.Y, skarby)
}
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
function doWszystkieOpcje () {
    for (let x1 = 0; x1 <= 4; x1++) {
        for (let x2 = 0; x2 <= 4; x2++) {
            for (let y1 = 0; y1 <= 4; y1++) {
                for (let y2 = 0; y2 <= 4; y2++) {
                    if (x1 == x2 && y1 == y2) {
                    	
                    } else {
                        doStart(x1, y1, x2, y2, rozmiarBaku)
                        du_przemek()
                        if (Efekt == 1) {
                            porazka += 1
                        } else if (Efekt == 2) {
                            sukces += 1
                        }
                    }
                }
            }
        }
    }
}
function doFUp (ile: number) {
    for (let index = 0; index < ile; index++) {
        doUp()
    }
}
// Jak działa funkcja radar:
// "sx=rx"	"sy>ry"	5
// "sx=rx"	"sy<ry"	1
// "sy=ry"	"sx<rx"	7
// "sy=ry"	"sx>ry"	3
// "sy<ry"	"sx>rx"	2
// "sy>ry"	"sx>rx"	4
// "sy>ry"	"sx<rx"	6
// "sy<ry"	"sx<rx"	8
function doRadarX (sx: number, sy: number, rx: number, ry: number) {
    if (sx == rx && sy > ry) {
        return 5
    }
    if (sx == rx && sy < ry) {
        return 1
    }
    if (sy == ry && sx < rx) {
        return 7
    }
    if (sy == ry && sx > rx) {
        return 3
    }
    if (sy < ry && sx > rx) {
        return 2
    }
    if (sy > ry && sx > rx) {
        return 4
    }
    if (sy > ry && sx < rx) {
        return 6
    }
    if (sy < ry && sx < rx) {
        return 8
    }
    return 0
}
function doMaks () {
    for (let index = 0; index < 100; index++) {
        for (let index = 0; index < 2; index++) {
            doFDown(1)
            doFRight(1)
            doFUp(1)
            doFRight(1)
        }
        doFDown(4)
        for (let index = 0; index < 2; index++) {
            doFLeft(1)
            doFUp(1)
            doFLeft(1)
            doFDown(1)
            doFLeft(1)
            doFUp(1)
            doFLeft(1)
        }
    }
}
function doRight () {
    if (Efekt == 0) {
        oldry = ry
        oldrx = rx
        rx += 1
        if (rx > 4) {
            rx = 0
        }
        robot.set(LedSpriteProperty.X, rx)
        doCheckSkarb()
    }
}
function doMichalina () {
    for (let index = 0; index < 100; index++) {
        doFRight(4)
        doFDown(1)
    }
}
function doCheckSkarb () {
    score += 1
    paliwo += -1
    basic.pause(pausa)
    if (paliwo <= 0) {
        Efekt = 1
        if (wizual) {
            basic.showIcon(IconNames.Skull)
        }
    }
    if (rx == skarb.get(LedSpriteProperty.X) && ry == skarb.get(LedSpriteProperty.Y)) {
        Efekt = 2
        if (wizual) {
            basic.showIcon(IconNames.Heart)
        }
    }
}
function doFLeft (ile: number) {
    for (let index = 0; index < ile; index++) {
        doLeft()
    }
}
function doRadar () {
    return doRadarX(skarb.get(LedSpriteProperty.X),skarb.get(LedSpriteProperty.Y) , robot.get(LedSpriteProperty.X), robot.get(LedSpriteProperty.Y))
}
function du_przemek () {
    doFDown(4)
    doFRight(4)
    doFUp(4)
    doFLeft(3)
    doFDown(3)
    doFRight(2)
    doFUp(2)
    doLeft()
    doDown()
}
function doDown () {
    if (Efekt == 0) {
        oldry = ry
        oldrx = rx
        ry += 1
        if (ry > 4) {
            ry = 0
        }
        robot.set(LedSpriteProperty.Y, ry)
        doCheckSkarb()
    }
}
function doAdam () {
    for (let index = 0; index < 100; index++) {
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
}
function doLosujRobotiRozbitek () {
    x12 = randint(0, 4)
    x22 = randint(0, 4)
    y12 = randint(0, 4)
    y22 = randint(0, 4)
    while (x12 == x22 && y12 == y22) {
        if (x12 == x22) {
            x12 = randint(0, 4)
        } else if (y12 == y22) {
            y12 = randint(0, 4)
        }
    }
    doStart(x12, y12, x22, y22, rozmiarBaku)
    doAdam()
    if (Efekt == 1) {
        porazka += 1
    } else if (Efekt == 2) {
        sukces += 1
    }
}
function doRafal () {
    for (let index = 0; index < 100; index++) {
        kierunek = randint(1, 2)
        if (kierunek == 1) {
            doFDown(1)
        } else if (kierunek == 2) {
            doFRight(1)
        } else if (kierunek == 3) {
            doFLeft(1)
        } else if (kierunek == 4) {
            doFUp(1)
        }
    }
}
function doLeft () {
    if (Efekt == 0) {
        oldry = ry
        oldrx = rx
        rx += -1
        if (rx < 0) {
            rx = 4
        }
        robot.set(LedSpriteProperty.X, rx)
        doCheckSkarb()
    }
}
function doMichal () {
    for (let index = 0; index < 100; index++) {
        doFRight(2)
        doFDown(2)
        doFLeft(2)
        doFUp(2)
        doFLeft(2)
        doFDown(2)
        doFUp(2)
        doFRight(2)
        doFLeft(2)
        doFUp(2)
        doFDown(2)
        doFLeft(2)
        doFDown(2)
        doFLeft(2)
    }
}
function doUp () {
    if (Efekt == 0) {
        oldry = ry
        oldrx = rx
        ry += -1
        if (ry < 0) {
            ry = 4
        }
        robot.set(LedSpriteProperty.Y, ry)
        doCheckSkarb()
    }
}
let y22 = 0
let y12 = 0
let x22 = 0
let x12 = 0
let kierunek = 0
let oldrx = 0
let oldry = 0
let sukces = 0
let porazka = 0
let score = 0
let Efekt = 0
let skarb: game.LedSprite = null
let robot: game.LedSprite = null
let ry = 0
let rx = 0
let paliwo = 0
let rozmiarBaku = 0
let pausa = 0
let wizual = 0
let sx = 0
let sy = 0
if (wizual) {
    pausa = 100
}
rozmiarBaku = 20
paliwo = rozmiarBaku
rx = 0
ry = 0
let slad = 100
robot = game.createSprite(rx, ry)
robot.set(LedSpriteProperty.Blink, 0)
skarb = game.createSprite(randint(1, 4), randint(1, 4))
skarb.set(LedSpriteProperty.Blink, 400)
doStart(1, 1, 1, 1, 20)
basic.forever(function () {
    // tutaj wstawiasz wywolanie funkcji sprawdzajacej efektywnosc algorytmu
    for (let index = 0; index < 1000; index++) {
        doLosujRobotiRozbitek()
    }
    robot.delete()
    skarb.delete()
    basic.clearScreen()
    while (true) {
        basic.showString("P:")
        basic.showNumber(porazka)
        basic.showString("S:")
        basic.showNumber(sukces)
    }
})
