>Have you ever asked if there are always the same songs playing on the radio?  
>There is just one way to find it out: Creating statistics!

This python script parses the current songs of all ORF radio channels, saves it to a database
and provides a [JSON API](https://radiostats.lw1.at/api/oe3?date=2018-02-10&dateType=week) which lists
the most played songs.

A Vue single page application then displays this data and lets one select a time range.
