# Ce qui bloque — décisions, arbitrages, vérifications

État mis à jour le 16/10/2026 : la section 0 dit ce qui reste ouvert. Les
sections suivantes datent de la construction des modules ; certaines sont
sans doute réglées depuis, à relire lors de la révision.

Les points sont classés par **ce qu'ils empêchent**, pas par module. Ceux de la
section 1 arrêtent une production en cours ; ceux de la section 4 peuvent
attendre sans conséquence.

---

---

## 0. Ouvert au 16/10/2026

Les decks sont terminés. Ce qui reste, par ordre :

* **Révision des démonstrations et des exercices** (Frédéric), en notant au fil
  de l'eau les retouches de mise en page souhaitées.
* **Page de garde et logo EPHEC** : à fournir par Frédéric (fichier officiel,
  ou exemple de page de garde). Une modification de `boite.js` s'applique à
  tous les documents ; le guide IntelliJ a sa propre copie de la fonction.
* **Recueil unique d'exercices**, en plus des fascicules (fournis en PDF à
  chaque séance) : décidé, à faire après la révision.
* **À vérifier dans IntelliJ, impossible ici** :
  * le code des slides JavaFX (`demo.fx.slides`, cinq applications et
    `ProprietesEnConsole`), en particulier les flèches du clavier dans
    `ClavierEtSouris` ;
  * les deux `calculatrice.fxml` de FX.9 (squelette et corrigé), dans Scene
    Builder ou en lançant ;
  * les animations des trois slides importées dans FX1 (slides 30 à 32) ;
  * la configuration `javafx:run` : dossier de travail du module (IDE.28).
* **Images** : les quatre intercalaires de FX3 n'ont encore que l'image
  provisoire ; les huit images d'ABS sont les versions Bing d'origine (à
  régénérer si on veut aligner la série) ; crédit à ajouter pour le schéma du
  graphe de scène de FX1 (slide 9) s'il vient d'un site.
* **Support imprimable** : à générer une fois la révision terminée.

## 1. Bloquant — il me manque quelque chose de ta part

### 1.1 JavaFX : il me faut le projet à jour

Tu m'as signalé que le projet JavaFX que j'ai n'est peut-être pas le dernier.
C'est le seul vrai blocage : tout le reste est tranché.

> **À m'envoyer** : la version à jour du projet JavaFX, celle qui a servi aux
> démonstrations de cette année.

**Ce qui est décidé, et que j'appliquerai :**

* Les exercices décrivent un **comportement attendu**, que l'étudiant vérifie à
  l'exécution. Pas de classe de test pour la partie graphique.
* La majorité portent sur les **gestionnaires et filtres d'événements** —
  `ActionEvent`, `KeyEvent`, `MouseEvent` — parce que c'est le lien entre
  l'interface et l'application qui compte, et c'est ce que l'examen évalue.
* Quelques exercices font **construire une application complète**, en code pur.
* Le **FXML n'est pas au programme de l'examen** : il reste au rang d'exemple
  avancé, avec la calculatrice, pour montrer la logique de construction.
* Le **Lanceur** est conservé : il vient du correctif d'un problème réel
  d'exécution en salle d'examen.

**Une réserve technique demeure** : je ne peux ni lancer ni voir une fenêtre
JavaFX depuis ici. Le code sera relu, pas exécuté — et sans classe de test pour
rattraper, ce module sera le plus exposé.

### 1.2 Les exercices récapitulatifs — en attente, à ta demande

Le nombre de séances n'est pas arrêté — treize ou quatorze —, et l'hypothèse
d'un examen blanc à l'avant-dernière séance change la donne.

> **En attente.** Rien ne se fait avant que ce point soit tranché.

---

## 1 ter. Ce que la lecture des decks JavaFX a révélé

Les énoncés `FX` sont bien dans les slides, mais leur état demande des
arbitrages.

**Les exercices 47 à 50 figurent deux fois**, dans le deck 10 et dans le
deck 11, avec une divergence : le deck 10 demande les touches `H` et `F`,
le deck 11 les touches `1` et `2`. Le code livré fait `1` et `2`.

> **À décider** : le deck 10 est périmé sur ce point. Lequel garde les
> exercices, une fois les decks réorganisés par module ?

**Le numéro 51 désigne deux exercices différents.** Dans le deck 10, c'est le
démineur — un projet de longue haleine sur trois semaines. Dans le deck 11,
c'est l'écoute de la propriété d'un `TextField`. La numérotation thématique
résout la collision : ils deviennent `FX.8` et `FX.6`.

