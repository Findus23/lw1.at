<template>
	<!-- some generic modal component, wrapping a CSS modal -->
	<transition name="modal">
		<div class="modal-mask" @click="$router.push({ name: 'Overview', params: { language: language }})">
			<div class="modal-container" role="dialog" ref="container" tabindex="0" @click.stop
			     @keyup.escape="$router.push({ name: 'Overview', params: { language: language }})">
				<div v-if="element">
					<div class="modal-header">
						<div class="imagewrapper" :class="element.image_seperator ? 'seperator':''">
							<HashImage :img="require('./assets/contentimages/'+element.image)"
							           v-if="element.image"></HashImage>
						</div>
						<router-link class="closeButton" :to="{ name: 'Overview', params: { language: language }}">✖
						</router-link>

					</div>
					<div class="modal-body" ref="test">
						<h1>{{ translate(element.title) }}
							<div v-if="element.subtitle">{{ translate(element.subtitle) }}</div>
						</h1>
						<div :class="{'modal-linkbar':true, try:element.try}">
							<a v-bind:href="element.url" v-if="element.url" target="_blank">
								<div class="try-it-out" v-if="element.try">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="30"
									     height="30" style="fill: currentColor">
										<path d="M54.22083 161.88751C75.49125 69.74037 157.61638.879 255.99447-.0344V71.2784c-58.68038.82679-108.44983 38.32148-127.51646 90.6032H54.22378z"></path>
										<path d="M183.32848 154.61394L93.60991 255.96317-.0104 154.45508"></path>
									</svg>
									<span>{{ language === "de" ? "Ausprobieren" : "Try it out!" }}</span>
								</div>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420">
									<title>Website</title>
									<path style="stroke: currentColor; fill: none" stroke-width="20"
									      d="M209,15a195,195 0 1,0 2,0zm1,0v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"></path>
								</svg>
							</a>
							<a v-bind:href="element.gitlab" v-if="element.gitlab" target="_blank" rel="noopener">
								<!-- License - http://fontawesome.io/license (SIL OFL 1.1) -->
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54">
									<title>View source on GitLab</title>
									<path fill="none" d="M-.2.1h53.8v53.4H-.2z"></path>
									<path fill="currentColor"
									      d="M26.6 49.3L2.4 31.7c-.3-.2-.6-.6-.7-1-.1-.4-.1-.8 0-1.2L4.5 21l22.1 28.3zM11.9 3.9L17.4 21H4.5L10 3.9c.1-.4.5-.6.9-.6.6-.1.9.2 1 .6zM17.4 21h18.4l-9.2 28.3L17.4 21zm34.2 8.6c.1.4.1.8 0 1.2-.1.4-.4.7-.7 1L26.6 49.3 48.7 21l2.9 8.6zM48.7 21H35.9l5.5-17.1c.1-.4.5-.6.9-.6.5 0 .8.2.9.6L48.7 21z"></path>
								</svg>
							</a>
							<a v-bind:href="'https://github.com/'+ element.github" v-if="element.github"
							   target="_blank" rel="noopener">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<title>View source on Github</title>
									<path fill-rule="evenodd" style="fill: currentColor"
									      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
								</svg>
							</a>
							<license-icons v-if="element.license" :id="element.license.id"
							               :url="element.license.url"></license-icons>
						</div>
						<div v-if="element.single_language && element.single_language!==language" class="note">
							<div v-if="element.single_language==='de'">
								This post hasn't (yet) been translated into English
							</div>
							<div v-else>
								Dieser Post wurde (noch) nicht auf Deutsch übersetzt.
							</div>
						</div>
						<div v-if="element.description" v-html="translate(element.description)"></div>
						<iframe v-if="element.iframe" :src="element.iframe.url"
						        :style="{backgroundColor: element.iframe.color}" :sandbox="element.iframe.sandbox"
						        :allowfullscreen="element.iframe.allowfullscreen"></iframe>
						<button class="readmore" @click="readmore" v-if="!sentReadmore">
							<template v-if="language==='en'">
								I want to read more about this project
							</template>
							<template v-else>
								Ich möchte mehr über dieses Projekt lesen.
							</template>
						</button>
						<div v-if="sentReadmore" class="note">
							<template v-if="language==='en'">
								Thanks for the feedback!<br>
								When I get to it, I will try to extend this post.<br>
								In the meantime you can contact me at
								<a href="mailto:feedback@lw1.at">feedback@lw1.at</a> if you
								want to.
							</template>
							<template v-else>
								Danke für das Feedback!<br>
								Wenn ich dazu komme, werde ich diesen Eintrag ergänzen.<br>
								In der Zwischenzeit kann man mich auch unter
								<a href="mailto:feedback@lw1.at">feedback@lw1.at</a>
								kontaktieren.
							</template>

						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import LicenseIcons from "./LicenseIcons.vue";
