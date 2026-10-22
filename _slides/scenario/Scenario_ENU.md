# Scénario du module ENU — Énumérations et records

Sept sections, 37 slides (38 avec le sommaire posé par le finaliseur).

## Fabrication

Sections à déclarer dans `module_enu.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Des valeurs qui se comptent | Des valeurs qui se comptent |
| 2 | Déclarer une énumération | Déclarer une énumération |
| 3 | L'ordre porte l'information | L'ordre porte l'information |
| 4 | Comparer et aiguiller | Comparer et aiguiller |
| 5 | Une enum est une classe | Une enum est une classe |
| 6 | Un détour par deux outils | `Random` et `StringJoiner` |
| 7 | Les records | Les records |

Sources : deck 02 slides 44 à 62, deck 03 slide 11, `ENU_enonces.docx`, `Demo_ENU.docx`.

Défauts du deck d'origine corrigés ici : `getMessage` déclaré `double` alors qu'il
retourne un `String` (s49), tiret demi-cadratin dans `1 – rate` (s49), « vous l'avez vu
dans le slide suivant » (s53), mélange non équitable (s50, corrigé en Fisher-Yates
conformément au fascicule).

---

### 0.1 · Page de titre

**Slide**

- Module ENU
- Énumérations et records

**Note**

Ce module ajoute deux formes de type au vocabulaire déjà connu. L'énumération sert
quand les valeurs possibles se comptent sur les doigts : une couleur de feu, un jour de
la semaine, un résultat de partie. Le record sert quand une donnée n'est qu'une donnée,
sans comportement propre et sans état qui change.

Les deux ont en commun de faire dire au compilateur ce qu'un commentaire disait jusqu'ici.
Une énumération interdit la quatrième couleur ; un record interdit la modification après
construction. Dans les deux cas, l'erreur devient impossible à écrire plutôt que pénible
à retrouver.

## Section 1 — Des valeurs qui se comptent

### 1.1 · Des valeurs qui se comptent

**Slide**

*(intercalaire)*

**Note**

La première section ne parle pas encore de syntaxe. Elle pose le problème que
l'énumération résout, et montre comment on s'en tirait avant : avec des constantes
entières, et une discipline qui ne tient jamais.

### 1.2 · Trois couleurs, pas une de plus

**Source** — deck 02, slide 46, retourné : le problème avant la solution

**Slide**

- Un feu de signalisation a exactement trois couleurs
- Avec des constantes `int`, rien n'empêche d'en demander une quatrième
- Le compilateur ne voit rien, et l'erreur attend l'exécution

```java
static final int VERT   = 0;
static final int ORANGE = 1;
static final int ROUGE  = 2;

feu.setCouleur(7);   // compile sans broncher
```

**Note**

Représenter une couleur de feu par un entier fonctionne, au sens où le programme tourne.
Trois constantes bien nommées valent mieux que les nombres 0, 1 et 2 écrits en clair, et
c'est déjà un progrès par rapport à ce que l'on voit souvent.

Le problème est ailleurs. Le type de la variable est `int`, et un `int` accepte toutes
les valeurs d'un `int`. La ligne qui demande la couleur 7 compile, se livre, et casse un
jour chez un utilisateur. Le même défaut existe avec un `String` : rien ne distingue
« VERT » de « vert », de « verd » ou d'un espace de trop.

L'énumération déplace cette vérification : ce qui était une convention à respecter devient
une règle que le compilateur applique. Voir CC-NOM.7 sur les nombres magiques et CC-NOM.1
sur les noms qui communiquent l'intention.

Le code complet, à exécuter : demos, classe `demo.enu.slides.TroisCouleursPasUneDePlus`.

### 1.3 · Il existe d'autres types que la classe

**Source** — deck 02, slides 44 et 45, réduits à ce qui concerne ce module

**Slide**

| Type | Ce qu'il apporte | Où |
|---|---|---|
| `enum` | une liste de valeurs fermée | ce module |
| `record` | une donnée immuable, en une ligne | ce module |
| `abstract class` | un comportement partagé, incomplet | module ABS |
| `interface` | un contrat sans implémentation | module ITF |
| classe anonyme | une classe écrite sur place, sans nom | module LAM |

**Note**

Jusqu'ici, écrire du Java voulait dire écrire des classes. Il existe d'autres formes de
type, et cinq d'entre elles seront vues cette année.

Deux le sont dans ce module : l'énumération et le record. Les trois autres arrivent plus
tard, et chacune répond à un besoin différent. Il n'y a rien à retenir de ce tableau pour
l'instant, sinon que le paysage est plus large que les classes, et qu'il se découvrira
morceau par morceau.

## Section 2 — Déclarer une énumération

### 2.1 · Déclarer une énumération

**Slide**

*(intercalaire)*

**Note**

Cette section donne la syntaxe et les cinq méthodes que toute énumération possède, sans
que personne les écrive. Elle se termine sur le point qui portera toute la section
suivante : l'ordre de déclaration n'est pas décoratif.

Le code complet, à exécuter : demos, classe `demo.enu.slides.DeclarerUneEnumeration`.

### 2.2 · Déclarer une énumération

**Source** — deck 02, slide 46

**Slide**

- Le mot-clé `enum` remplace `class`
- Les constantes s'écrivent en majuscules, séparées par des virgules
- Une variable de ce type n'accepte rien d'autre que ces valeurs

```java
public enum CouleurDeFeu { VERT, ORANGE, ROUGE }

