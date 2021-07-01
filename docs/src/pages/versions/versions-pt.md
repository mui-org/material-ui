# Versões do Material-UI

<p class="description">Sempre que precisar, você pode voltar a esta página e mudar a versão da documentação que você está lendo.</p>

## Released versions

The most recent stable version (✓) is recommended for use in production.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## Últimas versões

Aqui você irá encontrar a versão em desenvolvimento e sua documentação. Poderá usar esta versão para ver quais alterações estão em fase de desenvolvimento e fornecer um feedback melhor para os contribuidores do Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Estratégia de controle de versão

A estabilidade garante que componentes e bibliotecas reutilizáveis, tutoriais, ferramentas e práticas aprendidas não se tornem obsoletas inesperadamente. A estabilidade é essencial para que o ecossistema em torno do Material-UI prospere.

Este documento contém as práticas que são seguidas para fornecer uma biblioteca de ponta para interface do usuário, equilibrada com a estabilidade e garantindo que mudanças futuras sejam sempre introduzidas de maneira previsível.

Material-UI segue o [Controle de Versão Semântico 2.0.0](https://semver.org/). Os números da versão do Material-UI têm três partes: ` principal.menor.patch`. O número da versão é incrementado com base no nível de alteração incluído na nova versão.

- **Versões principais** contém novos recursos significativos, porém, é esperado um efeito colateral mínimo para o desenvolvedor durante a atualização. Ao atualizar para uma nova versão principal, talvez seja necessário executar scripts de atualização, refatorar códigos, executar testes adicionais e aprender sobre as novas APIs.
- **Versões menores** contém novos recursos importantes. Versões menores são totalmente compatíveis com versões anteriores; nenhuma assistência do desenvolvedor é esperada durante a atualização, mas você pode opcionalmente modificar seus aplicativos e bibliotecas para começar a usar novas APIs, recursos e capacidades que foram adicionados na versão.
- **Versões de patch** são de baixo risco, contêm correções de bugs e pequenos novos recursos. Nenhuma assistência do desenvolvedor é esperado durante a atualização.

## Frequência de lançamento

Um cronograma regular de lançamentos ajuda você a planejar e coordenar suas atualizações de acordo com a evolução contínua do Material-UI.

Em geral, você pode esperar o seguinte ciclo de lançamento:

- A versão **principal** a cada 12 meses.
- 1-3 lançamentos **menores** para cada versão principal.
- Uma versão **patch** a cada semana (ou imediatamente em caso de um bugfix urgente).

## Cronograma de lançamento

| Data                | Versão      | Situação         |
|:------------------- |:----------- |:---------------- |
| Maio de 2018        | v1.0.0      | Lançada          |
| Setembro de 2018    | v3.0.0      | Lançada          |
| Maio de 2019        | v4.0.0      | Lançada          |
| Q1 2021             | v5.0.beta.0 | Work in progress |
| September 1st, 2021 | v5.0.0      | ⏳                |

Você pode seguir os [milestones](https://github.com/mui-org/material-ui/milestones) para uma visão geral mais detalhada.

> ⚠️ ** Isenção de responsabilidade **: Operamos em um ambiente dinâmico e as coisas estão sujeitas a alterações. As informações disponibilizadas destinam-se a traçar a orientação geral do framework. Destina-se apenas a fins informativos. Podemos decidir adicionar/remover itens novos a qualquer momento, com base em nossos recursos de capacidade de entrga ou para manter nossos padrões de qualidade. O desenvolvimento, lançamentos e disponibilidade de recursos ou funcionalidades do Material-UI permanece a critério exclusivo da equipe. O roadmap não representa um compromisso, obrigação ou promessa que será entregue em um determinado momento.

## Política de suporte

Encontre detalhes nas [versões suportadas](/getting-started/support/#supported-versions).

## Práticas de descontinuação

Às vezes, **"alterações significativas"**, tais como a remoção do suporte para selecionar APIs e recursos, são necessários.

Para tornar essas transições o mais fácil possível:

- O número de alterações recentes é minimizado, e ferramentas de migração são disponibilizadas quando possível.
- A política de descontinuação descrita abaixo é seguida para que dessa forma, você tenha tempo para atualizar seus aplicativos para as versões mais recentes da API bem como aplicar as melhores práticas.

### Política de descontinuação

- Recursos descontinuados são anunciados no log de mudanças, e quando possível, com avisos colocados em tempo de execução.
- Quando uma descontinuação é anunciada, um caminho para efetuar a atualização é fornecido.
- O uso já existente da API durante o período de descontinuação é suportado, então seu código continuará a funcionar durante esse período.
- Atualizações de subdependências do framework (React) que exigem alterações nos seus aplicativos só são feitas em uma versão principal.
