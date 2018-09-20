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
		<div v-if="language==='de'" class="mainText">
			<h2>Datenschutzerklärung</h2>
			<h3>Geltungsbereich</h3>
			<p>Diese Datenschutzerklärung gilt für <code>lw1.at</code>, alle <code>*.lw1.at</code> Subdomains und die
				<a href="https://play.google.com/store/apps/details?id=at.lw1.kurzparkzonen.wien">
					Kurzparkzonen Wien App
				</a>
				.
			</p>
			<h3>Zweck der Datenverarbeitung</h3>
			<p>Diese Webseite verwendet <a href="https://matomo.org/">Matomo</a>, eine Open Source, selbstgehostete
				Software um
				anonyme Nutzungsdaten für diese Webseite zu sammeln.</p>
			<p>Die Daten zum Verhalten der Besucher werden gesammelt um eventuelle Probleme wie nicht gefundene Seiten,
				Suchmaschinenprobleme oder unbeliebte Seiten herauszufinden. Sobald die Daten (Anzahl der Besucher die
				Fehlerseiten oder nur eine Seite sehen, usw.) verarbeitet werden, erzeugt Matomo Berichte für die
				Webseitenbetreiber, damit diese darauf reagieren können. (Layoutveränderungen, neue Inhalte, usw.)</p>
			<h3>Matomo</h3>
			<p>Matomo verarbeitet die folgenden Daten:</p>
			<ul>
				<li>Cookies</li>
				<li>Anonymisierte IP-Adressen indem die letzten 2&nbsp;bytes entfernt werden (also 198.51.0.0&nbsp;anstatt
					198.51.100.54)
				</li>
				<li>Pseudoanonymisierter Standort (basierend auf der anonymisierten IP-Adresse</li>
				<li>Datum und Uhrzeit</li>
				<li>Titel der aufgerufenen Seite</li>
				<li>URL der aufgerufenen Seite</li>
				<li>URL der vorhergehenden Seite (sofern diese das erlaubt)</li>
				<li>Bildschirmauflösung</li>
				<li>Lokale Zeit</li>
				<li>Dateien die angeklickt und heruntergeladen wurden</li>
				<li>Externe Links</li>
				<li>Dauer des Seitenaufbaus</li>
				<li>Land, Region, Stadt (mit niedriger Genauigkeit aufgrund von IP-Adresse)</li>
				<li>Hauptsprache des Browsers</li>
				<li>User Agent des Browsers</li>
				<li>Interaktionen mit Formularen (aber nicht deren Inhalt)</li>
				<li>Mausbewegungen, Klicks und Scrollen</li>
			</ul>
			<h3>Sentry</h3>
			<p>
				<a href="https://sentry.io/">Sentry</a> ist ein Open Source System zum Protokollierung von
				Software-Fehlern.
				Wenn ein Programmfehler auftritt, wird dieser anonymisiert an <code>sentry.lw1.at</code> gesendet. Die
				Daten werden nicht mit Dritten geteit und nach Behebung des Problems gelöscht.
			</p>
			<h3>Indirekte Datensammlung</h3>
			<h4>Server Logs</h4>
			<p>Wenn Sie diese Webseite verwenden, wird der Aufruf vom Host der Webseite (ich, Lukas Winkler)
				aufgezeichnet. Dieses
				Log enthält Ihre IP-Adresse, welche Sie indirekt über Ihren Internetanbieter identifiziert. Die
				Aufzeichnung
				dieser Daten ist gesetzlich verpflichtend und für die Sicherheit notwendig. Es gibt keine Möglichkeit
				zum
				Opt-Out, die Daten werden aber niemals für andere Zwecke verwendet.</p>
			<h3>Basis des Legitimen Interesses</h3>
			<p>Die Datenverarbeitung basiert auf dem Prinzip des legitimen Interesses.</p>
			<p>Verarbeiten der Daten hilft uns herauszufinden, was auf unserer Seite funktioniert und was nicht. Zum
				Beispiel
				finden wir damit heraus, ob die Inhalte gut ankommen oder wie wir die Struktur der Webseite verbessern
				können.
				Unser Team profitiert davon und kann darauf reagieren. Aufgrund der Datenverarbeitung profitieren Sie
				somit von
				einer Webseite, die laufend besser wird.</p>
			<p>Ohne den Daten könnten wir den Service nicht bieten. Ihre Daten werden ausschließlich zum Verbessern der
				Webseitennutzung verwendet.</p>
			<h3>Empfänger der Daten</h3>
			<p>Die persönlichen Daten werden gesendet an:</p>
			<ul>
				<li>mich, Lukas Winkler (Host und Betreuer der Webseite, des Matomo und Sentry Servers)</li>
				<li>Hetzner Online GmbH (Host des Servers; <a href="https://www.hetzner.de/rechtliches/datenschutz/">Datenschutzerklärung</a>)
				</li>
			</ul>
			<h3>Details zum Transfer in Drittstaaten</h3>
			<p>Die Daten dieser Webseite, Matomo und Sentry werden in Deutschland (Falkenstein) gehostet. Die Daten
				verlassen nie die EU.</p>
			<h3>Rechte der betroffenen Personen</h3>
			<p>Da Matomo Daten basierend auf legitimen Interesse sammelt, können Sie folgende Rechte ausüben:</p>
			<ul>
				<li><strong>Recht auf Auskunft und Datenübertragbarkeit</strong>: Sie können jederzeit alle Ihre Daten
					anfordern.
				</li>
				<li><strong>Recht auf Löschung und Berichtigung</strong>: Sie können jederzeit anfragen, dass wir alle
					Ihre
					Daten vollständig löschen.
				</li>
				<li><strong>Recht auf Widerspruch und Einschränkung der Verarbeitung</strong>: Sie können jederzeit der
					Datensammlung widersprechen, indem Sie in Ihrem Browser <a
							href="https://www.eff.org/issues/do-not-track">DoNotTrack</a>
					oder diese Box abhaken:
				</li>
			</ul>
			<iframe src="https://piwik.lw1.at/index.php?module=CoreAdminHome&amp;action=optOut&amp;idsite=14&amp;language=de"></iframe>
			<h3>Das Recht eine Beschwerde bei der Datenschutzbehörde einbringen</h3>
			<p>Wenn Sie denken, dass die Art, wie wir Ihre Daten mit Matomo verarbeiten, gegen das Gesetz verstößt,
				haben Sie
				das Recht eine Beschwerde bei der Datenschutzbehörde einzubringen.</p>
			<h2>Lizenz</h2>
			<p>Diese Datenschutzerklärung basiert auf der Datenschutzerklärung des <a
					href="https://matomo.org/privacy-policy/">Matomo
				Projekts</a> und steht unter einer <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative
				Commons Lizenz</a>. Sie können Sie also selbst verändern und weiterverwenden.</p>

		</div>
		<div v-else class="mainText">
			<h2>Privacy Policy</h2>
			<h3>Scope</h3>
			<p>This Privacy Policy is valid for <code>lw1.at</code>, all <code>*.lw1.at</code> subdomains and the 
				<a href="https://play.google.com/store/apps/details?id=at.lw1.kurzparkzonen.wien">
					Kurzparkzonen Wien App
				</a>
				.
			</p>

			<h3>Purpose of the processing</h3>
			<p>This website is using <a href="https://matomo.org/">Matomo</a>, an Open Source, self-hosted software for
				collecting anonymous usage statistics for this website.</p>
			<p>The data is used to analyse the behaviour of the website visitors to identify potential pitfalls like not
				found
				pages, search engine indexing issues and to find out which contents are the most appreciated. Once the
				data
				(number of visitors reaching a not found pages, viewing only one page…) is processed, Matomo is
				generating
				reports for website owners to take action, for example changing the layout of the pages, publishing some
				fresh
				content… etc.</p>
			<h3>Matomo</h3>
			<p>Matomo is processing the following data:</p>
			<ul>
				<li>
					Cookies
				</li>
				<li>
					Anonymized IP-address by removing the last 2 bytes (so 198.51.0.0 instead of 198.51.100.54)
				</li>
				<li>
					Pseudo-anonymized Location of the user (generated from the anonymized IP-address)
				</li>
				<li>
					Date and time
				</li>
				<li>
					Title of the page being viewed
				</li>
				<li>
					URL of the page being viewed
				</li>
				<li>
					URL of the page that was viewed prior to the current page (if the page allows it)
				</li>
				<li>
					Screen resolution
				</li>
				<li>
					Time in local timezone
				</li>
				<li>
					Files that were clicked and downloaded
				</li>
				<li>
					Link clicks to an outside domain
				</li>
				<li>
					Pages generation time
				</li>
				<li>
					Country, region, city (low resolution based on IP-address
				</li>
				<li>
					Main Language of the browser
				</li>
				<li>
					User Agent of the browser
				</li>
				<li>
					Interactions with forms (but not the content)
				</li>
				<li>
					Mouse movements, clicks, and scrolls
				</li>
			</ul>
			<h3>Sentry</h3>
			<p>
				<a href="https://sentry.io/">Sentry</a> is an Open Source system for application monitoring and error reporting.
				When an application error happens, it will be sent anonymized to <code>sentry.lw1.at</code>
				Wenn ein Programmfehler auftritt, wird dieser anonymisiert an <code>sentry.lw1.at</code> gesendet. Die
				Daten werden nicht mit Dritten geteit und nach Behebung des Problems gelöscht.
			</p>
			<h3>Indirect data collection</h3>
			<h4>Server Logs</h4>
			<p>If you are using this site, the visit is logged by the host of this website (myself, Lukas Winkler). This
				log contains your IP-Address which allows you to be identified indirectly via your internet servrive
				provider.
				The collection of this data is a legal obligation and required for security. You cannot oppose it and
				the data
				is at no time used for other purposes.</p>

			<h3>The legitimate interests</h3>
			<p>The processing of personal data is based on legitimate interests.</p>
			<p>Processing your personal data such as cookies is helping us identify what is working and what is not on
				our
				website. For example, it helps us identify if the way we are communicating is engaging or not and how we
				can
				organize the structure of the website better. Our team is benefiting from the processing of your
				personal data,
				and they are directly acting on the website. By processing your personal data, you can profit from a
				website
				which is getting better and better.</p>
			<p>Without the data, we would not be able to provide you the service we are currently offering to you. Your
				data
				will be used only to improve the user experience on our website and help you find the information you
				are
				looking for.</p>

			<h3>Recipient of the data</h3>
			<p>The personal data received through Matomo are sent to:</p>
			<ul>
				<li>me, Lukas Winkler (host and maintainer of this website and Matomo and Sentry instance)</li>
				<li>
					Hetzner Online GmbH (host of the server;
					<a href="https://www.hetzner.de/rechtliches/datenschutz/">Privacy Policy</a>)
				</li>
			</ul>
			<h3>Details of transfers to third country and safeguards</h3>
			<p>Matomo and this website data is hosted in Germany (Falkenstein). No data leaves the EU.</p>
			<h3>Data subject’s rights</h3>
			<p>As Matomo is processing personal data on legitimate interests, you can exercise the following rights:</p>
			<ul>
				<li>
					<strong>Right of access and data portability</strong>: you can ask us at any time to access your
					data.
				</li>
				<li>
					<strong>Right to erasure and rectification</strong>: you can ask us at any time to delete all the
					data we
					are processing about you.
				</li>
				<li>
					<strong>Right to object and restrict processing</strong>: you can object to the tracking of your
					data by
					using the following opt-out feature or by enabling <a
						href="https://www.eff.org/issues/do-not-track">DoNotTrack</a>
					in your browser:
				</li>
			</ul>
			<iframe src="https://piwik.lw1.at/index.php?module=CoreAdminHome&amp;action=optOut&amp;idsite=14&amp;language=en"></iframe>
			<h3>The right to lodge a complaint with a supervisory authority</h3>
			<p>If you think that the way we process your personal data with Matomo analytics is infringing the law, you
				have the
				right to lodge a complaint with a supervisory authority.</p>
			<h2>License</h2>
			<p>This privacy policy is based on the privacy policy of <a href="https://matomo.org/privacy-policy/">the
				Matomo
				project</a> and licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative
				Commons</a>, so you can modify it and use it yourself.</p>
		</div>
	</div>
</template>

<script>
    export default {
        name: "imprint",
        props: ["language"]
    };
</script>

<style lang="scss">
	#imprint {
		.mainText {
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
