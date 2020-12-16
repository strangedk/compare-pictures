import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import SpriteCommon from "./common/SpriteCommon";
import ResourceList from "../resources/ResourceList";

class Picture extends PIXI.Sprite {
    static totalCount = 11;
    static currentCount = 0;
    static done = (currentCount: number, totalCount: number) => {
        const w = window as any;

        console.log(`Item was found! window.highlightItem(currentCount = ${currentCount}, totalCount = ${totalCount}) is called`)
        w.highlightItem && w.highlightItem(currentCount, totalCount);
    }

    private readonly pic: SpriteCommon = new SpriteCommon(ResourceList.PIC);
    private readonly highlights: SpriteCommon[];
    private readonly hitAreaPoints: PIXI.Point[];

    constructor() {
        super();

        this.addChild(this.pic);
        this.pic.on('mousedown', (e: any) => {
            console.log(e);
        })

        // const hit = new PIXI.Rectangle(31,31, 93,93);
        this.hitAreaPoints = this.getAreaPoints();
        this.highlights = [...Array(Picture.totalCount)].map((v,i) => {
            const highlight = new SpriteCommon(ResourceList.HIGHLIGHT);

            if (PIXI.utils.isMobile.phone) {
                highlight.scale.set(1);
            } else {
                highlight.scale.set(0.62);
            }

            highlight.anchor.set(0.5);
            highlight.alpha = 0.1; 
            highlight.interactive = true;
            highlight.x = this.hitAreaPoints[i].x;
            highlight.y = this.hitAreaPoints[i].y;
            highlight.once('pointerup', this.showHighlight.bind(highlight));
            this.addChild(highlight);
            return highlight;
        });
    }

    private showHighlight() {
        Picture.currentCount++;
        this.interactive = false;
        gsap.to(this, {alpha: 1, duration: 1, onComplete: () => Picture.done(Picture.currentCount, Picture.totalCount)})
    }

    private getAreaPoints = (): PIXI.Point[] => {
        return [
            new PIXI.Point(1190, 194),
            new PIXI.Point(1316, 194),
            new PIXI.Point(1012, 264),
            new PIXI.Point(1093, 264),
            new PIXI.Point(1178, 264),
            new PIXI.Point(1030, 344),
            new PIXI.Point(1040, 420),
            new PIXI.Point(1510, 342),
            new PIXI.Point(1412, 424),
            new PIXI.Point(1554, 424),
            new PIXI.Point(1610, 578),
        ];
    }
}

export default Picture;