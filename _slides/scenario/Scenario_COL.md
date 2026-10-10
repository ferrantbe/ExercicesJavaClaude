# Scénario du module COL — Collections

*Sept sections, 37 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_col.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Une structure qui grandit | Une structure qui grandit |
| 2 | Une liste, des positions | Les listes |
| 3 | Un ensemble, sans doublons | Les ensembles |
| 4 | Une table, des clés | Les tables associatives |
| 5 | Passer un comportement | Passer un comportement |
| 6 | Des collections emboîtées | Collections emboîtées |
| 7 | Une file, deux bouts | Les files à deux bouts |

Les deux slides du fil rouge (8.1 et 8.2) n'ont pas d'intercalaire, comme la
slide 7.1 du deck ITF.

**Sources** : deck 05 (`05__Java_IN2_2026_-_Collections.pptx`, renommé
`d05.pptx`), `COL_enonces.docx` (version du 09/10/2026, avec `NouvelEnsemble`),
`Demo_COL.docx` et son code dans `demos/…/demo/col/`, `GameHub_enonces.docx`
(G.21 à G.27), `Memento_Clean_Code.docx` (CC-NOM.7, CC-OBJ.2, CC-ERR.2),
`Scenario_POO.md` (7.2 et 7.3, les classes enveloppes), `Scenario_ENU.md`
(section 7, le `equals` des records), `Scenario_ITF.md` (1.6, 4.4, 6.3 et 6.5).

**Place dans le cours** : neuvième deck, après PKG. Les interfaces, les
méthodes par défaut et les interfaces fonctionnelles sont connues. Les
exceptions (EXC), la généricité (GEN) et les lambdas (LAM) viennent après.

**Le partage avec la démonstration et le fascicule** :

- La démonstration, jouée en ouverture, montre le choix d'une collection sur
  sa promesse, la règle portée par la structure et le type déclaré comme
  promesse. Le deck ne la refait pas : il la nomme (1.2) et s'appuie dessus.
- Le fascicule porte le tableau des trois familles, l'ordre instable d'une
  `HashMap` (COL.4), la question `TreeMap` ou `HashMap` (COL.2), les deux
  décisions de conception de COL.7 et la lecture par `Scanner` (COL.3). Le
  deck ne les répète pas.
- Le deck porte ce que ni l'un ni l'autre ne pose : la notation `<E>`, les
  enveloppes, les opérations de chaque famille, le parcours, `Collection` et
  `Collections`, l'égalité des éléments, Hash et Tree, les vues d'une table,
  le passage d'un comportement, les types emboîtés et la `Deque` du fil rouge.

**Décisions appliquées** :

- Le deck pose les notions sans répondre aux questions des exercices. Restent
  ouvertes exprès : ce que retourne `put` (COL.2), d'où vient l'ordre des
  `String` (COL.3), l'exception d'une suppression pendant un parcours (COL.5),
  comment un `Set` répond sans parcourir (COL.6), la version de `inscrire`
  sans `computeIfAbsent` (COL.7).
- COL.5 prépare LAM sans le dire : aucune slide ni note ne mentionne les
  lambdas, ni le module LAM. La section 5 s'appuie sur ITF.
- COL.7 n'emploie pas de lambda : `computeIfAbsent` reçoit une classe nommée
  qui implémente `Function` (slide 6.3), comme `removeIf` reçoit un
  `Predicate` (slide 5.4).
- La généricité se lit ici et s'écrit en GEN : la slide 1.3 le dit.
- Les constantes de COL.1 et COL.6 servent d'exemple de lisibilité
  (slide 2.6, renvoi en 3.5). Règle CC-NOM.7.
- La `Deque` est enseignée (section 7) parce que le fil rouge l'emploie dès
  G.23, alors qu'aucun exercice du fascicule ne la pratique.
- Les exemples utilisent un domaine neutre, une bibliothèque, pour ne
  réutiliser ni les classes des exercices (`Fiche`, `Inscriptions`, `EstPair`)
  ni celles de la démonstration (`ListeDInvites`).
- Retirés de l'ancien deck : `Iterator` explicite, `Queue`, `Comparable` et
  `Comparator`, `SortedSet` et ses sous-ensembles, le diagramme des classes,
  la slide `Synchronized`, le tour de `java.util`, la liste des algorithmes de
  `Collections`, les liens vers la Javadoc de Java 8, l'exercice JEF et l'état
  de GameHub. Aucun exercice ne pratique ces notions, et les six sessions
  d'examen ne citent qu'un seul `ArrayList`.

**Défauts du deck d'origine corrigés** :

- « `Comparable` présente la méthode `int compare(T o2)` » et
  « `compareTo(o1, o2)` » (05/28) : la méthode de `Comparable` est
  `compareTo(T)`, celle de `Comparator` est `compare(T, T)`. Retiré, mais
  signalé au cas où la slide serait reprise.
