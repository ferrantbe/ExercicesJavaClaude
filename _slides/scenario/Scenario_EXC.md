# Scénario du module EXC — Exceptions

*Quatre sections, 24 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_exc.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Un objet qui interrompt | Le mécanisme |
| 2 | Lever, puis déclarer | Lever et déclarer |
| 3 | Attraper là où l'on peut agir | Attraper |
| 4 | Ce que le compilateur ne voit pas | Les non contrôlées |

La slide du fil rouge (5.1) n'a pas d'intercalaire, comme la slide 7.1 du
deck ITF et les slides 8.1 et 8.2 du deck COL.

**Sources** : deck 06 (`06__Java_IN2_2026_-_Exceptions.pptx`, renommé
`d06.pptx`, intercalaire en slide 20), `EXC_enonces.docx` (avec EXC.6), `Demo_EXC.docx` (version à cinq étapes) et
son code dans `demos/…/demo/exc/`, les corrigés de `be.ephec.java.exc`,
`JUN_enonces.docx` (ce qu'il attend, pas ce qu'il enseigne),
`GameHub_enonces.docx` (G.15, G.24, G.29), `Memento_Clean_Code.docx`
(CC-ERR.1, 4, 5 et 6), `Memento_Technique.docx` (TEC-EXE.1), les six sessions
d'examen 2022 à 2025.

**Place dans le cours** : dixième deck, après COL. Les classes abstraites,
l'héritage, le polymorphisme, les interfaces et les collections sont connus.
JUN, GEN, LAM, FX et FIC viennent après.

**Le partage avec la démonstration et le fascicule** :

- La démonstration, jouée en ouverture, fait planter un programme, lit la
  trace dans le bon sens, discute trois corrections, lève une exception dans
  la méthode fautive, l'attrape dans le `main`, et montre le `catch` vide. Le
  deck ne refait rien de tout cela : il la nomme (1.2) et s'appuie dessus.
- Le fascicule porte la syntaxe minimale, le tableau contrôlée ou non
  contrôlée, la règle « calculer, vérifier, écrire » (EXC.1), la question
  trois exceptions ou une seule (EXC.3, CC-ERR.5), les messages imposés
  (CC-ERR.4), le message calculé qui devient absurde (EXC.4) et la lecture
  d'une trace (EXC.5). Le deck ne les répète pas.
- Le deck porte ce que ni l'un ni l'autre ne pose : l'exception comme objet
  et sa hiérarchie, la remontée de la pile, l'écriture d'une classe
  d'exception, `throw` et `throws`, attraper ou déclarer, ce que le `try`
  saute, plusieurs `catch`, le `catch` qui agit, `finally`, et les exceptions
  du JDK à réutiliser.

**Décisions appliquées** :

- Le deck pose les notions sans répondre aux questions des exercices. Restent
  ouvertes exprès : contrôlée ou non pour `MoveException`, et ce qu'est un
  déplacement refusé (EXC.1) ; ce que garantit une validation dans le
  constructeur, et ce que dit le compilateur de deux `catch` dans le mauvais
  ordre (EXC.3) ; la même exception pour les deux bornes, la taille du bloc
  `try`, et pourquoi ces exceptions ne sont pas contrôlées (EXC.4) ; la cause
  située ailleurs que le lieu de l'erreur, et le choix entre une garde et un
  `try` (EXC.5) ; ce que devient la caisse après un `return` dans le `try`
  (EXC.6). La slide 3.3 montre plusieurs `catch` sans dire dans quel
  ordre les écrire.
- EXC.4 garde l'ordre découvrir puis corriger. Aucune slide ni note ne nomme
  `NegativeArraySizeException` ni `ArrayIndexOutOfBoundsException` : c'est en
  lisant leurs messages que l'étudiant les découvre. Le renvoi (4.3) suit
  immédiatement la slide qui montre qu'une exception non contrôlée compile
  sans rien dire, et précède les exceptions du JDK à réutiliser.
- Les exemples utilisent un domaine neutre, un ascenseur, pour ne réutiliser
  ni les classes des exercices (`Point`, `Compte`, `Tableau`, `Sort`), ni
  celles de la démonstration (`Panier`), ni celles des sessions d'examen
  (`Segment`, `Fraction`, `Produit`, `LivreDejaEmprunteException`).
