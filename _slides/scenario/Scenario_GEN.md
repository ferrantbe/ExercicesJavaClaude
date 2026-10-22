# Scénario du module GEN - Types génériques

*Six sections et une slide de fil rouge, 30 slides plus le sommaire.
Rubriques : `**Source**` et `**Réserve**` sont des commentaires de
fabrication, `**Slide**` et `**Note**` produisent le contenu et les notes du
présentateur.*

## Fabrication

Sections à déclarer dans `module_gen.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Un type en paramètre | La classe générique |
| 2 | Autant de types qu'il en faut | Plusieurs paramètres |
| 3 | Ce que le compilateur efface | L'effacement |
| 4 | Une famille de types | Les jokers |
| 5 | Une méthode générique | Méthodes génériques |
| 6 | Hériter d'une classe générique | L'héritage |

La slide du fil rouge (7.1) n'a pas d'intercalaire, comme la slide 5.1 du
deck EXC.

**Sources** : deck 08a (`08a__Java_IN2_2026_-_Types_ge_ne_riques.pptx`,
renommé `d08a.pptx`, intercalaire en slide 8), `GEN_enonces.docx`,
`Demo_GEN.docx` et son code (`etat_de_depart`, `etat_d_arrivee`), les
corrigés de `be.ephec.java.gen`, `Scenario_COL.md` (slides 1.3 et 5.3, qui
renvoient à GEN), `FIC_enonces.docx` et `Demo_FIC.docx` (ce qu'ils attendent
de l'effacement), `GameHub_enonces.docx`, `Memento_Clean_Code.docx`
(CC-NOM.1, CC-CLS.3, CC-MET.7), les six sessions d'examen 2022 à 2025.

**Place dans le cours** : douzième deck, après JUN. Les classes abstraites,
l'héritage, les interfaces, les collections, les exceptions et JUnit sont
connus. LAM, FX et FIC viennent après.

**Le poids à l'examen** : la question 2 de chacune des six sessions est une
classe générique accompagnée d'un `Programme` qui la montre à l'œuvre. Dans
cinq sessions sur six, la classe enveloppe une collection (`Pile` en 2023,
`CollectionLimitee` et `Boite` en 2024, `Historique` et `Catalogue` en 2025).
Aucun des six exercices GEN ne pratique cette forme : la slide 1.5 la pose.

**Le partage avec la démonstration et le fascicule** :

- La démonstration, jouée en 1.3, part d'une pile d'`Object` qui plante loin
  de sa faute, lui ajoute `<T>`, voit la faute refusée à la compilation, fait
  disparaître le transtypage chez l'appelant, montre le type brut et finit
  par une `Pile<String>`. Le deck ne refait rien de tout cela. La slide 1.2 y
  conduit en posant la question sans la réponse, la slide 1.3 la nomme, et la
  section 3 explique après coup ce que la démonstration a laissé dans la
  classe (le tableau d'`Object` et le transtypage vers `T`).
- Le fascicule porte : l'argument `Object` contre `<T>` et l'erreur déplacée
  vers la compilation ; la convention T, K, V, E ; le losange déduit (GEN.1) ;
  « deux paramètres autorisent la différence, ne l'imposent pas » (GEN.2) ;
  l'encadré « un `Triplet<Etudiant>` n'est pas un `Triplet<Personne>` » et les
  tableaux qui le paient d'une `ArrayStoreException` (GEN.4) ; la place du
  `<T>` d'une méthode et la remarque honnête sur `premier(List<T>)` (GEN.5) ;
  `super` contre `this`, et la séparation `description` / `affiche` (GEN.6).
  Le deck ne les répète pas.
- Le deck porte ce que ni l'un ni l'autre ne pose : le côté déclaration de
  `List<E>`, le vocabulaire paramètre et argument de type, le `T` transmis à
  une collection, l'argument de type lui-même générique, l'effacement et ce
  qu'il interdit, le transtypage non vérifiable, les deux jokers, l'inférence
  à l'appel, la méthode statique qui déclare son propre `T`, les deux façons
  d'hériter et d'implémenter.

**Décisions appliquées** :

- Le deck suit la progression des exercices, pas l'ordre théorique : une
  section par marche, GEN.2 et GEN.3 partageant la deuxième. L'effacement
  forme une section sans exercice, placée après GEN.1 à GEN.3 : elle répond
  à la question `Paire<int>` de GEN.1 une fois que l'étudiant l'a essayée.
- L'effacement est posé ici parce que FIC le cite (`Demo_FIC`, tableau des
  renvois) et qu'aucun exercice GEN ne l'enseigne. Voir la réserve de 3.5.
- `? super` est enseigné (4.5) parce que le deck COL renvoie son écriture au
  module GEN (slide 5.3 du scénario COL), alors que GEN.4 ne pratique que
  `? extends`.
- La généricité bornée (`<T extends Number>`) est exclue : aucun exercice,
  aucune session d'examen. La todo la réservait pour plus tard.
- GEN.3 garde ses deux questions ouvertes. Aucune slide ni note ne dit
  laquelle des deux classes garder, ni ce qu'un type dit en plus de ce qu'il
  stocke. La note de 2.4 fait seulement comparer les deux classes écrites.
- GEN.4 garde l'ordre découvrir puis comprendre, comme EXC.4 : la slide 4.2
  pose la substitution sans dire ce qu'elle devient entre chevrons, le renvoi
  (4.3) précède les jokers.
- GEN.6 garde sa seconde question ouverte : la slide 6.2 montre les deux
  formes d'héritage séparément, jamais la forme mixte de la question.
- La slide 6.3 est facultative : elle peut être sautée en classe.
- Les exemples utilisent un domaine neutre, une consigne à bagages
  (`Casier`, `Consigne`, `Ticket`, `Bagage`, `Valise`, `Sac`), pour ne
  réutiliser ni les classes des exercices (`Paire`, `Couple`, `Triplet`,
  `Personne`, `Etudiant`), ni celle de la démonstration (`Pile`), ni celles
  des sessions d'examen, ni l'ascenseur d'EXC, ni la bibliothèque de COL.
  Tous les exemples ont été compilés, et chaque refus annoncé vérifié.
- Le fil rouge reçoit un nouvel incrément, G.31, présenté en 7.1.

**Changements apportés au module** :

- GEN.3 : `TripletI` devient `TripletMemeType`, et `TripletD` devient
  `TripletTroisTypes` (CC-NOM.1 : le squelette avait besoin d'un commentaire
  pour dire ce que signifiait le I). Neuf fichiers Java renommés et
  recompilés : les deux classes dans les squelettes et les corrigés, les deux
  `Programme`, les deux `TripletTest`, le commentaire du corrigé.

**Retirés de l'ancien deck** :

- Le rappel du cours précédent (08a/2) et les trois exercices JUnit
  (08a/3 à 7) : ils appartiennent au deck JUN.
- Le sommaire répété sept fois (« Vous êtes ici »).
- La définition générale de la programmation générique (08a/10 et 11).
- Les deux classes `CoupleInteger` et `CoupleString` (08a/13 et 14), et
  `MaListe` sans générique (08a/19) : la démonstration fait cet argument.
- Les énoncés d'exercices (08a/20, 23, 52 à 55) : le fascicule.
- La convention de nommage (08a/24) : le fascicule.
- Les bornes (08a/35 à 38) : exclues, voir plus haut.
- La liste des héritages possibles et impossibles (08a/40 et 41) :
  remplacée par la slide 6.2.
- Le raisonnement par l'absurde sur `Couple<Integer>` et `Couple<Object>`
  (08a/42 à 45) : l'encadré de GEN.4 le fait.
- Les références web (08a/50) et toute la partie Lambda (08a/56 et
  suivantes) : le deck LAM.

**Défauts du deck d'origine corrigés** :

- Les classes `CoupleInteger` et `CoupleString` déclarent un constructeur
  nommé `Couple` (08a/13) : elles ne compilent pas. Retiré.
- `public addMembre(Object o)`, sans type de retour (08a/19) : ne compile
  pas. Retiré.
- K et V « utilisés pour les ensembles » (08a/24) : ce sont la clé et la
  valeur d'une `Map`. Retiré, le fascicule le dit correctement.
- Le refus de `String s = ci.getPremier()` attribué au transtypage inséré à
  la compilation (08a/28) : c'est la vérification de type, faite avant
  l'effacement, qui refuse. Corrigé en 3.3.
- L'appel d'une méthode `<T extends Number>` « traduit comme
  `(Number) hasard(...)` » (08a/37) : le transtypage inséré vise le type
  déduit à l'appel ; `Number` est l'effacement à l'intérieur de la méthode.
  Retiré avec les bornes.
- `Comparable` en type brut (08a/38) et `new Couple(o1, o2)` en type brut
  (08a/42), dans des slides consacrées à la sûreté des types. Retirés.
- `class D<U> extends C<V extends Number>` (08a/41) n'est pas du Java.
  Retiré.
- Le joker qui fait « passer les listes en lecture seule » (08a/48) : on ne
  peut rien y ajouter, mais retirer et vider restent possibles. Corrigé en
  4.4.
- `new ArrayList(Integer)` (08a/49) ne compile pas, et `new Double(1.0)` est
  déprécié. Retiré.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module GEN
- Types génériques

**Note**

Depuis le module COL, vous écrivez `List<String>` et `Map<String, Integer>`
sans vous demander qui a écrit les chevrons. Ce module vous fait passer de
l'autre côté : écrire une classe une fois, et laisser celui qui l'utilise
décider du type qu'elle contient.

Le module compte six exercices, qui montent sans rupture : un type, deux
types, trois, une famille de types, une méthode, un héritage. Le deck suit
la même marche.

Ne vous fiez pas à sa priorité affichée. Chaque session d'examen
contient une question entière sur une classe générique, et presque toujours
une classe qui enveloppe une collection.

---

## Section 1 - Un type en paramètre

### 1.1 · Un type en paramètre

*(intercalaire)*

### 1.2 · Quelqu'un a écrit ce `E`

**Source** nouvelle ; rappel de COL, slide 1.3

**Slide**

- Depuis COL, vous lisez les chevrons sans y penser
- Dans le JDK, l'auteur de `List` a écrit une lettre
- Ce module vous fait écrire l'autre côté

```java
// ce que vous ecrivez depuis le module COL
List<String> titres = new ArrayList<>();

