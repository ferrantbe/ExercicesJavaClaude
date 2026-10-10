# Scénario du module LAM - Lambdas et références de méthodes

*Trois sections, 18 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_lam.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Une classe qui perd son nom | La classe anonyme |
| 2 | Ce que le compilateur sait déjà | La lambda |
| 3 | Réutiliser ce qui existe | JDK et références |

Les slides 4.1 (le module FX) et 4.2 (le fil rouge) n'ont pas
d'intercalaire, comme la slide 5.1 du deck EXC.

**Sources** : ancien deck 08 (génériques et lambdas réunis, renommé
`d08a.pptx` ; partie lambdas en slides 56 à 98, intercalaire en slide 56),
`LAM_enonces.docx`, `Demo_LAM.docx` et ses deux états de code, les corrigés de
`be.ephec.java.lam`, les scénarios ITF (6.5), COL (5.3, 5.4, 6.3) et JUN (3.3),
`Memento_Clean_Code.docx` (CC-NOM.1, CC-MET.1, CC-MET.3, CC-MET.7), le guide
IntelliJ (IDE.16), `GameHub_enonces.docx` (G.15, G.17, G.20, G.30), les six
sessions d'examen 2022 à 2025.

**Place dans le cours** : treizième deck, après GEN. Les interfaces, les
interfaces fonctionnelles (ITF 6.5), `Predicate` et `Function` passées à
`removeIf` et `computeIfAbsent` (COL), `assertThrows` et sa flèche recopiée
(JUN), la lecture de `List<T>` et l'écriture d'une classe générique (GEN) sont
connues. FX et FIC viennent après.

**Le fil** : une lambda n'est pas une syntaxe plus courte, c'est un
comportement qu'on transmet comme une donnée. Le deck suit un seul critère,
`TitreLong` (slide 5.4 du deck COL), qui se dépouille en trois gestes : il
perd le nom de sa classe (section 1), puis tout ce que le compilateur sait
déjà (section 2), et finit désigné par le nom d'une méthode qui existe
(section 3). Trois écritures d'une même idée, pas trois notations.

**Le partage avec la démonstration et le fascicule** :

- La démonstration, jouée après la slide sur la classe anonyme, compare une
  classe abstraite et une interface instanciées en classes anonymes, laisse
  IntelliJ convertir l'une et refuser l'autre, fait trouver la règle, ajoute
  `@FunctionalInterface`, passe la lambda à une méthode, et refait le chemin
  inverse. Le deck ne refait rien de cela : il la nomme (1.4), puis explique
  par le type cible (2.3) la règle qu'elle a fait découvrir.
- Le fascicule porte les trois écritures côte à côte sur `Calculateur`, les
  règles d'omission pour un paramètre unique, la condition « une seule
  méthode abstraite » et l'annotation, et l'encadré « lambda ou référence
  de méthode ». Le deck ne les répète pas.
- Le deck porte ce que ni l'un ni l'autre ne pose : le comportement transmis
  comme une donnée, la classe anonyme comme notion, le dépouillement justifié
  par ce que le compilateur déduit, le type cible, les formes à zéro et deux
  paramètres et le corps en bloc, les quatre interfaces de
  `java.util.function`, les méthodes de COL réécrites sans classe, la
  référence de méthode, et un premier stream.

**Décisions appliquées** :

- Le deck pose les notions sans répondre aux questions des exercices. Restent
  ouvertes exprès : la ligne où le compilateur proteste quand on ajoute une
  méthode à `Calculateur` (LAM.1) ; l'interface du JDK qui remplace
  `Filtrage`, et l'usage d'une variable locale dans une lambda (LAM.2) ; les
  références sur une instance et sur un constructeur, et des critères en
  méthodes d'instance (LAM.3). Aucune slide ni note ne nomme `IntPredicate` :
  la slide 3.2 dit seulement que des variantes pour les types primitifs
  existent. La slide 3.4 ne montre que la forme `Classe::methodeStatique`.
- L'exemple suivi est `TitreLong`, repris du deck COL plutôt qu'un domaine
  neuf, parce que la continuité porte le fil : les étudiants ont écrit le
  critère en classe nommée, ils le voient se dépouiller. Les classes des
  exercices (`Calculateur`, `Filtrage`, `Affichage`, `EstPair`) et de la
  démonstration (`MonInterface`, `ClasseAbstraite`) ne sont pas réutilisées.
