# Outils du professeur — ne pas distribuer

Ce dossier ne part jamais chez les etudiants : `livrer.py` ne met dans les
archives que les packages de theme listes dans `livraisons.json`.

Le souligné du nom est une convention : `_outils/`, `_todos/`, `_objectifs/`,
`_demos/` et le module `_travail/` sont reserves au professeur, et le souligné
les regroupe en tete de l'arborescence d'IntelliJ.

Sept scripts, plus les generateurs de documents dans generateurs/. Les cinq premiers sont en Python 3 sans dependance ; les deux derniers demandent matplotlib et Pillow, et trois scripts Node produisent les documents GameHub.

`livrer.py` et `verifier_squelettes.py` retrouvent seuls la racine du projet,
en remontant jusqu'au `pom.xml` depuis leur propre emplacement, et affichent le
chemin qu'ils analysent :

```
Projet : /Users/vous/.../ExercicesJava
```

**Lisez cette ligne.** Si elle ne designe pas le projet auquel vous pensez,
c'est qu'une autre copie traine quelque part — et tous les signalements qui
suivent porteront sur elle. Les exemples ci-dessous supposent qu'on se trouve a
la racine, mais le dossier courant n'a aucune importance.

`ajouter_pagination.py` et `reparer_liens.py` prennent au contraire un chemin de
fichier explicite : c'est vous qui designez le document.

| Script | Quand le lancer |
|---|---|
| `verifier_comptes.py` | apres avoir ajoute ou retire un exercice |
| `verifier_renvois.py` | apres avoir ajoute ou deplace un renvoi vers un memento |
| `verifier_squelettes.py` | apres avoir ecrit ou modifie un exercice |
| `preparer_demo.py` | avant de jouer une demonstration en cours |
| `livrer.py` | pour fabriquer les archives d'une seance |
| `style_decks.py [--verifier]` | le code et les references dans le texte des slides : Consolas, couleur Accent 4, comme dans les documents Word ; `--verifier` liste sans rien changer |
| `adoucir_captures.py fichier.docx` | bordure adoucie de 4 pt sur les captures d'ecran (marquees `|capture` dans la source d'un support), pour eviter le halo ; appele par `construire_support_module.py` |
| `construire_support_global.py` | le support de cours complet, `_support/Support_de_cours.docx` (et sa version N/B), en recto seul par defaut (`--recto-verso` pour des modules sur une page de droite et des marges en miroir ; meme option pour `construire_recueil.py`) : les quinze modules dans l'ordre des seances, chacun sur une page de droite avec son pied de page, la table des matieres et l'index ; s'appuie sur `build_support_global.js` et `indexer.py` |
| `reduire_images.py fichier.docx [--toutes-captures]` | retrecit les captures affichees trop grand (texte a 0,75 de sa taille d'ecran) et reechantillonne les images a 220 ppp, dans le document seulement ; appele par les assemblages des supports ; a lancer avec `--toutes-captures` apres `build_guide_intellij.js` |
| `lier_renvois.py fichier.docx` | les renvois en Consolas (`IDE.14`, `CC-MET.9`, `COL §6`, `COL.8`) deviennent des liens internes vers leur signet ; appele par `construire_support_global.py` et `construire_recueil.py` |
| `indexer.py fichier.docx` | pose les marques d'index (liste : `_support/generateurs/index.txt`) et le champ INDEX |
| `garde.py fichier.docx` | la page de garde dans sa propre section : logo en en-tete, ligne EPHEC en pied de page ; appele par `ajouter_pagination.py`, a lancer AVANT de compter les pages, et seul pour les documents non pagines (demos, mementos, guide) |
| `version_nb.py [--dossier D] fichier.docx` | produit `fichier_NB.docx`, la version noir et blanc pour l'impression (a cote de l'original, ou dans `D` : les supports par module vont dans `_support/supports_par_modules/NB`) ; appele par `construire_recueil.py` et `construire_support_module.py` |
| `construire_support_module.py XXX` | apres toute modification de `_support/generateurs/Support_XXX.md` : regenere `_support/supports_par_modules/Couleur/Support_XXX.docx` (et `NB/`) |
| `construire_recueil.py` | apres toute modification d'un fascicule : reconstruit `enonces/Recueil_des_exercices.docx` (demande `pip install docxcompose`) |
| `extraire_deroule.py` | apres toute modification d'un deck : regenere `_demos/Deroule_des_modules.xlsx`, en gardant les durees saisies |
| `style_documents.py` | juste apres la generation, avant la pagination et `typographie.py` : Cormorant Garamond 11, code en Consolas 9 Accent 2 |
| `typographie.py` | en DERNIER, apres toute regeneration d'un document |
| `ajouter_pagination.py` | apres avoir (re)genere un document Word |
| `reparer_liens.py` | apres avoir edite un memento dans Word |

