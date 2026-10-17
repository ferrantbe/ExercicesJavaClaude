# Scénario du module INI

*Introduction au cours. Version 1, 17/09/2026.*

Ce document décrit le deck du module slide par slide, sur le modèle de
`Scenario_POO.md`. Il sert de base à la construction du `.pptx`.

Le module ne contient ni démonstration ni exercice. Il n'a donc pas de
package Java.

---

## Conventions de ce scénario

Mêmes rubriques que pour POO.

| Rubrique | Contenu |
|---|---|
| **Source** | `d01/6` = ancien deck 01, slide 6 ; `nouvelle` |
| **Slide** | ce qui s'affiche, en puces courtes |
| **Note** | la prose du support imprimable, dans les notes du présentateur |

Une marque supplémentaire : **⟦à compléter⟧** signale une information que
je n'ai pas. Je n'ai pas eu accès au texte des slides d01/1 à 9, 23 et 45 :
tout ce qui en dépend est marqué ainsi plutôt que reconstitué.

---

## Déroulé

| Section | Slides | Source principale |
|---|---|---|
| Ouverture | 0.1 à 0.2 | d01/1, nouvelle |
| 1. Le cours | 1.1 à 1.6 | d01/2 à 9, actualisées |
| 2. Ma façon de travailler | 2.1 à 2.7 | nouvelle |
| 3. Les mémentos | 3.1 à 3.7 | nouvelle, d01/23, d01/45 |
| Clôture | 4.1 | nouvelle |

Environ 23 slides. Le module se joue en début de séance 1, avant POO.

---

### 0.1 · Titre du module

**Source** d01/1, adaptée

**Slide**
- JAVA 2
- Module INI - Introduction au cours
- *(plus de mention « Module 2, Semaine 01 »)*

**Note**
*(aucune)*

---

### 0.2 · Au programme

**Source** nouvelle (même gabarit que la slide « Au programme » de POO)

**Slide**
- 1. Le cours
- 2. Ma façon de travailler
- 3. Les mémentos

**Note**
*(aucune)*

---

## Section 1 - Le cours

### 1.1 · Intercalaire

**Slide**
- 1. Le cours

**Note**
Cette section présente le cours : qui le donne, ce qu'il couvre, comment il
s'organise dans l'année et comment il est évalué.

---

### 1.2 · Qui suis-je ?

**Source** d01/2 à 5 ⟦à compléter⟧

**Slide**
- ⟦contenu des slides d'origine⟧

**Note**
⟦à rédiger à partir des slides d'origine⟧

*Remarque : je ne connais pas le contenu de ces slides. Je ne l'invente pas.*

---

### 1.3 · Ce que vous savez déjà, ce que vous allez apprendre

**Source** d01/2 à 5 ⟦à confirmer⟧, nouvelle

**Slide**
- Vous connaissez la programmation orientée objet en C#
- Ce cours la transpose en Java, puis va plus loin
- Collections, exceptions, tests, génériques, lambdas, fichiers, interfaces graphiques

**Note**
Le cours part de ce que vous avez vu en C# : classes, objets, héritage. La
première partie montre comment ces notions s'expriment en Java. La suite
aborde ce qui fait la pratique quotidienne d'un développeur Java : ranger des
objets dans des collections, traiter les erreurs, tester son code, écrire des
classes réutilisables avec les génériques, raccourcir le code avec les
lambdas, lire et écrire des fichiers, et construire une interface graphique
avec JavaFX.

---

### 1.4 · L'organisation

**Source** d01/2 à 5 ⟦à confirmer⟧, nouvelle

**Slide**
- 14 séances, du 19 janvier au 18 mai 2027
- De 18h00 à 21h15, pause de 20 minutes
- Examen le 8 juin 2027
- Java 21, IntelliJ IDEA, Maven, JUnit 5, JavaFX 21

**Note**
Chaque séance alterne théorie, démonstration dans IntelliJ et exercices. Les
versions des outils sont celles de l'examen : travailler toute l'année avec
les mêmes évite les surprises le jour de l'épreuve. Le guide IntelliJ
explique l'installation.

⟦à confirmer : la version d'IntelliJ à annoncer, la 2024.3 Community étant
celle du professeur, pas forcément celle des postes de l'école⟧

