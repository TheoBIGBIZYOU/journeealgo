export interface IGrilleConfig {
    readonly canvas: HTMLCanvasElement
    readonly data: Array<Array<number>>
    readonly blockStyles: { [ blockValue: number]: string }
    readonly couleurFond: string
    readonly couleurGrille: string
    readonly nbRayons: number
    readonly angleRayons: number
    // readonly vue: IView3D
}

export interface IGrille {
    data: Array<Array<number>>
    readonly nbColonnes: number
    readonly nbLignes: number
    blockStyles: { [ blockValue: number]: string }
    couleurFond: string
    couleurGrille: string
    readonly blockHeight: number
    readonly blockWidth: number
    //rayons: Array<{x1: number, y1: number, x2: number, y2: number}>
    //intersections: Array<IIntersection>
    dessineGrille (): void
    dessineBlocks (): void
    //dessineRayons (): void
    dessine (): void
    newBlock() : void
    //lanceRayons (x: number, y: number, angle: number): void
}

export class Grille implements IGrille{
    public  _canvas: HTMLCanvasElement
    public  _ctx : CanvasRenderingContext2D
    public  _data: Array<Array<number>>
    nbColonnes: number
    nbLignes: number
    blockStyles: { [ blockValue: number]: string }
    couleurFond: string
    couleurGrille: string
    blockHeight: number
    blockWidth: number
    //rayons: Array<{x1: number, y1: number, x2: number, y2: number}>
    //intersections: Array<IIntersection>
    angleRayons: number
    //private _vue: IView3D
    constructor(config: IGrilleConfig) {
        this._canvas = config.canvas
        this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
        this._data = config.data
        this.nbColonnes = this._data[0].length
        this.nbLignes = this._data.length
        this.blockStyles = config.blockStyles
        this.couleurFond = config.couleurFond
        this.couleurGrille = config.couleurGrille
        this.blockHeight = this._canvas.height / this.nbLignes
        this.blockWidth = this._canvas.width / this.nbColonnes
        //this.rayons = []
        //this.intersections = []
        this.angleRayons = config.angleRayons
        //this._vue = config.vue
    }
    get data(){
        return this._data
    }

    set data(value: Array<Array<number>>){
        this._data = value
        this.nbColonnes = this._data[0].length
        this.nbLignes = this._data.length
        this.blockHeight = this._canvas.height / this.nbLignes
        this.blockWidth = this._canvas.width / this.nbColonnes
    }

    dessineGrille () {
        this._ctx.fillStyle = this.couleurFond
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height)
        this._ctx.strokeStyle = this.couleurGrille
        this._ctx.beginPath()
        for (let i = 1; i < this.data.length; i++) {
            const y = i * this.blockHeight
            this._ctx.moveTo(0, y)
            this._ctx.lineTo(this._canvas.width, y)
        }
        for (let i = 1; i < this.data[0].length; i++) {
            const x = i * this.blockWidth
            this._ctx.moveTo(x, 0)
            this._ctx.lineTo(x, this._canvas.height)
        }
        this._ctx.closePath()
        this._ctx.stroke()
    }
    dessineBlocks (): void {
        for (let i = 0; i < this.nbLignes; i++) {
            for (let j = 0; j < this.nbColonnes; j++) {
                this._ctx.fillStyle = this.blockStyles[this._data[i][j]]
                this._ctx.fillRect(j * this.blockWidth, i * this.blockHeight, this.blockWidth, this.blockHeight)
            }
        }
    }
    dessine() {
        this.dessineGrille();
        this.dessineBlocks();
    }
    newBlock(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let nbblockx = Math.floor(x / this.blockWidth);
        let nbblocky = Math.floor(y / this.blockHeight);
        this.blockStyles[this._data[nbblockx][nbblocky]] = "1";
        console.log("ttt " + this.blockStyles[this._data[nbblockx][nbblocky]]);
    }
}