- La démonstration passe après la classe anonyme (1.3) et non en ouverture :
  son étape 1 relit ainsi une notion posée au lieu de la découvrir en une
  phrase.
- La promesse du deck JUN est tenue en 2.3 : `() -> salle.reserver(0)` y est
  expliquée comme l'implémentation de la méthode `execute` d'`Executable`.
  Celle du deck ITF (6.5) l'est en 2.2.
- Le stream (3.5) est enseigné parce que la dernière question de LAM.3 le
  suppose ; la slide est facultative, sautable en classe, et laissée alors à
  l'appréciation des étudiants intéressés. Elle montre `filter`, `map` et
  `collect`, et la note donne `Arrays.stream` et `mapToObj` pour un tableau
  d'entiers, de quoi écrire la version demandée. Le corrigé de LAM.3 reçoit
  cette version en commentaire, avec la comparaison que la question attend.
- Le fil rouge reçoit un incrément LAM, G.32 « Une fabrique sans switch » :
  `JeuFactory` range dans une `Map<TypeJeu, Supplier<Jeu>>` la façon de
  fabriquer chaque jeu. Il s'appuie sur COL (la `Map`) et sur la slide 3.2
  (`Supplier`), et suit G.31 (GEN). La slide 4.2 l'annonce ; sa note relit
  aussi G.17, dont la question promettait le thème LAM.
- Calibrage : les lambdas n'apparaissent à l'examen que dans la question
  JavaFX, comme gestionnaires d'événements, et dans l'objectif annoncé en
  tête de chaque session. D'où un deck sobre, et une dernière slide (4.1)
  qui montre où elles reviennent, sans enseigner FX à sa place.
- Retirés de l'ancien deck : les 55 slides de généricité (au deck GEN), le
  récit des melons (la démonstration et le fil `TitreLong` le remplacent),
  l'exemple et le contre-exemple `Comparator` et `Foo` sur le décompte des
  méthodes d'`Object` (hors programme, voir la réserve d'ITF 6.5), les
  interfaces Swing et AWT, `Collections.sort` avec un `Comparator`, les cinq
  énoncés d'exercices (le fascicule), le sommaire répété cinq fois.

**Défauts du deck d'origine corrigés** :

- La méthode présentée comme `filtrerParTypeEtPoids` s'appelle
  `filtrerParPoids` dans le code (08a/61), et une parenthèse fermée trop tôt
  dans la condition empêche le code de compiler. Retiré avec le récit.
- « `@FonctionalInterface` » dans le titre de 08a/75. Retiré.
- `java.swing.event.ChangeListener` (08a/76) : le package est `javax.swing`.
  Retiré.
- `public Calcul {` sans le mot `class` (08a/93). Retiré.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module LAM
- Lambdas et références de méthodes

**Note**

Une méthode reçoit d'habitude des valeurs : un nombre, une chaîne, un objet.
Ce module montre comment lui passer un comportement, c'est-à-dire ce qu'il
faut faire, aussi simplement qu'on lui passe une valeur.

Vous savez déjà le faire, avec une classe qui implémente une interface. Ce
module n'ajoute aucune capacité. Il ajoute une écriture qui rend la chose
assez légère pour qu'on la fasse vraiment, et partout.

Le thème compte trois exercices. À l'examen, les lambdas reviennent surtout
dans la question JavaFX : chaque bouton reçoit le comportement à déclencher
quand on clique.

---

## Section 1 - Une classe qui perd son nom

### 1.1 · Une classe qui perd son nom

*(intercalaire)*

### 1.2 · Vous passez déjà des comportements

**Source** nouvelle ; rappel du deck COL, slide 5.4

**Slide**

- La méthode `removeIf` reçoit un objet, mais elle n'en attend qu'une méthode
- Toute la classe existe pour porter une seule ligne

```java
public class TitreLong implements Predicate<String> {

    private static final int LONGUEUR_MAX = 20;

    @Override
    public boolean test(String titre) {
        return titre.length() > LONGUEUR_MAX;    // la seule ligne utile
    }
}

titres.removeIf(new TitreLong());
```

**Note**

Vous avez écrit ce code au module COL. Regardez-le à nouveau, en vous
demandant ce que `removeIf` reçoit vraiment. Un objet, oui. Mais elle ne lui
demande rien d'autre que d'appeler `test`. Ce qu'on lui transmet, c'est un
comportement : la façon de décider si un titre est trop long.