---

### 1.5 · Les modules du cours

**Source** d01/6 et 8, réécrites

**Slide** *(tableau, deux colonnes)*

| Code | Sujet |
|---|---|
| POO | Classes et objets, membres de classe |
| TMP | Dates et durées |
| TAB | Tableaux |
| ENU | Énumérations et records |
| ABS | Héritage et classes abstraites |
| ITF | Interfaces |
| PKG | Packages et visibilité |
| COL | Collections |
| EXC | Exceptions |
| JUN | Tests unitaires avec JUnit |
| GEN | Types génériques |
| LAM | Classes anonymes et lambdas |
| FIC | Fichiers |
| FX | Interfaces graphiques avec JavaFX |
| REC | Exercices récapitulatifs |

**Note**
Le cours est découpé en modules. Chacun porte un code de trois lettres, que
vous retrouverez partout : sur les slides, dans le nom des exercices, dans
les packages Java et sur Moodle. Le code désigne le sujet, pas la séance. Un
module peut occuper moins d'une séance ou en déborder.

Sur Moodle, chaque séance a sa propre section, qui renvoie aux modules du
jour.

*Points à trancher avant construction :*
- *L'ordre du tableau suit l'ordre proposé le 15/09 (PKG après ITF, FIC
  avant FX). Il n'est pas appliqué. Si l'ordre actuel est gardé, PKG remonte
  après TMP et FIC descend après FX.*
- *Threads et log4j n'apparaissent plus (slide 6 d'origine).*
- *Faut-il une colonne « Séance » ? Je l'ai omise pour ne pas figer le
  calendrier dans le deck.*

---

### 1.6 · L'examen

**Source** d01/9, réécrite

**Slide**
- Sur machine, 2h30
- Une question par grand sujet du cours :
  - une classe simple et une exception
  - une classe générique
  - des tests JUnit
  - des classes abstraites et l'héritage
  - une interface JavaFX
  - ⟦une 6e question sur les fichiers ?⟧

**Note**
L'examen reprend les formes travaillées pendant l'année. Chaque question
correspond à un ou plusieurs modules. Les exercices récapitulatifs de fin
d'année en suivent la structure.

⟦à compléter : conditions de l'épreuve (matériel autorisé, remise des
fichiers), pondération, seuil de réussite⟧

*Point à trancher : la 6e question dépend de la durée de l'épreuve (2h30
pour 5 questions aujourd'hui). Tant que ce n'est pas décidé, la slide peut
dire « cinq ou six questions ».*

---

## Section 2 - Ma façon de travailler

### 2.1 · Intercalaire

**Slide**
- 2. Ma façon de travailler

**Note**
Cette section explique comment les supports du cours s'articulent, et ce
qu'on attend de vous entre deux séances.

---

### 2.2 · Le déroulé d'un module

**Source** nouvelle

**Slide**
- La théorie, sur les slides
- Une démonstration en direct, dans IntelliJ
- Les exercices, dans le fascicule du module
- Une étape du fil rouge GameHub

**Note**
Un module suit toujours le même chemin. Les slides posent les notions. Une
démonstration les met en pratique devant vous, dans IntelliJ. Vous pratiquez
ensuite avec les exercices du fascicule, puis vous faites avancer GameHub,
le projet qui traverse toute l'année.

Les slides ne contiennent plus d'énoncés. Une slide de renvoi indique le
code des exercices à faire, par exemple **POO.1**.

---

### 2.3 · Les fascicules d'exercices

**Source** nouvelle

**Slide**
- Un fascicule par module
- Des exercices numérotés par sujet : POO.1, TAB.3, EXC.2
- Chaque énoncé : objectif, contexte, énoncé, spécifications, vérification,
  questions à se poser

**Note**
Chaque module a son fascicule Word. Les exercices y sont numérotés par
sujet : **TAB.3** est le troisième exercice sur les tableaux, quelle que
soit la séance où on le fait. Le même code sert de nom de package :
`TAB.3` se trouve dans `be.ephec.java.tab.e03`.

Tous les énoncés suivent la même structure. La rubrique « questions à se
poser » est la plus importante : elle signale ce que l'exercice cherche à
vous faire découvrir.

---

