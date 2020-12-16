import * as PIXI from 'pixi.js';
import sound from 'pixi-sound';
import Picture from "../components/Picture";
import ResourceList from "../resources/ResourceList";

class GameScreen extends PIXI.Container {
    // region #Resources
    private readonly picture: Picture = new Picture();
    // endregion

    constructor(private app: PIXI.Application) {
        super();

        const music = sound.Sound.from({url:ResourceList.SOUND_BG,autoPlay:true, loop: true});

        this.start();
    }

    // region #Game flow
    public start = () => {
        this.addElements();
        this.arrangeElements();
    }

    public animate = (delta: number = 0) => {
        // -
    }

    private addElements = () => {
        this.addChild(this.picture);
    }

    private arrangeElements = () => {
        const {picture} = this;

        picture.anchor.set(0,0);
        picture.x = 0;
        picture.y = 0;
    }
    // endregion
}

export default GameScreen;