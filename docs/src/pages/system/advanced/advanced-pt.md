# Avançado

<p class="description">Aqui você pode encontrar exemplos de como você pode usar o sistema em seus componentes customizados.</p>

## Adicionando a propriedade `sx` para seus componentes customizados

The `unstable_styleFunctionSx` utility adds the support for the [`sx` prop](/system/basics/#the-sx-prop) to your own components. Normally you would use the `Box` component from `@material-ui/core` at the root of your component tree. If you would like to use the system independently from Material-UI, the `unstable_styleFunctionSx` utility will give you the same capabilities, while having a smaller bundle size.

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

## Usando utilitários de sistema autônomo

Se você precisar apenas de alguns elementos do sistema em seus componentes customizados, você pode usar diretamente e combinar as diferentes funções de estilo disponíveis, e acessá-las como propriedades de componente. You might use this approach if you need smaller bundle size and better performance than using Box, for the price of using a subset of what the [`sx` prop](/system/basics/#the-sx-prop) supports, and a different API.

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js", "defaultCodeOpen": true}}
