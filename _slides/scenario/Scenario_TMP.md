# Scénario du module TMP

*Dates et heures. Version 2, 17/09/2026.*

Ce document décrit le deck du module slide par slide, sur le modèle de
`Scenario_POO.md`. Il sert de base à la construction du `.pptx`.

Module : `TMP` — six exercices (`TMP.1` à `TMP.6`), une démonstration de
12 minutes jouée avant `TMP.1`.

---

## Conventions de ce scénario

| Rubrique | Contenu |
|---|---|
| **Source** | `d02/7` = ancien deck 02, slide 7 ; `fasc` = fascicule `TMP_enonces.docx` ; `nouvelle` |
| **Slide** | ce qui s'affiche, en puces courtes |
| **Note** | la prose du support imprimable, dans les notes du présentateur |
| **Réserve** | commentaire de fabrication, ni sur la slide ni dans les notes |

---

## Le principe qui commande tout le reste

Quatre des six énoncés TMP sont écrits comme des **découvertes**. Le deck
pose la question, l'exercice fournit le choc, et une slide de retour
consolide après la correction — en renvoyant explicitement à la slide où
la question a été posée.

| Exercice | Question posée | Réponse donnée |
|---|---|---|
| `TMP.2` | 3.2 · Décaler une date | 3.4 · Retour |
| `TMP.3` | 5.2 · Ce que `LocalDate` ne contient pas | 5.4 · Retour |
| `TMP.4` | 6.2 · Ajouter des mois | 6.4 · Retour |
| `TMP.5` | 7.3 · `Duration` | 7.5 · Retour |

Trois omissions sont donc volontaires : `atStartOfDay()`,
`toMinutesPart()` et `withResolverStyle(STRICT)` n'apparaissent nulle part
avant leur exercice.

---

## Déroulé

| Section | Slides | Exercice à la sortie |
|---|---|---|
| Ouverture | 0.1 | — |
| 1. Les classes de `java.time` | 1.1 à 1.11 | démonstration |
| 2. Mesurer un écart | 2.1 à 2.4 | `TMP.1` |
| 3. Une date ne change pas | 3.1 à 3.4 | `TMP.2` |
| 4. Un détour par l'affichage | 4.1 à 4.6 | — |
| 5. Une date n'est pas un instant | 5.1 à 5.4 | `TMP.3` |
| 6. L'arithmétique du calendrier | 6.1 à 6.4 | `TMP.4` |
| 7. `Period` ou `Duration` | 7.1 à 7.5 | `TMP.5` |
| 8. Une date et son texte | 8.1 à 8.5 | `TMP.6` |
| Clôture | 9.1 | — |

45 slides, plus la slide « Au programme » posée par le finaliseur.

---

### 0.1 · Titre du module

**Source** gabarit, slide de titre

**Slide**
- Module TMP
- Dates et heures

**Note** *(aucune)*

---

## Section 1 — Les classes de java.time

### 1.1 · Intercalaire

**Slide**
- Les classes de java.time

**Note**
Manipuler une date paraît simple tant qu'on ne s'y met pas. Cette section
montre pourquoi le JDK y consacre un package entier, quelles sont les
trois classes que vous utiliserez tout le temps, et comment les fabriquer,
les lire et les comparer.

---

### 1.2 · Une date, c'est plus compliqué qu'il n'y paraît

**Source** nouvelle

**Slide**
- Combien de jours dans un mois ? Ça dépend…
- Combien de jours dans une année ? Ça dépend…
- Le 31 février existe-t-il ? Non, mais rien n'empêche de l'écrire
- Faire soi-même ce calcul, c'est se tromper

**Note**
Vous pourriez être tenté de stocker une date dans trois `int` et de faire
l'arithmétique vous-même. C'est ce que faisaient les programmes des années
90, et c'est la source d'une quantité impressionnante de bogues : mois de
longueur variable, années bissextiles, passage d'année. Le JDK fait ce
travail pour vous, et le fait correctement. Votre part consiste à savoir
quelle classe demander.

---

### 1.3 · Les trois classes du quotidien

**Source** d02/5, resserrée

**Slide**
- La classe `LocalDate` - une date, sans heure - `2027-01-19`
- La classe `LocalTime` - une heure, sans date - `18:00`
- La classe `LocalDateTime` - les deux - `2027-01-19T18:00`
- « Local », donc sans fuseau horaire
- Seul `now()` consulte celui de la machine, pour savoir quelle date il est

