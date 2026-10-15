# Scénario du module JUN - Tests unitaires avec JUnit

*Cinq sections, 31 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_jun.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | À vous d'écrire les tests | À vous d'écrire les tests |
| 2 | Ce qu'un test contient | Écrire un test |
| 3 | Vérifier tout le contrat | Vérifier un contrat |
| 4 | Choisir ses cas, et les justifier | Choisir et justifier |
| 5 | Du code qui se laisse tester | La testabilité |

La section 5 n'a pas de slide d'exercices : aucun exercice JUN ne la pratique.
Il n'y a pas de slide du fil rouge : GameHub n'a pas encore d'incrément JUnit
(« tester `JeuFactory` et `Deck` » reste à faire dans la liste de refonte).

**Sources** : deck 07 (`07__Java_IN2_2026_-_JUnit.pptx`, renommé `d07.pptx`,
intercalaire en slide 12, même structure que d06/20), `JUN_enonces.docx`,
`Demo_JUN.docx` et ses deux états du code (`RomainTest` compris), les squelettes, tests et corrigés
de `be.ephec.java.jun`, `Memento_Clean_Code.docx` (CC-TST.1 à 3, CC-NOM.1,
CC-ERR.6), `Memento_Exercices.docx`, `Memento_Technique.docx` (TEC-MVN.2),
`Scenario_EXC.md` (slide 2.4, qui annonce le `throws` des tests),
`Scenario_ITF.md` (slide 4.2, qui annonce le test sans fenêtre),
`Objectifs_et_couverture.xlsx`, les six sessions d'examen 2022 à 2025.

**Place dans le cours** : onzième deck, après EXC. Les classes, les interfaces,
les collections et les exceptions sont connues, `throw`, `throws` et
`IllegalArgumentException` compris. GEN, LAM, FX et FIC viennent après : les
lambdas ne sont pas connues.

**Le poids du module** : trois exercices seulement, mais quatre objectifs de
l'examen ne reposent que sur lui (B.1, B.2, B.3 et C.2 dans
`Objectifs_et_couverture.xlsx`), et la troisième question de chacune des six
sessions est une classe de test à écrire. Le deck est dimensionné sur ces
objectifs, pas sur le nombre d'exercices.

**Le partage avec la démonstration et le fascicule** :

- La démonstration, jouée avant JUN.1, montre le cycle rouge, vert, nettoyer
  sur `Romain` : le test écrit d'abord, l'échec voulu, le `return 1;`, le cas
  `IV` que seul le test fait découvrir, le nettoyage sans crainte, et le test
  sans assertion qui passe au vert. Le deck la nomme (1.4) et ne refait aucun
  de ces gestes. Le mot TDD n'apparaît dans aucune slide.
- Le fascicule porte le renversement en prose (« Ce thème fonctionne à
  l'envers »), les trois temps d'un test, la tolérance des `double`, les cinq
  clauses du contrat de la tirelire, la liste des cas de `Moyenne`, et ce que
  `RedactionTest` vérifie ou non. Le deck ne les répète pas.
- Le deck porte ce que ni l'un ni l'autre ne pose : qui écrit quoi dans ce
  module (1.2), où vit une classe de test, l'ordre des arguments
  d'`assertEquals`, les assertions courantes, la lecture d'un test rouge,
  la lecture d'une documentation comme une liste de tests, `assertThrows`, le
  `throws` d'une méthode de test, l'état après l'échec, la méthode pour
  choisir ses cas, le nommage, l'isolement des tests et `@BeforeEach`, la
  justification d'un test par le défaut qu'il attrape, la forme de la
  question d'examen, et la doublure d'une interface.

**Décisions appliquées** :

- Le renversement est posé dès la première slide de contenu (1.2), sous une
  forme que le fascicule n'a pas : un tableau qui dit, exercice par exercice,
  ce qui est fourni et ce qui est à écrire. JUN.1 y figure honnêtement comme
  la charnière : c'est le dernier exercice où le test est fourni.
- Le deck pose les notions sans répondre aux questions des exercices. Restent
  ouvertes exprès : plusieurs `assertEquals` dans un test contre CC-TST.2, et
  l'utilité du message d'échec (JUN.1) ; laquelle des tirelires se trompe
  ailleurs que dans l'exception, et laquelle passerait sans la cinquième
  clause (JUN.2) ; le test vert qui ne vérifie rien, et l'expérience du `>`
  au lieu de `>=` sur `Moyenne` (JUN.3). La slide 4.5 montre le principe sur
  la salle, avec un autre défaut de borne, sans faire l'expérience à la place
  de l'étudiant.
- `assertThrows` est enseignée avec sa lambda comme une forme à recopier
  (3.3) : JUN.1 la contient déjà, JUN.3 et deux sessions d'examen l'exigent,
  et le module LAM vient après. Ni `Executable`, ni les varargs, ni
  `assertAll` : la liste de refonte les envoyait en annexe.
- Les exemples utilisent un domaine neutre, une salle de spectacle, pour ne
  réutiliser ni les classes des exercices (`Calculatrice`, `Tirelire`,
  `Moyenne`), ni celle de la démonstration (`Romain`), ni celles du mémento
  (`Compte`, `Personne`), ni celle du deck EXC (`Ascenseur`), ni celles des
  sessions d'examen (`Calculateur`, `Calculatrice`, `StringUtil`,
  `StudentManager`, `VerificateurDeMotDePasse`, `PalindromeChecker`). La
  salle a la même forme que la tirelire (une exception contrôlée, un état à
  vérifier après le refus) : c'est voulu, la notion est la même, mais aucune
  ligne de code n'est transposable telle quelle dans `Verificateur`.