L'ordre habituel, quand un theme est pret : `verifier_squelettes.py`, puis les
tests dans IntelliJ, puis `livrer.py`.

---

## verifier_squelettes.py — les tests compileront-ils ?

```
python3 __outils/verifier_squelettes.py
python3 __outils/verifier_squelettes.py enu/e03      # un package en particulier
python3 __outils/verifier_squelettes.py --detail     # ce que chaque classe declare
```

Le script parcourt les classes de test et signale chaque methode ou
constructeur appele qui n'est **pas declare** sur la classe concernee.

Il resout le **type du receveur** de chaque appel : une methode declaree dans
`Value` ne satisfait pas un appel sur `Color`. Le signalement nomme donc la
classe, et liste ce qu'elle declare reellement :

```
be/ephec/java/enu/e03/DeckTest.java
   la classe Color n'a pas de methode getLibelle()
   Color declare : (rien)
```

L'option `--detail` affiche, package par package, ce que chaque classe declare.
C'est le moyen le plus rapide de comprendre un signalement qui semble faux :

```
be/ephec/java/enu/e03
   Card            getColor, getValue, toString
   Color           (aucune methode)
   Deck            carteA, shuffle
   Value           getLibelle
```

Quand un type ne peut pas etre resolu, le script le dit plutot que de faire
semblant — mieux vaut un avertissement qu'un faux vert.

Si un signalement vous parait faux, verifiez d'abord la ligne `Projet :` en
tete de sortie, puis lancez `--detail` sur le package concerne.

**Pourquoi c'est vital.** Le source root de test se compile d'un bloc. Une
seule classe de test qui appelle une methode inexistante empeche l'etudiant de
lancer le moindre test — y compris ceux d'un exercice sans rapport, fait trois
semaines plus tot. C'est arrive : `DeckTest` appelait `getLibelle()`, absent du
squelette de `Color`, et plus rien ne demarrait.

La regle qui en decoule : **le squelette declare tout**, avec un corps qui leve
`UnsupportedOperationException`. Seuls les corps sont laisses a l'etudiant.

Le script comprend les composants d'un record, dont les accesseurs sont
generes par le compilateur, et il ignore les commentaires — un
`// TODO : ecrivez getLibelle()` ne compte pas comme une declaration.

Sortie attendue :

```
Tous les appels des classes de test sont declares dans les squelettes.
```

Sinon, il liste les membres a declarer et rend un code d'erreur.

---

## preparer_demo.py — charger une demonstration

```
python3 _outils/preparer_demo.py            liste les demonstrations
python3 _outils/preparer_demo.py poo        charge l'etat de depart
python3 _outils/preparer_demo.py --vider    remet le bac a sable a neuf
```

Le script vide le module `_travail/` et y recopie les sources initiales depuis
`_demos/sources_initiales/<module>/`, qui reprend la structure d'un module
Maven en plus court :

```
jun/
    main/    ->  _travail/src/main/java/be/ephec/java/travail/
    test/    ->  _travail/src/test/java/be/ephec/java/travail/
```

C'est la structure qui decide, et non le nom des fichiers : une classe de test
ne s'appelle pas toujours quelque chose `Test`. Un dossier `test/` vide est
normal.

La classe `Bienvenue` du bac a sable n'est jamais supprimee : elle evite un
module vide et rappelle la commande.

Le scenario correspondant est dans `_demos/Demo_<MODULE>.docx`.

---

## livrer.py — fabriquer les archives d'une seance

```
python3 _outils/livrer.py 1
```

