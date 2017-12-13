#configurando diretorio...
echo "Boilerplate livro react up and running";
date;echo;

echo "***Diretorios***";
echo;

mkdir css
mkdir css/components
mkdir images
mkdir js
mkdir js/source
mkdir js/source/components
mkdir scripts

echo "***Arquivos***";
echo;
touch index.html

#index.html*************************************************************************************************************
echo "index.html";echo;
echo "<!DOCTYPE html>
<html>
    <head>
        <title>Boilerplate App</title>
        <meta charset=\"utf-8\">
        <link rel=\"stylesheet\" type=\"text/css\" href=\"bundle.css\">
    </head>
    <body>
        <div class=\"main\"></div>
        <script src=\"bundle.js\"></script>
    </body>
</html>
" > index.html

#app.js*****************************************************************************************************************
echo "app.js";echo;
echo "'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';

ReactDOM.render(
    <h1>
      <Logo /> Welcome to The App!
    </h1>,
    document.querySelector('.main')
);
" > js/source/app.js

#app.css****************************************************************************************************************
echo "app.css";echo;
echo "html {
    background: white;
    font: 16px Arial;
}
" > css/app.css

#build.sh***************************************************************************************************************
echo "build.sh";echo;

echo "#transformação js
babel --presets react,es2015 js/source -d js/build
#empacotamento js
browserify js/build/app.js -o bundle.js
#empacotamento css
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > bundle.css
#pronto
date; echo;
" > scripts/build.sh

#watch.sh***************************************************************************************************************
echo "watch.sh";echo;
echo "watch \"sh scripts/build.sh\" js/source css" > scripts/watch.sh

#deploy.sh**************************************************************************************************************
echo "deploy.sh";echo;
echo "
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
" > scripts/deploy.sh

#***********************************************************************************************************************
echo "***Downloads***";
echo;
curl -o css/components/Logo.css https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/css/components/Logo.css
#curl -o css/app.css https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/css/app.css
curl -o images/react-logo.svg https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/images/react-logo.svg
curl -o js/source/components/Logo.js https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/js/source/components/Logo.js
#curl -o js/source/app.js https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/js/source/app.js
#curl -o scripts/build.sh https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/scripts/build.sh
#curl -o scripts/watch.sh https://raw.githubusercontent.com/stoyan/reactbook/master/reactbook-boiler/scripts/watch.sh

echo "***NPM Dependências***";
echo;
npm i --save-dev react
npm i --save-dev react-dom
npm i --save-dev babel-preset-react
npm i --save-dev babel-preset-es2015

#npm i --save-dev uglify
#npm i --save-dev cssshrink

echo "***Monta Deploy***";
echo;
sh scripts/deploy.sh

echo "***Inicia Servidor PHP para o deploy***";
echo;
php -S localhost:3000 -t __deployme