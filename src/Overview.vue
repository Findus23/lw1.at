<template>
	<div id="overview">
		<div id="buttonwrapper">
			<div class="languageSelector">
				<router-link :to="{ name: 'Overview', params: { language: 'en' }}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
						<g transform="translate(80) scale(.94)">
							<path fill="#006" d="M-256 0H768.02v512.01H-256z"></path>
							<path d="M-256 0v57.244l909.535 454.768H768.02V454.77L-141.515 0H-256zM768.02 0v57.243L-141.515 512.01H-256v-57.243L653.535 0H768.02z"
							      fill="#fff"></path>
							<path d="M170.675 0v512.01h170.67V0h-170.67zM-256 170.67v170.67H768.02V170.67H-256z"
							      fill="#fff"></path>
							<path d="M-256 204.804v102.402H768.02V204.804H-256zM204.81 0v512.01h102.4V0h-102.4zM-256 512.01L85.34 341.34h76.324l-341.34 170.67H-256zM-256 0L85.34 170.67H9.016L-256 38.164V0zm606.356 170.67L691.696 0h76.324L426.68 170.67h-76.324zM768.02 512.01L426.68 341.34h76.324L768.02 473.848v38.162z"
							      fill="#c00"></path>
						</g>
					</svg>
				</router-link>
				<router-link :to="{ name: 'Overview', params: { language: 'de' }}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480">
						<path fill="#fff" d="M640 480H0V0h640z"></path>
						<path fill="#df0000" d="M640 480H0V319.997h640zm0-319.875H0V.122h640z"></path>
					</svg>
				</router-link>
			</div>
			<button id="check1" @click="sort('title')">Sort by title</button>
			<button id="check2" @click="sort('id')">Sort by id</button>
			<button id="check3" @click="sort('date')">Sort by Date</button>
			<button id="shuffle" @click="shuffle()">
				<icon name="random"></icon>
				Shuffle
			</button>
			<br>
			<button v-for="element in tags"
			        :class="['button-outline',filters.includes(element)?'active':'','colored']"
			        @click="search='';tagfilter(element)"
			        :style="{backgroundColor: getColorByTag(element),borderColor:getColorByTag(element)}">
				{{element}}
			</button>
			<button class="button-outline" @click="filters=[];filter('show all')">
				<icon name="refresh"></icon>
				Reset
			</button>
			<input title="test" v-model="search"/>
		</div>
		<div id="blockwrapper">
			<isotope ref="cpt" :list="data" id="root_isotope" class="isoDefault" :options='getOptions()'
			         @filter="filterOption=arguments[0]">
				<div v-for="element in data" :key="element.id" class="card"
				     @click="$router.push({ name: 'itemModal',params:{id:element.id} })">
					<div class="imagewrapper">
						<img :src="element.image?require('./assets/'+element.image):require('./assets/placeholder.png')">
					</div>
					<div class="textwrapper">
						{{ translate(element.title) }}
						<br>
						<div v-if="element.date">
							{{ formatDate(element.date) }}
						</div>
						<br>
						<router-link :to="{name: 'itemModal', params: {id: translate(element.title)}}"
						             style="display: none;">
							{{translate(element.title)}}
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
		<router-view :language="language" :data="data">
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
                search: "",
//                language: "de"
            }
        },
        props: ["language"],
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
                let vm = this;
                return {
                    getSortData: {
                        id: "id",
                        title: function(element) {
                            let value = element.title;
                            if (typeof value === "object") {
                                return value[vm.language];
                            } else {
                                return value;
                            }
                        },
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
                            return vm.translate(element.title).toLowerCase().includes(this.search.toLowerCase());
                        }
                    }
                };
            },
            translate: function(value) {
                if (typeof value === "object") {
                    return value[this.language];
                } else {
                    return value;
                }
            },
            formatDate: function(datestring) {
                let date = new Date(datestring);
                if (isNaN(date.getFullYear())) {
                    return "";
                }
                return date.toLocaleString(this.language, {month: "long"}) + " " + date.getFullYear()
            }
        },
        components: {
            isotope,
        },
        watch: {
            search: function() {
                this.filters = [];
                if (this.search !== "") {
                    this.filter('search');
                }
            }
        }
    }
</script>
