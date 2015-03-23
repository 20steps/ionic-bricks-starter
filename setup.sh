#!/usr/bin/env bash

echo "Completing setup of Bricks based ionic app ..."
INSTALL_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd );
cd $INSTALL_DIR/..;

echo "Updating index.html ..."
cp skeleton/index.html www/index.html

echo "Updating bower.json ..."
mv -f www/bower.json bower.json

echo "Updating dependencies for bower ..."
bower update

echo "Installing dependencies for gulp ..."
npm install gulp gulp-util gulp-uglify gulp-minify-css gulp-rename gulp-concat gulp-sass bower shelljs

echo "Adding iOS and Android platform ..."
ionic platform add ios
ionic platform add android
ionic browser add crosswalk

echo "Initializing git repository ..."
git init
cp skeleton/.gitignore .

echo "Cleaning up ..."
rm -f www/setup.sh
rm -rf skeleton

echo "Commiting initial state ..."
git add .
git commit -am "Initial commit"

echo "Starting iOS simulator with livereload ...";
ionic run ios --livereload