- « `void sort(Collection<T> col)` » et « `shuffle(Collection<T> col)` »
  (05/38) : les deux méthodes reçoivent une `List`. Un `Set` n'a pas de
  positions, il ne se trie ni ne se mélange.
- La `Queue` qui insère « au début » (05/21) : elle insère à la fin et
  prélève au début. Et `remove()` retourne l'élément, pas un `boolean`.
- La `Deque` qui hérite « de `Collection` » (05/22) : elle hérite de `Queue`.
- Le `Set` qui assure l'unicité par `equals` seul (05/20) : un `HashSet`
  s'appuie aussi sur `hashCode`, et un `TreeSet` sur la comparaison.
- « Lors d'un foreach, impossible de modifier la liste » (05/13) : imprécis,
  et c'est la question de COL.5. Retiré.
- `copy` et `unmodifiableList` rangés parmi les « algorithmes de recherche »
  (05/37). Retiré avec le reste de la liste.

---

## Section 0 — Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module COL
- Collections

**Note**

Un tableau a une taille fixe, choisie à sa création. Le module TAB l'avait
annoncé : quand cette limite devient gênante, il faut une collection. Une
collection grandit toute seule, et chacune tient une promesse différente.

Ce module répond à deux questions. Comment ranger des objets dans une
structure qui grandit, et laquelle choisir. La seconde compte plus que la
première : la syntaxe s'apprend en une heure, le bon choix évite des dizaines
de lignes de vérifications.

Le thème est le plus fourni du recueil, avec sept exercices. Le fil rouge en
dépend aussi : le jeu de bataille de GameHub range ses cartes dans des
collections.

---

## Section 1 — Une structure qui grandit

### 1.1 · Une structure qui grandit

*(intercalaire)*

### 1.2 · Démonstration

**Source** `Demo_COL.docx`, 12 minutes, avant COL.1

**Slide**

- Démo : choisir une collection en se trompant d'abord

**Note**

La démonstration part d'une liste d'invités où le même nom figure deux fois.
Une première correction est proposée, puis une seconde, beaucoup plus courte,
qui ne tient qu'en un mot changé. Le même remède sert ensuite à un deuxième
problème.

Retenez la méthode plutôt que la syntaxe : on ne choisit pas une collection
par habitude, on la choisit sur la promesse qu'elle tient. Et quand la
structure porte une règle, personne n'a plus besoin d'y penser.

Le reste de ce module donne la syntaxe de ce qui vient d'être montré, et ce
que la démonstration n'a pas eu le temps de montrer.

---

### 1.3 · Ce qu'on écrit entre chevrons

**Source** d05/9, réécrite

**Slide**

- Le type entre chevrons est celui des éléments
- Le compilateur refuse tout autre type à l'entrée
- Et il connaît le type de ce qui sort

```java
List<String> titres = new ArrayList<>();

titres.add("Germinal");
titres.add(42);                  // refuse a la compilation

String premier = titres.get(0);  // aucune conversion
```

**Note**

`List<String>` se lit « une liste de `String` ». Le type entre chevrons est
un paramètre : la même interface `List` sert pour des chaînes, des nombres ou
des livres, et le compilateur vérifie à chaque ajout que l'élément est du bon
type. L'erreur apparaît donc à la compilation, pas à l'exécution.

À droite du `new`, les chevrons vides, appelés diamant, évitent de répéter le
type : le compilateur le déduit de la déclaration.

Vous apprenez ici à **lire** cette notation. L'écriture d'une classe qui
reçoit un type en paramètre, comme `List` le fait, sera détaillée au module
GEN.

---

### 1.4 · Des objets, pas des types primitifs

**Source** nouvelle ; rappel du module POO (7.2 et 7.3)

**Slide**

- Une collection ne contient que des objets
- On écrit donc `Integer` et non `int`
- La conversion reste automatique, dans les deux sens

```java
List<Integer> annees = new ArrayList<>();   // List<int> : refuse

annees.add(1885);                // int vers Integer
int premiere = annees.get(0);    // Integer vers int
```

**Note**

Le module POO a présenté les classes enveloppes, `Integer` pour `int`,
`Double` pour `double`, `Character` pour `char`, et la conversion automatique
entre les deux, appelée autoboxing. Elles prennent ici leur raison d'être :
une collection ne range que des objets, et `List<int>` ne compile pas.

En pratique, vous écrivez `Integer` entre les chevrons et vous oubliez la
différence. Deux exceptions à cette tranquillité. Comparer deux `Integer`
avec `==` compare deux objets, pas deux nombres : écrivez `equals`, ou
convertissez d'abord en `int`. Et un `Integer` peut valoir `null`, ce qu'un
`int` ne peut pas : la conversion échoue alors à l'exécution. La slide 4.3
montre où ce cas se présente.

---

### 1.5 · Déclarer par l'interface

**Source** d05/16, réécrite ; rappel du module ITF (4.4)

