<template>
	<div id="overview">
		<div id="buttonwrapper">
			<button class="button-outline" id="check1" @click="sort('title')">Sort by title</button>
			<button class="button-outline" id="check2" @click="sort('id')">Sort by id</button>
			<button class="button-outline" id="check3" @click="sort('date')">Sort by Date</button>
			<button class="button-outline" id="shuffle" @click="shuffle()">Shuffle</button>
			<br>
			<button v-for="element in tags"
					:class="['button-outline ',filters.includes(element)?'active':'']"
					@click="search='';tagfilter(element)">
				{{element}}
			</button>
			<button class="button-outline" @click="filters=[];filter('show all')">Reset</button>
			<input type="text" title="test" v-model="search"/>
		</div>
		<div id="blockwrapper">
			<isotope ref="cpt" :list="data" id="root_isotope" class="isoDefault" :options='getOptions()'
					 @filter="filterOption=arguments[0]">
				<div v-for="element in data" :key="element.title" class="card"
					 @click="$router.push({ name: 'itemModal',params:{id:element.title} })">
					<div class="imagewrapper">
						<img :src="element.image?require('./assets/'+element.image):require('./assets/placeholder.png')">
					</div>
					<div class="textwrapper">
						{{element.title}}
						<br> {{element.niceDate}}
						<br>
						<router-link :to="{name: 'itemModal', params: {id: element.title}}" style="display: none;">
							{{element.title}}
						</router-link>
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
		<router-view :data="data">
			<!-- here the ItemModal component will be rendered -->
		</router-view>

	</div>
</template>

<script>
    import isotope from "vueisotope"
    import debounce from 'lodash.debounce';
    import * as colors from 'material-colors';
    import data from 'json-loader!yaml-loader!./data.yaml';

    export default {
        name: 'overview',
        data() {
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
                search: ""
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
                        columnWidth: ".card",
                        gutter: 10,
                        isFitWidth: true
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

                        },
                        "search": (element) => {
                            if (this.search === "") {
                                return true;
                            }
                            console.info("running filter function");

                            return element.title.toLowerCase().includes(this.search.toLowerCase());
                        }
                    }
                };
            }
        },
        components: {
            isotope,
        },
        watch: {
            search: function() {
                console.warn("filtering");
                this.filters = [];
                if (this.search !== "") {
                    this.filter('search');
                }
            }
        }
    }
</script>

<style lang="scss">
	@import "variables";
	@import "../node_modules/milligram/src/milligram";

	body {
		/*background-color: #90CAF9;*/
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23009688' fill-opacity='0.2'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
	}

	.container {
		background-color: white;
	}

	#app {
		text-align: center;
		margin-top: 20px;
	}

	#blockwrapper {
		margin: 20px;
	}

	#root_isotope {
		margin: 0 auto;
	}

	.card {
		background-color: #009688;
		color: white;
		border-radius: $borderRadius;
		z-index: 3;
		position: relative;
		margin-bottom: 20px;
		width: 100%;
		max-width: 300px;
		height: 300px;
		cursor: pointer;
		&:before {
			border-radius: $borderRadius;
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -3;
			@include shadow(2);
			transition: box-shadow 0.2s;
		}
		&:hover {
			&:before {
				@include shadow(3);
			}
		}
		.imagewrapper {
			border-top-left-radius: $borderRadius;
			border-top-right-radius: $borderRadius;
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

	html { // https://aykevl.nl/2014/09/fix-jumping-scrollbar
		margin-left: calc(100vw - 100%);
		margin-right: 0;
	}

</style>
