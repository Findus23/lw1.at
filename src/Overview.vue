<template>
	<div id="overview">
		<intro :language="language"></intro>
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
		<div class="row">
			<div class="col" id="sortwrapper">
				<a @click="sort='date'" v-bind:class="sort==='date'?'active':''">
					Date
				</a>
				<a @click="sort='title'" v-bind:class="sort==='title'?'active':''">
					Title
				</a>
			</div>
			<div class="col" id="filterwrapper">
				<button v-for="(tag, key, index) in tags"
				        :class="['button-outline',filters.includes(key)?'active':'','colored']"
				        @click="tagfilter(key)"
				        :style="{backgroundColor: getColorByName(tag.color),borderColor:getColorByName(tag.color)}">
					{{translate(tag.name)}}
				</button>
				<button class="button-outline" @click="filters=[];search=''">
					<icon name="refresh"></icon>
					Reset
				</button>
				<input title="test" v-model="search"/>
			</div>
		</div>
		<div id="blockwrapper">
			<router-link v-for="element in elements" :key="element.id" class="card"
			             :to="{ name: 'itemModal',params:{id:element.id} }">
				<img :src="element.image?require('./assets/thumbnails/'+element.image):require('./assets/thumbnails/placeholder.png')"
				     width="300" height="150">
				<div class="textwrapper">
					{{ translate(element.title) }}
					<br>
					<div v-if="element.date">
						{{ formatDate(element.date) }}
					</div>
					<router-link :to="{name: 'itemModal', params: {id: translate(element.title)}}"
					             style="display: none;">
						{{translate(element.title)}}
					</router-link>
					<div class="tagwrapper">
						<div class="tag"
						     v-for="tag in element.tags"
						     :style="{backgroundColor: getColorByName(tags[tag].color)}">{{translate(tags[tag].name)}}
						</div>
					</div>

				</div>
			</router-link>
		</div>
		<router-view :language="language" :data="data">
			<!-- here the ItemModal component will be rendered -->
		</router-view>

	</div>
</template>

<script>
    import * as colors from 'material-colors';
    import Intro from "./intro.vue";

    const data = require('json-loader!yaml-loader!./data.yaml');
    const tags = require('json-loader!yaml-loader!./tags.yaml');

    export default {
        components: {Intro},
        name: 'overview',
        data() {
            return {
                data: data,
                tags: tags,
                ascending: true,
                filters: [],
                search: "",
                sort: "hi"
            };
        },
        props: ["language"],
        computed: {
            elements() {
                let vm = this;
                let filtered = this.data.filter(item => {
                    return vm.filterContains(item) && vm.filterSearch(item);
                });
                return filtered.sort(function(a, b) {
                    if (vm.sort === "title") {
                        return vm.translate(a.title).localeCompare(vm.translate(b.title));
                    } else {
                        return new Date(b.date) - new Date(a.date);
                    }
                });
            }
        },
        methods: {
            filterContains: function(element) {
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
            filterSearch: function(element) {
                if (this.search === "") {
                    return true;
                }
                return this.translate(element.title).toLowerCase().includes(this.search.toLowerCase());
            },
            tagfilter: function(element) {
                if (this.filters.includes(element)) {
                    this.filters = this.filters.filter(item => item !== element);
                } else {
                    this.filters.push(element);
                }
                console.log(this.filters);
            },
            getColorByName(color) {
                if (color && colors[color]) {
                    return colors[color]["500"];
                }
                return "black";
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
                return date.toLocaleString(this.language, {month: "long"}) + " " + date.getFullYear();
            }
        },
    };
</script>
