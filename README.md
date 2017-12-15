# Estudando React book Up & Running
Projeto realizado para aprofundar conhecimento no React através do livro ["Primeiros passos com React"](https://novatec.com.br/livros/primeiros-passos-com-react/) da editora [Novatec](http://www.novatec.com.br).
_Atenção: a versão do React utilizada pelo livro é 0.14.7_

## Destaque

### React.DOM x ReactDOM

Perceba a diferença entre React.DOM e ReactDOM.
<code>
    React.DOM.*;
    ReactDOM.render();
</code>
O Primeiro é uma coleção de elementos HTML prontos, e o segundo é uma maneira de renderizar a aplicação no navegador.

### Atributos Especiais DOM
Alguns atributos especiais do DOM dos quais você deve estar ciente são: class, for e style.
Você não pode usar class e for porque elas são palavras reservadas em JavaScript. Use className e htmlFor.

Jà o atributo style não pode ser uma string e sim um objeto javascript.

### Estado
As atualizações de UI após as chamada a setState() são feitas usando um sistema de filas que reúne as alterações em lote 
de modo eficiente, portanto atualizar this.state diretamente pode resultar em um comportamento inesperado, e você não 
deve fazer isso. Assim como no caso de this.props, considere o objeto this.state como somente leitura, não só porque do
ponto de vista semântico não é uma boa ideia atualizá-lo diretamente, como também porque ele pode agir de modo inesperado.
De modo semelhante, jamais chame this.render() por conta própria, em vez disso, deixe a React reunir as alterações em 
lote, determinar a quantidade mínima de mudanças e chamar render() quando e se for apropriado.

A React atualiza a UI quando setState() é chamado. Esse é o cenário mais comum, mas há um ponto de escape ... Você pode
evitar que a UI seja atualizada devolvendo false em um método especial do ciclo de vida chamado shouldComponentUpdate()