**Les exercices 43, 44 et 45 du deck 09 ne sont pas du JavaFX** : ce sont les
trois exercices JUnit, déjà repris en `JUN.1`, `JUN.2` et `JUN.3`. Le deck 09
mêle donc deux sujets, ce que la réorganisation par module corrigera.

**La calculatrice MVC n'a pas d'énoncé d'exercice.** Le deck 09 la traite en
cours magistral — architecture, vue, contrôleur, modèle, FXML.

> **À décider** : reste-t-elle une démonstration, ou devient-elle un exercice ?
> Elle ferait un bon `FX` avancé, mais le FXML n'est pas à l'examen.

**Le démineur est un cas à part.** Trois semaines, des vidéos et un dépôt Git
en référence. Il ne ressemble à aucun autre exercice du recueil.

> **À décider** : le garder comme travail facultatif, le verser au fil rouge
> GameHub, ou le retirer ?

**Un chevauchement assumé.** La démonstration `FX` montre la propagation et le
`consume()`, que l'exercice `FX.5` fait ensuite construire. Contrairement aux
autres modules, je l'ai gardé : la propagation d'un événement ne se comprend
pas sans l'avoir vue une fois, et la refaire soi-même après n'est pas une
redite.

---

## 2. Calendrier — reporté, et c'est la bonne décision

Tu comptes redistribuer les sujets par séances, et tu préfères travailler les
decks **par module** plutôt que par séance, quitte à étaler un deck sur
plusieurs séances ou à en donner plusieurs dans la même.

C'est aussi la logique du recueil d'exercices depuis le début : la numérotation
est thématique, et `outils/livraisons.json` est le seul endroit où les séances
apparaissent. Le fichier Excel a été repris dans le même esprit — il est
désormais organisé par module, et la colonne « séance » a disparu.

Le déséquilibre reste consigné ci-dessous, pour mémoire, mais il ne se traite
pas avant le passage sur les slides.

### 2.1 Pour mémoire : la répartition actuelle

| Séance | Modules | Exercices |
|---|---|---|
| 1 | `POO` | 5 |
| 2 | `TMP` `PKG` `TAB` `ENU` | **18** |
| 3 | `ABS` `ITF` | 7 |
| 4 | — | **0** |
| 5 | `COL` | 7 |
| 6 | `EXC` | 5 |
| 7 | `JUN` | **3** |
| 8 | `GEN` | 6 |
| 9 | `LAM` | **3** |
| 10 | — | **0** |
| 11 | `FX` | 0 sur 8 |
| 12 | `FIC` | **3** |
| 13 | `REC` | 0 sur 12 |

Déplacer un module ne coûte rien : `livrer.py` lit `outils/livraisons.json`, et
aucun package ni aucun énoncé n'est à renommer. Les séances 4 et 10 sont vides.

> **À décider** : `ENU` ou `TAB` descendent-ils en séance 4 ? Le cours donne
> `ENU` juste après `TAB` dans le même deck, mais rien n'oblige à les livrer
> ensemble.

### 2.2 `static` — décidé

Rattaché à `POO`, avec un ou deux exercices et les slides correspondantes. Un
module `STA` a été créé dans l'Excel, avec deux exercices prévus : `STA.1` sur
les constantes et le compteur d'instances, `STA.2` sur la méthode statique et
la fabrique.

> **À faire** : écrire les deux exercices. Rien ne bloque.

### 2.3 Threads — en suspens

Conservé au cas où, et une question d'examen serait ajoutée si le sujet est
traité. Marqué `Won't` dans l'Excel, ce qui le sort des comptes sans le
supprimer.

---

## 3. Décisions de contenu sur ce qui est déjà écrit

Ces trois points concernent des exercices livrés. Rien ne presse, mais un
changement d'avis coûte plus cher plus tard.

### 3.1 `GEN.4`, le joker — conservé

L'exercice reste, et des slides seront ajoutées si le passage sur les decks
montre qu'elles manquent.

### 3.2 `JUN.2` inverse ton exercice 44 — validé

Tu demandais d'écrire une `Tirelire` et sa classe de test. J'ai fourni quatre
tirelires — une correcte, trois défectueuses — et fait écrire le vérificateur.

La raison est que je ne sais pas vérifier automatiquement la qualité d'un test,
alors que je sais vérifier qu'il démasque un défaut. Chaque implémentation
buguée n'est attrapée que par une clause précise du contrat, si bien qu'un
vérificateur incomplet devient visible. C'est le meilleur outil que j'aie
trouvé contre les tests sans assertion — mais ce n'est plus ton exercice.

> **Validé.** Rien à changer.