**Slide**

- À gauche, l'interface : ce que la variable promet
- À droite, la classe : comment la promesse est tenue
- Changer d'implémentation ne change qu'un mot

```java
List<String> titres = new ArrayList<>();
Set<String> auteurs = new HashSet<>();
Map<String, Integer> pages = new HashMap<>();
```

**Note**

`List`, `Set` et `Map` sont des interfaces. `ArrayList`, `HashSet` et
`HashMap` sont des classes qui les implémentent. On déclare la variable avec
l'interface, et on choisit la classe au moment du `new`.

C'est le principe du module ITF, à la slide 4.4 : le type le plus faible qui
suffit. Le reste du programme ne connaît que la promesse, et l'implémentation
peut changer sans qu'il le sache. La démonstration l'a fait deux fois.

Toutes ces interfaces et ces classes vivent dans le package `java.util`, qu'il
faut importer.

---

## Section 2 — Une liste, des positions

### 2.1 · Une liste, des positions

*(intercalaire)*

### 2.2 · Les opérations d'une liste

**Source** d05/19, condensée

**Slide**

- Une liste garde l'ordre d'ajout, et accepte les doublons
- Chaque élément a une position, qui commence à 0

```java
List<String> titres = new ArrayList<>();
titres.add("Germinal");
titres.add("Nana");
titres.add(0, "Candide");          // insere en tete

titres.size();                     // 3
titres.get(1);                     // "Germinal"
titres.contains("Nana");           // true
titres.remove("Nana");             // retire l'element
```

**Note**

Une liste est le remplaçant direct du tableau : des positions numérotées à
partir de 0, comme `t[0]`, mais sans taille fixe. La méthode `add` ajoute à
la fin, ou à la position demandée si on la donne.

La méthode `get` lève une `IndexOutOfBoundsException` pour une position qui
n'existe pas, comme un tableau. La méthode `set(i, valeur)` remplace
l'élément d'une position, et `indexOf` retourne la position d'un élément, ou
-1 s'il est absent.

Un piège, réservé aux listes d'`Integer`. La méthode `remove` existe en deux
versions : `remove(int)` retire la position, `remove(Object)` retire
l'élément. Sur une `List<Integer>`, `remove(2)` retire donc l'élément en
position 2, pas le nombre 2.

---

### 2.3 · Parcourir une collection

**Source** d05/11 à 13, remplacées par la boucle `for` améliorée

**Slide**

- La boucle `for` des tableaux parcourt toute collection
- Une collection s'affiche lisiblement, contrairement à un tableau

```java
for (String titre : titres) {
    System.out.println(titre);
}

System.out.println(titres);      // [Candide, Germinal]
```

**Note**

La boucle `for` améliorée, vue au module TAB pour les tableaux, accepte
n'importe quelle collection : une liste, un ensemble, et les vues d'une table
présentées à la section 4. Elle parcourt les éléments dans l'ordre que la
collection garantit, s'il y en a un.

Contrairement à un tableau, dont l'affichage produisait un code illisible au
module TAB, une collection s'affiche entre crochets, éléments séparés par des
virgules. C'est commode pour vérifier ce que contient une structure en cours
de mise au point.

---

### 2.4 · ArrayList ou LinkedList

**Source** d05/33, extrait

**Slide**

- Deux classes, la même interface `List`
- La classe `ArrayList` est le choix par défaut
- La classe `LinkedList` est aussi une file à deux bouts

**Note**

Les deux classes tiennent exactement la même promesse : celle de `List`. Un
programme qui déclare ses variables avec l'interface fonctionne avec l'une
comme avec l'autre, et le test de COL.5 le vérifie justement sur une
`LinkedList`.

Elles diffèrent par leur fonctionnement interne, donc par leur rapidité selon
l'usage. `ArrayList` range ses éléments dans un tableau qu'elle agrandit
elle-même, ce qui rend `get(i)` immédiat. `LinkedList` chaîne ses éléments
les uns aux autres, ce qui rend les ajouts et retraits aux deux bouts
immédiats, mais `get(i)` lent. Prenez `ArrayList` sauf raison précise.

---

### 2.5 · Collection et Collections

**Source** d05/26 et 36 à 38, condensées ; `sort(Collection)` corrigé

**Slide**

- L'interface `Collection` : ce que toutes les collections savent faire
- La classe `Collections` : des méthodes statiques qui travaillent dessus
- Ces méthodes reçoivent souvent une `List`

```java
Collections.sort(titres);             // trie la liste elle-meme
Collections.shuffle(titres);          // la melange
String premier = Collections.min(titres);
int fois = Collections.frequency(titres, "Nana");
```

**Note**

Les deux noms ne diffèrent que d'une lettre, et la confusion est classique.
`Collection` est l'interface mère de `List` et de `Set` : elle déclare `add`,
`remove`, `size`, `contains`. `Collections`, au pluriel, est une classe
utilitaire, comme `Math` : uniquement des méthodes statiques.

