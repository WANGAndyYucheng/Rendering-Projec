import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";

export default class Redbird {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.Redbird = this.resources.items.Redbird;
        this.actualRedbird = this.Redbird.scene;
        console.log(this.actualRedbird)
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.4;
        });
    }

    resize(){}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRedbird.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.0009);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRedbird);
    }

    setModel() {
        this.actualRedbird.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            if (child.name === "Steps") {
                child.children[0].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.Texture,
                });
            }
        });
        this.scene.add(this.actualRedbird);
        this.actualRedbird.scale.set(0.2, 0.2, 0.2);
    }

}