// ce qu'a ecrit l'auteur de List (extrait simplifie)
public interface List<E> {
    boolean add(E element);
    E get(int index);
}
```

**Note**

Le `E` de la déclaration n'est pas un type : c'est une place laissée vide,
que chaque utilisateur remplit. Quand vous écrivez `List<String>`, tous les
`E` de l'interface valent `String`, et le compilateur vérifie chaque `add`.

Imaginez maintenant que l'auteur de `List` n'ait pas eu ce `E` à sa
disposition. Il aurait fallu une liste capable de tout recevoir. Que se
passerait-il alors à la lecture ? Et surtout, à quel moment verrait-on une
erreur ?

C'est exactement la question que pose la démonstration, sur une autre
classe.

---

### 1.3 · Démonstration

**Source** `Demo_GEN.docx`, 12 minutes, avant GEN.1

**Slide**

- Démo : l'erreur qui change de camp

**Note**

La démonstration part d'une classe écrite pour accepter n'importe quel
objet, puis la rend générique en n'y changeant presque rien. Regardez à quel
moment l'erreur apparaît dans chacune des deux versions, et où se trouve le
transtypage.

Retenez une phrase plutôt que la syntaxe : la généricité ne rend rien
possible qui ne l'était pas déjà, elle avance le moment où l'erreur se voit.

La section 3 reviendra sur ce que la démonstration laisse dans la classe, et
qu'on ne voit pas en l'utilisant.

---

### 1.4 · Déclarer un paramètre, le fixer à l'usage

**Source** d08a/15, 17 et 18, réécrites

**Slide**

- `<T>` après le nom de la classe déclare un paramètre de type
- `T` s'écrit ensuite partout où un type peut s'écrire
- À l'usage, un argument de type prend sa place

```java
public class Casier<T> {
    private T contenu;