Les méthodes `sort` et `shuffle` reçoivent une `List`, parce qu'un ensemble
n'a pas de positions à réordonner. Elles modifient la liste reçue et ne
retournent rien. Le fil rouge emploie `shuffle` pour battre les cartes dès
G.21.

Les méthodes `min` et `max` retournent le plus petit et le plus grand
élément, `frequency` compte les apparitions d'une valeur. La Javadoc de
`Collections` en contient une vingtaine d'autres.

---

### 2.6 · Nommer ses bornes

**Source** nouvelle ; `Programme` de COL.1, constantes fournies dans le squelette

**Slide**

- Un nombre écrit en clair ne dit pas d'où il vient
- Une constante nommée sert au calcul et au message
- Le message ne peut plus mentir : CC-NOM.7

```java
private static final int MINIMUM = 0;
private static final int MAXIMUM = 1000;

System.out.printf("Nombres entre %d et %d%n", MINIMUM, MAXIMUM);
int tire = MINIMUM + hasard.nextInt(MAXIMUM - MINIMUM + 1);
```

**Note**

La première version de ce programme écrivait `hasard.nextInt(1001)`. Le
lecteur devait deviner d'où sortait 1001, et pourquoi pas 1000. La réponse
tient au module ENU : `nextInt(n)` retourne un entier de 0 inclus à `n`
exclu, et il faut donc compter les valeurs de l'intervalle.

Avec deux constantes, le calcul se lit au lieu de se deviner. Le gain le plus
utile est ailleurs : les mêmes constantes servent au message. Le jour où
l'intervalle change, le programme ne peut plus annoncer 0 à 1000 en tirant
jusqu'à 500.

Les squelettes de COL.1 et COL.6 vous donnent ces constantes : servez-vous en
partout. C'est la règle CC-NOM.7 du mémento Clean Code.

**Réserve** la dernière ligne de code est celle du tirage de COL.1, COL.5 et
COL.6. Elle n'est vérifiée par aucun test, puisqu'elle vit dans un
`Programme`. La retirer de la slide si l'on préfère la laisser chercher.

---

### 2.7 · Exercices

**Slide**

- **COL.1** - Deux façons d'être trié
- **COL.3** - Lire des noms et les trier
- Nommer : CC-NOM.7

**Note**

`COL.1` oppose deux manières d'obtenir des nombres triés : trier une liste,
ou les ranger dans une structure qui reste triée. La seconde a été montrée
pendant la démonstration. Lisez bien la consigne de la première méthode : la
liste reçue ne doit pas être modifiée, et la méthode de tri vue à la slide 2.5
modifie celle qu'elle reçoit.

`COL.3` remplit une liste à partir d'un `Scanner`. La classe fournie
`SourceDeTexte` vous le donne déjà ouvert : l'exercice porte sur les
collections, pas sur les fichiers. Remarquez que le test passe à votre
méthode un `Scanner` construit sur une simple chaîne.

Les deux exercices finissent sur une question d'ordre. Elles valent la peine
d'être posées à voix haute.

---

## Section 3 — Un ensemble, sans doublons

### 3.1 · Un ensemble, sans doublons

*(intercalaire)*

### 3.2 · Ce qu'un ensemble refuse

**Source** d05/20, réécrite

**Slide**

- Un ensemble ne garde qu'un exemplaire de chaque valeur
- La méthode `add` retourne `false` si la valeur y est déjà
- Pas de position : ni `get(i)`, ni `add(i, x)`

```java
Set<String> auteurs = new HashSet<>();

auteurs.add("Zola");             // true
auteurs.add("Zola");             // false : deja present
auteurs.size();                  // 1
auteurs.contains("Zola");        // true
```

**Note**

Un ensemble ne contient jamais deux fois la même valeur. Ajouter une valeur
présente ne lève aucune erreur : rien ne se passe, et `add` retourne `false`
pour le signaler. C'est ce que la démonstration a exploité.

Un ensemble n'a pas de positions. On l'interroge avec `contains`, on le
parcourt avec la boucle `for`, mais on ne demande jamais « le troisième
élément ». Ce n'est pas une limite : c'est ce qui lui permet d'autres
services, que COL.6 vous fera découvrir.

---

### 3.3 · Qui décide que deux éléments sont égaux

**Source** d05/20, corrigée ; rappel du module ENU (section 7)

**Slide**

- L'ensemble interroge `equals` et `hashCode`
- Un record les écrit pour vous
- Une classe ordinaire compare des références

```java
record Exemplaire(String titre, int numero) { }

Set<Exemplaire> rayon = new HashSet<>();
rayon.add(new Exemplaire("Nana", 1));
rayon.add(new Exemplaire("Nana", 1));

rayon.size();                    // 1
```

**Note**