Produit `livraisons/Seance01_POO_exercices.zip` et
`livraisons/Seance01_POO_solutions.zip`. Sans numero de seance, le script
affiche la liste et la demande.

| Option | Effet |
|---|---|
| `--enonces` | seulement l'archive des enonces |
| `--solutions` | seulement l'archive des solutions |
| `--verifier` | controle sans rien produire |

### La seance 0 : le projet de depart

```
python3 _outils/livrer.py 0
```

Produit `livraisons/Seance00_ExercicesJava.zip` : le pom parent, les trois
pom de module, le README, un `.gitignore` propre a l'etudiant et les
documents de reference.

Le README de l'etudiant est **`README_publiable.md`**, copie sous le nom
`README.md`. Le `README.md` du projet de travail ne part jamais. Le script
refuse un `README_publiable.md` qui cite un depot `...Claude` ou un dossier
du professeur (`_outils`, `_todos`...). C'est ce qui va dans la section `General` de Moodle.

Le pom parent y est **filtre** : il ne declare plus le module `_travail`,
qui n'existe pas chez l'etudiant. Laisser la declaration ferait echouer
Maven a l'ouverture du projet.

### Le depot public : --depot

```
python3 _outils/livrer.py 0 --depot               le projet de depart
python3 _outils/livrer.py 3 --depot               les enonces de la seance 3
python3 _outils/livrer.py 3 --depot --solutions   ses corriges et ses demos
python3 _outils/livrer.py 3 --depot /un/chemin    un autre clone que celui par defaut
```

En plus des archives, copie la livraison dans un clone LOCAL du depot public
`github.com/ferrantbe/ExercicesJava`. Sans chemin, le clone est cherche a
`../ExercicesJava`, a cote de ce projet (cle `depot_public` de
`livraisons.json`). Pour les enonces, le fascicule du theme part avec le code.

**Le script ne commite et ne pousse rien.** Il liste ce qui est ajoute ou
remplace, puis affiche les quatre commandes Git a lancer apres relecture.

**Les corriges ne partent qu'avec `--solutions`.** Sans l'option, seuls les
enonces sont deposes, meme si les deux archives ont ete fabriquees.

**Le depot public n'a aucun historique commun avec celui-ci.** C'est la
regle qui protege les corriges : un push ou un fork depuis le depot prive
emporterait tout son historique, corriges compris, meme absents des fichiers.
Le depot public n'est donc alimente que par ce script.

Les garde-fous :

| Controle | Ce qu'il empeche |
|---|---|
| origine contenant `Claude` | deposer dans un depot prive |
| dossier sans `.git`, ou lie a ce projet | deposer au mauvais endroit |
| chemin commencant par `_` | publier un dossier du professeur |
| reverification de tout `exercices/` du depot | publier un corrige, d'ou qu'il vienne |
| fichier deja publie et different | un correctif silencieux : il est signale en jaune |

Un fichier deja publie qui change provoquera un conflit chez l'etudiant qui
l'a modifie. Le script le signale ; annoncez le correctif sur le forum en
nommant les fichiers.

### Deplacer un theme dans le calendrier

Editer `livraisons.json` et deplacer le code du theme d'une seance a l'autre.
Aucun renommage de package, aucune reecriture d'enonce : c'est tout l'interet
de la numerotation par theme.

### Les demonstrations ne partent qu'avec les solutions

Le module `demos/` suit la meme regle que les corriges : il n'est inclus que
dans l'archive des solutions. Publier une demonstration avant la seance la
viderait de son sens, puisque tout son interet tient a la construction en
direct.

Le script prend les sources principales ET les classes de test :
`demos/src/main/java/…/demo/<theme>/` et `demos/src/test/java/…/demo/<theme>/`.
La demonstration du theme JUN construit une classe de test en direct, et la
livrer sans elle n'aurait aucun sens.

Un module sans demonstration ne pose aucun probleme : le script ne dit rien si
les dossiers n'existent pas.

Le SCENARIO de chaque demonstration vit ailleurs, dans `_demos/`, en Markdown.
Il ne part jamais : c'est votre texte, pas le leur.

### Les tests sont recopies automatiquement

