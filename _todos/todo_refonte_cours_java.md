# Refonte du cours Java IN2 — liste des choses à faire

Dernière mise à jour : 10 septembre 2026 — ménage terminé, mémento Clean Code terminé (33 règles), thèmes TMP et PKG livrés, deck Clean Code supprimé, trois mémentos écrits, neuf séances sur onze livrables.
Année visée : 2026-2027, 14 séances du 19/01 au 18/05/2027, examen le 08/06.
Dix-neuf semaines avant la première séance.

---

## 0. Conventions arrêtées — à respecter partout

Ce bloc n'est pas une tâche, c'est le référentiel. Toute production nouvelle
s'y conforme.

* **Numérotation thématique**, jamais par séance
  * `EXC.3`, `COL.1`, `FX.4` — le préfixe encode le sujet, pas le rang
  * le fil rouge garde `G.1 … G.n` séquentiel, son ordre étant imposé par les dépendances
  * un même mot désigne le thème partout : préfixe d'exercice, package Java, fascicule, `livraisons.json`
* **Packages** : `be.ephec.java.<theme>.e<nn>` — déduit mécaniquement du code
* **Autonomie** : aucun package d'exercice n'importe une classe d'un autre exercice
  * une classe reprise d'un exercice antérieur est recopiée
  * si elle n'est pas l'objet de l'exercice, elle est fournie complète et marquée `FOURNIE`
* **Squelettes** : lèvent `UnsupportedOperationException`, méthodes déjà déclarées
* **Tests** : écrits uniquement dans `exercices/src/test`, recopiés vers `solutions/` par `livrer.py`
  * réflexion pour lire ou écrire les champs, afin que le test compile avant que l'étudiant n'ait rien déclaré
  * ne testent jamais un point laissé au choix de l'étudiant
* **Séparation logique / dialogue** : le noyau testable rend une valeur, le `main` ne fait que dialoguer
* **Vocabulaire** : « la réponse est correcte », pas « une bonne note »
* **Structure d'un énoncé** : objectif, contexte, énoncé, spécifications, vérification, questions à se poser
* **Modules** : `exercices/` et `solutions/` — jamais `corriges/`

---

## 1. Ménage — terminé

* [x] Doublon Fichiers retiré de `99. Threads`
* [x] Decks 11 renumérotés → `11. JavaFX Properties`, `12. Fichiers`, `13. Exercices récapitulatifs`
* [x] Millésimes corrigés
* [x] Sujet ajouté au nom des decks 01 et 02
* [x] `08. Types génériques et Lambdas` scindé en `08a` et `08b`
* [x] `Git et GitHub.pptx` et `Petanque.pptx` supprimés — non utilisés

### Conséquences à traiter

* [ ] **Étoffer `99. Threads`** — il ne reste que 12 slides après retrait du doublon
  * jamais donné jusqu'ici, hors des cinq créneaux d'examen
  * décider d'abord s'il a sa place dans l'année : voir la séance 13 surchargée, section 5
* [x] **`Clean Code` supprimé** — le deck `11b` n'existe plus, le mémento le remplace
  * l'ancien deck reste récupérable si une introduction s'avère nécessaire en cours d'année
* [ ] Les numéros de deck ne correspondent plus aux séances
  * `11. JavaFX Properties` et `12. Fichiers` tombent tous deux en séance 12
  * `13. Exercices récapitulatifs`, `Clean Code` et `Threads` tombent tous en séance 13
  * c'est exactement le couplage que la séparation par sujet supprime — voir section 8 bis

---

## 2. Recueil d'exercices — tranches verticales par thème

Une tranche livrée d'un bloc : fascicule Word, packages `exercices` et
`solutions`, classes de test, slide de renvoi dans le deck.

* [x] **POO** — 5 exercices, 4 classes de test, fascicule de 10 pages
* [x] **TMP** — 6 exercices, 6 classes de test, fascicule de 9 pages
* [x] **PKG** — 4 exercices, 4 classes de test, fascicule de 6 pages
  * `PKG.5` sur `protected` reste à écrire, après le thème `ABS`
* [x] **TAB** — 4 exercices, 4 classes de test, fascicule de 7 pages
* [x] **ENU** — 4 exercices, 4 classes de test, fascicule de 7 pages
  * **la séance 2 est complète et se livre** : `livrer.py 2` produit les deux
    archives, 62 fichiers chacune, sans le moindre avertissement
