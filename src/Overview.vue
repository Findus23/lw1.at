<template>
	<div id="overview">
		<div class="languageSelector">
			<router-link :to="{ name: 'Overview', params: { language: otherLanguage }}"
			             rel="alternate" :hreflang="otherLanguage">
				{{ language === "de" ? "English" : "Deutsch" }}
			</router-link>
		</div>
		<intro :language="language"></intro>
		<Contact :language="language"></Contact>
		<div id="filterwrapper">
			<button class="button-outline" @click="filter=false;search=''"
			        :class="filter ? '' : 'active'">
				{{ language === "de" ? "Alle Projekte" : "All Projects" }}
			</button>
			<button v-for="(tag, key, index) in filterTags" :key="key"
			        :class="['button-outline',(filter === key)?'active':'']"
			        @click="filter=key">
				{{ translate(tag.name) }}
			</button>
		</div>
		<div id="searchwrapper">
			<input title="test" v-model="search" :placeholder="language==='de'?'Suchen...':'Search...'"/>
		</div>
		<div v-if="noResults" id="noresults">
			{{ language === "de" ? "Keine Ergebnisse" : "No results" }}!
		</div>
		<div id="blockwrapper">
			<router-link v-for="element in elements" :key="element.id" class="card"
			             :to="{ name: 'itemModal',params:{id:element.id} }">
				<div class="imgwrapper">
					<HashImage
							:img="element.image?require('./assets/thumbnails/'+element.image):require('./assets/thumbnails/placeholder.png')"
							:small="true" v-if="isOverviewPage()"></HashImage>
				</div>
				<div class="textwrapper">
					<div>{{ translate(element.title) }}</div>
					<div v-if="element.date">
						{{ formatDate(element.date) }}
					</div>
					<div class="tagwrapper">
						<div class="tag" :key="tag"
						     v-for="tag in element.tags">{{ translate(tags[tag].name) }}
						</div>
					</div>

				</div>
			</router-link>
		</div>
		<router-link class="toImprint" :to="{ name: (language==='de' ? 'Impressum':'Imprint')}">
			{{ language === "de" ? "Impressum" : "Imprint" }}
		</router-link>
		<a href="https://keyoxide.org/63DB263BACE368B5C5F79CE494AFBE7C2656A5B5" class="gpg" target="_blank"
		   rel="noopener">
			GPG: 63DB 263B ACE3 68B5 C5F7 9CE4 94AF BE7C 2656 A5B5
		</a>
		<router-link :to="{ name: 'itemModal',params:{id:'classiccounter'} }"><img
				src="https://matomo.lw1.at/index.php?module=ClassicCounter&action=svg&idSite=14"
				alt="Matomo visit counter"
				height="38" aria-hidden="true" id="visitcounter"></router-link>
		<router-view :language="language" :data="data">
			<!-- here the ItemModal component will be rendered -->
		</router-view>

	</div>
</template>

<script lang="ts">
import Intro from "./Intro.vue";
import Contact from "./Contact.vue";
import HashImage from "./HashImage.vue";
import Vue, {PropType} from "vue";
import {Article, Language, Tags, translatableString, YamlImport} from "./types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const yaml: YamlImport = require('./tags.yaml');
yaml.data.forEach((part, index, array) => {
    part.dateObj = new Date(part.date);
    array[index] = part;
});

const data = yaml.data;
const tags = yaml.tags;

