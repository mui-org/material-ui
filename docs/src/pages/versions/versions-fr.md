# Versions de Materiel-UI

<p class="description">Vous pouvez revenir à cette page et changer de version de document à tout moment.</p>

## Released versions

The most recent stable version (✓) is recommended for use in production.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## Versions les plus récentes

Ici vous pouvez trouver la dernière documentation non publiée et le code. Vous pouvez l'utiliser pour voir les modifications à venir et fournir des retours aux contributeurs de Material-UI.

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## Stratégie de gestion des versions

La stabilité garantit des composants réutilisables et les librairies, tutoriels, outils ainsi que les pratiques acquises ne deviennes pas soudainement obsolètes. La stabilité est essentielle au développement de l’écosystème Material-UI.

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Le numéro de version est incrémenté en fonction du niveau de changement inclus dans la version. Material-UI follows [Semantic Versioning 2.0.0](https://semver.org/). Les numéros de version Material-UI ont trois parties : `majeur.mineur.correctifs`.

- Les ** Versions majeures ** contiennent de nouvelles fonctionnalités significatives, mais une aide minimale aux développeurs est attendue durant la mise à jour. Lors de la mise à jour vers une nouvelle version majeure, vous devrez peut-être exécuter des scripts de mise à jour, de la refactorisation du code, exécuter des tests supplémentaires et apprendre de nouvelles API.
- Les ** Versions mineures ** contiennent d'importantes nouvelles fonctionnalités. Aucune assistance pour les développeurs n'est attendue lors de la mise à jour.
- Les ** Versions de correctifs ** sont à faible risque, contiennent des corrections de bugs et de petites nouvelles fonctionnalités. Aucune assistance pour les développeurs n'est attendue lors de la mise à jour.

## Fréquence de version

A regular schedule of releases helps you plan and coordinate your updates with the continuing evolution of Material-UI.

In general, you can expect the following release cycle:

- Une version **majeure** tous les 12 mois.
- 1-3 **mineur** versions pour chaque version majeure.
- Une version de **patch** chaque semaine (à tout moment pour une correction de bogue urgente).

## Calendrier de version

| Date                | Version     | Status           |
|:------------------- |:----------- |:---------------- |
| May 2018            | v1.0.0      | Released         |
| September 2018      | v3.0.0      | Released         |
| May 2019            | v4.0.0      | Released         |
| Q1 2021             | v5.0.beta.0 | Work in progress |
| September 1st, 2021 | v5.0.0      | ⏳                |

You can follow the [milestones](https://github.com/mui-org/material-ui/milestones) for a more detailed overview.

> ⚠️ **Avertissement** : Nous opérons dans un environnement dynamique et les choses sont susceptibles de changer. Les informations fournies visent à définir l'orientation générale du cadre. Il est destiné à des fins d'information uniquement. Nous pouvons décider d'ajouter/supprimer de nouveaux articles à tout moment en fonction de notre capacité à livrer tout en respectant nos normes de qualité. Le développement, les versions et le calendrier de toute fonctionnalité ou fonctionnalité de Material-UI restent à la seule discrétion de Material-UI. La feuille de route ne représente pas un engagement, une obligation ou une promesse de livraison à tout moment.

## Politique de support

Find details on the [supported versions](/getting-started/support/#supported-versions).

## Pratiques de l'obsolescence

Parfois, des **"changements de rupture"**, tels que la suppression de la prise en charge de certaines API et fonctionnalités, sont nécessaires.

To make these transitions as easy as possible:

- The number of breaking changes is minimized, and migration tools provided when possible.
- The deprecation policy described below is followed, so that you have time to update your apps to the latest APIs and best practices.

### Deprecation policy

- Deprecated features are announced in the changelog, and when possible, with warnings at runtime.
- When a deprecation is announced, recommended update path is provided.
- Existing use of a stable API during the deprecation period is supported, so your code will keep working during that period.
- Peer dependency updates (React) that require changes to your apps are only made in a major release.