* [x] **ABS** — 3 exercices, 3 classes de test, fascicule de 6 pages
* [x] **ITF** — 4 exercices, 4 classes de test, fascicule de 6 pages
  * la séance 3 se livre : `livrer.py 3`, 47 fichiers, aucun avertissement
  * [ ] `G.10` à `G.13` du fil rouge restent à reprendre pour cette séance
* [x] **COL** — 7 exercices, 7 classes de test, fascicule de 9 pages
* [x] **EXC** — 5 exercices, 5 classes de test, fascicule de 8 pages
  * les quatre parties de l'exercice 23 et l'exercice 24 fusionnés en un seul
    `EXC.3` : le découpage venait de la contrainte de slide
  * séances 5 et 6 livrables
* [x] **JUN** — 3 exercices, 3 classes de test, fascicule de 7 pages
  * thème inversé : c'est l'étudiant qui écrit les tests. `JUN.1` fait lire un
    test comme spécification, `JUN.2` confronte à trois implémentations
    volontairement buguées, `JUN.3` fait écrire une vraie classe JUnit
  * [ ] **décision** : `JUN.2` remplace ta Tirelire à écrire par une Tirelire à
    vérifier. Le gain est qu'un test médiocre devient mesurable ; à valider
* [x] **GEN** — 6 exercices, 6 classes de test, fascicule de 8 pages
  * [ ] **décision** : `GEN.4` utilise le joker `? extends Personne`, comme ta
    slide 53 le demande — mais tu avais indiqué la généricité bornée comme
    réservée pour plus tard. À trancher
* [x] **LAM** — 3 exercices, 3 classes de test, fascicule de 5 pages
* [ ] **FX** — 8 exercices
* [x] **FIC** — 3 exercices, 3 classes de test, fascicule de 5 pages
  * les tests ecrivent dans un dossier temporaire fourni par JUnit (`@TempDir`)
* [ ] **REC** — 6 exercices récapitulatifs, un par question d'examen
  * **trois objectifs d'examen ne reposent que sur JUN** — B.1 et B.2 (écrire
    des classes de test) et C.2 (justifier les cas testés). Aucun autre
    exercice du recueil ne demande d'écrire un test
  * `REC.3` les porterait tous les trois : écrire la classe de test d'une
    classe fournie, et corriger le bug qu'elle révèle. C'est un argument de
    plus pour l'écrire
  * en attendant, un examen d'une année précédente couvre le même terrain —
    solution retenue par le professeur le 15/09
  * **livrés comme l'examen : un projet Maven par exercice**, avec son propre
    `pom.xml`, comme `DemineurClaude`. Décidé le 14/09
  * **les classes de test sont présentes et NON commentées.** Elles ne
    compilent pas tant que les classes n'existent pas, et c'est exactement la
    situation de l'examen — que le recueil ne peut pas reproduire, puisqu'un
    fichier fautif y bloque tout le module (`ERR.9` du guide)
  * c'est la seule façon d'entraîner à cette situation. `ABS.5` entraîne à
    concevoir sans squelette, ce qui est une autre compétence : sa classe de
    test, elle, est livrée en commentaire
  * six formes, relevées sur six sessions d'examen : classe simple et exception
    personnalisée · classe générique · écrire les tests et corriger le bug
    fourni · hiérarchie à deux niveaux · JavaFX et lambdas · fichiers
  * **bloqué** par deux décisions : durée de l'examen (2h30 pour 5 questions
    aujourd'hui ; 6 questions demandent 3h ou des questions plus courtes) et
    répartition de la séance 13 — voir la section « séances »

### Points à trancher, hérités de l'analyse

* [ ] Exercice 11 (`Card`) : deux versions divergentes existent — désigner la définitive
* [ ] Exercice 18 (paiements en ligne) : idem
* [ ] Exercice 8 (`Car` / `Sale` / `Vendor`) : porte sur les associations, pas les tableaux — mérite-t-il son propre préfixe ?
* [ ] `TMP` et `PKG` (6 à 8 slides, 1 exercice chacun) : fichiers courts assumés, ou fusion en un thème `BAS` ?
* [ ] Exercice 21 : le code existe (`cours05/ex21`, hiérarchie `Personnel`), l'énoncé a disparu — le réécrire et le rattacher à `ABS` ou `ITF`

---

## 3. Équilibrage des exercices par thème

État actuel, exercices atomiques par thème.

* **Suffisants, rien à créer**
  * `COL` — 7
  * `GEN` — 6
  * `EXC` — 5, dont un découpé en 4 parties par contrainte de slide (à refondre en un seul énoncé)
  * `ITF` — 4
  * `FX` — 8, mais tous concentrés sur les séances 11 et 12
