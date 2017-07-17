#!/bin/bash
rsync -rvzP ~/public_html/vue/dist/ lukas@78.46.212.140:/var/www/lw1.at/ --fuzzy --delete -v
