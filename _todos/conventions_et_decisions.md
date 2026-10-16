# Conventions et décisions — cours de Java IN2

*Document destiné à la base de connaissances du Projet. Il porte ce qui ne
se déduit pas des fichiers : les règles qu'on s'est données, les décisions
prises, et celles qui attendent. Mis à jour le 12/10/2026.*

---

## À quoi sert ce document

Une conversation par module devient vite illisible si chacune doit
redécouvrir les règles du projet. Celui-ci les rassemble en quelques pages,
pour qu'une discussion neuve démarre informée.

Les trois autres documents de la base de connaissances ont un rôle
distinct : `todo_refonte_cours_java.md` liste ce qui reste à faire,
`todo_qui_bloque.md` ce qui attend une décision, et
`renumerotation_exercices.md` la correspondance avec l'ancienne
numérotation.

---

## Les trois projets

| Projet | Ce qu'il contient |
|---|---|
| `ExercicesJavaClaude` | le recueil : 71 exercices sur 15 thèmes, 5 documents de référence, 15 fascicules, 15 démonstrations, les outils |
| `GameHubClaude` | le fil rouge : 30 incréments, 3 documents, un dépôt Git généré |
| `DemineurClaude` | un exercice facultatif, projet JavaFX autonome |

Ils sont séparés parce qu'ils n'obéissent pas aux mêmes règles. La
numérotation du recueil est **thématique** (`EXC.3` est le troisième
exercice du thème Exceptions, quelle que soit la séance) ; celle du fil
rouge est **séquentielle** (`G.7` dépend de `G.6`).

---

## Les conventions du code

**Aucun accent dans les chaînes Java.** Ni dans les commentaires. Le code
affiche `Gagne !`, pas `Gagné !`. Décision ancienne, appliquée partout ;
la changer serait un chantier global, pas une retouche.

**Un squelette compile dès le premier instant.** Tout membre appelé par une
classe de test est déclaré. Une méthode reçoit un corps qui lève
`UnsupportedOperationException` ; **un champ, lui, se déclare avec une
valeur** — il ne peut rien lever. C'est ce qui a manqué à `STA.1`, découvert
au premier lancement des tests.

**Chaque exercice est autonome.** Son package contient tout ce dont il a
besoin et n'importe jamais une classe d'un autre exercice. Quand un exercice
reprend une classe du précédent, il en repart d'une copie.

**Les dossiers préfixés `_` ne se distribuent pas.** `_outils`, `_demos`,
`_todos`, `_objectifs`, `_corrige`, `_captures`.

**Une classe fournie porte la mention `FOURNIE`** dans son en-tête. C'est ce
que `livrer.py` vérifie pour distinguer un corrigé oublié d'une classe
volontairement complète.

**Un programme annonce ce qu'il fait** avant de poser une question. Règle
appliquée le 15/09 à sept programmes qui questionnaient sans se présenter.

**Pas de nombre magique dans les programmes de démonstration.** Les bornes
sont des constantes nommées, et les mêmes constantes servent aux messages —
sinon le message ment le jour où la valeur change.

---

## Les conventions des documents

**La chaîne est à trois temps, toujours dans cet ordre :**

```
node _outils/generateurs/build_xxx.js     le document
python3 _outils/ajouter_pagination.py …   la pagination
python3 _outils/typographie.py …          les espaces insécables
```

**Régénérer efface les deux derniers.** C'est le piège principal.

**Ne jamais faire passer un `.docx` par un analyseur XML.** Le
`document.xml` déclare une dizaine d'espaces de noms ; un analyseur qui n'en
connaît qu'un renomme les autres en `ns1`, `ns2`, supprime `mc:Ignorable`, et
Word refuse d'ouvrir le fichier. Les outils travaillent sur le **texte** du
document. Le contrôle de validation ne voit pas ce défaut.

**Les espaces insécables se posent à la source**, dans `boite.js`, devant
`:` `;` `?` `!` `»` et derrière `«`. Le code monospace est épargné.

