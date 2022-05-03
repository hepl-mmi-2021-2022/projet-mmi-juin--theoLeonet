import {BaseCanvas} from "../canvases/BaseCanvas";

export interface IIsAnimation {
    canvas: BaseCanvas;

    animate(): void;
}