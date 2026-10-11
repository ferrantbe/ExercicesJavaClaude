# Scénario du module FIC - Fichiers

*Quatre sections et une slide de fil rouge, 25 slides plus le sommaire.
Rubriques : `**Source**` et `**Réserve**` sont des commentaires de
fabrication, `**Slide**` et `**Note**` produisent le contenu et les notes du
présentateur.*

## Fabrication

Sections à déclarer dans `module_fic.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Ce qui entre, ce qui sort | Les flux |
| 2 | Fermer quoi qu'il arrive | Fermer un flux |
| 3 | Écrire et relire du texte | Le texte |
| 4 | Écrire l'objet tel quel | Les objets |

La slide du fil rouge (5.1) n'a pas d'intercalaire, comme la slide 7.1 du
deck GEN.

**Sources** : deck 12 (`d12.pptx`, 46 slides, le thème en entier),
`FIC_enonces.docx`, `Demo_FIC.docx` et son code (`demos/.../demo/fic/`), les
corrigés de `be.ephec.java.fic`, les scénarios EXC (3.5, qui renvoie le `try`
avec ressources à FIC) et GEN (3.3 et 3.5, qui annoncent FIC), le classeur
`Objectifs_et_couverture.xlsx` (FIC.a à FIC.e, objectif d'examen A.5),
`Memento_Clean_Code.docx`. `d12` n'a pas d'intercalaire pleine page :
celui du deck vient de `d02`, slide 13, comme pour PKG, en attendant les
images propres au module.

**Place dans le cours** : quinzième deck, après les deux decks FX. Les
interfaces, les collections, les exceptions (dont `finally`, EXC 3.5),
JUnit, la généricité (dont l'effacement, GEN 3.3 et 3.5), les lambdas et
JavaFX sont connus.

**Le poids à l'examen** : le classeur classe le thème Should, mais une
sixième question, consacrée aux fichiers, est décidée. Le thème vaudra donc
un sixième des points. Cette question n'est pas encore écrite : le deck ne
prétend pas en connaître la forme, il couvre les classes du JDK que
l'objectif A.5 demande de savoir utiliser.

**Le partage avec la démonstration et le fascicule** :

- La démonstration, jouée en 4.3, écrit le même carnet en texte puis en
  binaire, fait échouer l'écriture faute de `Serializable`, ouvre les deux
  fichiers côte à côte, puis ajoute un champ qui rend le `.dat` illisible
  et montre la parade du `serialVersionUID`. Le deck ne montre aucun octet
  d'un fichier binaire, ne dit jamais ce qui arrive quand une classe change,
  et ne nomme `Serializable` qu'après la démonstration, qui compte sur son
  oubli. La slide 4.2 conduit au moment par la question, sans la réponse.
- Le fascicule porte : le tableau comparatif des deux formats ; le `try`
  avec ressources en deux lignes et `IOException` contrôlée (« Deux réflexes
  à prendre ») ; `unmodifiableList` (FIC.1) ; le marqueur `Serializable`,
  « un seul `writeObject` suit les références », le transtypage de
  `readObject` (FIC.2) ; le format imposé, le piège de `split` sans `-1`, la
  perte du chargé de cours et la question de fond (FIC.3) ; `@TempDir`. Le
  deck ne les répète pas, et ne répond à aucune question de fin
  (`serialVersionUID`, `transient`, le point-virgule dans un nom, CSV et
  JSON, `getAbsolutePath`, CC-ERR.4, CC-MET.3).
- Le deck porte ce que ni l'un ni l'autre ne pose : la notion de flux et sa
  parenté avec `System.out` et `System.in`, les deux familles et leurs
  quatre racines, l'emboîtement des flux, la fermeture et son tampon, le
  `try` avec ressources comme notion, la famille `IOException`, l'écriture
  et la relecture du texte, `File` puis `Path` et `Files`, les flux d'objets
  expliqués après coup, la façon dont chaque lecture signale la fin d'un
  fichier.

**Décisions appliquées** :

- Le deck mène à la démonstration au lieu de l'ouvrir : le texte d'abord
  (sections 1 à 3), puis la question de l'objet (4.2), la démonstration
  (4.3), et l'explication après coup (4.4 et 4.5), comme la section 3 du
  deck GEN.
- Le `try` avec ressources forme une section à lui seul : le deck EXC le
  renvoie explicitement à FIC, et aucun autre support ne le pose comme
  notion.
- `DataOutputStream` est gardé sur une seule slide (1.5), comme exemple
  d'emboîtement et seul représentant des flux binaires primitifs.
  `RandomAccessFile` est retiré, à reconsidérer à la relecture.
- La relecture du texte se fait avec `Scanner`, comme dans les corrigés et
  la démonstration : l'étudiant le connaît sur `System.in`.
  `BufferedReader.readLine` est cité en note de 3.3 et dans le tableau de
  4.6.
- La slide 3.6 (`Path` et `Files`) est facultative : elle peut être sautée
  en classe.
- Les exemples utilisent un domaine neutre, une station météo (`Releve`, une
  station et une température entière), pour ne réutiliser ni les classes des
  exercices (`Etudiant`, `Cours`, `Enseignant`), ni celle de la
  démonstration (`Contact`, `carnet`), ni la consigne de GEN, ni l'ascenseur
  d'EXC, ni la bibliothèque de COL. Les températures sont entières, pour
  éviter les questions de `Locale` à l'écriture. Tous les exemples ont été
  compilés et exécutés, et chaque comportement annoncé vérifié, dont le
  fichier encore vide tant que le flux n'est pas fermé (2.2).
- Les exemples de code évitent de reproduire les corrigés : 3.3 affiche les
  lignes au lieu de les ranger dans une liste (`lireLignes`, FIC.3), 4.4
  écrit un entier et un objet au lieu d'une liste (`enregistrer`, FIC.2).
- Le fil rouge reçoit un nouvel incrément, G.35, présenté en 5.1. Sa place
  dans le deck sera revue à la consolidation des slides.

**Retirés de l'ancien deck** :

- La référence au livre (d12/2) et les six sommaires répétés (3, 7, 17, 20,
  31, 38).
- L'image accès séquentiel et accès direct (d12/6), et `RandomAccessFile`
  (18 et 19) : aucun exercice, voir plus haut.
- La lecture binaire en boucle sur `EOFException` (15) : remplacée par le
  tableau de 4.6.
- `StringTokenizer` (29 et 30) : classe héritée, remplacée par `split`
  (3.4).
- `transient` et l'écriture sur mesure (37) : question de fin de FIC.2 pour
  le premier, hors portée pour la seconde.
- Les séparateurs Windows et Unix (40) : `new File(dossier, nom)` (3.5) et
  `Path.of` (3.6) évitent de les écrire, et la question des chemins relatifs
  appartient à FIC.3.
- Les énoncés des exercices (43 à 46) : le fascicule.
- La classe `Clavier`, qui n'est pas du JDK.

**Défauts du deck d'origine corrigés** :

- `CreationFichierObjet` ne ferme jamais son flux (d12/34). Tous les
  exemples du deck ferment leurs flux par un `try` avec ressources.
- `Serializable` « indique au compilateur » (d12/33) : le compilateur ne
  vérifie rien, c'est l'écriture qui échoue à l'exécution. Corrigé en 4.5.
- `Object readObject() throws ...` (d12/37) n'est pas la signature d'une
  méthode de sérialisation sur mesure. Retiré avec la slide.
- `Paths.getPath` (d12/42) n'existe pas. Corrigé en 3.6 (`Path.of`).
- « `Path` remplace `File` » (d12/41) : `File` n'est pas déprécié, et les
  exercices l'emploient. Nuancé en 3.6.
- `DataInputStream sortie` (d12/16) nomme un flux d'entrée « sortie », et
  `RandomAccesFile` (d12/18) est mal orthographié. Retirés.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module FIC
- Fichiers

**Note**

Tout ce que vos programmes construisent depuis le début de l'année
disparaît quand ils s'arrêtent. Ce module montre comment faire survivre une
information : l'écrire dans un fichier, et savoir la relire.

Il y a deux façons de s'y prendre, et elles n'ont pas les mêmes propriétés.
Le module ne vous dira pas laquelle choisir : la démonstration et les
exercices vous en feront juger vous-même.

Le thème compte trois exercices, mais ne vous fiez pas à sa priorité
affichée. Une question de l'examen portera désormais sur les fichiers : le
thème vaut un sixième des points.

---

## Section 1 - Ce qui entre, ce qui sort

### 1.1 · Ce qui entre, ce qui sort

*(intercalaire)*

### 1.2 · Tout s'efface à l'arrêt

**Source** nouvelle ; d12/4, réécrite

**Slide**

- Un objet vit en mémoire, le temps que tourne le programme
- Un fichier vit sur le disque, et survit à l'arrêt
- Écrire un fichier, c'est envoyer une suite d'octets vers le disque
- Reste à décider ce que représentent ces octets

**Note**

Relancez n'importe quel programme écrit cette année : il repart de zéro.
Les objets qu'il avait créés, les saisies de l'utilisateur, tout est perdu,
parce que tout vivait dans la mémoire du processus.

Un fichier ne contient que des octets. Il ne sait pas s'il contient du
texte, des nombres ou des objets : c'est le programme qui l'a écrit qui le
sait, et celui qui le relit qui doit le savoir aussi.

La dernière ligne de la slide est la question de tout le module. Gardez-la
en tête : on y répondra de deux façons très différentes.

---

### 1.3 · Vous écrivez déjà dans un flux

**Source** nouvelle ; d12/4, réécrite

**Slide**

- Un flux est une suite de données qui va dans un seul sens
- La console en ouvre deux pour vous : `System.out` et `System.in`
- Un fichier s'ouvre de la même façon, et se manipule pareil

```java
// System.out est un flux de sortie, ouvert pour vous
PrintStream console = System.out;
console.println("Uccle : 12 degres");