export default Vue.extend({
    components: {Intro, Contact, HashImage},
    name: 'overview',
    data() {
        return {
            data: data,
            tags: tags as Tags,
            filter: "",
            search: "",
            noResults: false
        };
    },
    props: {
        language: String as PropType<Language>
    },
    computed: {
        elements(): Article[] {
            let filtered = this.data.filter(item => {
                return this.filterContains(item) && this.filterSearch(item);
            });
            if (filtered.length === 0) {
                filtered = this.data;
                this.noResults = true;
            } else {
                this.noResults = false;
            }
            return filtered.sort((a, b) => {
                return b.dateObj.valueOf() - a.dateObj.valueOf();
            });
        },
        filterTags(): Tags {
            const result: Tags = {};
            let key: string;
            for (key in this.tags) {
                // eslint-disable-next-line no-prototype-builtins
                if (this.tags.hasOwnProperty(key)) {
                    let tag = this.tags[key];
                    if (!tag.hidden) {
                        result[key] = this.tags[key];
                    }
                }
            }
            return result;
        },
        otherLanguage(): Language {
            return this.language === 'de' ? 'en' : 'de';
        }
    },
    methods: {
        filterContains: function (element: Article): boolean {
            if (!this.filter) {
                return true;
            }
            return element.tags.includes(this.filter);
        },
        filterSearch: function (element: Article): boolean {
            if (this.search === "") {
                return true;
            }
            return this.translate(element.title).toLowerCase().includes(this.search.toLowerCase()) ||
                this.translate(element.description).toLowerCase().includes(this.search.toLowerCase());
        },
        translate: function (value: translatableString): string {
            if (typeof value === "object") {
                return value[this.language];
            } else {
                return value;
            }
        },
        formatDate: function (datestring: string): string {
            let date = new Date(datestring);
            if (isNaN(date.getFullYear())) {
                return "";
            }
            return date.toLocaleString(this.language, {month: "long"}) + " " + date.getFullYear();
        },
        isOverviewPage: function (): boolean {
            return this.$router.currentRoute.name === "Overview";
        }
    },
    mounted(): void {
        if (this.language !== "de" && this.language !== "en") {
            this.$router.replace("/");
        }
    }
});
</script>

<style lang="scss">
@import "variables";
@import "../node_modules/milligram/src/Color";
@import "../node_modules/milligram/src/Utility";

.card {
  color: $consoleText;
  background: $consoleBackground;
  transition: color .2s;
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
	/*@include shadow(2);*/
	/*transition: box-shadow 0.2s;*/
  }

  &:hover, &:focus {
	color: $consoleFocus;

	.tag {
	  color: $consoleFocus;
	  border-color: $consoleFocus;
	}
  }

  img {
	display: block;
	transition: filter .2s;
	border-top-left-radius: $borderRadius;
	border-top-right-radius: $borderRadius;
	height: auto;
	z-index: 5;
	position: relative;
	background: $consoleBackground
  }

  .imgwrapper {
	height: 150px;
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
  font-family: $consoleFont;
  display: inline-block;
  padding: .2em .6em .3em;
  font-size: 70%;
  font-weight: bold;
  line-height: 1;
  border: 1px $consoleText solid;
  color: $consoleText;
  background-color: $consoleBackground;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: $borderRadius;
  margin-left: 2px;
  margin-right: 2px;
  transition: color .2s, border-color .2s;
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
	color: $consoleFocus;
  }

  svg {
	vertical-align: sub;
	margin-right: 4px;
  }

}

#filterwrapper {
  font-family: monospace, monospace;
  margin-bottom: 2rem;

  button {
	background-color: transparent;
	border: none;
	color: $consoleBackground;
	text-transform: initial;
	font-family: $consoleFont;
	padding: .2em .6em;
	line-height: 10px;
	height: 25px;
	border-radius: $borderRadius;
	margin-bottom: 0;

	&.active {
	  color: $consoleWhite;
	  background-color: $consoleBackground;
	}

	&:focus, &:active, &:hover {
	  outline: 1px solid $consoleBackground;
	}
  }
}

#searchwrapper {
  margin-bottom: 2rem;

  input {
	font-family: $consoleFont;
	-webkit-appearance: none;
	-moz-appearance: none;
	padding: 4px;
	border: 1px solid #bbb; /* Here */
	border: none;
	border-radius: $borderRadius;
	margin-bottom: 0;
	background-color: $consoleBackground;
	color: $consoleText;
	max-width: 300px;
	width: 100%;

	&:focus {
	  border-color: $color-primary;
	}

	&::placeholder {
	  color: $consoleText;
	  opacity: 1;
	}

	&::selection {
	  background: $consoleText;
	  color: $consoleBackground;
	}
  }
}

#noresults {
  font-family: $consoleFont;
  font-size: 20px;
  font-weight: bold;
}


.gpg {
  display: block;
  font-family: monospace;
  font-size: 80%;
}

#visitcounter {
  height: 35px;
  width: auto;
}

//html { // https://aykevl.nl/2014/09/fix-jumping-scrollbar
//  margin-left: calc(100vw - 100%);
//  margin-right: 0;
//}
</style>
