<template>
	<header class="intro">
		<h1>Lukas Winkler</h1>
		<div id="introduction">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae maiores minima? Dolorum hic optio quis
			quisquam, repellendus tempora ut.
			Accusantium animi consectetur eaque enim fuga in, laudantium minima neque, nesciunt, non porro provident
			quia quisquam repellat sequi totam velit.
			Ad aliquid beatae dolorem doloribus eaque eligendi expedita, fugit hic iste labore necessitatibus non
			praesentium reprehenderit soluta sunt tenetur vel!
		</div>
		<div class="donate-buttons">
			<a class="liberapay-btn" href="https://liberapay.com/lw1" target="_blank">
				<svg viewBox="0 0 80 80" height="16" width="16">
					<g transform="translate(-78.37-208.06)" fill="currentColor">
						<path d="m104.28 271.1c-3.571 0-6.373-.466-8.41-1.396-2.037-.93-3.495-2.199-4.375-3.809-.88-1.609-1.308-3.457-1.282-5.544.025-2.086.313-4.311.868-6.675l9.579-40.05 11.69-1.81-10.484 43.44c-.202.905-.314 1.735-.339 2.489-.026.754.113 1.421.415 1.999.302.579.817 1.044 1.546 1.395.729.353 1.747.579 3.055.679l-2.263 9.278"></path>
						<path d="m146.52 246.14c0 3.671-.604 7.03-1.811 10.07-1.207 3.043-2.879 5.669-5.01 7.881-2.138 2.213-4.702 3.935-7.693 5.167-2.992 1.231-6.248 1.848-9.767 1.848-1.71 0-3.42-.151-5.129-.453l-3.394 13.651h-11.162l12.52-52.19c2.01-.603 4.311-1.143 6.901-1.622 2.589-.477 5.393-.716 8.41-.716 2.815 0 5.242.428 7.278 1.282 2.037.855 3.708 2.024 5.02 3.507 1.307 1.484 2.274 3.219 2.904 5.205.627 1.987.942 4.11.942 6.373m-27.378 15.461c.854.202 1.91.302 3.167.302 1.961 0 3.746-.364 5.355-1.094 1.609-.728 2.979-1.747 4.111-3.055 1.131-1.307 2.01-2.877 2.64-4.714.628-1.835.943-3.858.943-6.071 0-2.161-.479-3.998-1.433-5.506-.956-1.508-2.615-2.263-4.978-2.263-1.61 0-3.118.151-4.525.453l-5.28 21.948"></path>
					</g>
				</svg>
				<span>Liberapay</span></a>

			<a class="become-patron-button image"
			   href="https://www.patreon.com/lw1" target="_blank">
				<img src="./assets/become_a_patron_button.png"/>
			</a>
			<a class="bitcoin" href="bitcoin:1FCBExsrK13S8WRRZ9orj4rpHYSvhzMTQr">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="16" width="16">
					<path fill="white"
					      d="M63.0393 39.74098c-4.274 17.143-21.637 27.576-38.782 23.301-17.138-4.274-27.571-21.638-23.295-38.78 4.272-17.145 21.635-27.579 38.775-23.305 17.144 4.274 27.576 21.64 23.302 38.784z"></path>
					<path fill="#f7931a"
					      d="M46.1093 27.44098c.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-.875-1.4 5.616c-.923-.23-1.871-.447-2.813-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.679 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117-.117-.029-.242-.061-.371-.092l-2.296 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.019 4.569 1.139c.85.213 1.683.436 2.503.646l-1.453 5.834 3.507.875 1.439-5.772c.958.26 1.888.5 2.798.726l-1.434 5.745 3.511.875 1.453-5.823c5.987 1.133 10.489.676 12.384-4.739 1.527-4.36-.076-6.875-3.226-8.515 2.294-.529 4.022-2.038 4.483-5.155zm-8.022 11.249c-1.085 4.36-8.426 2.003-10.806 1.412l1.928-7.729c2.38.594 10.012 1.77 8.878 6.317zm1.086-11.312c-.99 3.966-7.1 1.951-9.082 1.457l1.748-7.01c1.982.494 8.365 1.416 7.334 5.553z"></path>
				</svg>
				<span>Bitcoin</span>
			</a>
		</div>
	</header>
</template>

<script>
    export default {
        name: "intro",
        props: ["language"],
    };
</script>

<style lang="scss">
	$liberapay: #f6c915;
	$bitcoin: #f7931a;

	.donate-buttons {
		display: flex;
		align-items: start;
		justify-content: center;
		margin-bottom: 16px;
		a {
			margin: 0 16px;
			height: 48px;
			display: inline-block;
			img, svg {
				border-radius: 5px;
				height: 100%;
				transition: .2s;
			}
			&:hover img {
				filter: brightness(1.3);
			}
			&:not(.image) {
				padding: 4px 6px;
				text-decoration: none;
				transition: .2s;
				border-radius: 4px;
				display: inline-block;
				color: white;
				font-size: 16px;
				font-weight: 700;
			}

			svg, span {
				vertical-align: middle;
			}
		}
		.liberapay-btn {
			background-color: $liberapay;
			&:hover {
				background-color: lighten($liberapay, 10%);
			}
		}
		.bitcoin {
			background-color: $bitcoin;
			&:hover {
				background-color: lighten($bitcoin, 10%);
			}

		}
	}

</style>