Les classes de test s'ecrivent **uniquement** dans `exercices/src/test`. A
chaque execution, le script les recopie vers `solutions/src/test` : c'est ce
qui permet de verifier dans IntelliJ qu'une solution passe au vert avec les
memes tests que l'etudiant. Toute modification faite du cote `solutions/` sera
ecrasee au passage suivant.

### Ce que les controles attrapent

| Controle | Ce qu'il empeche |
|---|---|
| fuite de solution | livrer une solution restee dans `exercices/` |
| solution inachevee | publier une solution qui leve encore `UnsupportedOperationException` |
| tests manquants | oublier une classe de test (avertissement seulement) |

Le troisieme est un avertissement volontaire : POO.4 n'a legitimement pas de
test, et d'autres exercices seront dans ce cas.

### Extraction cote etudiant

Les archives contiennent un dossier racine `ExercicesJava/`. L'etudiant les
extrait donc dans le dossier **parent** de son projet, et les arborescences
fusionnent. Voir la section correspondante du README a la racine.

---

## ajouter_pagination.py — le pied de page numerote

```
python3 _outils/ajouter_pagination.py enonces/par_module/TAB_enonces.docx "TAB" 6
```

Trois arguments :

| Argument | Role | Exemple |
|---|---|---|
| le fichier | le `.docx` a paginer, modifie sur place | `enonces/par_module/TAB_enonces.docx` |
| le prefixe | ce qui precede le numero, entre guillemets | `"TAB"`, `"Clean Code"` |
| le total | facultatif : le nombre de pages **numerotees** | `6` |

Le document est coupe en deux sections au premier saut de page : la couverture
n'est pas numerotee, la page suivante porte le numero 1, et le total ne compte
pas la couverture. Le pied de page est centre et donne `TAB 1 / 6`.

**Le troisieme argument.** Le total utilise le champ Word `SECTIONPAGES`, que
Word recalcule tout seul. Les lecteurs qui ne l'evaluent pas — LibreOffice,
certains visionneurs PDF — affichent la valeur mise en cache dans le fichier.
Donner le vrai nombre de pages evite qu'ils montrent un total faux. Omettez-le
et ils afficheront 1 ; Word, lui, sera correct dans les deux cas.

Pour connaitre ce nombre : ouvrez le document, regardez le nombre de pages, et
retranchez 1 pour la couverture.

**Le script travaille sur le fichier existant**, il ne le regenere pas : vos
retouches faites a la main dans Word sont conservees. Relance sur un document
deja pagine, il ne fait rien et le dit.

### Les dix documents et leur prefixe

```
enonces/par_module/POO_enonces.docx           "POO"
enonces/par_module/TMP_enonces.docx           "TMP"
enonces/par_module/PKG_enonces.docx           "PKG"
enonces/par_module/TAB_enonces.docx           "TAB"
enonces/par_module/ENU_enonces.docx           "ENU"
enonces/par_module/ABS_enonces.docx           "ABS"
enonces/par_module/ITF_enonces.docx           "ITF"
enonces/par_module/REC_enonces.docx           "REC"
documents/Codes_du_cours.docx      "Codes"
documents/Memento_Clean_Code.docx  "Clean Code"
documents/Memento_Technique.docx   "Technique"
documents/Guide_IntelliJ.docx      "Guide IntelliJ"
```

---

## reparer_liens.py — les renvois internes des mementos

```
python3 _outils/reparer_liens.py documents/Memento_Clean_Code.docx
```

Accepte plusieurs fichiers a la suite.

**Le probleme.** Les trois documents de reference sont truffes de renvois
internes : le sommaire pointe vers chaque section, et les sections se citent
entre elles. Ces renvois reposent sur des signets Word, et **Word en perd a
l'enregistrement**. Sur le memento Clean Code, 16 des 33 signets avaient
disparu apres une seule passe d'edition, et tous les liens correspondants
retombaient en tete du document.

Le script retire les anciens signets, en repose un sur chaque titre de section
et verifie que chaque renvoi trouve sa cible :

```
Memento_Clean_Code.docx : 33 anciens signets retires, 33 reposes
  tous les renvois pointent vers une section existante
```

Il reconnait les nomenclatures des trois documents : `CC-NOM.1`, `TEC-FX.2`,
`IDE.28`, `ERR.8`.

