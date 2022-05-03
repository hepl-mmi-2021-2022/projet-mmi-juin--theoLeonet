import {JumpMan} from "../components/JumpMan";

export class JumpManControl {
    left: boolean;
    right: boolean;
    up: boolean;
    private jumpMan: JumpMan;

    constructor(jumpMan: JumpMan) {
        this.left = false;
        this.right = false;
        this.up = false;
        this.jumpMan = jumpMan;

        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('keydown', (key: KeyboardEvent) => {
            if (key.code === 'KeyA') this.left = true;
            if (key.code === 'KeyD') this.right = true;
            if (key.code === 'KeyW') this.up = true;
        })
        window.addEventListener('keyup', (key: KeyboardEvent) => {
            if (key.code === 'KeyA') this.left = false;
            if (key.code === 'KeyD') this.right = false;
            if (key.code === 'KeyW') this.up = false;
        })
    }
}