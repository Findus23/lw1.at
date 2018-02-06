#!/bin/bash
rsync -rvzP ./dist/ lukas@lw1.at:/var/www/lw1.at/ --fuzzy --delete-after -v