- `IllegalArgumentException`, `IllegalStateException` et
  `UnsupportedOperationException` sont enseignées (4.4 et 4.5) parce que
  JUN.3 et chaque session d'examen depuis 2024 demandent d'en lever une « sans
  la créer », alors qu'aucun exercice EXC ne le pratique.
- Le `catch` qui agit (3.4) s'appuie sur la nouvelle règle CC-ERR.6, ajoutée
  au mémento pour ce deck. Les démos EXC et FIC y renvoient désormais.
- `finally` est enseigné (3.5) parce que la démonstration FIC le suppose
  connu, et pratiqué par EXC.6, écrit pour ce deck sur le modèle découvrir
  puis corriger. Le `try` avec ressources reste au module FIC.
- JUN est préparé sans être enseigné : la slide 2.4 annonce qu'on retrouvera
  le `throws` dans les tests, rien de plus. Ni `assertThrows` ni sa lambda.
- Le fil rouge est relu, pas annoncé : G.15 et G.24 sont faits depuis le
  module ITF et le module COL.
- Retirés de l'ancien deck : le rappel du cours précédent, les sept exercices
  COL et les huit slides GameHub (déjà au deck COL), les deux expériences
  `divideBy` et `Truc` (la démonstration les remplace), la slide
  `printStackTrace` (la démonstration et EXC.5), l'exception à champs
  publics, les six énoncés d'exercices (le fascicule), le sommaire répété
  six fois.

**Défauts du deck d'origine corrigés** :

- Une donnée incorrecte reçue par une méthode classée parmi les événements
  « hors contrôle et non prévisibles » (06/26) : c'est l'exemple même de
  l'erreur prévisible, et la contradiction avec le tableau du fascicule est
  complète. Retiré.
- « Gestionnaire d'instructions » (06/27) pour gestionnaire d'exceptions.
  Retiré.
- `System.exit(-1)` dans un `catch` (06/34) : le programme meurt au lieu de
  traiter. Retiré, et contraire à CC-ERR.6.
- Une exception à champs `public int abs, ord` (06/51 à 53) : l'encapsulation
  du module POO ne s'arrête pas aux exceptions. Retiré, le message suffit.
- `ArrayIndexOutOfBoundException` (06/44), sans le « s » de `Bounds`. Retiré.
- Des exceptions « levées par la clause `throws` » (06/63) : la clause
  déclare, c'est `throw` qui lève. Corrigé en 2.3.
- Toutes les exceptions « dérivées de la classe `Exception` » (06/62) : les
  `Error` n'en dérivent pas. Corrigé en 1.4.

---

## Section 0 — Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module EXC
- Exceptions

**Note**

Jusqu'ici, quand quelque chose tournait mal, le programme s'arrêtait sur un
message rouge, ou continuait avec une valeur fausse. Ce module donne un moyen
de dire ce qui ne va pas, à l'endroit où on le constate, et de le traiter à
l'endroit où l'on peut y faire quelque chose.

Ce sont deux gestes distincts, faits à deux endroits différents : lever et
attraper. Presque tout ce qui suit découle de cette séparation.

Le thème compte six exercices. Il pèse aussi à l'examen : chaque session
depuis 2022 commence par une classe qui lève ses propres exceptions.

---

## Section 1 — Un objet qui interrompt

### 1.1 · Un objet qui interrompt

*(intercalaire)*

### 1.2 · Démonstration

**Source** `Demo_EXC.docx`, 12 à 14 minutes, avant EXC.1

**Slide**

- Démo : faire planter, lire la trace, corriger

**Note**

La démonstration part d'un panier dont on demande la moyenne alors qu'il est
vide. Le premier essai ne plante pas du tout : il affiche une valeur absurde,
sans rien signaler. Le second plante, et c'est un progrès. On lit alors la
trace ensemble, dans le bon sens, puis on discute trois corrections avant
d'en coder une.

Retenez deux choses plutôt que la syntaxe. Un plantage bruyant vaut mieux
qu'un résultat faux qui continue en silence. Et on lève une exception là où
l'on constate le problème, on l'attrape là où l'on peut y faire quelque chose.