- La promesse du deck EXC (2.4 : « vous retrouverez ce `throws` dans les
  tests ») est tenue en 3.4. Celle du deck ITF (4.2 : « nous y reviendrons au
  module JUN ») est tenue en 5.2.
- La slide 5.3 reprend CC-TST.3 sous l'angle de la conception seulement, et
  renvoie au mémento pour le reste.
- Retirés de l'ancien deck : le rappel du cours précédent et les exercices
  23 à 26 (désormais au module EXC), les quatre niveaux de test et
  l'acceptation, les généralités sur les frameworks, les deux captures de
  création d'une classe de test (remplacées par une phrase et IDE.17), la
  slide `fail`, `Executable` et les varargs, la définition d'une annotation,
  le tableau des six annotations (seule `@BeforeEach` reste), le déroulé
  complet de `Calculator` en quinze slides (la démonstration le remplace),
  les exercices 43 à 45 (le fascicule), le sommaire répété cinq fois.

**Défauts du deck d'origine corrigés** :

- Les méthodes de test nommées « en commençant par test » (07/23, 42) :
  contraire à CC-NOM.1, et refusé par `RedactionTest`. Corrigé en 4.3.
- Un montant négatif silencieusement ignoré par `ajoute` (07/19 et 22), et
  testé comme un comportement voulu : c'est l'erreur qui passe pour un
  résultat, que JUN.1 et CC-ERR.1 proscrivent. Retiré ; le refus se fait par
  une exception (3.3).
- `Assertions` placée dans le package `org.junit.api` (07/27) au lieu de
  `org.junit.jupiter.api`. Corrigé en 2.2.
- `assertEquals` décrite pour « int, short, long, byte, char ou Object »
  (07/28), sans les `double`, et « nonn égales ». Retiré.
- `Calculator` déclarant `divide` en `int` (07/40) puis en `double` (07/48),
  et `substract`. Retiré avec l'exemple.
- Le test arrivé en slide 39 sur 55, après 27 slides d'API (relevé dans la
  liste de refonte). Inversé : le test et son rouge viennent d'abord, l'outil
  ensuite.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module JUN
- Tests unitaires avec JUnit

**Note**

Depuis le début de l'année, un test vous dit si votre code est juste. Ce
module vous apprend à écrire ce test vous-mêmes : du code qui dira, tout
seul et à chaque lancement, que quelque chose s'est cassé.

Le thème ne compte que trois exercices, et ce chiffre est trompeur. Quatre
objectifs de l'examen ne reposent que sur lui : écrire la classe de test d'une
classe écrite par quelqu'un d'autre, écrire une classe et ses tests, repérer
un défaut grâce aux tests, et justifier les cas que l'on a choisi de tester.
Chaque session depuis 2022 consacre sa troisième question à une classe de test.

---

## Section 1 - À vous d'écrire les tests

### 1.1 · À vous d'écrire les tests

*(intercalaire)*

### 1.2 · Qui écrit quoi

**Source** nouvelle ; phrase d'introduction ajoutée le 15/10/2026, à la demande du
professeur

**Slide**

Jusqu'ici, le test était fourni et vous écriviez le code. Dans ce module, les rôles s'inversent : c'est à vous d'écrire les tests.

| Exercice | Fourni | À écrire |
|---|---|---|
| Jusqu'ici | le test | le code |
| JUN.1 | le test | le code, une dernière fois |
| JUN.2 | quatre tirelires | la vérification |
| JUN.3 | la classe `Moyenne` | sa classe de test |
| Examen | une classe d'un tiers | sa classe de test |

**Note**

Lisez ce tableau de haut en bas : la colonne de droite change de nature. La dernière ligne est la troisième question de chaque session d'examen. Depuis
janvier, vous cherchiez quoi implémenter. Dans ce module, à partir de JUN.2, le
code est déjà écrit, et souvent correct. Ce que vous rendez, c'est ce qui le
vérifie.

JUN.1 est la charnière. Le test y est encore fourni, mais il ne sert plus
seulement à vous dire vert ou rouge : il est l'énoncé, et vous apprenez à le
lire.

Conséquence pratique : le vert n'est plus la preuve que vous avez fini. Dans
JUN.3, la classe de test fournie contrôle la forme de la vôtre, pas sa valeur.
Personne ne peut la contrôler à votre place, et c'est exactement ce que
l'examen évalue.

