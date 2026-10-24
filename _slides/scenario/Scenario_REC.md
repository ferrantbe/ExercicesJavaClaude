# Scénario du module REC - Exercices récapitulatifs

*Trois sections et une slide de clôture, 12 slides plus le sommaire. Un deck
court, qui présente les deux séries de révision ; il n'enseigne rien, les
fascicules et les mémentos le font. Rubriques : `**Source**` et `**Réserve**`
sont des commentaires de fabrication, `**Slide**` et `**Note**` produisent le
contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_rec.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Réviser dans la forme de l'examen | Pourquoi |
| 2 | Première série, après JUN | Série 1 |
| 3 | Seconde série, après JavaFX | Série 2 |

La slide de clôture (4.1) n'a pas d'intercalaire, comme la slide 5.1 du
deck FIC.

**Sources** : `REC_enonces.docx`, l'ancien deck 13 (dix exercices
récapitulatifs, repris et remis aux normes du recueil), les six examens
précédents (2022 à 2025), les décisions du 24/10/2026 (deux séries, à faire
chez soi pendant les semaines sans cours ; examen blanc = première session
2025-2026).

**Place dans le cours** : seizième deck, mais il se joue en deux fois. La
section 2 se montre en fin de séance 9, juste avant la semaine sans cours du
30/03 ; la section 3 en fin de séance 12, avant les deux semaines sans cours
du 27/04 et du 04/05. La section 1 se montre la première fois, et se rappelle
en une phrase la seconde. Le calendrier réel pouvant bouger, les slides ne
donnent aucune date : elles disent « après JUN » et « après JavaFX ».

