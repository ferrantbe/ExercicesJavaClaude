---
module: REC
titre: Exercices récapitulatifs
accroche: Deux séries de révision, dans la forme de l'examen
---

Ce module n'apporte aucune notion. Il vous donne deux séries de cinq exercices, à faire chez vous pendant les semaines sans cours, et chacun reprend la forme d'une question d'examen. Les modules précédents vous ont fait pratiquer une notion à la fois, avec le titre du module au-dessus de l'énoncé ; l'examen ne donne pas ce titre. Chaque question y combine deux ou trois modules, et la première difficulté est de reconnaître lesquels.

> **À la fin de ces deux séries, vous saurez**
> - reconnaître, dans un énoncé sans titre, les modules qu'il mobilise ;
> - lire une classe de test avant d'écrire, pour savoir ce qui sera vérifié ;
> - concevoir une classe ou une hiérarchie à partir de rien, sans squelette ;
> - mesurer le temps que vous prend chaque forme de question, et donc ce qu'il vous reste à revoir.

## 1. Les formes de l'examen

| Question | Sa forme, stable d'une session à l'autre | Modules |
|---|---|---|
| 1 | Une classe simple, et son exception | POO, EXC |
| 2 | Un type générique, et une collection | GEN, COL |
| 3 | Écrire les tests, corriger la classe | JUN |
| 4 | Interfaces et classes abstraites | ABS, ITF |
| 5 | Compléter une fenêtre JavaFX | FX, LAM |

Les formes changent peu d'une session à l'autre : c'est la raison d'être des exercices récapitulatifs, qui les reprennent une à une. Une énumération se glisse dans l'une des trois premières questions ; elle n'a pas sa ligne, elle peut apparaître partout. Le `static`, la `Map` et le tri par comparateur n'ont pas de question attitrée non plus : ce sont les trois points que les copies oublient le plus.

## 2. Les deux séries

La **première série**, `REC.1` à `REC.5`, se fait après le module JUN. Elle couvre les classes, les exceptions, les hiérarchies, les énumérations, les collections, le mot-clé `static` et l'écriture de tests. La **seconde**, `REC.6` à `REC.10`, se fait après le premier module JavaFX, et ajoute les types génériques, les lambdas et une première fenêtre.

| Code | Ce qu'il reprend | Modules |
|---|---|---|
| `REC.1` | Question 1 : une classe, une exception, un affichage formaté | POO, EXC |
| `REC.2` | Question 4 : interface, deux niveaux d'abstraction, énumération | ABS, ITF, ENU, COL |
| `REC.3` | Question 3 : écrire les tests, puis corriger ce qu'ils révèlent | JUN, EXC |
| `REC.4` | `static`, `Map`, un comparateur, une exception | STA, COL, EXC |
| `REC.5` | Question 1 sans squelette, comme à l'examen | POO, EXC |
| `REC.6` | Question 2 : une classe générique et une collection non modifiable | GEN, COL, EXC |
| `REC.7` | Des méthodes génériques qui reçoivent des lambdas | GEN, LAM |
| `REC.8` | Questions 1 et 3 : les tests d'abord, écrits par vous, puis la classe | POO, EXC, JUN |
| `REC.9` | Question 5 : une fenêtre, un filtre d'événements | FX, LAM |
| `REC.10` | Question 4 sans squelette, comme à l'examen | ABS, ITF, ENU, COL |

Deux exercices, `REC.5` et `REC.10`, n'ont pas de squelette, comme `ABS.5` : vous partez d'un `Programme` vide et d'une classe de test en commentaire, à décommenter quand vos classes existent. C'est la situation de l'examen, où aucune classe n'est donnée.

## 3. Comment prendre une série

**Lisez la classe de test avant d'écrire.** À l'examen, elle vous est donnée avec chaque question ; elle dit, mieux que l'énoncé, ce qui sera vérifié. Prenez l'habitude de la parcourir d'abord, ici, où rien n'est en jeu.

**Chronométrez-vous.** Une question d'examen vaut une trentaine de minutes. Le chronomètre n'est pas là pour vous presser : c'est une mesure. Un exercice qui vous prend une heure dit quel module revoir, et c'est précisément l'information que vous cherchez en révisant.

**Le corrigé après le test vert, ou après avoir vraiment bloqué.** Un corrigé lu trop tôt donne l'impression d'avoir compris, et cette impression ne tient pas le jour de l'examen. Seul le code qu'on a écrit soi-même tient.

**Le mémento Clean Code est autorisé à l'examen.** Les corrigés y renvoient par leurs codes : vérifiez que vous savez retrouver `CC-CLS.3` sans chercher.

## 4. Et après les deux séries

Les deux séries préparent à la forme des questions ; l'examen blanc prépare au temps. C'est un examen d'une session précédente, tel qu'il a été donné, avec les projets de départ remis aux étudiants ce jour-là. Vous le ferez chez vous, en respectant les 2 h 30, puis nous le corrigerons ensemble.

Entre la dernière séance et l'examen, trois semaines. Prenez les modules par leur poids à l'examen, en commençant par ceux que les séries vous ont montrés fragiles.

## Ce qu'il faut retenir

- L'examen ne nomme pas les modules : chaque question en combine deux ou trois, et les formes sont stables.
- La classe de test se lit avant l'énoncé.
- Trente minutes par question : le chronomètre mesure ce qu'il reste à revoir.
- Deux exercices sans squelette, pour s'entraîner à concevoir ; l'examen blanc, pour s'entraîner au temps.