Le module ENU l'avait annoncé en présentant les records : la question de
l'égalité reviendrait. La voici. Pour savoir si une valeur est déjà
présente, un `HashSet` appelle `hashCode` puis `equals` sur ses éléments.

`String` et `Integer` les définissent comme on s'y attend : deux chaînes de
mêmes lettres sont égales. Un record les définit aussi, en comparant ses
composants. Les deux exemplaires ci-dessus ne comptent donc qu'une fois.

Avec une classe ordinaire qui ne redéfinit rien, `equals` compare les
références : deux objets construits séparément sont différents, même avec les
mêmes valeurs, et l'ensemble en garde deux. Écrire `equals` et `hashCode` à
la main est possible, toujours ensemble, et IntelliJ les génère. Ce cours ne
vous le demandera pas : un record suffit dans tous les exercices.

La même règle vaut pour les clés d'une table, à la section 4.

---

### 3.4 · Hash ou Tree

**Source** nouvelle, à partir de d05/29 et 33

**Slide**

| | `HashSet`, `HashMap` | `TreeSet`, `TreeMap` |
|---|---|---|
| Ordre de parcours | aucun ordre garanti | trié en permanence |
| Les éléments doivent | définir `equals` et `hashCode` | savoir se comparer |
| Quand le choisir | par défaut | quand l'ordre compte |

**Note**

Les ensembles et les tables existent chacun en deux implémentations
principales, et la différence est la même des deux côtés.

Les classes `Hash` rangent les éléments selon leur code de hachage, ce qui
les rend très rapides mais ne garantit aucun ordre de parcours. Les classes
`Tree` les rangent dans un arbre trié : le parcours se fait toujours dans
l'ordre, au prix d'un peu de vitesse.

Savoir se comparer est le cas des chaînes, des nombres, des dates et des
énumérations, dont l'ordre est celui de déclaration, comme le montrait ENU.1.
Pour vos propres classes, il faudrait leur apprendre à se comparer, ce que
ce cours ne demande pas : un `TreeSet` de records sans ordre lève une
exception au premier ajout.

Une troisième implémentation existe, `LinkedHashSet` et `LinkedHashMap`, qui
garde l'ordre d'ajout. Vous ne la croiserez pas dans les exercices.

---

### 3.5 · Exercices

**Slide**

- **COL.6** - Un ensemble sans doublons
- Nommer : CC-NOM.7, encore

**Note**

`COL.6` fait constater les deux services d'un ensemble : il ne garde qu'un
exemplaire de chaque valeur, et il répond très vite à `contains`. La première
question demande pourquoi une liste ne le peut pas : cherchez avant de lire
la Javadoc.

Le squelette du `Programme` vous donne cette fois trois constantes : le
nombre de tirages et les deux bornes. Même règle qu'à la slide 2.6, et le
même calcul. Le résultat de la deuxième question surprend presque toujours.

---

## Section 4 — Une table, des clés

### 4.1 · Une table, des clés

*(intercalaire)*

### 4.2 · Ranger et retrouver par clé

**Source** d05/23, réécrite

**Slide**

- Une table associe une valeur à chaque clé
- Une clé n'y figure qu'une fois
- Deux types entre chevrons : celui des clés, celui des valeurs

```java
Map<String, Integer> pages = new HashMap<>();
pages.put("Germinal", 591);
pages.put("Candide", 160);

pages.get("Candide");            // 160
pages.containsKey("Nana");       // false
pages.size();                    // 2
```

**Note**

Une table associative, `Map` en Java, range des couples clé et valeur. On y
range avec `put`, on retrouve avec `get` en donnant la clé, et on ne parcourt
jamais pour chercher. Un dictionnaire, un annuaire, un stock par référence :
tout ce qui se consulte par un identifiant est une table.

Les clés sont uniques, comme les éléments d'un ensemble, et pour la même
raison : elles sont comparées par `equals` et `hashCode`, ou rangées dans un
arbre pour une `TreeMap`. Un second `put` avec la même clé remplace la
valeur. Les valeurs, elles, peuvent se répéter.

Remarquez qu'une table n'est pas une `Collection` : l'interface `Map` n'hérite
pas de `Collection`, et n'a pas de méthode `add`.

---

### 4.3 · Une clé absente

**Source** nouvelle

**Slide**

- Pour une clé absente, la méthode `get` retourne `null`
- La méthode `getOrDefault` retourne la valeur prévue

```java
Integer inconnu = pages.get("Nana");           // null
int nombre = pages.getOrDefault("Nana", 0);    // 0

int plantage = pages.get("Nana");    // NullPointerException
```

**Note**

Une clé inconnue n'est pas une erreur pour une table : `get` retourne
simplement `null`. C'est au programme de le prévoir.

La dernière ligne est le cas annoncé à la slide 1.4. La valeur `null` ne peut
pas être convertie en `int`, et la conversion automatique échoue à
l'exécution, par une `NullPointerException` qui ne désigne pas clairement la
cause.