// System.in est un flux d'entree, lu par le Scanner
Scanner clavier = new Scanner(System.in);
String saisie = clavier.nextLine();
```

**Note**

Un flux, *stream* en anglais, est un tuyau : on y écrit d'un côté, les
données sortent de l'autre, dans l'ordre. Un flux de sortie reçoit ce que
le programme envoie ; un flux d'entrée fournit ce que le programme lit.

Vous en utilisez deux depuis le premier module sans les avoir nommés.
`System.out` est un objet de la classe `PrintStream`, que la machine
virtuelle ouvre vers la console. `System.in` est un flux d'entrée branché
sur le clavier, que le `Scanner` découpe en lignes.

Écrire dans un fichier ne demande aucune notion nouvelle : on ouvre un autre
flux, dont l'extrémité est un fichier au lieu de la console. Vous
retrouverez `println` à la section 3, et `nextLine` aussi.

Attention au mot : ces flux n'ont rien à voir avec les *streams* de la
slide facultative du module LAM, qui traitent des collections.

---

### 1.4 · Deux familles, quatre racines

**Source** d12/4, 9, 13 et 22, réunies en tableau

**Slide**

| Famille | Lire | Écrire |
|---|---|---|
| Octets, la racine | `InputStream` | `OutputStream` |
| Octets, vers un fichier | `FileInputStream` | `FileOutputStream` |
| Caractères, la racine | `Reader` | `Writer` |
| Caractères, vers un fichier | `FileReader` | `FileWriter` |

**Note**

Toutes les classes de flux du paquetage `java.io` descendent de quatre
classes abstraites. Le tableau se lit en deux temps : la famille, puis le
sens.

Les flux d'octets transportent des octets tels quels, sans les
interpréter. Les flux de caractères transportent du texte : ils
convertissent chaque caractère en octets à l'écriture, et les octets en
caractères à la lecture, selon un encodage.

Les noms suivent une règle simple. Le suffixe dit la famille et le sens :
`InputStream`, `OutputStream`, `Reader`, `Writer`. Le préfixe dit ce que la
classe ajoute : `File` pour un fichier, et vous en verrez d'autres. Une
classe inconnue se range ainsi d'un coup d'œil.

---

### 1.5 · Les flux s'emboîtent

**Source** d12/9 à 12, réécrites

**Slide**

- Chaque classe se construit sur la précédente, et lui ajoute une capacité
- La classe `FileOutputStream` atteint le fichier, octet par octet
- Les suivantes regroupent les octets, puis traduisent les `int` en octets

```java
OutputStream fichier = new FileOutputStream("temperatures.bin");
OutputStream tampon = new BufferedOutputStream(fichier);
DataOutputStream sortie = new DataOutputStream(tampon);

