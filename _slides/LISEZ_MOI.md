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

**`gabarit_deck.pptx`** — le module et les dispositions. C'est un binaire :
il ne survit pas à la base de connaissances du Projet, qui n'en conserve
que le texte extrait.

**Les anciens decks**, dont les modules tirent leurs intercalaires et leur
matière. La table ci-dessous a été établie en **lisant les fichiers**, et non
en reconstituant depuis le tableau de bord — lequel donne un deck par module,
ce qui est faux : un deck nourrit souvent plusieurs modules, et un module puise
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

## Les decks de référence : `slides_de_cours/`

**Depuis octobre 2026, les decks de `slides_de_cours/` sont la référence.**
Ils ont tous été retouchés après leur génération : mise en forme du code
dans le texte, animations, slides ajoutées directement dans le deck,
relectures de Frédéric. Régénérer un deck depuis son scénario ferait perdre
tout cela.

Une modification se fait donc **dans le deck**, puis se reporte **dans le
scénario**, qui en reste la documentation : ce que dit chaque slide, et sa
note. Les générateurs de `generateurs/` servent à créer le deck d'un
nouveau module, ou à repartir de zéro en connaissance de cause ; jamais à
« rafraîchir » un deck existant.

**`POO` et `INI` n'ont pas de moteur.** Ils ont été construits par des
moteurs propres, `construire_deck_poo.py` et `construire_deck_ini.py`,
antérieurs au moteur générique et qui n'existent plus. Leur fichier
`module_poo.py` ou `module_ini.py` ne sert qu'au finaliseur ; le moteur
générique les refuse, faute de `PLAN`, et le dit. Reconstruire l'un de ces
deux decks de zéro demanderait d'écrire son `PLAN` et des retouches sur
mesure (schémas et captures repris des anciens decks) : décision du
22/10/2026, ce n'est pas fait, puisque le deck existant est la référence.

Après toute modification d'un deck, `python3 _outils/style_decks.py` met le
code et les renvois du texte en Consolas, couleur Accent 4.

## Où en est la fabrique

**Les seize decks sont produits**, au 11/10/2026, et sont maintenant dans
`slides_de_cours/`, numérotés dans l'ordre pédagogique.

`STA` n'a pas de deck à lui : ses deux exercices sont couverts par la
section 4 du deck `POO`, « Membres de classe ». Ce n'est pas un oubli.

`FX` en a deux. `FX1` traite les événements, `FX2` les propriétés et
l'architecture MVC ; la frontière tombe entre `FX.5` et `FX.6`, là où l'on
cesse de réagir à un événement pour déclarer une dépendance permanente.

Ce qui reste à faire porte sur le **contenu** des decks, pas sur la
fabrique : relecture et adaptation, séance par séance.

## Les dossiers

| | |
|---|---|
| `slides_de_cours/` | les decks de référence, ceux qu'on projette et qu'on modifie |
| `scenario/` | le plan de chaque deck, écrit avant lui, et tenu à jour depuis |
| `generateurs/` | le moteur générique, le finaliseur et la configuration de chaque module |
| `gabarit_deck.pptx` | le gabarit commun : thème, dispositions, slides modèles |

Les douze decks d'origine (`sources/`) et les decks tels que générés
(`generes/`) ont été retirés le 22/10/2026 ; ils restent dans l'historique de
GitHub. Conséquence : le moteur générique ne peut plus construire un deck
sans retouche, puisque chaque `module_xxx.py` prend son intercalaire dans un
deck d'origine (`SOURCES`). Pour un nouveau module, prendre l'intercalaire
dans un deck de `slides_de_cours/` et adapter `SOURCES` en conséquence.

`generes/` porte une réserve sur le poids que prend l'historique Git à force
de versions successives : voir son `LISEZ_MOI.md`.

## Ajouter un module

Deux fichiers, et rien d'autre.

```
_slides/generateurs/module_xxx.py   configuration, SECTIONS et LIBELLES
_slides/scenario/Scenario_XXX.md
```

**Le moteur ne se modifie pas.** C'est le résultat de la révision de
septembre : auparavant, chaque nouveau deck ajoutait son entrée dans un
dictionnaire de `finaliser_deck.py`, et deux conversations parallèles
produisaient deux versions divergentes. L'une avait perdu l'entrée `TAB`
sans qu'aucun message ne le signale.
