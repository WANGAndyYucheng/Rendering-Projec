import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Lighting {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: { r: 0, g: 0, b: 0 },
            intensity: 3,
        };

        this.setSunlight();
        this.setGUI();
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.sunLight.ambientLight = this.obj.intensity;
        });
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 5);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 50;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1, 1, 6);
        this.scene.add(this.sunLight);
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunLight.color, {
                r: 0.09411764705882353,
                g: 0.2823529411764706,
                b: 0.4823529411764706,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.09411764705882353,
                g: 0.2823529411764706,
                b: 0.4823529411764706,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 3,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255 / 255,
                g: 255 / 255,
                b: 255 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            });
        }
    }

    resize() {}

    update() {}
}
