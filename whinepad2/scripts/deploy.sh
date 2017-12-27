
#limpa ultima versao
rm -rf __deployme
mkdir __deployme

#construcao
sh scripts/build.sh

#minificacao.js
uglify -s bundle.js -o __deployme/bundle.js

#minificacao css
cssshrink bundle.css > __deployme/bundle.css

#copia HTML e imagens
cp index.html __deployme/index.html
cp -r images/ __deployme/images/

#pronto
date; echo;