La méthode `getOrDefault` évite le problème : elle retourne la valeur si la
clé existe, et la valeur par défaut fournie sinon. Elle sert souvent quand
une absence a un sens naturel, zéro pour un compte, une liste vide pour un
ensemble de résultats.

---

### 4.4 · Trois façons de parcourir une table

**Source** d05/24, réécrite

**Slide**

- Les clés, les valeurs, ou les couples
- Chacune est une collection, que la boucle `for` parcourt

```java
for (String titre : pages.keySet()) { ... }

for (int nombre : pages.values()) { ... }

for (Map.Entry<String, Integer> entree : pages.entrySet()) {
    System.out.println(entree.getKey() + " : " + entree.getValue());
}
```

**Note**

Une table ne se parcourt pas directement, mais elle offre trois vues. La
méthode `keySet` retourne l'ensemble des clés, `values` la collection des
valeurs, et `entrySet` l'ensemble des couples.

Chaque couple est un objet de type `Map.Entry`, avec ses deux accesseurs
`getKey` et `getValue`. Quand on a besoin des deux à la fois, c'est la vue à
préférer : parcourir les clés puis appeler `get` pour chacune refait une
recherche à chaque tour.

Ces vues suivent l'ordre de la table : aucun pour une `HashMap`, l'ordre des
clés pour une `TreeMap`.

---

### 4.5 · Exercices

**Slide**

- **COL.2** - Un annuaire
- **COL.4** - Compter les mots d'un texte

**Note**

`COL.2` range des fiches par nom, puis pose la question qui fait l'exercice :
peut-on obtenir les fiches dans l'ordre des noms ? Répondez d'abord sans
changer de table, puis en en changeant. La seconde réponse ne demande qu'une
ligne, et le test passe toujours.

`COL.4` est l'usage le plus courant d'une table : accumuler un décompte. La
méthode `getOrDefault` de la slide 4.3 y fait gagner trois lignes. La
question de l'ordre y revient, et cette fois elle se règle dans `rapport`.

Les deux exercices finissent sur une question de conception. Celle de
`COL.2` sur `chercher`, qui retourne `null`, trouvera sa réponse en `COL.7`.

---

## Section 5 — Passer un comportement

### 5.1 · Passer un comportement

*(intercalaire)*

### 5.2 · Des méthodes ajoutées aux interfaces

**Source** nouvelle ; rappel du module ITF (6.3)

**Slide**

- Java 8 a ajouté des méthodes par défaut à `Collection` et `Map`
- Toutes les classes existantes les ont reçues sans rien changer
- Parmi elles : `getOrDefault`, `removeIf`, `computeIfAbsent`

```java
// dans l'interface Map<K, V>
default V getOrDefault(Object cle, V parDefaut) { ... }
```

**Note**

Le module ITF l'avait annoncé : vous utiliseriez des méthodes par défaut sans
le savoir, dès ce module. Vous venez de le faire avec `getOrDefault`.

Le problème qu'elles ont résolu est celui de la slide 6.3 d'ITF, à l'échelle
du monde. Ajouter une méthode abstraite à `Map` aurait cassé toutes les
classes qui l'implémentent, y compris celles écrites hors du JDK. Une méthode
par défaut porte son propre code : chaque table l'a reçue d'office.

Deux de ces méthodes ont une particularité, qui fait le sujet de cette
section : elles reçoivent un comportement en paramètre.

**Réserve** la signature de `getOrDefault` dans le JDK nomme ses paramètres
`key` et `defaultValue`. Ils sont traduits ici, comme le reste du code des
slides.

---

### 5.3 · Une méthode qui reçoit un critère

**Source** d05/45, réécrite ; rappel du module ITF (6.5)

**Slide**

- La méthode `removeIf` retire ce que le critère accepte
- Le critère est un `Predicate`, une interface à une méthode

```java
// dans l'interface Collection<E>
default boolean removeIf(Predicate<? super E> filtre) { ... }

// dans l'interface Predicate<T>
boolean test(T valeur);
```

**Note**

La méthode `removeIf` parcourt la collection et appelle `test` sur chaque
élément. Ceux pour lesquels `test` retourne `true` sont retirés. Elle ignore
tout du critère : elle sait seulement qu'on lui a donné un objet capable de
répondre oui ou non.

`Predicate` est une interface fonctionnelle, au sens de la slide 6.5 d'ITF :
une seule méthode abstraite. Elle appartient au package `java.util.function`,
qui en contient d'autres, dont `Function`, à la section suivante.

Le `? super E` se lit « un critère qui sait tester des `E` ». Il autorise par
exemple un critère écrit pour des `Object` sur une liste de `String`. Son
écriture sera détaillée au module GEN.

---

### 5.4 · Écrire le critère dans une classe

**Source** nouvelle

**Slide**

- Une classe implémente `Predicate`
- Un objet de cette classe se passe à `removeIf`

