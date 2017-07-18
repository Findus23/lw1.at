<template>
	<!-- some generic modal component, wrapping a CSS modal -->
	<transition name="modal" @keyup.esc="$router.push('/')">
		<div class="modal-mask" @click="$router.push('/')">
			<div class="modal-container" @click.stop v-if="element">
				<div class="modal-header">
					<h1>{{title}}</h1>
					<div class="imagewrapper">
						<img :src="element.image?require('./assets/'+element.image):require('./assets/placeholder.png')">
					</div>
					<a href="#" class="closeButton" @click="$router.push('/')">✖</a>
				</div>

				<div class="modal-body">
					<div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam aut beatae consequatur cupiditate deleniti doloremque eius eos facilis hic illum iusto nemo nihil perferendis quod tenetur, voluptas? Explicabo, illo.
					</div>
					<div>
						Ab asperiores corporis, delectus eius enim eos, esse necessitatibus numquam perferendis possimus quam quod ratione recusandae voluptate voluptatum! Et facilis fugiat magnam maxime nihil, perferendis quas tempora temporibus velit! Porro.
					</div>
					<div>
						Delectus eos harum modi sint vel. Ab, aperiam cum doloribus ea eligendi eos et explicabo hic id inventore mollitia nam nemo quam quas quia, quo totam unde vitae voluptatibus voluptatum!
					</div>
					<div>
						Ad consequatur cum dignissimos dolorem ea eaque expedita facilis molestiae mollitia, natus nisi praesentium ratione repellat rerum tempora tenetur vel, voluptate. Consequatur dicta earum id magni repellat sed sunt suscipit.
					</div>
					<div>
						Accusamus accusantium ad aliquam aliquid, animi dicta eos inventore iusto maiores molestiae officia ratione rerum sit? Aliquam dignissimos fuga harum libero rerum! Autem dicta esse minus, possimus quibusdam veritatis voluptate?
					</div>
					<div>
						Atque culpa ea, earum laboriosam non ratione suscipit! Aliquid animi beatae ducimus itaque labore. A amet dignissimos dolores eveniet explicabo incidunt minus molestiae nostrum omnis repellendus sit tempore, veritatis vitae?
					</div>
					<div>
						Aut culpa dignissimos eaque eligendi enim exercitationem fugit illum in laudantium minima mollitia, nemo nihil nulla odit quod repellendus ullam unde vero! Amet aut dolores, eius inventore molestiae quam tempore!
					</div>
					<div>
						Et fuga illo molestiae quaerat quibusdam unde vel! Assumenda atque dolore et facere ipsa itaque nobis obcaecati quisquam voluptates? Aperiam beatae blanditiis exercitationem ipsum nemo, pariatur quod sit tenetur vitae?
					</div>
					<div>
						Alias aliquid commodi cum cumque debitis, deserunt dignissimos dolore ea fuga itaque magnam magni nam nesciunt nobis, placeat possimus quam quia quidem sapiente sequi, soluta tempore vel. Consectetur incidunt, veritatis!
					</div>
					<div>
						Delectus dicta explicabo laboriosam, necessitatibus nulla odio quibusdam totam veniam. Accusamus autem ducimus excepturi id molestiae, perspiciatis porro ratione soluta vel! Animi aperiam error eveniet facilis minima similique tenetur voluptatibus?
					</div>
					<div>
						Doloribus esse itaque maxime obcaecati omnis optio quas quibusdam. Aut consectetur cupiditate, debitis dicta explicabo, harum impedit incidunt ipsam, laudantium maxime nam quibusdam ratione saepe sapiente sunt temporibus totam ut.
					</div>
					<div>
						Amet, architecto consequuntur deleniti dolores doloribus dolorum enim esse ex expedita nisi, non officiis optio quas, quia saepe voluptate voluptatibus! Ab autem consectetur corporis debitis dolor eveniet quae. Odio, provident.
					</div>
					<div>
						Ad alias aliquam commodi corporis ea, explicabo id laborum magni maiores minima natus provident repellendus reprehenderit sunt ullam? Amet animi aspernatur consectetur cum est nulla porro sequi. Ad, ipsam quibusdam.
					</div>
					<div>
						Aspernatur assumenda blanditiis, dolores dolorum excepturi fugiat harum natus nulla numquam perspiciatis placeat quasi reiciendis repellat temporibus, vel velit voluptates voluptatum. Beatae commodi consequatur corporis dignissimos incidunt ipsa natus porro.
					</div>
					<div>
						Ad adipisci animi architecto aspernatur culpa delectus doloribus dolorum exercitationem explicabo, facilis fugit, id, ipsam maiores modi necessitatibus nulla quae quasi saepe tempora veritatis? Asperiores delectus nihil officiis repellendus sed.
					</div>
				</div>

				<div class="modal-footer">
					default footer
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
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
		overflow: scroll;
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
		width: 80%;
		padding: 20px 30px;
		@media (max-width: 40.0rem) {
			width: 100%;
			padding: 20px;
		}
		margin: 0 auto;
		background-color: #fff;
		border-radius: 2px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		transition: all .3s ease;
	}

	.modal-header h3 {
		margin-top: 0;
		color: #42b983;
	}

	.modal-body {
		margin: 20px 0;
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