Pour transmettre cette seule ligne, il a fallu un fichier, une classe, un
nom, une annotation, une signature. Quand le critère sert souvent, ce prix se
justifie : la classe porte un nom, et on peut la tester seule.

Quand il ne sert qu'une fois, le prix devient dissuasif. On finit par écrire
une boucle à la place, et le critère se perd dans la boucle.

---

### 1.3 · La classe anonyme

**Source** nouvelle ; 08a/66 et 67, réécrites

**Slide**

- Une classe écrite à l'endroit même où l'on crée son objet
- Elle n'a pas de nom : elle ne servira qu'ici
- Le mot `new` est suivi de l'interface, puis du corps de la classe

```java
titres.removeIf(new Predicate<String>() {
    @Override
    public boolean test(String titre) {
        return titre.length() > LONGUEUR_MAX;
    }
});
```

**Note**

La première chose à retirer, c'est le nom. Ce code déclare une classe qui
implémente `Predicate<String>`, et crée aussitôt son unique objet. La classe
n'a pas de nom, d'où son appellation : classe anonyme.

Lisez-la de l'extérieur vers l'intérieur. `new Predicate<String>()` ne crée
pas un objet de l'interface, ce qui est impossible depuis le module ITF : les
accolades qui suivent sont le corps d'une classe qui l'implémente.

La constante `LONGUEUR_MAX` vit désormais dans la classe qui contient cet
appel. Une classe anonyme voit les champs de la classe où elle est écrite.

Le fichier a disparu, mais regardez ce qui reste autour de la ligne utile :
cinq lignes de cérémonie. La démonstration va montrer ce qu'IntelliJ en fait.

---

### 1.4 · Démonstration

**Source** `Demo_LAM.docx`, 12 minutes, avant LAM.1

**Slide**

- Démo : ce qu'une lambda peut remplacer, et ce qu'elle ne peut pas

**Note**

La démonstration part de deux classes anonymes qui se ressemblent comme deux
gouttes d'eau. L'une implémente une interface, l'autre hérite d'une classe
abstraite. IntelliJ propose de transformer la première, pas la seconde.

Ne retenez pas le raccourci, retenez la question : qu'est-ce que l'outil sait
et que nous n'avons pas encore dit ? La section suivante y répond, et la
réponse tient en une idée, le type cible.

Retenez aussi le geste de la fin. Une lambda et une classe anonyme sont deux
écritures de la même chose, et IntelliJ passe de l'une à l'autre dans les
deux sens. Quand une lambda vous semble obscure, dépliez-la.

---

## Section 2 - Ce que le compilateur sait déjà

### 2.1 · Ce que le compilateur sait déjà

*(intercalaire)*

### 2.2 · La lambda : ce qui reste

**Source** 08a/70 et 82, réécrites ; promesse du deck ITF, slide 6.5

**Slide**

- On retire tout ce que le compilateur peut déduire
- Il reste le paramètre, une flèche, et ce qu'on en fait

```java
titres.removeIf(new Predicate<String>() {    // impose par removeIf
    @Override
    public boolean test(String titre) {       // la seule methode a ecrire
        return titre.length() > LONGUEUR_MAX;
    }
});

titres.removeIf(titre -> titre.length() > LONGUEUR_MAX);
```

**Note**

Reprenez la classe anonyme ligne par ligne, et demandez-vous ce que le
compilateur savait déjà. Que l'interface est `Predicate<String>` : c'est le
type du paramètre de `removeIf`. Que la méthode est `test` : c'est la seule
méthode abstraite de l'interface. Que `titre` est une `String`, et que le
résultat est un `boolean` : c'est la signature de `test`.

Tout cela s'efface. Il reste ce que le compilateur ne peut pas deviner : le
nom qu'on donne au paramètre, et ce qu'on en fait. La flèche les sépare.
C'est une expression lambda.

Le module ITF l'avait annoncé : partout où une interface fonctionnelle est
attendue, cette écriture est permise. Le programme fait exactement la même
chose qu'avec `TitreLong`. Seul le coût d'écriture a changé, et avec lui
l'envie de le faire.

---

### 2.3 · Son type vient d'où elle va

**Source** nouvelle ; promesse du deck JUN, slide 3.3

**Slide**