### 3.3 L'exercice 21, hiérarchie `Personnel`

Le code existe dans `cours05/ex21`, l'énoncé est perdu. `ABS` ne compte que
trois exercices, contre sept pour `COL`.

> **Décidé** : je reconstruis l'énoncé et j'en fais `ABS.4`. Rien ne bloque.

---

## 4. Vérifications que je ne peux pas faire

Aucune ne bloque quoi que ce soit, mais chacune peut faire perdre une heure à
un étudiant le jour où elle se révèle fausse.

| À vérifier | Où | Pourquoi moi je ne peux pas |
|---|---|---|
| Les raccourcis Windows | `IDE.26` du guide IntelliJ | tirés du keymap publié, jamais testés |
| `Settings → Languages & Frameworks → JavaFX` | `IDE.29` | donné de mémoire |
| Emplacements d'installation de Scene Builder | `IDE.29` | idem |
| La commande PowerShell listant les JDK | `TEC-PLA.4` | jamais exécutée |
| Les versions LTS et le rythme semestriel | `TEC-PLA.3` | exact à ma connaissance, mais périssable |
| Le recalcul du champ `SECTIONPAGES` par Word | pied de page des dix documents | vérifié sous LibreOffice seulement |
| Le JDK des machines de l'école | — | à aligner sur le projet |
| **Que tout compile et que tous les tests passent** | IntelliJ | aucun compilateur ici |

Ce dernier point est le plus important de la liste. Les 57 exercices ont été
relus, leurs valeurs calculées sur un JDK 21, et `verifier_squelettes.py` passe
au vert — mais rien n'a jamais été compilé.

---

## 4 bis. Un déséquilibre que l'Excel a mis en évidence

Aucun module ne dispose d'une **démonstration de code construite en direct**.
Le cours repose aujourd'hui entièrement sur les slides et sur les exercices,
sans le moment intermédiaire où l'on écrit du code devant les étudiants.

Tu l'as soulevé toi-même. La feuille `Modules` du fichier Excel porte désormais
une colonne « Démo de code », et elle est à « à écrire » partout — seize
modules sur seize.

> **À décider** : combien par module, et sous quelle forme ? Un projet
> `demos/` dans le projet maître, avec un fichier par module et des étapes
> commentées, serait cohérent avec le reste du dispositif.

---

## 5. Travaux prêts à lancer, en attente d'un feu vert

Aucune décision à prendre ; il suffit de dire quand.

* **Les renvois vers le mémento dans les slides et dans la grille d'examen.**
  Ceux des fascicules sont posés : dix-sept des trente-trois règles sont citées
  au moins une fois, et tous les modules livrés en ont au moins un — sauf `ENU`,
  qui reste à traiter. La colonne « Renvois » de la feuille `Modules` donne le
  compte exact.
* **Retirer des decks ce qui a migré** : slides 9 à 13 et 16 du deck JavaFX,
  slides 10 à 22 du deck 01 vers le guide IntelliJ.
* **Le contenu de la slide 23** du deck 01, devenue une slide de renvoi.
* **Le fil rouge GameHub**, `G.10` et suivants.
* **Les deux exercices `static`** de `POO`, décidés ci-dessus.
* **`ABS.4`**, la hiérarchie `Personnel`, décidée ci-dessus.
* **Un guide Git court, pour toi seul** — trois ou quatre commandes pour gérer
  les états de séance de ton projet maître. Sans rapport avec les étudiants,
  pour qui le zip reste le bon outil.
* **Code With Me**, si tu décides de faire davantage d'exercices en classe.

---

## 6. Points réglés, pour mémoire

Pour ne pas les rouvrir par inadvertance.

| Question | Réponse retenue |
|---|---|
| Un deck Clean Code ? | Non. Mémento seul, deck `11b` supprimé. |
| Un ou plusieurs documents de référence ? | Trois : Clean Code, technique, guide IntelliJ. |
| Où ranger les mémentos ? | `documents/`, à côté de `enonces/`. |
| Comment donner le lien ? | Moodle, section « Documents ». |
| Git pour les étudiants ? | Non. Les zips de `livrer.py` conviennent mieux. |
| `TMP` et `PKG` fusionnés en `BAS` ? | Sans objet : six et quatre exercices. |
| Les classes anonymes ? | Déplacées en séance 9, juste avant les lambdas. |
| `protected` dans `PKG` ? | Non : après l'héritage. `PKG.5` reste à écrire. |
| L'option « Proceed on errors » ? | Reléguée en annexe, et déconseillée — le compilateur Eclipse d'IntelliJ 2024.3 s'arrête à Java 18. |