    public void deposer(T objet) {
        contenu = objet;
    }

    public T retirer() {
        T objet = contenu;
        contenu = null;
        return objet;
    }
}

Casier<Valise> casier = new Casier<>();
```

**Note**

Deux mots à distinguer, comme pour les méthodes. Le `T` de la déclaration
est le paramètre de type. Le `Valise` de l'usage est l'argument de type.
Une méthode reçoit des valeurs, une classe générique reçoit des types.

À l'intérieur de la classe, `T` se comporte comme n'importe quel type :
champ, paramètre, retour, variable locale. Une seule limite, et elle compte :
la classe ne sait rien de ce que sera `T`. Elle ne peut donc appeler sur un
`contenu` que ce que tout objet sait faire, comme `toString` ou `equals`.

Le diamant de droite, déjà vu au module COL, laisse le compilateur déduire
l'argument de la déclaration.

Le code complet, à exécuter : demos, classe `demo.gen.slides.DeclarerUnParametre`.

---

### 1.5 · Un `T` se transmet

**Source** nouvelle ; d08a/19, réécrite ; forme de la question 2 des examens

**Slide**

- `T` peut servir d'argument à un autre type générique
- La classe enveloppe une collection, et lui délègue le travail
- La collection hérite de la vérification

```java
public class Consigne<T> {
    private final List<T> depots = new ArrayList<>();

    public void deposer(T objet) {
        depots.add(objet);
    }