---

### 1.3 · Un programme qui affiche ne vérifie rien

**Source** nouvelle

**Slide**

- Le programme affiche, et c'est vous qui jugez
- Il faut connaître la bonne réponse, et relire à chaque lancement
- Un test connaît la réponse, et la vérifie seul

```java
public static void main(String[] args)
        throws SalleCompleteException {
    Salle salle = new Salle(100);

    salle.reserver(2);

    System.out.println(salle.placesLibres());   // 98 ?
}
```

**Note**

C'est ainsi que vous avez vérifié vos programmes jusqu'ici : on lance, on lit
ce qui s'affiche, on décide si c'est juste. Cela marche une fois. Personne ne
relance quarante programmes après chaque modification, en relisant chaque
ligne et en se souvenant de ce qu'elle devait afficher.

Un test fait la même chose, à une différence près : il porte en lui la réponse
attendue. Il compare lui-même, et ne dit que vert ou rouge. C'est le « S » de
F.I.R.S.T., auto-vérifiant, dans CC-TST.3.

La salle de spectacle servira d'exemple pour tout le module. Elle a une
capacité, on y réserve des places, et elle refuse ce qu'elle ne peut pas
servir. Sa documentation viendra à la section 3.

Le code complet, à exécuter : demos, classe `demo.jun.slides.UnProgrammeQuiAfficheNeVerifieRien`.

---

### 1.4 · Démonstration

**Source** `Demo_JUN.docx`, 15 minutes, avant JUN.1

**Slide**

- Démo : rouge, vert, puis nettoyer

**Note**

La démonstration écrit un test avant la classe qu'il vérifie, le regarde
échouer, puis le fait passer avec le code le plus bête possible. Un test de
plus, et le code doit s'améliorer. Un cas inattendu apparaît, que seul le fait
de chercher quoi tester a fait découvrir.

Retenez deux choses. Un test qu'on n'a jamais vu échouer ne prouve rien. Et un
test sans assertion passe au vert quoi qu'il arrive : la démonstration le
montre exprès, parce que c'est le défaut le plus fréquent dans les copies
d'examen.

La section suivante met des noms sur ce que vous venez de voir.

---

## Section 2 - Ce qu'un test contient

### 2.1 · Ce qu'un test contient

*(intercalaire)*

### 2.2 · Où vit une classe de test

**Source** d07/20 à 22, réécrites ; rappel du mémento technique, TEC-MVN.2

**Slide**

- Dans `src/test/java`, sous le même package que la classe testée
- Son nom : celui de la classe, suivi de `Test`
- JUnit n'est visible que de ce côté : TEC-MVN.2

```java
package be.ephec.java.spectacle;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SalleTest {

    // une methode par comportement verifie
}
```

**Note**

Les deux arborescences, `main` et `test`, se superposent : une classe de test
placée dans le même package voit sa classe comme une voisine. Le projet Maven
du cours ne laisse JUnit entrer que dans `src/test` ; tenter de l'importer
dans `src/main` ne compile pas, et c'est voulu.

L'import `static` est nouveau. Il importe une méthode statique, ici
`assertEquals` de la classe `Assertions`, pour l'appeler sans écrire le nom de
la classe devant. Toutes les assertions de JUnit 5 vivent dans
`org.junit.jupiter.api.Assertions`.

Dans IntelliJ, Ctrl+Shift+T depuis la classe propose de créer sa classe de
test au bon endroit. À l'examen, si les noms de JUnit restent en rouge,
l'énoncé rappelle l'option qui l'ajoute au projet.

---

### 2.3 · `@Test`, puis une assertion

**Source** d07/23, réécrite

**Slide**

- `@Test` fait d'une méthode un test, que JUnit lance seul
- `assertEquals` reçoit l'attendu d'abord, l'obtenu ensuite
- Sans assertion, le test ne peut qu'être vert : CC-TST.2

```java
@Test
void uneSalleNeuveEstEntierementLibre() {
    Salle salle = new Salle(100);

    int libres = salle.placesLibres();

    assertEquals(100, libres);
}
```

**Note**

Une méthode de test ne reçoit rien et ne rend rien. Pas de `main` : JUnit
cherche toutes les méthodes annotées `@Test` et les lance une à une. Vous
retrouvez les trois temps décrits dans le fascicule, séparés par des lignes
vides.

L'ordre des arguments compte. En cas d'échec, JUnit affiche
« expected: <100> but was: <0> ». Inversez-les, et le message mentira : il
vous dira que la salle aurait dû valoir ce qu'elle vaut.

Enfin, la ligne qui fait le test est la dernière. Sans elle, la méthode
appelle du code, ne vérifie rien, et passe au vert. C'est ce que la
démonstration a montré.

Le code complet, à lancer : demos, test `demo.jun.slides.SalleTest`.

---

### 2.4 · Les assertions dont vous aurez besoin

**Source** d07/28, réduite

**Slide**

