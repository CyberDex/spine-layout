import '@esotericsoftware/spine-pixi-v8';
import { Application } from "pixi.js";
import { DevTools, SpineLayout } from "./utils";
import { SpineLayoutEditor } from './utils/SpineLayoutEditor';

export const pixi = new Application();

export default new class App {
    pixi = new Application();
    layout?: SpineLayout;
    layoutEditor?: SpineLayoutEditor;
    devTools?: DevTools;
    version = `${APP_VERSION} (${APP_MODE})`;

    constructor() {
        this.init();
    }

    async init() {
        this.layout = new SpineLayout({ debug: true });

        await this.initApp(this.layout);

        this.devTools = new DevTools({
            app: this.pixi,
            gameName: APP_NAME,
            gameVersion: this.version,
        });

        this.layoutEditor = new SpineLayoutEditor(this.layout, this.devTools);
    }

    private async initApp(layout: SpineLayout) {
        await this.pixi.init({
            background: '#000000',
            resizeTo: window,
        });

        this.pixi.stage.addChild(layout);

        document.getElementById("app")!.appendChild(this.pixi.canvas);

        const minWidth = 700;
        const minHeight = 1000;

        window.addEventListener('resize', () => this.onResize(minWidth, minHeight));
        this.onResize(minWidth, minHeight);
    }

    private onResize = (minWidth: number, minHeight: number) => {
        if (this.layout) {
            this.layout.x = window.innerWidth / 2;
            this.layout.y = window.innerHeight / 2;

            // if canvas is smaller than minWidth and minHeight, set it to minWidth and minHeight
            if (this.pixi.renderer.width < minWidth || this.pixi.renderer.height < minHeight) {
                this.layout.scale.set(
                    Math.min(this.pixi.renderer.width / minWidth, this.pixi.renderer.height / minHeight)
                );
            }
        }
    }
};