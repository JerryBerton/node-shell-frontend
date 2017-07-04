#!/bin/bash
echo "Start deployment"
cd ~
echo "Enter the root directory"
cd project/dh-component
echo "Enter the project directory"
git reset --hard origin/master
git clean -f
git pull origin master
git checkout master
echo "Finished."