| Assertion | Réussit si |
|---|---|
| `assertEquals(attendu, obtenu)` | les deux valeurs sont égales |
| `assertTrue(condition)` | la condition est vraie |
| `assertFalse(condition)` | la condition est fausse |
| `assertNull(valeur)` | la valeur est `null` |
| `assertThrows(Type.class, ...)` | l'appel lève cette exception |

**Note**

Cinq assertions suffisent à tout ce que le cours et l'examen demandent. Chacune
a sa contraire (`assertNotEquals`, `assertNotNull`) et toutes acceptent un
dernier argument, un message affiché en cas d'échec.

Pour des objets, `assertEquals` appelle `equals` : un objet qui ne le redéfinit
pas n'est égal qu'à lui-même. Pour des `double`, elle demande une tolérance ;
le fascicule de JUN.3 dit pourquoi.

Préférez toujours l'assertion la plus précise. Un `assertTrue(libres == 100)`
qui échoue dit seulement « expected: <true> but was: <false> ». Un
`assertEquals(100, libres)` dit ce qu'il a obtenu.

`assertThrows` est à la section 3.

---

### 2.5 · Un test rouge accuse le code, ou le test

**Source** d07/25, développée

**Slide**

- Une assertion fausse : JUnit affiche l'attendu et l'obtenu
- Une exception imprévue : le test échoue sur sa trace
- Avant de corriger quoi que ce soit, relire la spécification

```java
// une assertion fausse
expected: <98> but was: <100>

// une exception que personne n'attendait
java.lang.UnsupportedOperationException:
    reserver n'est pas encore implementee
```

**Note**

Un test rouge dit qu'il y a un désaccord, pas qui a tort. Le code peut être
faux. Le test aussi : un attendu mal calculé, des arguments inversés, une
préparation incomplète.

L'arbitre n'est ni l'un ni l'autre, c'est la spécification : la
documentation de la méthode, ou l'énoncé. On la relit, on décide qui a tort,
et on ne corrige que celui-là.

Le second cas vous est familier : c'est le message de chacun de vos
squelettes. Une exception qui sort d'un test le fait échouer, et sa trace se
lit comme au module EXC.

C'est le troisième objectif de l'examen : exécuter les tests de quelqu'un
d'autre, et s'en servir pour trouver le défaut dans une classe que vous n'avez
pas écrite.

---

### 2.6 · Exercices

**Slide**

- **JUN.1** - Le test comme spécification
- Lire `CalculatriceTest` avant d'écrire une ligne
- Tests : CC-TST.1, CC-TST.2

**Note**

C'est le dernier exercice où le test est fourni, et la manière de s'en servir
change. Ouvrez `CalculatriceTest` d'abord, et lisez-le comme un énoncé : les
signatures, les valeurs, et ce qui doit arriver quand on divise par zéro y
sont, et nulle part ailleurs.

Vous y croiserez `assertThrows`, que la section suivante explique.

Gardez les trois questions de fin pour la discussion. Celle sur les
`assertEquals` multiples mérite d'être confrontée à CC-TST.2.

---

## Section 3 - Vérifier tout le contrat

### 3.1 · Vérifier tout le contrat

*(intercalaire)*

### 3.2 · Une documentation est une liste de tests

**Source** nouvelle

**Slide**

- Chaque phrase de la documentation est une promesse
- Chaque promesse mérite son test
- Les promesses faites en cas d'échec aussi

```java
/**
 * Reserve des places.
 *
 * @throws IllegalArgumentException si places <= 0
 * @throws SalleCompleteException   s'il reste moins de
 *         places que demande ; rien n'est alors reserve
 */
public void reserver(int places)
        throws SalleCompleteException
```

**Note**

Quand vous testez la classe de quelqu'un d'autre, vous ne partez pas de son
code, vous partez de ce qu'elle promet. Ici, quatre promesses : une
réservation diminue les places libres d'autant, zéro place est refusé, une
demande trop grande est refusée, et ce refus ne réserve rien.

La dernière est la plus souvent oubliée. Elle est écrite en fin de phrase,
presque en passant, et c'est pourtant elle qui distingue une salle correcte
d'une salle qui réserve quand même la moitié de la demande.

C'est ce que l'examen appelle tester « sur base d'une classe implémentée par
un tiers et/ou de spécifications techniques ». La spécification, c'est ceci.

Le code complet : demos, classe `demo.jun.slides.Salle`.

---

### 3.3 · Vérifier qu'une exception est levée

**Source** d07/32, réécrite

**Slide**

- `assertThrows` reçoit le type attendu et l'appel à surveiller
- Le test échoue si rien n'est levé, ou autre chose
- La flèche `->` est une lambda : recopiez la forme, LAM l'expliquera

```java
@Test
void reserverZeroPlaceEstRefuse() {
    Salle salle = new Salle(100);

    assertThrows(IllegalArgumentException.class,
            () -> salle.reserver(0));
}
```

**Note**

Appeler `salle.reserver(0)` directement ne marcherait pas : l'exception
interromprait le test, qui passerait au rouge précisément quand la salle fait
ce qu'on attend d'elle. `assertThrows` fait l'appel pour vous, attrape
l'exception, et vérifie son type.

