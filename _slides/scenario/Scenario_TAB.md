# Scénario du module TAB

*Tableaux, boucles et opérateur ternaire. Version 1, 18/09/2026.*

Module : `TAB` — quatre exercices (`TAB.1` à `TAB.4`), une démonstration de
20 minutes jouée **en ouverture du thème**.

---

## Le principe qui commande ce deck

`Demo_TAB` est longue et dense : cinq pièges, vingt minutes, presque tout
tapé en direct. Elle couvre à elle seule les valeurs par défaut, ce que
`println` fait d'un tableau, `length` sans parenthèses, le passage par
référence et les lignes inégales. C'est l'essentiel de la théorie.

Le deck ne la refait donc pas. Il fait trois choses :

1. **il l'annonce**, dès la deuxième slide, parce qu'elle ouvre le thème ;
2. **il en garde une trace écrite** — une démonstration ne laisse rien, et
   c'est pourtant elle qui alimentera le support imprimé ;
3. **il porte ce qu'elle ne montre pas** : la syntaxe de déclaration, les
   deux formes de boucle, le ternaire, et les associations entre classes.

D'où un deck court : 26 slides pour quatre exercices, là où TMP en comptait
45 pour six.

---

## Déroulé

| Section | Slides | Exercice à la sortie |
|---|---|---|
| Ouverture | 0.1 | — |
| 1. Un tableau, c'est une taille fixe | 1.1 à 1.5 | démonstration |
| 2. Parcourir un tableau | 2.1 à 2.6 | `TAB.1` |
| 3. Des lignes de longueurs différentes | 3.1 à 3.3 | `TAB.2` |
| 4. L'opérateur ternaire | 4.1 à 4.5 | `TAB.3` |
| 5. Des objets qui se connaissent | 5.1 à 5.5 | `TAB.4` |
| Clôture | 6.1 | — |

---

### 0.1 · Titre du module

**Source** gabarit

**Slide**
- Module TAB
- Tableaux, boucles et opérateur ternaire

**Note** *(aucune)*

---

## Section 1 — Un tableau, c'est une taille fixe

### 1.1 · Intercalaire

**Slide**
- Un tableau, c'est une taille fixe

**Note**
Vous avez déjà manipulé des tableaux, en C# et au cours d'introduction à la
programmation. Cette section ne les réapprend pas : elle s'arrête sur ce qui
surprend encore, et que la démonstration va montrer en direct.

---

### 1.2 · Démonstration

**Source** `Demo_TAB.docx`

**Slide**
- Démo : cinq pièges, et pourquoi ils existent

**Note**
La démonstration ouvre le thème, avant toute théorie. Elle ne présente pas
les tableaux : elle tombe dans leurs pièges, un par un, et regarde ce que le
langage répond. Cinq pièges en vingt minutes, presque tout tapé en direct.

Le point à faire passer tient en une phrase : un tableau n'est pas une
valeur, c'est une **référence**. Quatre des cinq pièges en découlent.

Renvois `TEC-EXE.3`, `TEC-EXE.2` et `CC-NOM.5`.

---

### 1.3 · Déclarer un tableau

**Source** d02/36, fasc

**Slide**
- La taille est décidée au `new`, et ne change plus
- Les collections, qui grandissent, viendront au thème **COL**
```java
int[]    nombres = new int[5];            // 5 cases, toutes a 0
String[] mots    = { "Hello", "world" };  // 2 cases, deja remplies
```

**Note**
Deux formes de déclaration : avec `new` et une taille, ou avec une liste de
valeurs entre accolades. Dans le premier cas le tableau naît rempli — de
zéros pour des `int`, de `null` pour des objets.

La taille, elle, est fixée une fois pour toutes. C'est la limite du tableau,
et c'est aussi ce qui le rend simple et rapide. Quand cette limite devient
gênante, il faut une collection, et c'est le thème COL.

---

### 1.4 · Ce que la démonstration a montré

**Source** `Demo_TAB.docx`, trace écrite