* **Étoffés**
  * `TMP` — passé de 1 à 6 exercices
  * `PKG` — passé de 1 à 4 exercices
* **Livrés** — 57 exercices sur 13 thèmes, 56 classes de test.
  Séances 1, 2, 3, 5, 6, 7, 8, 9 et 12 complètes — neuf sur onze.
* **Restent** — `FX` (séance 11) et `REC` (séance 13), plus le fil rouge GameHub
  et le contenu de la séance 10, qui n'a toujours aucun exercice
* **À étoffer**
  * `ABS` — 3 exercices pour ~30 slides ; l'exercice 21 récupéré (hiérarchie
    `Personnel`, code présent sans énoncé) en ferait un quatrième
  * `JUN` — 3 exercices, dont un dépend de `COL.1`
  * `LAM` — 3 exercices, dont deux sur le même programme
  * `FIC` — 3 exercices qui n'en font qu'un, découpé en 1a / 1b / 1c
* **Exercices à créer de toutes pièces**
  * **Séance 4** — 0 exercice pour 63 slides (`static`, classes anonymes, pile et tas)
  * **Séance 10** — 0 exercice pour 74 slides (JavaFX, calculatrice)
* **À redistribuer**
  * `TMP` et `PKG` ne sont plus maigres : la fusion en `BAS` n'a plus lieu d'être
  * `REC` — 6 exercices récapitulatifs en séance 13, un par question d'examen, livrés en projets séparés

---

## 4. Fil rouge GameHub

Le fil rouge s'arrête à `G.20`, en séance 5. Il ne couvre donc aujourd'hui
que Q4 de l'examen.

* [x] `G.1 → G.3` — classes `Joueur`, `Partie`, `GameHub` (séance 1)
* [x] `G.4 → G.9` — `LocalDateTime`, packages, enum, record (séance 2)
* [x] `G.10 → G.13` — classe abstraite `Jeu`, Observer, `JournalParties` (séance 3)
* [x] `G.14 → G.20` — `Deck`, `Carte`, `JeuBataille` (séance 5)
* [ ] **Exceptions** — `Partie.terminer` sur une partie déjà terminée → exception métier *(couvre Q1)*
* [ ] **JUnit** — tester `JeuFactory` et `Deck` *(couvre Q3)*
* [ ] **Génériques** — `Catalogue<T>` ou `Historique<T>` *(couvre Q2)*
* [ ] **Lambdas** — filtrage et tri du catalogue
* [ ] **JavaFX** — GameHub console → GameHub graphique *(couvre Q5)*
* [ ] **Fichiers** — persistance du journal des parties
* [ ] Décider du sort des deux fils rouges concurrents
  * le jeu de Nim (séance 4) : apparaît et ne revient jamais
  * la calculatrice (séances 10 à 12) : pourrait devenir l'interface de GameHub
* [ ] Produire un état de départ par séance
  * les commits `avant/après CoursNN` existent déjà dans `ExercicesPOO` — les reprendre et les transformer en tags

---

## 5. Meilleur ratio de slides par concept

* **JavaFX — 143 slides, 68 de démonstration pure**
  * la calculatrice est construite intégralement par le professeur, séance 10
  * 7 slides successives « La gestion des Button »
  * [ ] créer des exercices pour la séance 10
  * [ ] introduire une exposition précoce (une petite application en séance 5 ou 6) — aujourd'hui, découverte début avril puis huit semaines sans y retoucher avant l'examen
  * [ ] envisager de remplacer la calculatrice par l'interface de GameHub
* **Séance 4 — 63 slides, 4 sujets sans rapport, 0 exercice**
  * 11 slides sur la pile et le tas, sujet jamais évalué et jamais pratiqué
  * 12 slides sur `static`, 5 sur les classes anonymes, 12 sur gameHub / jeu de Nim
  * [ ] dissoudre : rattacher chaque morceau au thème où il devient nécessaire
    * [x] **classes anonymes → `LAM`** — validé. Elles servent de marchepied aux
      expressions lambda : placées juste avant, une lambda se lit comme l'écriture
      abrégée d'une classe anonyme qu'on vient d'écrire à la main
    * `static` → au thème où une fabrique ou une constante le rend nécessaire
    * **pile et tas, ramasse-miettes → mémento annexe** (voir section 7 ter)
    * gameHub et jeu de Nim → au fil rouge