- Une lambda n'a pas de type à elle : elle prend celui de sa destination
- Une variable, un paramètre : c'est le type cible
- Il doit être une interface fonctionnelle, sinon quelle méthode écrire ?

```java
// la variable fixe le type
Predicate<String> estLong = titre -> titre.length() > LONGUEUR_MAX;

// le parametre fixe le type : Executable, une seule methode, execute()
assertThrows(IllegalArgumentException.class,
        () -> salle.reserver(0));
```

**Note**

Une lambda seule ne veut rien dire. Le compilateur la comprend en regardant
où elle va : la variable qui la reçoit, ou le paramètre auquel on la passe.
Ce type de destination s'appelle le type cible, et c'est lui qui dit quelle
méthode la lambda implémente.

Voilà la règle que la démonstration a fait trouver. Si le type cible avait
deux méthodes abstraites, le compilateur ne saurait pas laquelle la lambda
écrit. Si c'était une classe abstraite, il faudrait un objet complet, avec
son état et son constructeur, alors qu'une lambda n'apporte qu'une méthode.

Le module JUN vous avait demandé de recopier `() -> salle.reserver(0)` sans
explication. Le paramètre d'`assertThrows` a pour type `Executable`, une
interface de JUnit dont la seule méthode, `execute`, ne reçoit rien et ne
retourne rien. D'où les parenthèses vides. La lambda emballe l'appel, et
`assertThrows` l'exécute quand elle est prête à attraper l'exception.

Une lambda est donc un objet comme un autre : on la range dans une variable,
on la passe en paramètre, on la met dans un tableau.

---

### 2.4 · Les formes d'une lambda

**Source** 08a/71, réécrite

**Slide**

- Aucun paramètre : des parenthèses vides
- Deux paramètres : entre parenthèses, séparés par une virgule
- Plusieurs instructions : un bloc, avec son `return`

```java
Runnable saluer = () -> System.out.println("Bonjour");

Comparator<String> parLongueur = (a, b) -> a.length() - b.length();

Predicate<String> estLong = titre -> {
    String sansEspaces = titre.strip();
    return sansEspaces.length() > LONGUEUR_MAX;
};
```

**Note**

Le fascicule montre la forme la plus courante, un seul paramètre et une
seule expression. Les autres suivent la signature de la méthode à écrire.

La méthode `run` de `Runnable` ne reçoit rien : la lambda commence par des
parenthèses vides. La méthode `compare` de `Comparator` en reçoit deux : on
les nomme entre parenthèses. Le résultat d'`a.length() - b.length()` est
négatif, nul ou positif, comme `compare` doit le retourner.

Dès que le corps compte plus d'une instruction, il prend des accolades, et
le `return` redevient obligatoire, comme dans une méthode. Un corps en bloc
est permis, mais s'il s'allonge, c'est le signe qu'il mérite un nom. La
section suivante dit comment le lui donner.

---

### 2.5 · Exercices

**Slide**

- **LAM.1** - Un tableau de comportements
- **LAM.2** - Écrire son interface fonctionnelle
- Déplier une lambda : IDE.16 ; nommer ce qui n'a pas de nom : CC-MET.1

**Note**

`LAM.1` range quatre lambdas dans un tableau, et les applique sans savoir ce
qu'elles font. Comparez avec ITF.1 : la même idée y demandait un fichier par
calcul. Faites l'expérience de la deuxième question, en ajoutant une méthode
à l'interface : regardez sur quelle ligne le compilateur proteste.

`LAM.2` passe de l'autre côté : vous écrivez la méthode qui reçoit le
critère, et l'interface qui le décrit. Le test lui passe des lambdas qu'elle
n'a jamais vues, et elle s'en sort sans les connaître.

Gardez la question de `LAM.2` pour la section suivante. Et essayez vraiment
celle sur la variable locale : le compilateur a un avis.

---

## Section 3 - Réutiliser ce qui existe

### 3.1 · Réutiliser ce qui existe

*(intercalaire)*

### 3.2 · Les interfaces de `java.util.function`

**Source** 08a/77, réécrite ; rappel du deck COL, slides 5.3 et 6.3

**Slide**

| Interface | Méthode | Elle sait |
|---|---|---|
| `Predicate<T>` | `boolean test(T)` | répondre oui ou non |
| `Function<T, R>` | `R apply(T)` | transformer un `T` en `R` |
| `Consumer<T>` | `void accept(T)` | faire quelque chose d'un `T` |
| `Supplier<T>` | `T get()` | fournir un `T` |