    public int nombreDeDepots() {
        return depots.size();
    }
}
```

**Note**

Le champ est une `List<T>` : le `E` de la liste reçoit le `T` de la
consigne. Une `Consigne<Valise>` contient donc une `List<Valise>`, et une
`Consigne<String>` une `List<String>`, sans une ligne de plus.

La classe n'invente rien : elle délègue à la liste, comme au module COL. Ce
qu'elle ajoute, c'est un nom et un choix d'opérations. Elle n'expose que
ce qu'une consigne doit savoir faire.

C'est la forme de la question 2 de l'examen presque à chaque session : une
classe générique, une collection privée, quelques méthodes qui délèguent, et
un `Programme` qui montre la même classe au service de deux types. Aucun
exercice du module ne la pratique : regardez-la bien.

Le code complet, à exécuter : demos, classe `demo.gen.slides.DeclarerUnParametre`.

---

### 1.6 · Exercices

**Slide**

- **GEN.1** - Une paire, un seul type

**Note**

`GEN.1` applique la slide 1.4 sur une paire immuable : deux champs, deux
accesseurs, un `toString` au format imposé.

Faites l'expérience proposée avant d'écrire le `Programme`, et lisez ce que
dit le compilateur : c'est la démonstration, refaite par vous-même.

La seconde question de fin, `Paire<int>`, mérite d'être essayée vraiment.
Gardez la réponse du compilateur : la section 3 dira pourquoi il refuse.

---

## Section 2 - Autant de types qu'il en faut

### 2.1 · Autant de types qu'il en faut

*(intercalaire)*

### 2.2 · Plusieurs paramètres

**Source** d08a/22, réécrite

**Slide**

- Les paramètres se déclarent dans les mêmes chevrons
- Chacun s'utilise indépendamment des autres
- L'usage donne un argument à chacun, dans l'ordre

```java
public class Ticket<K, V> {
    private final K numero;
    private final V objet;

    public Ticket(K numero, V objet) {
        this.numero = numero;
        this.objet = objet;
    }
}

Ticket<Integer, Valise> t = new Ticket<>(42, valise);
```

**Note**

Un ticket de consigne relie un numéro à un objet. Rien n'oblige le numéro à
être un nombre, ni l'objet à être une valise : la classe laisse les deux
choix à son utilisateur.

C'est la forme de la `Map<K, V>` du module COL. L'ordre compte :
`Ticket<Valise, Integer>` est un autre type, et le compilateur refuserait
alors `new Ticket<>(42, valise)`.

Le code complet, à exécuter : demos, classe `demo.gen.slides.DeclarerUnParametre`.

---

### 2.3 · Un argument de type peut être générique

**Source** nouvelle ; rappel de COL (`Map<String, List<String>>`)

**Slide**

- Un argument de type peut contenir lui-même des chevrons
- On le lit de l'extérieur vers l'intérieur
- Le compilateur vérifie chaque niveau

```java
Map<String, List<Valise>> parVoyageur = new HashMap<>();

Casier<List<Valise>> casierFamille = new Casier<>();

Ticket<Integer, Casier<Valise>> ticket =
        new Ticket<>(7, new Casier<>());
```

**Note**

La première ligne se lit : une map dont les clés sont des `String` et les
valeurs des listes de valises. Vous avez déjà écrit cette forme au module
COL, pour ranger des titres par auteur.

La deuxième montre que rien ne distingue une classe du JDK d'une classe que
vous écrivez : `Casier<List<Valise>>` est un casier qui contient une liste.
Sa méthode `retirer` retourne une `List<Valise>`, sans transtypage.

Dans la troisième, le diamant fonctionne même imbriqué : le compilateur
déduit `Casier<Valise>` de la déclaration.

Le code complet, à exécuter : demos, classe `demo.gen.slides.DeclarerUnParametre`.

---

### 2.4 · Exercices

**Slide**

- **GEN.2** - Un couple, deux types
- **GEN.3** - Deux sortes de triplets

**Note**

`GEN.2` applique la slide 2.2. Lisez la remarque de l'énoncé sur le premier
des deux couples demandés.

`GEN.3` refait le geste deux fois : `TripletMemeType`, puis
`TripletTroisTypes`. Écrivez-les l'une après l'autre, puis posez-les côte à
côte. Comptez les lignes qui diffèrent, et notez où elles se trouvent.

Les deux questions de fin sont l'exercice. Discutez-les à voix haute avant
de regarder le corrigé : elles n'ont pas de réponse que le compilateur
puisse donner à votre place.

---

## Section 3 - Ce que le compilateur efface

### 3.1 · Ce que le compilateur efface

*(intercalaire)*

### 3.2 · Une seule classe à l'exécution

**Source** d08a/29, réécrite

**Slide**

- Pour le compilateur, `Casier<Valise>` et `Casier<String>` diffèrent
- À l'exécution, il n'existe qu'une classe `Casier`
- Les arguments de type ont disparu : c'est l'effacement

```java
Casier<Valise> pourValises = new Casier<>();
Casier<String> pourMessages = new Casier<>();

System.out.println(
        pourValises.getClass() == pourMessages.getClass());
