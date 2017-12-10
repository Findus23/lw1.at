<template>
	<div id="app" class="container">
		<router-view></router-view>
	</div>
</template>

<script>
    export default {
        name: 'app',
        props: ["language"],
    };
</script>

<style lang="scss">
	@import "style";
</style>