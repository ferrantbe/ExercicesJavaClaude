# Les decks produits

Ce dossier contient les decks tels qu'ils ont été générés, pour que toutes
les conversations voient **ce qui existe déjà** sans avoir à le demander.

## Nommage

```
01_INI_slides.pptx   02_POO_slides.pptx   …
```

Le numéro suit l'ordre pédagogique, le code dit le thème. Les deux sont
utiles : le numéro pour ranger, le code pour retrouver.

**Le numéro est fragile, le code ne l'est pas.** Un ordre de modules
corrigé a été proposé le 15/09 — il descend `PKG` après `ABS`, parce que
`PKG.5` porte sur `protected`, qui n'a aucun sens sans héritage. Le jour
où cet ordre change, les numéros changent et les noms de fichiers avec.
C'est pourquoi le code figure aussi dans le nom : lui ne bougera pas.

## Une réserve, à peser maintenant plutôt que dans six mois

Un deck pèse environ cinq mégaoctets, et **Git conserve chaque version
pour toujours**. Les sources ne changent plus : les suivre coûte une fois.
Les decks produits, eux, seront régénérés — à chaque correction d'une
coquille, à chaque retouche d'une slide.

Dix régénérations de quinze decks, et le dépôt pèse sept cents mégaoctets
dont personne n'aura l'usage. Chaque clone les téléchargera.

Trois façons de vivre avec :

- **les suivre quand même**, en acceptant que le dépôt grossisse. Tenable
  si les régénérations restent rares ;
- **ne pousser que les versions qui comptent** — celle du début d'année,
  celle d'après la session — plutôt que chaque retouche ;
- **les sortir du dépôt** et les publier autrement, par une *release*
  GitHub par exemple, qui ne pèse pas sur l'historique.

Rien n'est tranché. La deuxième voie demande le moins d'effort pour le
plus de bénéfice.

## Ce qui n'est pas ici

Les **sources** sont dans `_slides/sources/` : les douze decks d'origine
et le gabarit. Ils ne changent plus.

Une sortie de travail laissée à la racine de `_slides/` est ignorée par
Git — c'est voulu. Pour qu'un deck compte, il doit arriver ici.