sortie.writeInt(12);        // quatre octets
sortie.writeDouble(12.5);   // huit octets
sortie.close();             // ferme les trois
```

**Note**

Aucune classe ne fait tout. La première sait où écrire, mais seulement des
octets. La deuxième garde les octets dans un tampon, en mémoire, et ne
touche le disque que lorsqu'il est plein : beaucoup moins d'accès, beaucoup
plus rapide. La troisième sait traduire un `int` ou un `double` en octets.
On les emboîte comme des poupées russes, et on ne parle qu'à la dernière.

Le constructeur de chaque couche reçoit la couche du dessous. C'est pour
cela qu'on lit souvent ces créations sur une seule ligne, de droite à
gauche : `new DataOutputStream(new BufferedOutputStream(new
FileOutputStream(...)))`.

Fermer la couche extérieure ferme toutes les autres, et vide le tampon au
passage. La section 2 dira pourquoi cet appel à `close` ne suffit pas tel
qu'il est écrit ici.

Le même emboîtement existe à la lecture, avec `FileInputStream`,
`BufferedInputStream` et `DataInputStream` et ses méthodes `readInt` et
`readDouble`. Vous le retrouverez à la section 4.

---

### 1.6 · Exercices

**Slide**

- **FIC.1** - Trois classes qui se connaissent
- Aucun fichier : le modèle des deux exercices suivants

**Note**

`FIC.1` ne touche à aucun fichier. Il construit trois petites classes, un
étudiant inscrit à des cours donnés par des enseignants, que `FIC.2` et
`FIC.3` enregistreront de deux façons différentes.

Lisez l'encadré sur ce que retourne `getCours` avant d'écrire la méthode :
un test vérifie qu'on ne peut pas vider un étudiant à travers sa liste.

---

## Section 2 - Fermer quoi qu'il arrive

### 2.1 · Fermer quoi qu'il arrive

*(intercalaire)*

### 2.2 · Un flux ouvert se ferme

**Source** nouvelle ; d12/11 et 12 ; scénario EXC, slide 3.5

**Slide**

- Un flux ouvert retient le fichier, et le système en limite le nombre
- Tant que le flux n'est pas fermé, son tampon peut ne pas être écrit
- Le bloc `finally` garantit la fermeture, à condition d'y penser

```java
Writer sortie = new FileWriter("journal.txt");
try {
    sortie.write("Uccle;12");
} finally {
    sortie.close();     // meme si write echoue
}
```

**Note**

Un flux ouvert n'est pas qu'un objet Java. Le système d'exploitation a
ouvert le fichier pour lui, et ne le libère qu'à la fermeture. Sur certains
systèmes, un fichier resté ouvert ne peut plus être déplacé ni supprimé ;
partout, le nombre de fichiers ouverts à la fois est limité.

Il y a plus sournois. La plupart des flux d'écriture gardent ce qu'on leur
envoie dans un tampon, comme à la slide 1.5. Sans fermeture, le contenu peut
ne jamais atteindre le disque : le fichier existe, mais il est vide. Le
`FileWriter` de cet exemple, avant son `close`, n'a encore rien écrit.

Le module EXC vous a donné l'outil : le bloc `finally` s'exécute toujours,
exception ou non. Il suffit d'y penser à chaque fichier, et c'est
précisément là que tout le monde finit par oublier.

---

### 2.3 · Le `try` avec ressources

**Source** nouvelle ; renvoyée par le scénario EXC (« le `try` avec
ressources reste au module FIC »)

**Slide**

- La ressource se déclare entre les parenthèses du `try`
- Elle est fermée à la sortie du bloc, quoi qu'il arrive
- Toute classe qui implémente `AutoCloseable` s'y prête, dont `Scanner`

```java
try (Writer sortie = new FileWriter("journal.txt")) {
    sortie.write("Uccle;12");
}   // sortie.close() est appele ici, exception ou non
```

**Note**

C'est la même garantie que le `finally` de la slide précédente, mais
c'est le compilateur qui écrit la fermeture à votre place. On ne peut plus
l'oublier, et on ne peut plus la mal écrire.

Quelques règles de lecture. La variable déclarée entre parenthèses n'existe
que dans le bloc. On peut en déclarer plusieurs, séparées par un
point-virgule : elles sont fermées dans l'ordre inverse de leur ouverture.
Un `catch` et un `finally` peuvent suivre, comme pour un `try` ordinaire ;
la ressource est déjà fermée quand ils s'exécutent.

L'interface `AutoCloseable` ne déclare qu'une méthode, `close`. Toutes les
classes de flux l'implémentent, et `Scanner` aussi. Désormais, tout flux
s'ouvre dans un `try` avec ressources, dans les exemples de ce deck comme
dans vos exercices.

---

### 2.4 · `IOException`, une exception contrôlée

**Source** d12/11 et 13, réécrites ; scénario EXC, slide 2.4

**Slide**

- Un fichier peut manquer, être verrouillé, ou le disque être plein
- La classe `IOException` est contrôlée : traiter ou déclarer
- Ses filles précisent l'échec : `FileNotFoundException`, `EOFException`

```java
public static String premiereLigne(File fichier) throws IOException {
    try (Scanner entree = new Scanner(fichier)) {
        return entree.nextLine();
    }
}
```

**Note**

Une entrée-sortie dépend de ce que le programme ne contrôle pas : le disque,
les droits, les autres programmes. Le compilateur vous oblige donc à décider
quoi faire en cas d'échec, comme pour toute exception contrôlée vue au
module EXC : l'attraper là où l'on peut agir, ou la déclarer et laisser
l'appelant décider.

Ici, la méthode déclare. Le constructeur de `Scanner` lève une
`FileNotFoundException` si le fichier n'existe pas ; comme c'est une fille
d'`IOException`, la déclaration de la mère la couvre.

La seconde fille, `EOFException`, signale qu'on a voulu lire au-delà de la
fin d'un fichier binaire. La slide 4.6 dira quand on la rencontre.

Le choix entre traiter et déclarer vous revient dans les exercices. Les
signatures imposées par le fascicule l'indiquent souvent.

---

## Section 3 - Écrire et relire du texte

### 3.1 · Écrire et relire du texte

*(intercalaire)*

### 3.2 · Écrire comme sur la console

**Source** d12/21 à 25, réécrites

**Slide**

- La classe `PrintWriter` offre `print`, `println` et `printf`, comme `System.out`
- Elle se pose sur un `FileWriter`, qui atteint le fichier
- À l'ouverture, le fichier est vidé ; avec `true`, on écrit à la suite

```java
File fichier = new File("uccle.txt");
try (PrintWriter sortie = new PrintWriter(new FileWriter(fichier))) {
    sortie.println("Uccle;12");
    sortie.printf("%s;%d%n", "Ostende", 9);
}
```

**Note**

C'est l'emboîtement de la slide 1.5, dans la famille des caractères. Le
`FileWriter` sait écrire des caractères dans un fichier ; le `PrintWriter`
ajoute les méthodes que vous connaissez depuis le premier module. Tout ce
que vous saviez afficher, vous savez maintenant l'écrire.

Le fichier produit contient deux lignes, lisibles dans n'importe quel
éditeur. Chaque nombre y a été converti en chiffres, exactement comme
`println` le fait à la console.

Par défaut, `new FileWriter(fichier)` vide le fichier s'il existait déjà.
Pour ajouter des lignes à la fin, on écrit `new FileWriter(fichier, true)`.

Une particularité à connaître : les méthodes de `PrintWriter` ne lèvent
jamais d'exception, même si l'écriture échoue. Seul le constructeur du
`FileWriter` peut en lever une. La méthode `checkError` dit après coup si
quelque chose a mal tourné.

---

### 3.3 · Relire ligne par ligne

**Source** d12/26 à 28, réécrites

**Slide**

- La classe `Scanner` lit un fichier comme elle lit le clavier
- La méthode `hasNextLine` dit s'il reste une ligne, `nextLine` la retourne
- La boucle s'arrête d'elle-même à la fin du fichier

```java
File fichier = new File("uccle.txt");
try (Scanner entree = new Scanner(fichier)) {
    while (entree.hasNextLine()) {
        System.out.println(entree.nextLine());
    }
}
```

**Note**

Seul le constructeur change : `new Scanner(fichier)` au lieu de `new
Scanner(System.in)`. Les méthodes sont celles que vous utilisez depuis le
premier module.

La lecture n'est pas le miroir de l'écriture. On a écrit des nombres ; on
relit des lignes de caractères, et rien d'autre. Retrouver les nombres est
l'affaire de la slide suivante.

Vous rencontrerez aussi une autre écriture, plus ancienne :
`BufferedReader`, posé sur un `FileReader`, dont la méthode `readLine`
retourne `null` quand le fichier est épuisé. Les deux font le même travail ;
les corrigés du thème utilisent `Scanner`.

---

### 3.4 · Une ligne, plusieurs champs

**Source** d12/29 et 30, réécrites (`split` remplace `StringTokenizer`)

**Slide**

- Le texte ne garde que des caractères : à vous de choisir un séparateur
- La méthode `split` découpe la ligne, `Integer.parseInt` reconvertit
- L'écriture et la relecture suivent le même format, dans les deux sens

```java
String ligne = "Uccle;12";
String[] champs = ligne.split(";");

