#!/bin/bash
rsync -rvzP ./dist/ lukas@78.46.212.140:/var/www/lw1.at/ --fuzzy --delete-after -v