**Note**
Ces trois classes vivent dans `java.time`, arrivé avec Java 8. Le mot
« Local » signifie qu'elles ignorent les fuseaux horaires : elles décrivent
une date ou une heure telle qu'on la lit sur un calendrier ou une horloge
murale, sans dire où. Pour un anniversaire ou un horaire de cours, c'est
exactement ce qu'il faut. Pour un vol Bruxelles-Tokyo, il faudra
`ZonedDateTime`, qui dépasse ce cours.

Une nuance qui coûte cher quand on l'ignore : le fuseau de la machine
n'intervient qu'une fois, dans `now()`, pour décider quelle date il est
à cet instant. L'objet produit n'en garde aucune trace. Un
`LocalDateTime` déplacé d'un serveur à l'autre désigne donc toujours la
même heure de calendrier, et c'est précisément ce qu'on lui demande.

---

### 1.4 · Laquelle choisir ?

**Source** fasc, tableau d'ouverture

**Slide**

| Ce que vous représentez | La classe |
|---|---|
| une date de naissance, une échéance | `LocalDate` |
| une heure d'ouverture | `LocalTime` |
| un rendez-vous, un horodatage | `LocalDateTime` |
| un écart en années, mois et jours | `Period` |
| un écart en heures, minutes et secondes | `Duration` |

**Note**
Ce tableau est la carte du module. Les deux dernières lignes, `Period` et
`Duration`, feront l'objet de la section 7 — retenez pour l'instant qu'il
existe deux façons de mesurer un écart, et qu'elles ne se valent pas.

---

### 1.5 · Tout est dans le JDK

**Source** nouvelle

**Slide**
- Le package `java.time` fait partie de la bibliothèque standard
- Rien à installer, rien à déclarer dans le `pom.xml`
- Le détail : mémento technique, **TEC-PLA.1**

**Note**
Le package `java.time` ne demande aucune dépendance : il arrive avec le JDK. C'est ce
qui distingue la bibliothèque standard des bibliothèques tierces, que
Maven devra aller chercher.

---

### 1.6 · Fabriquer une date

**Source** d02/7, lignes 1 et 2

**Slide**
- Aucun constructeur : on utilise des méthodes statiques
- La méthode `parse` attend le format ISO, `AAAA-MM-JJ`
```java
LocalDate aujourdhui = LocalDate.now();
LocalDate naissance  = LocalDate.of(1990, 5, 17);
LocalDate lue        = LocalDate.parse("1990-05-17");
```

**Note**
La classe `LocalDate` n'a pas de constructeur public. On fabrique une date par une
méthode statique, appelée sur la classe et non sur un objet : `now`, `of`
ou `parse`. Vous avez rencontré ce motif au module POO, avec les méthodes
statiques des wrappers.

La méthode `of` prend les nombres dans l'ordre naturel, année, mois, jour — et le mois
va de 1 à 12, sans le décalage d'une case qu'on trouve dans de vieilles
API. La méthode `parse` n'accepte que le format ISO ; tout autre format demandera un
`DateTimeFormatter`, en section 8.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.FabriquerEtLireUneDate`.

---

### 1.7 · Lire un morceau de date

**Source** d02/7, lignes 5 à 7

**Slide**
- Les noms sont prévisibles, la complétion suffit
- La méthode `getDayOfWeek` retourne une valeur de type `DayOfWeek`
- Une énumération, pas une classe - les énumérations seront vues au module **ENU**
```java
int annee          = naissance.getYear();
int jourDuMois     = naissance.getDayOfMonth();
DayOfWeek jour     = naissance.getDayOfWeek();
boolean bissextile = naissance.isLeapYear();
int joursDuMois    = naissance.lengthOfMonth();
```

**Note**
Les accesseurs sont nombreux et leurs noms sont prévisibles. Deux
remarques. La méthode `getDayOfWeek` ne retourne pas un nombre mais un `DayOfWeek`, qui
est une énumération : un type dont les valeurs sont connues d'avance. Vous
les étudierez au module ENU, et vous pourrez alors relire cette ligne ;
pour l'instant, il suffit de savoir que `jour` peut s'afficher et se
comparer. Et `lengthOfMonth` répond à une question que vous ne voudrez
jamais calculer vous-même.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.FabriquerEtLireUneDate`.

---

### 1.8 · Comparer deux dates

**Source** nouvelle

