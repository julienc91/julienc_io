---
title: Certificats SSL Let's Encrypt
date: "2015-12-13"
tags: ["devops"]
disabled: true
---

Le 3 décembre 2015, [Let's Encrypt](https://letsencrypt.org/) est sorti en version bêta publique. Il s'agit d'une autorité de certification qui fournit gratuitement des certificats, dans l'objectif de généraliser le chiffrement sur le web. Fondée notamment par l'[EFF](https://www.eff.org/) et [Mozilla](https://www.mozilla.org/), le projet est aujourd'hui soutenu par de grands noms tels que Cisco ou Facebook.
Jusqu'à présent, il fallait débourser au moins une cinquantaine d'euros par an et par domaine pour avoir un certificat reconnu, avoir recours à l'auto-certification (ce qui a pour effet d'afficher des messages d'avertissements peu discrets aux visiteurs de votre site), ou reposer sur des autorités délivrant des certificats gratuits, bien souvent assujettis à de fortes contraintes ou limitations. Aujourd'hui, Let's Encrypt propose une solution à la fois gratuite, reconnue et efficace.

### Installation du client

La génération de certificats passe par un logiciel libre fourni par l'autorité, qu'il vous faudra télécharger.

    $> git clone https://github.com/letsencrypt/letsencrypt
    $> cd letsencrypt
    
Le client se met à jour de lui-même à chaque exécution; donc pas besoin de systématiquement mettre à jour vos sources manuellement&nbsp;!

Le binaire `letsencrypt-auto` est un _wrapper_ du client qui va installer toutes les dépendances en fonction de votre OS, de sorte que vous n'avez pas à vous en soucier&nbsp;!

### Génération du certificat

Le client Let's Encrypt propose plusieurs manières de générer vos certificats, et il vous est même possible de les configurer directement avec votre serveur web (Apache et Nginx, bien que le plugin pour ce dernier soit encore ""expérimental""), ce que je n'aborderai pas ici.

#### La méthode `standalone`

Elle est très simple à exécuter, mais a pour inconvénient de vous forcer à libérer vos ports 80 ou 443. Gênant si vous ne souhaitez pas redémarrer votre serveur web donc ...
Il suffit d'appeler le client de la sorte :

    $> ./letsencrypt-auto certonly --standalone --standalone-supported-challenges [challenge] -d [domain] -d [subdomain1] -d [subdomain2]
    
Le `[challenge]` est lié au port qui sera utilisé par le client. Ce sera `http-01` pour utiliser le port 80, ou `tls-sni-01` pour le 443. Vous pouvez ensuite indiquer autant de domaines et de sous-domaines que vous le souhaitez (Let's Encrypt ne permet pas encore de générer des certificats wildcard), il vous faudra donc indiquer tous vos sous-domaines. Afin de faire propre, il est recommandé de générer un certificat par domaine principal; même s'il est en pratique tout à fait possible de générer un certificat qui s'appliquerait à plusieurs domaines principaux en même temps. Ce qui donne, dans mon cas&nbsp;:

    $> ./letsencrypt-auto certonly --standalone --standalone-supported-challenges tls-sni-01 -d julienc.io -d www.julienc.io -d dev.julienc.io
    
À la première exécution, le client vous demandera également d'indiquer votre adresse mail afin de recevoir les notifications sur vos certificats générés, notamment pour les questions de renouvellement.
N'oubliez pas de redémarrer votre serveur web à la fin de l'opération&nbsp;!

### La méthode webroot

Cette seconde méthode ne vous contraindra pas à redémarrer votre serveur web. Toutefois, elle peut être légèrement difficile à mettre en place dans certains cas, puisqu'elle demande à rendre accessibles des fichiers statiques à une adresse [bien précise](https://tools.ietf.org/html/rfc5785) :

    http://julienc.io/.well_known/acme-challenge/some_random_filename
    
Si votre site consiste simplement en des fichiers servis directement selon leur emplacement sur votre racine, vous n'aurez a priori aucun problème (veillez peut-être à autoriser la consultation de dossiers cachés sur la configuration de votre serveur web). Mais si jamais celui-ci est plus compliqué (si vous utilisez un framework web tel que Django par exemple), il va falloir aller modifier la configuration de votre serveur web afin d'autoriser la consultation de ces fichiers. Pour Nginx (1.6.2), voici ce que j'ai ajouté à *l'ensemble* de mes fichiers de configuration dans `/etc/nginx/sites-enabled/`, pour chacun des domaines et sous-domaines que je souhaitais certifier&nbsp;:

    server {
        server_name julienc.io
        ...
        
        location '/.well-known/acme-challenge' {
            root /tmp/letsencrypt-auto;
        }
    }

Il ne reste plus qu'à rafraîchir la configuration du serveur web :

    $> nginx -s reload
    
Et à générer nos certificats :

    $> mkdir -p /tmp/letsencrypt-auto
    $> ./letsencrypt-auto certonly --webroot --webroot-path=/tmp/letsencrypt-auto -d julienc.io -d www.julienc.io -d dev.julienc.io
    
Si comme moi vous avez eu besoin de modifier votre configuration, veillez à ce que le chemin de `--webroot-path` soit le même que celui précisé dans le fichier de configuration&nbsp;! Sinon, indiquez simplement le chemin vers la racine des sources de votre site (`/var/www/julienc.io/` par exemple).

## L'installation des certificats

Quelque soit la méthode que vous ayez utilisée, vous devriez à présent avoir à votre disposition votre certificat tout neuf dans `/etc/letsencrypt/live/[domain]/`. Il ne reste qu'à modifier vos fichiers de configuration pour les utiliser.
Voici ma configuration actuelle pour Nginx 1.6.2 :

    server {

        listen       443 ssl spdy;
        server_name  julienc.io;

        ...
        
        ssl_certificate /etc/letsencrypt/live/julienc.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/julienc.io/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/julienc.io/chain.pem;
        # generate this file with the following command:
        # openssl dhparam -out /etc/nginx/dhparam.pem 2048
        ssl_dhparam /etc/nginx/dhparam.pem;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA:ECDHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:ECDHE-ECDSA-DES-CBC3-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:DES-CBC3-SHA:!DSS';
        ssl_prefer_server_ciphers on;

        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:10m;
        ssl_session_tickets off;

        ssl_stapling on;
        ssl_stapling_verify on;

        add_header Strict-Transport-Security max-age=15768000;
    }
    
Une fois le serveur relancé, pensez à consulter https://www.ssllabs.com/ssltest/ pour vérifier que rien ne manque à votre configuration.


## Renouvellement

Les certificats délivrés par Let's Encrypt ne sont valables que pour trois mois, ce qui est un délai plutôt court. Il est donc quasi indispensable d'automatiser leur renouvellement. L'exécutable `letsencrypt-auto` propose un mode spécifique qui prend en charge le renouvellement de vos certificats. Personnellement, j'ai mis en place le script suivant dans `/etc/cron.monthly`, et tout roule à la perfection&nbsp;!

    #!/bin/bash
    letsencrypt-auto renew
    systemctl reload nginx

![letsencrypt_chrome](/static/images/articles/letsencrypt_chrome.png)
