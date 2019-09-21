<template>
	<header class="intro">
		<h1>Lukas Winkler</h1>
		<div class="introduction" v-if="language==='de'">
			Hallo,<br>
			ich bin ein Astronomiestudent aus Niederösterreich und ein Fan von Open Source Software.<br>
			Im meiner Freizeit schreibe ich mehr oder weniger nützliche Programme und Webseiten und arbeite bei <a
				href="https://matomo.org/">Matomo</a> mit.
		</div>
		<div class="introduction" v-else>
			Hi,<br>
			I am an astronomy student from Lower Austria and an Open Source fan.<br>
			When I have time for it, I write more or less useful programs and websites and contribute to <a
				href="https://matomo.org/" class="texttt">Matomo</a>.
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
	@import "variables";
	$liberapay: #f6c915;
	$bitcoin: #f7931a;
	$flattr: #595959;

	.donate-buttons {
		display: flex;
		align-items: flex-start;
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
		font-family: $consoleFont;
		color: black !important;
		div {
			font-size: 24px;
			line-height: 28px;
		}
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
