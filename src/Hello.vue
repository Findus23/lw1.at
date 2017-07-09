<template>
	<div id="app">
		<div id="buttonwrapper">
			<button class="button-outline" id="check1" @click="sort('title')">Sort by title</button>
			<button class="button-outline" id="check2" @click="sort('id')">Sort by id</button>
			<button class="button-outline" id="check3" @click="sort('date')">Sort by Date</button>
			<button class="button-outline" id="shuffle" @click="shuffle()">Shuffle</button>
			<br>
			<button v-for="element in tags"
					:class="['button-outline ',filters.includes(element)?'active':'']"
					@click="tagfilter(element)">
				{{element}}
			</button>
			<button class="button-outline" @click="filters=[];filter('show all')">Reset</button>
		</div>
			<router-view>
				<!-- here the ItemModal component will be rendered -->
			</router-view>
		<div id="blockwrapper">
			<isotope ref="cpt" :list="data" id="root_isotope" class="isoDefault" :options='getOptions()'
					 @filter="filterOption=arguments[0]">
				<div v-for="element in data" :key="element.title" class="card"
					 @click="$router.push({ name: 'itemModal',params:{id:element.title} })">
					<div class="imagewrapper">
						<img :src="element.image?require('./assets/'+element.image):'https://unsplash.it/1000/300/'">
					</div>
					<div class="textwrapper">
						{{element.title}}
						<br> {{element.niceDate}}
						<br>
						<router-link :to="{name: 'itemModal', params: {id: element.title}}" style="display: none;">{{element.title}}</router-link>
						<div class="tagwrapper">
							<div class="tag"
								 v-for="tag in element.tags"
								 :style="{backgroundColor: getColorByTag(tag)}">{{tag}}
							</div>
						</div>

					</div>
				</div>
			</isotope>
		</div>

	</div>
</template>

<script>
    import isotope from "vueisotope"
    import * as colors from 'material-colors';
    import data from 'json-loader!yaml-loader!./data.yaml';
    export default {
        name: 'hello',
        data () {
            return {
                tags: ['a', 'b', 'c', 'python'],
                tagColors: {
                    "a": "cyan",
                    "b": "red",
                    "c": "indigo",
                    "python": "amber"
                },
                data: data,
                ascending: true,
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
            shuffle: function(key) {
                this.$refs.cpt.shuffle(key);
            },
            tagfilter: function(element) {
                if (this.filters.includes(element)) {
                    this.filters = this.filters.filter(item => item !== element)
                } else {
                    this.filters.push(element)
                }
                this.filter('contains')
            },
            getColorByTag(tag) {
                let colorname = this.tagColors[tag];
                if (colors[colorname]) {
                    return colors[colorname]["500"];
                }
                return "black";
            },
            getOptions: function() {
                return {
                    getSortData: {
                        id: "id",
                        title: "title",
                        date: function(elem) {
                            if (elem.date) {
                                return Date.parse(elem.date);
                            }
                            return Infinity;
                        }

                    },
                    sortAscending: this.ascending,
                    sortBy: "date",
                    masonry: {
                        columnWidth: 70,
                        gutter: 10
                    },
                    getFilterData: {
                        "show all": function() {
                            return true;
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

	$imageheight: 150px;

	body {
		/*background-color: #90CAF9;*/
	}

	#app {
		text-align: center;
		margin-top: 20px;
	}

	#blockwrapper {
		margin: 20px;
	}

	.card {
		background-color: #009688;
		color: white;
		border-radius: 3px;
		z-index: 3;
		position: relative;
		margin-bottom: 20px;
		width: 100%;
		max-width: 300px;
		height: 300px;
		/*cursor: pointer;*/
		&:before {
			border-radius: 3px;
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -3;
			@include shadow(2);
		}
		.imagewrapper {
			width: 100%;
			height: $imageheight;
			overflow: hidden;
			position: relative;
			img {
				position: absolute;
				left: -200%;
				right: -200%;
				top: -200%;
				bottom: -200%;
				margin: auto;
				height: auto;
				width: auto;
				min-height: $imageheight;
				min-width: 200px;
				max-width: initial;

			}
		}
		.textwrapper {
			padding: 10px;
		}
	}

	.tag {
		display: inline-block;
		padding: .2em .6em .3em;
		font-size: 75%;
		font-weight: bold;
		line-height: 1;
		color: #ffffff;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: .25em;
		margin-left: 2px;
		margin-right: 2px;
	}

	button.active {
		color: darken($color-secondary, 10%);
		border-color: darken($color-secondary, 10%);
		background-color: darken(white, 10%) !important;
	}
</style>
