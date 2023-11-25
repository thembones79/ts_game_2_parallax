import './style.css'
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 700

let gameSpeed = 5

const playerImage = new Image()
playerImage.src = 'assets/shadow_dog.png'
const backgroundLayer1 = new Image()
backgroundLayer1.src = 'assets/layer-1.png'
const backgroundLayer2 = new Image()
backgroundLayer2.src = 'assets/layer-2.png'
const backgroundLayer3 = new Image()
backgroundLayer3.src = 'assets/layer-3.png'
const backgroundLayer4 = new Image()
backgroundLayer4.src = 'assets/layer-4.png'
const backgroundLayer5 = new Image()
backgroundLayer5.src = 'assets/layer-5.png'

const setupCanvas = () => {
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    if (!ctx) return

    animate(ctx)
}

class Layer {
    x: number
    y: number
    width: number
    height: number
    x2: number
    image: HTMLImageElement
    speedModifier: number
    speed: number
    constructor(image: HTMLImageElement, speedModifier: number) {
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 700
        this.x2 = this.width
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }

    update() {
        this.speed = gameSpeed * this.speedModifier
    }
    draw() {}
}

function animate(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    requestAnimationFrame(() => animate(ctx))
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
    <canvas id="canvas1"></canvas>
</div>
`

setupCanvas()