### 2.4 · Le projet ExercicesJava

**Source** nouvelle

**Slide**
- Un projet Maven, à ouvrir dans IntelliJ
- Une archive zip par séance
- Des squelettes à compléter
- `UnsupportedOperationException` = « pas encore écrit »

**Note**
Les exercices sont livrés dans un projet Maven, `ExercicesJava`. À chaque
séance, une archive zip ajoute les exercices du jour. Le guide IntelliJ et
le mémento technique expliquent comment l'ouvrir.

Les classes sont déjà déclarées, avec leurs méthodes. Leur corps se contente
de lever une `UnsupportedOperationException` : le projet compile dès le
départ, et c'est à vous de remplacer ces lignes par le vrai code.

⟦à confirmer : quand et comment les solutions sont-elles distribuées ?⟧

---

### 2.5 · Les tests fournis

**Source** nouvelle

**Slide**
- La plupart des exercices ont une classe de test
- Rouge : la réponse n'est pas encore correcte
- Vert : la réponse est correcte
- Les tests ne vérifient jamais ce qui est laissé à votre choix

**Note**
La plupart des exercices sont accompagnés d'une classe de test JUnit. Vous
la lancez vous-même, aussi souvent que vous voulez : c'est votre moyen de
savoir si votre réponse est correcte, sans attendre la séance suivante.

Un test vert ne dit pas que votre code est bien écrit, seulement qu'il fait
ce qui est demandé. Et les tests ne vérifient jamais un point que l'énoncé
laisse à votre choix.

Vous n'avez pas besoin de comprendre JUnit pour lancer ces tests. Le module
JUN vous apprendra à écrire les vôtres.

---

### 2.6 · Le fil rouge GameHub

**Source** nouvelle

**Slide**
- Un projet unique, qui grandit toute l'année
- Des étapes numérotées : G.1, G.2, ...
- Chaque module y ajoute une pièce

**Note**
GameHub est une plateforme de jeux, construite petit à petit. Ses énoncés
sont numérotés G.1, G.2, et ainsi de suite, dans l'ordre imposé par leurs
dépendances. Il vit dans un projet séparé du recueil d'exercices.

Là où un exercice isole une notion, GameHub vous oblige à la faire cohabiter
avec tout ce que vous avez déjà écrit. C'est la situation que vous
retrouverez à l'examen, et dans tout projet réel.

⟦à confirmer : mode de distribution de GameHub (le choix Git ou zip n'est
pas tranché)⟧

---

### 2.7 · Le support imprimable

**Source** nouvelle

**Slide**
- Les slides : un appui pour le cours
- Le support : la théorie rédigée, avec le code

**Note**
Les slides sont volontairement sobres. Le texte complet se trouve dans le
support imprimable, qui reprend chaque notion en prose, avec le code
formaté. C'est ce document qu'il faut relire.

⟦à confirmer : un document unique pour tous les modules, ou un par module,
au moment de la première séance⟧

---

## Section 3 - Les mémentos

### 3.1 · Intercalaire

**Slide**
- 3. Les mémentos

**Note**
À côté des fascicules et du support, trois documents de référence vous
accompagnent toute l'année. On ne les lit pas d'une traite : on les ouvre
quand un énoncé ou une slide y renvoie.

---

### 3.2 · Trois documents de référence

**Source** nouvelle

**Slide** *(tableau)*

| Document | Préfixe | Pour |
|---|---|---|
| Guide IntelliJ | `IDE`, `ERR` | se servir de l'outil, comprendre un message d'erreur |
| Mémento technique | `TEC` | comprendre ce qui se passe sous le capot |
| Mémento Clean Code | `CC` | écrire du code lisible |

**Note**
Les trois documents sont sur Moodle, dans la section Documents. Chacun est
découpé en sections courtes, numérotées et préfixées. Les sommaires et les
renvois internes sont cliquables.

*Point à trancher : `Memento_Exercices.docx` (la section commune sur les
tests) doit-il figurer dans ce tableau ?*

---

### 3.3 · Lire un renvoi

**Source** nouvelle

**Slide**
- `IDE.14` : section 14 du guide IntelliJ
- `CC-MET.8` : règle 8 de la section « méthodes » du mémento Clean Code
- Un renvoi vous dit où chercher, au moment où vous en avez besoin

