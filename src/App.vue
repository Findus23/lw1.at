<template>
	<div id="app">
		<button class="button-outline" id="check1" @click="sort('name')">Sort by name</button>
		<button class="button-outline" id="check2" @click="sort('id')">Sort by id</button>
		<br>
		<button v-for="element in tags"
				:class="['button-outline ',filters.includes(element)?'active':'']"
				@click="tagfilter(element)">
			{{element}}
		</button>
		<button class="button-outline" @click="filters=[];filter('show all')">Reset</button>
		<p>{{selected.name}} ({{selected.id}})</p>
		<isotope ref="cpt" :list="data" id="root_isotope" class="isoDefault" :options='getOptions()'
				 @filter="filterOption=arguments[0]">
			<div v-for="element in data" @click="selected=element" :key="element.id" class="block">
				{{element.name}}
				<br> {{element.id}}
				<br>
				<span>{{element.tags.join(",")}}</span>
			</div>
		</isotope>

	</div>
</template>

<script>
    import isotope from "vueisotope"
    import data from 'json-loader!yaml-loader!./data.yaml';
    export default {
        name: 'app',
        data () {
            return {
                tags: ['a', 'b', 'c', 'g'],
                data: data,
                selected: data[0],
                filters: [],
            }
        },
        methods: {
            sort: function(key) {
                this.$refs.cpt.sort(key);
            },
            filter: function(key) {
                this.$refs.cpt.filter(key);
            },
            tagfilter: function(element) {
                if (this.filters.includes(element)) {
                    this.filters = this.filters.filter(item => item !== element)
                } else {
                    this.filters.push(element)
                }
                this.filter('contains')
            },
            getOptions: function() {
                return {
                    getSortData: {
                        id: "id",
                        name: "name"
                    },
                    sortBy: "name",
                    masonry: {
                        columnWidth: 70,
                        gutter: 5
                    },
                    getFilterData: {
                        "show all": function() {
                            return true;
                        },
                        number: function(el) {
                            return el.id > 30;
                        },
                        "test": (el) => {
                            console.log(el.tags.includes(this.filters[0]));
                            return true
                        },
                        "contains": (element) => {
                            if (this.filters.length === 0) {
                                return true;
                            }
                            let missing = false;
                            this.filters.forEach(function(selectedtag) {
                                if (!element.tags.includes(selectedtag)) {
                                    missing = true;
                                }
                            });
                            return !missing;

                        }
                    }
                };
            }
        },
        components: {
            isotope,
        }
    }
</script>

<style lang="scss">
	@import "../node_modules/milligram/src/milligram";

	#app {
		/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
		/*-webkit-font-smoothing: antialiased;*/
		/*-moz-osx-font-smoothing: grayscale;*/
		text-align: center;
		/*color: #2c3e50;*/
		margin-top: 20px;
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	.block {
		background-color: lightgray;
		padding: 10px;
		/*width: 50px;*/
		/*height: 50px;*/
	}

	button.active {
		color: darken($color-secondary, 10%);
		border-color: darken($color-secondary, 10%);
		background-color: darken(white, 10%) !important;

	}
</style>