// true
```

**Note**

Les arguments de type n'existent que pour le compilateur. Une fois qu'il a
tout vérifié, il les efface : un objet `Casier` ne sait pas de quoi il est le
casier. On appelle ce mécanisme l'effacement de type, *type erasure* en
anglais.

La raison est historique. La généricité est arrivée avec Java 5, en 2004.
Tout le code écrit avant devait continuer à tourner sur la même machine
virtuelle, sans être recompilé. Le type brut que la démonstration a montré
vient de là : c'est ce qui reste d'une classe générique une fois ses
arguments effacés.

Le code complet, à exécuter : demos, classe `demo.gen.slides.UneSeuleClasseALExecution`.

---

### 3.3 · Vérifier, puis effacer

**Source** d08a/27 et 28, réécrites et corrigées

**Slide**

- Le compilateur vérifie chaque usage de `T`
- Puis il remplace `T` par `Object` dans la classe
- Et il écrit lui-même le transtypage chez l'appelant

```java
// ce que vous ecrivez
Casier<Valise> casier = new Casier<>();
casier.deposer(new Valise("bleue"));
Valise v = casier.retirer();

// ce que la machine virtuelle execute
Casier casier = new Casier();
casier.deposer(new Valise("bleue"));
Valise v = (Valise) casier.retirer();
```

**Note**

Après effacement, `Casier` a un champ `Object` et une méthode `retirer` qui
retourne un `Object`. Le transtypage n'a donc pas disparu : c'est le compilateur
qui l'écrit, à chaque appel.

La différence avec la première version de la démonstration est ailleurs. Ce
transtypage-ci ne peut pas échouer, parce que le compilateur a vérifié tous
les `deposer` avant de l'écrire. C'est la vérification qui refuse une erreur
de type, pas le transtypage : elle a lieu avant l'effacement.

Le module FIC s'appuiera sur cette slide.

Le code complet, à exécuter : demos, classe `demo.gen.slides.UneSeuleClasseALExecution`.

---

### 3.4 · Ce que l'effacement interdit

**Source** d08a/29 et 30, réécrites

**Slide**

| Refusé | Parce qu'à l'exécution |
|---|---|
| `Casier<int>` | `T` devient `Object`, et un `int` n'est pas un objet |
| `new T()` | on ne sait plus quelle classe construire |
| `new T[10]` | un tableau doit connaître le type de ses cases |
| `static T champ;` | tous les casiers partagent une seule classe |

**Note**

Chacune de ces quatre lignes est refusée par le compilateur, et chaque refus
découle de la même cause : au moment de l'exécution, `T` n'existe plus.

La première répond à la question de `GEN.1`. Une classe générique ne connaît
que des objets : on écrit `Casier<Integer>`, et l'autoboxing du module COL
fait le reste.

La troisième explique ce que la démonstration a laissé dans la classe : un
tableau d'`Object`, et non un tableau de `T`. Un tableau vérifie à
l'exécution ce qu'on y range, il doit donc savoir quel type il contient.

La dernière tient à ce qu'un membre `static` appartient à la classe, et que
`Casier<Valise>` et `Casier<String>` n'en font qu'une.

---

### 3.5 · Le transtypage qu'on ne peut pas éviter

**Source** nouvelle ; démonstration GEN, état d'arrivée ; FIC.2

**Slide**

- Parfois, seul le programmeur sait ce que contient un `Object`
- Le compilateur accepte le transtypage, mais ne peut pas le vérifier
- `@SuppressWarnings("unchecked")` signe : je l'ai vérifié

```java
// dans une classe generique, sur un tableau d'Object
@SuppressWarnings("unchecked")
T objet = (T) cases[i];

// au module FIC, en relisant un fichier
List<Valise> valises = (List<Valise>) entree.readObject();
```

**Note**

Après effacement, un transtypage vers `T` devient un transtypage vers
`Object` : il ne vérifie rien. Un transtypage vers `List<Valise>` ne vérifie
que `List`. Si le contenu n'est pas le bon, l'erreur surgira plus tard, à
l'endroit où on lira l'élément, c'est-à-dire exactement ce que la
généricité devait empêcher. Le compilateur le signale par un avertissement
« unchecked ».

On l'accepte dans deux cas. Dans une classe qui contrôle seule ce qu'elle
range, comme la classe de la démonstration. Et quand une donnée revient d'un
monde qui ignore la généricité : au module FIC, `readObject` retourne un
`Object`, parce que le fichier ne garde aucune trace de l'argument de type.

L'annotation se pose sur la plus petite portée possible, une variable ou une
méthode, et jamais pour faire taire un avertissement qu'on ne comprend pas.

**Réserve** Le tableau des renvois de `Demo_FIC` cite « GEN.1 : l'effacement
de type, qui explique le transtypage à la relecture ». GEN.1 n'en parle pas :
renvoyer plutôt au deck GEN, slides 3.3 et 3.5. *Corrigé le 10/10/2026 :
`Demo_FIC` renvoie désormais au deck GEN, slides 3.3 et 3.5.*

---

## Section 4 - Une famille de types

### 4.1 · Une famille de types

*(intercalaire)*

### 4.2 · Une `Valise` est un `Bagage`

**Source** nouvelle ; rappel du module ABS

**Slide**

- `Valise` et `Sac` héritent de `Bagage`
- Une `List<Bagage>` accepte donc des valises et des sacs
- Peut-on passer une `List<Valise>` à une méthode qui attend une `List<Bagage>` ?

```java
// Valise extends Bagage, Sac extends Bagage

