---
components: Link
githubLabel: 'component: Link'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#link'
---

# Links

<p class="description">O componente Link permite que você personalize facilmente elementos de âncora com suas cores de tema e estilos de tipografia.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Links simples

O componente Link é construído sobre o componente [Typography](/api/typography/). Você pode aproveitar suas propriedades.

{{"demo": "pages/components/links/Links.js"}}

Quando você usa `target="_blank"` com Links, é [recomendado](https://developers.google.com/web/tools/lighthouse/audits/noopener) sempre definir `rel="noopener"` ou `rel="noreferrer"` quando conectando a conteúdo de terceiros.

- A propriedade `color="primary"`, pelo fato de que o link precisa se destacar.
- A propriedade `variant="inherit"`, já que o link será na maioria das vezes usado como filho de um componente Typography.

## Sublinhado

A propriedade `underline` pode ser usada para definir o comportamento sublinhado. O padrão é `hover`.

{{"demo": "pages/components/links/UnderlineLink.js"}}

## Segurança

Quando você usa `target="_blank"` com Links, é [recomendado](https://developers.google.com/web/tools/lighthouse/audits/noopener) sempre definir `rel="noopener"` ou `rel="noreferrer"` quando conectando a conteúdo de terceiros.

- `rel="noopener"` impede que a nova página possa acessar a propriedade `window.opener` e garante que ela seja executada em um processo separado. Sem isso, a página de destino pode potencialmente redirecionar sua página para uma URL mal-intencionada.
- `rel="noreferrer"` tem o mesmo efeito, mas também impede que o cabeçalho *Referer* seja enviado para a nova página. ⚠️ A remoção do cabeçalho referrer afetará a análise.

## Biblioteca de roteamento de terceiros

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. O componente `Link` fornece uma propriedade para lidar com este caso: `component`. Here is a [more detailed guide](/guides/routing/#link).

## Acessibilidade

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#link)

- Ao fornecer o conteúdo para o link, evite descrições genéricas como "clique aqui" ou "vá para". Em vez disso, use [descrições específicas](https://developers.google.com/web/tools/lighthouse/audits/descriptive-link-text).
- Para a melhor experiência do usuário, os links devem se destacar do texto na página. For instance, you can keep the default `underline="always"` behavior.
- Se o link não tem um href significativo, [ele deve ser renderizado usando um elemento `<button>`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md).

{{"demo": "pages/components/links/ButtonLink.js"}}
