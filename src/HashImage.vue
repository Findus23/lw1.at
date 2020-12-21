<template>
	<div>
		<canvas ref="myCanvas"></canvas>
		<img :width="width" :height="height" :src="absolutePath">
	</div>
</template>

<script lang="ts">

import Vue, {PropType} from "vue";
import {decode, isBlurhashValid} from "blurhash";
import {ImageObject} from "./types";

export default Vue.extend({
    name: "HashImage",
    props: {
        small: Boolean,
        img: Object as PropType<ImageObject>
    },
    mounted(): void {
	    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const that = this as any;
        const img = that.img as ImageObject;
        const hash: string = img.hash;
        if (isBlurhashValid(hash).result) {
            const canvas = that.$refs.myCanvas;
            const pixels = decode(hash, 30, 15);

            const ctx = canvas.getContext("2d");
            const imageData = new ImageData(pixels, 30, 15);
            ctx.scale(10, 10);
            ctx.putImageData(imageData, 0, 0);
            ctx.drawImage(canvas, 0, 0);
        }
    },
    computed: {
        height() {
            return this.small ? 150 : 600;
        },
        width() {
            return this.small ? 300 : 1200;
        },
        absolutePath() {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const that = this as any;
            const img = that.img as ImageObject;
            return "/" + img.path;
        }
    }
});
</script>

<style>
canvas {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
</style>
