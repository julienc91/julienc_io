Avec une installation de base de Docker sur un système Linux, l'utilisation de l'applicatif est généralement limitée à l'utilisateur `root`. Bien que la [documentation](https://docs.docker.com/engine/installation/linux/linux-postinstall/#/manage-docker-as-a-non-root-user) officielle explique comment contourner ce problème, trop peu d'utilisateurs ont connaissance de cette possibilité. Or, l'exécution de programmes avec un niveau de privilège inadapté est une [mauvaise pratique](http://serverfault.com/a/57964/234064) pouvant créer une brèche de sécurité dans le système. Et Docker n'est pas une exception à la règle&nbsp;!

Pour commencer, il faut vérifier qu'un groupe `docker` a bien été créé lors de l'installation. Dans le doute, la commande suivante créera le groupe s'il n'existe pas déjà&nbsp;:

    $> sudo groupadd -f docker

Si ce n'est pas déjà le cas, il faudra veiller à ce que le socket utilisé par Docker appartienne bien à ce groupe&nbsp;:

    $> sudo chown root:docker /var/run/docker.sock

Il va ensuite falloir ajouter notre utilisateur à ce groupe&nbsp;:

    $> sudo usermod -a -G docker "$(whoami)"

Et enfin appliquer les modifications :

    $> newgrp docker
    $> sudo systemctl restart docker

Vous pouvez dès à présent lancer vos containers sans passer par `root`&nbsp;!

Attention toutefois aux confusions, le démon Docker, lui, reste exécuté par le compte `root`, et ce n'est [pour le moment pas modifiable](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface).
