Eine der fundamentalsten Fragen in der Astronomie lautet: Wie kam das Wasser auf die Erde? Um der Antwort etwas näher zu kommen, wurden große Simulationen des frühen Sonnensystems durchgeführt. In diesen bewegst sich Wasser durch Kollisionen von Protoplaneten durch das Sonnensystem.
Aber die meisten Simulationen nehmen an, dass immer wenn zwei Planeten mit Wasser kollidieren, diese sofort zu einem neuen Planeten mit dem gesamten Wasser und Gestein werden (*perfect merging assumption*).

Um herauszufinden wie präzise diese Annahme ist, wurden Kollisionen zwischen zwei Himmelskörper mit einem Mantel aus Wassereis in höherer Auflösung simuliert.
In 1375 Simulationsdurchläufen wurden die Parameter der Kollision (Masse, Kollisionswinkel, Einschlagsgeschwindigkeit, usw.) variiert. Nach der Kollision wurde jeweils der Anteil des ursprünglichen Wasser, das auf den zwei massereichsten Fragmenten übrigbleibt, berechnet.

Um den verbleibenden Wasseranteil auf Kollisionen mit beliebigen Parametern verallgemeinern zu können, werden verschiedene Methoden verglichen.
 Zwei lineare Interplolationsmethoden mithilfe der [`scipy`](https://www.scipy.org/) Python Library nehmen die nähesten Werte und versuchen einen Wert dazwischen zu berechnen. Zum Vergleich wurde ein Neuronales Netzwerk mithilfe von Keras und Tensorflow trainiert, welches es ermöglicht den Wasseranteil nach der Kollision vorherzusagen.

Mehr Informationen gibt es im der [Bachelorarbeit (PDF)](https://lw1.at/r/bachelorarbeit-pdf) und der Programmcode ist [im git Repository](https://git.lw1.at/lw1/bachelorarbeit-code) zu finden.
