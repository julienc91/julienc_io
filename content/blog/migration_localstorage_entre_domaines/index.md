---
title: Migration de LocalStorage entre domaines
date: "2022-11-06"
tags: ["javascript", "react"]
---

L'[API Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) permet
de stocker très facilement côté client des données au format clé/valeur, soit
via [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), pour des données
temporaires qui seront effacées à la fermeture du navigateur, soit
via [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) pour des données
persistantes. Exactement comme pour les cookies, ces données sont liées à un domaine et ne peuvent être accédées que par
celui-ci. Aussi, en cas de changement du nom de domaine d'une application, il peut être compliqué de _déplacer_ les
données de l'ancienne vers la nouvelle adresse.

C'est pourtant ce qu'il a fallu faire il y a quelques mois pour [Caviardeul](https://caviardeul.fr), puisque le jeu a
été migré d'un sous-domaine de mon domaine principal vers son propre nom de domaine. Et les données contenues dans
le `localStorage` des utilisateurs étaient trop importantes pour être ignorées (historique complet et sauvegarde des
parties en cours notamment). Alors comment faire&nbsp;?

### Rediriger l'ancien vers le nouveau domaine... ou presque

La redirection de l'ancien vers le nouveau domaine est primordiale pour le confort des utilisateurs, ainsi que pour le
référencement de l'application. Cependant, nous aurons besoin de conserver au moins une page sur l'ancien domaine, que
l'on placera ici sur l'adresse `/local-storage-migrator.html`, afin
d'accéder au contenu du `localStorage`. Pour reprendre l'exemple de ce qui a été fait avec Caviardeul, basé
sur [Next.js](https://nextjs.org/), on peut se servir de son système
de [middleware](https://nextjs.org/docs/advanced-features/middleware):

```typescript
// middleware.ts
import { BASE_URL, DEPRECATED_DOMAIN } from "@caviardeul/utils/config"

export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  if (
    req.nextUrl.host === DEPRECATED_DOMAIN &&
    req.nextUrl.pathname !== "/local-storage-migrator.html"
  ) {
    return NextResponse.redirect(
      new URL(`${BASE_URL}${req.nextUrl.pathname}`),
      308
    )
  }
  return NextResponse.next()
}
```

On notera l'utilisation du code [HTTP 308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308) pour la
redirection, puisqu'il s'agit bien d'une redirection permanente.

### Export des données depuis l'ancien domaine

Toutes les pages de l'ancien domaine sont à présent redirigées vers leur nouvelle adresse, à l'exception du
chemin `/local-storage-migrator.html`. À cette adresse sera servie une page HTML avec un script dont le but est
d'exporter le contenu du `localStorage` via la
méthode [`Window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) qui permet justement la
communication d'informations entre différents domaines.

```html
<!DOCTYPE html>
<!-- public/local-storage-migrator.html -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>LocalStorage migration</title>
  </head>
  <body>
    <script>
      ;(function () {
        var data = localStorage.getItem("data")
        if (!!data) {
          window.parent.postMessage("migration:" + data)
          localStorage.removeItem("data")
        }
      })()
    </script>
  </body>
</html>
```

Avec ce code, dès que la page s'affichera dans le navigateur d'un utilisateur, le contenu du `localStorage` sera lu, et
si celui-ci n'est pas vide, alors ces données seront envoyées à `window.parent`, qui correspond bien sûr au nouveau domaine de l'application.
La donnée est ensuite supprimée pour ne pas réitérer l'opération au prochain affichage de la page.

### Réception des données sur le nouveau domaine

Vous l'aurez peut-être déjà deviné à cause du `window.parent` utilisé&nbsp;: pour que le nouveau domaine reçoive l'information, il faut que celui-ci
se rattache à l'ancien domaine via une iframe. Cette fois, le code exécuté correspond à l'application déjà migrée, pas besoin donc de se limiter à une page HTML statique. Pour reprendre encore une fois l'exemple de Caviardeul, cela passe par un composant React inclu dans chacune des pages. Celui-ci a pour but&nbsp;:

1. d'ouvrir une iframe vers la page de migration de l'ancien domaine
2. d'intercepter le contenu envoyé via `postMessage`
3. de sauvegarder ce contenu dans le `localStorage` du nouveau domaine

```jsx
// components/localStorageMigrator.tsx
import React, { useCallback, useEffect } from "react"

import { DEPRECATED_DOMAIN } from "@caviardeul/utils/config"

const LocalStorageMigrator: React.FC = () => {
  const handleMessage = useCallback((message: MessageEvent) => {
    // Fonction appelée lorsqu'un message est reçu
    const { data, origin } = message
    if (!origin.includes(DEPRECATED_DOMAIN)) {
      return // Ce message ne provient pas de notre ancien domaine
    }

    const [messageType, migratedData] = data.split(":")
    if (messageType !== "migration") {
      return // Ce préfixe est utilisé par local-storage-migrator.html
    }

    // Sauvegarde des donées dans le localStorage du nouveau domaine
    localStorage.setItem("data", migratedData)
  }, [])

  useEffect(() => {
    // Ajout d'un listener sur les events de type "message"
    if (typeof window === "undefined") {
      return // Rendering côté serveur, window est undefined
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [handleMessage])

  return (
    // Inclusion de l'iframe de manière invisible
    <iframe
      style={{ display: "none", width: 0, height: 0 }}
      src={`//${DEPRECATED_DOMAIN}/local-storage-migrator.html`}
    />
  )
}

export default LocalStorageMigrator
```

Il ne reste qu'à inclure ce composant dans chacune des pages de l'application, ce qui peut être fait très facilement via le fichier [`_app.js`](https://nextjs.org/docs/advanced-features/custom-app) par exemple.