Le reste du module met des mots et des règles sur ce qui vient d'être montré.

---

### 1.3 · Vous en levez déjà

**Source** nouvelle

**Slide**

- Chaque squelette du cours contient déjà cette ligne
- La fabrique de G.15 aussi
- Ce module lui donne un nom, et des règles

```java
public int etageCourant() {
    throw new UnsupportedOperationException(
            "etageCourant n'est pas encore implementee");
}
```

**Note**

Depuis le module POO, chaque méthode à compléter contient une ligne de ce
genre. Vous avez vu le test passer au rouge avec ce message, sans vous
demander d'où il venait : c'était une exception, levée exprès.

Quand l'incrément G.15 vous a demandé de lever « une exception explicite »
dans la fabrique, la plupart d'entre vous ont recopié ce geste. C'était le
bon.

Ce module explique ce qui se passe quand cette ligne s'exécute, comment
écrire vos propres exceptions, et comment les attraper.

---

### 1.4 · Une exception est un objet

**Source** nouvelle, à partir de d06/44 et 62

**Slide**

- Un objet, créé par `new`, d'une classe qui hérite de `Throwable`
- Une `Error` signale que la machine elle-même est en difficulté
- Une `Exception` signale ce que le programme peut traiter

```java
Throwable
 |-- Error                    ne s'attrape pas
 |-- Exception                controlee
      |-- RuntimeException    non controlee
```

**Note**

Une exception n'a rien de magique : c'est un objet, d'une classe comme les
autres, que l'on crée avec `new`. Au moment de sa création, il mémorise un
message et l'état de la pile des appels. C'est ce qu'affiche la trace.

Toutes les exceptions descendent de `Throwable`. Les `Error`, comme
`OutOfMemoryError` ou `StackOverflowError`, disent que la JVM elle-même ne
peut plus continuer. On ne les attrape pas : il n'y a rien à faire d'utile à
ce moment-là.

Sous `Exception`, une branche compte particulièrement : `RuntimeException`.
Ses descendantes sont dites non contrôlées, les autres contrôlées. La
différence porte sur ce que le compilateur exige, et la slide 2.4 la montre.
Le tableau du fascicule dit quand choisir l'une ou l'autre.

---

### 1.5 · Elle remonte la pile

**Source** d06/27, réécrite ; rappel du mémento technique, TEC-EXE.1

**Slide**

- Le `throw` interrompt la méthode à l'instant même
- L'exception remonte d'appelant en appelant, jusqu'à un `catch`
- Sans `catch`, le programme s'arrête et affiche la trace

```java
void monter(int etage) {
    verifier(etage);       // l'exception traverse monter
    deplacer(etage);       // jamais execute
}

void verifier(int etage) {
    if (etage > dernierEtage) {
        throw new IllegalArgumentException("Etage " + etage
                + " au-dela du dernier, " + dernierEtage);
    }
}
```

**Note**

Quand `verifier` lève l'exception, elle ne retourne pas : elle s'arrête net.
La méthode `monter` ne reprend pas non plus à la ligne suivante. L'exception traverse
chaque méthode de la pile, de la plus récente à la plus ancienne, et chacune
est abandonnée à son tour, jusqu'à ce qu'un `catch` l'arrête.

Si aucune ne le fait, l'exception sort du `main`, et la JVM affiche la trace.
La trace est exactement la pile des appels décrite en TEC-EXE.1, figée au
moment de la création de l'exception. C'est ce que la démonstration a lu.

L'exception `IllegalArgumentException` vient du JDK. On y revient à la
section 4.

---

## Section 2 — Lever, puis déclarer

### 2.1 · Lever, puis déclarer

*(intercalaire)*

### 2.2 · Écrire sa classe d'exception

**Source** d06/30, 54 et 55, réécrites

**Slide**

- Une classe qui hérite d'`Exception`
- Un constructeur qui reçoit le message
- Et qui le transmet à la classe mère par `super`

```java
public class EtageInaccessibleException extends Exception {

    public EtageInaccessibleException(String message) {
        super(message);
    }
}
```

**Note**

