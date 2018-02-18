<template>
	<header class="intro">
		<h1>Lukas Winkler</h1>
		<div class="introduction" v-if="language==='de'">
			Hallo,<br>
			ich bin ein Astronomiestudent aus Niederösterreich und ein Fan von Open Source Software.<br>
			Im meiner Freizeit schreibe ich mehr oder wenigern nützliche Programme und Webseiten und helfe bei der
			Entwicklung von <a href="https://piwik.org/">Piwik</a>.
		</div>
		<div class="introduction" v-else>
			Hi,<br>
			I am an astronomy student from Lower Austria and an Open Source fan.<br>
			When I have time for it, I write more or less useful programs and websites and help with developing <a
				href="https://piwik.org/">Piwik</a>.
		</div>
		<div class="donate-buttons">
			<a class="liberapay-btn" href="https://liberapay.com/lw1" target="_blank">
				<svg viewBox="0 0 80 80" height="12" width="12">
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
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="12" width="12">
					<path fill="white"
					      d="M63.0393 39.74098c-4.274 17.143-21.637 27.576-38.782 23.301-17.138-4.274-27.571-21.638-23.295-38.78 4.272-17.145 21.635-27.579 38.775-23.305 17.144 4.274 27.576 21.64 23.302 38.784z"></path>
					<path fill="#f7931a"
					      d="M46.1093 27.44098c.637-4.258-2.605-6.547-7.038-8.074l1.438-5.768-3.511-.875-1.4 5.616c-.923-.23-1.871-.447-2.813-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.679 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117-.117-.029-.242-.061-.371-.092l-2.296 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.019 4.569 1.139c.85.213 1.683.436 2.503.646l-1.453 5.834 3.507.875 1.439-5.772c.958.26 1.888.5 2.798.726l-1.434 5.745 3.511.875 1.453-5.823c5.987 1.133 10.489.676 12.384-4.739 1.527-4.36-.076-6.875-3.226-8.515 2.294-.529 4.022-2.038 4.483-5.155zm-8.022 11.249c-1.085 4.36-8.426 2.003-10.806 1.412l1.928-7.729c2.38.594 10.012 1.77 8.878 6.317zm1.086-11.312c-.99 3.966-7.1 1.951-9.082 1.457l1.748-7.01c1.982.494 8.365 1.416 7.334 5.553z"></path>
				</svg>
				<span>Bitcoin</span>
			</a>
			<a class="flattr" href="https://flattr.com/@lw1.at" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1901 500" class="site-logo">
					<title>flattr</title>
					<path d="M39.7 250C39.7 134 134 39.7 250 39.7h113.6l-60.9 61 28 28L456.3 0H250A250 250 0 0 0 0 250v194.4l39.8-36.6v-2V250zM500 55.6l-39.8 36.6V250c0 116-94.3 210.3-210.2 210.3H136.3l61-61-28-28L43.7 500H250a250 250 0 0 0 250-250zM731.5 69.3h198.3v33.2H768.5V244h138.3v33.2H768.5v168.9h-37zM993.6 69.3h36.5v305c0 35.4 16 40.7 30 40.7a83.2 83.2 0 0 0 9-.5v32.7a92.2 92.2 0 0 1-13.4 1c-22.5 0-62.1-7-62.1-65.9zM1271.8 279.4h15v-7c0-52-28.4-69.7-67-69.7-44.5 0-76.1 25.7-76.1 25.7l-17.2-27.9s35.4-30.5 96-30.5c64.8 0 100.8 36 100.8 103.5V446h-34.9v-29.5a213 213 0 0 1 1.1-22.5h-1s-22.6 58.4-90 58.4c-45 0-91.7-26.3-91.7-79.9 0-91.1 118.4-93.2 165-93.2zm-67.5 142c51.4 0 82.5-53.6 82.5-100.3v-11.8h-15.5c-42.4 0-127.1 1.7-127.1 61.1 0 25.3 19.9 51 60 51zM1416 210.2h-35.4v-30.5h36V102h35.8v77.7h67.6v30.6h-67.5v134c0 63.2 40.2 71.3 60.5 71.3a62.7 62.7 0 0 0 12.4-1.1v32.7a95.9 95.9 0 0 1-15.6 1c-31 0-93.8-10.1-93.8-100.2zM1595.6 210.2h-35.4v-30.5h35.9V102h35.9v77.7h67.5v30.6H1632v134c0 63.2 40.2 71.3 60.6 71.3a62.7 62.7 0 0 0 12.3-1.1v32.7a95.9 95.9 0 0 1-15.6 1c-31 0-93.8-10.1-93.8-100.2zM1765 176.5h35.9v47.7c0 11.8-1.1 21.4-1.1 21.4h1c12.9-40.7 43-71.8 85.3-71.8a73 73 0 0 1 14.5 1.6v36a92.3 92.3 0 0 0-13.4-1.2c-38.1 0-66.5 30-78.3 69.7a178 178 0 0 0-7.5 52.6V446H1765z"></path>
				</svg>
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
	$flattr: #595959;

	.donate-buttons {
		display: flex;
		align-items: start;
		justify-content: center;
		margin-bottom: 16px;
		a {
			margin: 0 16px;
			height: 32px;
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
				font-size: 12px;
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
		.flattr {
			background-color: $flattr;
			&:hover {
				background-color: lighten($flattr, 10%);
			}
			svg {
				fill: white;
				height: 15px;
				margin-top: 2px;
			}
		}
	}

	.introduction {
		text-align: left;
		margin-bottom: 10px;
		padding: 0 10px;
	}

	h1 {
		font-weight: 300;
		color: black !important;
	}

	@media screen and (max-width: 480px) {
		h1 {
			text-align: left;
			padding: 0 10px;

		}
		.languageSelector {
			right: 10px;
		}
	}
</style>