**Slide**
- Un tableau de `int` naît à zéro, un tableau d'objets à `null`
- `System.out.println(tableau)` affiche une adresse, pas des valeurs
- Il faut `Arrays.toString(tableau)`
- `tableau.length` est un **champ**, `texte.length()` une **méthode**
- Passer un tableau à une méthode, c'est passer son adresse

**Note**
Cette slide ne remplace pas la démonstration, elle en garde la trace. Une
démonstration ne laisse rien derrière elle, et ces cinq lignes sont celles
que vous rechercherez dans vos notes dans trois semaines.

La dernière est la plus importante. Une méthode qui reçoit un tableau ne
reçoit pas une copie : elle reçoit l'adresse du vôtre. Elle peut donc le
modifier sans rien retourner, et c'est ce qui surprend la moitié d'une
classe. Pour travailler sur une vraie copie, il faut la demander, avec
`Arrays.copyOf`.

Sur `length`, il n'y a rien à comprendre : c'est une incohérence du langage,
pas une règle. Autant le savoir plutôt que de chercher une justification.

---

### 1.5 · Un tableau de tableaux

**Source** fasc, « Ce qu'il faut avoir en tête »

**Slide**
- Un tableau à deux dimensions n'existe pas vraiment en Java
- C'est un tableau dont chaque case contient un autre tableau
```java
int[][] matrice = new int[3][3];   // un tableau DE TABLEAUX

matrice[1]                         // la deuxieme ligne, un int[]
matrice[1][2]                      // la troisieme case de cette ligne
```

**Note**
Retenez la distinction entre les deux dernières lignes. `matrice[1]` n'est
pas un nombre : c'est un tableau, qu'on peut passer à une méthode, mesurer
avec `length`, parcourir. `matrice[1][2]` est un nombre.

Cette lecture explique les deux `length` différents vus en démonstration, et
elle a une conséquence que la section 3 exploitera : rien n'oblige les
lignes à faire toutes la même longueur.

---

## Section 2 — Parcourir un tableau

### 2.1 · Intercalaire

**Slide**
- Parcourir un tableau

**Note**
Deux formes de boucle, et un choix à faire entre les deux à chaque fois.

---

### 2.2 · La boucle indexée

**Source** d02/38

**Slide**
- On dispose de l'indice, donc on peut écrire dans le tableau
```java
for (int i = 0; i < tab.length; i++) {
    tab[i] = tab[i] * 2;
}
```

**Note**
La boucle `for` classique fait avancer un compteur, qui sert d'indice. Vous
la connaissez. Notez la condition : `i < tab.length`, avec un inférieur
strict, parce que les indices vont de zéro à `length - 1`. Un inférieur ou
égal produit une `ArrayIndexOutOfBoundsException`, et c'est probablement
l'erreur la plus fréquente de toute la programmation.

---

### 2.3 · La boucle for-each

**Source** d02/38

**Slide**
- Lecture seule : la variable est une copie de la case
- Plus courte, plus lisible, et sans risque de déborder
```java
for (int v : tab) {
    System.out.println(v);
}
```

**Note**
La boucle for-each se lit « pour chaque entier `v` contenu dans `tab` ».
Elle n'expose pas l'indice, ce qui la rend plus courte et supprime d'un coup
le risque de sortir du tableau.

En contrepartie, `v` est une copie de la valeur : lui affecter quelque chose
ne touche pas au tableau. C'est une restriction, pas un défaut — et c'est
exactement ce que `TAB.2` vous demandera d'essayer pour le constater.

---

### 2.4 · Laquelle choisir

**Source** nouvelle

**Slide**
- Vous lisez seulement → for-each
- Vous écrivez dans le tableau → boucle indexée
- Vous avez besoin de la position → boucle indexée
- Dans le doute, for-each : c'est celle qui se relit le mieux

**Note**
La question se pose à chaque parcours, et la réponse tient en une ligne :
prenez la boucle qui montre le moins de choses. Si l'indice ne sert à rien,
ne l'écrivez pas.

---

### 2.5 · Deux boucles imbriquées

**Source** nouvelle