List<Bagage> soute = new ArrayList<>();
soute.add(new Valise("bleue"));       // accepte
soute.add(new Sac());                 // accepte
```

**Note**

Rien de neuf ici : c'est la substitution du module ABS. Partout où l'on
attend un `Bagage`, on peut donner une `Valise`. Une liste de bagages peut
donc contenir des valises et des sacs mélangés.

La dernière puce de la slide reste une question, et c'est voulu : peut-on
passer une `List<Valise>` à une méthode qui attend une `List<Bagage>` ?
L'intuition dit oui, puisqu'une valise est un bagage. Ne répondez pas
encore : l'exercice suivant vous fait essayer, et le compilateur répondra.

Le code complet, à exécuter : demos, classe `demo.gen.slides.ExtendsEtSuper`.

---

### 4.3 · Exercices

**Slide**

- **GEN.4** - Le joker
- D'abord la version évidente

**Note**

`GEN.4` se fait dans un ordre précis, et cet ordre est l'exercice.

Écrivez d'abord la méthode avec un `Triplet<Personne>` en paramètre, comme
l'énoncé le propose. Passez-lui un `Triplet<Etudiant>`, et lisez le refus du
compilateur avant de lire l'encadré. Seulement ensuite, écrivez la version
avec le joker.

La seconde question de fin rapproche cette slide de la précédente. Elle vaut
la peine d'être discutée à plusieurs.

---

### 4.4 · `? extends` : on lit

**Source** d08a/46 à 49, réécrites et corrigées

**Slide**

- `? extends Bagage` : une liste de quelque chose qui est un `Bagage`
- Une `List<Valise>` ou une `List<Sac>` y passent
- On en lit des `Bagage`, on n'y ajoute rien

```java
public static double poidsTotal(List<? extends Bagage> bagages) {
    double total = 0;
    for (Bagage b : bagages) {
        total += b.getPoids();
    }
    // bagages.add(new Sac());   ne compile pas
    return total;
}
```

**Note**

Le point d'interrogation se lit « quelque chose ». La méthode ne sait pas
quelle liste elle reçoit, mais elle sait que chaque élément est au moins un
`Bagage` : elle peut donc lire et peser.

Ajouter, en revanche, lui est interdit. Si la liste reçue est une
`List<Valise>`, un `Sac` y serait un intrus, et la méthode n'a aucun moyen de
le savoir. Le compilateur refuse donc tout ajout, sauf `null`. Retirer ou
vider la liste restent possibles : on ne peut rien y faire entrer, ce qui
n'est pas tout à fait « lecture seule ».

C'est le joker de `GEN.4`. Sur un triplet sans mutateur, on ne voit que la
lecture. Sur une liste, on voit aussi ce qui est refusé.

Le code complet, à exécuter : demos, classe `demo.gen.slides.ExtendsEtSuper`.

---

### 4.5 · `? super` : on ajoute

**Source** nouvelle ; d08a/47 ; promesse du deck COL, slide 5.3

**Slide**

- `? super Valise` : une liste de quelque chose dont `Valise` hérite
- Une `List<Valise>`, `List<Bagage>` ou `List<Object>` y passent
- On y ajoute des valises, on n'en lit que des `Object`

```java
public static void charger(List<? super Valise> soute, int n) {
    for (int i = 0; i < n; i++) {
        soute.add(new Valise("grise"));
    }
}

