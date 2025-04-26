One of the most fundamental questions in Astronomy is: How did water get on the Earth? To get a bit closer to the answer large simulations of early solar systems have been conducted. In these water is transferred in the solar system via collisions of protoplanets.
But most of these simulations assume that whenever two planets with water collide they instantly merge into a perfect new planet with the total water and rock mass (*perfect merging assumption*).

To find out how precise this is collisions between two bodies with mantle made of water ice have been simulated in higher resolutions.
In 1375 simulation runs the parameters of the collisions (masses, impact angle, collision velocity, etc.) have been variied. After the collision, the fraction of the initial water that remains on the two largest fragments was calculated.

To generalize how much water remains in a collision with arbitrary collision parameters, multiple interpolation methods are compared.
Two linear interpolation methods using the [`scipy`](https://www.scipy.org/) Python library take the closest values and try to estimate an intermediate value. For comparison a simple Neural Network was trained using Keras and Tensorflow to predict the water fraction.

You can find more details in the [thesis (PDF)](https://lw1.at/r/bachelorarbeit-pdf) and the code in the [git repository](https://github.com/Findus23/collision-analysis-and-interpolation).