Une exception à soi tient en ces quelques lignes. Tout le travail est déjà
fait par `Exception` : mémoriser le message, capturer la pile, se laisser
attraper. La méthode `getMessage()` retourne le message transmis à `super`.

Inutile d'y ajouter des champs : un message qui dit ce qui était attendu et
ce qui a été reçu suffit presque toujours. C'est la règle CC-ERR.4.

Le nom se termine par `Exception`, par convention. Le choix de la classe
mère, `Exception` ou `RuntimeException`, a une conséquence que la slide 2.4
montre. Le critère est dans le tableau du fascicule.

À l'examen, la première question de chaque session demande d'écrire une
classe de ce genre.

---

### 2.3 · Lever avec `throw`, déclarer avec `throws`

**Source** d06/31 et 32, réécrites

**Slide**

- Le mot `throw` lève l'exception, dans le corps
- Le mot `throws` l'annonce, dans la signature
- Un constructeur se déclare de la même façon

```java
public void appeler(int etage) throws EtageInaccessibleException {
    if (etage < 0 || etage > dernierEtage) {
        throw new EtageInaccessibleException("Etage " + etage
                + " hors de l'intervalle 0 a " + dernierEtage);
    }
    etageCourant = etage;
}
```

**Note**

Les deux mots se ressemblent et ne font pas la même chose. Le mot `throw`
est une instruction : il crée l'objet et l'envoie. Le mot `throws` fait partie de la
signature : il prévient l'appelant que cette méthode peut échouer de cette
façon.

Une méthode peut déclarer plusieurs exceptions, séparées par des virgules. Un
constructeur s'écrit de la même manière : `throws` après la parenthèse.

Remarquez le message : il nomme l'étage demandé et l'intervalle permis.
Quelqu'un qui lira la trace sans le code saura quoi corriger.

---

### 2.4 · Attraper ou déclarer

**Source** nouvelle, à partir de d06/42

**Slide**

- Pour une exception contrôlée, le compilateur exige un choix
- Attraper : la traiter ici, avec `try` et `catch`
- Déclarer : la laisser passer à l'appelant, qui aura le même choix

```java
void depuisLeBouton(int etage) {
    try {
        ascenseur.appeler(etage);
    } catch (EtageInaccessibleException e) {
        System.out.println("Refus : " + e.getMessage());
    }
}

void depuisLeBadge(int etage) throws EtageInaccessibleException {
    ascenseur.appeler(etage);
}
```

**Note**

Dès qu'une méthode appelle `appeler`, le compilateur refuse de compiler tant
qu'elle n'a pas choisi. Ce n'est pas une politesse : c'est la seule chose que
le compilateur sait vérifier à propos des erreurs, et il le fait pour les
exceptions contrôlées seulement.

Aucun des deux choix n'est le bon dans l'absolu. On attrape quand on peut
faire quelque chose d'utile. Sinon, on déclare, et la question remonte d'un
cran. Déclarer jusqu'au `main` revient à laisser le programme s'arrêter sur
une trace.

Pour une exception non contrôlée, le compilateur n'exige rien. C'est la
section 4.

Vous retrouverez ce `throws` dans les tests du module JUN : une méthode de
test qui appelle une méthode capable d'échouer doit, elle aussi, choisir.

---

### 2.5 · Exercices

**Slide**

- **EXC.1** - Lever sa propre exception
- **EXC.2** - Un compte, sans exception
- Messages : CC-ERR.4

**Note**

`EXC.1` met en pratique les trois slides précédentes : une classe
d'exception, une méthode qui la lève, un programme qui l'attrape. Lisez
l'encadré sur le vrai piège avant d'écrire la moindre ligne : le test vérifie
ce que devient le point quand le déplacement est refusé.

Les deux questions de fin portent sur le choix de la classe mère. Elles
valent la peine d'être posées à voix haute.

`EXC.2` fait exprès l'inverse : un compte, sans aucune exception. Gardez la
réponse à sa question finale, elle sert à l'exercice suivant.

---

## Section 3 — Attraper là où l'on peut agir

### 3.1 · Attraper là où l'on peut agir

*(intercalaire)*

### 3.2 · Ce que le `try` saute