import HashImage from "./HashImage.vue";
import Vue, {PropType} from "vue";
import {Article, Language, translatableString} from "./types";

export default Vue.extend({
    data() {
        return {
            title: "",
            element: undefined as Article | undefined,
            sentReadmore: false as boolean,
            id: ""
        };
    },
    props: {
        language: String as PropType<Language>,
        data: Array as PropType<Article[]>
    },

    mounted() {
        document.body.style.overflow = "hidden";
        this.id = this.$route.params.id;

        this.element = this.data.find(elem => elem.id === this.id);
        if (!this.element) {
            this.$router.replace("/");
            return false;
        }
        document.title = this.translate(this.element.title) + " - lw1.at";

        this.$nextTick(function () {
            const _paq = window._paq;
            _paq.push(['setDocumentTitle', document.title]);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
        });
		const container=this.$refs.container as HTMLDivElement;
		container.focus();
    },
    methods: {
        translate: function (value: translatableString): string {
            if (typeof value === "object") {
                return value[this.language];
            } else {
                return value;
            }
        },
        readmore: function (): void {
            this.sentReadmore = true;
            if (typeof window._paq != "undefined") {
                window._paq.push(['trackEvent', 'Feedback', 'readmore', this.id]);
            } else {
                console.info("Feedback not sent as Matomo isn't loaded");
            }
        }
    },
    // head: {
    //     title: function (): string {
    //         if (this.element) {
    //             return {inner: this.translate(this.element.title)};
    //         }
    //     }
    // },
    components: {
        HashImage,
        LicenseIcons
    }
});
</script>

<style lang="scss">
@import "variables";

.closeButton {
  position: absolute;
  font-size: 22px;
  line-height: 22px;
  top: 10px;
  right: 10px;
  padding: 10px;
  cursor: pointer;
  transition: color 0.2s;
  color: $color-primary;
  z-index: 2000;

  &:hover {
	color: darkgrey;
  }
}

.modal-mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0 20px;
  @media (max-width: 40.0rem) {
	padding: 0 10px;
  }
  z-index: 1000;
  transition: opacity .3s ease;
}

.modal-container {
  position: relative;
  max-width: 1000px;
  /*
  @media (max-width: 40.0rem) {
    width: 100%;
    padding: 20px;
  }
*/
  margin: 50px auto 0;
  background-color: #fff;
  border-radius: $borderRadius;

  .imagewrapper {
	padding-bottom: 50%;

	&.seperator {
	  border-bottom: solid 1px #ddd;
	}

	img {
	  display: block;
	  width: 100%;
	  border-top-left-radius: $borderRadius;
	  border-top-right-radius: $borderRadius;
	  height: auto;
	  position: absolute;
	  left: 0;
	  top: 0;
	  z-index: 1100;
	  background: white;
	}
  }

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:focus {
	outline: none;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

h1 {
  margin: 0 5px;
}

.modal-body {
  padding: 20px 30px;
  margin: 20px 0;
  text-align: left;
}

.modal-default-button {
  float: right;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

/*.modal-enter .modal-container,*/
/*.modal-leave-active .modal-container {*/
/*transform: scale(0.8);*/
/*}*/

.modal-linkbar {
  display: flex;
  justify-content: space-around;

  &.try {
	margin-top: 40px;
  }

  a {
	position: relative;
	padding: 16px;

	> svg {
	  width: 36px;
	  height: 36px;
	  display: block;
	  color: black;
	}

	svg, span {
	  transition: .2s;
	}

	display: block;

	&:hover {
	  svg {
		color: $color-primary;
	  }

	  .try-it-out {
		color: $color-primary;
	  }
	}

	.try-it-out {
	  position: absolute;
	  top: -40px;
	  left: 23px;
	  right: -150px;
	  vertical-align: top;
	  color: black;

	  svg {
		display: inline-block;
		position: relative;
		top: 20px;
	  }

	  span {

	  }
	}
  }
}

iframe {
  width: 100%;
  height: 400px;
  border: none;
  border-radius: $borderRadius;
  display: block;
  margin-bottom: 15px;
}

.note {
  background-color: $consoleBackground;
  color: $consoleOrange;
  font-family: $consoleFont;
  text-align: center;
  /*background-color: #fdbc4b;*/
  padding: 15px;
  margin-bottom: 15px;
}
</style>