CouleurDeFeu couleur = CouleurDeFeu.VERT;
couleur = CouleurDeFeu.ROUGE;   // d'accord
couleur = 7;                    // refus a la compilation
```

**Note**

La déclaration tient sur une ligne. Le mot-clé `enum` prend la place de `class`, et la
liste des valeurs possibles s'écrit entre accolades. Ces valeurs sont des constantes, et
la convention veut qu'elles soient en majuscules, comme toute constante en Java.

Une variable déclarée `CouleurDeFeu` ne peut recevoir qu'une des trois valeurs, ou `null`.
La dernière ligne de l'exemple ne compile pas, et c'est exactement le service rendu :
l'erreur se voit au moment où elle s'écrit, pas six mois plus tard.

Une énumération est un type comme un autre. Elle sert de type de champ, de type de
paramètre et de type de retour, et le module en verra les trois usages.

Le code complet, à exécuter : demos, classe `demo.enu.slides.DeclarerUneEnumeration`.

### 2.3 · Ce que toute énumération sait faire

**Source** — deck 02, slide 46, complété : `name` et `valueOf` manquaient

**Slide**

| Appel | Ce qu'il retourne | Exemple |
|---|---|---|
| `name()` | le nom de la constante | `"ROUGE"` |
| `ordinal()` | sa position, à partir de 0 | `2` |
| `values()` | un tableau de toutes les constantes | `[VERT, ORANGE, ROUGE]` |
| `valueOf("VERT")` | la constante qui porte ce nom | `VERT` |
| `compareTo(autre)` | l'écart entre les deux positions | `-2` |

**Note**

Ces cinq membres existent sur toute énumération, sans que rien soit écrit : ils viennent
de la classe `java.lang.Enum`, dont toute énumération hérite.

La méthode `name` retourne le nom écrit dans la déclaration, et `toString` fait la même
chose tant qu'on ne la redéfinit pas. La méthode `ordinal` retourne la position, comptée
à partir de zéro. La méthode `values` est statique : elle s'appelle sur le type, pas sur
une valeur, et retourne un tableau dans l'ordre de déclaration. La méthode `valueOf` fait
le chemin inverse, du texte vers la constante, et lève une exception si le nom est inconnu.

La méthode `compareTo` compare deux positions. Le résultat est négatif si la première
constante est déclarée avant la seconde. C'est ce qui rend une énumération triable sans
effort, et c'est aussi ce qui rend l'ordre de déclaration plus lourd de conséquences qu'il
n'en a l'air.

### 2.4 · L'ordre de déclaration des valeurs compte

**Slide**

- Les méthodes `values`, `ordinal` et `compareTo` suivent l'ordre d'écriture
- Cet ordre est celui du domaine, pas celui de l'alphabet
- Insérer une constante au milieu décale toutes les suivantes

```java
public enum CouleurDeFeu { VERT, ORANGE, ROUGE }

