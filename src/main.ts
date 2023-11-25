import "./style.css";
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 700;

let gameSpeed = 5;

let playerState = "idle";
const playerImage = new Image();
playerImage.src = "assets/shadow_dog.png";
const sw = 575;
const sh = 523;
const dx = 0;
const dy = 0;
const dw = 575;
const dh = 523;
let fx = 0;
let fy = 0;
let gameFrame = 0;
const staggerFrames = 5;
type Frames = { loc: { x: number; y: number }[] };
const spriteAnimatios: { [key: string]: Frames } = {};
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 4,
    },
];

animationStates.forEach((state, i) => {
    let frames: Frames = {
        loc: [],
    };

    for (let j = 0; j < state.frames; j++) {
        let positionX = j * sw;
        let positionY = i * sh;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimatios[state.name as keyof typeof spriteAnimatios] = frames;
});

const setupCanvas = () => {
    const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    if (!ctx) return;

    animate(ctx);
};

function animate(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position =
        Math.floor(gameFrame / staggerFrames) %
        spriteAnimatios[playerState].loc.length;
    fx = sw * position;
    fy = spriteAnimatios[playerState].loc[0].y;
    ctx.drawImage(playerImage, fx, fy, sw, sh, dx, dy, dw, dh);
    gameFrame++;
    requestAnimationFrame(() => animate(ctx));
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div>
    <canvas id="canvas1"></canvas>
</div>
`;

setupCanvas();
