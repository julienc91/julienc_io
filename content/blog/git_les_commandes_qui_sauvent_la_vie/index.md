---
title: Git, les commandes qui sauvent la vie
date: '2014-07-18'
tags: ['git', 'shell']
---

`git` est un outil puissant et complet, à tel point qu'il est aujourd'hui le gestionnaire de versions le plus utilisé. Mais il n'est pas toujours simple de se souvenir de _la_ commande qui répond à votre besoin du moment. Cet article recense une série de commandes `git` qu'il est bon de garder à portée de main.

### Rajouter ou modifier un fichier au dernier commit

Ça arrive tout le temps. Un `commit -a` sans faire attention, et un fichier qu'on avait oublié d'ajouter apparaît par magie une fois le commit fait. Ou le `print` de debug qu'on a oublié d'enlever. Évidemment, un nouveau commit ferait l'affaire, mais pourquoi ne pas prendre la bonne habitude de soigner notre dépôt&nbsp;? La solution&nbsp;: `git commit --amend -C HEAD`. Cette commande permet d'ajouter au dernier commit les fichiers qu'on aura modifiés/ajoutés depuis, tout en gardant le même message de commit que précédemment.

    $> git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.
    #
    # Untracked files:
    #    addme.txt
    $> git add addme.txt
    $> git commit --amend -c HEAD
    $> git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.

### Modifier le message du dernier commit

Une faute de frappe repérée un peu trop tard&nbsp;?

    $> git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.
    $> git commit --amend
    $> # modifiez le message du commit
    $> git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.

### Annuler le dernier commit tout en gardant les modifications

Un commit un peu trop hâtif, mais dont on aimerait garder les ajouts ? Il est possible, très simplement, d'annuler le dernier commit.

    $> git status
    # On branch master
    # Your branch is ahead of 'origin/master' by 1 commit.
    $> git reset --soft HEAD~1
    # On branch master
    # Changes to be committed:
    #    modified: readme.txt

Cette commande peut être utilisée plusieurs fois de suite pour annuler plusieurs commits successifs (qui n'auront bien sûr pas été pushés).

### Tout effacer, revenir au dernier commit

Quand on a passé une demi-journée sans succès sur son code et qu'on préfère revenir à zéro, autant revenir au dernier commit et annuler tous les changements effectués depuis.

    $> git status
    # On branch master
    # Changes not staged for commit:
    #     modified: revertme.txt
    $> git reset --hard HEAD
    $> git status
    # On branch master
    # Your branch is up-to-date with 'origin/master'.

### Supprimer une branche

Supprimer la branche locale, ce n'est pas très compliqué:

    $> git branch -D mytemporarybranch

Il faudra juste veiller à se trouver sur une autre branche au moment de la suppression. Par contre, pour supprimer une branche distante, ça devient syntaxiquement plus complexe. On peut toujours voir ça comme une sécurité contre les suppressions involontaires.

    $> git push origin --delete mytemporarybranch

### Annuler les changements sur un fichier

Un fichier supprimé, c'est vite arrivé. Ou des modifications qui n'apportent rien et qu'on voudrait supprimer.

    $> git status
    # On branch master
    # Changes not staged for commit:
    #     modified: revertme.txt
    $> git checkout -- revertme.txt
    $> git status
    # On branch master
    # Your branch is up-to-date with 'origin/master'.

### Déplacer ses modifications sur une autre branche

Il arrive parfois d'apporter des ajouts avant de se rendre compte qu'on est pas sur la bonne branche. Il est possible de déplacer ces changements sur la branche voulue.

    $> git status
    # On branch master
    # Changes not staged for commit:
    #     modified: revertme.txt
    $> git stash
    # On branch master
    # Your branch is up-to-date with 'origin/master'.
    $> git checkout develop
    # On branch develop
    # Your branch is up-to-date with 'origin/develop'.
    $> git stash pop
    # On branch develop
    # Changes not staged for commit:
    #     modified: revertme.txt

Évidemment, il pourra arriver d'avoir affaire à des conflits... A vous de gérer en conséquence!

### Voir l'historique d'un fichier

Et sans utiliser d'interface graphique bien entendu...

    $> git log -p lookatme.txt
    commit ab390e841d59ee8fb513033e647eb0d4a91189e6
    Author: julienc
    Date: Sun Jun 29 16:39:35 2014 +0200

        New line added in lookatme

    diff --git a/project/lookatme.txt b/project/lookatme.txt
    -Hello World
    +Hello
    +World

    commit 30828b058bd007cbdab928e52ad8b15273eea4b1
    Author: julienc
    Date: Sun Jun 28 14:32:46 2014 +0200

        Added lookatme

    diff --git a/project/lookatme.txt b/project/lookatme.txt
    +Hello World

### Réinitialiser un fichier sur une ancienne version

Pour revenir à la configuration de la semaine dernière par exemple, ça peut toujours servir.

    $> git checkout 30828b058bd007 resetme.txt
    $> git status
    # On branch master
    # Changes not staged for commit:
    #     modified: resetme.txt

### Regarder les différences depuis le dernier commit

Pour voir ce qu'on a ajouté, ou ce que l'on est sur le point de commiter.

    $> git diff
    diff --git a/project/lookatme.txt b/project/lookatme.txt
     This is lookatme.txt
    +Hello World
     And have a good day!

On peut aussi préciser le fichier sur lequel on souhaite voir les différences si on ne souhaite pas voir l'ensemble des modifications sur tous les fichiers.

### Regarder les différences entre les deux derniers commits

Pour savoir ce qu'on vient de récupérer par exemple, ou regarder simplement ce qui a changé lors du dernier commit.

    $> git diff HEAD^ HEAD
    diff --git a/project/lookatme.txt b/project/lookatme.txt
     This is lookatme.txt
    +Hello World
     And have a good day!

### Appliquer les modifications d'un commit en particulier

Il arrive parfois qu'on ait besoin en urgence d'un commit qui se trouve sur une autre branche, mais qu'on ne veuille surtout pas faire un merge complet de cette branche. La solution, c'est `cherry-pick`, qui va récupérer ce commit en particulier pour l'appliquer à la branche courante. Il suffit d'indiquer le hash du commit en question.

    $> git cherry-pick 30828b058bd007
    $> git status
    # On branch master
    # Changes not staged for commit:
    #     modified: pickme.txt
