---
title: Come to the Dark Side, we have Markdown
date: '2014-09-19'
tags: ['markdown']
disabled: true
---

Le Markdown est un langage qui est né en 2004, co-créé par Aaron Swartz (à qui on doit également le format de flux RSS, et qui a aussi participé au développement de l'organisation Creative Commons), utilisé pour la rédaction de documents textes. Ses avantages&nbsp;: il est léger, très simple à prendre en main, peut être lu et écrit directement dans un éditeur de texte, et est facilement traduisible en HTML ou en LaTeX par exemple. D'ailleurs, l'article que vous êtes en train de lire est initialement écrit en Markdown et est automatiquement inséré dans cette page web. En outre, il est aujourd'hui utilisé par de très nombreux sites tels que GitHub et StackOverflow, ou des outils comme Gitlab.

Cet article a pour objectif de faire rapidement le tour des fonctionnalités du langage et d'encourager son utilisation&nbsp;!

### Le balisage

Comme en HTML, le Markdown est un langage de balisage.

#### Les titres

Il y a deux façons d'écrire un titre. La première est de faire précéder la ligne par un ou plusieurs caractères `#`. Lors de la conversion en HTML, ces lignes sont directement traduites en balises `<h1>` à `<h6>`.

Par exemple&nbsp;:

    # Un gros titre
    ## Un sous-titre

    Du texte pour mon sous-titre

    ## Un deuxième sous-titre

    Encore du texte

> #### Un gros titre
>
> ##### Un sous-titre
>
> Du texte pour mon sous-titre
>
> ##### Un deuxième sous-titre
>
> Encore du texte

Une deuxième façon consiste à _souligner_ le texte du titre, mais cette méthode n'autorise que deux niveaux de titres. Ainsi, le code suivant aura un rendu identique au précédent&nbsp;:

    Un gros titre
    =============
    Un sous-titre
    -------------

    Du texte pour mon sous-titre

    Un deuxième sous-titre
    ----------------------

    Encore du texte

Pour créer des paragraphes, il suffira juste de penser à sauter une ligne.

#### Le formatage

Pour insister sur un passage, entourez-le par le caractère `*` ou `_`. Le rendu se traduit généralement par l'utilisation de l'italique.

    Du texte. *Du texte sur lequel je souhaite insister*.

> Du texte. _Du texte sur lequel je souhaite insister_.

Pour encore plus d'insistance (qui se traduit par l'utilisation de caractères en gras), doublez le caractère de balisage&nbsp;: `**` ou `__`.

    Du texte. **Du texte très important**.

> Du texte. **Du texte très important**.

Il est possible de combiner les deux pour produire du gras-italique&nbsp;:

    Du ***texte*** mis en avant

> Du **_texte_** mis en avant

Pour insérer du code, utilisez le caractère `` ` ``.

    Du texte dans lequel j'insère `du code`.

> Du texte dans lequel j'insère `du code`.

#### Liens et images

Les deux utilisent une syntaxe très proche, seul le caractère `!` est à ajouter pour le cas de l'image.

    J'insère [un lien](https://julienc.io).

    Et voici une image:
    ![une image](https://julienc.io/static/images/articles/markdown.png)

> J'insère [un lien](https://julienc.io).
>
> Et voici une image:
> ![une image](/static/images/articles/markdown.png)

#### Listes

Les listes, rien de plus simple&nbsp;: il suffit d'utiliser le symbole `*` pour créer un point. Indentez-le de deux espaces pour créer une sous-liste.

Il est aussi possible de créer une liste numérotée en utilisant `1.`, `2.`, etc.

    * Un item
      1. Un sous-item numéroté
      2. Un autre sous-item numéroté
    * Un autre item

> - Un item
>   1. Un sous-item numéroté
>   2. Un autre sous-item numéroté
> - Un autre item

#### Blocs de code

L'utilisation du backtick est réservée à du code intégré dans du texte normal. Pour faire un vrai bloc de code, il suffit de l'indenter de 4 espaces. Les balises Markdown ne seront pas prises en compte dans ces blocs.

        #include <stdio.h>

        int main (int argc, char *argv[]) {
            printf(""Hello World"");
            return 0;
        }

#### Blocs de citation

Pour une citation, utilisez le caractère `>` en début de ligne. Les balises de mise en forme peuvent être utilisées dans ce bloc.

    > *Much to learn, you still have.*
    >
    > Yoda

> _Much to learn, you still have_
>
> Yoda

#### Balises HTML

Il est enfin possible d'insérer du HTML directement dans un texte en Markdown, ce qui peut être pratique si les balises propres au langage ne vous suffisent pas pour une raison ou pour une autre.

    Ce <b>*texte*</b> est à la fois en gras et en italique.

> Ce <b>_texte_</b> est à la fois en gras et en italique.

### Variantes

Des variantes du Markdown de base sont nées et ont apporté peu à peu différentes nouveautés. L'une des plus utilisées actuellement est la version popularisée par Github. Elle apporte notamment les tableaux, la coloration syntaxique des blocs de code, le formatage barré, et&nbsp;... les emojis.

### Écrire en Markdown

Les principaux éditeurs de code (Emacs, Vim, Sublime Text, Atom,&nbsp;...) supportent nativement le Markdown, ou proposent des modules pour le faire. Ils permettent généralement d'apporter de la coloration syntaxique et éventuellement de convertir votre texte au format HTML.

Il existe également de très nombreux éditeurs en ligne qui proposent de voir le rendu de votre code au format HTML en temps réel. Parmi eux, je ne peux que conseiller [StackEdit](https://stackedit.io/).

Enfin, si vous gérez un site web, de nombreux outils sont à votre disposition pour y intégrer le support Markdown en transformant le texte que vous saisirez en HTML à la volée: [markdown-js](https://github.com/evilstreak/markdown-js), [markdown-deux](https://github.com/trentm/django-markdown-deux) pour Django, [Flask-Misaka](https://flask-misaka.readthedocs.io/en/latest/) pour Flask, [MarkdownFormatter](http://www.redmine.org/projects/redmine/wiki/PluginMarkdownFormatter) pour Redmine,&nbsp;...

Attention tout de même, car le langage Markdown n'étant pas standardisé (pour le moment), le résultat peut fortement changer d'un éditeur à un autre. De plus, il n'y a, par défaut, aucun CSS appliqué à la traduction HTML du Markdown (vous devrez ajouter le votre à la main si besoin).

Il existe aussi un outil formidable nommé [pandoc](http://johnmacfarlane.net/pandoc/) (et présent dans la plupart des dépôts des distributions Linux actuelles) proposant de convertir des fichiers d'un format à un autre&nbsp;: par exemple de Markdown en LaTeX, ou de MediaWiki (le format utilisé par Wikipédia) en Markdown, etc.
