---
title: Nom de domaine et DNS sur un serveur dédié
date: "2014-07-05"
tags: ["devops"]
disabled: true
---

Vous venez de vous procurer un nom de domaine et souhaitez administrer votre propre serveur DNS&nbsp;? Les étapes à suivre pour configurer correctement votre système sont détaillées dans cet article.

Les informations qui suivent se basent sur une distribution Debian 8, un nom de domaine chez OVH, et un serveur Kimsufi. Les instructions seront éventuellement à adapter pour d'autres configurations.

### Modification des serveurs DNS associés au domaine

La première chose à faire est de signaler à OVH que le domaine est à faire pointer sur notre propre serveur. Pour cela, rendez-vous sur l'[interface d'administration d'OVH][1], puis dans la section *Domaine & DNS*, et enfin *Serveurs DNS*. Le serveur primaire à indiquer est le vôtre (il est indiqué sur l'interface de gestion Kimsufi), et le serveur secondaire à utiliser est celui de Kimsufi, à savoir `ns.kimsufi.com`. Ce qui donne en principe&nbsp;:

![Serveurs DNS](/static/images/articles/ovh_dns.png)

La mise à jour peut prendre un peu de temps. Tant mieux, on va pouvoir passer à la suite&nbsp;!

### Configuration de `named`

Direction notre serveur dédié en vue d'installer `named`, notre serveur DNS. S'il n'est pas déjà installé&nbsp;:

    $> apt-get install bind9

Pour commencer, on édite le fichier `/etc/bind/named.conf.local` pour lui indiquer les zones qu'il va devoir gérer&nbsp;:

    zone "mydomain.com" {
	    type master;
	    file ""/etc/bind/zones/db.mydomain.com"";
	    allow-transfer {XX.XX.XX.XX;};
    	allow-query { any; };
	    notify yes;
    };
    zone ""YY.YY.YY.YY.in-addr.arpa"" {
	    type master;
	    file ""/etc/bind/zones/YY.YY.YY.YY.in-addr.arpa"";
	    allow-transfer {XX.XX.XX.XX;};
    	allow-query { any; };
	    notify yes;
    };

En veillant bien sûr à remplacer *mydomain.com* par le domaine en question, et:

* `XX.XX.XX.XX` par l'adresse ip du DNS secondaire sélectionné précédemment (pour Kimsufi, ce sera `213.186.33.199`)
* `YY.YY.YY.YY` par l'adresse ip du serveur, écrite à l'envers. Par exemple, c'est l'adresse ip du serveur est `10.20.30.40`, il faudra indiquer `40.30.20.10`.

Il est également possible (voire conseillé si vous comptez aussi administrer votre serveur mail) d'ajouter une zone reverse IPV6, selon le même schéma.

Plus qu'à créer les fichiers en question. On commence par `/etc/bind/zones/db.mydomain.com`&nbsp;:

    @    IN         SOA    ns1234.ip-10-20-30.eu. postmaster.mydomain.com. (
         2014070501 ; Serial
         8H         ; Refresh
         30M        ; Retry
         4W         ; Expire
         8H         ; Minimum TTL
    )
                   IN    NS    ns1234.ip-10-20-30.eu.
                   IN    NS    ns.kimsufi.com.
    mydomain.com.  IN    A     10.20.30.40
    ownercheck     IN    TXT   "abcdef"

Puis `/etc/named/zones/YY.YY.YY.YY.in-addr.arpa`&nbsp;:

    $TTL 12H
    @    IN    SOA    ns1234.ip-10-20-30.eu. postmaster.mydomain.com. (
         2014070501 ; Serial
         8H         ; Refresh
         30M        ; Retry
         4W         ; Expire
         8H         ; Minimum TTL
    )
         IN NS   ns1234.ip-10-20-30.eu.
         IN NS   ns.kimsufi.com.
         IN PTR  mydomain.com.

Bien sûr, si vous savez ce que vous faites, vous pouvez ajouter autant d'entrées que vous voulez dans votre zone DNS.

Les valeurs à remplacer cette fois sont&nbsp;:

* `mydomain.com` par le nom de domaine à gérer
* `10.20.30.40` par l'adresse ip du serveur
* `ns1234.ip-10-20-30.eu` par le nom du serveur (celui indiqué comme étant DNS primaire)
* `ns.kimsufi.com` par le nom du DNS secondaire
* `abcdef` par le code de vérification de délégation

Le code de vérification vous est donné depuis l'interface d'admnistration Kimsufi, dans *DNS/Ajouter un DNS secondaire*&nbsp;:

![DNS sur Kimsufi](/static/images/articles/kimsufi_dns.png)

Presque terminé, plus qu'à démarrer le service&nbsp;:

    $> systemctl start bind9 # Pour démarrer le service
    $> systemctl enable bind9 # Pour le rendre persistant au redémarrage

Et, si tout se passe comme prévu, votre nouveau nom de domaine pointe désormais sur votre serveur&nbsp;! Pour le vérifier, on peut utiliser `ping`&nbsp;:

    $> ping mydomain.com
    PING mydomain.com (10.20.30.40) 56(84) bytes of data.

  [1]: https://www.ovh.com/manager