String station = champs[0];
int temperature = Integer.parseInt(champs[1]);
```

**Note**

Un fichier texte ne sait pas qu'il contient une station et une
température : il contient huit caractères. C'est le format, choisi par le
programmeur, qui dit où s'arrête un champ et où commence le suivant. Ici,
un point-virgule, et une ligne par relevé.

Ce format est un contrat entre deux morceaux de code : celui qui écrit et
celui qui relit. Changez l'un sans l'autre, et la relecture se trompe.

L'ancien cours découpait les lignes avec `StringTokenizer`. Cette classe
existe toujours, mais sa documentation elle-même conseille d'utiliser
`split` à sa place.

---

### 3.5 · Un nom n'est pas un fichier

**Source** d12/39 et 40, réécrites

**Slide**

- Un objet `File` désigne un chemin : le créer ne crée aucun fichier
- Il interroge le système : `exists`, `length`, `mkdirs`
- Les constructeurs de flux acceptent un `File` comme une chaîne

```java
File dossier = new File("releves");
File fichier = new File(dossier, "uccle.txt");

dossier.mkdirs();                       // cree le dossier s'il manque
System.out.println(fichier.exists());
System.out.println(fichier.length());   // en octets
```

**Note**

Le nom de la classe trompe : un `File` n'est pas un fichier, c'est son
adresse. On peut construire un `File` vers un fichier qui n'existe pas ;
c'est d'ailleurs ce qu'on fait chaque fois qu'on s'apprête à en écrire un.

Le constructeur à deux arguments, un dossier et un nom, évite d'écrire le
séparateur de dossiers à la main. Ce séparateur n'est pas le même sous
Windows et sous macOS ; Java le pose pour vous.

La méthode `mkdirs` crée le dossier et tous ses parents manquants. Sans
elle, ouvrir un flux vers un fichier d'un dossier absent lève une
`FileNotFoundException`.

Les signatures des exercices du thème reçoivent un `File`.

---

### 3.6 · `Path` et `Files` *(facultative)*

**Source** d12/41 et 42, réécrites et corrigées

**Slide**

- Depuis Java 7, l'interface `Path` désigne un chemin, comme `File`
- La classe `Files` regroupe des méthodes statiques prêtes à l'emploi
- Elles ouvrent et ferment le fichier elles-mêmes

```java
Path chemin = Path.of("releves", "uccle.txt");