CouleurDeFeu.VERT.ordinal();      // 0
CouleurDeFeu.ROUGE.ordinal();     // 2
CouleurDeFeu.values().length;     // 3
```

**Note**

L'ordre dans lequel les constantes sont écrites devient une donnée du programme. Les trois
appels de l'exemple le montrent, et la section suivante en fera un outil de conception.

Deux conséquences pratiques. D'abord, cet ordre se choisit : dans un feu de signalisation,
c'est celui du cycle, et pas l'ordre alphabétique. Ensuite, il ne se modifie pas à la
légère. Insérer une valeur au milieu change le résultat de `ordinal` pour toutes celles
qui suivent, ce qui est sans effet si le code ne s'appuie que sur les noms, et lourd de
conséquences s'il s'appuie sur les positions.

Il faut aussi éviter d'enregistrer un `ordinal` dans un fichier ou une base de données.
Le nom, retourné par `name`, est stable ; la position ne l'est pas. Cela ressortira au
module FIC.

## Section 3 — L'ordre porte l'information

Le code complet, à exécuter : demos, classe `demo.enu.slides.DeclarerUneEnumeration`.

### 3.1 · L'ordre porte l'information

**Slide**

*(intercalaire)*

**Note**

Le cœur du module, et la raison pour laquelle ENU.1 ne se réduit pas à une question de
syntaxe. Une énumération ne remplace pas seulement des constantes : elle peut contenir une
partie de la logique, et faire disparaître des conditions.

### 3.2 · Démonstration

**Slide**

- Démo : le cycle sans conditions

**Note**

La démonstration part d'un lecteur de musique dont le bouton enchaîne trois modes de
lecture, avec trois conditions. Un quatrième mode est ajouté à l'énumération, et le lecteur
ne l'atteint jamais : le compilateur n'a rien dit, et le comportement est faux.

La méthode est ensuite réécrite en deux lignes, à partir de `values` et de `ordinal`. Le
cinquième mode ajouté ensuite fonctionne sans que rien d'autre soit touché.

### 3.3 · Pour passer à la valeur suivante

**Slide**

- La méthode `values` retourne le cycle des valeurs de l'enum
- Le reste de la division ramène la dernière valeur à la première
- Les parenthèses ne sont pas facultatives : l'opération `%` a priorité sur `+`

```java
CouleurDeFeu[] cycle = CouleurDeFeu.values();