**Les captures d'écran** vivent dans `_captures/` et sont mesurées
automatiquement. Trois exigences : PNG sans transparence, aucun chemin
personnel visible, et une fenêtre IntelliJ **étroite** — c'est sa largeur qui
décide de la taille du texte imprimé, pas la résolution.

---

## Les conventions du fil rouge

**Le code porte son historique** par des marqueurs `//@G.n` invisibles à la
compilation.

| Forme | Portée |
|---|---|
| `//@G.14` seul sur sa ligne | le bloc qui suit |
| `//@G.21` en fin de ligne | cette ligne |
| `//@G.2-G.6 <code>` en début de ligne | une variante gardée en commentaire |

**La règle absolue : le fichier doit rester compilable.** Deux signatures en
clair ne sont pas du Java valide — la première version de cette convention
l'a appris à ses dépens.

**Git est un produit, pas la source.** Le dépôt est régénéré à partir du code
annoté. Corriger une faute à `G.30` demanderait sinon un rebase sur vingt
commits.

---

## Les outils de vérification

À lancer après toute modification. Chacun est né d'un défaut réel qui avait
échappé à la relecture.

| Outil | Ce qu'il attrape |
|---|---|
| `verifier_squelettes.py` | un membre appelé par un test et non déclaré, **champs compris** |
| `verifier_renvois.py` | un renvoi vers une règle inexistante, un libellé faux, **du contenu poussé après la construction du document** |
| `verifier_comptes.py` | un tableau de thèmes qui ne correspond plus au disque |
| `livrer.py <n> --verifier` | une fuite de solution, une solution inachevée |
| `etats_gamehub.py --verifier` | **compile les 30 états** du fil rouge |

---

## Ce qui reste indécis

**`REC` : la formule est arrêtée, le contenu non.** La séance 13 combinera
un **examen d'une année précédente** et des **exercices récapitulatifs** —
décidé le 11/10. L'examen précédent couvre le terrain tout de suite ; les
récapitulatifs restent à écrire, et aucun ne l'est à ce jour.

**La séance 13 et `REC`, le détail.** Quatorze séances de 18h00 à 21h15, pause de vingt
minutes — donc deux blocs de 95 et 80 minutes. Un examen blanc complet
(2h30) n'y tient pas : il se fera à la maison, la séance 14 servant à sa
correction. Six exercices `REC` sont prévus, un par question d'examen,
**livrés en projets séparés avec leurs tests non commentés**. Bloqué par la
durée de l'examen — 2h30 pour 5 questions aujourd'hui, une sixième demande
3h ou des questions plus courtes.

**La distribution du dépôt Git.** Le cours avait décidé « pas de Git pour les
étudiants ». Le dépôt existe, avec sa notice. Point bloquant à vérifier :
Git est-il installé sur les postes de l'école ?

**L'ordre des modules — réglé le 11/10.** `PKG` descend après `ABS` et
`ITF`, `FIC` remonte avec `LAM`. L'ordre vit en deux endroits qui
concordent désormais : la numérotation des decks dans `_slides/generes/`
et la table `_outils/livraisons.json`. **Si l'un change, l'autre doit
suivre** — ils se sont contredits une fois.

Quatorze séances, plus aucune vide. Les anciennes séances 4 et 10, qui
l'étaient depuis septembre, ont été absorbées.

**La distribution aux étudiants — orientée le 11/10.** Moodle reste le
canal principal : une section `Général`, puis une section par séance
(`Cours01`, `Cours02`…), avec l'archive de `livrer.py` et les corrigés
publiés par restriction de date. En parallèle, trois dépôts GitHub
**publics** (`ExercicesJava`, `GameHub`, `Demineur`) pour ceux qui veulent
cloner, distincts des trois dépôts de travail `…Claude`, qui repassent en
privé avant la première séance. Le public n'a aucun historique commun avec
le privé : il est alimenté par copie (`livrer.py --depot`). Restent ouverts :
le canal des corrigés côté Git, la forme publique de GameHub et du
Démineur, et la présence de Git sur les postes de l'école.
`dossier_module.py` sert à préparer, pas à distribuer.

