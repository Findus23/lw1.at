<template>
	<div id="app" class="container">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {Language} from "./types";

export default Vue.extend({
    name: 'app',
    props: {
        language: String as PropType<Language>
    },
});
</script>

<style lang="scss">
@import "../node_modules/normalize.css/normalize";
@import "variables";
@import "../node_modules/milligram/src/Color";
@import "../node_modules/milligram/src/Vars";
@import "../node_modules/milligram/src/Base";
@import "../node_modules/milligram/src/Blockquote";
@import "../node_modules/milligram/src/Blocks";
/*@import "../node_modules/milligram/src/Button";*/
@import "../node_modules/milligram/src/Code";
@import "../node_modules/milligram/src/Divider";
@import "../node_modules/milligram/src/Form";
@import "../node_modules/milligram/src/Grid";
@import "../node_modules/milligram/src/Images";
@import "../node_modules/milligram/src/Label";
@import "../node_modules/milligram/src/Link";
@import "../node_modules/milligram/src/List";
@import "../node_modules/milligram/src/Navbar";
@import "../node_modules/milligram/src/Spacing";
@import "../node_modules/milligram/src/Table";
@import "../node_modules/milligram/src/Typography";
@import "../node_modules/milligram/src/Utility";

</style>
