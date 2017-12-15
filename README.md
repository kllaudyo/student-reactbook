# Estudando React book Up & Running
Projeto realizado para aprofundar conhecimento no React através do livro ["Primeiros passos com React"](https://novatec.com.br/livros/primeiros-passos-com-react/) da editora [Novatec](http://www.novatec.com.br).
_Atenção: a versão do React utilizada pelo livro é 0.14.7_

## Meus destaques do livro

### React.DOM x ReactDOM

Perceba a diferença entre React.DOM e ReactDOM.
<code>
    React.DOM.*;
    ReactDOM.render();
</code>
O Primeiro é uma coleção de elementos HTML prontos, e o segundo é uma maneira de renderizar a aplicação no navegador.

### Atributos Especiais DOM
Alguns atributos especiais do DOM dos quais você deve estar ciente são: <code>class</code>, <code>for</code> e 
<code>style</code>. Você não pode usar <code>class</code> e <code>for</code> porque elas são palavras reservadas em 
JavaScript. Use <code>className</code> e <code>htmlFor</code>.

Jà o atributo <code>style</code> não pode ser uma string e sim um objeto javascript.

### Estado
As atualizações de UI após as chamada a <code>setState()</code> são feitas usando um sistema de filas que reúne as 
alterações em lote de modo eficiente, portanto atualizar <code>this.state</code> diretamente pode resultar em um 
comportamento inesperado, e você não deve fazer isso. Assim como no caso de <code>this.props</code>, considere o objeto 
<code>this.state</code> como somente leitura, não só porque do ponto de vista semântico não é uma boa ideia atualizá-lo 
diretamente, como também porque ele pode agir de modo inesperado.
De modo semelhante, jamais chame <code>this.render()</code> por conta própria, em vez disso, deixe a React reunir 
as alterações em lote, determinar a quantidade mínima de mudanças e chamar <code>render()</code> quando e se for 
apropriado.

A React atualiza a UI quando <code>setState()</code> é chamado. Esse é o cenário mais comum, mas há um ponto de escape 
... Você pode evitar que a UI seja atualizada devolvendo <code>false</code> em um método especial do "ciclo de vida" chamado 
<code>shouldComponentUpdate()</code>.