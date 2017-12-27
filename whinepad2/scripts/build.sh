#transformação js
babel --presets react,es2015 js/source -d js/build
#empacotamento js
browserify js/build/app.js -o bundle.js
browserify js/build/discover.js -o discover-bundle.js
#empacotamento css
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
#pronto
date; echo;