**Slide**
- La boucle extérieure parcourt les lignes, l'intérieure les cases
- Un compteur qui traverse les deux se déclare **avant** la première
```java
int valeur = 1;
for (int ligne = 0; ligne < n; ligne++) {
    for (int col = 0; col < n; col++) {
        matrice[ligne][col] = valeur;
        valeur = valeur + 1;
    }
}
```

**Note**
Deux boucles imbriquées, et un compteur qui doit survivre au passage d'une
ligne à l'autre. Où le déclarer est la vraie question : à l'intérieur d'une
boucle, il serait remis à sa valeur initiale à chaque tour.

C'est exactement ce que demande l'exercice qui suit. Regardez la portée de
chaque variable avant d'écrire quoi que ce soit.

---

### 2.6 · Exercices

**Source** fasc

**Slide**
- **TAB.1** - Une matrice carrée
- `carree` construit, `enTexte` met en forme, aucune des deux n'affiche

**Note**
Deux méthodes statiques, et un `Programme` auquel il ne devrait rester
qu'une seule instruction d'affichage. C'est la séparation entre le calcul et
le dialogue, posée au module POO.

Le format d'`enTexte` est imposé au caractère près, parce que le test le
vérifie. Et la troisième question du fascicule mérite qu'on s'y arrête : si
`enTexte` affichait au lieu de retourner une chaîne, le test serait-il
encore possible ?

---

## Section 3 — Des lignes de longueurs différentes

### 3.1 · Intercalaire

**Slide**
- Des lignes de longueurs différentes

**Note**
Section courte, qui tire la conséquence de la section 1 : un tableau de
tableaux n'a aucune raison d'être rectangulaire.

---

### 3.2 · Déclarer les lignes une par une

**Source** fasc `TAB.2`

**Slide**
- `new int[n][]` : le nombre de lignes seulement
- Chaque ligne reçoit ensuite sa propre taille
- Tant qu'une ligne n'est pas créée, elle vaut `null`
```java
int[][] triangle = new int[n][];

for (int i = 0; i < n; i++) {
    triangle[i] = new int[i + 1];
}
```

**Note**
La seconde paire de crochets reste vide : on annonce le nombre de lignes,
pas leur longueur. Chaque ligne est ensuite créée à sa taille.

Une conséquence à connaître avant de s'y cogner : entre la déclaration et la
création d'une ligne, cette ligne vaut `null`. Y accéder donne une
`NullPointerException`, et non un tableau vide.

Le parcours d'un tel tableau ne peut plus supposer une largeur constante.
Une boucle for-each imbriquée s'en sort naturellement, puisque la première
parcourt des `int[]` et la seconde des `int` — chaque ligne annonce sa
propre longueur.

---

### 3.3 · Exercices

**Source** fasc

**Slide**
- **TAB.2** - Le triangle de Pascal
- Deux boucles for-each imbriquées pour l'affichage

**Note**
Chaque nombre est la somme des deux qui le surplombent, les bords valent 1,
et la ligne d'indice `i` contient `i + 1` nombres.

Deux des questions du fascicule sont plus intéressantes qu'elles n'en ont
l'air. Pour la première ligne, les deux instructions qui posent les bords
écrivent dans la même case — est-ce un problème ? Et la boucle qui remplit
l'intérieur ne tourne pas du tout pour les deux premières lignes — pourquoi,
et est-ce voulu ?

---

## Section 4 — L'opérateur ternaire

### 4.1 · Intercalaire

**Slide**
- L'opérateur ternaire

**Note**
Un opérateur qui fait en une instruction ce qu'un `if` demande en cinq
lignes. La section montre où il aide, et où il commence à nuire.

---

### 4.2 · La syntaxe

**Source** d02/40, fasc

**Slide**
- Une condition, deux valeurs
```java
condition ? valeurSiVrai : valeurSiFaux

public int max(int a, int b) {
    return a > b ? a : b;
}
```

**Note**
Le point d'interrogation sépare la condition des deux valeurs, les deux
points séparent les valeurs entre elles. Lisez-le comme une question : « a
est-il plus grand que b ? si oui `a`, sinon `b` ».