**Slide**
- Pas de `<` ni de `>` : ce sont des objets
```java
naissance.isBefore(aujourdhui);   // true
naissance.isAfter(aujourdhui);    // false
naissance.isEqual(aujourdhui);    // false
```

**Note**
Les opérateurs de comparaison ne fonctionnent que sur les types primitifs.
Une date est un objet ; on la compare donc par des méthodes. C'est le même
raisonnement que pour les chaînes, où `equals` remplace `==`. Cette
distinction entre primitifs et objets, vue au module POO, resservira tout
au long de l'année.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.FabriquerEtLireUneDate`.

---

### 1.9 · L'heure seule

**Source** d02/9, resserrée

**Slide**
- Mêmes conventions que `LocalDate`
- Des constantes : `LocalTime.NOON`, `LocalTime.MIDNIGHT`
```java
LocalTime debut = LocalTime.of(18, 0);
LocalTime fin   = LocalTime.parse("21:35");
int heure       = debut.getHour();
```

**Note**
La classe `LocalTime` suit exactement les mêmes conventions : pas de constructeur,
des méthodes statiques, des accesseurs prévisibles. Quelques constantes
sont fournies pour les valeurs remarquables.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.ExemplesAvecLocalTime`.

---

### 1.10 · Les deux à la fois

**Source** d02/10, resserrée

**Slide**
- La classe `LocalDateTime` sait retourner chacune de ses moitiés
```java
LocalDateTime rdv = LocalDateTime.of(2027, 1, 19, 18, 0);
LocalDateTime now = LocalDateTime.now();

rdv.toLocalDate();   // 2027-01-19
rdv.toLocalTime();   // 18:00
```

**Note**
La classe `LocalDateTime` combine les deux, et sait retourner chacune de ses moitiés.
Retenez cette dernière possibilité : passer d'une classe à l'autre est
souvent la réponse à une méthode qui refuse vos arguments.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.LesDeuxALaFois`.

---

### 1.11 · Démonstration

**Source** `Demo_TMP.docx`

**Slide**
- Démo : explorer une classe du JDK sans quitter l'éditeur

**Note**
La démonstration ne présente aucune API nouvelle. Elle montre comment
trouver seul, dans l'éditeur, ce qu'on ne connaît pas encore : la
complétion comme table des matières, la bulle de documentation comme
réseau de liens, et le piège d'un nom qui ressemble à ce qu'on cherche sans
en être. C'est la méthode que les énoncés supposent acquise chaque fois
qu'ils écrivent « cherchez dans la Javadoc ». Renvois `IDE.11` et `IDE.14`.

---

## Section 2 — Mesurer un écart

### 2.1 · Intercalaire

**Slide**
- Mesurer un écart

**Note**
Combien de jours entre deux dates ? La question a l'air anodine ; elle
demande de choisir une unité, et de savoir dans quel sens compter.

---

### 2.2 · `ChronoUnit`, l'unité de mesure

**Source** d02/7, dernière ligne

**Slide**
- L'unité contient la méthode, pas l'inverse
- On écrit `ChronoUnit.DAYS.between`, et pas `ChronoUnit.between.DAYS`…
```java
import java.time.temporal.ChronoUnit;

long jours = ChronoUnit.DAYS.between(naissance, aujourdhui);
long mois  = ChronoUnit.MONTHS.between(naissance, aujourdhui);
```

**Note**
La tournure surprend : c'est l'unité qui contient la méthode `between`, et les
deux dates sont ses arguments. Lisez-la de gauche à droite — « en jours,
l'écart entre ceci et cela ». `ChronoUnit` propose `DAYS`, `WEEKS`,
`MONTHS`, `YEARS`, et une dizaine d'autres.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.ChronoUnitLUniteDeMesure`.

---

### 2.3 · Deux pièges de comptage

**Source** nouvelle