**Source** d06/33 et 34, réécrites

**Slide**

- Au premier `throw`, le reste du `try` est abandonné
- Le `catch` s'exécute, puis tout ce qui le suit
- Sans exception, le `catch` est simplement ignoré

```java
try {
    ascenseur.appeler(2);
    ascenseur.appeler(9);              // leve l'exception
    System.out.println("Arrive");      // jamais affiche
} catch (EtageInaccessibleException e) {
    System.out.println("Refus : " + e.getMessage());
}
System.out.println("Fin");             // toujours affiche
```

**Note**

Le programme ne retourne jamais dans le `try` après un `catch`. Ce qui
suivait l'instruction fautive est perdu, et l'exécution reprend après le
dernier `catch`.

Le premier appel a réussi : l'ascenseur est bien au deuxième étage. Le second
a échoué avant de modifier quoi que ce soit, si `appeler` est bien écrite.
C'est tout l'enjeu de l'encadré d'`EXC.1`.

Une variable déclarée dans le `try` n'existe pas dans le `catch`, ni après :
déclarez-la avant si vous en avez besoin des deux côtés.

---

### 3.3 · Plusieurs `catch`, ou un seul

**Source** d06/43, réécrite ; rappel du module ABS

**Slide**

- Un `try` peut être suivi de plusieurs `catch`
- Un `catch` attrape aussi les sous-classes de son type
- Une barre verticale réunit deux types dans le même `catch`

```java
try {
    ascenseur.appeler(etage);
    porte.ouvrir();
} catch (EtageInaccessibleException e) {
    afficher("Etage refuse : " + e.getMessage());
} catch (PorteBloqueeException | CoupureException e) {
    signalerPanne(e.getMessage());
}
```

**Note**

Quand une exception sort du `try`, Java essaie les `catch` un par un, de haut
en bas, et exécute le premier dont le type convient. Les suivants sont
ignorés.

Convenir veut dire la même chose qu'au module ABS : une
`EtageInaccessibleException` est aussi une `Exception`. Un `catch` écrit pour
une classe mère attrape donc toutes ses filles. C'est ce qui permet, dans
`EXC.3`, de traiter trois erreurs par un seul bloc.

La barre verticale réunit des types qui n'ont pas de lien d'héritage entre
eux, quand le traitement est le même.

Faut-il un `catch` par exception, ou un seul pour toute la famille ? Le
fascicule pose la question à `EXC.3`, et la règle CC-ERR.5 y répond.

---

### 3.4 · Un `catch` fait quelque chose

**Source** nouvelle ; démonstration EXC, ce qu'il faut rater exprès

**Slide**

- Un `catch` vide cache l'erreur sans la résoudre
- Traiter, informer, ou ne pas attraper du tout
- Règle CC-ERR.6

```java
try {
    ascenseur.appeler(etage);
} catch (EtageInaccessibleException e) {
    System.out.println("Refus : " + e.getMessage());
    ecran.proposerEtagesValides();
}
```

**Note**

La démonstration a montré le `catch` vide : le programme ne dit plus rien, et
tout semble aller bien. Le plantage était bruyant mais honnête, ce silence
ment. L'erreur ressurgira plus loin, à un endroit qui n'a plus rien à voir
avec sa cause.

Trois réactions sont honnêtes. Traiter : redemander, proposer autre chose,
prendre une valeur de repli que l'on assume. Informer : dire ce qui a échoué.
Ou ne pas attraper du tout, et laisser l'exception remonter jusqu'à quelqu'un
qui saura quoi en faire.

Une nuance, que vous croiserez dans GameHub. Attraper une exception pour
redemander une saisie est un vrai traitement, même quand l'objet exception ne
sert plus. On nomme alors la variable `ignoree` : le nom dit que c'est voulu.

---

### 3.5 · Ce que `finally` garantit

**Source** d06/60, développée

**Slide**

- Le bloc `finally` s'exécute toujours, exception ou non
- Même quand l'exception n'est pas attrapée
- Il sert à remettre les choses en place

```java
void deplacer(int etage) throws EtageInaccessibleException {
    porte.verrouiller();
    try {
        ascenseur.appeler(etage);
    } finally {
        porte.deverrouiller();         // dans tous les cas
    }
}
```

