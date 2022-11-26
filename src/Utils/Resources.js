import * as THREE from "three";
import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter {
    constructor(Assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        this.Assets = Assets;
        this.items = {};
        this.queue = this.Assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    startLoading() {
        for (const Asset of this.Assets) {
            if (Asset.type === "glbModel") {
                this.loaders.gltfLoader.load(Asset.path, (file) => {
                    this.singleAssetLoaded(Asset, file);
                });
            } 
            else if (Asset.type === "videoTexture") {
                this.video = {};
                this.videoTexture = {};
                this.video[Asset.name] = document.createElement("video");
                this.video[Asset.name].src = Asset.path;
                this.video[Asset.name].muted = true;
                this.video[Asset.name].playsInline = true;
                this.video[Asset.name].autoplay = true;
                this.video[Asset.name].loop = true;
                this.video[Asset.name].play();
                this.videoTexture[Asset.name] = new THREE.VideoTexture(
                    this.video[Asset.name]
                );
                this.videoTexture[Asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[Asset.name].magFilter = THREE.NearestFilter;
                this.videoTexture[Asset.name].generateMipmaps = false;
                this.videoTexture[Asset.name].encoding = THREE.sRGBEncoding;
                this.singleAssetLoaded(Asset, this.videoTexture[Asset.name]);
            }
        }
    }

    singleAssetLoaded(Asset, file) {
        this.items[Asset.name] = file;
        this.loaded++;
        console.log("Asset is loading");
        if (this.loaded === this.queue) {
            console.log("All assets are done");
            this.emit("ready");
        }
    }
}