Files.writeString(chemin, "Uccle;12\n");
List<String> lignes = Files.readAllLines(chemin);
```

**Note**

Slide facultative : on peut la sauter si le temps manque.

`Path` est la version récente de `File`, et `Files` lui ajoute des
raccourcis : une ligne pour écrire une chaîne, une ligne pour relire toutes
les lignes d'un fichier dans une liste. Ces méthodes ouvrent et ferment le
fichier elles-mêmes : pas de `try` avec ressources à écrire. Elles lèvent
les mêmes `IOException`.

`File` n'est pas pour autant déprécié, et les exercices l'emploient. Les
deux se convertissent l'un dans l'autre : `fichier.toPath()` et
`chemin.toFile()`.

Vous trouverez aussi `Paths.get(...)` dans du code plus ancien : il fait la
même chose que `Path.of`, apparu avec Java 11.

---

## Section 4 - Écrire l'objet tel quel

### 4.1 · Écrire l'objet tel quel

*(intercalaire)*

### 4.2 · Un format à inventer pour chaque classe

**Source** nouvelle ; d12/32, réécrite

**Slide**

- Le texte demande, pour chaque classe, un format, une écriture, une relecture
- Plus l'objet est riche, plus le format se complique
- Java sait-il écrire l'objet lui-même ?

**Note**

Un relevé tient sur une ligne : une station, une température. Mais un objet
qui en contient d'autres, une liste qui contient des objets qui en
contiennent d'autres encore, demande un format plus élaboré, et autant de
code pour le relire.

Java pourrait-il écrire un objet entier, d'une seule instruction, et le
reconstruire à la lecture ? Et si oui, qu'y gagne-t-on, et qu'y perd-on ?

C'est ce que la démonstration va essayer.

---

### 4.3 · Démonstration

**Source** `Demo_FIC.docx`, 25 minutes, avant FIC.2 et FIC.3

**Slide**

- Démo : les mêmes données, deux fois

**Note**

La démonstration écrit les mêmes données de deux façons : la première
avec ce que vous venez de voir, la seconde avec une instruction nouvelle.
Regardez ce que chaque version demande d'écrire, ce qui échoue, et ce que
contient chaque fichier.

La suite du deck reviendra sur ce que la démonstration a utilisé sans le
détailler.

---

### 4.4 · Les flux d'objets

**Source** d12/32, 34 à 36, réécrites ; scénario GEN, slides 3.3 et 3.5

**Slide**

- La classe `ObjectOutputStream` est une couche de plus, comme en 1.5
- Elle ajoute `writeObject` aux méthodes des types primitifs
- On relit dans l'ordre d'écriture, et on transtype

```java
// ecrire : les methodes de DataOutputStream, plus une
sortie.writeInt(2026);
sortie.writeObject(releve);