**A lancer apres chaque edition manuelle**, puis verifier un lien situe en fin
de document : c'est la que les pertes commencent.

---

## Un cas particulier a connaitre

`ajouter_pagination.py` et `reparer_liens.py` travaillent tous deux sur le XML
du `.docx`. Ils sont compatibles et l'ordre n'importe pas, mais chacun doit
etre relance apres une regeneration du document, car celle-ci repart d'une
version sans pied de page et avec des signets neufs.


---

---

## Les outils du fil rouge sont partis avec lui

`etats_gamehub.py`, `depot_gamehub.py` et `diagrammes_gamehub.py` vivent
desormais dans le projet `GameHubClaude`, avec le code qu'ils servent. Voir
son `_outils/README_gamehub.md`.


---

## Un exercice sans squelette : ABS.5

`ABS.5` est le seul exercice du recueil ou **rien n'est fourni** : l'etudiant
part d'un `Programme` vide et concoit la hierarchie lui-meme.

Sa classe de test est livree **entierement en commentaire**, et l'enonce demande
de la decommenter une fois les classes ecrites. Sans cela, elle ne compilerait
pas — et un seul fichier fautif bloque tout le module.

Deux consequences pour les outils :

- `livrer.py` ne controle que l'arbre `src/main`. Un fichier de test commente
  ne le gene pas, et le package ne contient qu'un `Programme` portant un TODO.
- `verifier_squelettes.py` analyse le test commente comme un fichier vide : il
  n'y trouve aucun appel, donc aucun membre a declarer. C'est correct, mais cela
  veut dire que **ce test-la n'est verifie par aucun outil**. Il a ete controle a
  la main : les noms qu'il emploie correspondent aux classes du corrige, et le
  corrige compile et s'execute.

Si vous modifiez `ABS.5`, verifiez a la main que le test decommente correspond
toujours au corrige.

## Ce que verifier_squelettes.py a longtemps rate

Il ne cherchait que les **appels de methode**. Un test qui lit une constante —
`Reservation.PLACES_MAX` — lui etait invisible, et le squelette ne compilait
pas : le defaut n'est apparu qu'au premier lancement des tests, chez le
professeur.

Il verifie desormais aussi les **acces aux champs**, y compris les constantes
d'enumeration.

**Un champ ne se traite pas comme une methode.** Une methode a completer recoit
un corps qui leve `UnsupportedOperationException` ; un champ, lui, doit etre
declare avec une valeur — il ne peut rien lever. Dans un squelette, on le
declare donc en entier, avec une valeur volontairement fausse et un TODO qui le
dit.

## verifier_renvois.py — les renvois vers les mementos

```
python3 _outils/verifier_renvois.py              les erreurs
python3 _outils/verifier_renvois.py --couverture ce qui n'est jamais cite
python3 _outils/verifier_renvois.py --par-module combien par fascicule
```

Les fascicules citent les mementos par code : `CC-NOM.7`, `TEC-EXE.2`. Rien
ne garantissait que le code existe, ni qu'il dise ce que le renvoi pretend.

Deux fautes sont possibles, et les deux etaient presentes :

- un code **inexistant** — `TEC-EXC.2` et `TEC-IDE.6` renvoyaient a des
  sections qui n'ont jamais existe ;
- un code **existant mais mal decrit** — `CC-MET.7` etait presente comme
  « une methode agit ou repond », qui est le titre de `CC-MET.8`.

La premiere se detecte seule. La seconde demande de comparer le libelle du
renvoi au titre de la regle : le script rapproche les deux textes et laisse
juger.

### Le contenu qui ne figure nulle part

Un generateur empile ses paragraphes dans une liste, puis appelle
`Packer.toBuffer` pour fabriquer le fichier. **Une ligne ajoutee apres cet appel
s'execute sans erreur et n'apparait nulle part** : la liste est deja consommee.

Trois renvois ont vecu deux jours dans cet angle mort. Ils figuraient dans le
generateur — donc l'outil, qui lit les generateurs, les comptait — et ils etaient
absents des documents.

`verifier_renvois.py` signale desormais ce cas.

### Le registre des reformulations

