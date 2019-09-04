<template>
	<div>
		<canvas ref="myCanvas"></canvas>
		<img :width="width" :height="height" :src="img.path">
	</div>
</template>

<script>
    import {decode, isBlurhashValid} from "blurhash";

    export default {
        name: "HashImage",
        props: ["img", "small"],
        mounted() {
            if (isBlurhashValid(this.img.hash).result) {
                const canvas = this.$refs.myCanvas;
                const pixels = decode(this.img.hash, 30, 15);

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
            }
        }
    };
</script>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
