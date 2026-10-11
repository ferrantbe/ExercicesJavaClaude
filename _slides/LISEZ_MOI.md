# La fabrique des slides

Ce dossier produit les decks de cours. Il est **indépendant du projet
Maven** : rien ici ne se compile, et le recueil d'exercices fonctionne sans.

Il vit néanmoins dans le même dépôt, pour une raison simple : un deck, un
fascicule et une démonstration parlent du même module et doivent rester
cohérents. Les séparer, c'est les laisser diverger — ce qui est arrivé en
septembre, quand sept conversations ont fait vivre sept copies du moteur.

## Ce qu'il contient

| | |
|---|---|
| `construire_deck.py` | le moteur, commun à tous les modules |
| `finaliser_deck.py` | pagination, sommaire, repères — il charge dynamiquement le `module_xxx.py` du code demandé |
| `module_xxx.py` | la configuration d'un module : sources, intercalaire, **sections et libellés** |
| `scenario/Scenario_XXX.md` | le plan du deck, écrit avant lui |

## Ce qui ne s'y trouve pas, et doit venir d'ailleurs

**`gabarit_deck.pptx`** — le thème et les dispositions. C'est un binaire :
il ne survit pas à la base de connaissances du Projet, qui n'en conserve
que le texte extrait.

**Les anciens decks**, dont les modules tirent leurs intercalaires et leur
matière. La table ci-dessous a été établie en **lisant les fichiers**, et non
en reconstituant depuis le tableau de bord — lequel donne un deck par module,
ce qui est faux : un deck nourrit souvent plusieurs thèmes, et un thème puise
parfois dans deux decks.

| Fichier | Slides | Ce qu'il nourrit |
|---|---|---|
| `d01.pptx` | 67 | `INI` — IntelliJ, plateforme Java ; `POO` — héritage |
| `d02.pptx` | 62 | `TMP` (4-11), `PKG` (12-34), `TAB` (35-62) |
| `d03.pptx` | 66 | `ABS` (13-28), `ITF` (29-66) |
| `d04.pptx` | 63 | `ITF` (11-20 et 34-37), **GameHub `G.14`-`G.20`** (21-32), `STA` (38-63) |
| `d05.pptx` | 49 | `COL`, en entier |
| `d06.pptx` | 68 | **GameHub `G.14`-`G.20`** (11-19), `EXC` (20-68) |
| `d07.pptx` | 55 | `JUN`, en entier |
| `d08.pptx` | 98 | `GEN` (9-55), `LAM` (56-98) |
| `d09.pptx` | 74 | `FX` — installation, MVC, FXML, la calculatrice (`FX.9`) |
| `d10.pptx` | 49 | `FX` — événements, layouts, contrôles |
| `d11.pptx` | 20 | `FX` — propriétés et bindings |
| `d12.pptx` | 46 | `FIC`, en entier |

### Quatre remarques qui ont coûté cher à retrouver

**Un seul deck 08.** Il s'est longtemps appelé `d08a` et `d08b` dans ces
scripts, comme s'il y en avait deux. C'est le même fichier : les génériques
occupent les slides 9 à 55, les lambdas les suivantes. Les conversations `GEN`
et `LAM` reçoivent donc le **même** fichier, et doivent savoir quelle moitié
les concerne.

**`d02b.pptx` n'existe pas.** Il avait dû être fabriqué à la main en découpant
`d02`, et n'a pas été conservé. `module_tab.py` pointe désormais sur `d02`.

**Les énoncés `G.14` à `G.20` figurent dans DEUX decks**, le 04 et le 06. On
les a reconstitués en septembre en les croyant perdus ; ils étaient simplement
répartis.

**`ITF` puise dans deux decks**, `d03` et `d04`. Sa conversation n'a
probablement vu que le premier.

### Deux decks hors table

`11b_Clean_Code.pptx` (27 slides) ne nourrit aucun module : il a servi à écrire
`Memento_Clean_Code.docx`.

`99_Threads.pptx` (52 slides) concerne `FX.10`, classé Won't et hors examen.
Attention : ses slides 13 à 34 sont celles de `d12`, recopiées — seules les
douze premières portent réellement sur les threads.

## Les trois dossiers

| | |
|---|---|
| `sources/` | les douze decks d'origine et le gabarit — ils ne changent plus |
| `scenario/` | le plan de chaque deck, écrit avant lui |
| `generes/` | les decks produits, pour que chaque conversation voie ce qui existe |

`generes/` porte une réserve sur le poids que prend l'historique Git à force
de versions successives : voir son `LISEZ_MOI.md`.

## Ajouter un module

Deux fichiers, et rien d'autre.

```
_slides/module_xxx.py          configuration, SECTIONS et LIBELLES
_slides/scenario/Scenario_XXX.md
```

**Le moteur ne se modifie pas.** C'est le résultat de la révision de
septembre : auparavant, chaque nouveau deck ajoutait son entrée dans un
dictionnaire de `finaliser_deck.py`, et deux conversations parallèles
produisaient deux versions divergentes. L'une avait perdu l'entrée `TAB`
sans qu'aucun message ne le signale.
