# Estudando React book Up & Running
Projeto realizado para aprofundar conhecimento no React através do livro ["Primeiros passos com React"](https://novatec.com.br/livros/primeiros-passos-com-react/) da editora [Novatec](http://www.novatec.com.br).
_Atenção: a versão do React utilizada pelo livro é 0.14.7_

## Marcações!

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

Para sobrescrever um estado inteiro use <code>replaceState()</code>.

### Eventos
A React utiliza _eventos sintéticos_ para encapsular e normalizar os eventos dos navegadores, o que significa que não haverá
inconsistências entre navegadores, isso significa que: <code>event.target.value</code>, <code>event.stopPropagation</code> e
<code>event.preventDefault()</code> funcionará até em IE antigos.

O uso, juntamente com _jsx_ é semelhante a eventos inline tradicionais <code>onClick={}</code> e usa o camelCase em sua escrita.

Se você precisar do evento nativo do browser use: <code>event.nativeEvent</code>

Por uma questão de velocidade a React utiliza a delegação de eventos(que
significa que você ouve eventos em algum nó pai e configura um switch, verificar página 42).

### Virtual DOM

Internamente, a React chama o seu método <code>render()</code> e cria uma representação
de uma árvore leve do DOM resultante desejado, o que é conhecido como *árvore virtual de DOM*.
Quando o método <code>render()</code> é chamado novamente a React calcula a diferença entre a
árvore virtual antes e depois e com base nessa diferença determina as *operações mínimas de DOM necessárias*.

### Use componentes funcionais
Por uma questão de desempenho, se um componente não precisa manter um estado, use uma função para defini-lo. O corpo
da função é o substituto para o seu método <code>render()</code> e seu primeiro argumento é <code>props</code>.

<code>
const Button = props => (<button type={prop.type}>prop.value</button>);
</code>

### Use propriedades estáticas
Se você usa a sintaxe ES6 ou componentes funcionais, *você deve definir qualquer propriedade, por exemplo <code>PropTypes</code>
como estática depois da definição do componente.

<code>
Button.propTypes = {
/*definições*/
}
</code>

### Atributo <code>ref</code>
Usado para vincular elementos do DOM. *Com frequência, usar <code>ref</code> é uma solução de contorno, e pode haver
outras maneiras de fazer o mesmo.

### Fonte única da verdade
Um componente de UI(a React tem tudo a ver com UI) não deve guardar a fonte da verdade.