Un renvoi ne recopie pas le titre de la regle, il la reformule pour son
contexte. `_outils/renvois_valides.txt` liste les reformulations deja
relues, pour que l'outil ne les signale plus. Sans ce registre, neuf faux
positifs permanents apprendraient vite a ne plus lire sa sortie.

Le meme fichier explique, en commentaire, quelles regles ne sont
**volontairement** citees nulle part.

---

## generateurs/ — d'ou viennent les documents

Les dix-neuf scripts qui produisent les fascicules, les mementos, le guide,
les scenarios de demonstration et le tableau de bord.

```
node _outils/generateurs/build_sta.js          un fascicule
node _outils/generateurs/build_demos4.js       trois scenarios
python3 _outils/generateurs/build_objectifs.py le tableau de bord
```

Chaque script ecrit directement au bon endroit du projet. Une exception :
`build_guide_intellij.js` a besoin des captures d'ecran, qui ne sont pas
dans le projet — elles pesent trop, et elles doivent de toute facon etre
refaites sur votre machine. Donnez leur chemin dans la variable
d'environnement `CAPTURES`.


---

## _captures/ — les images du guide IntelliJ

Dix-neuf captures, `ide-04` a `ide-27`. Elles sont **dans le projet** desormais :
le guide etait le seul document qu'on ne pouvait pas regenerer, parce que ses
images vivaient ailleurs et que leurs tailles etaient consignees a la main dans
un `tailles.json` absent lui aussi.

Le generateur les **mesure tout seul** : l'en-tete d'un PNG porte ses dimensions,
quatre lignes suffisent a les lire. Ajouter une capture ne demande donc plus de
completer un tableau.

```
node _outils/generateurs/build_guide_intellij.js
```

Sans une image, le guide se construit quand meme et marque l'emplacement en
rouge. C'est voulu : on veut pouvoir relire le texte avant d'avoir refait les
captures.

**Refaites-les sur votre machine avant la rentree.** Celles-ci viennent d'un
macOS ; les etudiants travaillent sous Windows, et les libelles d'IntelliJ
bougent d'une version a l'autre.


---

## Les fascicules renvoient a un memento commun

Deux pages identiques — lancer les tests, lire un test vert, laisser son code
compilable — etaient repetees dans les quinze fascicules. Elles vivent
desormais dans `documents/Memento_Exercices.docx`, et chaque fascicule y
renvoie en trois lignes.

Consequence : **une correction a ces deux pages ne se fait plus qu'a un
endroit**. C'est `build_memento_exercices.js` qui les produit.

Les codes du tableau d'ouverture sont **cliquables** et menent a l'exercice.
Le mecanisme tient en deux fonctions de `boite.js` : `h1()` pose un signet
quand son titre commence par un code d'exercice, et `tableau()` fabrique le
lien quand on lui passe `true` en cinquieme argument.

Un signet plutot qu'un numero de page : le numero bougerait a la premiere
image ajoutee.

