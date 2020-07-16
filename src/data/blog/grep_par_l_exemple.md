`grep` est un outil incontournable dès lors qu'il est question d'utiliser son terminal. Pour autant, l'étendue de ses fonctionnalités fait que beaucoup d'entre elles sont méconnues. Cet article a pour but de montrer, au travers d'exemples, certaines des possibilités offertes par `grep`.

### La recherche de base

La manière la plus simple d'utiliser `grep` est de suivre la forme suivante:

    $> grep <motif> <fichier>

Cette syntaxe de base va chercher dans le fichier donné l'ensemble des lignes contenant le motif indiqué. Par exemple :

<pre><code>$> grep 'lorem' lorem_ipsum.txt
Donec ligula libero, egestas et sapien eget, ullamcorper iaculis <b>lorem</b>.
Etiam est <b>lorem</b>, sollicitudin a libero ac, pulvinar suscipit orci.
Nullam viverra dictum <b>lorem</b>, quis congue nisl imperdiet a.
Aliquam vitae <b>lorem</b> ac dui pulvinar dignissim nec id orci.</code></pre>

#### Fichiers multiples

Il est tout à fait possible d'exécuter `grep` sur une liste de fichiers ou d'utiliser des wildcards.

    $> grep 'ipsum' lorem1.txt lorem2.txt lorem3.txt
    $> grep 'ipsum' *.txt
    
Encore mieux, `grep` propose une option `-R` pour chercher de manière récursive dans l'ensemble des fichiers.

<pre><code>$> grep -R 'ipsum' .
lorem1.txt: Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit.
lorem/lorem2.txt: Nullam eget congue <b>ipsum</b>.</code></pre>
    
Notez que le formatage du résultat peut varier selon si la recherche s'effectue sur un fichier ou sur plusieurs.

#### Avec un pipe

Il est très fréquent d'utiliser `grep` après un `pipe` pour combiner différentes commandes à la suite. Par exemple :

<pre><code>$> echo "foo\nbar\nfoobar" | grep "foo"
<b>foo</b>
<b>foo</b>bar</code></pre>
    
### Options utiles

#### Compter les résultats

Il est parfois utile de compter le nombre d’occurrences de son motif, plutôt que de voir défiler les lignes correspondantes. L'option `-c` est là pour ça.

    $> grep -c 'et' lorem_ipsum.txt
    8

Si le motif peut apparaître plusieurs fois sur une ligne, il va par contre falloir ruser, `grep` ne comptant que les lignes comportant au moins une fois le motif. Il est néanmoins relativement facile de ruser à l'aide de l'option `-o` qui permet de ne retourner que le motif trouvé, et non l'ensemble de la ligne. Les occurrences sur une même ligne seront donc toutes dans le résultat, et il ne reste plus qu'à compter les lignes&nbsp;!

    $> grep -o 'et' lorem_ipsum.txt | grep -c ''
    12
    
#### Connaître le numéro de ligne

S'il faut trouver le numéro des lignes correspondantes, c'est l'option `-n` qu'il faut utiliser&nbsp;:

<pre><code>$> grep -n 'ipsum' lorem_ipsum.txt
3: Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit.</code></pre>
    
Par défaut, `grep` affiche le numéro de la ligne ainsi que la ligne (ou la correspondance seulement si `-o` est utilisé). Pour ne récupérer que les numéros de lignes, on peut combiner avec l'outil `cut`&nbsp;:

    $> grep -n 'ipsum' lorem_ipsum.txt | cut -f1 -d:
    3
    
#### Recherche en *case insensitive*

Pour ne pas avoir à se soucier de la casse dans sa recherche, il y a l'option `-i`&nbsp;:

<pre><code>$> grep -i 'lorem' lorem_ipsum.txt
<b>Lorem</b> ipsum dolor sit amet, consectetur adipiscing elit.
Donec ligula libero, egestas et sapien eget, ullamcorper iaculis <b>lorem</b>.
Etiam est <b>lorem</b>, sollicitudin a libero ac, pulvinar suscipit orci.</code></pre>
    
#### Rechercher la non correspondance

`grep` permet aussi de récupérer les lignes qui ne correspondent pas au motif donné en utilisant l'option `-v`. Cette option est très pratique lorsqu'on a besoin d'ignorer de nombreuses lignes sur une entrée donnée.

    $> grep -v 'et' lorem_ipsum.txt
    Cras ac lacinia lacus.
    Mauris cursus diam justo, quis mollis sapien malesuada eu.
    Cras aliquam pulvinar viverra.

    
#### Correspondance de toute la ligne

Et il est aussi possible de chercher les lignes qui correspondent exactement au motif donné:

<pre><code>$> grep -x 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' lorem1.txt
<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b></code></pre>

#### Fichiers avec au moins une correspondance

L'option `-l` permet de lister les fichiers ayant au moins une correspondance avec le motif donné. La recherche est optimisée puisque `grep` s'arrête dès la première correspondance trouvée&nbsp;, ce qui peut être utile lorsqu'on est amené à manipuler des fichiers volumineux.

    $> grep -l 'ipsum' *.txt
    lorem1.txt
    lorem2.txt
    
L'option `-L` permet, quant à elle, de lister les fichiers n'ayant aucune correspondance.

#### Résultats avec contexte

Il est parfois utile d'avoir le contexte du résultat, c'est-à-dire la ligne de la correspondance et celles qui l'entourent. Il suffit pour cela d'utiliser les options `-A`, `-B` ou `-C` pour, respectivement, avoir les lignes suivant, précédent ou entourant le résultat. Par exemple, pour avoir les 2 lignes suivantes&nbsp;:

<pre><code>$> grep -A 2 'Lorem' lorem_ipsum.txt
<b>Lorem</b> ipsum dolor sit amet,
consectetur adipiscing elit.
In facilisis cursus tellus,</code></pre>

#### Cumuler les options

Les options que énumérées dans cet article peuvent bien sûr être cumulées (du moins lorsqu'elles sont compatibles entre elles). Par exemple, la commande suivante fera une recherche récursive sans casse et affichera les numéros de lignes des correspondances&nbsp;:

    $> grep -Rni 'lorem ipsum'
    lorem1.txt:1:Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    lorem2.txt:3:Lorem ipsum dolor sit amet.
    
### Encore plus loin avec les expressions régulières

Pourquoi se limiter à des motifs fixes lorsqu'on peut utiliser des expressions régulières? `grep` comprend par défaut la plupart des expressions régulières.

<pre><code>$> grep '^Lorem [a-z ]*,[a-z ]*.$' lorem_ipsum.txt
<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b></code></pre>

Si jamais les résultats ne sont pas conformes à vos attentes, c'est peut-être qu'il faut activer le support pour les expressions régulières étendues, avec l'option `-E`. Il est alors possible d'utiliser les opérateurs de quantification `+` et `?` ou de fixer le nombre exact de répétitions, à l'aide des accolades.

Par exemple:

<pre><code>$> grep -E '^Lorem (ipsum)? dolor+ [a-z]{3} amet' lorem.txt
<b>Lorem ipsum dolor sit amet</b>, consectetur adipiscing elit.</code></pre>

---

Cet article est bien entendu une présentation très rapide de l'outil qu'est `grep`, et les possibilités sont encore plus grandes lorsqu'on commence à faire des combinaisons avec d'autres outils tels que `awk`.
Pour un aperçu plus complet de `grep`, n'hésitez pas à consulter sa page de `man`&nbsp;!
