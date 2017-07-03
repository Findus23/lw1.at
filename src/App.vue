<template>
	<div id="app">
		<div id="buttonwrapper">
			<button class="button-outline" id="check1" @click="sort('name')">Sort by name</button>
			<button class="button-outline" id="check2" @click="sort('id')">Sort by id</button>
			<br>
			<button v-for="element in tags"
					:class="['button-outline ',filters.includes(element)?'active':'']"
					@click="tagfilter(element)">
				{{element}}
			</button>
			<button class="button-outline" @click="filters=[];filter('show all')">Reset</button>
		</div>
		<p>{{selected.name}} ({{selected.id}})</p>
		<div id="blockwrapper">
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
                        gutter: 10
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

	body {
		background-color: #90CAF9;
	}

	#app {
		text-align: center;
		margin-top: 20px;
	}

	#blockwrapper {
		margin: 20px;
	}

	.block {
		background-color: white;
		padding: 10px;
		border-radius: 3px;
		z-index: 3;
		position: relative;
		margin-bottom: 20px;
		/*width: 50px;*/
		/*height: 50px;*/
		&:before {
			border-radius: 3px;
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 0;
			box-shadow: 5px 5px 17px 0 rgba(0, 0, 0, 0.2);
		}
	}

	button.active {
		color: darken($color-secondary, 10%);
		border-color: darken($color-secondary, 10%);
		background-color: darken(white, 10%) !important;
	}
</style>