**Les trois generateurs autonomes portent leur propre copie de ce mecanisme**
— `build_poo.js`, `build_pkg_tmp.js`, `build_tab_enu.js` — pour les signets des
titres. La page de garde et l'introduction, elles, viennent desormais de
`boite.js` dans les quinze fascicules (16/10/2026) : `couverture()` pose le logo
de l'EPHEC, `modeEmploi()` l'encadre gris clair (presentation du theme et
structure d'un exercice), puis le tableau des exercices. Les titres de section
communs sont dans `TITRES`.

Le logo (`generateurs/logo_ephec.png`) est repris de la page de garde de
l'examen. Les demonstrations et les documents generaux le recoivent aussi, par
`logo()` ; leurs fichiers ayant parfois ete retouches dans Word, il y a ete
pose dans les `.docx` existants plutot qu'en les regenerant.

## Le tableau de bord se compte tout seul

Trois colonnes de la feuille `Modules` — exercices, tests, renvois memento —
etaient ecrites a la main dans `build_objectifs.py`. **Huit themes sur quinze
avaient fini par mentir** : un exercice ajoute ici, un renvoi la, et personne
pour tenir le compte.

Elles se mesurent desormais a la generation : les packages sur le disque, les
classes de test, et les codes de memento presents dans le fascicule deja
produit. Les valeurs ecrites dans `MODULES` ne servent plus que de secours
quand un fascicule n'existe pas encore.

La feuille `Verifications`, elle, se tient a la main — c'est un journal, pas
une mesure. Elle distingue ce qui est **livre** de ce qui est **teste**, deux
choses qu'on confond facilement : tout le recueil etait livre depuis des jours
sans avoir jamais ete lance.

## dossier_module.py — un dossier par module

```
python3 _outils/dossier_module.py                      tous les modules
python3 _outils/dossier_module.py ABS PKG              seulement ceux-la
python3 _outils/dossier_module.py --etudiant           sans les corriges
python3 _outils/dossier_module.py --decks /chemin      en joignant les decks
```

Rassemble dans un zip tout ce qui concerne un module : le deck, le fascicule,
les squelettes et leurs tests, les corriges, le scenario de demonstration avec
ses deux etats du code, et les quatre documents de reference.

**Deux versions, et il ne faut pas les confondre.** Par defaut c'est le dossier
du PROFESSEUR, corriges compris. Avec `--etudiant`, les corriges et la
demonstration sont retires. Les noms de fichiers different — `_professeur` ou
`_etudiant` — pour qu'on ne puisse pas distribuer l'un pour l'autre.

**Ce n'est pas `livrer.py`.** Celui-la livre par SEANCE, et une seance porte
parfois quatre themes ; il ne joint ni les fascicules ni les decks. Les deux
coexistent : l'un prepare une seance, l'autre la distribue.

**Les decks vivent ailleurs**, produits par `construire_deck.py` dans un autre
projet. Donnez leur dossier avec `--decks`. Sans cela, le zip est quand meme
produit et un `A_VENIR.txt` prend la place du deck — le script doit rester
relancable au fur et a mesure que les decks arrivent.

## La fabrique des slides vit ici aussi

`_slides/` contient le moteur de generation des decks, les seize
`module_xxx.py`, les seize scenarios, les douze decks sources et **les seize
decks produits**, dans `generes/`. Rien ne s'y compile : ce dossier est
independant du projet Maven.

Les seize decks existent depuis le 11/10. `STA` n'en a pas : ses deux
exercices sont couverts par la section 4 du deck `POO`, et c'est voulu.
`FX` en a deux — `FX1` pour les evenements, `FX2` pour les proprietes et
l'architecture.

Il y vit pour une raison : un deck, un fascicule et une demonstration parlent
du meme module. Les separer, c'est les laisser diverger — ce qui est arrive en
septembre, quand sept conversations ont fait vivre sept copies du moteur et que
l'une a perdu une entree sans qu'aucun message ne le signale.

**Deux choses n'y sont pas, et ne peuvent pas y etre** : le `gabarit_deck.pptx`
et les anciens decks `dNN.pptx`. Ce sont des binaires, et la base de
connaissances du Projet n'en conserve que le texte extrait.

**La table de correspondance est dans `_slides/LISEZ_MOI.md`**, etablie le
10/10 en LISANT les douze decks. Elle corrige une reconstitution anterieure qui
etait fausse sur quatre points : `d08a` et `d08b` sont un seul fichier de 98
slides, `d02b` n'existe pas, `d04` manquait a la liste, et un deck nourrit
souvent plusieurs themes — `d04` en sert trois, et les increments GameHub
`G.14`-`G.20` figurent dans deux decks differents.

## Un generateur par module

Les quinze demonstrations etaient produites par quatre fichiers groupes
arbitrairement — `build_demos.js` a `build_demos4.js`, de trois a six modules
chacun. C'est devenu `build_demo_abs.js`, `build_demo_col.js`, et ainsi de
suite : **un fichier par module**, comme pour les slides.

Le decoupage a ete verifie en comparant les quinze documents AVANT et APRES,
caractere par caractere. Treize identiques, deux differents d'un seul
caractere — et ce caractere a revele un defaut, raconte ci-dessous.

**Les fascicules restent groupes** par paires : `build_abs_itf.js`,
`build_col_exc.js`, `build_jun_gen.js`, `build_lam_fic.js`, `build_pkg_tmp.js`,
`build_tab_enu.js`. Le meme decoupage leur ferait du bien, mais ils sont bien
plus intriques que les demonstrations.

**Le registre `renvois_valides.txt` est indexe par nom de fichier.** Renommer
un generateur y perime ses entrees — c'est arrive ici, et il a fallu les
reinscrire. A savoir avant de renommer quoi que ce soit.

## typographie.py epargne le code depuis le 10/10

L'outil posait des espaces insecables **a l'interieur du code Java** :

```
for (Contact contact : carnet)
                     ^ ici
```

Soixante-huit cas dans douze documents. Le deux-points d'un for-each, d'un
ternaire ou d'un label n'a rien a voir avec la typographie francaise.

Il ignore desormais tout run en police `Consolas`. Le defaut n'a ete trouve
qu'en comparant deux generations du meme document : aucun controle ne le
voyait, et il etait invisible a la lecture — un espace insecable ressemble a
un espace.

## verifier_comptes.py — le tableau des themes dit-il la verite ?

```
python3 _outils/verifier_comptes.py
```

`Codes_du_cours` annonce un nombre d'exercices par theme. Rien ne garantissait
qu'il suive : **PKG est reste a 4 pendant plusieurs jours apres l'ecriture de
PKG.5**, et personne ne l'a vu. Le fil rouge, lui, etait annonce « G.1 a G.20 »
alors qu'il compte trente increments.

Le script compte les packages sur le disque, lit le nombre d'increments dans le
projet GameHub voisin, et compare aux valeurs du document. REC est ignore : il
porte « a definir », et c'est voulu tant que la seance 13 n'est pas arretee.


---

## typographie.py — les conventions francaises, automatiquement

```
python3 _outils/typographie.py documents/*.docx enonces/*.docx
python3 _outils/typographie.py --simulation enonces/par_module/POO_enonces.docx
```

Deux transformations qui se faisaient a la main.

### Un incident a ne pas reproduire

La premiere version de ce script employait un analyseur XML. Elle a **casse les
vingt-deux documents** : Word annoncait « du contenu illisible » et refusait
parfois de les ouvrir.

La cause n'a rien d'evident. Le `document.xml` d'un `.docx` declare une dizaine
d'espaces de noms — `mc`, `r`, `wp`, `a`, `pic`, `w14`… Un analyseur qui n'en
connait qu'un renomme les autres en `ns1`, `ns2`, et supprime au passage
l'attribut `mc:Ignorable` qui les designe par leur prefixe d'origine. Le fichier
reste du XML parfaitement valide, et Word n'en veut plus.

**Le controle de validation ne l'a pas vu** : il verifie la structure, pas la
tolerance de Word. Si vous ecrivez un outil qui touche a un `.docx`, verifiez
apres coup qu'il ne reste ni `ns1:` ni `ns2:` dans le `document.xml`, et que
`mc:Ignorable` y figure toujours.

Le script travaille desormais sur le TEXTE du document et ne reecrit que ce
qu'il change. Tout le reste ressort octet pour octet.

**Les espaces insecables** devant `:` `;` `?` `!` `»` et derriere `«`. Sans eux,
Word peut renvoyer un deux-points seul a la ligne suivante.

Le piege est invisible a la lecture du code : dans un `.docx`, un paragraphe est
decoupe en *runs*, et chaque changement de mise en forme en ouvre un nouveau.
L'espace et le signe se retrouvent donc souvent dans deux elements `<w:t>`
differents, et un chercher-remplacer ordinaire les rate. Le script recolle les
elements d'un meme paragraphe avant de chercher.

**Les en-tetes de tableau** dont seule la premiere cellule porte du texte sont
fusionnes, largeurs additionnees. Sur le memento Clean Code, neuf titres
passaient sur deux lignes dans une colonne etroite alors que la place etait a
cote.

### A lancer en dernier

C'est un post-traitement, comme `ajouter_pagination.py` : **regenerer un
document efface son effet**. L'ordre est donc toujours le meme.

```
node _outils/generateurs/build_xxx.js     # le document
python3 _outils/ajouter_pagination.py …   # la pagination
python3 _outils/typographie.py …          # la typographie
```

Le script est **idempotent** : le relancer ne change rien. Il conserve chaque
fichier d'origine en `.docx.avant` — pensez a les supprimer une fois le
resultat verifie.
