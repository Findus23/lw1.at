<template>
	<!-- some generic modal component, wrapping a CSS modal -->
	<transition name="modal">
		<div class="modal-mask" @click="$router.push({ name: 'Overview', params: { language: language }})">
			<div class="modal-container" role="dialog" ref="container" tabindex="0" @click.stop
			     @keyup.escape="$router.push({ name: 'Overview', params: { language: language }})">
				<div v-if="element">
					<div class="modal-header">
						<div class="imagewrapper">
							<img :src="element.image?require('./assets/contentimages/'+element.image):require('./assets/contentimages/placeholder.png')">
						</div>
						<h1>{{ translate(element.title) }}</h1>
						<a href="#" class="closeButton"
						   @click="$router.push({ name: 'Overview', params: { language: language }})">✖</a>
					</div>
					<div class="modal-body" v-if="element.description" ref="test">
						<div class="modal-linkbar">
							<a v-bind:href="element.url" v-if="element.url" target="_blank">
								<div class="try-it-out">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="30"
									     height="30" style="fill: currentColor">
										<path d="M54.22083 161.88751C75.49125 69.74037 157.61638.879 255.99447-.0344V71.2784c-58.68038.82679-108.44983 38.32148-127.51646 90.6032H54.22378z"></path>
										<path d="M183.32848 154.61394L93.60991 255.96317-.0104 154.45508"></path>
									</svg>
									<span>Try it out</span>
								</div>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420">
									<title>Try out test</title>
									<path style="stroke: currentColor; fill: none" stroke-width="20"
									      d="M209,15a195,195 0 1,0 2,0zm1,0v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382"></path>
								</svg>
							</a>
							<a v-bind:href="'https://github.com/'+ element.github" v-if="element.github"
							   target="_blank">
								<svg viewBox="0 0 16 16">
									<title>Source on Github</title>
									<path fill-rule="evenodd" style="fill: currentColor"
									      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
								</svg>
							</a>

						</div>
						<span v-html="marked(element.description)"></span>
						<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, odit?</div>
						<div>Aliquam ea eum exercitationem, laborum pariatur placeat quisquam reiciendis suscipit.</div>
						<div>
							Beatae debitis, esse exercitationem impedit maxime necessitatibus officia repellendus
							voluptatum.
						</div>
						<div>Asperiores aut dignissimos esse, iure possimus repellendus similique sunt voluptatem!</div>
						<div>Assumenda illum incidunt ipsam maxime minus molestias neque placeat recusandae.</div>
						<div>Culpa iusto natus nisi possimus quia quibusdam suscipit veritatis voluptates.</div>
						<div>Deleniti, error inventore minima neque officia quibusdam quidem rem velit?</div>
						<div>A architecto doloribus inventore modi molestiae nostrum numquam placeat saepe!</div>
						<div>Cupiditate delectus deleniti et incidunt inventore iure minima quas ut?</div>
						<div>Beatae eligendi excepturi harum iure, laboriosam laudantium tempore totam voluptatum?</div>
						<div>Deserunt earum fugit, illo in perferendis sequi soluta. Est, non.</div>
						<div>Atque cum distinctio dolore eaque, mollitia nihil officia voluptas voluptatem.</div>
						<div>Aliquam doloremque esse illo maxime qui quod repellendus veritatis voluptatum.</div>
						<div>Autem beatae eligendi itaque maxime, nemo perferendis sapiente sint voluptatum.</div>
						<div>Aperiam consequuntur corporis cumque dolore ea eius perferendis quod, soluta?</div>
						<div>A consequuntur exercitationem inventore ipsa nihil qui soluta velit voluptatem.</div>
						<div>Beatae debitis facere ipsam neque nesciunt quas quis ullam vitae!</div>
						<div>Consectetur dolore dolorum ducimus magnam natus necessitatibus officia sequi unde!</div>
						<div>Iste magni natus necessitatibus quasi qui quisquam ratione, repudiandae tempora.</div>
						<div>Aliquid dolorum eligendi iste iure molestias mollitia numquam quo repellendus.</div>
					</div>

					<div class="modal-footer">
						default footer
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
    let md = require('markdown-it')();
    export default {
        data() {
            return {
                title: null,
                element: null,
            };
        },
        props: ['language', 'data'],
        mounted() {
            document.body.style.overflow = "hidden";
            this.id = this.$route.params.id;
            this.element = this.data.find(elem => elem.id === this.id);
            document.title = this.translate(this.element.title) + " - lw1.at";
            this.$refs.container.focus();
        },
        methods: {
            closed(event) {
                this.$router.push({name: 'Overview', params: {language: language}});
            },
            marked: function(input) {
                return md.render(input);
            },
            translate: function(value) {
                if (typeof value === "object") {
                    return value[this.language];
                } else {
                    return value;
                }
            }
        }
    };
</script>

<style lang="scss">
	.closeButton {
		position: absolute;
		font-size: 22px;
		top: 10px;
		right: 10px;
		padding: 10px;
		cursor: pointer;
		transition: color 0.2s;
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
		border-radius: 5px;
		img {
			width: 100%;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		transition: all .3s ease;
		&:focus {
			outline: none;
		}
	}

	.modal-header h3 {
		margin-top: 0;
		color: #42b983;
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
					color: orange;
				}
				.try-it-out {
					color: orange;
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
</style>