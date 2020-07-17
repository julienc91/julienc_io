Garder son système et ses dépendances à jour est primordial pour la sécurité. Et ce n'est pas parce qu'une application est *conteneurisée* qu'elle devrait échapper à cette règle.

En effet, bien que Docker apporte indéniablement une couche de sécurité supplémentaire en isolant l'applicatif du système hôte, il n'est pas exempt de failles plus ou moins critiques pouvant permettre l'escalade, par exemple la [CVE-2016-9962](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-9962) rendue publique au début de cette année. Et puis de toute façon, c'est toujours mieux de pouvoir profiter des dernières fonctionnalités, non&nbsp;?

Le problème, c'est qu'une fois qu'un container est créé, on a (en tout cas moi) souvent tendance à le laisser faire sa vie dans son coin. Et contrairement à des gestionnaires de paquets tels que `dnf` ou `apt-get` pour lesquels on peut configurer les [mises à jour automatiques](https://wiki.debian.org/UnattendedUpgrades), Docker n'intègre pas, à ce jour, de moyen simple de faire de même.

### À la main

Sur le principe, c'est très simple&nbsp;: il faut télécharger la dernière version de l'image voulue, stopper le container actuel, et en relancer un nouveau avec la nouvelle image et les mêmes paramètres que l'ancien container.

Prenons un cas concret. On a un container `redis:latest` qui correspondait, à sa création, à `redis:3.2.8`.

    $ docker run --name redis -d redis:latest

Or, la version 3.2.9 est sortie depuis. Mettons donc à jour notre container :

    $ docker pull redis:latest
    latest: Pulling from library/redis
    Status: Downloaded newer image for redis:latest
    $ docker stop redis
    $ docker rm redis
    $ docker run --name redis -d redis:latest

Mais il faut reconnaître que c'est plutôt pénible à faire, et pas super simple à automatiser.

### Watchtower

[Watchtower](https://github.com/v2tec/watchtower) est un outil open-source permettant d'automatiser ces mises à jour. Il se présente sous la forme d'une image Docker à lancer très simplement :

    $ docker run \
        --name watchtower \
        --volume /var/run/docker.sock:/var/run/docker.sock \
        --detach \
        v2tec/watchtower

Le paramètre `--volume` est obligatoire pour que Watchtower puisse communiquer avec le démon Docker sur le système hôte.

Encore mieux&nbsp;! Il est possible de lui préciser quand faire les mises à jour, histoire d'éviter une coupure de service (même mineure) en pleine heure de pointe. Le paramètre `--schedule` prend comme valeur une expression crontab. Sinon, le paramètre `--interval` peut-être utilisé pour définir le nombre de secondes entre chaque vérification.

À noter également l'option `--cleanup` qui permet de supprimer les anciennes images afin de ne pas surcharger l'espace disque de l'hôte.

Ce qui donne chez moi :

    $ docker run \
        --name watchtower \
        --volume /var/run/docker.sock:/var/run/docker.sock \
        --detach \
        v2tec/watchtower \
        --schedule "0 0 4 * * *" \
        --cleanup
    
Plus besoin donc de se soucier de mettre à jour ses containers, Watchtower le fait tout seul, et ça fonctionne parfaitement&nbsp;!

    $ docker logs watchtower  
    time="2017-05-18T04:00:00Z" level=info msg="Checking containers for updated images" 
    time="2017-05-18T04:00:06Z" level=info msg="Found new kylemanna/openvpn:latest image (sha256:97ede0cd802f13e7276d7f69cfac1cc6d29181d8b546a4a6706c7f30297fc9bc)" 
    time="2017-05-18T04:00:12Z" level=info msg="Stopping /openvpn (25f2831bc81be97c8ef5bc2a2bc36948a18f2382b23638240e38a4e220709f3a) with SIGTERM" 
    time="2017-05-18T04:00:13Z" level=info msg="Creating /openvpn" 
    time="2017-05-18T04:00:13Z" level=info msg="Removing image sha256:76fa63e4bf1139b4b83b78f3d626eca18ed0702e89f1afdb20ca0b7f48f16c66"