* **JUnit — l'outil avant le besoin**
  * 27 slides d'API (`Assertions`, `fail`, `Executable`, varargs, annotations) avant que le TDD n'arrive en slide 39 sur 55
  * corrélation avec le défaut récurrent en correction : des classes de test sans le moindre `assert`
  * [ ] inverser : partir d'une classe boguée, laisser le bug passer, puis introduire l'outil
  * [ ] déplacer `Executable` et les varargs en annexe — inutiles pour un premier test
* **Séance 13 surchargée et hors examen**
  * Clean Code, Threads, Fichiers, récapitulatifs — aucun ne correspond aux cinq créneaux de l'épreuve
  * [ ] descendre Fichiers plus tôt (s'articule bien avec les exceptions, séance 6)
  * [x] Clean Code diffusé par petites touches via le mémento, plus en bloc
* **Ce qui va bien, à préserver**
  * densité saine, ~400 caractères par slide
  * reprise inter-decks faible, 2 à 12 %
  * motif « Vu au dernier cours » appliqué systématiquement
  * construction incrémentale des exemples — il manque seulement que l'étudiant la refasse

---

## 6. Raccordement des slides au recueil

En aval du fascicule de chaque thème : impossible de renvoyer vers `TAB.3`
avant que `TAB.3` n'existe. Se fait donc à l'intérieur de chaque tranche
verticale.

* [ ] Retirer les énoncés des slides, les remplacer par une slide de renvoi
* [ ] Réduire « exercices en retard » à une slide listant les codes à corriger
  * rend 5 à 10 slides par séance
* [x] README : ouvrir le projet par le `pom.xml`, et que faire en cas de « JDK isn't specified »
* [ ] Vérifier le JDK des machines de l'école et aligner le projet dessus
* [ ] Éprouver la manipulation programmatique des `.pptx` sur un deck avant de généraliser
  * si la mise en forme est abîmée, basculer sur une liste d'instructions à appliquer à la main

---

## 7. Décisions de calendrier en attente

Elles bloquent les decks 04, 07, 09 et 10.

* [ ] La séance 4 reste-t-elle telle quelle, ou son contenu se redistribue-t-il ?
* [ ] JavaFX garde-t-il son bloc de trois séances en avril, ou une exposition précoce est-elle introduite ?
* [ ] Génériques et Lambdas deviennent-ils bien deux séances distinctes ?

---

## 7 bis. Mémento Clean Code

Format validé : une page d'index de règles numérotées, puis une explication
détaillée par règle avec avant-après. Nomenclature `CC-NOM.1`, `CC-ERR.2` —
préfixe par section, insensible aux insertions.

* [x] Index des 33 règles, réparties en 7 sections
* [x] Section `CC-NOM` — Nommer (6 règles), reprise des exemples des slides
* [x] Section `CC-ERR` — Traiter les erreurs (4 règles), nouvelle
* [x] Section `CC-MET` — Écrire une méthode (7 règles), reprise des exemples des slides
* [x] Section `CC-COM` — Commenter (3 règles)
* [x] Section `CC-OBJ` — Objets et encapsulation (2 règles)
* [x] Section `CC-TST` — Écrire des tests (3 règles), vise le défaut récurrent des tests sans assert
* [x] Section `CC-CLS` — Structurer une classe (2 règles)
* [x] Document complet — 26 pages, 33 règles
* [x] Tables récapitulatives transformées en sommaire cliquable
  * signets sur chaque règle, liens depuis l'index et depuis les renvois dans le texte
  * contournement nécessaire : docx-js 9.6.1 attribue le même identifiant à tous les
    signets, corrigé après génération par `corriger_signets.py`
* [x] Retouches manuelles du professeur intégrées (fusion des lignes-titres, styles
  « lier au suivant » et « veuves et orphelins », espaces insécables)
* [x] `CC-CLS.3` et `CC-CLS.4` : l'exemple porte sur une `Prestation`, plus sur un `Jeu`
* [ ] **Word perd les signets à l'enregistrement**
  * 16 des 33 signets avaient disparu après une passe d'édition, les liens retombant
    en tête de document
  * `reparer_memento.py` les réinstalle à partir des titres de règles
  * à relancer après chaque édition manuelle du mémento, puis vérifier un lien `CLS`
* [x] Six règles ajoutées après relecture du livre
  * `CC-NOM.7` nombres magiques, `CC-NOM.8` portée de déclaration
  * `CC-MET.8` séparation commande / requête
  * `CC-ERR.5` exceptions définies selon le besoin de l'appelant
  * `CC-CLS.3` DRY et `CC-CLS.4` polymorphisme plutôt que tests de type
  * mot de la fin : la règle du boy-scout
* [ ] Corriger la slide 26 de l'ancien deck `Clean Code` si elle est réutilisée
  * les deux « manières de régler le problème » sont identiques (copier-coller), et la seconde
    déclare `void` avec un `return true;` — elle ne compile pas
  * la variante `dernierRetraitOK()` est écartée dans le mémento : elle introduit un état caché
* [x] **Corriger le pom : `javafx.mainClass` désigne `be.ephec.java.demo.FenetreDemo`,
  classe qui n'existe pas encore** — `mvn javafx:run` échouerait aujourd'hui.
  À traiter en même temps que le thème `FX`.
* [ ] **Renvoyer vers les règles depuis les fascicules ET depuis les slides**
  * sans ces renvois, le mémento reste un document annexe que personne n'ouvre
  * le premier doit arriver dès la séance 1, pour qu'il devienne un réflexe
  * dans les fascicules : un encadré de trois lignes au moment utile
    * `CC-NOM.1` et `CC-NOM.5` dès `POO`
    * `CC-NOM.7` (nombres magiques) et `CC-MET.*` dès `TAB`
    * `CC-OBJ.2` avec `PKG.2`, qui traite déjà la même question
    * `CC-ERR.*` avec `EXC`, `CC-TST.*` avec `JUN`, `CC-CLS.3` et `CC-CLS.4` avec `ABS`
  * dans les slides : citer le code de la règle là où le sujet est abordé,
    plutôt que de reproduire la règle
  * dans les corrigés commentés : le renvoi existe déjà par endroits, à généraliser
  * dans la grille d'examen : aligner le critère de style sur la nomenclature
* [ ] Aligner le critère de style de la grille d'examen sur la nomenclature
  * « `CC-MET.6`, méthode à cinq paramètres » plutôt qu'un « style » sur trois points
* [x] **Sort du deck `Clean Code` tranché** — supprimé, le mémento seul
  * si les étudiants ne voient pas à quoi sert le mémento, l'ancien deck peut
    être ressorti pour une introduction ponctuelle
* [x] Lien vers la vidéo de Julien Lucas ajouté dans « Pour aller plus loin »

---

## 7 ter. Mémento technique et guide IntelliJ

Deux documents de référence supplémentaires, sur le modèle du mémento Clean
Code : des sections numérotées et citables, pas d'exercices. Ils recueillent
les sujets qui n'appartiennent à aucun thème mais qu'il faut bien expliquer
quelque part.

### Trois documents, pas un

Décidé : trois documents de référence distincts, parce qu'ils ne vieillissent
pas au même rythme.

| Document | Contenu | Fréquence de mise à jour |
|---|---|---|
| Mémento Clean Code | les 33 règles | stable, plusieurs années |
| Mémento technique | plateforme, exécution, compilation, Maven | à chaque version majeure de Java |
| Guide IntelliJ | installation, projet, exécution, raccourcis | annuelle — menus et captures |

Frontière : ce qui est vrai de Java va au technique, ce qui est propre à l'outil
va au guide. Le JDK et Maven relèvent du premier ; « où cliquer pour changer le
SDK du projet » relève du second. Chacun renvoie à l'autre.

* [ ] **Trancher les codes de section**
  * proposition : `TEC-PLA`, `TEC-EXE`, `TEC-CMP`, `TEC-MVN` pour le technique
  * pour le guide IntelliJ, une numérotation simple `IDE.1 … IDE.n` suffit sans doute :
    il est court et se lit linéairement
* [x] **Le matériau existe déjà** — deck 01, slides 23 à 29, section « L'environnement Java »
  * 24 — La plateforme Java : (JVM + bibliothèques = JRE) + outils = JDK
  * 25 — Les trois éditions : JSE, JEE, JME
  * 26 et 27 — Quelle version de Java sur mon PC
  * 28 — `java` et `javac`
  * écrire le mémento est donc surtout une réorganisation, pas une rédaction
* [x] **Slides 24 à 28 retirées du deck 01** — la 29 reste, elle relève du Java
  et non de l'environnement, et `POO.3` en a besoin le soir même
  * la répétition entre l'ancienne 29 et l'ancienne 36 (devenue 31) est assumée :
    l'une explique, l'autre compare avec C#
* [ ] **Décider du contenu de la slide 23**
  * proposition : le schéma JVM → JRE → JDK, une phrase sur ce que l'étudiant doit
    savoir faire ce soir (vérifier sa version), et le renvoi au document
* [ ] **Décider comment donner le lien vers les documents**
  * QR code sur la slide : pratique en projection, suppose un accès sans authentification
  * mention « Moodle, section Séance 1 » avec le nom exact du fichier : plus sûr,
    et cohérent avec la vue chronologique prévue sur Moodle
* [ ] **Sortir aussi les slides IntelliJ du deck 01** — 10 à 22, treize slides,
  de l'installation aux raccourcis clavier
  * plus gros bloc de la séance la plus chargée, et contenu qu'on consulte
    plutôt qu'on écoute
* [x] **Mémento technique écrit** — 17 pages, 24 sections, sommaire cliquable
  * `TEC-PLA` la plateforme, `TEC-FX` les interfaces graphiques, `TEC-CMP` la
    compilation, `TEC-EXE` pile et tas, `TEC-MVN` Maven, `TEC-GIT` culture générale
  * [ ] retirer les slides 9 à 13 du deck JavaFX, désormais reprises dans `TEC-FX`
  * [ ] retirer la slide 16 du deck JavaFX : sa procédure de configuration ne
    s'applique pas à un projet Maven, et `IDE.28` du guide la remplace
  * corrigé au passage : la slide 11 datait Swing de 2007, c'est 1998
  * `TEC-ZIP` ajouté : extraire une archive au bon endroit sous macOS et Windows
* [x] **README corrigé** — il indiquait d'extraire l'archive « à la racine du dossier
  `ExercicesJava` », alors qu'elle contient elle-même un dossier de ce nom et doit
  donc être extraite dans le dossier parent
  * reprend les slides 24, 25, 27 et 28 du deck 01, et les 12 slides pile et tas
    orphelines de la séance 4
* [ ] ~~Modèle d'exécution~~
  * la pile et le tas — 12 slides existantes à reprendre, orphelines de la séance 4
  * ce qu'est une référence, et pourquoi POO.4 se comporte comme il se comporte
  * le ramasse-miettes
* [ ] **Chaîne de compilation**
  * `.java` → `.class` → JVM ; ce que fait `javac`, ce que fait `java`
  * le classpath
  * pourquoi `target/` est ignoré par Git
* [ ] **Outillage** (mémento technique)
  * JDK, JRE, JVM : qui fait quoi — reprise de la slide 24
  * les trois éditions JSE, JEE, JME — reprise de la slide 25
  * vérifier sa version de Java et de `javac` — reprise des slides 26 à 28
  * Maven : le `pom.xml`, les modules, le cycle de vie, d'où viennent les
    bibliothèques téléchargées
* [x] **Guide IntelliJ — écrit** : 29 pages, 29 sections `IDE.*` + 8 `ERR.*`,
  19 captures d'écran fournies par le professeur, sommaire cliquable
  * [ ] vérifier les raccourcis Windows sur une machine de l'école — je les ai
    tirés du keymap publié, sans pouvoir les tester
  * [ ] vérifier le chemin Settings → Languages & Frameworks → JavaFX et les
    emplacements d'installation de Scene Builder, donnés de mémoire (`IDE.29`)
  * [ ] capture facultative : l'onglet Scene Builder dans l'éditeur, si tu l'installes
  * `ERR.8` ajouté après incident réel : le compilateur Eclipse d'IntelliJ 2024.3
    s'arrête à Java 18 et ne peut pas compiler ce projet. `ERR.6` corrigé en
    conséquence — l'option « Proceed on errors » n'est pas seulement un pis-aller,
    elle est inutilisable ici.
  * [ ] à refaire chaque année : c'est le seul document à contenir des captures
* [ ] ~~Guide IntelliJ~~ (détail de ce qui a été couvert)
  * installation et premier démarrage — slides 12 et 13
  * ouvrir le projet par le `pom.xml`, et l'erreur « JDK isn't specified »
    — reprendre la section du README
  * structure du projet, exécution, mode debug — slides 15 à 18
  * paramétrage, plugins, raccourcis clavier — slides 19 à 22
  * seul document à contenir des captures d'écran, donc le seul à refaire chaque année
* [ ] **Renvois** depuis les fascicules et les slides, comme pour le mémento Clean Code

Ces documents ont un intérêt de plus : ils documentent exactement les incidents
que les étudiants rencontreront en séance 1, avant d'avoir écrit une ligne de code.

---

## 8. Chantiers différés

* **Séparation des PowerPoint par sujet** — voir section 8 bis, détaillée
* **Correction automatique des soumissions**
  * phase 1 en place : classes de test fournies, l'étudiant s'auto-vérifie
  * phase 2 : collecte et notation — réutiliser le pipeline Python des examens
  * Moodle 5 en cours de mise à jour ; VPL ou CodeRunner non vérifiés
* **Livraison du fascicule dans les archives**
  * `livrer.py` n'embarque pas les Word ; une dizaine de lignes à ajouter si souhaité
* **Trancher la distribution du dépôt Git de GameHub** — *should*
  * le cours avait décidé « pas de Git pour les étudiants ». Le dépôt existe
    maintenant, avec sa notice `Git_pour_GameHub.docx` et ses quatre captures
  * `TEC-GIT.3` du mémento technique et le chapeau de la section Git sont
    rédigés **au conditionnel** — « peut vous être remis » — pour tenir dans
    les deux cas. Si vous décidez de ne pas distribuer, ces deux passages sont
    à retirer ; si vous distribuez, à passer à l'affirmatif
  * **point bloquant à vérifier avant tout** : Git est-il installé sur les
    postes de l'école ? IntelliJ ne l'embarque pas, et sans lui l'onglet Git
    reste inerte
  * l'alternative sans Git est prête sur le principe : trente dossiers
    numérotés, un par incrément. On y perd le diff en couleur, on y gagne zéro
    prérequis

* **Valider l'exercice facultatif du démineur** — *could*
  * écrit le 14/09 : énoncé de 7 pages, squelette, corrigé dans `_corrige/`,
    dix tests fournis. L'étudiant n'écrit que `Grille` — aucune ligne de JavaFX
  * **rien n'a pu être testé** : ni JUnit ni JavaFX ne sont disponibles côté
    Claude. Ce qui est vérifié : squelette et corrigé exposent les mêmes
    signatures, les 18 appels du test et de la vue sont tous déclarés, les deux
    versions compilent
  * à faire avant de le proposer : lancer les dix tests sur le corrigé, jouer
    une partie complète, et vérifier qu'un squelette neuf fait bien échouer les
    dix tests
  * à décider : quand l'offrir — après la séance 11 (JavaFX vu) ou plus tôt,
    puisqu'il ne demande que du calcul
  * distribution : le dossier moins les répertoires préfixés `_`

* **Refaire les captures d'écran sous Windows** — *nice to have*
  * les 19 captures du guide (`ide-04` à `ide-27`) et les 4 du document Git
    viennent d'un macOS ; les étudiants travaillent sous Windows
  * diffèrent : la barre de titre, les boutons de fenêtre, les raccourcis
    affichés dans les menus, et parfois le libellé des entrées
  * elles vivent maintenant dans `_captures/` et sont **mesurées
    automatiquement** : déposer les nouveaux fichiers sous les mêmes noms et
    relancer les deux générateurs suffit
  * trois exigences, apprises à l'usage : du PNG sans transparence, aucun
    chemin personnel visible dans la fenêtre, et une fenêtre IntelliJ
    étroite — c'est sa largeur qui décide de la taille du texte imprimé,
    pas la résolution
  * **`ide-09-fenetre-maven.png` est périmée** : elle montre deux modules
    nommés « enonces » et « solutions », alors que le projet en compte
    quatre — `exercices`, `solutions`, `demos`, `_travail`. Le texte a été
    corrigé le 14/09 pour ne plus contredire l'image, mais l'image
    elle-même reste à refaire
  * à vérifier sur chaque capture au passage : le contenu montré
    correspond-il encore au projet ? Celle-ci a survécu à un renommage de
    module sans que rien ne le signale
  * le document se construit même sans les images : l'emplacement est
    marqué en rouge, ce qui permet de les remplacer une par une

---

## 8 bis. Séparation des PowerPoint par sujet

Décidé sur le principe, reporté après le recueil d'exercices. Se fait
thème par thème, à l'intérieur des tranches verticales de la section 2,
plutôt qu'en un lot séparé.

* [ ] **Découper les decks existants en decks thématiques**
  * `POO` (~63), `TMP` (~8), `PKG` (~6), `TAB` (~20), `ENU` (~20)
  * `ABS` (~30), `ITF` (~36)
  * `COL` (~49), `EXC` (~68), `JUN` (~55)
  * `GEN` (~55), `LAM` (~43)
  * `FX` (~143 — à répartir sur 2 ou 3 séances)
  * `FIC` (~46), `REC` (~14)
  * contenu orphelin de la séance 4 (~50) : redistribué, voir section 5 — les classes anonymes rejoignent `LAM`, la pile et le tas le mémento annexe
* [ ] **Trancher le sort des thèmes minuscules**
  * `TMP` et `PKG` : 6 à 8 slides et 1 exercice chacun
  * fichiers courts assumés, ou fusion en un thème `BAS` ?
  * la fusion des decks n'oblige pas à fusionner les préfixes d'exercices
* [ ] **Créer les PPT introductifs de début de séance**
  * un `Seance0N_ouverture.pptx` de 2 à 4 slides par soirée
  * au programme du soir / vu la fois précédente / exercices corrigés ce soir
  * remplace la section « Vu au dernier cours », qui n'a plus de conteneur naturel
  * c'est le seul artefact réellement chronologique : il reste numéroté par séance
* [ ] **Restaurer la vue « cours par cours » sur Moodle**
  * une section par séance : liens vers les decks thématiques du jour, les fascicules, l'archive `Seance0N`
  * plus informatif que la liste actuelle de PowerPoint sans dates
* [ ] **Vérifier que rien ne se perd au découpage**
  * les slides de transition et les rappels internes à un deck peuvent devenir orphelins
  * éprouver sur un deck avant de généraliser

---

## 8 ter. Mise en forme des documents

* [x] **Rangement** — `documents/` pour les trois mémentos, `enonces/` pour les
  fascicules de thème
* [x] **Pagination** — pied de page centré « THEME n / total » sur les dix documents
  * la couverture est dans sa propre section et n'est pas numérotée ; la page 2
    porte le numéro 1, et le total ne compte pas la couverture
  * ajoutée par `outils/ajouter_pagination.py`, en post-traitement : les retouches
    faites à la main dans Word sont conservées
  * le total utilise le champ `SECTIONPAGES`, que Word recalcule ; la valeur en
    cache est le vrai nombre de pages, pour les lecteurs qui n'évaluent pas le champ
  * relancer le script après toute régénération d'un document

---

## 8 quater. Ce qui a cassé, et ce qui l'empêche de recommencer

* [x] **Un test qui appelle un membre non déclaré fait tomber tout le source root**
  * `DeckTest` appelait `getLibelle()`, absent du squelette de `Color` : plus aucun
    test du projet ne pouvait être lancé, y compris ceux de `POO`
  * `StudentTest` avait le même défaut sur `nom()`, `cote()` et `passe()`
  * corrigé : les enums déclarent `getLibelle()`, l'en-tête du record est fourni
* [x] **`outils/verifier_squelettes.py`** — contrôle que chaque méthode et chaque
  constructeur appelé par un test est déclaré dans le squelette correspondant
  * comprend les composants de record, dont les accesseurs sont générés
  * ignore les commentaires : un « TODO : écrivez getLibelle() » ne compte pas
    comme une déclaration, et c'est ce faux positif qui avait masqué le problème
  * [ ] à lancer avant chaque livraison de thème, avec `livrer.py`

---

## 9. Réserves techniques connues

* **Lancer une application JavaFX construite par Maven** — rencontré sur le
  projet Démineur, le 14/09
  * symptôme : « des composants d'exécution JavaFX obligatoires pour exécuter
    cette application sont manquants », alors que les jars sont bien présents
    dans le classpath affiché
  * cause : le lanceur du JDK exige que JavaFX soit chargé comme **module** dès
    que la classe principale hérite d'`Application` ; Maven le met sur le
    classpath ordinaire
  * parade retenue : une classe de lancement qui **n'hérite de rien** et appelle
    `Application.launch(Demineur.class, args)`. Le contrôle ne se déclenche pas.
  * **vérifié le 14/09 : oui.** Les huit exercices `FX` et les deux démos
    avaient le défaut. Dix-huit classes héritaient d'`Application` avec leur
    propre `main` ; les étudiants auraient buté dessus en séance 11 avant
    d'avoir écrit une ligne
  * corrigé : 18 classes `Lanceur`, le `main` retiré des classes
    `Application`, la règle `TEC-FX.4` écrite dans le mémento technique, et
    une section « La classe à lancer » en tête du fascicule `FX`
  * **reste à tester chez vous** — aucune de ces classes n'a pu être lancée
    ici, faute de JavaFX


* Le conteneur n'a ni `javac` ni accès à Maven Central : le code produit est relu, pas compilé
  * → lancer les tests dans IntelliJ avant toute publication
* Les valeurs attendues des classes de test sont vérifiées en exécutant le JDK 21 disponible
