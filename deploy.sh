#!/bin/bash

WEB_PATH='/root/tools/'$1
WEB_USER='root'
WEB_USERGROUP='root'

echo "Start deployment"
cd ~
echo "Enter the root directory"
cd jerryberton
echo "Enter the project directory"
git reset --hard origin/master
git clean -f
git pull origin master
git checkout master
echo "Finished."