int suivante = (couleur.ordinal() + 1) % cycle.length;
couleur = cycle[suivante];
```

**Note**

Deux lignes remplacent la cascade de conditions. Le tableau retourné par `values` contient
les constantes dans l'ordre de déclaration, donc dans l'ordre du cycle. Ajouter un à la
position courante donne la suivante, et le reste de la division par la longueur du tableau
ramène à zéro quand on dépasse la fin.

Le nombre de couleurs n'apparaît nulle part. C'est `cycle.length` qui le donne, et il suit
la déclaration quoi qu'il arrive.

Les parenthèses autour de l'addition sont indispensables. Sans elles, le modulo s'applique
d'abord au 1, ce qui donne toujours la position courante augmentée de zéro : le code
compile, ne produit aucun avertissement, et le feu reste bloqué sur sa première couleur.
Ce genre de faute est le plus coûteux qui soit, parce que rien ne le signale. Un test
l'attrape immédiatement.

Le code complet, à exécuter : demos, classe `demo.enu.slides.DeclarerUneEnumeration`.

### 3.4 · Ce que ce détour fait gagner

**Slide**

- Une quatrième couleur s'ajoute sans qu'une ligne change ailleurs
- Il n'y a plus de condition à lire, donc plus d'endroit où se tromper
- En échange, l'ordre devient une information qu'il faut documenter

**Note**

Le gain n'est pas la longueur du code. Deux lignes au lieu de six, ce serait une économie
sans intérêt. Le gain est que ce qui change souvent — la liste des valeurs — ne se change
plus qu'à un seul endroit. C'est le critère de CC-CLS.4 : une conception se juge à ce
qu'elle exige quand le besoin bouge.

La contrepartie est réelle et il faut la nommer. En s'appuyant sur l'ordre, le code devient
dépendant d'une information qui ne se lit pas dans la méthode, mais dans la déclaration de
l'énumération. Quelqu'un qui réordonne les constantes par souci de propreté casse le cycle
sans le savoir. La Javadoc de l'énumération doit donc dire que l'ordre est celui du cycle
et qu'il ne se modifie pas. Voir CC-COM.3 : un commentaire utile dit ce que le code ne
peut pas dire.

Voir aussi CC-MET.2 sur les méthodes courtes : `changeDeCouleur` tient désormais en deux
lignes, et se lit d'un coup d'œil.

### 3.5 · Exercices

**Slide**

- **ENU.1** - Un feu de signalisation

**Note**

Le premier exercice du module demande explicitement les deux versions : celle avec des
conditions, et celle sans. La comparaison ne vaut que si les deux sont écrites.

L'énoncé ajoute une question de conception qui n'a rien à voir avec les énumérations : le
constructeur doit placer le feu dans le même état que `desactive`, et il vaut mieux appeler
la méthode que recopier ses instructions.

## Section 4 — Comparer et aiguiller

### 4.1 · Comparer et aiguiller

**Slide**

*(intercalaire)*

**Note**

Cette section installe le `switch`, dans ses trois formes. Il resservira tout au long de
l'année, et une énumération est le meilleur endroit pour l'apprendre, parce que c'est là
que le compilateur peut vérifier qu'aucun cas n'a été oublié.

### 4.2 · Comparer deux valeurs

**Slide**

- Chaque constante n'existe qu'en un seul exemplaire
- L'opérateur `==` suffit donc, et il est sûr
- La méthode `equals` fonctionne aussi, sans rien apporter de plus

```java
if (couleur == CouleurDeFeu.ROUGE) {
    System.out.println("Stop");
}
```

**Note**

Sur les énumérations, `==` fait ce qu'on attend. La raison tient à la nature des
constantes : chacune est créée une seule fois, au chargement de la classe, et toute
variable qui vaut `ROUGE` désigne exactement le même objet. Comparer les références revient
donc à comparer les valeurs.

C'est une exception notable. Sur les `String` et sur les objets en général, `==` compare
les références et donne des surprises ; sur les énumérations, il est à la fois correct et
préférable, parce qu'il ne lève pas d'exception si la variable vaut `null`.

Le code complet, à exécuter : demos, classe `demo.enu.slides.DeclarerUneEnumeration`.

### 4.3 · Aiguiller : la forme classique

**Source** — deck 02, slide 51

**Slide**

- Les étiquettes s'écrivent sans le nom de l'énumération : le `switch` est fait sur jour de type `enum`, donc les valeurs sont connues
- Sans `break`, l'exécution continue sur le cas suivant
- L'oubli du `break` est la faute la plus fréquente de cette forme

```java
switch (jour) {
    case SAMEDI:
    case DIMANCHE:
        System.out.println("Repos");
        break;
    default:
        System.out.println("Travail");
}
```

**Note**

C'est la forme héritée du C, et celle que vous rencontrerez dans le code existant. Le
`switch` évalue une expression, puis saute à l'étiquette correspondante et exécute tout ce
qui suit jusqu'au premier `break`.

Sur une énumération, les étiquettes ne se préfixent pas du nom du type : on écrit `SAMEDI`
et non `Jour.SAMEDI`, parce que le type est déjà connu par l'expression du `switch`.

L'enchaînement d'un cas sur le suivant est parfois voulu, comme ici pour traiter le samedi
et le dimanche ensemble. Il est bien plus souvent accidentel, et c'est pourquoi Java a
fini par proposer autre chose.

Le code complet, à exécuter : demos, classe `demo.enu.slides.Aiguiller`.

### 4.4 · Aiguiller : la forme à flèches

**Slide**

- Si on utilise la flèche au lieu des deux-points, le `break` n'est plus nécessaire
- On peut regrouper plusieurs étiquettes en utilisant une virgule
- Un seul cas s'exécute, jamais celui qui suit

```java
switch (jour) {
    case SAMEDI, DIMANCHE -> System.out.println("Repos");
    default               -> System.out.println("Travail");
}
```

**Note**

Cette forme est arrivée avec Java 14 et c'est celle à écrire aujourd'hui. Elle dit la même
chose que la précédente, en supprimant la cause d'erreur : il n'y a plus d'enchaînement,
donc plus de `break` à oublier.

Quand une branche demande plusieurs instructions, on ouvre des accolades après la flèche.
Les étiquettes qui partagent un traitement se regroupent sur une même ligne, séparées par
des virgules.

Le code complet, à exécuter : demos, classe `demo.enu.slides.Aiguiller`.

### 4.5 · Un `switch` qui retourne une valeur

**Slide**

- Le `switch` peut aussi être utilisé comme une expression, il se termine alors par un point-virgule
- Chaque branche fournit la valeur (elle ne l'affiche pas)
- Si une branche nécessite plusieurs lignes, le mot-clé `yield` permet de retourner la valeur

```java
String message = switch (jour) {
    case SAMEDI, DIMANCHE -> "Repos";
    case VENDREDI         -> "Presque";
    default               -> "Travail";
};
```

**Note**

Un `switch` peut produire une valeur au lieu d'exécuter des instructions. Il s'utilise
alors comme n'importe quelle expression, à droite d'une affectation ou dans un `return`.
Le point-virgule après l'accolade fermante est facile à oublier, et le compilateur le
signale clairement.

Cette forme mérite d'être préférée dès qu'il s'agit de choisir une valeur. La variable
`message` reçoit sa valeur une fois pour toutes, ce qui élimine le cas où une branche
oublie de l'affecter.

Quand une branche a besoin de plusieurs lignes, elle s'écrit entre accolades et fournit sa
valeur avec `yield`. C'est le seul endroit du langage où ce mot-clé apparaît.

Le code complet, à exécuter : demos, classe `demo.enu.slides.Aiguiller`.

### 4.6 · Tous les cas, sans oubli

**Slide**

- Sur une énumération, le compilateur connaît la liste complète des cas
- Une expression `switch` qui les couvre tous se passe de `default`
- Ajouter une constante fait alors échouer la compilation, et c'est le but

```java
String consigne = switch (couleur) {
    case VERT   -> "Passez";
    case ORANGE -> "Ralentissez";
    case ROUGE  -> "Arretez";
};
```

**Note**

Voici ce qu'une énumération apporte au `switch`, et que rien d'autre n'apporte : la liste
des valeurs possibles est connue à la compilation. Le compilateur peut donc vérifier que
toutes sont traitées.

L'exemple n'a pas de `default`, et il compile, parce que les trois couleurs y sont. Le jour
où une quatrième couleur s'ajoute à l'énumération, ce même code cesse de compiler et le
message désigne l'endroit exact à compléter.

C'est l'inverse exact de la démonstration du lecteur de musique, où l'ajout d'un mode
passait inaperçu. Écrire un `default` qui ne sert qu'à faire taire le compilateur revient
donc à renoncer à cette vérification : mieux vaut s'en passer quand tous les cas sont
couverts.

Le code complet, à exécuter : demos, classe `demo.enu.slides.Aiguiller`.

### 4.7 · Exercices

**Slide**

- **ENU.2** - Une température, deux unités
- Nommer : CC-MET.4

**Note**

L'exercice utilise l'énumération comme paramètre de méthode, ce qui est son usage le plus
courant en pratique. La vraie question qu'il pose est ailleurs : combien de valeurs l'objet
doit-il stocker ? En garder deux, une par unité, c'est accepter qu'elles se contredisent
un jour.

La conversion se fait donc au moment où on la demande, à partir d'une seule valeur stockée.
Le choix de l'unité de référence est une décision interne, que l'utilisateur de la classe
n'a pas à connaître.

## Section 5 — Une enum est une classe

### 5.1 · Une enum est une classe

**Slide**

*(intercalaire)*

**Note**

Jusqu'ici, l'énumération n'était qu'une liste de noms. Cette section montre qu'elle peut
porter des données et des méthodes, ce qui déplace la question de la conception : où
placer l'information ?

### 5.2 · Une enum peut contenir des données

**Source** — deck 02, slide 49, corrigé

**Slide**

- Chaque constante passe ses arguments au constructeur
- Les champs et les méthodes s'écrivent comme dans toute classe
- La constante répond alors elle-même aux questions qui la concernent

```java
public enum Discount {