L'écriture `() -> salle.reserver(0)` emballe l'appel pour qu'`assertThrows`
l'exécute elle-même, au bon moment. Pour l'instant, retenez la forme : des
parenthèses vides, une flèche, l'appel. Le module LAM dira ce qu'elle est. La
notation `IllegalArgumentException.class` désigne la classe elle-même.

Nommez le type le plus précis. Une sous-classe convient aussi, si bien
qu'`assertThrows(Exception.class, ...)` accepterait n'importe quelle exception,
y compris celle d'un bug. `assertThrows` rend l'exception attrapée : on peut
en vérifier le message.

Le code complet, à lancer : demos, test `demo.jun.slides.SalleTest`.

---

### 3.4 · Le `throws` d'une méthode de test

**Source** nouvelle ; annoncée par le deck EXC, slide 2.4

**Slide**

- Préparer ou agir peut appeler une méthode qui déclare une exception
- La méthode de test la déclare à son tour
- Jamais de `catch` dans un test : il le rendrait vert

```java
@Test
void deuxPlacesReserveesNeSontPlusLibres()
        throws SalleCompleteException {
    Salle salle = new Salle(100);

    salle.reserver(2);

    assertEquals(98, salle.placesLibres());
}
```

**Note**

Le module EXC l'avait annoncé : une méthode de test qui appelle `reserver`
doit choisir, attraper ou déclarer. Dans un test, on déclare. Si l'exception
survient alors qu'on ne l'attendait pas, JUnit marque le test en rouge avec
sa trace : c'est exactement ce qu'on veut.

L'attraper serait pire que tout. Un `catch` vide, ou qui affiche un message,
fait passer le test au vert alors que la réservation a échoué. C'est un test
sans assertion déguisé, et un `catch` qui ne traite rien, contraire à
CC-ERR.6.

Dans `assertThrows`, en revanche, rien à déclarer : c'est JUnit qui attrape.

Le code complet, à lancer : demos, test `demo.jun.slides.SalleTest`.

---

### 3.5 · Après l'échec, l'état

**Source** nouvelle

**Slide**

- Lever la bonne exception ne suffit pas
- Le refus ne doit rien avoir changé
- Une assertion pour l'échec, une pour l'état

```java
@Test
void unePlaceDeTropNeReserveRien()
        throws SalleCompleteException {
    Salle salle = new Salle(10);
    salle.reserver(8);

    assertThrows(SalleCompleteException.class,
            () -> salle.reserver(3));

    assertEquals(2, salle.placesLibres());
}
```

**Note**

Une salle qui réserverait les deux places restantes avant de lever
l'exception passerait la première assertion. Seule la seconde la démasque.

Les deux assertions ne contredisent pas CC-TST.2 : elles décrivent un seul
comportement, le refus d'une demande trop grande, vu sous ses deux faces.

C'est la même idée qu'en EXC.1, où le test vérifiait que le point ne bougeait
pas quand le déplacement était refusé. Cette fois, c'est vous qui l'écrivez.

Le code complet, à lancer : demos, test `demo.jun.slides.SalleTest`.

---

### 3.6 · Exercices

**Slide**

- **JUN.2** - Détecter un défaut
- Ne lisez pas le code des tirelires : faites-les travailler

**Note**

`JUN.2` met la section en pratique sans JUnit. Vous n'y écrivez pas de
`@Test` : chaque clause du contrat devient une vérification dans une méthode
ordinaire, qui rend `true` ou `false`, avec ce que vous savez depuis le module
EXC.

L'intérêt est que la qualité de votre vérification devient mesurable. Chaque
tirelire défectueuse n'est démasquée que par une clause précise : en oublier
une, c'est en laisser passer une.

Résistez à l'envie d'ouvrir les classes pour trouver le défaut. Le repérer en
lisant ne prouve rien, et ne servira plus le jour où le code changera.

---

## Section 4 - Choisir ses cas, et les justifier

### 4.1 · Choisir ses cas, et les justifier

*(intercalaire)*

### 4.2 · Où se logent les défauts

**Source** nouvelle ; phrase d'introduction ajoutée le 15/10/2026, à la demande du
professeur

**Slide**

On ne peut pas tout tester : on regroupe les cas en familles, on en teste un de chaque, et l'on vise les frontières.

| Famille de cas | Pour une salle de 10 places |
|---|---|
| le cas ordinaire | réserver 3 places |
| la borne atteinte | réserver exactement les places libres |
| la borne dépassée | réserver une place de trop |
| la valeur interdite | réserver 0 place, ou -1 |
| la répétition | deux réservations successives |

**Note**

On ne peut pas tout tester. On découpe donc les entrées en familles qui
devraient se comporter de la même façon, et l'on prend un représentant de
chacune. Puis on teste les frontières entre familles, parce que c'est là que
les défauts se logent : un `>` au lieu d'un `>=`, un indice qui commence à 1.