**Le classement de `FIC` — réglé le 11/10.** Passé de `Should` à `Must`,
ses trois exercices avec, puisqu'il vaut un sixième de l'examen.

---

## Le poids du dépôt

331 Mo au 11/10, dont 158 de `.git` : 65 Mo de decks sources, 39 de decks
produits, le reste en documents et captures. Décision du 11/10 : **tout
reste dans le dépôt**, la cohérence valant mieux que la légèreté.

Conséquence à connaître : Git garde chaque version pour toujours. Supprimer
des versions intermédiaires est possible, mais cela **réécrit l'historique**
et oblige tous les clones à repartir de zéro.

La marche à suivre, testée, est dans
`_slides/generes/RETIRER_VERSIONS_INTERMEDIAIRES.md`. **Seuil retenu : agir
quand `.git` dépasse 500 Mo** — la moitié du gigaoctet que GitHub recommande
de ne pas dépasser. Une régénération complète des seize decks ajoute environ
39 Mo, ce qui laisse une dizaine de passages avant d'y arriver.

---

## Ce qui a été vérifié, et ce qui ne l'a pas été

**Tout est à revérifier.** Le professeur reprend l'ensemble à partir du
11/10 : la feuille `Verifications` du tableau de bord a été remise
entièrement à « à faire ». Les vérifications de septembre portaient sur un
état antérieur aux seize decks, aux cinq nouveaux incréments GameHub et à
l'énoncé du démineur.

**Jamais vérifié, même en septembre** : les 10 tests du démineur et le jeu
lui-même ; `FX.8`
(bindings), écrit le 11/10 sans JavaFX disponible, ni compilé ni lancé.

**Une limite permanente côté Claude** : ni JUnit ni JavaFX ne sont
disponibles dans l'environnement. Tout ce qui touche à ces deux-là doit être
éprouvé sur la machine du professeur, et les réserves sont signalées dans les
réponses.

---

## Les decks remaniés et le support imprimable

**Les decks retouchés à la main vivent dans `_slides/remanies/`.** Le
professeur y reprend les decks générés : reformulation, éléments graphiques,
animations. Un deck remanié devient la référence : le régénérer avec
`construire_deck.py` effacerait les retouches. `_slides/generes/` garde la
version produite par le moteur, pour pouvoir comparer les deux. INI est le
premier deck remanié, le 12/10.

**Les puces sont formulées en phrases**, souvent précédées d'une phrase
d'introduction qui donne le contexte. Des puces trop courtes paraissent
sèches. Choix confirmé le 12/10 sur INI, à suivre pour les modules suivants.

**Le professeur adapte le texte des slides, pas les notes.** Les notes
portent la prose du support imprimable. Claude relit chaque deck remanié et
propose les mises à jour des notes quand elles ne concordent plus avec les
slides.

**Le support imprimable : un document unique pour la théorie de tous les
modules.** Les mémentos et documents techniques vont dans un second document
général (décidé le 12/10). La rédaction attend la fin de la révision des
slides. Seul existe un test sur POO, de septembre, dont les scripts n'ont
jamais été versés au dépôt.

---

## Le traitement des images dans les decks

**Images sous licence CC** : créditer l'auteur, la licence avec un lien vers
son texte, et la source, en ajoutant « recadrée » ou « modifiée » si on a
touché à l'image. Exemple, sous la photo de la slide Clean Code d'INI :
« By Angelacleancoder - Own work, CC BY-SA 4.0,
https://commons.wikimedia.org/w/index.php?curid=88628927 - recadrée », en
8 pt, avec un lien hypertexte sur « CC BY-SA 4.0 ».