```java
public class TitreLong implements Predicate<String> {

    private static final int LONGUEUR_MAX = 20;

    @Override
    public boolean test(String titre) {
        return titre.length() > LONGUEUR_MAX;
    }
}

titres.removeIf(new TitreLong());
```

**Note**

Vous connaissez déjà tout ce qui est écrit ici. Une classe qui implémente une
interface, une méthode redéfinie, et un objet passé en paramètre à une
méthode qui ne connaît que l'interface. C'est la slide 1.6 d'ITF, avec une
interface que le JDK a écrite à votre place.

La classe porte un nom qui dit ce qu'elle teste. On peut la réutiliser, et la
tester séparément. Le critère, lui, est une constante nommée : la règle de la
slide 2.6 vaut partout.

---

### 5.5 · Exercices

**Slide**

- **COL.5** - Filtrer avec un prédicat
- Nommer : CC-NOM.7, une troisième fois

**Note**

`COL.5` applique exactement la slide précédente, sur des nombres pairs. La
classe `EstPair` est testée seule, puis employée par deux méthodes, dont une
qui compte sans rien supprimer.

La première question vous fait essayer de supprimer les pairs autrement,
avec une boucle. Faites-le vraiment : ce que vous obtiendrez explique
pourquoi `removeIf` existe.

Le squelette du `Programme` vous donne de nouveau trois constantes.

---

## Section 6 — Des collections emboîtées

### 6.1 · Des collections emboîtées

*(intercalaire)*

### 6.2 · Lire un type emboîté

**Source** nouvelle, à partir de l'exemple de d05/23

**Slide**

- Une table dont chaque valeur est une liste
- Le type se lit de l'extérieur vers l'intérieur
- La liste d'un auteur n'existe pas avant qu'on la crée

```java
Map<String, List<String>> titresParAuteur = new HashMap<>();

List<String> deZola = titresParAuteur.get("Zola");    // null
```

**Note**

Une collection peut contenir des collections. `Map<String, List<String>>` se
lit en partant de l'extérieur : une table, dont les clés sont des chaînes,
et dont chaque valeur est une liste de chaînes. Ici, les titres de chaque
auteur.

La déclaration documente la structure à elle seule. Sans lire une ligne de
plus, on sait qu'un auteur a plusieurs titres, et qu'ils sont ordonnés.

La table, en revanche, ne crée rien d'elle-même. Tant qu'aucun titre de Zola
n'a été rangé, il n'existe aucune liste pour Zola, et `get` retourne `null`.
Ajouter un titre demande donc deux étapes : obtenir la liste, en la créant si
elle n'existe pas encore, puis y ajouter.

---

### 6.3 · Créer au premier usage

**Source** nouvelle

**Slide**

- La méthode `computeIfAbsent` retourne la valeur d'une clé
- Si elle manque, une `Function` la fabrique d'abord

```java
public class NouvelleListe implements Function<String, List<String>> {

    @Override
    public List<String> apply(String auteur) {
        return new ArrayList<>();
    }
}

titresParAuteur.computeIfAbsent("Zola", new NouvelleListe())
               .add("Germinal");
```

**Note**

La méthode `computeIfAbsent` fait les deux étapes de la slide précédente en
une. Si la clé a déjà une valeur, elle la retourne. Sinon, elle appelle la
méthode `apply` de l'objet reçu, range le résultat dans la table, et le
retourne. On ajoute ensuite le titre à la liste obtenue, qu'elle soit
ancienne ou neuve.

`Function<T, R>` est une interface fonctionnelle de `java.util.function`,
comme `Predicate` : sa méthode `apply` reçoit un `T` et retourne un `R`. Le
mécanisme est celui de la section 5. La méthode `removeIf` recevait un objet
qui sait tester, `computeIfAbsent` reçoit un objet qui sait fabriquer.

La méthode `apply` reçoit la clé, ici le nom de l'auteur. Elle n'en a pas
besoin pour créer une liste vide, mais l'interface le lui donne.

---

### 6.4 · Exercices

**Slide**

- **COL.7** - Une table de collections
- Retourner : CC-ERR.2 et CC-OBJ.2

**Note**

`COL.7` emboîte une table et des ensembles : à chaque étudiant, les cours
qu'il suit. Le fascicule explique les deux décisions de conception, un
ensemble plutôt qu'une liste, un ensemble vide plutôt que `null`. Comparez la
seconde avec le `chercher` de `COL.2`.

Vous y écrivez aussi une classe `NouvelEnsemble`, sur le modèle de la slide
précédente. La première question vous demande d'écrire la même méthode sans
`computeIfAbsent` : faites-le, pour mesurer ce qu'elle épargne.

La dernière question porte sur ce que `coursDe` livre à son appelant. Elle
renvoie au mémento Clean Code, et à la fin de la démonstration.

---

## Section 7 — Une file, deux bouts

### 7.1 · Une file, deux bouts