**Ce que le deck ne fait pas** : il ne reprend aucun énoncé (le fascicule), ne
rappelle aucune notion (les decks des modules), et ne détaille pas l'examen
blanc (la slide 4.1 l'annonce seulement). Douze slides, dont trois
intercalaires et quatre renvois : il doit se jouer en dix minutes.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module REC
- Exercices récapitulatifs

**Note**

Ce module est différent des autres : il n'apporte aucune notion. Il vous
donne deux séries d'exercices, à faire chez vous pendant les semaines sans
cours, et chacun reprend la forme d'une question d'examen.

Le dossier compte un fascicule, des squelettes, des tests et des corrigés,
comme les autres modules. Ce qui change, c'est ce qu'on attend de vous : non
plus apprendre une chose, mais reconnaître laquelle sert.

---

## Section 1 - Réviser dans la forme de l'examen

### 1.1 · Réviser dans la forme de l'examen

*(intercalaire)*

### 1.2 · L'examen ne prévient pas

**Source** nouvelle ; les six examens précédents

**Slide**

Chaque question d'examen mobilise plusieurs modules, sans dire lesquels.

| N° | Sa forme, stable d'une session à l'autre | Modules |
|---|---|---|
| 1 | Une classe simple, et son exception | POO, EXC |
| 2 | Un type générique, et une collection | GEN, COL |
| 3 | Écrire les tests, corriger la classe | JUN |
| 4 | Interfaces et classes abstraites | ABS, ITF |
| 5 | Compléter une fenêtre JavaFX | FX, LAM |

**Note**

Les exercices des modules vous ont fait pratiquer une notion à la fois, avec
le titre du module au-dessus de l'énoncé. L'examen ne donne pas ce titre.
Chaque question combine deux ou trois modules, et la première difficulté est
de reconnaître lesquels.

Le tableau reprend les cinq formes de question. Elles changent peu d'une
session à l'autre : c'est la raison d'être des exercices récapitulatifs, qui
les reprennent une à une.

Une énumération se glisse dans l'une des trois premières questions : elle
n'a pas sa ligne, elle peut apparaître partout.

---

### 1.3 · Comment prendre une série

**Source** nouvelle ; `REC_enonces.docx`, « Comment les prendre »

**Slide**

- Lisez la classe de test avant d'écrire : à l'examen, elle vous est donnée
- Chronométrez-vous : une question vaut une trentaine de minutes
- Le corrigé après le test vert, ou après avoir vraiment bloqué
- Le mémento Clean Code est autorisé : entraînez-vous à y retrouver une règle

**Note**

Quatre consignes, et la première est la plus importante. À l'examen, chaque
question est livrée avec sa classe de test : elle dit, mieux que l'énoncé,
ce qui sera vérifié. Prenez l'habitude de la lire d'abord, ici, où rien
n'est en jeu.

Le chronomètre n'est pas là pour vous presser : c'est une mesure. Un
exercice qui vous prend une heure au lieu de trente minutes dit quel module
revoir, et c'est précisément l'information que vous cherchez en révisant.

Le corrigé est public, comme pour tous les modules. Il ne vous apprend rien
tant que vous ne vous êtes pas confronté au problème : lu trop tôt, il donne
l'impression d'avoir compris, et cette impression ne tient pas le jour de
l'examen.

Le mémento Clean Code fait partie des notes autorisées. Les corrigés y
renvoient par leurs codes : vérifiez que vous savez retrouver `CC-CLS.3` sans
chercher.

---

## Section 2 - Première série, après JUN

### 2.1 · Première série, après JUN

*(intercalaire)*

### 2.2 · Cinq exercices, cinq formes

**Source** nouvelle ; `REC_enonces.docx`

**Slide**

Tout ce qui précède JUN, à faire pendant la semaine sans cours.

| Code | Ce qu'il reprend | Modules |
|---|---|---|
| REC.1 | Question 1 : une classe et son exception | POO, EXC |
| REC.2 | Question 4 : hiérarchie et énumération | ABS, ITF, ENU |
| REC.3 | Question 3 : les tests, puis la correction | JUN |
| REC.4 | `static`, `Map`, comparateur, exception | STA, COL, EXC |
| REC.5 | Question 1 sans squelette | POO, EXC |

**Note**

Cinq exercices, une trentaine de minutes chacun : une soirée de révision,
ou cinq moments séparés. L'ordre n'est pas imposé, mais `REC.5` vient
logiquement après `REC.1` : c'est la même forme, sans le squelette.

`REC.3` est celui qui ressemble le plus à l'examen. La classe est fournie,
elle a l'air juste, et vous devez écrire les tests qui la mettent à
l'épreuve. Il y a deux défauts à trouver ; si vos tests n'en révèlent aucun,
c'est qu'un cas manque, et le fascicule donne la liste.

`REC.4` n'a pas de question d'examen attitrée : il rassemble ce qui se
glisse dans n'importe laquelle. Le champ `static`, la `Map` et le tri par
comparateur sont les trois points que les copies oublient le plus.

---

### 2.3 · Exercices

**Slide**

- **REC.1** - Une horloge sur 24 heures
- **REC.2** - Un parc de véhicules
- **REC.3** - Tester, puis corriger

**Note**

Les trois premiers exercices de la série, dans le fascicule REC. Les
squelettes et les tests sont dans `be.ephec.java.rec`, de `e01` à `e03`.

Les corrigés sont publiés en même temps. Relisez la consigne de la slide
1.3 avant de les ouvrir.

---

### 2.4 · Exercices, suite

**Slide**

- **REC.4** - Le registre des inscrits
- **REC.5** - Un compte bancaire, à partir de rien

**Note**

`REC.5` n'a qu'un `Programme` vide et une classe de test en commentaire,
comme `ABS.5` : c'est l'exercice à faire en dernier, et à chronométrer.

---

## Section 3 - Seconde série, après JavaFX

### 3.1 · Seconde série, après JavaFX

*(intercalaire)*

### 3.2 · Cinq exercices, le reste du programme

**Source** nouvelle ; `REC_enonces.docx` ; liste validée le 24/10/2026

**Slide**

Les génériques, les lambdas et une première fenêtre, à faire pendant les deux semaines sans cours.

| Code | Ce qu'il reprend | Modules |
|---|---|---|
| REC.6 | Question 2 : historique générique | GEN, COL |
| REC.7 | Méthodes génériques et lambdas | GEN, LAM |
| REC.8 | Questions 1 et 3 : classe et tests | POO, JUN |
| REC.9 | Question 5 : une fenêtre qui filtre | FX, LAM |
| REC.10 | Question 4 sans squelette | ABS, ITF |

**Note**

La seconde série complète la première : les deux formes qui manquaient, la
classe générique et la fenêtre, et deux exercices sans squelette de plus.

`REC.6` reprend presque mot pour mot la question 2 de la première session
2025 : c'est volontaire. L'examen blanc, après la dernière séance, vous
donnera cette session entière à faire dans les conditions réelles ; vous
aurez alors déjà rencontré l'une de ses questions, et vous mesurerez ce que
la révision vous a apporté.

`REC.9` est la seule fenêtre JavaFX des séries. Elle tient en une classe, et
ne demande que ce que le premier deck FX a montré : un `TextField`, un
filtre d'événements, une lambda.

---

### 3.3 · Exercices

**Slide**

- **REC.6** - Un historique générique
- **REC.7** - Outils génériques et lambdas
- **REC.8** - Un thermomètre, et ses tests

**Note**

Les trois premiers exercices de la seconde série, `e06` à `e08` dans
`be.ephec.java.rec`.

---

### 3.4 · Exercices, suite

**Slide**

- **REC.9** - Une fenêtre qui filtre
- **REC.10** - Une hiérarchie, à partir de rien

**Note**

`REC.9` n'a pas de test automatique, comme tous les exercices JavaFX : le
fascicule dit ce que la fenêtre doit montrer. `REC.10` a sa classe de test
en commentaire, comme `REC.5`.

---

## Section 4 - Clôture

### 4.1 · Et après les deux séries

**Source** nouvelle ; décisions du 24/10/2026

**Slide**

- Après la dernière séance : l'examen blanc, un vrai examen d'une session précédente
- À faire chez soi, en 2 h 30, avec ses projets de départ et ses tests
- La correction se fait ensemble, en séance ou sur Moodle
- D'ici là : les deux séries, et un module par semaine à relire

**Note**

Les deux séries préparent à la forme des questions ; l'examen blanc prépare
au temps. C'est l'examen de la première session 2025-2026, tel qu'il a été
donné, avec les projets de départ remis aux étudiants ce jour-là. Vous le
ferez chez vous, en respectant les 2 h 30, puis nous le corrigerons
ensemble.

La dernière ligne est un conseil de rythme. Entre la dernière séance et
l'examen, trois semaines : relire un module par jour est irréaliste, un par
semaine est trop peu. Prenez les modules par leur poids à l'examen, en
commençant par ceux que les séries vous ont montré fragiles.
