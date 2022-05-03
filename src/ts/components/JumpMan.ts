import {BaseImage, IIsAnimatable} from "../../../canvasbp/ts";
import {JumpManControl} from "../controllers/JumpManControl";
import {settings} from "../settings";

export class JumpMan extends BaseImage implements IIsAnimatable {
    private controls: JumpManControl;
    private initialY: number;
    private jumping: boolean;
    private speed: number;
    private velocityY: number;
    private sprite: {x: number, y: number};
    private counter: number;
    private frame: number;
    private direction: string;

    constructor(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvasElement, ctx);

        this.position.y = 500;
        this.jumping = false
        this.speed = 4;
        this.velocityY = 0;
        this.counter = 0;
        this.frame = 0;
        this.direction = 'left';

        this.sprite = {x : settings.jumpMan.base.left ,  y: settings.jumpMan.spriteY }

        this.controls = new JumpManControl(this);

        this.createAndLoad('./src/images/donkey-kong_sprites-1248-dbs.jpg');
    }

    draw(): void {
        this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y, 32, 34, this.position.x, this.position.y, 32, 34);
    }

    update(): void {
        this.counter++;

        if (!this.controls.left && !this.controls.right){
            if (this.direction === 'left'){
                this.sprite.x = settings.jumpMan.base.left;
            }
            else{
                this.sprite.x = settings.jumpMan.base.right;
            }
        }

        if (this.controls.left) {
            this.position.x -= 3;
            if (this.counter % settings.jumpMan.animationSpeed === 0){
                this.frame = this.frame < settings.jumpMan.maxAnimationFrame ? this.frame + 1 : 0;
            }
            this.sprite.x = settings.jumpMan.run1.left[this.frame];
            this.direction = 'left';
        }
        if (this.controls.right) {
            this.position.x += 3;
            if (this.counter % settings.jumpMan.animationSpeed === 0){
                this.frame = this.frame < settings.jumpMan.maxAnimationFrame ? this.frame + 1 : 0;
            }
            this.sprite.x = settings.jumpMan.run1.right[this.frame];
            this.direction = 'right';
        }
        if (this.controls.up) {
            if(!this.jumping){
                this.jumping = true;
                this.velocityY = -this.speed*2;
            }
        }

        this.velocityY += settings.gravity;

        this.position.y += this.velocityY;

        if(this.position.y >= 500 - 34){
            this.position.y = 500 - 34;
            this.jumping = false;
        }

        this.draw();
    }
}