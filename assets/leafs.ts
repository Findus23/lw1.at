import leaf1 from "./leafs/tmpleaf.svg"
import leaf2 from "./leafs/tmpleaf2.svg"
import leaf3 from "./leafs/tmpleaf3.svg"

const DegToRad = Math.PI / 180
const RadToDeg = 1 / DegToRad
const colors = ["#FFDCA4", "#9CCCBC", "#FFAAAD", "#8DCBDA"]

function sample<T>(array: T[]): T | undefined {
    return array[Math.floor(Math.random() * array.length)]
}

class LeafImage {
    src: string
    offset: number;
    width: number;

    constructor(src: string, offset: number, width: number) {
        this.src = src
        this.offset = offset
        this.width = width;
    }

    offsetInRad() {
        return this.offset * DegToRad
    }
}

const leafs = [
    new LeafImage(leaf1, 15, 186.92),
    new LeafImage(leaf2, 0, 210.87),
    new LeafImage(leaf3, 0, 137.2),
]

class Wind {
    get angle(): number {
        return (Math.atan2(this.y, this.x) * RadToDeg + 360) % 360
    }

    get r(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2)
    }


    x: number
    y: number
    deltaAngle: number = 0
    targetAngle: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.targetAngle = this.angle
    }

    setFromPolar(angle: number, r: number) {
        this.x = r * Math.cos(angle * DegToRad)
        this.y = r * Math.sin(angle * DegToRad)
    }

    updateWind() {
        this.deltaAngle *= 1 + (Math.random() - 0.3) * 0.1

        this.targetAngle += (Math.random() - 0.5) * 10
        this.targetAngle %= 360

    }

    rotate() {
        let angle = this.angle
        let r = this.r * (1 + (Math.random() - 0.5) * 0.1)
        const diff = ((angle - this.targetAngle) + 180) % 360 - 180
        angle -= diff / 10
        this.setFromPolar(angle, r)
    }
}

class Leaf {
    x: number = -100
    y: number
    wind: Wind
    angle: number = 0
    i: number = 0
    angleOffset: number


    div: HTMLDivElement;
    private svg;

    constructor(leafImage: LeafImage) {
        this.angleOffset = leafImage.offsetInRad();
        this.div = document.createElement("div")
        this.div.className = "leaf"
        this.div.innerHTML = leafImage.src
        this.svg = this.div.firstElementChild! as HTMLElement
        this.svg.style.width = `${leafImage.width * .5}px`
        const fill = this.svg.querySelector(".fill")! as SVGPathElement
        fill.style.fill = sample(colors)!
        document.body.appendChild(this.div)
        this.y = Math.random() * ch
        const initial_wind = 4 + Math.random() * 8
        this.wind = new Wind(initial_wind, 0)
    }

    animate() {

        this.svg.style.transform = `translate3d(${this.x}px, ${this.y}px,0) rotate(${this.angle + this.angleOffset}rad`
        const dx = this.wind.x
        const dy = this.wind.y + gravity
        this.angle = Math.atan2(dy, dx)   //radians
        this.x += dx
        this.y -= dy
        this.i += 1
        this.wind.rotate()
        this.wind.updateWind()
        if (this.i % 10 == 0) {
        }
        if (this.x > cw || this.y > ch || this.x < -300 || this.y < -300) {
            this.div.remove()
            return
        }
        requestAnimationFrame(this.animate.bind(this))

    }
}

const cw = window.innerWidth
const ch = window.innerHeight

const gravity = -2
let isSlow = true

export function addLeaf() {
    const leafImage = sample(leafs)!
    const l = new Leaf(leafImage)
    l.animate()
    l.div.addEventListener("click", () => {
        const wasSlow = isSlow
        isSlow = false;
        if (wasSlow) {
            clearTimeout(to)
            addLeaf()
        }
    })
    let timeout
    if (isSlow) {
        timeout = 3000 + Math.random() * 10000
    } else {
        timeout = Math.random() * 500
    }
    const to = setTimeout(addLeaf, timeout)
}


// document.getElementById("button")!.addEventListener("click", addLeaf)