    BASIC(0.05), FIDELITY(0.075), SPECIAL(0.10);

    private final double taux;

    Discount(double taux) {
        this.taux = taux;
    }

    public double appliquer(double prix) {
        return prix * (1 - taux);
    }
}
```

**Note**

Une énumération est une classe, et le reste jusqu'au bout : elle accepte des champs, un
constructeur et des méthodes. Chaque constante devient alors un objet construit avec ses
propres arguments, une fois pour toutes.

L'intérêt se voit à l'usage. Le taux d'une remise appartient à la remise, et non à la
classe qui calcule un prix. Écrire `SPECIAL.appliquer(prix)` place le calcul là où vit
l'information, et évite qu'une table de correspondance traîne ailleurs dans le programme.

C'est ce mécanisme qu'ENU.3 met en pratique : le libellé français d'une couleur de carte est
porté par la couleur elle-même, et la carte se contente de le demander.

Le code complet, à exécuter : demos, classe `demo.enu.slides.UneEnumPortantDesDonnees`.

### 5.3 · Trois détails de syntaxe

**Slide**

- La liste des constantes se termine par un point-virgule dès qu'il y a autre chose ensuite
- Le constructeur est implicitement privé : un `new` sur une énumération est impossible
- Les champs sont déclarés `final`, parce qu'une constante ne change pas

**Note**

Le point-virgule après la dernière constante est la faute de frappe la plus fréquente sur
ce sujet. Il ne sert à rien tant que l'énumération ne contient qu'une liste de noms ; il
devient obligatoire dès qu'un champ, un constructeur ou une méthode suit.

Le constructeur peut s'écrire sans modificateur, ou avec `private` ; il n'accepte rien
d'autre. La raison est que les seules instances possibles sont celles de la liste, créées
par la machine virtuelle au chargement de la classe. C'est aussi ce qui garantit qu'il
n'existe qu'un seul objet par constante, et donc que `==` fonctionne.

Les champs sont déclarés `final` par principe : une constante dont l'état change n'est plus
une constante. Rien ne l'impose techniquement, mais s'en écarter n'a pas de bonne raison.

### 5.4 · Toutes les combinaisons

**Slide**

- Deux boucles `for-each` imbriquées parcourent toutes les paires
- Le nombre de cartes n'apparaît nulle part dans le calcul
- Ajouter une couleur ou une valeur suffit à changer la taille du jeu

```java
Card[] cartes = new Card[Color.values().length
                       * Value.values().length];