charger(new ArrayList<Bagage>(), 3);    // accepte
```

**Note**

C'est le joker symétrique. Quelle que soit la liste reçue, une `Valise` y a
sa place : une liste de valises, de bagages ou d'objets l'accepte. En
revanche, la méthode ne sait pas ce qu'elle lirait : seulement des `Object`.

D'où une règle simple. Le joker `extends` sert à une méthode qui lit, le
joker `super` à une méthode qui ajoute.

Le module COL a montré `removeIf(Predicate<? super E> critere)`. Vous pouvez
maintenant le lire : un critère écrit pour des `Bagage` sait tester des
`Valise`, et peut donc servir sur une `List<Valise>`. Le module LAM en
montrera d'autres dans les signatures du JDK. Les reconnaître suffit : en
écrire est rare.

Le code complet, à exécuter : demos, classe `demo.gen.slides.ExtendsEtSuper`.

### 4.6 · `? extends` ou `? super`

**Source** nouvelle ; tableau de synthèse ajouté le 15/10/2026, à la demande du
professeur

**Slide**

Tout dépend de ce que la méthode fait de la liste : la lire, ou la remplir.

| | `? extends Bagage` | `? super Valise` |
|---|---|---|
| Accepte | `Bagage`, `Valise`, `Sac` | `Valise`, `Bagage`, `Object` |
| Lire | oui, des `Bagage` | des `Object` seulement |
| Ajouter | non | oui, des `Valise` |
| La liste | fournit | reçoit |
| Exemple | `poidsTotal(...)` | `charger(...)` |

**Note**

Ce tableau résume les deux slides précédentes. La question à se poser porte
sur la méthode, pas sur la liste : que fait-elle de ce qu'on lui donne ?

Si elle lit, si la liste lui fournit des éléments, le joker est extends :
toutes les listes de la famille passent, et chaque élément lu est au moins un
Bagage. Mais elle ne peut rien y ajouter, puisqu'elle ignore de quoi la liste
est réellement faite : une liste de sacs n'accepterait pas une valise.

Si elle ajoute, si la liste reçoit des éléments, le joker est super : la
liste accepte au moins des valises, quelle qu'elle soit. En échange, ce
qu'on en lit n'est garanti que comme un Object.

Les anglophones retiennent la règle sous le nom PECS, Producer Extends,
Consumer Super : la liste qui produit utilise extends, celle qui consomme
utilise super. Une méthode qui fait les deux, lire et ajouter, n'utilise pas
de joker : elle prend une List<Bagage>.

Le code complet, à exécuter : demos, classe `demo.gen.slides.ExtendsEtSuper`.

---

## Section 5 - Une méthode générique

### 5.1 · Une méthode générique

*(intercalaire)*

### 5.2 · Le compilateur déduit le `T`

**Source** d08a/32 et 33, réécrites

**Slide**

- Le `T` d'une méthode se fixe à chaque appel
- Le compilateur le déduit des arguments
- On peut le donner soi-même, mais c'est rarement utile

```java
public static <T> T auHasard(List<T> elements) {
    int i = (int) (Math.random() * elements.size());
    return elements.get(i);
}

Valise v = Tirage.auHasard(valises);    // T vaut Valise
String s = Tirage.auHasard(messages);   // T vaut String
Valise w = Tirage.<Valise>auHasard(valises);
```

**Note**

Le `T` d'une classe est fixé une fois, à la création de l'objet. Celui
d'une méthode est fixé à chaque appel, et peut valoir autre chose à l'appel
suivant.

Personne ne l'écrit : le compilateur regarde l'argument, voit une
`List<Valise>`, et en déduit `T`. Il sait alors que l'appel retourne une
`Valise`.

La dernière ligne montre la forme explicite. Vous la croiserez dans des
documentations, rarement dans du code : le compilateur s'en passe presque
toujours.

Le code complet, à exécuter : demos, classe `demo.gen.slides.LeCompilateurDeduitLeT`.

---

### 5.3 · Une méthode statique déclare son `T`

**Source** nouvelle ; rappel du module STA (fabriques)

**Slide**

- Le `T` d'une classe appartient à chacun de ses objets
- Une méthode `static` n'a pas d'objet : elle ne le voit pas
- Elle déclare le sien, comme cette fabrique

```java
public class Casier<T> {
    // ...

    public static <T> Casier<T> contenant(T objet) {
        Casier<T> casier = new Casier<>();
        casier.deposer(objet);
        return casier;
    }
}

