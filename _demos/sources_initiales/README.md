# Sources initiales des démonstrations

L'état de **départ** de chaque démonstration, à charger dans le bac à sable
avant la séance. Le module `demos/` contient l'état d'**arrivée**.

Ces fichiers ne sont pas compilés : ils vivent hors de tout module Maven, pour
qu'un état volontairement fautif — celui d'`exc`, qui plante — ne casse rien.

## La structure

Chaque démonstration reprend la structure d'un module Maven, en plus court :

    jun/
        main/    →  _travail/src/main/java/be/ephec/java/travail/
        test/    →  _travail/src/test/java/be/ephec/java/travail/

C'est la structure qui dit où va chaque fichier, et non son nom. Une classe de
test ne s'appelle pas toujours quelque chose `Test`, et une classe nommée
`Testeur` n'en est pas une.

Un dossier `test/` vide est normal : toutes les démonstrations ne partent pas
d'une classe de test.

## Comment s'en servir

    python3 _outils/preparer_demo.py jun

Le script vide le bac à sable et y recopie les deux dossiers au bon endroit.
Sans argument, il liste ce qui existe avec le compte de fichiers de chaque côté.

## Ce que contient chaque état de départ

| Module | main | test | État fourni |
|---|---|---|---|
| `poo` | 2 | — | champs publics, aucun accesseur |
| `sta` | 2 | — | le compteur en champ d'instance |
| `enu` | 3 | — | le cycle écrit avec trois conditions |
| `gen` | 2 | — | la paire d'`Object`, qui compile et plante |
| `tmp` | 1 | — | la ligne sans affectation |
| `col` | 2 | — | une `ArrayList`, avec son doublon |
| `abs` | 4 | — | trois classes sans parent commun |
| `exc` | 2 | — | le panier sans garde, qui plante |
| `jun` | 1 | 1 | le `return 1;` et son premier test |

Chaque état de départ correspond à l'étape que son scénario dit de jouer en
premier. Deux exceptions, expliquées dans les scénarios : l'étape 1 de `poo`
consiste à taper une classe vide, ce qui n'a pas besoin d'être fourni ; et
aucun état de `jun` antérieur à l'étape 3 ne compile, ce qui est précisément le
sujet de ses deux premières étapes.

Trois de ces états sont volontairement **fautifs** — `gen` plante, `exc`
plante, `tmp` affiche un résultat faux. C'est pour cela qu'ils vivent hors de
tout module Maven.
