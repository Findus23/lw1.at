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
		<Contact></Contact>
		<router-link :to="{ name: (language==='de' ? 'Impressum':'Imprint')}" style="text-align: center">
			{{language==="de" ? "Impressum":"Imprint"}}
		</router-link>
		<router-view :language="language" :data="data">
			<!-- here the ItemModal component will be rendered -->
		</router-view>

	</div>
</template>

<script>
    import Intro from "./Intro.vue";
    import Contact from "./Contact.vue";

    const data = require('json-loader!yaml-loader!./data.yaml');
    const tags = require('json-loader!yaml-loader!./tags.yaml');

    export default {
        components: {Intro, Contact},
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
        }
    };
</script>

<style lang="scss">
	@import "variables";
	@import "../node_modules/milligram/src/Color";
	@import "../node_modules/milligram/src/Utility";
	#introduction {
		text-align: left;
		margin-bottom: 2rem;
	}

	h1 {
		font-weight: 300;
		color: black;
	}

	body {
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5'%3E%3Crect width='2.5' height='5' fill='white' /%3E%3Crect x='2.5' y='0' width='2.5' height='5' fill='%23f5f5f5' /%3E%3C/svg%3E");
		font-family: -apple-system, "Helvetica Neue Light", "HelveticaNeue", "Helvetica Neue", "Roboto", "Liberation Sans", Arial, sans-serif;
		color: #212121;
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	#root_isotope {
		margin: 0 auto;
	}

	.card {
		background-color: #009688;
		transition: background-color .2s;
		color: white;
		border-radius: $borderRadius;
		z-index: 3;
		position: relative;
		margin-bottom: 20px;
		width: 100%;
		max-width: 300px;
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
		&:hover, &:focus {
			&:before {
				@include shadow(3);
			}
			color: white;
			background: darken(#009688, 0.8);
			img {
				filter: brightness(0.8);
			}
		}
		img {
			display: block;
			transition: filter .2s;
			border-top-left-radius: $borderRadius;
			border-top-right-radius: $borderRadius;
			height: auto;
		}
		.textwrapper {
			height: 150px;
			display: flex;
			flex-direction: column;
			align-content: center;
			justify-content: center;
			> div {
				padding: 0 10px
			}
		}
	}

	.tag {
		display: inline-block;
		padding: .2em .6em .3em;
		font-size: 70%;
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

	button {
		color: white;
		&.colored {
			color: white;
		}
		&.active {
			/*color: darken($color-secondary, 10%);
			border-color: darken($color-secondary, 10%);
			background-color: darken(white, 10%) !important;*/
		}
		svg {
			vertical-align: sub;
			margin-right: 4px;
		}

	}

	#sortwrapper {
		//display: flex;
		display: none;
		flex-direction: column;
		padding: 0 5rem 0 3rem;
		a {
			color: red;
			&:active, &:hover, &:focus, &.active {
				color: black;
			}
		}
	}

	#filterwrapper {
		button {
			background-color: transparent;
			border: none;
			color: darkgray;
			padding-left: 10px;
			padding-right: 10px;
			text-transform: initial;
			&.active {
				color: black;
			}
		}
	}

	#searchwrapper {
		input {
			-webkit-appearance: none;
			-moz-appearance: none;
			padding: 4px;
			border: 1px solid #bbb; /* Here */
			border-radius: $borderRadius;
			&:focus {
				border-color: $color-primary;
			}
			&::placeholder {
				color: #666666;
			}
		}
	}

	#noresults {
		font-size: 20px;
		font-weight: bold;
	}

	.languageSelector {
		position: absolute;
		top: 20px;
		right: 20px;
		a {
		}
	}

	//html { // https://aykevl.nl/2014/09/fix-jumping-scrollbar
	//  margin-left: calc(100vw - 100%);
	//  margin-right: 0;
	//}
</style>