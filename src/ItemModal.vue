<template>
	<!-- some generic modal component, wrapping a CSS modal -->
	<transition name="modal" @keyup.esc="$router.push('/')">
		<div class="modal-mask" @click="$router.push('/')">
			<div class="modal-container" @click.stop v-if="element">
				<div class="modal-header">
					<div class="imagewrapper">
						<img :src="element.image?require('./assets/'+element.image):require('./assets/placeholder.png')">
					</div>
					<h1>{{title}}</h1>
					<a href="#" class="closeButton" @click="$router.push('/')">✖</a>
				</div>

				<div class="modal-body" v-if="element.description">
					<span v-html="marked(element.description)"></span>
					<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, odit?</div>
					<div>Aliquam ea eum exercitationem, laborum pariatur placeat quisquam reiciendis suscipit.</div>
					<div>
						Beatae debitis, esse exercitationem impedit maxime necessitatibus officia repellendus voluptatum.
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
	</transition>
</template>

<script>
    let md = require('markdown-it')();
    export default {
        data() {
            return {
                title: null,
                element: null,
            }
        },
        props: ['data'],
        mounted() {
            document.body.style.overflow = "hidden";
            this.title = this.$route.params.id;
            this.element = this.data.find(elem => elem.title === this.title);
            document.title = this.title + " - lw1.at";
        },
        methods: {
            closed(event) {
                this.$router.push('/')
            },
            marked: function(input) {
                return md.render(input);
            }

        }
    }
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
</style>