**Note**

Cette méthode n'attrape rien : elle déclare l'exception et la laisse passer.
Mais la porte doit être déverrouillée, que l'appel réussisse ou non. Écrire
`deverrouiller` après le `try` ne suffirait pas : en cas d'exception, la ligne
ne serait jamais atteinte.

Le bloc `finally` s'exécute à la sortie du `try`, que celui-ci se termine
normalement ou par une exception, attrapée ou non. Il peut suivre un `catch`,
ou se passer de `catch` comme ici.

On s'en sert pour libérer ce qu'on a pris : un verrou, une connexion, un
fichier ouvert. Le module FIC montrera une écriture plus courte pour les
fichiers, qui fait ce travail toute seule.

---

### 3.6 · Exercices

**Slide**

- **EXC.3** - Un numéro de compte vérifié
- **EXC.6** - Ce que finally garantit
- Exceptions : CC-ERR.4, CC-ERR.5

**Note**

`EXC.3` reprend le compte de l'exercice précédent et lui ajoute un numéro
vérifié. Les messages sont imposés au caractère près : chacun dit ce qui
était attendu et ce qui a été reçu.

L'encadré du fascicule pose la question qui fait l'exercice : trois
exceptions ou une seule. Essayez les quatre numéros fournis avant de décider
combien de `catch` écrire. Et faites l'expérience de la seconde question :
le compilateur a quelque chose à dire.

`EXC.6` fait constater ce que la slide 3.5 affirme. La première version
ouvre la caisse, encaisse, puis la referme, trois gestes à la suite : un seul
test échoue, et son nom dit pourquoi. La seconde version déplace la fermeture
dans un `finally`, sans ajouter de `catch`.

---

## Section 4 — Ce que le compilateur ne voit pas

### 4.1 · Ce que le compilateur ne voit pas

*(intercalaire)*

### 4.2 · Une exception que personne n'annonce

**Source** d06/22 à 24, réécrites, avec un autre exemple

**Slide**

- Une `RuntimeException` n'exige ni `try` ni `throws`
- Le code compile donc sans un mot
- Et le programme s'arrête à l'exécution

```java
String saisie = "douze";
int etage = Integer.parseInt(saisie);   // compile sans rien dire

// Exception in thread "main" java.lang.NumberFormatException:
//     For input string: "douze"
```

**Note**

La méthode `Integer.parseInt` peut échouer, et sa signature n'en dit rien :
`NumberFormatException` hérite de `RuntimeException`. Le compilateur ne
demande donc ni `try` ni `throws`, et le programme plante à la première
saisie qui n'est pas un nombre.

La JVM lève elle-même plusieurs exceptions de cette famille. Vous avez déjà
rencontré `ArithmeticException` pendant la démonstration, et
`NullPointerException` sans doute plus d'une fois. Elles peuvent survenir
presque partout, et le compilateur ne vous prévient d'aucune.

C'est tout le piège de l'exercice suivant.

---

### 4.3 · Exercices

**Slide**

- **EXC.4** - Provoquer, puis traiter
- D'abord sans aucun `try`

**Note**

`EXC.4` se fait dans un ordre précis, et cet ordre est l'exercice.

Écrivez d'abord le programme sans aucun `try`. Lancez-le avec une taille
négative, puis avec une position hors du tableau. Lisez les deux messages :
ils vous disent quelles exceptions attraper. Constatez surtout deux choses :
le code a compilé sans rien dire, et le programme s'arrête net, la boucle ne
repart pas.

Seulement ensuite, écrivez `placerDouze`, qui traite les deux cas. Relancez
le même programme, avec les mêmes saisies : la boucle survit, et vous pouvez
réessayer. C'est la différence que l'exercice veut faire voir.

Ne sautez pas la première partie. Sans elle, vous saurez écrire le `try`,
mais vous ne saurez pas pourquoi il est là.

---

### 4.4 · Réutiliser plutôt que créer

**Source** nouvelle ; d06/62 et 63, réécrites

**Slide**