// relire : dans le meme ordre
int annee = entree.readInt();
Releve lu = (Releve) entree.readObject();
```

**Note**

`sortie` est un `ObjectOutputStream` posé sur un `FileOutputStream`, et
`entree` un `ObjectInputStream` posé sur un `FileInputStream`, chacun ouvert
dans un `try` avec ressources. C'est l'emboîtement de la slide 1.5, avec une
couche qui sait aussi écrire des objets. On appelle cette écriture la
sérialisation.

Le fichier ne garde pas d'étiquettes. La lecture doit suivre l'ordre de
l'écriture : un `int`, puis un objet. Lire dans un autre ordre donne des
valeurs fausses ou une exception.

La méthode `readObject` retourne un `Object`, d'où le transtypage. Si la
variable est générique, une `List<Releve>` par exemple, le transtypage ne
peut pas être vérifié : le fichier ne garde aucune trace de l'argument de
type. C'est l'effacement du module GEN, slides 3.3 et 3.5, qui montraient
déjà cette ligne.

La méthode `readObject` déclare aussi `ClassNotFoundException` : le
programme qui relit doit disposer de la classe de l'objet écrit, ce qui
n'est pas garanti.

---

### 4.5 · Une étiquette, pas un contrat

**Source** d12/33, réécrite et corrigée ; scénario ITF

**Slide**

- L'interface `Serializable` ne déclare aucune méthode : c'est un marqueur
- Rien n'est vérifié à la compilation : l'écriture échoue à l'exécution
- Le JDK l'a posée sur `String`, `Integer`, `ArrayList`, `LocalDate`…

```java
public class Releve implements Serializable {
    private final String station;
    private final int temperature;

