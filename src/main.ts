import {IGrille, Grille} from "./Grille.js"
// import {IPoint, Point} from "./Point.js"
// import {IView3D, View3D} from "./View3D.js"

function init () {
    const mapCanvas: HTMLCanvasElement
        = document.getElementById("map") as HTMLCanvasElement
    const viewCanvas: HTMLCanvasElement
        = document.getElementById("view") as HTMLCanvasElement

    window.addEventListener("keyup", (evt: KeyboardEvent) => {
        switch (evt.key) {
            case "ArrowUp": console.log("up");break;
            case "ArrowDown": console.log("down");break;
            case "ArrowLeft": console.log("left");break;
            case "ArrowRight": console.log("right");break;
        }
        //evt.preventDefault()
    })

    const blockStyles = { 1: "rgba(238,68,0,1.0)" , 0: "rgba(0,0,0,0)" }
    const grille: IGrille = new Grille({
        canvas: mapCanvas,
        data: [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,1,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,0,0,1,0,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1],
        ],
        blockStyles,
        couleurFond: "#EEE",
        couleurGrille: "#333",
        nbRayons: viewCanvas.width,
        angleRayons: Math.PI * .5,
        // vue: view3D
    })
    grille.dessine();
    // mapCanvas.addEventListener("click", function(e)
    // {
    //     grille.newBlock(mapCanvas, e);
    // });
}
init();