| Exception | Elle signale |
|---|---|
| `IllegalArgumentException` | un paramètre refusé |
| `IllegalStateException` | un objet dans le mauvais état |
| `UnsupportedOperationException` | une opération absente |

**Note**

Le JDK contient déjà des exceptions pour les cas les plus courants. Toutes
trois sont non contrôlées, et vivent dans `java.lang` : aucun import n'est
nécessaire.

La première dit que l'appelant a passé une valeur qui n'a pas de sens, comme
un dernier étage négatif. La deuxième dit que la demande était peut-être
correcte, mais pas à ce moment-là, parce que l'objet n'est pas dans le bon
état : appeler un ascenseur en panne. La troisième dit qu'une opération
n'existe pas, ou pas encore : c'est celle de vos squelettes.

Quand l'une d'elles dit exactement ce qui se passe, servez-vous-en. On crée
sa propre exception quand l'appelant doit pouvoir la distinguer des autres,
ou quand il doit être obligé de s'en soucier.

À l'examen, l'énoncé précise souvent « il ne faut pas la créer » : c'est
l'une de celles-ci.

---

### 4.5 · Lever une exception du JDK

**Source** nouvelle

**Slide**

- Elle se lève comme les autres, sans `throws` à déclarer
- Le message dit ce qui était attendu et ce qui a été reçu
- Règle CC-ERR.4

```java
public Ascenseur(int dernierEtage) {
    if (dernierEtage < 0) {
        throw new IllegalArgumentException(
                "Le dernier etage doit etre positif ou nul, pas " + dernierEtage);
    }
    this.dernierEtage = dernierEtage;
}
```

**Note**

Rien ne change par rapport à vos propres exceptions, sinon qu'il n'y a rien à
écrire ni à déclarer. Le constructeur ci-dessus n'a pas de clause `throws` :
l'exception n'est pas contrôlée.

Le message reste votre responsabilité. `new IllegalArgumentException()` sans
message ne dit rien à celui qui lira la trace : nommez ce qui était attendu,
et la valeur reçue.

Le module JUN vous demandera d'écrire une méthode qui lève une
`IllegalArgumentException`, et de le vérifier.

---

### 4.6 · Exercices

**Slide**

- **EXC.5** - Lire une trace
- Pile d'appels : TEC-EXE.1

**Note**

`EXC.5` refait seul ce que la démonstration a fait avec vous : lancer un
programme qui plante, et lire la trace avant de toucher au code.

Recopiez exactement ce que dit la trace, ponctuation comprise. L'une des
réponses ne ressemble à aucun nom que vous avez écrit, et c'est elle qui
apprend quelque chose.

La correction demandée ensuite se fait sans modifier la classe fautive. Les
deux questions de fin méritent d'être discutées à plusieurs.

---

## Section 5 — Le fil rouge

### 5.1 · Le fil rouge, relu

**Slide**

- **G.15** - La fabrique *(fil rouge GameHub)*
- **G.24** - La méthode jouer, mise en place *(fil rouge GameHub)*
- Relire son code avec le vocabulaire du module

**Note**

GameHub n'a pas d'incrément consacré aux exceptions, mais il en lève depuis
longtemps. Relisez deux passages avec ce que vous savez maintenant.

`G.15` demandait de lever une exception explicite pour les jeux pas encore
écrits. C'est une `UnsupportedOperationException`, slide 4.4 : non
contrôlée, donc la fabrique n'a rien eu à déclarer. Son message nomme-t-il le
type de jeu refusé ?

`G.24` demandait de lever une `IllegalArgumentException` si l'un des deux
joueurs est `null`. Vous savez maintenant pourquoi celle-là : c'est un
paramètre refusé, slide 4.4. Votre message dit-il lequel manque ?

Enfin, si votre GameHub lit des nombres au clavier, regardez ce que fait
votre `catch`. Redemander est un traitement, rester muet ne l'est pas :
CC-ERR.6.

**Réserve** La note suppose la nouvelle consigne de `G.24` (lever une
`IllegalArgumentException` si un joueur est `null`), rédigée pendant la
fabrication de ce deck et à reporter dans le projet GameHub, avec la
correction du renvoi de `G.29` (CC-ERR.1 au lieu de CC-ERR.2).