    // constructeur et accesseurs : rien d'autre a ajouter
}
```

**Note**

Au module ITF, une interface était un contrat : des méthodes que la classe
s'engage à fournir. Celle-ci n'en déclare aucune. Elle sert d'étiquette :
la classe donne son accord pour que ses objets soient transformés en
octets. La démonstration a montré ce qui arrive sans elle.

Contrairement à ce que disait l'ancien cours, le compilateur ne vérifie
rien : une classe sans l'étiquette compile, et c'est l'écriture qui
échoue, une fois le programme lancé.

Les classes du JDK qui portent des données sont presque toutes déjà
étiquetées. C'est pourquoi une liste de chaînes ou de dates s'écrit sans
qu'on y pense, alors qu'une classe écrite par vous doit le déclarer.

---

### 4.6 · Où s'arrête un fichier

**Source** d12/15 et 28, réunies en tableau

**Slide**

| Méthode de lecture | Comment s'annonce la fin |
|---|---|
| `Scanner.nextLine` | `hasNextLine()` retourne `false` avant |
| `BufferedReader.readLine` | la méthode retourne `null` |
| `DataInputStream.readInt` | elle lève une `EOFException` |
| `ObjectInputStream.readObject` | elle lève une `EOFException` |

**Note**

Une lecture finit toujours par atteindre la fin du fichier, et chaque
classe le dit à sa manière. Le texte prévient : on demande avant de lire,
ou on reçoit `null`. Le binaire ne prévient pas : on lit, et une exception
répond qu'il n'y avait plus rien.

L'exception signale ici une situation normale, et non une erreur. On peut boucler jusqu'à elle, mais il est plus simple de
savoir d'avance combien d'éléments relire, par exemple en écrivant d'abord
leur nombre.

`EOF` signifie *end of file*, fin de fichier.

---

### 4.7 · Exercices

**Slide**

- **FIC.2** - Enregistrer des objets
- **FIC.3** - Enregistrer du texte

**Note**

`FIC.2` et `FIC.3` enregistrent exactement les mêmes étudiants, l'un en
objets, l'autre en texte. Faites-les dans cet ordre, et ouvrez les deux
fichiers produits, comme dans la démonstration.

`FIC.2` vous fournit les classes de `FIC.1`, déjà étiquetées. `FIC.3` vous
impose un format : lisez l'avertissement sur `split` avant d'écrire la
relecture.

Les questions de fin des deux exercices n'ont pas de réponse dans ce deck.
Cherchez-les vraiment : elles disent ce qu'on choisit vraiment en
choisissant un format.

---

## Section 5 - Le fil rouge

### 5.1 · Le fil rouge

**Source** `GameHub_enonces.docx`, G.13 et G.35

**Slide**

- **G.35** - Un journal qui survit *(fil rouge GameHub)*
- Chaque partie écrite dans un fichier, relue au lancement

**Note**

Depuis `G.13`, GameHub a un journal, mais il ne garde rien : il compte les
coups d'une partie et les annonce sur la console. Et le hub ne joue qu'une
partie par lancement. Sans fichier, aucune partie ne survit à la suivante.

`G.35` donne une mémoire au journal : chaque partie terminée s'écrit dans
un fichier, et au lancement suivant GameHub relit ce fichier pour afficher
l'historique.

Avant d'écrire une ligne, décidez du format, avec la question des
exercices du thème : qui lira ce journal, et quand ?

**Réserve** `G.35` est à écrire dans le projet GameHub, après `G.34`.
Un découpage en deux incréments (garder en mémoire, puis écrire) a été
envisagé et écarté : le hub ne jouant qu'une partie par lancement, une
mémoire sans fichier ne montrerait rien. La note a été corrigée après
lecture du code : `JournalParties` ne garde aucune partie.
