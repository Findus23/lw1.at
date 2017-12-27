<template>
	<div id="imprint">
		<div class="backButton">
			<router-link :to="{ name: 'Overview', params: { language: language }}">
				{{language==="de" ? "Zurück zur Hauptseite":"Back to the main page"}}
			</router-link>

		</div>
		<div class="languageSelector">
			<router-link :to="{ name: (language==='de' ? 'Imprint':'Impressum')}" rel="alternate"
			             :hreflang="language==='de' ? 'en':'de'">
				{{language==="de" ? "English":"Deutsch"}}
			</router-link>
		</div>
		<h1 v-if="language==='de'">Impressum</h1>
		<h1 v-else>Imprint</h1>
		<h2 v-if="language==='de'">Für den Inhalt verantwortlich</h2>
		<h2 v-else>Responsible for the content</h2>
		<address>
			Lukas Winkler<br>
			Sandgrube 13/1<br>
			3500 Krems an der Donau<br>
			Österreich
		</address>
		<!--
				<h2>Urheberrecht und Haftung für Inhalte/Links</h2>
				<p>
					Die Inhalte der Seiten sind vom Autor der Webseite erstellt und unterliegen dem österreichischen
					Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung bedürfen der
					schriftlichen Zustimmung des Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten,
					nicht kommerziellen Gebrauch gestattet bzw. bedürfen der Rücksprache.
					Die Inhalte unserer Seiten wurden mit großer Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
					und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
					Der Webauftritt enthält Links zu externen Webseiten, deren Inhalte wir nicht beeinflussen können.
					Aus diesem Grund kann keinerlei Haftung für diese fremden Inhalte übernommen werden.
				</p>
		-->
		<h2 v-if="language==='de'">Datenschutz</h2>
		<h2 v-else>Privacy Policy</h2>
		<p v-if="language==='de'">
			Wie die meisten Webseiten sammelt lw1.at anonym Informationen, die der Webbrowser oder Server zur
			Verfügung stellt, wie zum Beispiel die Art des Browsers, bevorzugte Sprachen, verweisende Webseite
			und Zeitpunkt des Besuches. Diese Daten, durch welche die Besucher nicht eindeutig identifiziert
			werden können, werden gesammelt, um besser zu verstehen, wie die Webseite benutzt wird. Hierzu wird
			die Open-Source-Software <a href="https://piwik.org">Piwik</a> verwendet, wobei keine Daten an andere Firmen
			oder Server
			weitergegeben oder verkauft werden.
		</p>
		<p v-else>
			Like most website operators, gattinger-wachau.at collects non-personally-identifying information of the sort
			that web browsers and servers typically make available, such as the browser type, language preference,
			referring site, and the date and time of each visitor request. The purpose in collecting non-personally
			identifying information is to better understand how the visitors use the website. We are using the
			Open-Source-Software <a href="https://piwik.org">Piwik</a> in order that no data is forwarded or sold to
			other servers or companies.
		</p>
		<p v-if="language==='de'">
			Daten, welche Besucher eindeutig identifizieren könnten, werden ausschließlich in gekürzter Form
			abgespeichert, wodurch sie nicht mehr eindeutig zugeordnet werden können. So werden von IP-Adressen
			nur die ersten beiden Tupel (z. B. 194.118.xxx.xxx) gespeichert und verarbeitet. Wenn Sie verhindern
			möchten, dass Daten über Sie gesammelt werden, können Sie es am Ende dieser Seite deaktivieren oder
			<em><a href="http://donottrack.us/">Do-Not-Track</a></em> in Ihrem Browser aktivieren.
		</p>
		<p v-else>
			Personally-identifying information like Internet Protocol (IP) addresses, are only collected in its
			shortened form (e.g. 194.118.xxx.xxx), with the result that it is not possible to identify visitors
			personally.
			If want to disable this tracking, you can enable <a href="http://donottrack.us/">"Do-Not-Track"</a>
			in your Browser or disable it below.
		</p>
		<p v-if="language==='de'">
			Cookies sind kleine Textdateien, die vom Browser zwischenzeitlich gespeichert werden und bei jedem
			Besuch an den Server gesendet werden. Sie dienen dazu den Besuch von einzelnen Unterseiten
			nachvollziehen zu können und sich Einstellungen zwischen Besuchen zu merken Wenn Sie nicht möchten,
			dass Cookies gespeichert werden, können Sie dies in Ihrem Browser deaktivieren.
		</p>
		<p v-else>
			A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s
			browser provides to the website each time the visitor returns. We use cookies to help Piwik identify and
			track visitors, their usage of the website, and their website access preferences. Visitors who do not wish
			to have cookies placed on their computers should set their browsers to refuse cookies before using our
			websites, with the drawback that certain features may not function properly without the aid of cookies.
		</p>
		<h2>Tracking Opt-Out</h2>
		<iframe :src="'https://piwik.lw1.at/index.php?module=CoreAdminHome&amp;action=optOut&amp;idsite=14&amp;language='+language"></iframe>
	</div>
</template>

<script>
    export default {
        name: "imprint",
        props: ["language"],
        mounted() {
            document.title = (this.language === "de" ? "Impressum" : "Imprint") + " - lw1.at";
        }
    };
</script>

<style lang="scss">
	#imprint {
		p, address {
			text-align: left;
		}
		h2 {
			font-size: 3rem;
		}
		.backButton {
			position: absolute;
			top: 20px;
			left: 20px;
		}
	}
</style>