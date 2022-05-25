# 2048

## Présentation du jeu
2048 est un jeu vidéo de type puzzle conçu en mars 2014 par le développeur indépendant italien Gabriele Cirulli et publié en ligne sous licence libre via Github le 9 mars 2014.

Au départ, le jeu est créé en version navigateur (html, css, javascript) mais étant en licence libre, il va être repris de nombreuses fois et même transformé en application mobile.

## Les règles

Le gameplay du jeu repose sur l'utilisation des touches fléchées du clavier (ou de la fonction tactile sur tablettes et smartphones) pour déplacer les tuiles vers la gauche, la droite, le haut ou le bas. Lors d'un mouvement, l'ensemble des tuiles du plateau sont déplacés dans la même direction jusqu'à rencontrer les bords du plateau ou une autre tuile sur leur chemin. Si deux tuiles, ayant le même nombre, entrent en collision durant le mouvement, elles fusionnent en une nouvelle tuile de valeur double (par ex. : deux tuiles de valeur « 2 » donnent une tuile de valeur « 4 »). À chaque mouvement, une tuile portant un 2 ou un 4 apparaît dans une case vide de manière aléatoire.

Le jeu, simple au début, se complexifie de plus en plus, du fait du manque de place pour faire bouger les tuiles, et des erreurs de manipulation possibles, pouvant entraîner un blocage des tuiles et donc la fin du jeu à plus ou moins long terme, selon l’habileté du joueur. Pourtant, et bien que très chronophage, 2048 possède la particularité de ne jamais rendre l'échec frustrant, au contraire : le fait de recommencer pour tenter une nouvelle stratégie fait partie du plaisir3.

La partie est gagnée lorsqu'une tuile portant la valeur « 2048 » apparaît sur la grille, d'où le nom du jeu. On peut néanmoins continuer à jouer avec des tuiles de valeurs plus élevées (4 096, 8 192, etc.). La tuile maximum pouvant être atteinte est, en théorie, « 131 072 » (ou 2 ^ 17) ; le score maximal possible est 3 932 156 ; le nombre maximum de déplacements est 131 0386. Quand le joueur n'a plus de mouvement légaux (plus d'espaces vides ou de tuiles adjacentes avec la même valeur), le jeu se termine.

## Mon adaptation
Toutes les règles du jeu sont normalement reprises. La seule différence est les animations de slide que j'ai remplacé car, comme j'utilise canvas, elles sont bien plus difficile à faire qu'avec html/css/js.

Le jeu se joue avec les flèches du clavier.

[Jouez ici!](https://hepl-mmi-2021-2022.github.io/projet-mmi-juin-theo-leonet/)

## To do list
- [ ] Design
- [ ] Animations (autres que celles du jeu original)
- [ ] Optimiser le code
- [ ] Add sound
- [X] Gameplay
- [X] Gestion du score + meilleur score
- [X] Gestion de la fin et du recommencement