Le cas ordinaire est nécessaire et ne suffit jamais. Un test qui ne couvre que
lui ne protège que de ce qui n'arrive pas.

La répétition est la famille la plus oubliée : beaucoup de défauts
n'apparaissent qu'au deuxième appel, quand l'objet n'est plus neuf.

Le fascicule de JUN.3 donne la liste des cas de `Moyenne`. Ce tableau est la
méthode qui produit une telle liste quand personne ne vous la donne.

---

### 4.3 · Un cas, un test, un nom

**Source** d07/42, corrigée ; règles CC-TST.2 et CC-NOM.1

**Slide**

- Une méthode par comportement : CC-TST.2
- Son nom dit ce qui est vérifié, jamais un numéro : CC-NOM.1
- `@DisplayName` l'énonce en clair, avec des espaces

```java
@Test
@DisplayName("Reserver toutes les places libres remplit la salle")
void reserverToutesLesPlacesLibres()
        throws SalleCompleteException {
    Salle salle = new Salle(10);

    salle.reserver(10);

    assertEquals(0, salle.placesLibres());
}
```

**Note**

Quand ce test passera au rouge, son nom sera la première chose que vous lirez,
et souvent la seule dont vous aurez besoin. `test1` ne dit rien.
L'ancienne habitude de commencer chaque nom par `test` n'apporte rien non
plus : l'annotation le dit déjà.

IntelliJ affiche le `@DisplayName` à la place du nom de la méthode. Pas
d'accent dans la chaîne, comme partout dans le code du cours. JUN.3 exige un
`@DisplayName` sur chaque test, et refuse les noms numérotés.

Une exception : si l'énoncé impose un nom, on le respecte à la lettre. La
session de 2022 imposait `testConcatene`, et la correspondance exacte à
l'énoncé fait partie des critères.

Le code complet, à lancer : demos, test `demo.jun.slides.SalleTest`.

---

### 4.4 · Chaque test repart de zéro

**Source** d07/37, réduite à `@BeforeEach` ; règle CC-TST.3

**Slide**

- JUnit crée un nouvel objet de test pour chaque méthode
- Aucun test ne compte sur un autre, ni sur l'ordre : CC-TST.3
- `@BeforeEach` regroupe ce que tous les tests préparent

```java
class SalleTest {

    private Salle salle;

    @BeforeEach
    void preparer() {
        salle = new Salle(10);
    }

    @Test
    void uneSalleNeuveEstEntierementLibre() {
        assertEquals(10, salle.placesLibres());
    }
}
```

**Note**

Chaque méthode de test tourne sur une instance neuve de `SalleTest`, et la
méthode `@BeforeEach` s'exécute juste avant elle. Un test qui remplit la salle
ne gêne donc pas le suivant. JUnit ne promet aucun ordre d'exécution : un test
qui a besoin qu'un autre ait tourné avant lui finira par échouer sans raison
apparente.

Ne confondez pas avec l'ordre d'écriture. Dans `RomainTest`, publiée avec
les corrigés, l'ordre des méthodes raconte comment le code est né : c'est une
histoire pour le lecteur, pas un ordre d'exécution.

C'est aussi pour cela que `CalculatriceTest`, en JUN.1, peut déclarer sa
calculatrice dans un champ : chaque test en reçoit une neuve.

N'en abusez pas. Si la valeur qui compte pour un test est cachée dans
`preparer`, le lecteur doit remonter la chercher. Ce qui fait le cas d'un
test reste visible dans le test. JUnit propose d'autres annotations du même
genre ; vous n'en aurez pas besoin.

Le code complet, à lancer : demos, test `demo.jun.slides.SalleAvecPreparationTest`.

---

### 4.5 · Un test se justifie par le défaut qu'il attrape

**Source** nouvelle

**Slide**

- Pour chaque test : quelle erreur le ferait passer au rouge ?
- S'il n'y en a aucune, il ne protège de rien
- Un test qui attrape les mêmes erreurs qu'un autre n'ajoute rien

```java
// le defaut :  >=  au lieu de  >
if (places >= placesLibres()) {
    throw new SalleCompleteException(
            "Plus que " + placesLibres() + " places");
}

// un seul test passe au rouge :
// reserverToutesLesPlacesLibres
```

**Note**

Justifier un test, c'est nommer le défaut qu'il attraperait. Ici, la salle
refuse une demande qu'elle pouvait servir. Le cas ordinaire ne le voit pas,
la place de trop non plus : seul le test de la borne atteinte passe au rouge.
C'est sa justification, en une phrase.

La question se pose dans les deux sens. Un test pour lequel on ne trouve aucun
défaut qu'il attraperait est décoratif. Deux tests qui attrapent exactement
les mêmes défauts en font un de trop.

C'est le quatrième objectif de l'examen, « justifier ses choix quant aux tests
implémentés ». La réponse la plus solide ne dit pas « pour tester le cas
limite », elle dit quelle erreur ce cas limite démasque.

