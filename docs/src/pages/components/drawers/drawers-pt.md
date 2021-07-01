---
title: Componente Drawer para React
components: Drawer, SwipeableDrawer
githubLabel: 'component: Drawer'
materialDesign: https://material.io/components/navigation-drawer
---

# Drawer

<p class="description">A navegação por drawers fornece acesso à partes dentro de sua aplicação. As seções laterais possuem o conteúdo suplementar que é vinculado do lado esquerdo ou direito da tela.</p>

A navegação por drawers (ou "barras laterais") fornecem acesso a partes e funcionalidades do aplicativo, como trocar de conta. Eles podem estar permanentemente na tela ou controlados por um ícone de menu de navegação.

[Seções laterais](https://material.io/design/components/sheets-side.html) são áreas complementares usadas principalmente em tablets e computadores.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Drawer temporário

Drawers de navegação temporária podem alternar entre aberto e fechado. Fechado por padrão, o drawer abre temporariamente acima de todos os outros conteúdos até que uma seção seja selecionada.

O drawer pode ser cancelado clicando na sobreposição ou pressionando a tecla Esc. Fecha quando um item é selecionado, podendo ser manipulado pela propriedade `open`.

{{"demo": "pages/components/drawers/TemporaryDrawer.js"}}

### Deslizável

Voê pode fazer um drawer deslizável (swipeable) com o componente `SwipeableDrawer`.

Este componente vem sobrecarregado com 2 kB gzipped de utilidades. Alguns dispositivos móveis de baixo custo podem não ser capazes de seguir os dedos a 60 FPS. Você pode usar a propriedade `disableBackdropTransition` para ajudar.

{{"demo": "pages/components/drawers/SwipeableTemporaryDrawer.js"}}

As seguintes propriedades são usadas neste site de documentação para otimizar a usabilidade do componente:

- iOS está hospedado em dispositivos de última geração. A transição do plano de fundo pode ser ativada sem deixar cair os quadros. O desempenho será suficientemente bom.
- O iOS possui um recurso "deslizar para voltar" que interfere com o recurso de descoberta, portanto, a descoberta teve que ser desativada.

```jsx
const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

<SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} />;
```

### Borda deslizável

Você pode configurar a propriedade `SwipeableDrawer` para visualizar uma borda quando o Drawer estiver fechado.

Se você estiver em uma área de trabalho, poderá alternar o drawer com o botão "OPEN". Se estiver pelo celular, abra a demonstração no CodeSandbox (ícone "editar") e deslizar.

{{"demo": "pages/components/drawers/SwipeableEdgeDrawer.js", "iframe": true, "height": 400, "maxWidth": 300}}

### Navegação em altura total

Para garantir que um drawer temporário não seja desmontado, especifique a propriedade `ModalProps` como:

```jsx
<Drawer
  variant="temporary"
  ModalProps={{
    keepMounted: true,
  }}
/>
```

Mais detalhes na [seção de desempenho Modal](/components/modal/#performance).

## Drawer responsivo

You can use the `temporary` variant to display a drawer for small screens and `permanent` for a drawer for wider screens.

{{"demo": "pages/components/drawers/ResponsiveDrawer.js", "iframe": true}}

## Drawer persistente

Drawers de navegação persistente podem alternar entre aberto ou fechado. O drawer, quando exibido, fica no mesmo plano (superfície) que o conteúdo. Ele é fechado por padrão e aberto quando selecionado por um ícone de menu e permanecendo aberto até ser fechado pelo usuário. O estado do drawer é lembrado de ação para ação e de sessão para sessão.

Quando o drawer está fora da grade da página e se abre, o drawer força o outro conteúdo a alterar o tamanho e a adaptar-se à janela de visualização (viewport).

Drawers de navegação persistentes são aceitáveis para todos os tamanhos maiores que os móveis. Não são recomendadas para aplicativos com vários níveis de hierarquia que requerem usar navegação com uma seta para cima.

{{"demo": "pages/components/drawers/PersistentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PersistentDrawerRight.js", "iframe": true}}

## Variação mini drawer

Nesta variação, o drawer de navegação persistente muda sua largura. Seu estado de recolhido é como um mini-drawer no mesmo plano de elevação do conteúdo, recortado pela barra de aplicativos. Quando expandido, ele aparece da forma padrão de um drawer de navegação persistente.

A variação mini é recomendada para seções de aplicativos que necessitam ser selecionadas por um acesso rápido ao lado do conteúdo.

{{"demo": "pages/components/drawers/MiniDrawer.js", "iframe": true}}

## Drawer permanente

Drawers de navegação permanentes são sempre visíveis e fixados na borda esquerda, na mesma elevação do conteúdo ou plano de fundo. Eles não podem ser fechados.

Aplicativos focados no consumo de informações que usam uma hierarquia da esquerda para a direita.

### Navegação em altura total

Aplicativos focados no consumo de informações que usam uma hierarquia da esquerda para a direita.

{{"demo": "pages/components/drawers/PermanentDrawerLeft.js", "iframe": true}}

{{"demo": "pages/components/drawers/PermanentDrawerRight.js", "iframe": true}}

### Cortado por baixo da barra de aplicativos

Aplicativos focados em produtividade que exigem consistência na tela.

{{"demo": "pages/components/drawers/ClippedDrawer.js", "iframe": true}}