Ternaire signifie simplement « à trois opérandes ». C'est le seul de Java
dans ce cas, d'où son nom.

---

### 4.3 · Ce qu'un if ne permet pas

**Source** fasc `TAB.3`

**Slide**
- Le ternaire **retourne une valeur** ; le `if` ne retourne rien
- Il se place donc à droite d'un `return` ou d'une affectation
```java
int plusGrand = a > b ? a : b;      // possible
int plusGrand = if (a > b) a; ...   // n'existe pas
```

**Note**
C'est la différence essentielle, et la seule bonne raison d'employer le
ternaire. Un `if` est une instruction : il fait quelque chose. Le ternaire
est une expression : il vaut quelque chose. On peut donc l'écrire partout où
une valeur est attendue, ce qu'un `if` ne permet pas.

Employer un ternaire uniquement pour raccourcir un `if` qui ne retourne
rien, c'est en revanche le détourner de son usage.

---

### 4.4 · Où s'arrête l'intérêt

**Source** fasc, questions à se poser

**Slide**
- Le ternaire s'imbrique : `a ? x : (b ? y : z)`
- Écrivez-en un à trois niveaux, relisez-le, puis décidez
- Des méthodes courtes et lisibles - **CC-MET.2**

**Note**
Rien n'interdit d'imbriquer les ternaires, et le compilateur ne protestera
jamais. La question n'est pas ce que le langage autorise, mais ce qu'un
collègue pourra relire dans six mois.

L'exercice vous demande d'en écrire un à trois niveaux. Faites-le
vraiment, relisez-le, et décidez vous-même si vous le garderiez. C'est une
décision d'écriture, pas une règle, et le mémento Clean Code se contente de
demander des méthodes courtes et lisibles.

---

### 4.5 · Exercices

**Source** fasc

**Slide**
- **TAB.3** - L'opérateur ternaire
- Deux méthodes, une instruction chacune

**Note**
Un petit jeu de dés, fourni et fonctionnel à deux méthodes près. Chacune
tient en une seule instruction avec un ternaire.

Attention au sens de la comparaison : selon la façon dont vous l'écrivez,
l'égalité tombe du côté du premier ou du second joueur, et le test le
vérifie.

Remarquez que ces deux méthodes ne lancent aucun dé : elles reçoivent les
résultats en paramètres. C'est ce qui les rend prévisibles, et donc
testables, alors qu'une méthode qui tire au hasard ne le serait pas. Vous
retrouverez cette idée au thème JUN.

---

## Section 5 — Des objets qui se connaissent

### 5.1 · Intercalaire

**Slide**
- Des objets qui se connaissent

**Note**
Jusqu'ici les exercices manipulaient une classe à la fois. Le dernier en
fait collaborer quatre, et range des objets dans un tableau.

---

### 5.2 · Un objet peut en contenir un autre

**Source** fasc `TAB.4`

**Slide**
- Un champ peut être un objet, comme il peut être un `int`
- Un vendeur **a une** personne, il n'**est pas** une personne
- La différence entre « a un » et « est un » : thème **ABS**
```
Person  <---[1]---  Vendor  ---[*]--->  Sale  ---[1]--->  Car
```

**Note**
Rien de nouveau techniquement : un champ dont le type est une classe, vous
en écrivez depuis le module POO. Ce qui change, c'est le nombre de classes
qui collaborent.

La tentation est d'écrire qu'un vendeur **est** une personne, ce qui se
traduirait par de l'héritage. Ce n'est pas le sujet de cette séance, et la
distinction mérite mieux qu'une note de bas de page : vous y viendrez au
thème ABS, et vous pourrez alors reprendre cet exercice pour en discuter.

---

### 5.3 · Ne pas stocker ce qui se déduit

**Source** fasc `TAB.4`

**Slide**
- Le prix réel se calcule, il ne se range pas
- Un champ en plus, c'est une donnée qui peut se désynchroniser
- Même problème que le champ `age` de **POO.3**

