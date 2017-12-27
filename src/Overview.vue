<template>
	<div id="overview">
		<div class="languageSelector">
			<router-link :to="{ name: 'Overview', params: { language: otherLanguage }}"
			             rel="alternate" :hreflang="otherLanguage">
				{{language==="de" ? "English":"Deutsch"}}
			</router-link>
		</div>
		<intro :language="language"></intro>
		<div id="sortwrapper">
			<a @click="sort='date'" v-bind:class="sort==='date'?'active':''">
				Date
			</a>
			<a @click="sort='title'" v-bind:class="sort==='title'?'active':''">
				Title
			</a>
		</div>
		<div id="filterwrapper">
			<button class="button-outline" @click="filter=false;search=''"
			        :class="filter ? '' : 'active'">
				{{language==="de"?"Alle Projekte":"All Projects"}}
			</button>
			<button v-for="(tag, key, index) in tags"
			        :class="['button-outline',(filter === key)?'active':'']"
			        @click="filter=key">
				{{translate(tag.name)}}
			</button>
		</div>
		<div id="searchwrapper">
			<input title="test" v-model="search" :placeholder="language==='de'?'Suchen...':'Search...'"/>
		</div>
		<div v-if="noResults" id="noresults">
			{{language==="de"?"Keine Ergebnisse":"No results"}}
		</div>
		<div id="blockwrapper">
			<router-link v-for="element in elements" :key="element.id" class="card"
			             :to="{ name: 'itemModal',params:{id:element.id} }">
				<img :src="element.image?require('./assets/thumbnails/'+element.image):require('./assets/thumbnails/placeholder.png')"
				     width="300" height="150">
				<div class="textwrapper">
					<div>{{ translate(element.title) }}</div>
					<div v-if="element.date">
						{{ formatDate(element.date) }}
					</div>
					<div class="tagwrapper">
						<div class="tag"
						     v-for="tag in element.tags"
						     style="background-color: black">{{translate(tags[tag].name)}}
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
                filter: false,
                search: "",
                sort: "date",
                noResults: false
            };
        },
        props: ["language"],
        computed: {
            elements() {
                let vm = this;
                let filtered = this.data.filter(item => {
                    return vm.filterContains(item) && vm.filterSearch(item);
                });
                if (filtered.length === 0) {
                    filtered = this.data;
                    this.noResults = true;
                } else {
                    this.noResults = false;
                }
                return filtered.sort(function(a, b) {
                    if (vm.sort === "title") {
                        return vm.translate(a.title).localeCompare(vm.translate(b.title));
                    } else {
                        return new Date(b.date) - new Date(a.date);
                    }
                });
            },
            otherLanguage() {
                return this.language === 'de' ? 'en' : 'de';
            }
        },
        methods: {
            filterContains: function(element) {
                if (!this.filter) {
                    return true;
                }

                return element.tags.includes(this.filter);

            },
            filterSearch: function(element) {
                if (this.search === "") {
                    return true;
                }
                return this.translate(element.title).toLowerCase().includes(this.search.toLowerCase()) ||
                    this.translate(element.description).toLowerCase().includes(this.search.toLowerCase());
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
        mounted() {
            document.title = "Lukas Winkler - lw1.at";
        }
    };
</script>