Casier<Valise> casier = Casier.contenant(valise);
```

**Note**

Une méthode statique est appelée sur la classe, sans objet. Or c'est la
création d'un objet qui fixe le `T` de la classe. Le compilateur refuse donc
qu'une méthode statique s'en serve : c'est la même raison que le champ
`static T` de la slide 3.4.

La méthode déclare donc son propre paramètre. Il porte ici la même lettre,
comme dans le JDK (`List.of` fait pareil), mais c'est un autre `T` : celui
de la méthode, déduit à chaque appel.

C'est une fabrique, au sens du module STA : une méthode statique qui
construit et retourne un objet prêt à servir.

Le code complet, à exécuter : demos, classe `demo.gen.slides.LeCompilateurDeduitLeT`.

---

### 5.4 · Exercices

**Slide**

- **GEN.5** - Une méthode générique

**Note**

`GEN.5` déclare un `T` sur une méthode d'une classe qui n'est pas générique.
L'indice de l'énoncé vous évite d'écrire la boucle d'inversion.

Lisez la remarque honnête de l'énoncé, puis faites l'expérience de la
première question : la méthode réécrite avec un `Object`. Comparez avec
`auHasard` de la slide 5.2, et cherchez ce qui fait la différence entre les
deux.

---

## Section 6 - Hériter d'une classe générique

### 6.1 · Hériter d'une classe générique

*(intercalaire)*

### 6.2 · Deux façons d'hériter

**Source** d08a/40, réécrite

**Slide**

- Une fille peut rester générique : `extends Casier<T>`
- Ou fixer le type une fois pour toutes : `extends Casier<Velo>`
- Les méthodes héritées suivent l'argument donné à la mère

```java
public class CasierFerme<T> extends Casier<T> {
    private final String code;

    public CasierFerme(String code) {
        this.code = code;
    }
}

public class CasierVelo extends Casier<Velo> {
    // deposer(Velo) et retirer() : Velo, herites tels quels
}
```

**Note**

`CasierFerme` reste générique : on peut créer un `CasierFerme<Valise>` ou un
`CasierFerme<Sac>`, et chacun hérite des méthodes de `Casier` pour ce type.

`CasierVelo` ne l'est plus. Il est un `Casier<Velo>`, et rien d'autre : on
écrit `new CasierVelo()` sans chevrons, et sa méthode `retirer` retourne un
`Velo`.

Pour le reste, l'héritage fonctionne comme au module ABS : redéfinition,
`super`, polymorphisme.

**Réserve** La seconde question de GEN.6 porte sur la forme mixte
`class CoupleNomme<T> extends Couple<String>`. La slide montre les deux formes
séparément et ne la mentionne pas : à vérifier qu'elle ne répond pas à la
place de l'étudiant.

Le code complet, à exécuter : demos, classe `demo.gen.slides.DeuxFaconsDHeriter`.

---

### 6.3 · Une interface générique

**Source** nouvelle ; rappel des modules ITF et COL

**Slide**

- Une interface aussi peut être générique : `Depot<T>`
- Elle déclare ici `deposer(T)` et `retirer()`, qui retourne un `T`
- La classe qui l'implémente transmet le type, ou le fixe

```java
public class Vestiaire implements Depot<Manteau> {
    private Manteau accroche;

    @Override
    public void deposer(Manteau m) { accroche = m; }

    @Override
    public Manteau retirer() { return accroche; }
}
```

**Note**

Slide facultative : on peut la sauter si le temps manque.

`Vestiaire` fixe le type : dans ses méthodes, `T` est remplacé par
`Manteau`, et l'annotation `@Override` le confirme. `Casier<T>` pourrait de
son côté implémenter `Depot<T>`, et transmettre son paramètre.

Vous connaissez déjà une interface générique : `List<E>`, slide 1.2. Le
module LAM vous en fera implémenter d'autres, comme `Comparator<T>`, sans
écrire de classe.

Le code complet, à exécuter : demos, classe `demo.gen.slides.DeuxFaconsDHeriter`.

---

### 6.4 · Exercices

**Slide**

- **GEN.6** - Hériter d'une classe générique
- Code commun : CC-CLS.3, tests : CC-MET.7

**Note**

`GEN.6` fournit `Couple<T>` et vous fait écrire `CoupleNomme<T>`. Lisez
l'encadré sur `super` et `this` avant d'écrire le constructeur.

La première question de fin rejoint le module ABS : une méthode de la mère
qui appelle du code écrit après elle. La seconde se règle dans l'éditeur.
Écrivez réellement la ligne proposée, et lisez ce que fait le compilateur
quand vous créez un objet de la classe.

---

## Section 7 - Le fil rouge

### 7.1 · Le fil rouge

**Slide**

- **G.31** - Un objet par joueur *(fil rouge GameHub)*
- Deux champs jumeaux deviennent un objet

**Note**

Relisez votre GameHub avec un œil neuf. Le jeu de Nim garde deux
stratégies dans deux champs jumeaux, et choisit la bonne par un opérateur
ternaire ; il fait de même pour les joueurs. La bataille passe ses deux
pioches en paramètres jumeaux.

`G.31` vous fait écrire une seule classe, `ParJoueur<T>`, qui garde une chose
pour chaque joueur, puis vous fait l'introduire dans le Nim. La même classe
y sert pour des stratégies et pour des joueurs, sans transtypage. La
bataille fait l'objet d'une question : faut-il y aller aussi ?

Une question à garder en tête : `ParJoueur<T>` stocke la même chose qu'une
`Paire<T>`. Que dit-elle de plus ?
