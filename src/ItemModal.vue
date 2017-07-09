<template>
	<!-- some generic modal component, wrapping a CSS modal -->
	<modal name="hello-world" @closed="closed">

		<h1>{{item}} Fette Überschrift</h1>
		<button @click="$router.push('/')">close</button>

	</modal>
</template>

<script>
    export default {
        data() {
            return {
                item: null
            }
        },
        mounted() {
            // use $route.params.id to get the item for that ID from whereever you have stored all the items.
            this.item = this.$route.params.id;
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