int i = 0;
for (Color couleur : Color.values()) {
    for (Value valeur : Value.values()) {
        cartes[i] = new Card(couleur, valeur);
        i++;
    }
}
```

**Note**

Construire un jeu de cartes complet, c'est produire toutes les combinaisons de deux
énumérations. Deux boucles imbriquées sur `values` y suffisent.

Le nombre 52 n'apparaît pas. Il n'a pas à apparaître : il est le produit des tailles des
deux énumérations, et se recalcule tout seul. Un jeu de tarot s'obtiendrait en ajoutant une
couleur, sans toucher à cette boucle. C'est le même raisonnement qu'à la section 3, appliqué
à deux dimensions.

## Section 6 — Un détour par deux outils

### 6.1 · Un détour par deux outils

**Slide**

*(intercalaire)*

**Note**

Deux classes de la bibliothèque standard, sans rapport avec les énumérations, mais dont
l'exercice suivant a besoin. Le détour est court et assumé.

### 6.2 · Tirer un nombre au hasard

**Source** — deck 02, slide 50, sorti du corps de l'énoncé

**Slide**

- La classe `java.util.Random` produit des nombres au hasard
- La méthode `nextInt(n)` retourne un entier de 0 inclus à `n` exclu
- Un seul objet `Random` suffit pour tout un programme

```java
Random hasard = new Random();

int de = hasard.nextInt(6) + 1;            // 1 a 6
int rang = hasard.nextInt(cartes.length);  // 0 a cartes.length - 1
```

**Note**

La borne passée à `nextInt` est exclue, ce qui tombe bien : c'est exactement l'intervalle
des indices d'un tableau de cette taille. Pour simuler un dé, il faut donc ajouter un au
résultat.

Créer un objet `Random` à chaque tirage est inutile. Un seul champ, construit une
fois, règle la question.

Pour mélanger un tableau, l'exercice demande de parcourir les cartes de la fin vers le
début et d'échanger chacune avec une carte tirée parmi celles qui la précèdent, c'est-à-dire
`hasard.nextInt(i + 1)`. Tirer dans tout le paquet mélangerait aussi, mais pas équitablement :
certaines dispositions sortiraient plus souvent que d'autres. Ce mélange porte un nom,
Fisher-Yates, et la question est laissée ouverte dans le fascicule.

Le code complet, à exécuter : demos, classe `demo.enu.slides.HasardEtStringJoiner`.

### 6.3 · Assembler avec un séparateur

**Slide**

- La classe `StringJoiner` place le séparateur entre les éléments
- Il n'y a plus de test sur l'indice, donc plus d'endroit où se tromper
- Le constructeur accepte aussi un préfixe et un suffixe

```java
StringJoiner texte = new StringJoiner(", ");
for (Card carte : cartes) {
    texte.add(carte.toString());
}
System.out.println(texte);
```

**Note**

Afficher une liste séparée par des virgules est un exercice classique, et le piège est
toujours le même : la virgule en trop à la fin. On s'en tire d'ordinaire par un test sur
l'indice, qui encombre la boucle sans rien apporter au sens.

La classe `StringJoiner` fait exactement ce travail : on lui donne le séparateur, on ajoute
les éléments, et elle les place entre eux. Le gain n'est pas la longueur du code, c'est
qu'il n'y a plus de condition à lire.

Le constructeur accepte deux arguments de plus, un préfixe et un suffixe, ce qui permet
d'encadrer la liste de crochets ou de parenthèses sans effort supplémentaire.

Le code complet, à exécuter : demos, classe `demo.enu.slides.HasardEtStringJoiner`.

### 6.4 · Exercices

**Slide**

- **ENU.3** - Un jeu de cartes
- Documenter : CC-COM.3

**Note**

L'exercice réunit tout ce que la section 5 a montré : deux énumérations qui portent un
libellé, un constructeur, une méthode, et la construction du jeu par double boucle.

L'affichage doit tenir sur une ligne, cartes séparées par des virgules, et non une carte
par ligne. C'est là que `StringJoiner` sert.

## Section 7 — Les records

### 7.1 · Les records

**Slide**

*(intercalaire)*

**Note**

Changement de sujet. Le record ne remplace pas l'énumération, il répond à un autre besoin :
transporter une donnée, sans comportement et sans état qui change.

### 7.2 · Une donnée, et rien d'autre

**Source** — deck 02, slides 52 et 53

**Slide**

- Le mot-clé `record` déclare une classe faite pour contenir des données
- Les composants se déclarent entre parenthèses, comme des paramètres
- Le corps du record reste souvent vide

```java
public record Point(int x, int y) { }