**Images décoratives** : clic droit, Texte de remplacement, cocher « Marquer
comme élément décoratif ». Ce qui est marqué ainsi reste hors du support.

---

## Décisions des 14 au 16 octobre 2026

Toutes ces règles sont appliquées par les outils : `mettre_aux_normes.py` pour
les decks déjà remaniés, `finaliser_deck.py` pour les decks générés.

### Mise en forme des slides

| Règle | Outil |
|---|---|
| **Code trop large** : une zone de code pleine largeur ne laisse pas plus de 20 % de vide à droite de sa plus longue ligne ; sinon elle est rétrécie à son contenu (plus 10 %) et centrée. Une zone chevauchée par une annotation n'est pas déplacée. | `_outils/ajuster_code.py` |
| **Tableaux en bandeaux sombres** : chaque ligne forme un groupe et apparaît au clic, balayage depuis la gauche ; l'en-tête et la phrase d'introduction restent visibles. | `_outils/animer_lignes.py` |
| **Phrase d'introduction d'un tableau** : une phrase écrite dans le scénario juste avant un tableau devient une introduction au-dessus de lui. | `construire_deck.py` |
| **Bandeau des intercalaires** : 3,07 cm de haut à 66 pt, proportionnel à la taille (2,81 cm à 60 pt, 2,30 cm à 48 pt), position haute 2,63 cm. | `_slides/mise_en_forme.py` |
| **Slides d'exercices** : seules les slides titrées « Exercices » ou « Le fil rouge » sont traitées comme telles. | `_outils/organiser_exercices.py` |

### Le code des slides

* Le code montré dans les slides existe en fichiers exécutables, dans le projet
  `demos`, package `be.ephec.java.demo.<thème>.slides` (tests dans
  `src/test/.../<thème>/slides`). Chaque programme se termine par un
  commentaire « Sortie attendue » ; « Entree : » donne la saisie clavier, et
  une ligne attendue commençant par `~` est une expression régulière.
* `_outils/verifier_demos_slides.py` compile, exécute et compare ; les tests
  JUnit passent par une doublure. JavaFX n'est pas vérifiable ici : signalé.
* **Jamais le code d'un corrigé** : les slides qui reprennent une solution
  d'exercice n'ont pas de code exécutable.
* Le code des slides part **avec l'archive de la séance**, pas avec les
  solutions (`livrer.py`). Chaque note concernée se termine par « Le code
  complet, à exécuter : demos, classe … ».
* Couvert : 15 thèmes. **PKG laissé de côté** (décidé) : ce deck se montre
  mieux en provoquant les erreurs de visibilité en direct.

### Les illustrations

* Catalogue : `_illustrations/illus_generees/Illustrations_sections.xlsx`, une
  ligne par intercalaire, prompt complet, fichier, statut.
* Tous les prompts : format 16:9 et bloc « tiers supérieur vide ».
* Les images du dépôt sont en **JPEG** (qualité 90), jamais en PNG.
* Image reprise d'un site : créditer auteur, source et licence.

### Le dépôt

* Nettoyé le 15/10/2026 : de 689 à 255 Mo (procédure et pièges dans
  `_slides/generes/RETIRER_VERSIONS_INTERMEDIAIRES.md`).
* `_slides/generes/` ne garde que les decks pas encore remaniés ; tous le sont
  depuis le 16/10/2026, les autres se régénèrent par le moteur.
* Ne pousser que les versions de decks qui comptent ; les archives de Claude
  ne contiennent que les fichiers modifiés.

### FX : la calculatrice guidée

* Nouveau deck **FX3, « La calculatrice, pas à pas »**, tiré de l'ancien deck
  09 (slides 24 à 74), réécrit pour le projet Maven et aligné sur le corrigé.
* **FX.9 devient un exercice guidé** par ce deck : le FXML n'est plus fourni
  (le squelette ne contient que la racine) ; le corrigé contient le FXML que
  construit le deck.
