# Scénario du module POO

*Classes et objets en Java. Version 5, 17/09/2026.*

Ce document décrit le deck du module slide par slide. Il sert de base à la
construction du `.pptx` ; le support imprimable, lui, sera généré à partir
du `.pptx` final, pas à partir de ce fichier.

---

## Conventions de ce scénario

Chaque slide est un bloc `###` portant quatre rubriques.

| Rubrique | Contenu |
|---|---|
| **Source** | `d01/31` = deck 01, slide 31 ; `d04/41` = deck 04, slide 41 ; `nouvelle` |
| **Slide** | ce qui s'affiche, en puces courtes |
| **Code** | la zone en Consolas, affichée sur la slide et reprise dans le support |
| **Note** | la prose du support imprimable, écrite dans les notes du présentateur |

Trois règles pour le générateur du support :

- **une slide sans note n'apparaît pas dans le support ;**
- **des slides consécutives aux notes identiques n'apparaissent qu'une fois.**
  C'est ce qui évite de répéter six fois les slides 1.2 à 1.7, dont la note
  est reprise sur chacune pour le présentateur ;
- **le code d'une slide est imprimé juste après sa note**, formaté ;
- **les intercalaires deviennent des titres de section** du support.

**Mise en forme.** Les titres des slides sont tous en 40 pt. Le code vise
18 pt, dans une zone sombre (fond `#1D1F22`, coloration d'IntelliJ) aux coins
légèrement arrondis ; il descend sous 18 pt seulement quand il ne tient pas.
Sur les slides 1.2 à 1.7, le code reste en 14 pt : il compte 26 lignes, et
les surlignages animés sont positionnés sur cette taille. Ils sont glissés
sous le texte, sur un fond séparé, pour ne pas voiler le code.

**Repérage.** Les sections sont numérotées : le sommaire (0.2) les annonce,
chaque intercalaire porte son numéro (« 3. Encapsulation »), et chaque slide
rappelle en bas à droite la section en cours (« POO · 3. Encapsulation »).
Les sections PowerPoint (volet de gauche) suivent le même découpage :
« Ouverture », puis « 1. De C# à Java », etc. PowerPoint exige que chaque
slide appartienne à une section ; une slide orpheline déclenche la demande
de réparation. Ces éléments sont posés par `finaliser_deck_poo.py`, qui travaille sur
le deck retouché dans PowerPoint et peut être relancé sans risque. Le
repère est omis là où une forme occupe déjà son emplacement.

**Taille du texte.** Le texte des slides est en 28 pt, sauf quand il est trop
long pour tenir : il descend alors par pas de 2 pt, jusqu'à 20 pt. Sous des
puces en 28 pt, le code peut être réduit jusqu'à 16 pt ; quand les deux ne
tiennent pas, le code passe à droite des puces. C'est
`finaliser_deck_poo.py` qui applique cette règle, et seulement aux slides
qu'il reconnaît comme générées (puces en 20 ou 22 pt) : une taille choisie à
la main dans PowerPoint n'est jamais écrasée.

Le code respecte les conventions du recueil : pas d'accents dans les chaînes
ni dans les commentaires, Java 21.

---

## Déroulé et exercices

| Section | Slides | Démo et exercices, dans l'ordre |
|---|---|---|
| 1. De C# à Java | 1.1 à 1.10 | - |
| 2. Classe et objet | 2.1 à 2.9 | démo POO (étapes 1-2), POO.1, G.1, G.2 |
| 3. Encapsulation | 3.1 à 3.7 | démo POO (étapes 3-5), POO.2, POO.3 |
| 4. Membres de classe | 4.1 à 4.13 | démo STA, STA.1, STA.2 |
| 5. Saisie clavier et Javadoc | 5.1 à 5.7 | POO.4 (1re partie), G.3 |
| 6. Primitifs et références | 6.1 à 6.5 | POO.4 (2e partie) |
| 7. Wrappers | 7.1 à 7.6 | POO.5 |

**Changement par rapport au plan précédent : `static` passe avant la saisie
clavier.** POO.4 et POO.5 emploient toutes deux des méthodes statiques, et
les wrappers reposent entièrement sur des membres statiques. Placé ici,
`static` arrive aussi juste après POO.3, qui a déjà utilisé
`LocalDate.now()` sans l'expliquer.

---

### 0.1 · Titre du module

**Source** d01/1, adaptée

**Slide**
- JAVA 2
- Module POO - Classes et objets
- *(plus de mention « Semaine 01 » : le deck est rattaché à un module, pas à une séance)*

**Note**
*(aucune - la page de titre du support est générée à part)*

---

### 0.2 · Au programme

**Source** nouvelle (posée par `finaliser_deck_poo.py`)

**Slide**
- 1. De C# à Java
- 2. Classe et objet
- 3. Encapsulation
- 4. Membres de classe (static)
- 5. Saisie clavier et Javadoc
- 6. Primitifs et références
- 7. Les wrappers

**Note**
Le module compte sept sections : 1. De C# à Java ; 2. Classe et objet ;
3. Encapsulation ; 4. Membres de classe (static) ; 5. Saisie clavier et
Javadoc ; 6. Primitifs et références ; 7. Les wrappers.

Chaque intercalaire porte le numéro de sa section, et chaque page rappelle en
bas à droite la section en cours.

---

## Section 1 - De C# à Java

### 1.1 · Intercalaire

**Source** d01/30

**Slide**
- De C# à Java

**Note**
Vous connaissez déjà la programmation orientée objet en C#. Java en est très
proche : la plupart de ce que vous savez se transpose directement. Cette
section fait l'inventaire des différences que vous rencontrerez dès le
premier programme.

---

### 1.2 · Pas de grosses différences au niveau du langage

**Source** d01/31. Le code d'origine est conservé, parce que les surlignages
des slides 1.3 à 1.7 sont des formes positionnées sur lui. Trois corrections :
`private class` devient `class`, les accents disparaissent des identifiants,
et le package s'écrit en minuscules (`progoo`).

**Slide**
- Question à la classe : quelles différences repérez-vous ?
- *(les cinq différences apparaissent une à une sur les slides 1.3 à 1.7)*

**Code** (deux colonnes, C# à gauche, Java à droite)

```csharp
namespace ProgOO
{
    class Personne
    {
        public string Nom;
        public string Prenom;
        public int AnneeNaissance;
        public int Age;
        public void CalculAge(int Annee)
        {
            Age = Annee - AnneeNaissance;
        }
        public void Afficher()
        {
            Console.WriteLine(Prenom + " " +
                Nom + " (" + Age + " ans)");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            [...]
        }
    }
}
```

```java
package progoo;

class Personne {
    public String nom;
    public String prenom;
    public int anneeNaissance;
    public int age;
    public void calculAge(int annee) {
        age = annee - anneeNaissance;
    }
    public void afficher() {
        System.out.println(prenom + " " +
            nom + " (" + age + " ans)");
    }
}

public class Program {
    public static void main(String[] args) {
        [...]
    }
}
```

**Note**
Les deux programmes font exactement la même chose. Cinq différences les
séparent.

Java range ses classes dans des **packages**, là où C# utilise des
namespaces. Un package correspond en plus à un dossier sur le disque : la
classe `Personne` du package `progoo` vit dans le dossier `progoo`.

Les **conventions de nommage** diffèrent. Java réserve la majuscule initiale
aux classes, aux énumérations et aux interfaces. Les champs, les variables,
les méthodes et les packages commencent par une minuscule : `nom`,
`afficher()`, `progoo`.

Un fichier `.java` contient **au plus une classe `public`**, et le fichier
porte son nom. Ici, le fichier s'appelle donc `Program.java`. La classe
`Personne`, déclarée sans modificateur, n'est visible que dans son package.

Les **classes du framework** ne sont pas les mêmes : `Console.WriteLine`
devient `System.out.println`.

Enfin, la **méthode `main`** doit être `public` en Java, alors qu'en C#
`Main` peut rester privée.

---

### 1.3 · Structuration des classes

**Source** d01/32, même correction de code que 1.2

**Slide**
- `package` pour structurer les classes *(surligné)*

**Note**
*(identique à 1.2 : la note est répétée sur les six slides)*

---

### 1.4 · Conventions de nommage différentes

**Source** d01/33

**Slide**
- Majuscule pour les classes, énumérations et interfaces
- minuscule pour les variables, méthodes et packages *(surligné)*

**Note**
*(identique à 1.2 : la note est répétée sur les six slides)*

---

### 1.5 · Lien entre fichier et classe

**Source** d01/34

**Slide**
- Dans un fichier, une seule classe `public` *(surligné)*

**Note**
*(identique à 1.2 : la note est répétée sur les six slides)*

---

### 1.6 · Classes du framework différentes

**Source** d01/35

**Slide**
- `System.out.println` : les classes du framework sont différentes *(surligné)*

**Note**
*(identique à 1.2 : la note est répétée sur les six slides)*

---

### 1.7 · La méthode main rend la classe exécutable

**Source** d01/36

**Slide**
- La méthode `main` doit être `public` *(surligné)*

**Note**
*(identique à 1.2 : la note est répétée sur les six slides)*

---

### 1.8 · Classe Java et programme exécutable

**Source** d01/29, déplacée ici

**Slide**
- N'importe quelle classe peut être exécutable
- Il suffit qu'elle contienne la méthode `main`
- Conseil : une classe `Programme` dédiée, qui utilise les autres
- Plus tard : les classes de test (module JUN)

**Code**

```java
public static void main(String[] args)
```

**Note**
En Java, n'importe quelle classe devient exécutable dès qu'elle contient une
méthode `main` portant exactement cette signature. IntelliJ affiche alors
une flèche verte dans la marge, à côté de la classe (voir IDE.16).

Pour essayer un ensemble de classes, écrivez plutôt une classe `Programme`
séparée, qui les utilise : vos classes métier restent ainsi débarrassées de
tout code d'essai. Vous verrez dans le module JUN une manière bien plus
fiable de vérifier qu'une classe fonctionne : les classes de test.

Une précision si vous installez un JDK récent chez vous : depuis Java 25,
`main` n'est plus obligée d'être `public static`. Le cours et l'examen
utilisent Java 21, où la signature ci-dessus reste la seule valide.

---

### 1.9 · Du code source au programme

**Source** nouvelle (renvoi, remplace les slides d01/24 à 28)

**Slide**
- `.java` → `javac` → `.class` → JVM
- Le détail : mémento technique, TEC-CMP.1 et TEC-CMP.2

**Note**
Le code que vous écrivez n'est pas exécuté tel quel. Le compilateur `javac`
le traduit en bytecode, rangé dans des fichiers `.class`, et c'est ce
bytecode que la machine virtuelle Java exécute, sur n'importe quel système.
Le mémento technique détaille ces trois états (TEC-CMP.1) et explique
pourquoi un même `.class` tourne partout (TEC-CMP.2).

---

### 1.10 · En résumé

**Source** d01/43, allégée (les lignes sur l'héritage partent au module ABS)

**Slide**
- `namespace` devient `package`
- Majuscule pour les types, minuscule pour le reste
- Un fichier `.java` = au plus une classe `public`, qui lui donne son nom
- `Console.WriteLine` devient `System.out.println`
- `main` doit être `public static`

**Note**
*(aucune - le résumé répète 1.2)*

---

## Section 2 - Classe et objet

### 2.1 · Intercalaire

**Source** d01/46, retitrée

**Slide**
- Classe et objet

**Note**
Cette section reprend les notions de base de la programmation orientée
objet et montre comment Java les écrit : la classe, l'objet, le
constructeur, le mot-clé `this`, les champs `final` et la méthode
`toString`.

---

### 2.2 · Les quatre principes de la POO

**Source** d01/47 et 48, réécrites et condensées

**Slide**
- **Encapsulation** : l'objet protège son état → section 3
- **Abstraction** : ne modéliser que ce qui compte pour le problème
- **Héritage** : une classe reprend et étend une autre → module ABS
- **Polymorphisme** : traiter uniformément des objets différents → modules ABS et ITF

**Note**
La programmation orientée objet repose sur quatre principes.

L'**encapsulation** regroupe dans une même classe les données et les
méthodes qui les manipulent, et cache les détails internes : on agit sur un
objet par ses méthodes, pas en touchant directement à ses champs.

L'**abstraction** consiste à ne retenir, d'un objet du monde réel, que les
caractéristiques utiles au problème. Une `Personne` n'a pas la même forme
dans un logiciel de paie et dans un logiciel médical.

L'**héritage** permet à une classe de reprendre les champs et les méthodes
d'une autre, et d'y ajouter les siens. Le **polymorphisme** permet de
traiter de la même façon des objets de classes différentes, pourvu qu'ils
partagent un type commun.

Ce module-ci traite de l'encapsulation. L'héritage et le polymorphisme
feront l'objet des modules ABS et ITF.

---

### 2.3 · Classe et objet

**Source** d01/48, seconde partie, réécrite

**Slide**
- Une **classe** est un moule : elle décrit des champs et des méthodes
- Un **objet** est un exemplaire construit à partir du moule
- `new` crée l'objet ; la variable permet de le retrouver

**Code**

```java
public class Livre {
    public String titre;
    public String auteur;
    public int anneeDeParution;
}

Livre dune = new Livre();
dune.titre = "Dune";
```

**Note**
Une classe ne fait rien par elle-même : elle décrit ce que posséderont les
objets construits à partir d'elle. Chaque appel à `new` fabrique un nouvel
exemplaire, un objet, avec ses propres valeurs de champs. Deux livres créés
par deux `new` sont deux objets distincts, même s'ils portent le même titre.

---

### 2.4 · Démonstration

**Source** nouvelle

**Slide**
- Démo : construire une classe, puis l'encapsuler
- *(slide d'appui pour le professeur ; le déroulé est dans Demo_POO)*

**Note**
La démonstration part d'une classe vide et lui ajoute des champs publics.
Elle montre qu'un champ public accepte n'importe quelle valeur, même
absurde, sans que rien ne proteste. C'est le problème que la section 3
résout.

---

### 2.5 · Le constructeur

**Source** nouvelle

**Slide**
- Il porte le nom de la classe, n'a pas de type de retour
- Il est appelé par `new`, il initialise l'objet
- Sans constructeur écrit, Java en fournit un « par défaut », sans paramètre
- Dès qu'on écrit un constructeur « explicite », le constructeur par défaut disparaît

**Code**

```java
public class Livre {
    private String titre;
    private int anneeDeParution;

    public Livre(String titre, int anneeDeParution) {
        this.titre = titre;
        this.anneeDeParution = anneeDeParution;
    }
}

Livre dune = new Livre("Dune", 1965);
// refuse : ce constructeur n'existe plus
Livre vide = new Livre();
```

**Note**
Le constructeur est la méthode appelée par `new`. Il porte le nom exact de
la classe et ne déclare aucun type de retour, pas même `void`. Son rôle est
de mettre l'objet dans un état correct dès sa création.

Une classe qui ne déclare aucun constructeur en reçoit un d'office : il ne
prend aucun paramètre et laisse chaque champ à sa valeur par défaut, `0`
pour un nombre, `false` pour un booléen, `null` pour un objet. Ce
constructeur par défaut disparaît dès que vous écrivez le vôtre : dans
l'exemple, `new Livre()` ne compile plus.

Vous connaissez déjà `private` depuis C# ; la section 3 montre pourquoi on
l'emploie ici. IntelliJ peut générer un constructeur à partir des champs
(voir IDE.12).

---

### 2.6 · Le mot-clé this

**Source** nouvelle

**Slide**
- `this` désigne l'objet en cours
- Il lève l'ambiguïté quand un paramètre porte le nom d'un champ
- Piège : `titre = titre;` compile, mais ne fait rien

**Code**

```java
public Livre(String titre, int anneeDeParution) {
    this.titre = titre;   // le champ recoit le parametre
    titre = titre;        // le parametre recoit... lui-meme
}
```

**Note**
Dans une méthode ou un constructeur, `this` désigne l'objet sur lequel on
travaille. On s'en sert surtout quand un paramètre porte le même nom qu'un
champ : le nom seul désigne alors le paramètre, qui masque le champ, et
`this.titre` désigne le champ.

L'oubli de `this` est une erreur silencieuse. L'instruction `titre = titre;`
est parfaitement valide : elle affecte le paramètre à lui-même, et le champ
reste à `null`. Le compilateur ne dit rien ; IntelliJ, en revanche, souligne
la ligne (voir IDE.15).

---

### 2.7 · Un champ final

**Source** nouvelle (reprend une ligne de d01/44)

**Slide**
- `final` : le champ reçoit sa valeur une seule fois, au plus tard dans le constructeur
- Le compilateur refuse toute affectation ultérieure
- L'immuabilité n'est plus une affaire de vigilance mais est vérifiée par le compilateur

**Code**

```java
public class Livre {
    private final String titre;

    public Livre(String titre) {
        this.titre = titre;
    }

    public void renommer(String nouveauTitre) {
        titre = nouveauTitre;
        // refuse : cannot assign a value
        //          to final variable titre
    }
}
```

**Note**
Certaines données ne doivent jamais changer une fois l'objet créé : le titre
d'un livre, le pseudo d'un joueur. Déclarer le champ `final` confie cette
règle au compilateur : le champ doit recevoir sa valeur exactement une fois,
au plus tard à la fin du constructeur, et toute affectation ultérieure est
refusée.

Un champ `final` ne s'écrit pas en majuscules pour autant. Les majuscules
sont réservées aux constantes, qui sont à la fois `static` et `final` :
vous les verrez à la section 4.

---

### 2.8 · La méthode toString

**Source** nouvelle

**Slide**
- Tout objet sait se transformer en texte
- Par défaut : nom de la classe + `@` + un numéro
- On redéfinit la méthode `toString` pour afficher quelque chose d'utile
- Appelée implicitement par `println` et par la concaténation

**Code**

```java
@Override
public String toString() {
    return titre + " (" + anneeDeParution + ")";
}

System.out.println(dune);         // Dune (1965)
String texte = "Lu : " + dune;    // Lu : Dune (1965)
```

**Note**
Toute classe Java possède une méthode `toString()`, qui rend une
représentation textuelle de l'objet. Celle qu'on reçoit par défaut n'est
guère utile : elle affiche le nom complet de la classe suivi d'un `@` et
d'un numéro, par exemple `Livre@1b6d3586`.

On la redéfinit donc presque toujours. L'annotation `@Override` indique au
compilateur qu'on remplace une méthode existante ; le module ABS explique
d'où vient cette méthode.

`toString()` est rarement appelée explicitement. `System.out.println(dune)`
l'appelle pour vous, et la concaténation d'une chaîne et d'un objet aussi.

---

### 2.9 · Exercices

**Source** nouvelle (slide de renvoi, remplace l'énoncé d01/50 et les énoncés d01/65 et 66)

**Slide**
- **POO.1** - Une première classe *(fascicule POO)*
- **G.1** - Le joueur *(fil rouge GameHub)*
- **G.2** - La partie *(fil rouge GameHub)*
- Nommer : CC-NOM.1 et CC-NOM.5

**Note**
À faire : l'exercice POO.1 du fascicule POO, puis les incréments G.1 et G.2
du fil rouge, dans le document GameHub. Pour choisir vos noms, lisez les
règles CC-NOM.1 (le nom communique l'intention) et CC-NOM.5 (des noms pour
les choses, des verbes pour les actions) du mémento Clean Code.

---

## Section 3 - Encapsulation

### 3.1 · Intercalaire

**Source** nouvelle

**Slide**
- Encapsulation

**Note**
Un objet dont les champs sont publics ne contrôle pas son propre état.
Cette section montre comment reprendre ce contrôle, et pourquoi il ne
suffit pas de générer des accesseurs pour y parvenir.

---

### 3.2 · Le problème d'un champ public

**Source** nouvelle (reprend l'étape 2 de la démo)

**Slide**
- Tout le monde peut écrire n'importe quoi
- Le programme est faux, et rien ne le signale

**Code**

```java
Livre dune = new Livre("Dune", 1965);
dune.anneeDeParution = -3000;   // champ public : accepte sans broncher
```

**Note**
Avec un champ public, n'importe quel code peut modifier l'objet sans
passer par lui. Rien n'empêche d'écrire une année de parution négative :
le programme compile, s'exécute, et produit des résultats faux sans que
personne ne s'en aperçoive.

---

### 3.3 · Fermer les champs, ouvrir des accesseurs

**Source** d01/51 et 52, condensées

**Slide**
- Les champs deviennent `private`
- **Getter** : `getTitre()` lit la valeur
- **Setter** : `setTitre(String)` la modifie
- Pour un booléen, le getter commence par `is` : `isDisponible()`

**Code**

```java
public class Livre {
    private String titre;

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }
}
```

**Note**
Encapsuler une classe, c'est rendre ses champs `private` et n'y donner
accès que par des méthodes. Par convention, la méthode qui lit un champ
s'appelle `get` suivi du nom du champ avec une majuscule, et celle qui le
modifie `set`. Pour un champ booléen, le getter commence par `is`.

Ces méthodes, qu'on appelle des accesseurs, jouent le rôle des propriétés
de C#. IntelliJ sait les générer (voir IDE.12).

---

### 3.4 · Ce que le détour permet

**Source** nouvelle (reprend l'étape 4 de la démo)

**Slide**
- Le setter est l'endroit où l'on place une règle
- Un champ public ne le permettra jamais
- `IllegalArgumentException` : non contrôlée, pas de `try/catch` à écrire (module EXC)

**Code**

```java
public void setAnneeDeParution(int annee) {
    if (annee < 0) {
        throw new IllegalArgumentException("Annee invalide : " + annee);
    }
    this.anneeDeParution = annee;
}
```

**Note**
Un getter et un setter qui se contentent de lire et d'écrire le champ ne
protègent rien : ils ne font que déplacer l'accès. Leur intérêt apparaît
quand on y place une règle. Ici, le setter refuse une année négative, et
l'objet ne peut plus se retrouver dans un état absurde.

Le refus prend la forme d'une exception. Le module EXC les étudie en
détail ; retenez pour l'instant que `throw` interrompt la méthode et
signale l'erreur à l'appelant. `IllegalArgumentException` est une exception
dite non contrôlée : le compilateur n'exige pas qu'on l'attrape, et le code
appelant reste donc débarrassé de tout `try/catch`.

---

### 3.5 · Un accesseur n'est pas une obligation

**Source** nouvelle

**Slide**
- Générer un getter et un setter par champ annule l'encapsulation
- Chaque accesseur doit avoir une raison d'être
- Un champ `final` n'a pas de setter
- Voir CC-OBJ.2

**Note**
Le générateur d'IntelliJ produit en un clic un getter et un setter pour
chaque champ. C'est commode, mais le résultat ne vaut guère mieux que des
champs publics : n'importe qui peut encore tout lire et tout modifier.

Posez-vous la question pour chaque champ. Doit-il être lu de l'extérieur ?
Doit-il être modifié, et selon quelle règle ? Un champ `final` n'a par
définition aucun setter. La règle CC-OBJ.2 du mémento Clean Code développe
ce point.

---

### 3.6 · La donnée qui n'existe pas

**Source** nouvelle (reprend l'étape 5 de la démo)

**Slide**
- Un champ `age` se périme tout seul
- Ce qu'on peut calculer n'a pas à être stocké
- Une méthode remplace le champ

**Code**

```java
public int getAge() {
    return LocalDate.now().getYear() - anneeDeParution;
}
```

**Note**
L'âge d'un livre change chaque année, alors que son année de parution ne
change jamais. Stocker l'âge dans un champ, c'est accepter qu'il devienne
faux au premier janvier suivant, sans que rien ne le mette à jour.

Une donnée qu'on peut recalculer n'a donc pas sa place dans un champ : une
méthode la calcule à la demande, à partir de ce qui est stable. Vu de
l'extérieur, `getAge()` ressemble à un getter ordinaire ; aucun champ ne se
cache pourtant derrière.

`LocalDate.now().getYear()` donne l'année en cours. Les classes de dates
font l'objet du module TMP.

---

### 3.7 · Exercices

**Source** nouvelle (slide de renvoi, remplace l'énoncé d01/53)

**Slide**
- **POO.2** - La même classe, encapsulée
- **POO.3** - L'âge n'est pas une donnée à stocker
- Générer les accesseurs : IDE.12

**Note**
À faire : les exercices POO.2 et POO.3 du fascicule POO. La section IDE.12
du guide IntelliJ montre comment générer accesseurs et constructeurs, et
ce qu'il faut éviter quand le squelette les déclare déjà.

---
## Section 4 - Membres de classe

### 4.1 · Intercalaire

**Source** d04/38

**Slide**
- static
- static = défini au niveau de la classe, pas pour chaque objet

**Note**
Jusqu'ici, chaque champ appartenait à un objet : chaque livre a son titre.
Certaines informations n'appartiennent pourtant à aucun objet en
particulier. Le mot-clé `static` les rattache à la classe elle-même.

---

### 4.2 · Champs et méthodes de classe

**Source** d04/39, inchangée

**Slide**
- Un champ de classe existe en un seul exemplaire, partagé par toutes les instances
- Une méthode de classe s'appelle sans créer d'objet
- Exemples déjà rencontrés : `main`, `Math.sqrt`, `LocalDate.now`

**Note**
Un champ déclaré `static` n'existe qu'une fois, quel que soit le nombre
d'objets créés : on l'appelle champ de classe, ou champ statique. De même,
une méthode `static` peut être appelée sans qu'aucun objet n'existe. Vous
en utilisez depuis le début : `main`, `Math.sqrt()`, et
`LocalDate.now()` dans l'exercice POO.3.

---

### 4.3 · Champs d'objet

**Source** d04/40, inchangée (schéma a1 / a2)

**Slide**
- Chaque objet possède ses propres champs

**Code**

```java
class A {
    int n;
    float y;
}

A a1 = new A();
A a2 = new A();
```

**Note**
Sans `static`, chaque objet reçoit ses propres exemplaires des champs.
`a1.n` et `a2.n` sont deux cases mémoire distinctes : modifier l'une ne
change rien à l'autre.

---

### 4.4 · Champ de classe

**Source** d04/41, inchangée (schéma b1 / b2)

**Slide**
- `n` est maintenant commun à toutes les instances
- `y` reste propre à chaque objet

**Code**

```java
class B {
    static int n;
    float y;
}

B b1 = new B();
B b2 = new B();
```

**Note**
Déclaré `static`, le champ `n` n'existe plus qu'une fois, pour toute la
classe. `b1.n` et `b2.n` désignent la même case : ce que l'un y écrit,
l'autre le lit. Le champ `y`, lui, reste propre à chaque objet.

---

### 4.5 · Nommer un champ de classe

**Source** d04/42, reformulée

**Slide**
- `b1.n` et `b2.n` désignent le même champ
- On préfère écrire `B.n` : le nom de la classe, pas d'un objet
- Depuis une méthode de `B`, `n` suffit
- Un champ statique `private` reste accessible par des méthodes

**Note**
Puisqu'un champ statique appartient à la classe, on le désigne de
préférence par le nom de la classe : `B.n` dit clairement qu'il s'agit d'un
champ partagé, là où `b1.n` laisse croire qu'il appartient à `b1`. Cette
notation suppose que le champ soit visible ; un champ statique `private`
reste accessible à l'extérieur par l'intermédiaire de méthodes, comme
n'importe quel champ encapsulé.

---

### 4.6 · Démonstration

**Source** nouvelle

**Slide**
- Démo : ce qui appartient à la classe, ce qui appartient à l'objet
- *(slide d'appui pour le professeur ; le déroulé est dans Demo_STA)*

**Note**
La démonstration numérote des voitures, d'abord à la main puis grâce à un
compteur partagé. Le débogueur montre ensuite que chaque voiture a son
propre numéro, alors que le compteur n'existe qu'une fois (voir IDE.19).

---

### 4.7 · Un compteur d'instances

**Source** d04/43 et 44, fusionnées et corrigées

**Slide**
- Un champ statique compte les objets créés
- Question : qu'affiche ce programme ?

**Code**

```java
class Ticket {
    private static int crees = 0;

    public Ticket() {
        crees++;
        System.out.println("Ticket " + crees + " cree");
    }
}

public class Programme {
    public static void main(String[] args) {
        Ticket a;
        System.out.println("main 1");
        a = new Ticket();
        System.out.println("main 2");
        Ticket b;
        System.out.println("main 3");
        b = new Ticket();
        Ticket c = new Ticket();
        System.out.println("main 4");
    }
}
```

**Note**
Le compteur `crees` est partagé par tous les tickets : chaque constructeur
l'incrémente, et tous voient la même valeur. Le programme affiche :

`main 1`, `Ticket 1 cree`, `main 2`, `main 3`, `Ticket 2 cree`,
`Ticket 3 cree`, `main 4`.

Remarquez que la déclaration `Ticket a;` ne crée aucun objet : seul `new`
appelle le constructeur. Remarquez aussi que ce compteur ne diminue jamais.
Java ne prévient pas un objet de sa disparition ; le mémento technique
explique pourquoi (TEC-EXE.4).

---

### 4.8 · Méthodes de classe

**Source** d04/46, corrigée

**Slide**
- Elles ne dépendent d'aucun objet
- Elles s'appellent sur la classe : `Math.sqrt(16)`
- Il est possible d'appeler une méthode de classe sur un objet, mais c'est peu lisible et trompeur : à éviter

**Code**

```java
double racine = Math.sqrt(16);
int annee = LocalDate.now().getYear();
```

**Note**
Une méthode de classe ne travaille sur aucun objet particulier. On
l'appelle donc sur la classe : `Math.sqrt(16)` ne demande pas de créer un
objet `Math`, et la classe `Math` ne permet d'ailleurs pas d'en créer.

Java accepte qu'on appelle une méthode statique à travers une variable
d'objet, mais l'écriture laisse croire que la méthode dépend de cet objet.
IntelliJ le signale par un avertissement.

---

### 4.9 · Une méthode statique n'a pas de this

**Source** d04/47, corrigée (schéma c1, c2, c3)

**Slide**
- Une méthode statique n'est appelée sur aucun objet
- Elle ne peut donc utiliser ni `this`, ni un champ d'objet
- C'est pour cela que `main` est statique

**Code**

```java
class C {
    int n = 0;

    public static void fixer() {
        n = 2;
        // refuse : non-static variable n cannot be referenced
        //          from a static context
    }
}

C.fixer();   // quel n ? celui de c1, de c2, de c3 ?
```

**Note**
C'est l'erreur la plus fréquente du thème. `fixer()` est appelée sur la
classe, pas sur un objet : elle n'a aucun moyen de savoir de quel `n` on
parle, puisqu'il en existe un par objet. Le compilateur refuse, avec un
message qui résume tout le sujet. Le même raisonnement interdit `this`,
qui n'a rien à désigner.

C'est aussi ce qui explique que `main` soit statique : il s'exécute avant
qu'aucun objet n'existe.

---

### 4.10 · Les constantes

**Source** nouvelle (reprend une ligne de d01/44)

**Slide**
- `static` : une seule valeur, partagée
- `final` : elle ne change pas
- Une constante a besoin des deux
- Nom en majuscules, mots séparés par `_`

**Code**

```java
public class Facture {
    public static final double TVA = 0.21;
    public static final int JOURS_DE_PAIEMENT = 30;
}

double prix = 100 * (1 + Facture.TVA);
```

**Note**
`static` et `final` disent deux choses différentes. `static` signifie que la
valeur est partagée par toute la classe ; `final`, qu'elle ne changera pas.
Une constante réunit les deux. Un compteur d'instances n'a besoin que du
premier, un champ immuable d'objet que du second.

Par convention, une constante s'écrit en majuscules, avec des soulignés
entre les mots. Nommer une valeur plutôt que l'écrire en dur rend le code
lisible et évite de la répéter : c'est la règle CC-NOM.7 du mémento Clean
Code.

---

### 4.11 · À quoi servent les méthodes de classe

**Source** d04/48 et 49, réécrites

**Slide**
- Répondre sur l'ensemble : combien d'objets ont été créés ?
- Offrir un service sans état : `Math.sqrt`, `Integer.parseInt`
- Fabriquer des objets : `LocalDate.now()`, `LocalDate.of(...)`

**Note**
Les méthodes de classe servent dans trois situations. Elles répondent aux
questions qui portent sur l'ensemble des objets plutôt que sur l'un d'eux,
comme le nombre d'instances créées. Elles offrent des services qui n'ont
besoin d'aucun état, comme les fonctions mathématiques de la classe `Math`.
Enfin, elles peuvent construire des objets : `LocalDate.now()` rend une
date sans qu'on ait écrit `new`. Ces dernières s'appellent des fabriques.

---

### 4.12 · Les fabriques

**Source** nouvelle

**Slide**
- Un constructeur porte le nom de sa classe, et rien d'autre
- Une fabrique porte le nom qu'on veut
- Deux fabriques peuvent avoir la même signature
- Quand on crée des fabriques, le constructeur est `private` : on passe obligatoirement par les fabriques pour créer des objets

**Code**

```java
public class Point {
    private final double x;
    private final double y;

    private Point(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public static Point cartesien(double x, double y) {
        return new Point(x, y);
    }

    public static Point polaire(double rayon, double angle) {
        double x = rayon * Math.cos(angle);
        double y = rayon * Math.sin(angle);
        return new Point(x, y);
    }
}

Point a = Point.cartesien(3, 4);
Point b = Point.polaire(5, 0.93);
```

**Note**
Un point du plan peut se décrire par ses coordonnées ou par une distance et
un angle : dans les deux cas, deux nombres réels. Deux constructeurs
`Point(double, double)` ne peuvent pas coexister, puisqu'ils auraient la
même signature. Deux méthodes statiques, elles, se distinguent par leur
nom, et ce nom dit en plus comment lire les paramètres.

Rendre le constructeur `private` oblige tout le code extérieur à passer par
les fabriques : personne ne peut plus écrire `new Point(3, 4)` en se
demandant ce que représentent les deux nombres.

---

### 4.13 · Exercices

**Source** nouvelle (slide de renvoi)

**Slide**
- **STA.1** - Une constante et un compteur d'instances
- **STA.2** - Un constructeur privé et des fabriques
- Le débogueur : IDE.19

**Note**
À faire : les exercices STA.1 et STA.2 du fascicule STA. STA.1 demande
d'observer les champs dans le débogueur ; la section IDE.19 du guide
IntelliJ explique comment poser un point d'arrêt et lire le panneau
Variables.

---

## Section 5 - Saisie clavier et Javadoc

### 5.1 · Intercalaire

**Source** d01/54

**Slide**
- Entrée de données au clavier

**Note**
Un programme qui dialogue avec son utilisateur doit pouvoir lire ce qu'il
tape. Cette section présente la classe `Scanner`, et profite de l'occasion
pour apprendre à lire la documentation d'une classe du JDK.

---

### 5.2 · La classe Scanner

**Source** d01/55, complétée

**Slide**
- `Scanner` lit ce que l'utilisateur tape dans la console
- Un seul `Scanner` sur `System.in` pour tout le programme
- Ne pas oublier l'import

**Code**

```java
import java.util.Scanner;

public class Accueil {
    public static void main(String[] args) {
        Scanner clavier = new Scanner(System.in);
        System.out.print("Votre prenom : ");
        String prenom = clavier.nextLine();
        System.out.println("Bonjour " + prenom);
    }
}
```

**Note**
La classe `Scanner`, du package `java.util`, lit ce que l'utilisateur tape
dans la console. On la construit une seule fois, sur `System.in`, puis on
appelle ses méthodes autant de fois que nécessaire. Ouvrir plusieurs
`Scanner` sur la même entrée provoque des comportements difficiles à
comprendre.

---

### 5.3 · La Javadoc

**Source** d01/56, lien mis à jour vers Java 21

**Slide**
- La documentation officielle de chaque classe du JDK
- Pour chaque méthode : paramètres, valeur rendue, exceptions
- En ligne : docs.oracle.com/en/java/javase/21/docs/api/
- Dans IntelliJ : Ctrl+Q / F1 (IDE.14)
- Question : de quelles méthodes de `Scanner` aurons-nous besoin ?

**Note**
Pour savoir ce qu'offre une classe du JDK, on consulte sa Javadoc. Chaque
page présente la classe, puis l'inventaire de ses constructeurs et de ses
méthodes. Pour chaque méthode, elle indique les paramètres attendus, la
valeur rendue et les exceptions possibles.

Inutile d'ouvrir un navigateur : IntelliJ affiche cette documentation au
survol d'un nom, ou avec Ctrl+Q / F1 (voir IDE.14). La version en ligne,
pour Java 21, se trouve à l'adresse
`https://docs.oracle.com/en/java/javase/21/docs/api/`.

---

### 5.4 · La documentation de Scanner

**Source** d01/57, capture remplacée (capture A)

**Slide**
- Survol de `Scanner` dans IntelliJ, ou `Ctrl+Q` / `F1` (IDE.14)
- On voit que `Scanner` est une classe du package `java.util`
- On voit aussi qu'elle découpe l'entrée en jetons, séparés par des blancs
- La classe présente une méthode `next...` par type à lire
- *(capture A à droite : bulle de documentation de la classe Scanner)*

**Note**
IntelliJ affiche la documentation d'une classe au simple survol de son nom.
Pour `Scanner`, la bulle indique le package, `java.util`, puis le principe :
l'entrée est découpée en jetons, séparés par défaut par des espaces ou des
passages à la ligne, et chaque jeton peut être converti dans le type voulu
grâce aux différentes méthodes `next`.

Les exemples de la bulle lisent la console et un fichier. Pour ce cours,
quelques méthodes suffisent : `nextLine()` lit une ligne entière, `next()`
lit un mot, `nextInt()` et `nextDouble()` lisent un nombre.

---

### 5.5 · Les principales méthodes de Scanner

**Source** d01/58, capture remplacée (captures B et C côte à côte)

**Slide**
- Les méthodes de lecture d'entiers acceptent aussi la base de numération
- *(capture B : bulle de `nextInt()` ; capture C : bulle de `nextLine()`)*

**Note**
La bulle d'une méthode donne sa signature, ce qu'elle rend et les exceptions
qu'elle peut lever.

`nextInt()` lit le jeton suivant et le rend sous forme d'entier. Elle lève une
`InputMismatchException` si ce jeton n'est pas un entier : c'est ce qui arrive
quand l'utilisateur tape des lettres là où le programme attend un nombre. La
bulle signale aussi la variante `nextInt(radix)`, qui interprète le nombre
dans la base indiquée.

`nextLine()` rend le reste de la ligne courante, sans le passage à la ligne
final, et se place au début de la ligne suivante. C'est ce comportement qui
explique le piège de la slide suivante.

---

### 5.6 · Un piège : nextInt suivi de nextLine

**Source** nouvelle

**Slide**
- `nextInt()` lit le nombre, mais laisse la fin de ligne
- Le `nextLine()` suivant la ramasse et rend une chaîne vide
- La question semble sautée

**Code**

```java
System.out.print("Annee : ");
int annee = clavier.nextInt();       // lit 1965, laisse la fin de ligne
System.out.print("Titre : ");
String titre = clavier.nextLine();   // rend "" sans attendre
```

**Note**
Quand l'utilisateur tape `1965` puis Entrée, `nextInt()` consomme les
chiffres mais laisse le passage à la ligne dans le tampon. Le `nextLine()`
suivant le trouve immédiatement et rend une chaîne vide : pour
l'utilisateur, la question du titre a été sautée.

On peut ordonner les questions pour éviter qu'un `nextLine()` suive un
`nextInt()`, ou consommer la fin de ligne par un `nextLine()`
supplémentaire. L'exercice POO.5 vous demandera de chercher une manière de
ne jamais tomber dans le piège.

---

### 5.7 · Exercices

**Source** nouvelle (slide de renvoi, remplace l'énoncé d01/59 et l'énoncé d01/67)

**Slide**
- **POO.4** - Saisie au clavier, **première partie seulement**
- **G.3** - Le point d'entrée *(fil rouge GameHub)*

**Note**
À faire : la première partie de l'exercice POO.4, puis l'incrément G.3 du
fil rouge. La seconde partie de POO.4 vient après la section suivante.

---

## Section 6 - Primitifs et références

### 6.1 · Intercalaire

**Source** d01/60, retitrée

**Slide**
- Primitifs et références

**Note**
Une variable Java ne contient pas la même chose selon son type. Cette
différence explique plusieurs comportements surprenants, dont celui que
l'exercice POO.4 vous fera constater.

---

### 6.2 · Types primitifs et objets

**Source** d01/61, corrigée (« pointeurs » devient « références »)

**Slide**
- Huit types primitifs : `int`, `double`, `boolean`, `char`...
- Une variable primitive contient sa valeur
- Une variable d'objet contient une **référence** vers l'objet
- Le détail : TEC-EXE.3
- *(schéma conservé : hauteur = 200, alex → objet Etudiant)*

**Note**
Java compte huit types primitifs : `byte`, `short`, `int`, `long`, `float`,
`double`, `char` et `boolean`. Une variable de l'un de ces types contient
directement sa valeur.

Une variable d'objet, elle, ne contient pas l'objet. Elle contient une
référence, c'est-à-dire le moyen de retrouver l'objet, qui vit ailleurs en
mémoire. Le mémento technique décrit où vivent l'un et l'autre (TEC-EXE.1 à
TEC-EXE.3).

---

### 6.3 · Deux noms, un seul objet

**Source** nouvelle

**Slide**
- Copier une variable primitive copie la valeur
- Copier une variable d'objet copie la référence
- Les deux variables désignent alors le même objet

**Code**

```java
int a = 5;
int b = a;
b = 7;                                       // a vaut toujours 5

Livre l1 = new Livre("Dune", 1965);
Livre l2 = l1;                               // l2 designe le MEME objet
l2.setAnneeDeParution(1966);
System.out.println(l1.getAnneeDeParution()); // 1966
```

**Note**
L'affectation copie toujours le contenu de la variable. Pour un `int`, ce
contenu est le nombre : `a` et `b` restent indépendants. Pour un objet, ce
contenu est la référence : après `l2 = l1`, les deux variables désignent le
même livre, et une modification faite par l'une se voit par l'autre.

Le débogueur rend ce partage visible : il affiche à côté de chaque objet un
numéro, et deux variables qui portent le même numéro désignent le même
objet.

---

### 6.4 · Exercice

**Source** nouvelle (slide de renvoi)

**Slide**
- **POO.4** - Saisie au clavier, **seconde partie**
- Observez, puis expliquez par écrit, avant de passer à la slide suivante

**Note**
À faire : la seconde partie de l'exercice POO.4. Rédigez votre explication
avant de lire la page suivante.

---

### 6.5 · Ce que vous avez observé

**Source** nouvelle (à projeter après l'exercice)

**Slide**
- Java passe toujours les arguments **par valeur**
- Pour un `int` : une copie du nombre
- Pour un objet : une copie de la référence, qui désigne le même objet
- Réaffecter le paramètre ne change rien chez l'appelant

**Code**

```java
static void modifier(int n, Livre livre) {
    n = 99;                           // change la copie
    livre.setAnneeDeParution(2000);   // change l'objet partage
    livre = new Livre("Autre", 1);    // la copie designe un autre objet
}
```

**Note**
Une méthode reçoit toujours une copie de ses arguments. Modifier un
paramètre `int` ne change donc rien chez l'appelant. Un paramètre d'objet
est lui aussi une copie, mais une copie de la référence : il désigne le
même objet que la variable de l'appelant, et ce qu'on fait à l'objet à
travers lui se voit de partout.

Ce n'est pas pour autant un passage par référence : la troisième ligne
fait désigner un autre objet à la copie, et la variable de l'appelant n'en
est pas affectée. TEC-EXE.3 reprend ce raisonnement.

---

## Section 7 - Les wrappers

### 7.1 · Intercalaire

**Source** d01/23, retitrée

**Slide**
- 7. Les wrappers
- Un objet pour chaque type primitif

**Note**
Chaque type primitif a une classe jumelle, qui l'enveloppe et lui ajoute
des méthodes utiles. Ces classes sont l'occasion de retrouver les membres
statiques de la section 4.

---

### 7.2 · Types primitifs et wrappers

**Source** d01/62, liens remplacés par un seul lien vers le package java.lang (Java 21)

**Slide**
- Un wrapper par type primitif

| Primitif | Wrapper |
|---|---|
| `byte` | `Byte` |
| `short` | `Short` |
| `int` | `Integer` |
| `long` | `Long` |
| `float` | `Float` |
| `double` | `Double` |
| `char` | `Character` |
| `boolean` | `Boolean` |

**Note**
À chacun des huit types primitifs correspond une classe du package
`java.lang`, appelée wrapper ou classe enveloppe. Le nom reprend celui du
type avec une majuscule, sauf pour `int` et `char`, qui deviennent
`Integer` et `Character`. Leur Javadoc se trouve dans le module
`java.base`, package `java.lang`.

---

### 7.3 · Ce qu'offrent les wrappers

**Source** d01/63, corrigée (`isSpace` devient `isWhitespace`)

**Slide**
- Des conversions : `Integer.parseInt(String)`
- Des constantes : `Integer.MAX_VALUE`, `Integer.MIN_VALUE`
- Des tests : `Character.isDigit(char)`, `Character.isWhitespace(char)`
- Tous statiques
- Autoboxing et unboxing : la conversion est automatique

**Code**

```java
int n = Integer.parseInt("42");
int plusGrand = Integer.MAX_VALUE;
boolean chiffre = Character.isDigit('7');

Integer boite = 5;     // autoboxing
int valeur = boite;    // unboxing
```

**Note**
Les wrappers offrent surtout des membres statiques : des méthodes de
conversion comme `Integer.parseInt`, des constantes comme
`Integer.MAX_VALUE`, et des tests comme `Character.isDigit`. On les appelle
tous sur la classe, comme on l'a vu à la section 4. Méfiez-vous de
`Character.isSpace`, que vous croiserez dans d'anciens exemples : elle est
dépréciée depuis longtemps au profit de `isWhitespace`.

Java convertit automatiquement un primitif en wrapper et inversement :
c'est l'autoboxing et l'unboxing. Cela permet d'écrire `Integer boite = 5;`
sans conversion explicite.

---

### 7.4 · Séparer le calcul du dialogue

**Source** nouvelle

**Slide**
- Une méthode calcule et rend un résultat : elle ne lit ni n'affiche rien
- Le `main` dialogue avec l'utilisateur : il ne calcule rien
- Le calcul devient testable
- Voir CC-MET.8

**Code**

```java
public class Disque {
    public static double aire(double rayon) {
        return Math.PI * rayon * rayon;
    }

    public static void main(String[] args) {
        Scanner clavier = new Scanner(System.in);
        System.out.print("Rayon : ");
        double rayon = clavier.nextDouble();
        System.out.println("Aire : " + aire(rayon));
    }
}
```

**Note**
Un calcul écrit directement dans le `main`, mêlé aux lectures et aux
affichages, ne peut être vérifié qu'à la main. Placé dans une méthode qui
reçoit ses données en paramètres et rend un résultat, il peut être appelé
et vérifié automatiquement, avec autant de valeurs qu'on veut. Le `main` se
contente alors de dialoguer.

Cette séparation est une règle du cours à partir de maintenant. Le mémento
Clean Code la formule en CC-MET.8 : une méthode agit ou répond, jamais les
deux.

---

### 7.5 · Exercice

**Source** nouvelle (slide de renvoi, remplace l'énoncé d01/64)

**Slide**
- **POO.5** - Changement de base, et logique testable
- La Javadoc de `Integer.parseInt(String, int)` : IDE.14

**Note**
À faire : l'exercice POO.5 du fascicule POO. Il demande de lire la Javadoc
de `Integer.parseInt` ; la section IDE.14 du guide montre comment
l'afficher sans quitter IntelliJ.

---

### 7.6 · En résumé

**Source** nouvelle

**Slide**
- Une classe décrit, `new` construit, le constructeur initialise
- `this` désigne l'objet en cours ; `final` fige un champ
- Des champs `private`, et des accesseurs seulement s'ils se justifient
- `static` : ce qui appartient à la classe, pas à l'objet
- Une variable d'objet contient une référence
- Le calcul dans une méthode, le dialogue dans le `main`

**Note**
Ce module a posé les bases sur lesquelles reposent tous les suivants : des
classes qui protègent leur état, des membres de classe quand une
information n'appartient à aucun objet, et une distinction nette entre ce
que contient une variable primitive et ce que contient une variable
d'objet. La séparation entre calcul et dialogue sera appliquée dans tous
les exercices à venir.

---

# Annexes du scénario

## A. Ce qui sort du module

| Slides | Destination |
|---|---|
| d01/1 à 9 | module INI, à actualiser (slides 6, 8 et 9 notamment) |
| d01/10 à 22 | retirées, reprises par le guide IntelliJ |
| d01/23 | module INI, slide de renvoi vers les documents |
| d01/24 à 28 | retirées, reprises par le mémento technique (TEC-PLA, TEC-CMP) |
| d01/37 à 42 | module ABS, avec les corrections relevées (`boolean`, `super(...);`, `instanceof`, champ `solde` privé, `déposer` qui retire) |
| d01/44 | éclatée : champ `final` en 2.7, constantes en 4.10 ; classe et méthode `final` et transtypage (à réécrire) en ABS |
| d01/45 | module INI, liens mis à jour |
| d01/49 | supprimée : Java n'a pas de destructeur ; l'association relève de TAB.4 |
| d01/50, 53, 59, 64 | énoncés remplacés par les slides de renvoi |
| d01/65 à 67 | énoncés remplacés par des renvois au document GameHub |
| d04/45 | supprimée : `finalize` est dépréciée pour suppression |
| d04/50 à 63 | retirées, reprises par TEC-EXE |
| d04/1 à 37 | hors module : ITF, LAM et fil rouge |

## B. Décisions prises

| Point | Décision |
|---|---|
| Setter qui refuse (3.4) | exception non contrôlée, annoncée comme vue plus tard ; même choix dans la démo |
| `==` sur des `Integer` | retiré du module : pas nécessaire ici ; à reprendre quand l'égalité devient utile (COL) |
| Note de 6.5 dans le support | conservée : la répétition ne nuit pas |
| Renvoi de STA.2 vers TMP.2 | reformulé en annonce de la suite du cours |
| Captures 5.4 et 5.5 | refaites dans IntelliJ, par survol (IDE.14), et posées |
| Repérage | sections numérotées, sommaire en 0.2, repère de section en bas de chaque slide |
| Exemple des slides 1.2 à 1.7 | `Personne` conservée, corrigée : les surlignages sont positionnés sur ce code |

## C. Corrections appliquées aux autres documents

| Document | Correction |
|---|---|
| POO_enonces, POO.5 | `CC-MET.7` devient `CC-MET.8` ; `CC-TST.1` devient `CC-TST.3` |
| POO_enonces, POO.4 | « complete » devient « complète » |
| Demo_POO, étape 4 | la vérification lève une `IllegalArgumentException`, non contrôlée |
| Demo_POO, à rater exprès | `titre = titre`, tapé à la main |
| Demo_STA, renvois | ajout de IDE.19 |
| STA_enonces, STA.2 | le renvoi à TMP.2 devient une annonce de la suite |

Vérifiés et corrects : IDE.12, IDE.14, IDE.19, TEC-EXE.2, TEC-EXE.3,
TEC-EXE.4, TEC-CMP.1, TEC-CMP.2, CC-NOM.7, CC-OBJ.1, CC-OBJ.2, CC-TST.3,
CC-MET.5, CC-CLS.1.