Point origine = new Point(0, 0);
System.out.println(origine.x());   // 0
```

**Note**

Le record est arrivé avec Java 14, et fait partie du langage depuis Java 16. Sa déclaration
tient sur une ligne : le nom, puis la liste de ce qu'il contient, appelée ses composants.

Le corps entre accolades reste vide dans le cas le plus simple, et il est fréquent qu'il le
reste. Tout ce dont la classe a besoin pour fonctionner est déduit de cette seule ligne,
comme la slide suivante le détaille.

L'accesseur porte le nom du composant, sans préfixe : on écrit `origine.x()` et non
`origine.getX()`. C'est déroutant les premières fois, et c'est la convention.

Le code complet, à exécuter : demos, classe `demo.enu.slides.LesRecords`.

### 7.3 · Ce que le compilateur écrit

**Source** — deck 02, slide 53

**Slide**

- Le constructeur, avec les composants dans l'ordre déclaré
- Un accesseur par composant, nommé `x()` et non `getX()`
- Les méthodes `toString`, `equals` et `hashCode`

```java
Point a = new Point(1, 2);
Point b = new Point(1, 2);

a.toString();   // "Point[x=1, y=2]"
a.equals(b);    // true
```

**Note**

Une ligne de déclaration produit ce qui demanderait une trentaine de lignes écrites à la
main : deux champs, un constructeur, deux accesseurs, un `toString`, un `equals` et un
`hashCode`.

La méthode `equals` mérite qu'on s'y arrête. Deux objets `Point` construits séparément avec
les mêmes valeurs sont égaux, parce que le record compare ses composants. Ce n'est pas le
comportement d'une classe ordinaire, où `equals` compare les références tant qu'on ne la
redéfinit pas. La question reviendra.

ENU.4 fait la démonstration de tout cela d'une façon un peu particulière : plusieurs tests
sont verts avant que vous ayez écrit une ligne. Ce n'est pas une panne, c'est le
compilateur qui a fait le travail.

Le code complet, à exécuter : demos, classe `demo.enu.slides.LesRecords`.

### 7.4 · Un record ne change pas

**Source** — deck 02, slide 55

**Slide**

- Un record est `final` : aucune classe n'en hérite
- Ses composants sont `final` : il n'existe aucun setter
- Un record construit reste tel quel jusqu'à sa disparition

**Note**

L'immuabilité n'est pas un effet de bord, c'est le principe. Un record modélise une valeur,
et une valeur ne se modifie pas : on en fabrique une autre. Changer l'abscisse d'un point
revient à construire un nouveau point.

Le compilateur ne fournit donc ni setter, ni constructeur sans argument. Ce n'est pas un
manque : c'est ce qui rend l'objet sûr à partager, puisque personne ne peut le modifier
dans le dos de celui qui l'a créé. Voir CC-OBJ.2.

L'absence d'héritage suit la même logique. Une valeur n'a pas de sous-type, et autoriser
l'héritage rouvrirait la porte aux comparaisons ambiguës que `equals` évite précisément.

### 7.5 · Ajouter une méthode

**Slide**

- Un record accepte des méthodes, comme toute classe
- Une méthode calcule à partir des composants du record
- Ce qui se calcule n'est pas stocké

```java
public record Rectangle(int largeur, int hauteur) {