**Réserve** La forme sous laquelle l'examen demande la justification n'est
écrite dans aucune des six sessions fournies : ni commentaire, ni question
orale. La note ne la présume pas. À préciser si une forme est attendue.

Le code complet : demos, classe `demo.jun.slides.Salle`.

---

### 4.6 · À l'examen : écrire, lancer, corriger

**Source** nouvelle ; les six sessions d'examen 2022 à 2025

**Slide**

- On vous donne une classe, et parfois la liste des cas
- Vos tests peuvent révéler un défaut : c'est prévu
- Corrigez alors la classe, jamais le test qui a raison

**Note**

La troisième question a la même forme depuis 2022 : une classe fournie, une
classe de test à écrire, puis lancer les tests. Cinq sessions sur six ajoutent
que la classe peut contenir une erreur, à corriger si vos tests la trouvent.

Le plus souvent, l'énoncé dicte les cas : vous traduisez chaque phrase en
méthode, comme à la section 3. À la première session de 2024, il ne disait que « envisagez les
différents cas possibles » : c'est le tableau de la slide 4.2 qui répond. Deux
sessions demandaient de vérifier qu'une exception est levée.

Quand un test passe au rouge, revenez à la slide 2.5. Si l'énoncé vous donne
raison, la classe est fausse : corrigez-la, et relancez tout. Modifier
l'attendu pour retrouver le vert, c'est rendre un test qui ment.

---

### 4.7 · Exercices

**Slide**

- **JUN.3** - Écrire une classe de test
- Le vert de `RedactionTest` ne dit rien de vos tests
- Tests : CC-TST.1, CC-TST.2, CC-TST.3

**Note**

`JUN.3` est la forme exacte de la question d'examen, sans la correction : la
classe `Moyenne` est juste. Vous écrivez `MoyenneTest`, au moins cinq tests,
chacun avec son `@DisplayName`.

`RedactionTest` vérifie que votre classe existe et qu'elle a la bonne forme.
Elle ne peut pas juger si vos tests sont pertinents. Ce jugement-là, c'est
vous qui le portez, avec la question de la slide 4.5.

Faites l'expérience proposée par le fascicule : glisser un défaut dans
`Moyenne`, et regarder si vos tests le voient. C'est la seule mesure honnête de
ce que vous avez écrit.

---

## Section 5 - Du code qui se laisse tester

### 5.1 · Du code qui se laisse tester

*(intercalaire)*

### 5.1b · Pourquoi certaines classes résistent aux tests

**Source** nouvelle ; ajoutée le 15/10/2026, à la demande du professeur, pour donner le
contexte de la section

**Slide**

- Un test prépare une situation, déclenche une action, vérifie le résultat : seul, et en un instant
- Certaines classes l'en empêchent : elles ouvrent une fenêtre, lisent la date du jour, ou tirent au hasard
- Le remède est dans la classe elle-même : une interface à la place de la fenêtre, un paramètre à la place de la date ou du hasard

**Note**

Jusqu'ici, les classes testées étaient sages : une salle, une tirelire, une
moyenne. On les crée, on les appelle, on regarde le résultat. Toutes les classes
ne se laissent pas faire aussi facilement.

Une classe qui ouvre une fenêtre ne peut pas tourner dans un test : il faudrait
que quelqu'un regarde l'écran. Une classe qui lit la date du jour donne un
résultat qui change d'une année à l'autre : un test juste aujourd'hui sera faux
demain. Une classe qui tire au hasard ne donne jamais deux fois la même chose :
que vérifier ?

Dans les trois cas, ce n'est pas le test qu'il faut changer, c'est la classe. Les
slides qui suivent montrent les deux remèdes : une interface, que vous connaissez
depuis le module ITF, et un paramètre. Retenez l'idée générale : une classe
difficile à tester est souvent une classe mal découpée.

---

### 5.1a · Rappel : le contrôleur du module ITF

**Source** deck ITF, slide « Une interface entre les deux » ; rappel ajouté le
15/10/2026, à la demande du professeur

**Slide**

- Au module ITF, le contrôleur ne dépend plus que d'une interface, `Afficheur`, reçue par `setAfficheur`
- C'est ce qui va permettre de le tester sans rien ouvrir

```java
public interface Afficheur {
    void affiche(String message);
}
public class Controleur {
    private Afficheur afficheur;
    public void setAfficheur(Afficheur afficheur) { this.afficheur = afficheur; }
    public void annoncer(String evenement) {
        afficheur.affiche("Evenement : " + evenement);
    }
}
```

**Note**

Un rappel du module ITF, avant de s'en servir. Le contrôleur ne tient plus une
référence vers la fenêtre, mais vers l'interface Afficheur, qui ne promet qu'une
chose : afficher un message. Qui affiche, et comment, le contrôleur l'ignore. On
le lui dit par setAfficheur.

La méthode annoncer est un exemple d'action du contrôleur : elle ne sait pas où
part son message, elle le confie à l'afficheur qu'on lui a donné. C'est
exactement cette ignorance qui rend le test possible.

Le code complet : demos, classe `demo.itf.slides.Controleur`.

---

