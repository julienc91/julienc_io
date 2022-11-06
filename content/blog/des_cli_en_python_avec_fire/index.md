---
title: Des CLI en Python avec Fire
date: "2020-07-15"
tags: ["python", "shell"]
---

Python est historiquement un langage très utilisé pour concevoir des applications en ligne de commande (ou _CLI_ pour l'acronyme anglais). Pendant longtemps, le module [`optparse`](https://docs.python.org/2/library/optparse.html) de la bibliothèque standard a permis aux développeur·euses de faciliter la conception de telles applications en offrant des outils pour gérer proprement les paramètres des programmes.
Ce module été déprécié avec les versions 2.7 et 3.2 de Python en 2011, au profit de [`argparse`](https://docs.python.org/fr/3/howto/argparse.html), projet externe réintégré à ce moment au cœur du langage.
On notera également l'existence du module [`getopt`](https://docs.python.org/fr/3/library/getopt.html), moins utilisé et surtout beaucoup moins complet.

Mais le sujet d'aujourd'hui n'est pas dans bibliothèque standard, puisqu'il s'agit de [`Python Fire`](https://github.com/google/python-fire), un projet de Google dont la première version date de 2017. Contrairement aux exemples précédemment cités, qui se contentent de gérer les paramètres des programmes en CLI, `Fire` permet la construction de CLI complètes à partir de n'importe quel code de base.

L'installation se fait facilement via `pip`, comme c'est l'usage&nbsp;:

    pip install fire

## Un exemple simple pour commencer

Considérons tout d'abord un exemple très simple, avec une fonction qui se contente d'incrémenter un entier&nbsp;:

```python
def increment(i: int):
    """
    Add 1 to the given integer.
    :param i: an integer
    :return: i + 1
    """
    return i + 1
```

La façon la plus basique de faire une CLI de cette fonction serait un code de ce style&nbsp;:

```python
import sys


def usage(name):
    print(f"Usage: {name} <I>")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        usage(sys.argv[0])
        sys.exit(1)
    print(increment(int(sys.argv[1])))
```

Il faut donc vérifier les paramètres d'entrée, gérer les cas d'erreurs, prendre en charge la conversion de type, et afficher la sortie. Pas vraiment optimal... Utiliser `argparse` ici permettrait de simplifier les trois premiers points, mais nous verrons plus tard que cet outil serait tout aussi pénible sur des cas plus complexes.

À présent, voici comment faire avec `Fire`&nbsp;:

```python
import fire

if __name__ == "__main__":
    fire.Fire(increment)
```

Et tout est là&nbsp;! `Fire` va se charger de tout, que ce soit de la vérification des paramètres, des erreurs, de l'aide à l'utilisateur, et de l'affichage de la sortie. Les paramètres optionnels (si par exemple le paramètre de la fonction `increment` avait eu une valeur par défaut) sont également pris en compte.

<pre><code>$ python test.py
<b>ERROR:</b> The function received no value for the required argument: i
Usage: test.py I

For detailed information on this command, run:
  test.py --help
$ python test.py --help
<b>NAME</b>
    test.py - Add 1 to the given integer.

<b>SYNOPSIS</b>
    test.py I

<b>DESCRIPTION</b>
    Add 1 to the given integer.

<b>POSITIONAL ARGUMENTS</b>
    I
        an integer

<b>NOTES</b>
    You can also use flags syntax for POSITIONAL ARGUMENTS

$ python test.py 16
17
</code></pre>

## Démultiplions les fonctions

Là où toute la puissance de `Fire` s'exprime, c'est certainement losqu'il s'agit de gérer plusieurs fonctions en même temps. Ajoutons par exemple une seconde fonction à notre script&nbsp;:

```python
import fire


def increment(i: int):
    """
    Add 1 to the given integer.
    :param i: an integer
    :return: i + 1
    """
    return i + 1


def decrement(i: int):
    """
    Remove 1 to the given integer.
    :param i: an integer
    :return: i - 1
    """
    return i - 1


if __name__ == "__main__":
    fire.Fire()
```

La seule différence pour `Fire` ici est l'absence de paramètre que nous lui donnons. De cette façon, `Fire` va simplement prendre en compte toutes les fonctions à sa portée. Lors de l'appel en ligne de commande, il suffira de préciser quelle sous-fonction on souhaite appeler.

```
$ python test.py increment 16
17
$ python test.py decrement 18
17
```

Bien sûr, le `--help` s'adapte en conséquence.

En comparaison, réaliser la même chose avec `argparse` aurait nécessité un bloc `if`/`else` pour rediriger _à la main_ vers la bonne fonction. Et dans le cas où nos fonctions auraient des signatures différentes, il aurait en plus fallu définir les différents paramètres dans des groupes exclusifs distincts.

## La même, avec des classes

Il est possible d'obtenir le même résultat en utilisant des méthodes au lieu de fonctions simples.

```python
class AddOrRemove:
    def __init__(self, n):
        self.n = n

    def add(self, i):
        return i + self.n

    def remove(self, i):
        return i - self.n


if __name__ == "__main__":
    instance = AddOrRemove(1)
    fire.Fire({
      "increment": instance.add,
      "decrement": instance.remove
    })
```

Il aurait été possible d'appeler `Fire` avec `fire.Fire(instance)`, mais il aurait alors fallu utiliser les noms `add` et `remove` en ligne de commande. L'instanciation de `Fire` telle qu'elle est faite dans l'exemple précédent permet de lister les méthodes que l'on souhaite rendre disponibles, ainsi que leur nom d'usage.

## Et bien plus encore

Ce n'est qu'un aperçu très bref des fonctionnalités de `Fire`, qui bénéficie en plus d'un développement très actif. Il est par exemple possible d'activer l'auto-complétion, par la touche _Tab_, sur les CLI créés.

Pour aller plus loin, leur [documentation](https://github.com/google/python-fire/blob/master/docs/guide.md) compte nombre d'exemples variés.
