// Funkcja ustawia na odpowiednim miejscu robota i rozbitego astronautę oraz ile maksymalnie paliwa posiada robot
// Function sets x,y coordinates of robot and crashed astronaut as well as max fuel available for robot
function doStart (robotx: number, roboty: number, crashx: number, crashy: number, fuelmax: number) {
    listX = []
    listY = []
    // 0-Puste/robot run
    // 1-Brakło paliwa / empty fuel
    // 2-Wygrałeś / Winner
    efekt = 0
    paliwo = fuelmax
    score = 0
    rx = robotx
    ry = roboty
    robot.set(LedSpriteProperty.X, rx)
    robot.set(LedSpriteProperty.Y, ry)
    crashedastronaut.set(LedSpriteProperty.X, crashx)
    crashedastronaut.set(LedSpriteProperty.Y, crashy)
}

// Wstawka na święta
function dosilentNight () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . # # # .
        # # # # #
        . . # . .
        `)
        basic.pause(1000)
    music.setTempo(55)
    for (let index = 0; index < 2; index++) {
        music.playTone(392, music.beat(BeatFraction.Whole))
        music.playTone(440, music.beat(BeatFraction.Half))
        music.playTone(392, music.beat(BeatFraction.Half))
        music.playTone(330, music.beat(BeatFraction.Whole))
    }
    music.playTone(587, music.beat(BeatFraction.Half))
    music.playTone(587, music.beat(BeatFraction.Half))
    music.playTone(494, music.beat(BeatFraction.Whole))
    music.playTone(523, music.beat(BeatFraction.Half))
    music.playTone(523, music.beat(BeatFraction.Half))
    music.playTone(392, music.beat(BeatFraction.Half))
}

// Robot goes down for "ile" steps
function doFDown (ile: number) {
    for (let index = 0; index < ile; index++) {
        doDown()
    }
}
// Przemek - snail, slimak
function doPrzemek () {
    kierunek = doRadar()
    // slimak idzie w prawo i w górę
    if (kierunek == 1) {
        // slimak idzie w gore i prawo
        doFUp(4)
        doFRight(4)
        doFDown(4)
        doFLeft(3)
        doFUp(3)
        doFRight(2)
        doFDown(2)
        doLeft()
        doUp()
    } else if (kierunek == 2) {
        // slimak idzie w prawo i w gore
        doFRight(4)
        doFUp(4)
        doFLeft(4)
    	doFDown(3)
        doFRight(3)
        doFUp(2)
        doFLeft(2)
        doDown()
        doRight()
    } else if (kierunek == 3 || kierunek == 4) {
        // slimak idzie w dol i w prawo
        doFDown(4)
        doFRight(4)
        doFUp(4)
        doFLeft(3)
        doFDown(3)
        doFRight(2)
        doFUp(2)
        doLeft()
        doDown()
    } else if (kierunek == 5 || kierunek == 6) {
        // slimak idzie w dol i w lewo
        doFDown(4)
        doFLeft(4)
        doFUp(4)
        doFRight(3)
        doFDown(3)
        doFLeft(2)
        doFUp(2)
        doRight()
        doDown()
    } else if (kierunek == 7 || kierunek == 8) {
        // slimak idzie w gore i w lewo
        doFUp(4)
        doFLeft(4)
        doFDown(4)
        doFRight(3)
        doFUp(3)
        doFLeft(2)
        doFDown(2)
        doRight()
        doUp()
    }
}
// Robot goes right for "ile" steps
function doFRight (ile: number) {
    for (let index = 0; index < ile; index++) {
        doRight()
    }
}
// Funkcja ustawia wszystkie możliwe pozycje robota oraz miejsce rozbicia sie astronauty, nalewa też paliwa do baku robota
// Function sets all possible positions of robot & astronaut, refuels robot as well
function doWszystkieOpcje () {
    // four loops/cztery pętle
    for (let x1 = 0; x1 <= 4; x1++) {
        for (let x2 = 0; x2 <= 4; x2++) {
            for (let y1 = 0; y1 <= 4; y1++) {
                for (let y2 = 0; y2 <= 4; y2++) {
                    if (x1 == x2 && y1 == y2) {
                    	
                    } else {
                        // tylko jeśli astronauta nie rozbił się w bazie robota/avoid crashing astronaut in robot base
                        doStart(x1, y1, x2, y2, rozmiarBaku)
                        // tutaj wstawiamy funkcję poruszającą robotem
                        // here put robot steering function
                        doPrzemek()
                        if (efekt == 1) {
                            // braklo paliwa/ empty fuel
                            porazka += 1
                        } else if (efekt == 2) {
                            // odnaleziony!!!/success - found!!!
                            sukces += 1
                        }
                    }
                }
            }
        }
    }
}
// Robot goes up for "ile" steps
function doFUp (ile: number) {
    for (let index = 0; index < ile; index++) {
        doUp()
    }
}
// Funkcja RadarX() - na wejściu otrzymuje współrzędne astronauty sx,sy oraz robota rx,ry
// pokazuje kierunek w którym znajduje się rozbity astronauta
// Function RadarX() - presents clockwise potential astronaut crash place.
// 
// Zwracane wartości - robot umiejscowiony w środku planszy (0) - w zależności w której części planszy jest astronauta
// - zwracana jest odpowiednia cyfra
// Returnig values - robot place id the middle of the screen (0) - depending where astronaut is crashed
// - proper number is returned
// 88122
// 88122
// 77033
// 66544
// 66544
// 
// // Jak działa funkcja radar:
// // what are the calculations?
// // "sx=rx"	"sy>ry"	5
// // "sx=rx"	"sy<ry"	1
// // "sy=ry"	"sx<rx"	7
// // "sy=ry"	"sx>ry"	3
// // "sy<ry"	"sx>rx"	2
// // "sy>ry"	"sx>rx"	4
// // "sy>ry"	"sx<rx"	6
// // "sy<ry"	"sx<rx"	8
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
// Maks
function doMaks () {
    for (let index = 0; index < 100; index++) {
        kierunek = doRadar()
        if (kierunek == 2 || kierunek ==3 || kierunek == 4) {
            for (let index = 0; index < 2; index++) {
                doFDown(1)
                doFRight(1)
                doFUp(1)
                doFRight(1)
            }
        }
        else {
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
        doFDown(4)
    }
}
// Robot goes 1 step right, checks if astronaut found
function doRight () {
    if (efekt == 0) {
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
// Michalina - line & down, linijka i w dol
function doMichalina () {
    for (let index = 0; index < 100; index++) {
        kierunek = doRadar()
        if (kierunek == 3) {
            doFRight(4)
        } else if (kierunek == 7) {
            doFLeft(4)
        } else if (kierunek == 1) {
            doFUp(4)
        } else if (kierunek == 5) {
            doFDown(4)
        } else if (kierunek == 2) {
            doUp()
            doRight()
        } else if (kierunek == 8) {
            doUp()
            doLeft()
        } else if (kierunek == 4){
            doDown()
            doRight()
        } else if (kierunek == 6){
            doDown()
            doLeft()
        }
    }
}
// Funkcja sprawdza czy robot znalazł rozbitego astronautę, zużywa paliwo robota na wykonanie kroku, prezentuje wynik
// jeśli znalazł astronautę - serduszko, jeśli brakło paliwa - czaszkę (w zależności od parametru wizual = true)
// Function checks if robot found crashed astronaut, deduct robot fuel, show results - hear for success, skull for emty Melodies.Fuel
// (depending on the "wizual" flag = true)
function doCheckSkarb () {
    // one more step
    score += 1
    // less fuel
    paliwo += -1
    if (wizual) {
        // wait - for better presentation
        basic.pause(pausa)
    }
    if (paliwo <= 0) {
        // empty fuel
        // set flag - empty fuel - robot will not move anymore
        efekt = 1
        if (wizual) {
            basic.showIcon(IconNames.Skull)
        }
    }
    if (rx == crashedastronaut.get(LedSpriteProperty.X) && ry == crashedastronaut.get(LedSpriteProperty.Y)) {
        // astronaut found! Success! set flag - success - robot will not move anymore
        efekt = 2
        if (wizual) {
            basic.showIcon(IconNames.Heart)
            if (randint(0, 5) ==0){dosilentNight()}
        }
    }
    if (doSprawdz(robot.get(LedSpriteProperty.X), robot.get(LedSpriteProperty.Y)) == 0) {
        listX.push(robot.get(LedSpriteProperty.X))
        listY.push(robot.get(LedSpriteProperty.Y))
    }
}
function doSprawdz (X: number, Y: number) {
    if (listX.length > 0) {
        for (let index8 = 0; index8 <= listX.length; index8++) {
            if (listX[index8] == X && listY[index8] == Y) {
                return 1
            }
        }
    }
    return 0
}
// Robot goes left for "ile" steps
function doFLeft (ile: number) {
    for (let index = 0; index < ile; index++) {
        doLeft()
    }
}
// Funkcja wywołuje funkcję radarX() podając współrzędne robota oraz rozbitego astronauty - tak aby nie trzeba było
// każdorazowo zastanawiać się gdzie jest robot i game.addLife(0)
// Function calls RadarX() providing coordinates of robot and astronaut
function doRadar () {
    return doRadarX(robot.get(LedSpriteProperty.X), robot.get(LedSpriteProperty.Y), crashedastronaut.get(LedSpriteProperty.X), crashedastronaut.get(LedSpriteProperty.Y))
}
// Robot goes 1 step down, checks if astronaut found
function doDown () {
    if (efekt == 0) {
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
// Adam - total randomized, calkiem losowo + Radar
function doAdam () {
    for (let index = 0; index < 100; index++) {
        kierunek = randint(1, 15)
        if (kierunek == 1) {
            nX = robot.get(LedSpriteProperty.X)
            nY = robot.get(LedSpriteProperty.Y) + 1
            if (nY > 4) {
                nY = 0
            }
            if (doSprawdz(nX, nY) == 0) {
                doDown()
            } else {
                kierunek = randint(2, 15)
            }
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
        } else if (kierunek >= 9) {
            kierunek = doRadar()
            if (kierunek == 1) {
                doFUp(4)
            }
            if (kierunek == 3) {
                doFRight(4)
            }
            if (kierunek == 5) {
                doFDown(4)
            }
            if (kierunek == 7) {
                doFLeft(4)
            }
            if (kierunek == 2) {
                doUp()
                doRight()
            }
            if (kierunek == 4) {
                doDown()
                doRight()
            }
            if (kierunek == 6) {
                doDown()
                doLeft()
            }
            if (kierunek == 8) {
                doUp()
                doLeft()
            }
        }
    }
}
// Funkcja losuje pozycję robota oraz miejsce rozbicia sie astronauty, nalewa też paliwa do baku robota
// Function rendomize position of robot & astronaut, refuels robot as well
function doLosujRobotiRozbitek () {
    // randomize
    x12 = randint(0, 4)
    x22 = randint(0, 4)
    y12 = randint(0, 4)
    y22 = randint(0, 4)
    while (x12 == x22 && y12 == y22) {
        // avoid crashing astronaut in the robot base
        if (x12 == x22) {
            x12 = randint(0, 4)
        } else if (y12 == y22) {
            y12 = randint(0, 4)
        }
    }
    // sets the starting positions
    doStart(x12, y12, x22, y22, rozmiarBaku)
    // tutaj wstawiamy naszą funkcję sterującą robotem
    // place here robot steering function
    doMaks()
    if (efekt == 1) {
        // jesli braklo paliwa / emptu fuel
        porazka += 1
    } else if (efekt == 2) {
        // uratowany! / astronaut found!
        sukces += 1
    } else {
        // jesli braklo paliwa / emptu fuel
        porazka += 1
    }
}
// Rafal - losowo ale pojedynczo
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
// Robot goes 1 step left, checks if astronaut found
function doLeft () {
    if (efekt == 0) {
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
// Michal - szlaczki
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
// Robot goes 1 step up, checks if astronaut found
function doUp () {
    if (efekt == 0) {
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
/**
 * robot - uzywamy sprite
 */
/**
 * astrunauta/astronaut - uzywamy sprite
 */
/**
 * wizual=0 do wielokrotnych symulacji, wizual=1 porusza wolniej robotem i prezentuje wyniki
 */
/**
 * szybkie poruszanie robotem / very fast calculation
 */
let y22 = 0
let y12 = 0
let x22 = 0
let x12 = 0
let nY = 0
let nX = 0
let oldrx = 0
let oldry = 0
let porazka = 0
let kierunek = 0
let score = 0
let efekt = 0
let crashedastronaut: game.LedSprite = null
let robot: game.LedSprite = null
let ry = 0
let rx = 0
let paliwo = 0
let pausa = 0
let wizual = 0
let rozmiarBaku = 0
let listY: number[] = []
let listX: number[] = []
let sukces = 0
let sx = 0
let sy = 0
listX = []
listY = []
// tutaj ustaw pojemność baku robota / here put fuel max volume
rozmiarBaku = 15
wizual = 1
if (wizual) {
    // jesli flaga ustawiona na "true/1" to pokazuj wolniej / if flag set to "true/1" show robot moves
    pausa = 200
}
// uzupełnij paliwo / refuel
paliwo = rozmiarBaku
rx = 0
ry = 0
robot = game.createSprite(rx, ry)
// robot nie miga / does not blink
robot.set(LedSpriteProperty.Blink, 0)
crashedastronaut = game.createSprite(randint(1, 4), randint(1, 4))
crashedastronaut.set(LedSpriteProperty.Blink, 400)
doStart(1, 1, 1, 1, 20)
basic.forever(function () {
    // tutaj wstawiasz wywolanie funkcji sprawdzajacej efektywnosc algorytmu
    for (let index = 0; index < 1000; index++) {
        doLosujRobotiRozbitek()
    }
    // remove robot from memory
    robot.delete()
    // remove astronaut from memory
    crashedastronaut.delete()
    basic.clearScreen()
    while (true) {
        // present results - pokaz ile razy odnalazł astrunautę i ile razy brakło paliwa
        // porazka/failure
        basic.showString("F:")
        basic.showNumber(porazka)
        // sukces/success
        basic.showString("S:")
        basic.showNumber(sukces)
        // efekt/effect
        basic.showString("E:" + Math.floor(sukces/10).toString() + "%")
    }
})
