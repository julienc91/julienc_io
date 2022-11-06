---
title: Structural Pattern Matching sur Python 3.10
date: "2021-03-02"
tags: ["python"]
---

Le _Structural Pattern Matching_ est une nouveauté très intéressante à venir dans Python 3.10, dont la date de sortie prévisionnelle est octobre 2021. Mais pas la peine d'attendre jusque là pour tester, puisque cette fonctionnalité et d'ores et déjà disponible sur la version 3.10.0a6 !

## Présentation du _Structural Pattern Matching_

Le _Structural Pattern Matching_ est donc une fonctionnalité à venir dans la prochaine release mineure de Python 3, qui se base sur les [PEP 634](https://www.python.org/dev/peps/pep-0634/), [PEP 635](https://www.python.org/dev/peps/pep-0635/) et [PEP 636](https://www.python.org/dev/peps/pep-0636/). C'est un outil très puissant dont je vais me contenter ici de présenter quelques exemples basiques.

### Enfin un `switch` dans Python !

Un des cas d'utilisation les plus simples permettra d'introduire des blocs semblables aux clauses `switch` que l'on retrouve déjà dans de nombreux langages, et qu'il fallait jusqu'à présent reproduire à l'aide de clauses `if`/`elif`/`else`.

Par exemple :

```python
from enum import Enum

class Move(Enum):
    UP = 1
    DOWN = 2
    LEFT = 3
    RIGHT = 4

def move(x: int, y: int, move: Move) -> tuple[int, int]:
    match move:
        case Move.UP:
            y += 1
        case Move.DOWN:
            y -= 1
        case Move.LEFT:
            x -= 1
        case Move.RIGHT:
            x += 1
    return x, y

move(1, 1, Move.UP)  # (1, 2)
move(1, 1, Move.DOWN)  # (1, 0)
move(1, 1, Move.LEFT)  # (0, 1)
move(1, 1, -1)  # (1, 1)
```

L'équivalent d'une clause `default` peut être ajoutée avec :

```python
match move:
    ....
    case _:
        raise ValueError("Invalid move")
```

### Et bien plus encore

Comme son nom l'indique, le _Structural Pattern Matching_ permet également d'aller beaucoup plus loin en filtrant sur la structure de la variable utilisée. Par exemple, voici un algo d'insertion ordonnée récursif :

```python
def sorted_insert(items: list[int], n: int) -> list[int]:
    match items:
        case []:  # empty list, just return the item to insert
            return [n]
        case [a, *b] if a > n:  # prepend n
            return [n, a, *b]
        case [a, *b]:  # insert n recursively
            return [a] + sorted_insert(b, n)

sorted_insert([1, 2, 3, 4], 0)  # [0, 1, 2, 3, 4]
sorted_insert([1, 2, 3, 4], 5)  # [1, 2, 3, 4, 5]
sorted_insert([1, 2, 3, 4], 3)  # [1, 2, 3, 3, 4]
```

Et ce n'est qu'un très rapide aperçu de ce qu'il est possible de faire avec ce nouvel outil. De nombreux exemples plus poussés sont disponibles sur la [PEP 636](https://www.python.org/dev/peps/pep-0636/) ainsi que sur la [page de présentation de Python 3.10](https://docs.python.org/3.10/whatsnew/3.10.html#pep-634-structural-pattern-matching).

## Tester le Pattern Matching

La manière la plus simple est d'utiliser l'une des [nombreuses images Docker](https://hub.docker.com/_/python) mises à disposition de Python 3.10.0a.

```bash
# pull to make sure you have the latest version
$ docker pull python:3.10-rc-alpine
# and run the python shell
$ docker run -it python:3.10-rc-alpine
Python 3.10.0a6 (default, Mar  2 2021, 18:48:36) [GCC 10.2.1 20201203] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Bien évidemment, Python 3.10 est à l'heure actuelle encore en cours de développement, et il est donc très fortement déconseillé de l'utiliser pour autre chose que des tests...