### 5.2 · Une doublure à la place de la fenêtre

**Source** nouvelle ; annoncée par le deck ITF, slide 4.2. Titre et texte revus le
15/10/2026

**Slide**

- Pour le test, on écrit un faux afficheur : il n'affiche rien, il retient le dernier message
- Ce remplaçant s'appelle une doublure ; il vit dans `src/test`, à côté du test

```java
class AfficheurQuiRetient implements Afficheur {

    String dernier;

    @Override
    public void affiche(String message) {
        dernier = message;
    }
}
```

**Note**

Le contrôleur accepte n'importe quel Afficheur. Le test en profite pour lui en
donner un qui lui convient : une classe qui implémente Afficheur, mais au lieu
d'afficher, range le message dans un champ, que le test pourra lire.

On appelle ce genre de remplaçant une doublure, comme au cinéma : elle tient le
rôle à la place de la vraie, le temps d'une scène. Elle ne sert qu'au test, et
vit donc dans src/test.

Vous avez déjà rencontré le principe, dans l'autre sens, avec JUN.2 : le
vérificateur ne connaît que l'interface Tirelire, et accepte n'importe laquelle.

---

### 5.2a · Tester sans ouvrir la fenêtre

**Source** nouvelle ; ajoutée le 15/10/2026, à la demande du professeur : le test
lui-même, que la slide précédente ne montrait pas

**Slide**

- Le test branche la doublure, déclenche l'action, puis lit ce qu'elle a retenu
- Aucune fenêtre ne s'ouvre : le test tourne en quelques millisecondes

```java
@Test
void leControleurSignaleLEvenement() {
    Controleur controleur = new Controleur();
    AfficheurQuiRetient afficheur = new AfficheurQuiRetient();
    controleur.setAfficheur(afficheur);

    controleur.annoncer("bouton presse");

    assertEquals("Evenement : bouton presse", afficheur.dernier);
}
```

**Note**

Le test suit les trois temps habituels. Préparer : un contrôleur, et la doublure
qu'on lui branche par setAfficheur. Agir : annoncer un événement. Vérifier : la
doublure a-t-elle reçu le bon message ?

Le contrôleur n'a pas changé d'une ligne pour être testé : c'est le même que
celui qui pilotera la vraie fenêtre. C'est tout l'intérêt de l'interface du
module ITF. Sans elle, ce test serait impossible.

Le code complet, à lancer : demos, test `demo.jun.slides.ControleurTest`.

---

### 5.2b · Rappel : l'âge du livre, au module POO

**Source** deck POO, slide « La donnée qui n'existe pas » ; rappel ajouté le
15/10/2026, à la demande du professeur

**Slide**

- Au module POO, l'âge d'un livre n'était pas stocké : `getAge` le calculait à partir de la date du jour
- Juste, mais difficile à tester : le résultat change chaque année, sans que le code change

```java
public class Livre {
    private String titre;
    private int anneeDeParution;

    public int getAge() {
        return LocalDate.now().getYear() - anneeDeParution;
    }
}
```

**Note**

Un rappel du module POO. L'âge d'un livre n'est pas une donnée qu'on range dans
un champ : il se déduit de l'année de parution et de l'année en cours. La
méthode getAge le calcule donc à chaque appel, en lisant la date du jour.

C'était le bon choix au module POO, et il reste juste. Mais essayez d'écrire son
test : pour Dune, paru en 1965, faut-il attendre 61, ou 62 ? Cela dépend du jour
où le test tourne. Un test écrit aujourd'hui deviendra rouge le premier janvier,
alors que personne n'aura touché au code. La slide suivante montre comment
découper la méthode pour lever ce problème.

Le code complet : demos, classe `demo.poo.slides.Livre`.

---

### 5.3 · Ni le jour, ni le hasard

**Source** nouvelle ; règle CC-TST.3. Texte et code revus le 15/10/2026

**Slide**

- Le calcul reçoit l'année en paramètre : le test la fixe, et le résultat ne bouge plus
- Une version de confort, sans paramètre, va chercher l'année et délègue au calcul

```java
public int getAge(int anneeCourante) {           // testable
    return anneeCourante - anneeDeParution;
}
public int getAge() {                            // pratique
    return getAge(LocalDate.now().getYear());
}

assertEquals(61, dune.getAge(2026));   // vrai aujourd'hui, et dans dix ans
```

**Note**

On sépare le calcul de la commodité. Le calcul reçoit l'année en paramètre :
le test la fixe, et le résultat ne bouge plus. La version sans paramètre, celle
qu'on appelle d'habitude, se contente d'aller chercher l'année et de déléguer.
Vous avez déjà fait ce découpage au module POO, avec computeAge(int annee).

Le hasard se traite de la même façon : la classe reçoit son Random au lieu de le
créer, et le test lui en donne un avec une graine, qui tire toujours les mêmes
nombres. Le mémento Clean Code montre l'exemple complet en CC-TST.3.

Le code complet, à lancer : demos, test `demo.jun.slides.LivreTest`.

