let canvasSize = 720
let size = 30

let blocks = canvasSize / size

let startX = canvasSize / 2
let startY = size * 3

let points = [[startX, startY]]
let mPoints = [[startX, startY]]

let lines = []
let mLines = []

let gridOn = true
let building = true
let colorLining = false
let newLineNext = true

function setup() {
    createCanvas(canvasSize, canvasSize)
}

function mousePressed() {

    let rndX = round(mouseX / size) * size
    let rndMX = round((canvasSize - mouseX) / size) * size
    let rndY = round(mouseY / size) * size

    if (building) {

        points.push([rndX, rndY])
        mPoints.push([rndMX, rndY])

        if (rndX == rndMX) {
            building = false
            colorLining = true
        }

    } else if (colorLining) {

        if (newLineNext) {
            lines.push([])
            mLines.push([])
            newLineNext = false
        }

        lines[lines.length - 1].push([rndX, rndY])
        mLines[mLines.length - 1].push([rndMX, rndY])

    }

}

function keyPressed() {
    if (key == 'g') {
        gridOn = !gridOn
    } else if (key == 'l') {
        newLineNext = true
    }
}

function draw() {

    background(200)

    if (gridOn) {
        strokeWeight(1)
        for (let i = 1; i < blocks; i++) {
            line(i*size, 0, i*size, canvasSize)
            line(0, i*size, canvasSize, i*size)
        }
    }

    strokeWeight(3)
    if (points.length > 1) {
        for (let i = 0; i < points.length - 1; i++) {
            line(points[i][0], points[i][1], points[i+1][0], points[i+1][1])
            line(mPoints[i][0], mPoints[i][1], mPoints[i+1][0], mPoints[i+1][1])
        }
    } else {
        strokeWeight(7)
        point(startX, startY)
    }

    strokeWeight(3)
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length > 1) {
            for (let j = 0; j < lines[i].length - 1; j++) {
                line(lines[i][j][0], lines[i][j][1], lines[i][j+1][0], lines[i][j+1][1])
                line(mLines[i][j][0], mLines[i][j][1], mLines[i][j+1][0], mLines[i][j+1][1])
            }
        } else {
            strokeWeight(7)
            point(lines[i][0][0], lines[i][0][1])
            point(mLines[i][0][0], mLines[i][0][1])
        }
    }

}