*(intercalaire)*

### 7.2 · Une file à deux bouts

**Source** d05/22, corrigée (une `Deque` hérite de `Queue`)

**Slide**

- On ajoute et on retire aux deux extrémités, jamais au milieu
- L'interface `Deque`, et sa classe `ArrayDeque`
- Une file d'attente, une pioche de cartes

```java
Deque<String> attente = new ArrayDeque<>();

attente.addLast("Zola");
attente.addLast("Hugo");
attente.addFirst("Sand");        // passe devant

System.out.println(attente);     // [Sand, Zola, Hugo]
```

**Note**

Une `Deque`, file à double entrée, se prononce « dèque ». C'est une liste
qu'on ne manipule que par ses deux bouts. Ce n'est pas une limite gênante :
beaucoup de problèmes n'ont besoin de rien d'autre, et la structure le dit
alors clairement.

Une file d'attente ajoute à la fin et sert au début. Une pioche de cartes
prend au-dessus et, au jeu de bataille, remet les cartes gagnées en dessous.
C'est le rôle qu'elle jouera dans le fil rouge.

`ArrayDeque` est l'implémentation à préférer. `LinkedList`, vue à la
slide 2.4, implémente aussi `Deque`, mais elle est plus lente pour cet usage.

---

### 7.3 · Prendre et remettre

**Source** d05/21 et 22, corrigées

**Slide**

- La méthode `pollFirst` retire et retourne le premier élément
- La méthode `peekFirst` le retourne sans le retirer
- Sur une file vide, les deux retournent `null`

```java
String suivant = attente.pollFirst();   // "Sand", retire
String ensuite = attente.peekFirst();   // "Zola", reste

while (!attente.isEmpty()) {
    System.out.println(attente.pollFirst());
}
```

**Note**

Les méthodes existent par paires symétriques : `addFirst` et `addLast`,
`pollFirst` et `pollLast`, `peekFirst` et `peekLast`.

Il existe une seconde famille, `removeFirst` et `getFirst`, qui font la même
chose mais lèvent une exception sur une file vide au lieu de retourner
`null`. Les deux familles se valent. Ce qui compte est de vérifier que la
file n'est pas vide avant de puiser, comme dans la boucle ci-dessus.

Le jeu de bataille tient tout entier dans cette boucle : tant qu'aucune
pioche n'est vide, chaque joueur prend sa première carte, et le gagnant remet
les deux à la fin de la sienne.

---

## Section 8 — Le fil rouge

### 8.1 · Le fil rouge

**Slide**

- **G.21** - Le deck en `List` *(fil rouge GameHub)*
- **G.22** - La carte et sa valeur *(fil rouge GameHub)*
- **G.23** - La version simplifiée *(fil rouge GameHub)*
- Le `Deck` d'`ENU.3` quitte son tableau pour une liste

**Note**

La quatrième partie de GameHub écrit un jeu de bataille, et elle s'appuie
sur ce module de bout en bout.

`G.21` reprend le `Deck` d'`ENU.3`, qui rangeait ses cartes dans un tableau,
et le passe à une `List`. Trois choses changent : le champ, le constructeur,
et le mélange, qui se réduit à `Collections.shuffle`. C'est la slide 2.5.

`G.22` donne une valeur à chaque carte. L'ordre de déclaration de
l'énumération `Valeur` décide de la force des cartes, ce que montrait
`ENU.1`. `G.23` écrit une première version du jeu, où les cartes égales sont
simplement jetées, et distribue le paquet dans deux `Deque`.

---

### 8.2 · Le fil rouge, suite

**Slide**

- **G.24** - La méthode jouer, mise en place *(fil rouge GameHub)*
- **G.25** - La méthode jouer, la boucle *(fil rouge GameHub)*
- **G.26** - La méthode jouer, le résultat *(fil rouge GameHub)*
- **G.27** - La vraie bataille *(fil rouge GameHub)*

**Note**

Les trois incréments suivants écrivent la méthode `jouer`, en trois temps.
La mise en place crée les deux pioches, des `ArrayDeque`, et une liste pour
les cartes retirées. La boucle est celle de la slide 7.3 : `pollFirst` pour
piocher, `addLast` pour remettre. Le résultat se lit dans l'état des deux
pioches à la sortie.

`G.27` traite enfin la bataille elle-même, quand deux cartes sont égales.
Les cartes déposées s'accumulent dans une liste, le pot, que le gagnant
ramasse.

Vous aurez employé dans ce seul jeu une liste, deux files à deux bouts, une
méthode de `Collections` et une énumération ordonnée. C'est un bon test de ce
que vous avez retenu.

**Réserve** `G.24` demande de « vérifier que les deux `Joueur` ne sont pas
`null` », alors que les exceptions ne viennent qu'au module EXC. L'énoncé ne
dit pas quoi faire si l'un l'est. À clarifier dans le fascicule GameHub avant
la séance.
