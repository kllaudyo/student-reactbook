#transpilação js
babel --presets react,es2015 js/source -d js/build
#empacotamento js
browserify js/build/app.js -o bundle.js
#empacotamento css
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
#feito em:
#date; echo;