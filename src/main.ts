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
    setupSlider()
    animate(ctx)
}

const setupSlider = () => {
    const slider = document.getElementById('slider') as HTMLInputElement
    slider.value = `${gameSpeed}`
    const showGameSpeed = document.getElementById(
        'showGameSpeed'
    ) as HTMLSpanElement
    showGameSpeed.innerHTML = `${gameSpeed}`
    slider.addEventListener("change", (e:Event)=>{
console.log(e.target.value);
gameSpeed=e.target.value;
showGameSpeed.innerHTML = e.target.value;
    })
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
        if (this.x <= -this.width) {
            this.x = this.x2 + (this.width - this.speed)
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.x + (this.width - this.speed)
        }
        this.x = Math.floor(this.x - this.speed)
        this.x2 = Math.floor(this.x2 - this.speed)
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height)
    }

    animate(ctx: CanvasRenderingContext2D) {
        this.update()
        this.draw(ctx)
    }
}

const layer1 = new Layer(backgroundLayer1, 0.1)
const layer2 = new Layer(backgroundLayer2, 0.2)
const layer3 = new Layer(backgroundLayer3, 0.4)
const layer4 = new Layer(backgroundLayer4, 0.8)
const layer5 = new Layer(backgroundLayer5, 1.6)

const layers = [layer1, layer2, layer3, layer4, layer5]

function animate(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    layers.forEach((layer) => layer.animate(ctx))
    requestAnimationFrame(() => animate(ctx))
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div id="container">
    <canvas id="canvas1"></canvas>
    <p>Game speed: <span id="showGameSpeed"></span></p>
    <input type="range" min="0" max="20" value="5" class="slider" id="slider">
</div>
`

setupCanvas()
