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
            highlight.alpha = 0;
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
            new PIXI.Point(1000, 552), // Green/Yellow five. First item from left
            new PIXI.Point(1242, 355), // Orbit right to the cat

            new PIXI.Point(1260, 452), // Green skittles right and under cat
            new PIXI.Point(1166, 552), // Rondo under cat

            new PIXI.Point(1391, 431), // Green/Yellow five
            new PIXI.Point(1467, 476), // Orbit under big eclipse

            new PIXI.Point(1535, 330), // Orbit pack third from the packs on top

            new PIXI.Point(1660, 483), // Orbit under purple eclipse

            new PIXI.Point(1730, 384), // Red/Green skittles from the right vertical
            new PIXI.Point(1730, 564), // Green/Purple skittles from the right vertical

            new PIXI.Point(1185, 355), // Cat, last because needs to be on top
        ];
    }
}

export default Picture;