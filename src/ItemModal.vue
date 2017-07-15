<template>
	<!-- some generic modal component, wrapping a CSS modal -->
	<modal name="hello-world" @closed="closed">
		<div v-if="this.element">
			<a @click="$router.push('/')" class="closeButton">❌</a>
			<h1>{{title}} Fette Überschrift<span>{{element.niceDate}}</span></h1>
			<button @click="$router.push('/')">close</button>
		</div>
	</modal>
</template>

<script>
    import data from 'json-loader!yaml-loader!./data.yaml';
    export default {
        data() {
            return {
                title: null,
                element: null
            }
        },
        mounted() {
            // use $route.params.id to get the item for that ID from whereever you have stored all the items.
            this.title = this.$route.params.id;
            this.element = data.find(elem => elem.title === this.title);
            this.$modal.show("hello-world")
        },
        methods: {
            closed(event) {
                console.log(event);
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss">
	.closeButton {
		position: absolute;
		font-size: 22px;
		top: 3px;
		right: 10px;
		cursor: pointer;
	}
</style>