**Note**

Avant d'écrire une interface fonctionnelle, regardez si le JDK ne l'a pas
déjà écrite. Le package `java.util.function` en contient une quarantaine,
et ces quatre-là couvrent la plupart des besoins. Vous connaissez les deux
premières depuis le module COL.

Le nom de chacune dit ce qu'elle sait faire. Un `Predicate` répond oui ou
non. Une `Function` reçoit une chose et en retourne une autre. Un `Consumer`
reçoit une chose et ne retourne rien : il agit. Un `Supplier` ne reçoit rien
et fournit quelque chose.

Toutes sont génériques, comme au module GEN. Pour les types primitifs, le
package contient aussi des variantes qui évitent de passer par `Integer` :
cherchez-les dans la documentation, une question de `LAM.2` vous y invite.

Écrire sa propre interface reste utile quand son nom porte un sens métier.
Mais c'est alors pour le nom, pas pour la signature.

---

### 3.3 · Les méthodes de COL, sans classe

**Source** nouvelle ; rappel du deck COL, slides 5.4 et 6.3

**Slide**

- Les critères du module COL tiennent chacun sur une ligne
- La méthode `forEach` reçoit un `Consumer` : elle agit sur chaque élément

```java
titres.removeIf(titre -> titre.length() > LONGUEUR_MAX);

titresParAuteur.computeIfAbsent("Zola", auteur -> new ArrayList<>())
               .add("Germinal");

titres.forEach(titre -> System.out.println(titre));
```

**Note**

Au module COL, `removeIf` et `computeIfAbsent` recevaient des objets de
classes nommées, `TitreLong` et `NouvelleListe`. Chacune tient désormais sur
une ligne, à l'endroit même où elle sert, et le lecteur voit le critère sans
ouvrir un autre fichier.

La méthode `forEach`, que possède toute collection, reçoit un `Consumer` et
l'applique à chaque élément, dans l'ordre. C'est la boucle `for` améliorée,
écrite comme un appel de méthode.

Remarquez le paramètre `auteur`, inutile ici puisqu'une liste vide ne dépend
de personne. La signature d'`apply` l'impose, comme au module COL : la
lambda doit le nommer, même sans s'en servir.

---

### 3.4 · La référence de méthode

**Source** 08a/90 à 94, réécrites

**Slide**

- Si la lambda ne fait qu'appeler une méthode, on désigne la méthode
- La classe, deux deux-points, le nom : sans parenthèses

```java
public class Titres {

    private static final int LONGUEUR_MAX = 20;

    public static boolean estLong(String titre) {
        return titre.length() > LONGUEUR_MAX;
    }
}

titres.removeIf(titre -> Titres.estLong(titre));
titres.removeIf(Titres::estLong);
```

**Note**

Dernier dépouillement. La lambda du milieu ne fait rien d'autre que
transmettre son paramètre à une méthode qui existe. Le nom `titre` n'apporte
plus rien : il entre et ressort aussitôt. On peut alors désigner la méthode
elle-même, par sa classe et son nom.

`Titres::estLong` n'appelle pas la méthode : il n'y a pas de parenthèses. Il
la désigne, pour que `removeIf` l'appelle plus tard, sur chaque titre. Les
deux lignes produisent le même objet, un `Predicate<String>`.

La condition est la même que pour une lambda : la méthode doit correspondre
à la méthode abstraite du type cible. Ici, `estLong` reçoit une `String` et
retourne un `boolean`, comme `test`.

Le chemin est complet : une classe nommée, puis une classe sans nom, puis
une lambda, puis le seul nom d'une méthode. À chaque étape, la même idée,
avec moins à écrire. La différence entre la lambda et la référence n'est plus
le coût, c'est le nom : le fascicule en fait l'encadré de `LAM.3`.

---

### 3.5 · Un stream, en passant *(facultative)*

**Source** nouvelle ; demandée par la dernière question de LAM.3

**Slide**

- Un stream enchaîne des comportements sur une collection
- Chaque étape reçoit une lambda, ou une référence de méthode
- La collection d'origine n'est pas modifiée

```java
String longs = titres.stream()
        .filter(titre -> titre.length() > LONGUEUR_MAX)
        .map(titre -> titre.toUpperCase())
        .collect(Collectors.joining(", "));
```

**Note**