    public int aire() {
        return largeur * hauteur;
    }
}
```

**Note**

Le corps du record n'est pas condamné à rester vide. Il accueille des méthodes, qui
accèdent directement aux composants.

La règle à retenir est la même que pour une classe ordinaire : une information qui se
déduit des autres se calcule, elle ne se stocke pas. Ajouter un composant `aire` obligerait
à le maintenir cohérent avec la largeur et la hauteur, et ouvrirait la porte à la
contradiction. C'est la question déjà rencontrée avec la température en deux unités.

Le code complet, à exécuter : demos, classe `demo.enu.slides.LesRecords`.

### 7.6 · Valider à la construction

**Source** — deck 02, slide 54

**Slide**

- Le constructeur compact reçoit les composants avant qu'ils soient affectés
- On peut protéger l'objet des valeurs absurdes par un test dans le constructeur (les exceptions seront vues au module EXC)

```java
public record Rectangle(int largeur, int hauteur) {

    public Rectangle {
        if (largeur <= 0 || hauteur <= 0) {
            throw new IllegalArgumentException("dimensions positives");
        }
    }
}
```

**Note**

Rien n'empêche, par défaut, de construire un rectangle de largeur nulle ou un étudiant dont
la cote vaut 47. Le constructeur compact est l'endroit prévu pour l'interdire : il porte le
nom du record, sans liste de paramètres ni parenthèses, et s'exécute avant l'affectation des
composants.

L'instruction `throw` interrompt la construction et signale l'erreur à l'appelant. Le
mécanisme complet des exceptions, et la façon de les traiter, sont le sujet du module EXC.
Pour l'instant, il suffit de savoir que l'objet n'est pas créé et que le programme s'arrête
là s'il ne fait rien.

Le code complet, à exécuter : demos, classe `demo.enu.slides.LesRecords`.

### 7.7 · Quand le record ne convient pas

**Slide**

| Ce que vous modélisez | La forme |
|---|---|
| une adresse, un point, un résumé de partie | un `record` |
| un compte dont le solde change | une classe |
| un feu qui change de couleur | une classe |
| un objet dont d'autres doivent hériter | une classe |

**Note**

Le record est excellent là où il convient, et inadapté partout ailleurs. Le critère est
simple : un objet qui change d'état, ou qui porte une logique métier, n'est pas un record.

Un compte bancaire a un solde qui bouge, un feu de signalisation a une couleur qui tourne :
ni l'un ni l'autre ne peut être immuable. À l'inverse, un résumé de partie constaté à la
fin d'un jeu ne changera plus jamais, et le record lui va parfaitement.

La dernière ligne du tableau est une conséquence mécanique du `final` : une hiérarchie de
classes ne peut pas commencer par un record.

### 7.8 · Exercices

**Slide**

- **ENU.4** - Un record d'étudiant
- Concevoir : CC-OBJ.2

**Note**

L'en-tête du record vous est fourni. Votre part se limite à la méthode `passe`, et c'est
tout l'intérêt de l'exercice : mesurer ce qu'une seule ligne de déclaration vous a évité
d'écrire.

Le fascicule demande d'écrire la même chose sous forme de classe ordinaire, avec ses champs,
son constructeur, ses accesseurs, son `toString`, son `equals` et son `hashCode`, puis de
compter les lignes. L'exercice ne prend que quelques minutes et il vaut la démonstration.

### 7.9 · Le fil rouge

**Slide**

- **G.6** - Les énumérations `TypeJeu` et `ResultatPartie`
- **G.7** - La partie connaît son type et son résultat
- **G.8** - Le record `ResumePartie`
- **G.9** - Choisir son jeu au lancement

**Note**

Le fil rouge applique les deux notions du module à GameHub. Deux énumérations d'abord :
le type de jeu, qui connaît un libellé lisible par un humain, et le résultat d'une partie,
qui vaut victoire du premier joueur, victoire du second ou match nul.

La classe `Partie` les reçoit ensuite comme champs, et sa méthode `terminer` initialise le
résultat. Le record `ResumePartie` conserve enfin ce qui ne bougera plus une fois la partie
finie : le pseudo du gagnant, les deux horodatages et le type de jeu. La question posée par
l'énoncé — où créer ce record — a une réponse naturelle, et elle est dans `terminer`.
