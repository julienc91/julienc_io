---
title: Gatsby et i18next sans Suspense
date: '2020-07-29'
tags: ['javascript', 'react', 'gatsby']
---

[Gatsby](https://www.gatsbyjs.org/) est un framework JS très pratique pour créer des sites statiques rapidement avec React. C'est d'ailleurs le framework utilisé par la version actuelle de ce site.
D'autre part, le package [i18next](https://www.i18next.com/) facilite l'internationalisation de ses sites et applications, et propose des adaptateurs pour les frameworks les plus courants, tels que React, NextJS, Vue ou Angular.

Les problèmes arrivent lorsqu'on tente de combiner les deux... En effet, [Gatsby ne fonctionne pas avec `React.Suspense`](https://www.gatsbyjs.org/docs/using-client-side-only-packages/#workaround-4-use-reactlazy-and-suspense-on-client-side-only), du fait que cette fonctionnalité n'est, pour le moment, [pas implémentés pour le rendu côté serveur](https://fr.reactjs.org/docs/code-splitting.html#reactlazy). Ainsi, lorsqu'on tente un `gatsby build` sur un tel projet, on obtient l'erreur suivante&nbsp;:

```
$ gatsby build
[...]
failed Building static HTML for pages - 1.307s

 ERROR #95313

Building static HTML failed for path "/"

See our docs page for more info on this error: https://gatsby.dev/debug-html

  Error: Minified React error #294; visit https://reactjs.org/docs/error-decoder.html?invariant=294 for the fu  ll message or use the non-minified dev environment for full errors and additional helpful warnings.
[...]
```

Pas très parlant...

## Désactiver l'usage de `Suspense` par `i18next`

Heureusement, il est très simple de configurer `i18next` pour ne pas utiliser `React.Suspense`. Dans le fichier `src/components/i18n.js` où se fait la configuration&nbsp;:

```javascript
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // <- et voilà !
    }
  })

export default i18n
```

Avec cette configuration, le `build` s'exécute sans erreur. Mais un nouveau problème se pose&nbsp;: le chargement des fichiers de traduction n'est pas immédiat. On se retrouve donc avec un texte qui _saute_.

<video autoplay loop muted>
    <source src="./jumping_text.webm" type="video/webm">
</video>

## Recréer un faux `Suspense`

Pour répondre à ce nouveau désagrément, il est possible d'utiliser un _callback_ après l'initialisation de l'instance `i18n`.

Ainsi, dans le fichier `layout.js`&nbsp;:

```javascript
import React, { useState } from 'react'
import Footer from './footer'
import Menu from './menu'
import Spinner from './spinner'
import { setCallback } from './i18n'

const Layout = props => {
  const { children, className } = props
  const [loading, setLoading] = useState(true)

  if (loading) {
    setCallback(() => setLoading(false))
    return <Spinner />
  }
  return (
    <>
      <Menu />
      <main className={className}>{children}</main>
      <Footer />
    </>
  )
}
```

Et dans le fichier `i18n.js&nbsp;:

```javascript
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

let ready
let readyCallback

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  })
  .then(() => {
    ready = true
    if (readyCallback) {
      readyCallback()
    }
  })

export const setCallback = callback => {
  readyCallback = callback
  if (ready) {
    readyCallback()
  }
}

export default i18n
```

De cette manière, un _spinner_ est affiché tant que les traductions ne sont pas chargées&nbsp;:

<video autoplay loop muted>
    <source src="./spinner.webm" type="video/webm">
</video>
