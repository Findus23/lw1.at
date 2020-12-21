<template>
	<a v-bind:href="url" target="_blank">
		<svg v-if="id === 'MIT'" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"
		     class="MIT">
			<title>MIT License</title>
			<path d="M245.467 134.782a113.137 109.096 0 1 1 0-.002"
			      transform="matrix(1.05723 0 0 1.09302 -12.041 -18.814)"></path>
			<text x="34.41" y="869.061" transform="matrix(.8908 0 0 1.12258 0 -796.362)">
				MIT
			</text>
		</svg>
		<svg v-if="id === 'GPL3'" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"
		     class="GPL">
			<title>GNU General Public License v3.0</title>
			<path d="M245.467 134.782a113.137 109.096 0 1 1 0-.002"
			      transform="matrix(1.05723 0 0 1.09302 -12.041 -18.814)"></path>
			<text x="32" y="860" transform="matrix(.8908 0 0 1.12258 0 -796.362)">
				GPL
			</text>
		</svg>
	</a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "license-icons",
    props: ["id", "url"]
});
</script>

<style lang="scss" scoped>
svg {
  color: black;

  path {
	fill: white;
	stroke: currentColor;
	stroke-width: 15.349;
	stroke-linecap: round;
  }

  text {
	font-family: Arial, sans-serif;
	fill: currentColor;
	text-align: start;
	line-height: 125%;
	font-weight: 700;
	font-size: 124.104px
  }
}

.MIT text {
  font-size: 124.104px;
}

.GPL text {
  font-size: 109.871px;
}
</style>