**Note**
Prix catalogue et réduction suffisent à retrouver le prix réel. En faire un
troisième champ créerait une donnée redondante : le jour où la réduction
change, plus rien ne garantit que le prix réel suive.

C'est exactement le problème du champ `age` rencontré en POO.3, et la règle
vaut bien au-delà des voitures : ce qui se déduit ne se stocke pas.

---

### 5.4 · Un tableau de taille fixe dans un objet

**Source** fasc `TAB.4`

**Slide**
- Un tableau ne grandit pas : il faut décider d'un maximum
- Et retenir soi-même combien de cases sont occupées
- `enregistrer` retourne `false` quand le tableau est plein
- Parcourir jusqu'au nombre enregistré, pas jusqu'à `ventes.length`

**Note**
C'est ici que la taille fixe, annoncée en ouverture du thème, devient une
contrainte concrète. Le tableau est dimensionné à la construction, donc il
faut un maximum, et un compteur de cases occupées.

La dernière ligne est une question du fascicule, et elle mérite d'être
essayée plutôt que lue : parcourir jusqu'à `ventes.length` additionne les
cases vides. Écrivez cette version-là d'abord, et regardez ce qui se passe.

---

### 5.5 · Exercices

**Source** fasc

**Slide**
- **TAB.4** - Des objets qui se connaissent
- Quatre classes, un format de texte imposé

**Note**
Quatre classes, dont trois à écrire entièrement. Le format d'`enTexte` est
vérifié au caractère près.

Deux questions du fascicule touchent au mémento Clean Code. `Sale` a besoin
de la marque et du modèle : vaut-il mieux qu'elle lise les champs de la
voiture, ou qu'elle les lui demande — `CC-OBJ.1` ? Et faut-il un accesseur
qui retourne le tableau de ventes, sachant ce que l'appelant pourrait alors
en faire — `CC-OBJ.2` ?

---

## Clôture

### 6.1 · Ce qu'il faut retenir

**Source** nouvelle

**Slide**
- Un tableau a une **taille fixe**, décidée au `new`
- Un tableau est une **référence** : le passer, c'est passer son adresse
- `matrice[1]` est une ligne, `matrice[1][2]` est un nombre
- for-each pour lire, boucle indexée pour écrire
- Le ternaire retourne une valeur ; un `if` non
- Ce qui se déduit ne se stocke pas

**Note**
Six lignes pour quatre exercices. La deuxième est celle qui coûte le plus
cher quand on l'oublie, et c'est celle que la démonstration a passé six
minutes à faire voter.

---

## Annexe A — Ce qui vient de l'ancien deck

| Ancienne slide | Devient | Remarque |
|---|---|---|
| d02/35 | intercalaires | image de section, à remplacer |
| d02/36 | 1.3 et 1.5 | séparée en déclaration et tableau de tableaux |
| d02/37 | 2.6 | l'énoncé sort de la slide |
| d02/38 | 2.2, 2.3, 2.4 | les deux boucles séparées, plus une slide de choix |
| d02/39 | 3.3 | l'énoncé sort de la slide |
| d02/40 | 4.2 et 4.3 | syntaxe, puis ce qu'un `if` ne permet pas |
| d02/41 | 4.5 | l'énoncé sort de la slide |
| d02/42 | 5.5 | l'énoncé sort de la slide |
| d02/43 | — | `printf` est parti au module TMP, section 4 |

---

## Annexe B — Ce qui reste à trancher

1. **La slide 1.4 fait-elle doublon avec la démonstration ?** Je soutiens
   que non : une démonstration ne laisse aucune trace, et c'est la slide qui
   alimentera le support imprimé. Mais c'est la seule de tout le deck qui
   redit ce que la démonstration a montré.

2. **`Demo_TAB` annonce « Séance 6 »** alors que TAB est un thème de
   séance 2. À corriger dans le document.

3. **Le fascicule écrit encore « rend » et « une espace ».** Trois endroits
   pour le premier — `TAB.2` (« qui rend le triangle »), `TAB.3` (« le
   ternaire rend une valeur », « qui doivent rendre le premier joueur ») —
   et un pour le second, dans le format imposé de `TAB.1`.