**Slide**
- La méthode `between` compte des unités **entières**
- Par conséquent, du 1er au 30 janvier : `MONTHS.between` retourne **0**
- L'ordre des arguments décide du signe : on peut récupérer un nombre négatif…
- Le résultat est un `long`, pas un `int` (c'est logique si on compte en secondes…)

**Note**
La méthode `between` tronque : entre le 1er et le 30 janvier il n'y a pas un mois
entier, donc la réponse est zéro. Ce n'est pas un défaut, c'est une
définition, et il faut la connaître avant de s'en étonner.

L'ordre compte aussi : inverser les deux dates inverse le signe. Le
résultat est un `long` parce qu'un écart exprimé en secondes déborde très
vite la capacité d'un `int` — la question revient en section 5.

---

### 2.4 · Exercices

**Source** fasc

**Slide**
- **TMP.1** - Mesurer un écart entre deux dates

**Note**
Quatre méthodes statiques qui mesurent le même écart dans quatre unités, et
un programme qui les appelle. Les méthodes ne lisent rien au clavier et
n'affichent rien : elles reçoivent deux dates et retournent un nombre. C'est
la séparation entre le calcul et le dialogue, posée au module POO et
appliquée partout ensuite.

---

## Section 3 — Une date ne change pas

### 3.1 · Intercalaire

**Slide**
- Une date ne change pas

**Note**
Section courte, et volontairement incomplète : elle pose une question, vous
la tranchez par l'exercice, et la dernière slide en tire la règle.

---

### 3.2 · Décaler une date

**Source** d02/7, lignes 3 et 4

**Slide**
- Des noms limpides, un comportement à vérifier
- Qu'affiche la dernière ligne ?
- Essayez d'abord de deviner le résultat…
- Ensuite, exécutez le code pour vérifier votre intuition
```java
LocalDate rendezVous = LocalDate.of(2027, 1, 19);

rendezVous.plusWeeks(1);
System.out.println(rendezVous);   // ?
```

**Note**
Ces méthodes existent par dizaines et leurs noms ne posent aucune
difficulté : `plusDays`, `minusMonths`, `withDayOfMonth`. Leur comportement,
en revanche, mérite qu'on regarde de près ce qu'elles font réellement.

Posez la question à la classe avant d'exécuter. C'est l'objet de l'exercice
qui suit — ne le devinez pas, exécutez-le. La réponse arrive deux slides
plus loin.

**Réserve**
Ne pas dire ici que les dates sont immuables. TMP.2 est construit pour le
faire découvrir.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.DecalerUneDate`.

---

### 3.3 · Exercices

**Source** fasc

**Slide**
- **TMP.2** - Les dates sont immuables
- Exécutez d'abord le `Programme` fourni, et lisez sa sortie

**Note**
Le programme fourni contient une erreur qui ne provoque ni refus du
compilateur, ni plantage, ni message d'aucune sorte — et donne pourtant un
résultat faux. Lisez sa sortie avant de corriger quoi que ce soit.

---

### 3.4 · Retour sur « Décaler une date »

**Source** fasc, section « Ce qu'il faut retenir »

**Slide**
- La méthode `plusWeeks` ne modifie rien : elle **retourne** une nouvelle date
- Si cette nouvelle date n'est pas affectée à une variable ou utilisée, elle est perdue
- Même mécanique que `String.toUpperCase()`
- Ce n'est pas une gêne, c'est une garantie - **CC-MET.6**

**Note**
Un `LocalDate` est immuable : sa valeur est fixée à la construction et ne
changera jamais. La méthode `plusWeeks` fabrique un nouvel objet et le retourne ; si vous
ne l'affectez pas, il est perdu. La slide « Décaler une date » affichait
donc deux fois la même date, et c'était normal.

Vous aviez déjà rencontré cette mécanique sans la nommer :
`texte.toUpperCase()` ne met pas la chaîne en majuscules, il en retourne une
autre.

L'intérêt dépasse les dates. Vous pouvez confier un objet immuable à
n'importe quelle méthode sans craindre qu'elle le modifie dans votre dos.
C'est la garantie que réclame `CC-MET.6` du mémento Clean Code, qui met en
garde contre les effets de bord.

---

## Section 4 — Un détour par l'affichage

### 4.1 · Intercalaire

**Slide**
- Un détour par l'affichage

**Note**
Interruption assumée. Les exercices qui suivent produisent des nombres
longs et des durées, et `println` ne suffira plus. C'est le seul moment de
l'année consacré à l'affichage formaté ; tout ce qui vient après s'en sert,
y compris le module TAB.

---

### 4.2 · `println` et `print`

**Source** nouvelle

**Slide**
- La méthode `print` sert dès qu'on construit une ligne morceau par morceau
```java
System.out.println("Bonjour");   // affiche et passe a la ligne
System.out.print("Bonjour");     // affiche, sans passer a la ligne

System.out.print("A");
System.out.print("B");           // => AB
```

**Note**
Vous connaissez `println` depuis le premier programme. Son petit frère
`print` fait la même chose sans le retour à la ligne, ce qui sert dès qu'on
construit une ligne morceau par morceau — l'affichage d'une matrice, par
exemple, au module TAB.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.PrintlnEtPrint`.

---

### 4.3 · `printf` : un gabarit et des valeurs

**Source** d02/43, refaite

**Slide**
- Le premier argument est un **gabarit**
- Chaque trou est rempli dans l'ordre
- `%n` : le retour à la ligne
```java
System.out.printf("%s a %d ans%n", "Max", 21);
// Max a 21 ans
```

**Note**
La méthode `printf` prend un gabarit et les valeurs qui viennent s'y loger. L'ordre
compte : le premier trou reçoit le premier argument. C'est plus long à
écrire qu'une concaténation, et beaucoup plus lisible dès qu'il y a trois
valeurs ou une question de présentation.

Employez `%n` plutôt que la barre oblique inversée n : `%n` produit le
retour à la ligne de la machine sur laquelle le programme tourne.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.PrintlnEtPrint`.

---

### 4.4 · Les gabarits utiles

**Source** d02/43, corrigée

**Slide**

| Gabarit | Résultat | Effet |
|---|---|---|
| `%d` | `1234567` | un entier |
| `%,d` | `1,234,567` | séparateur de milliers |
| `%s` | `Max` | du texte |
| `%f` | `3.141590` | six décimales par défaut |
| `%.2f` | `3.14` | deux décimales |
| `%8.2f` | `    3.14` | deux décimales, sur 8 caractères |

**Note**
Le gabarit `%8.2f` sert à aligner une colonne de nombres : chaque valeur occupe la
même largeur, donc les virgules se superposent.

L'ancien tableau du cours affichait `3,1473` avec une virgule. Ce n'était
pas une coquille : sans précision, le séparateur décimal dépend de la
langue de la machine. La slide suivante en tire les conséquences.

---

### 4.5 · La locale décide du séparateur

**Source** fasc TMP.3

**Slide**
- Sans locale, le résultat dépend de la machine
- Un test qui compare des chaînes échouera sur un espace invisible
```java
System.out.printf("%,d%n", 1157479200);
// machine francaise : 1 157 479 200  (espace INSECABLE etroite)
// machine anglaise  : 1,157,479,200

System.out.printf(Locale.US, "%,d%n", 1157479200);
// partout           : 1,157,479,200
```

**Note**
C'est le piège le plus coûteux de cette section, parce qu'il ne se voit
pas. Le JDK français emploie pour séparer les milliers un espace
insécable étroit, qui ressemble à s'y méprendre à un espace ordinaire. Un
test qui compare le texte produit échouera sur une différence invisible à
l'œil, et vous chercherez l'erreur ailleurs.

La règle : dès que le texte produit est comparé par un test, précisez la
locale.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.PrintlnEtPrint`.

---

### 4.6 · `String.format`, la version testable

**Source** nouvelle

**Slide**
- Mêmes gabarits, deux usages
- La méthode `printf` affiche - on ne peut pas la tester
- La méthode `String.format` retourne - on peut la tester
- Fin du détour : on revient à la mesure du temps
```java
System.out.printf(Locale.US, "%,d", n);          // affiche
String s = String.format(Locale.US, "%,d", n);   // retourne
```

**Note**
Les deux prennent exactement les mêmes gabarits. La différence est décisive
pour la suite du cours : La méthode `printf` écrit dans la console et ne retourne rien,
donc aucune classe de test ne peut vérifier son travail. La méthode
`String.format` retourne une chaîne, qu'un test peut comparer.

C'est la règle posée au module POO, reformulée pour l'affichage : le noyau
retourne une valeur, le `main` se contente de dialoguer. Vos méthodes de
formatage rendront donc des `String`, et seul le `main` appellera `printf`.

Le détour s'arrête ici. On reprend la mesure du temps là où on l'avait
laissée, avec une question restée ouverte : peut-on compter des secondes
entre deux dates ?

Le code complet, à exécuter : demos, classe `demo.tmp.slides.PrintlnEtPrint`.

---

## Section 5 — Une date n'est pas un instant

### 5.1 · Intercalaire

**Slide**
- Une date n'est pas un instant

**Note**
Section courte, construite autour d'un seul exercice, et volontairement
incomplète avant lui.

---

### 5.2 · Ce que `LocalDate` ne contient pas

**Source** nouvelle

**Slide**
- Un `LocalDate`, c'est une case du calendrier
- Pas d'heure, pas de minute, pas de seconde
- Que donne la dernière ligne ?
```java
ChronoUnit.DAYS.between(d1, d2);      // fonctionne
ChronoUnit.SECONDS.between(d1, d2);   // ?
```

**Note**
Un `LocalDate` désigne une case du calendrier, le 17 mai 1990, et rien
d'autre. La dernière ligne pose une question dont vous connaîtrez la
réponse dans dix minutes — n'essayez pas de la deviner, essayez-la.

**Réserve**
Ni atStartOfDay, ni le nom de l'exception. TMP.3 est construit pour que
l'étudiant lise le message d'erreur.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.CeQueLocalDateNeContientPas`.

---

### 5.3 · Exercices

**Source** fasc

**Slide**
- **TMP.3** - Compter des secondes : date ou instant ?
- Décommentez la ligne signalée et **lisez le message**

**Note**
L'exercice reprend `TMP.1` en changeant l'unité, ce qui paraît anodin. La
ligne à décommenter provoque une exception dont le message dit exactement
ce qui se passe. Lisez-le : c'est le point central de l'exercice, et la
capacité à lire un message d'erreur vaut mieux qu'une réponse apprise.

Le formatage du résultat emploie ce qui vient d'être vu en section 4.

---

### 5.4 · Retour sur « Ce que `LocalDate` ne contient pas »

**Source** fasc, section « Ce qu'il faut retenir »

**Slide**
- Le JDK refuse plutôt que d'inventer : `Unsupported unit: Seconds`
- La méthode `atStartOfDay()` fixe minuit - une convention, pas une vérité
- Votre résultat est donc juste à quelques heures près
- Un `int` s'arrête à 2 147 483 647, soit environ 68 ans de secondes

**Note**
Demander à deux cases de calendrier combien de secondes les séparent n'a
pas de sens, et le JDK refuse plutôt que de choisir une heure à votre
place. La méthode `atStartOfDay()` fabrique le `LocalDateTime` correspondant à
minuit — c'est vous qui prenez alors la décision.

Le débordement de l'`int` répond enfin à la question laissée ouverte en
section 2 : au-delà d'environ soixante-huit ans de secondes, un `int` ne
suffit plus.

---

## Section 6 — L'arithmétique du calendrier

### 6.1 · Intercalaire

**Slide**
- L'arithmétique du calendrier

**Note**
Ajouter un mois n'est pas ajouter trente jours. Cette section montre
pourquoi, et pourquoi aucune autre réponse ne serait meilleure.

---

### 6.2 · Ajouter des mois

**Source** nouvelle

**Slide**
- Les deux dernières lignes donnent-elles la même date ?
- Votez avant d'exécuter
```java
LocalDate d = LocalDate.of(2027, 1, 31);

d.plusDays(30);
d.plusMonths(1);
d.plusMonths(1).plusMonths(1);   // ?
d.plusMonths(2);                 // ?
```

**Note**
Posez la question à la classe avant d'exécuter, et comptez les mains.
L'intuition dit que les deux dernières lignes sont équivalentes. Elles ne
le sont pas, et l'exercice qui suit demande de le constater puis de
l'expliquer.

**Réserve**
Pas de réponse sur cette slide.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.AjouterDesMois`.

---

### 6.3 · Exercices

**Source** fasc

**Slide**
- **TMP.4** - L'arithmétique des mois

**Note**
Deux méthodes seulement. La seconde compare l'ajout d'un coup et l'ajout un
par un, et retourne un booléen. L'énoncé donne les quatre cas à observer, en
année ordinaire et en année bissextile.

---

### 6.4 · Retour sur « Ajouter des mois »

**Source** fasc

**Slide**
- Le `31/01/2027` plus un mois donne `28/02/2027`
- Le 31 février n'existe pas : Java rabote au dernier jour disponible
- Une fois raboté, le 31 est **perdu**
- Ajouter deux fois un mois n'est donc pas ajouter deux mois

**Note**
Java ne peut pas retourner le 31 février. Il rabote donc au dernier jour du
mois d'arrivée. La conséquence est que l'opération n'est pas réversible :
la seconde addition repart du 28 et non du 31. La slide « Ajouter des
mois » posait exactement cette question.

Quelle autre réponse aurait été possible ? Le 3 mars ? Une exception ?
Chacune a ses inconvénients, et c'est précisément ce que la question de
l'énoncé vous invite à peser. Retenez la règle pratique : pour une
échéance, décidez si vous comptez en jours ou en mois, et dites-le.

---

## Section 7 — Period ou Duration

### 7.1 · Intercalaire

**Slide**
- Period ou Duration

**Note**
Deux classes mesurent un écart. Elles ne mesurent pas dans la même unité de
pensée, et les confondre produit du code qui ne compile pas — ce qui, pour
une fois, est une bonne nouvelle.

---

### 7.2 · `Period`, les unités du calendrier

**Source** d02/11, resserrée

**Slide**
- Années, mois, jours - des unités de longueur variable
- Pour des `LocalDate`
```java
Period p = Period.between(naissance, aujourdhui);
p.getYears();    // 36
p.getMonths();   // 8
p.getDays();     // 2
```

**Note**
La classe `Period` décompose l'écart en années, mois et jours, exactement comme on
annonce un âge. Ces unités n'ont pas de longueur fixe : un mois vaut 28,
29, 30 ou 31 jours. Un `Period` ne mémorise donc pas une quantité de temps,
mais une recette d'ajustement du calendrier.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.PeriodEtDuration`.

---

### 7.3 · `Duration`, les unités de l’horloge

**Source** nouvelle

**Slide**
- Heures, minutes, secondes - toujours identiques
- Pour des `LocalDateTime`
- Que vaut alors `toHours() + "h" + toMinutes()` ?
```java
Duration d = Duration.between(debut, fin);
d.toHours();     // 3
d.toMinutes();   // 215
```

**Note**
La classe `Duration` compte en unités de temps, qui ne varient jamais. La règle tient
en une ligne : `Period` pour des dates, `Duration` pour des heures. Le
compilateur la fait respecter — chacune refuse le type de l'autre.

Regardez les deux valeurs de la slide. Elles décrivent le même écart, et
elles ne se combinent pas comme on l'attendrait.

**Réserve**
toMinutesPart n'apparaît pas ici. TMP.5 demande de la trouver dans la
Javadoc.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.PeriodEtDuration`.

---

### 7.4 · Exercices

**Source** fasc

**Slide**
- **TMP.5** - Period ou Duration

**Note**
Trois méthodes. La troisième est celle qui compte : écrire naïvement
`toHours() + "h" + toMinutes()` ne donne pas ce qu'on attend, et la Javadoc
de `Duration` contient la méthode qui règle le problème. C'est exactement
la démarche montrée en démonstration.

---

### 7.5 · Retour sur « `Duration`, les unités de l’horloge »

**Source** fasc

**Slide**
- La méthode `toMinutes()` retourne le **total**, 215
- La méthode `toMinutesPart()` retourne le **reste**, 35
- La complétion montre les noms ; la Javadoc dit ce qu'ils font

**Note**
Toute la famille `toXxx` retourne un total, toute la famille `toXxxPart`
retourne le reste après extraction des unités supérieures. Écrire
`toHours() + "h" + toMinutes()` donnait donc `3h215`. Le jour où un
affichage vous donnera ce genre de charabia, vous saurez où regarder.

Au-delà de `Duration`, retenez la leçon de méthode : deux noms voisins dans
la même liste de complétion peuvent faire des choses différentes, et rien
dans la liste ne le dit.

---

## Section 8 — Une date et son texte

### 8.1 · Intercalaire

**Slide**
- Une date et son texte

**Note**
Une date affichée au format ISO se lit mal, et une date saisie par un
utilisateur n'est jamais au format ISO. Cette section fait le passage dans
les deux sens.

---

### 8.2 · De la date vers le texte

**Source** nouvelle

**Slide**
- `dd` jour, `MM` mois, `yyyy` année
- Attention : `mm` est la minute, `MM` le mois
```java
DateTimeFormatter fr = DateTimeFormatter.ofPattern("dd/MM/yyyy");
String texte = date.format(fr);    // "19/01/2027"
```

**Note**
Le motif est une chaîne de caractères où chaque lettre désigne un champ, et
le nombre de lettres la largeur souhaitée. La confusion entre `mm` et `MM`
est le classique du genre, et elle ne provoque aucune erreur : elle donne
simplement une date fausse.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.UneDateEtSonTexte`.

---

### 8.3 · Du texte vers la date

**Source** nouvelle

**Slide**
- Le même formateur sert dans les deux sens
- Un texte mal formé lève une exception - les exceptions : module **EXC**
```java
LocalDate d = LocalDate.parse("19/01/2027", fr);
LocalDate e = LocalDate.parse("19-01-2027", fr);   // exception
```

**Note**
Le même `DateTimeFormatter` sert au formatage et à l'analyse. Un texte qui
ne correspond pas au motif lève une `DateTimeParseException` : le programme
s'arrête et affiche une trace. Traiter proprement ce genre d'incident est
tout un sujet, auquel le module EXC est consacré ; pour l'instant,
contentez-vous de constater ce qui se passe.

Le code complet, à exécuter : demos, classe `demo.tmp.slides.UneDateEtSonTexte`.

---

### 8.4 · Exercices

**Source** fasc

**Slide**
- **TMP.6** - Formater et analyser une date
- Analysez `"31/02/2027"` et regardez ce que vous obtenez

**Note**
Trois méthodes : formater, analyser, et analyser en refusant les dates
impossibles. L'énoncé vous fait passer par le cas du 31 février avant de
vous dire comment le refuser.

---

### 8.5 · Retour — l'indulgence silencieuse

**Source** fasc

**Slide**
- L'appel `parse("31/02/2027")` retourne `2027-02-28`, sans rien signaler
- Mode par défaut : indulgent, il rabote
- La méthode `withResolverStyle(STRICT)` refuse - et réclame `uuuu` au lieu de `yyyy`
- Mieux vaut une exception qu'une valeur arrangée - **CC-ERR.1**

**Note**
Une saisie absurde vient de devenir une date parfaitement plausible, et
plus rien dans le programme ne permettra de s'en apercevoir. C'est
exactement ce que proscrit `CC-ERR.1` du mémento Clean Code.

Le mode indulgent n'est pas un défaut du JDK. Il existe des contextes où
ajuster vaut mieux que refuser. Mais pour un formulaire d'inscription, le
mode strict est le bon choix, et il faut l'écrire explicitement.

---

## Clôture

### 9.1 · Ce qu'il faut retenir

**Source** nouvelle

**Slide**
- Trois classes : `LocalDate`, `LocalTime`, `LocalDateTime`
- Une date est **immuable** : les méthodes retournent, elles ne modifient pas
- Une date n'est pas un instant
- Utilisez `Period` pour des dates, `Duration` pour des heures
- La méthode `String.format` se teste, `printf` non
- Précisez la locale, et choisissez le mode strict

**Note**
Six lignes, qui résument six exercices. La plus transversale est la
deuxième : l'immuabilité dépasse largement les dates, et vous la
retrouverez sur `String`, sur les `record` du module ENU, et dans le
mémento Clean Code.

---

## Annexe A — Ce qui vient de l'ancien deck

| Ancienne slide | Devient | Remarque |
|---|---|---|
| d02/4 | intercalaires | l'image des calendriers sert de gabarit |
| d02/5 | 1.3 | resserrée |
| d02/6 | — | supprimée : la mise en garde sur l'italique n'a plus d'objet |
| d02/7 | 1.6, 1.7, 2.2 | le tableau de huit exemples est éclaté par usage |
| d02/8 | 2.4 | l'énoncé sort de la slide, renvoi au fascicule |
| d02/9 | 1.9 | resserrée |
| d02/10 | 1.10 | resserrée |
| d02/11 | 7.2 | `Period.between` |
| d02/43 | 4.4, 4.5 | tableau `printf` refait, locale ajoutée |
| d02/3, 12, 25 | — | supprimées : cadrage « Au cours précédent », propre à la séance 2 |

Aucune slide de l'ancien deck 01 n'alimente ce module.

---

## Annexe B — Deux défauts repérés dans les documents existants

1. **`TMP.3`, le format attendu est irréalisable tel qu'il est décrit.**
   L'énoncé demande des chiffres « groupés par trois, séparés par un
   espace ordinaire » **et** de préciser `Locale.US`. Or
   `String.format(Locale.US, "%,d", n)` produit des **virgules**. Aucune
   locale standard ne groupe avec un espace ASCII. Il manque une étape —
   un `.replace(',', ' ')` — ou il faut changer la valeur attendue.

2. **`Demo_TAB.docx`** annonce « Séance 6, en ouverture du thème » alors
   que TAB est un thème de séance 2.
