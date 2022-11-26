import * as THREE from "three";
import Experience from "../Experience.js";
import Lighting from "./Lighting.js";
import Background from "./Background.js";
import Controls from "./Controls.js";
import Redbird from "./Redbird.js";

export default class World{
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.Lighting = new Lighting();
            this.Redbird = new Redbird();
            this.Background = new Background();
            console.log("created Redbird")
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }

    switchTheme(theme) {
        if (this.Lighting) {
            this.Lighting.switchTheme(theme);
        }
    }

    resize() {}

    update() {
        if (this.Redbird) {
            this.Redbird.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }
}