**Note**
Les fascicules et les slides renvoient aux mémentos par ces codes. Par
exemple, l'exercice POO.5 vous demande de lire une Javadoc : il vous renvoie
à `IDE.14`, qui montre comment l'afficher sans quitter IntelliJ. Et le
module POO vous renvoie à `CC-MET.8` : une méthode agit ou répond, jamais les
deux.

Le premier renvoi arrive dès le module POO. Prenez l'habitude de le suivre.

---

### 3.4 · Le guide IntelliJ

**Source** nouvelle, d01/10 à 22 (reprises par le guide)

**Slide**
- 29 sections `IDE` : installer, créer, exécuter, déboguer
- 7 entrées `ERR` : les messages d'erreur fréquents

**Note**
Le guide couvre tout ce qu'il faut savoir d'IntelliJ pour ce cours, captures
d'écran à l'appui. Les entrées `ERR` partent du message affiché et expliquent
sa cause la plus probable : c'est le premier réflexe quand quelque chose ne
fonctionne pas.

⟦à confirmer : le résumé des sections IDE (je l'ai déduit, sans relire le
guide)⟧

---

### 3.5 · Le mémento technique

**Source** nouvelle, d01/24 à 28 (reprises par le mémento)

**Slide**
- La plateforme Java, la compilation, l'exécution
- Maven, JavaFX, Git, les archives zip
- 24 sections

**Note**
Le mémento technique explique ce qu'IntelliJ fait à votre place : ce qu'est
le JDK, comment un fichier `.java` devient un programme, comment Maven
récupère les bibliothèques. Vous pouvez écrire vos premiers programmes sans
le lire, mais il répond à la plupart des « pourquoi ça marche ? ».

⟦à confirmer : les intitulés exacts des sections TEC-PLA, TEC-CMP et TEC-EXE,
que j'ai interprétés d'après leur préfixe⟧

---

### 3.6 · Le mémento Clean Code

**Source** nouvelle

**Slide**
- 34 règles, en 7 sections
- Noms, méthodes, commentaires, objets, erreurs, tests, classes
- D'après *Clean Code*, de Robert C. Martin

**Note**
Un programme qui fonctionne n'est pas forcément un programme lisible. Le
mémento rassemble 34 règles simples pour écrire du code qu'un autre
développeur, ou vous-même dans six mois, comprendra sans effort. Elles
s'inspirent du livre de Robert C. Martin ; la section « Pour aller plus
loin » propose aussi une vidéo en français de Julien Lucas.

Ces règles ne sont pas un module à part. Elles arrivent par petites touches,
au fil des exercices, quand elles deviennent utiles.

---

### 3.7 · Où trouver les documents

**Source** d01/23 et d01/45, réécrites

**Slide**
- Moodle, section Documents
- La Javadoc de Java 21 : docs.oracle.com/en/java/javase/21/docs/api/

**Note**
Tous les documents du cours sont sur Moodle. La Javadoc officielle décrit
chaque classe de la bibliothèque standard ; le cours utilise Java 21, prenez
donc la documentation de cette version.

⟦à compléter : le reste du contenu de d01/23 et d01/45⟧

---

## Clôture

### 4.1 · En résumé

**Source** nouvelle

**Slide**
- Un module = un sujet, avec son code de trois lettres
- Slides, démonstration, fascicule, GameHub
- Des tests pour vérifier vous-même vos réponses
- Des mémentos à ouvrir quand un renvoi vous y envoie

**Note**
Vous avez maintenant la carte du cours. Le module suivant, POO, entre dans
le vif du sujet : il commence par ce qui change quand on passe de C# à Java.

---

# Annexe - Ce que j'attends pour construire le deck

1. **Le deck POO finalisé** (`.pptx`), qui sert de gabarit : masque,
   couleurs, intercalaires, indicateur de section en bas à droite.
2. **L'ancien deck 01**, ou au moins ses slides 1 à 9, 23 et 45.
3. **`finaliser_deck_poo.py`**, pour le généraliser en un finaliseur commun
   aux deux modules plutôt que d'en écrire un second.
4. **Les réponses aux points ⟦à compléter⟧ et ⟦à confirmer⟧** ci-dessus.
