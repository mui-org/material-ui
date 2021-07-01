---
title: Componente Diálogo para React
components: Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
githubLabel: 'component: Dialog'
materialDesign: https://material.io/components/dialogs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
---

# Diálogo

<p class="description">Diálogos informam aos usuários sobre uma tarefa e podem conter informações críticas, exigir decisões ou envolver várias tarefas.</p>

Um Diálogo é um tipo de janela [modal](/components/modal/) que aparece na frente do conteúdo do aplicativo para fornecer informações críticas ou solicitar uma decisão. As caixas de diálogo desativam toda a funcionalidade do aplicativo quando elas são exibidas e permanecem na tela até que sejam confirmadas, rejeitadas ou que uma ação necessária tenha sido executada.

Os diálogos são intencionalmente interruptivos, então eles devem ser usados com moderação.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Diálogo simples

Diálogos simples podem fornecer detalhes adicionais ou ações sobre um item da lista. Por exemplo, eles podem exibir avatares, ícones, esclarecer subtexto ou ações ortogonais (como adicionar uma conta).

Mecanismo de toque:

- Escolhendo uma opção irá imediatamente confirmar a opção e fechar o menu
- Tocando para sair do diálogo ou pressionando a opção de voltar irá cancelar a ação e fechar o diálogo

{{"demo": "pages/components/dialogs/SimpleDialog.js"}}

## Alertas

Alertas são interrupções urgentes, exigindo confirmação de que o usuário esteja ciente da situação.

A maioria dos alertas não precisam de títulos. Eles resumem uma decisão em uma sentença ou duas:

- Fazendo uma pergunta (Exemplo: "Apagar esta conversa?")
- Fazendo uma declaração relacionada aos botões de ação

Use alertas com barra de título apenas para situações de alto risco, como a potencial perda de conectividade. Os usuários devem entender as escolhas com base apenas no título e no texto do botão.

Se um título é necessário:

- Use uma pergunta ou declaração clara com uma explicação na área de conteúdo, como "Apagar dados do USB?".
- Evite desculpas, ambiguidade ou sentenças como "Aviso!" ou "Você tem certeza?"

{{"demo": "pages/components/dialogs/AlertDialog.js"}}

## Transições

Você também pode trocar a transição, o próximo exemplo utiliza `Slide`.

{{"demo": "pages/components/dialogs/AlertDialogSlide.js"}}

## Formulário de diálogo

Os formulários de diálogo permitem que usuários preencham campos dentro de um diálogo. Por exemplo, se seu site solicita aos inscritos que preencham um endereço de e-mail, eles poderão preencher o campo de e-mail e tocar em "Enviar".

{{"demo": "pages/components/dialogs/FormDialog.js"}}

## Diálogos customizados

Aqui está um exemplo de customização do componente. Você pode aprender mais sobre isso na [página de documentação de sobrescritas](/customization/how-to-customize/).

O diálogo tem um botão de fechar para facilitar a utilização.

{{"demo": "pages/components/dialogs/CustomizedDialogs.js"}}

## Diálogos em tela cheia

{{"demo": "pages/components/dialogs/FullScreenDialog.js"}}

## Tamanhos opcionais

Você pode definir uma largura máxima usando um enumerador na propriedade `maxWidth` combinando com a propriedade booleana `fullWidth`. Quando a propriedade `fullWidth` for verdadeira, a caixa de diálogo será adaptada com base no valor definido em `maxWidth`.

{{"demo": "pages/components/dialogs/MaxWidthDialog.js"}}

## Tela cheia responsiva

Você pode fazer um diálogo totalmente responsivo usando [`useMediaQuery`](/components/use-media-query/#usemediaquery).

```jsx
import useMediaQuery from '@material-ui/core/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return <Dialog fullScreen={fullScreen} />
}
```

{{"demo": "pages/components/dialogs/ResponsiveDialog.js"}}

## Diálogos de confirmação

Os diálogos de confirmação exigem que os usuários confirmem explicitamente suas escolhas antes que uma opção seja confirmada. Por exemplo, os usuários podem ouvir vários toques, mas apenas fazer uma seleção final ao tocar em "OK".

Tocar em "Cancelar" em um diálogo de confirmação ou pressionar Voltar, cancela a ação, descarta todas as alterações e fecha o diálogo.

{{"demo": "pages/components/dialogs/ConfirmationDialog.js"}}

## Diálogo arrastável

Você pode criar um diálogo arrastável usando [react-draggable](https://github.com/mzabriskie/react-draggable). Para fazer isso, você deve passar o componente importado `Draggable` como `PaperComponent` do componente `Dialog`. Isso fará com que todo o diálogo seja arrastável.

{{"demo": "pages/components/dialogs/DraggableDialog.js"}}

## Rolagem de conteúdo longo

Quando diálogos ficam muito grandes para a tela do usuário ou dispositivo, a rolagem é habilitada.

- `scroll=paper` o conteúdo do diálogo rola dentro do elemento.
- `scroll=body` o conteúdo do diálogo rola dentro do corpo da página.

Experimente a demonstração abaixo para ver o que queremos dizer:

{{"demo": "pages/components/dialogs/ScrollDialog.js"}}

## Performance

Veja a seção [Performance Modal](/components/modal/#performance).

## Limitações

Siga a [seção de limitações do Modal](/components/modal/#limitations).

## Acessibilidade

Siga a [seção de acessibilidade do Modal](/components/modal/#accessibility).