Slide facultative, que l'on peut sauter en classe. Elle montre où mènent les
lambdas quand on les enchaîne.

La méthode `stream` ouvre un flux sur les éléments de la liste. La méthode
`filter` reçoit un `Predicate` et ne laisse passer que les titres qu'il
accepte. La méthode `map` reçoit une `Function` et transforme chaque titre.
Enfin `collect` rassemble ce qui reste ; `Collectors.joining` en fait une
seule chaîne, avec le séparateur donné.

Contrairement à `removeIf`, rien n'est retiré de `titres` : le stream produit
un résultat neuf. Le code se lit comme une phrase, étape par étape, et dit ce
qu'il fait plutôt que comment il le fait.

Pour un tableau d'entiers, `Arrays.stream(tableau)` ouvre le même
enchaînement. Comme les éléments sont des `int`, `mapToObj` les transforme
alors en objets, par exemple en chaînes avec `String::valueOf`, avant de les
joindre. C'est de quoi répondre à la dernière question de `LAM.3`.

---

### 3.6 · Exercices

**Slide**

- **LAM.3** - Celle du JDK, et les références de méthodes
- Nommer un critère : CC-NOM.1 ; une seule chose à la fois : CC-MET.3

**Note**

`LAM.3` répond à la question gardée depuis `LAM.2` : votre interface
`Filtrage` avait déjà son équivalent dans le JDK. Remplacez-la, et constatez
que rien d'autre ne change.

La seconde partie fait le dernier dépouillement de la slide 3.4 : trois
critères écrits comme des méthodes statiques, chacune sur une ligne, puis
passés par référence. Le test vérifie chaque critère seul avant le rapport.
C'est ce que le nom permet, et que la lambda ne permet pas.

Les questions de fin ouvrent sur ce que le deck n'a pas montré : les autres
formes de référence de méthode. Cherchez-les.

---

## Section 4 - La suite

### 4.1 · Vous les retrouverez au module FX

**Source** nouvelle ; deck ITF, note de la slide 6.5

**Slide**

- Un bouton reçoit le comportement à déclencher au clic
- Le type cible est `EventHandler`, une interface fonctionnelle
- Le module FX dira le reste

```java
bouton.setOnAction(evenement -> afficherTotal());
```

**Note**

Le module ITF citait `EventHandler` parmi les interfaces fonctionnelles du
JDK. Vous le retrouverez à chaque bouton du module FX : sa méthode `handle`
reçoit l'événement, et la lambda dit quoi faire quand il survient.

Sans lambda, chaque bouton demanderait une classe, anonyme ou non. Avec
elle, l'interface graphique se lit ligne par ligne : tel bouton, tel effet.
C'est ce qui rend le code JavaFX lisible, et c'est à l'examen que vous en
aurez besoin : la question JavaFX demande d'écrire ces gestionnaires.

Une lambda est une valeur : un gestionnaire peut aussi se ranger dans un
champ, pour être ajouté puis retiré plus tard. Le module FX le montrera.

---

### 4.2 · Le fil rouge

**Source** `GameHub_enonces.docx`, G.15, G.17 et G.32

**Slide**

- **G.32** - Une fabrique sans switch *(fil rouge GameHub)*
- Relire G.17 : une stratégie est un comportement

**Note**

`G.32` reprend la fabrique de `G.15`. Son `switch` associe chaque type de jeu
à la façon d'en créer un. L'incrément range ces associations dans une `Map`,
dont chaque valeur est un `Supplier<Jeu>` : une lambda qui, à chaque appel,
fabrique un jeu neuf. Ajouter un jeu revient alors à ajouter une ligne au
catalogue.

L'incrément pose la question qui compte : pourquoi ranger la façon de
fabriquer un jeu, et pas le jeu lui-même ? Répondez-y avant d'écrire la
moindre ligne.

Relisez aussi `G.17`. Sa question vous demandait quel nom porte une interface
à une seule méthode, et ce que vous pourriez en faire au thème LAM. La
réponse est sous vos yeux : `StrategieNim` est fonctionnelle, et
`StrategieTimide` tiendrait en une lambda, `(pile, regles) -> 1`.

**Réserve** `G.32` est à écrire dans le projet GameHub, après `G.31` (GEN),
qui ne figure pas encore dans `GameHub_enonces.docx`. Le tableau
d'introduction du fascicule s'arrête à « G.29 et G.30 ».

