# Les decks sources

Les douze decks du cours d'origine, plus le gabarit commun. Ils ne
changeront plus : ils servent de matière première aux decks produits.

## Ce qui doit se trouver ici

```
gabarit_deck.pptx    le thème, les dispositions, les slides modèles
d01.pptx  d02.pptx  d03.pptx  d04.pptx
d05.pptx  d06.pptx  d07.pptx  d08.pptx
d09.pptx  d10.pptx  d11.pptx  d12.pptx
```

**Un seul fichier 08.** Il a longtemps été nommé `d08a` et `d08b` dans
les scripts, comme s'il y en avait deux. Les génériques occupent ses
slides 9 à 55, les lambdas les suivantes.

**Il n'y a pas de `d02b`.** Il avait dû être fabriqué en découpant `d02`,
et n'a pas été conservé. `module_tab.py` pointe sur `d02`.

La table complète - quel deck nourrit quel thème, et pour quelles
slides - est dans `_slides/LISEZ_MOI.md`.

## Un dossier voisin, pour TMP

`module_tmp.py` attend huit images d'intercalaire dans `_slides/images/` :

```
TMP_inter_1.jpg … TMP_inter_8.jpg
```

Elles avaient été extraites de `d02` par un utilitaire qui n'a pas été
conservé. **Sans elles, la génération du deck TMP échoue** - et TMP est
déjà produit, donc le problème ne se verra qu'à une régénération.

Si vous les retrouvez, déposez-les dans `_slides/images/`.

## Deux fichiers qui ne vont pas ici

`11b_Clean_Code.pptx` ne nourrit aucun module : il a servi à écrire
`Memento_Clean_Code.docx`.

`99_Threads.pptx` concerne `FX.9`, hors examen, et ses slides 13 à 34
sont celles de `d12` recopiées.

Rangez-les ailleurs si vous voulez les garder.
