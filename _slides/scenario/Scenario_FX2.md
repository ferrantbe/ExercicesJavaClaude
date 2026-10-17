# Scénario du deck FX2 - Propriétés et architecture

*Quatre sections et deux slides de fin, 23 slides plus le sommaire.
Rubriques : `**Source**` et `**Réserve**` sont des commentaires de
fabrication, `**Slide**` et `**Note**` produisent le contenu et les notes du
présentateur.*

## Fabrication

Sections à déclarer dans `module_fx2.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Une valeur qui prévient | Les propriétés |
| 2 | Lier plutôt qu'écouter | Les bindings |
| 3 | Séparer l'écran du calcul | MVC |
| 4 | Décrire l'écran en FXML | Le FXML |

Les slides 5.1 (pour aller plus loin) et 5.2 (le fil rouge) n'ont pas
d'intercalaire, comme les slides 4.1 et 4.2 du deck LAM.

**FX2 est un code de deck, pas de thème.** Le thème reste FX, avec un seul
fascicule (`FX_enonces.docx`) et des exercices numérotés de FX.1 à FX.10.
Ce deck couvre FX.6 à FX.9 ; le deck FX1 couvre FX.1 à FX.5.

**Sources** : deck 11 (`d11.pptx`, 20 slides : propriétés, listeners, un
mot sur les bindings), deck 09 (`d09.pptx`, slides 14, 17, 18 et 29 à 50 :
MVC, FXML, la vue de la calculatrice), `FX_enonces.docx` (FX.6 à FX.9),
les corrigés de `be.ephec.java.fx` (e06 à e09), le scénario FX1 (dont les
exemples de la lampe et l'incrément G.33), le guide IntelliJ (IDE.14,
IDE.29), le mémento technique (TEC-FX.3), le classeur d'objectifs (FX.e à
FX.h). L'intercalaire vient de `d09`, slide 7.

**Place dans le cours** : quatorzième deck (`ORDRE = 14`, partagé avec FX1,
décidé), joué après FX1. Les événements, `EventHandler`, `getSource` et la
propagation sont connus, ainsi que les lambdas, les interfaces génériques
et JUnit.

**Le poids à l'examen** : nul. Aucune des six questions 5 lues (2022 à 2025)
ne porte sur les propriétés, les bindings ou le FXML, et le FXML est
explicitement hors examen. FX.6 est Should, FX.7 et FX.8 Could, FX.9
Should. Si le temps manque, c'est ce deck qu'on comprime : les sections 2
et 4 peuvent se réduire à leur exercice.

**Le partage avec le fascicule** (ce thème n'a pas de démonstration propre
à ce deck) :

- Le fascicule porte : la démarche de recherche d'une propriété dans la
  Javadoc (encadré de FX.6) ; les trois pièges du `Slider` et la remarque
  sur `Locale` (FX.7) ; la liste des outils de binding de FX.8 ; le tableau
  MVC appliqué à la calculatrice, le tableau `fx:controller`, `fx:id`,
  `onAction`, le gestionnaire unique pour dix boutons, la logique des
  opérateurs et la division par zéro (FX.9). Le deck ne les répète pas, et
  n'emploie ni `TextField.textProperty` ni `Slider.valueProperty` dans ses
  exemples : FX.6 fait chercher la première, FX.7 emploie la seconde.
- Le deck porte ce que le fascicule ne pose pas : la propriété comme objet,
  `get`, `set` et l'accesseur `xxxProperty`, le `ChangeListener` et ses
  trois paramètres, le `Number` reçu, les propriétés des contrôles, le
  binding comme dépendance permanente, les expressions observables,
  `bindBidirectional`, les raisons de séparer modèle, vue et contrôleur,
  l'écriture d'un fichier FXML, `FXMLLoader`, l'injection par `@FXML`.

**Décisions appliquées** :

- Le deck répond, dans ses exemples, à deux questions de fin (décidé) : le
  rôle du premier paramètre du `ChangeListener` (FX.6) et le `Number` reçu
  au lieu d'un `double` (FX.7), parce que la notion ne s'explique pas sans
  eux. Il ne dit rien d'`initialize` (question 2 de FX.9) ni de ce que
  coûte un `setText` sur une propriété liée (question 2 de FX.8).
- Les bindings ont désormais un exercice, FX.8, inséré avant la
  calculatrice (décidé). La calculatrice devient FX.9 et le guichet FX.10.
- Les exemples poursuivent la lampe du deck FX1 : une intensité
  (`IntegerProperty`), une case « Veilleuse » (`CheckBox`), un modèle
  `Lampe` sans JavaFX, puis la même fenêtre décrite en FXML. Ils ne
  reprennent ni le champ de FX.6, ni le curseur de FX.7, ni le pseudo de
  FX.8, ni la calculatrice de FX.9.
- Le MVC est posé sur la lampe (section 3) avant de l'être sur la
  calculatrice : le fascicule le décrit appliqué, le deck dit pourquoi.
- La slide 2.4 (`bindBidirectional`) est facultative : aucun exercice ne
  l'emploie.
- FX.10, le guichet et ses threads, est cité en note de 5.1 et nulle part
  ailleurs : Won't, hors examen.
- Le démineur (`DemineurClaude`) est annoncé en 5.1 comme travail
  facultatif.
- Le fil rouge reçoit l'incrément G.34, présenté en 5.2. Il répond à la
  question posée en fin de deck FX1.

**Retirés des anciens decks** :

- Les énoncés 47 à 52 (d11/3 à 6, 19 et 20) : le fascicule.
- La vidéo d'une application Sudoku (d11/7) : lien externe sans rapport
  avec un exercice.
- `module-info.java` et plusieurs applications par projet (d11/8) : le
  projet du cours n'utilise pas les modules, voir TEC-FX.4.
- Les sommaires répétés (d11/9 ; d09/8, 15, 19, 23, 28, 51, 64).
- Les exercices JUnit 43 à 45 (d09/4 à 6) : déjà repris en JUN.
- L'histoire et la configuration (d09/9 à 22) : deck FX1, section 1.
- Les deux exemples XML sans rapport, un courriel et un marin (d09/32) :
  remplacés par la vue de la lampe (4.3).
- La construction pas à pas de la vue de la calculatrice (d09/33 à 50) et
  de son contrôleur (d09/52 à 72) : le FXML est fourni, et le fascicule
  porte la logique. `fx:define` (d09/73) et les défauts de la calculatrice
  d'origine (d09/74) : sans objet.

**Défauts des anciens decks corrigés** :

- « Nous n'aborderons pas les détails de cette notion de binding » (d11/16) :
  le binding a maintenant une section et un exercice.
- d11/17 renvoie à un exemple liant un `Slider` à une `ProgressBar` que
  le deck ne contient pas. Retiré.
- Un JavaBean « implémente `Serializable` » (d11/10) : c'est une partie de
  la convention historique, mais elle n'a rien à voir avec les propriétés
  JavaFX. La slide 1.3 ne garde que les accesseurs.
- Le modèle de la calculatrice d'origine ne gère pas la division par zéro
  (d09/67) et lève une `NullPointerException` sur « 34+= » (d09/74) : la
  version de FX.9 lève une exception explicite. Rien à corriger dans le
  deck, qui ne reprend pas ce code.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module FX - seconde partie
- Propriétés et architecture

**Note**

Le premier deck vous a appris à réagir à un geste : un clic, une touche.
Celui-ci change de point de vue. Au lieu d'écouter ce que fait
l'utilisateur, on observe des valeurs, et on finit par déclarer qu'une
valeur dépend d'une autre, une fois pour toutes.

La seconde moitié du deck prend de la hauteur. Une application qui grandit
ne peut pas tout mettre dans `start` : on sépare ce qu'on voit de ce qui
calcule, et on finit par décrire l'écran dans un fichier à part.

Rien de ce deck n'est évalué à l'examen. Mais la calculatrice de FX.9 est
la seule application complète du thème, et c'est en la construisant que
vous verrez pourquoi une architecture compte.

---

## Section 1 - Une valeur qui prévient

### 1.1 · Une valeur qui prévient

*(intercalaire)*

### 1.2 · Réagir à un geste, ou à une valeur

**Source** nouvelle ; prépare d11/11

**Slide**

- Un gestionnaire réagit à un geste de l'utilisateur
- Une valeur peut changer sans aucun geste : un collage, un calcul, le programme lui-même
- Ce qu'on veut souvent savoir, c'est que la valeur a changé
- JavaFX rend les valeurs observables : ce sont les propriétés

**Note**

Supposez qu'un libellé doive toujours afficher l'intensité de la lampe.
Avec ce que vous savez, il faudrait le mettre à jour dans chaque
gestionnaire qui modifie l'intensité : le bouton plus, le bouton moins, la
touche flèche, et le jour où on ajoute un curseur, le curseur. Oublier un
seul endroit, c'est afficher une valeur fausse.

Le problème est mal posé. Ce qui compte n'est pas le geste, c'est le
changement de valeur, quelle qu'en soit la cause. JavaFX permet d'observer
une valeur directement : on est prévenu quand elle change, que ce soit par
un clic, une saisie collée, ou une ligne de votre propre programme.

C'est encore l'observateur du module ITF, appliqué cette fois à une
valeur plutôt qu'à un composant.

---

### 1.3 · Une propriété est un objet

**Source** d11/10 à 12, réécrites

**Slide**

- Un champ ordinaire a un accesseur et un mutateur
- Une propriété JavaFX y ajoute un troisième accès, qui retourne l'objet lui-même
- Il existe une classe par type : `IntegerProperty`, `DoubleProperty`, `StringProperty`, `BooleanProperty`

```java
private final IntegerProperty intensite = new SimpleIntegerProperty(50);

public int getIntensite() { return intensite.get(); }

public void setIntensite(int valeur) { intensite.set(valeur); }

public IntegerProperty intensiteProperty() { return intensite; }
```

**Note**

Java n'a pas de notion de propriété dans le langage. Il a une convention,
plus ancienne que JavaFX : un champ privé, un accesseur `get` et un
mutateur `set` qui portent son nom. C'est ce que vous écrivez depuis le
module POO.

JavaFX garde cette convention et y ajoute un accès : une méthode dont le
nom finit par `Property`, et qui retourne non pas la valeur, mais l'objet qui
la contient. C'est sur cet objet qu'on peut s'abonner, ou qu'on peut lier
une autre valeur.

`IntegerProperty` est abstraite ; on instancie `SimpleIntegerProperty`.
Le champ est `final` : la propriété ne change jamais, c'est sa valeur qui
change. Les contrôles JavaFX sont tous écrits sur ce modèle, et c'est ce
qui vous permettra de reconnaître leurs propriétés dans la Javadoc.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.ProprietesEnConsole`.

---

### 1.4 · S'abonner à un changement

**Source** d11/13 et 15, réécrites et réduites

**Slide**

- La méthode `addListener` abonne un `ChangeListener` à la propriété
- Il reçoit trois choses : la propriété, l'ancienne valeur, la nouvelle
- Il n'est appelé qu'aux changements, jamais à l'abonnement

```java
intensite.addListener((propriete, ancienne, nouvelle) ->
        System.out.println(ancienne + " -> " + nouvelle));

intensite.set(80);   // affiche 50 -> 80
intensite.set(80);   // n'affiche rien : la valeur n'a pas change
```

**Note**

`ChangeListener` est une interface fonctionnelle, comme `EventHandler` :
sa méthode unique, `changed`, reçoit trois paramètres, d'où les trois noms
de la lambda.

Le premier est la propriété elle-même. On l'ignore presque toujours, parce
qu'on sait à quoi on s'est abonné. Il sert quand un même listener est
abonné à plusieurs propriétés, et doit savoir laquelle a changé, comme
`getSource` pour un gestionnaire.

Les deux autres ont un type qui surprend. Une `IntegerProperty` est
observable comme `ObservableValue<Number>`, et non comme une valeur
`int` : un type générique ne peut pas être primitif, et JavaFX a choisi un
type commun à tous les nombres. Le listener reçoit donc un `Number`, qu'on
convertit par `intValue` ou `doubleValue`.

Retenez surtout la dernière puce. Un listener ne dit rien tant que rien ne
change : pour afficher la valeur de départ, il faut l'afficher soi-même.

**Réserve** La troisième ligne du code suppose qu'une `IntegerProperty` ne
prévient pas quand on lui donne la valeur qu'elle a déjà. C'est le
comportement documenté de `ChangeListener`, à vérifier sur une machine.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.ProprietesEnConsole`.

---

### 1.5 · Les contrôles en ont aussi

**Source** d11/17, réécrite

**Slide**

- Presque tout ce qu'affiche un contrôle est une propriété
- Une `CheckBox` a une `selectedProperty`, un `Label` une `textProperty`
- On s'y abonne exactement comme à la sienne

```java
CheckBox veilleuse = new CheckBox("Veilleuse");

veilleuse.selectedProperty().addListener(
        (propriete, avant, apres) -> passerEnVeilleuse(apres));
```

**Note**

Les contrôles du deck précédent sont tous bâtis sur des propriétés : leur
texte, leur largeur, leur visibilité, leur état coché ou désactivé. C'est
ce qui permet d'observer n'importe lequel de ces attributs, sans attendre
un événement particulier.

Ici, la case à cocher prévient quand elle change d'état, qu'on l'ait
cochée à la souris, au clavier, ou que le programme l'ait cochée par
`setSelected`. Le paramètre `apres` est un `Boolean`, la nouvelle valeur.

Pour trouver la propriété d'un contrôle, cherchez dans sa Javadoc ou dans
la complétion une méthode qui finit par `Property`. Ctrl+Q ouvre la
Javadoc sans quitter l'éditeur, voir IDE.14. C'est la démarche de FX.6.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.LanceurVariateur`.

---

### 1.6 · Exercices

**Slide**

- **FX.6** - Écouter une propriété
- **FX.7** - Un Slider et un Label

**Note**

`FX.6` vous fait chercher, dans la Javadoc de `TextField`, la propriété à
laquelle s'abonner. Ne cherchez pas ailleurs que dans l'éditeur : la
démarche compte autant que la réponse.

`FX.7` refait le geste sur un curseur, et vous fait rencontrer trois
pièges, que l'énoncé annonce. Vous connaissez déjà deux des trois : le
`Number`, et le listener muet à l'ouverture.

---

## Section 2 - Lier plutôt qu'écouter

### 2.1 · Lier plutôt qu'écouter

*(intercalaire)*

### 2.2 · Une dépendance déclarée

**Source** d11/16, réécrite et développée

**Slide**

- La méthode `bind` lie une propriété à une valeur observable
- La propriété suit cette valeur, à chaque changement, pour toujours
- Rien à afficher au départ : le lien s'applique dès qu'il est posé
- Une propriété liée ne s'écrit plus que par son lien

```java
Label affichage = new Label();

affichage.textProperty().bind(intensite.asString());

intensite.set(80);   // le libelle affiche 80, sans autre ligne
```

**Note**

Un listener dit : quand ceci change, exécute ce code. Un binding dit :
ceci est égal à cela. La différence paraît mince, elle ne l'est pas. Avec
un listener, c'est votre code qui recopie la valeur, et il peut oublier ou
se tromper. Avec un binding, il n'y a plus de code de recopie : la
relation est déclarée une fois, et JavaFX la maintient.

`asString` fabrique, à partir de l'intensité, un texte observable qui la
suit. C'est ce texte qu'on lie au libellé. Le libellé affiche la bonne
valeur dès la création du lien, et la suivra tant qu'il existe.

La dernière puce est une conséquence. Si le texte du libellé est égal à
l'intensité, le modifier à la main n'a plus de sens. La méthode `unbind`
défait le lien quand il le faut.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.LanceurVariateur`.

---

### 2.3 · Des valeurs qui se calculent

**Source** nouvelle ; documentation de `javafx.beans.binding`

**Slide**

| Sur | La méthode | Produit |
|---|---|---|
| un nombre | `add`, `multiply` | un nombre |
| un nombre | `greaterThan`, `lessThan` | un booléen |
| un nombre | `asString` | un texte |
| un texte | `length`, `isEmpty` | un nombre, un booléen |
| un booléen | `not`, `and`, `or` | un booléen |

**Note**

Une propriété ne se lie pas seulement à une autre propriété. Elle se lie à
une expression, et chaque méthode du tableau fabrique une nouvelle valeur
observable, qui se recalcule quand ce dont elle dépend change. Les
expressions s'enchaînent : `intensite.multiply(2).greaterThan(100)` est un
booléen qui suit l'intensité.

C'est ainsi qu'on désactive un bouton sans écrire de condition dans aucun
gestionnaire : `plus.disableProperty().bind(intensite.greaterThan(99))`.
Le bouton se grise de lui-même quand la lampe est au maximum, et se
réactive quand elle redescend, quel que soit le chemin qui l'y a menée.

`asString` accepte aussi un format, comme `String.format` :
`intensite.asString("%d %%")` affiche « 80 % ». Pour assembler plusieurs
morceaux de texte, la classe `Bindings` offre `concat`.

---

### 2.4 · Dans les deux sens *(facultative)*

**Source** nouvelle

**Slide**

- La méthode `bind` fait suivre une propriété, dans un seul sens
- La méthode `bindBidirectional` garde deux propriétés égales, dans les deux sens
- Chacune peut alors être modifiée, et l'autre suit

```java
Slider curseur = new Slider(0, 100, 50);

curseur.valueProperty().bindBidirectional(reglage);

reglage.set(75);   // le curseur se place sur 75
// et si l'utilisateur deplace le curseur, reglage le suit
```

**Note**

Slide facultative : aucun exercice ne l'emploie.

Un binding ordinaire a une source et une cible, et la cible ne s'écrit
plus. Le binding bidirectionnel n'a ni l'une ni l'autre : deux propriétés
sont déclarées égales, et une modification de l'une se reporte sur
l'autre. C'est ce qu'on veut pour un réglage qu'on peut changer de deux
endroits, ici un curseur et une valeur du programme, `reglage`, une
`DoubleProperty`.

Les deux propriétés doivent être du même genre : deux nombres, deux
textes, deux booléens.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.LanceurVariateur`.

---

### 2.5 · Exercices

**Slide**

- **FX.8** - Lier plutôt qu'écouter

**Note**

`FX.8` impose une contrainte : aucun listener, aucun gestionnaire de
clavier. Trois composants dépendent d'un champ de saisie, et chaque
dépendance s'écrit en une instruction.

Comparez votre code à celui de `FX.7` une fois fini. La question de fin
vous demande ce que le binding fait disparaître, et ce qu'il vous fait
perdre : les deux réponses comptent.

---

## Section 3 - Séparer l'écran du calcul

### 3.1 · Séparer l'écran du calcul

*(intercalaire)*

### 3.2 · Trois responsabilités

**Source** d09/14, réécrite

**Slide**

- Le modèle tient les données et les règles, et ignore tout de l'écran
- La vue montre, et ne décide de rien
- Le contrôleur écoute la vue, interroge le modèle, met la vue à jour
- Le modèle se teste par JUnit ; une fenêtre ne se teste pas

**Note**

Jusqu'ici, tout tenait dans une classe : les composants, les
gestionnaires, et la règle elle-même, ce que fait un clic sur
l'interrupteur. Ça suffit pour un compteur. Dès qu'une application
contient une vraie logique, une calculatrice, un jeu, ce mélange coûte
cher.

On sépare alors trois rôles, sous le nom de MVC, modèle, vue, contrôleur.
Le gain le plus visible tient dans la dernière puce. Vous avez vu au
module JUN combien un test JUnit est rapide à écrire et à relancer, et au
début de ce thème pourquoi on ne teste pas une fenêtre. Un modèle qui
n'importe rien de JavaFX se teste comme n'importe quelle classe.

Le second gain est que le modèle survit à son écran. C'est exactement ce
que montrait l'incrément G.33 : la pile, les règles et les stratégies du
Nim sont passées de la console à une fenêtre sans une ligne changée. Seul
`JeuNim`, qui mêlait la boucle de partie et l'affichage, n'a pas suivi.

---

### 3.3 · Qui connaît qui

**Source** nouvelle

**Slide**

- Le contrôleur connaît le modèle et la vue
- Le modèle ne connaît personne
- La vue ne connaît pas le modèle

```java
public class Lampe {                 // le modele, sans JavaFX
    private boolean allumee;
    public void basculer() { allumee = !allumee; }
    public boolean estAllumee() { return allumee; }
}

private void basculer() {            // dans le controleur
    lampe.basculer();
    etat.setText(lampe.estAllumee() ? "Allumee" : "Eteinte");
}
```

**Note**

La règle tient dans les dépendances. Le modèle ne connaît ni les boutons
ni les libellés : il dit seulement si la lampe est allumée, et sait la
basculer. Le contrôleur reçoit le clic, demande au modèle d'agir, puis lit
son état pour mettre la vue à jour.

Comparez au deck FX1. La méthode `basculer` du contrôleur porte le même
nom que celle de la lampe, mais elle ne décide plus de rien : elle
transmet, puis affiche. Si demain la lampe a trois états au lieu de deux,
c'est le modèle qui change, et le contrôleur n'aura qu'à afficher.

Remarquez aussi que le modèle ne contient pas de propriété JavaFX. Ce
serait tentant, pour le lier directement à la vue ; ce serait aussi
importer JavaFX dans le modèle. Le modèle de FX.9 n'en contient pas.

Le code complet : demos, classe `demo.fx.slides.fx2.Lampe`.

---

## Section 4 - Décrire l'écran en FXML

### 4.1 · Décrire l'écran en FXML

*(intercalaire)*

### 4.2 · Écrire l'écran, ou le décrire

**Source** d09/17, 18 et 30, réécrites ; IDE.29

**Slide**

- Jusqu'ici, la vue était du code Java, dans `start`
- Elle peut aussi se décrire dans un fichier `.fxml`, à part
- Scene Builder dessine ce fichier à la souris
- Le FXML n'est pas à l'examen

**Note**

Une vue construite en Java mélange deux choses : la structure de l'écran,
quels conteneurs, quels contrôles, et la façon de la construire, les
`new` et les `getChildren`. Le FXML ne garde que la structure, dans un
fichier XML que JavaFX transforme en objets au chargement.

On y gagne une séparation de plus : le fichier décrit ce qu'on voit, le
contrôleur ce qui se passe. On peut aussi le modifier sans recompiler, et
le dessiner avec Scene Builder, un éditeur visuel facultatif. Son
installation est décrite en IDE.29 du guide IntelliJ.

Le FXML n'est pas au programme de l'examen : la question JavaFX se résout
toujours en Java. Il vous sert à comprendre comment se construisent les
vraies applications, et à faire FX.9, où vous l'écrirez vous-même, guidé
pas à pas par le deck FX3.

---

### 4.3 · Un élément, un objet

**Source** d09/31, 38, 39 et 43, réécrites

**Slide**

- Un élément crée un objet de la classe du même nom
- Un attribut appelle le mutateur du même nom : `spacing` appelle `setSpacing`
- Les éléments imbriqués deviennent les enfants
- Les classes s'importent, comme en Java

```xml
<?import javafx.scene.control.Button?>
<?import javafx.scene.control.Label?>
<?import javafx.scene.layout.VBox?>

<VBox spacing="10" alignment="CENTER">
    <Label text="Eteinte"/>
    <Button text="Interrupteur"/>
</VBox>
```

**Note**

Le XML est un format de texte fait de balises. Un élément s'ouvre et se
ferme, `<VBox>` puis `</VBox>`, ou se ferme aussitôt, `<Label/>`, quand il
n'a pas de contenu. Il contient des attributs, des paires nom et valeur entre
guillemets.

Le FXML donne un sens précis à chaque morceau. Ce fichier crée une `VBox`,
lui fixe un espacement de 10 et un alignement centré, puis lui donne deux
enfants. C'est mot pour mot le code que vous écriviez dans `start`, sans
les `new` ni les appels.

Pour savoir quels attributs un élément accepte, lisez la Javadoc de sa
classe : chaque méthode qui commence par `set` correspond à un attribut.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.LanceurApplicationLampe`.

---

### 4.4 · Charger une vue

**Source** d09/22 et 50, réécrites ; `ApplicationCalculatrice` de FX.9

**Slide**

- Le fichier se range dans `src/main/resources`, dans le même package que la classe
- Un `FXMLLoader` le lit et retourne la racine qu'il décrit
- Le reste ne change pas : une scène, une fenêtre

```java
@Override
public void start(Stage fenetre) throws IOException {
    FXMLLoader chargeur = new FXMLLoader(
            ApplicationLampe.class.getResource("lampe.fxml"));

    fenetre.setScene(new Scene(chargeur.load()));
    fenetre.show();
}
```

**Note**

Un fichier FXML n'est pas du code : Maven le range dans les ressources,
qui sont copiées à côté des classes compilées. La méthode `getResource`
le retrouve à partir de la classe, dans le même package.

Le `FXMLLoader` lit le fichier, crée tous les objets qu'il décrit, et retourne
la racine. Il peut échouer, si le fichier est absent ou mal écrit : la
méthode `load` déclare une `IOException`, contrôlée, que `start` laisse
passer par son `throws`. Vous retrouverez ces exceptions au module FIC.

C'est exactement ce que fait la classe `ApplicationCalculatrice` de FX.9,
qui vous est fournie. Elle ne crée aucun composant et ne branche aucun
gestionnaire : tout est dans le fichier et dans le contrôleur.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.LanceurApplicationLampe`.

---

### 4.5 · La vue et son contrôleur

**Source** d09/45, 46, 55, 58 et 59, réécrites

**Slide**

- L'attribut `fx:controller` nomme le contrôleur
- Un `fx:id` remplit le champ `@FXML` de même nom
- Un `onAction` appelle la méthode `@FXML` désignée

```java
public class ControleurLampe {
    private final Lampe lampe = new Lampe();

    @FXML private Label etat;

    @FXML
    private void basculer(ActionEvent evenement) {
        lampe.basculer();
        etat.setText(lampe.estAllumee() ? "Allumee" : "Eteinte");
    }
}
```

**Note**

Côté fichier, la vue de la lampe porte trois ajouts : `fx:controller`
sur la racine, `fx:id="etat"` sur le libellé, `onAction="#basculer"` sur
le bouton.

Au chargement, le `FXMLLoader` crée un objet de la classe désignée par
`fx:controller`. Puis, pour chaque élément qui porte un `fx:id`, il range
l'objet créé dans le champ du contrôleur qui porte ce nom. C'est ce qu'on
appelle l'injection : le contrôleur ne crée pas ses composants, il les
reçoit.

L'annotation `@FXML` autorise cet accès à un membre privé. Sans elle, le
champ resterait vide, et la méthode introuvable. Le nom et le type doivent
correspondre exactement à ceux du fichier.

`onAction` remplace le `setOnAction` du deck FX1 : le dièse désigne une
méthode du contrôleur. Elle reçoit l'événement, et `getSource` reste
disponible. C'est ce qui permettra à FX.9 de brancher dix boutons sur une
seule méthode.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx2.LanceurApplicationLampe`.

---

### 4.6 · Exercices

**Slide**

- **FX.9** - Une calculatrice, en MVC

**Note**

`FX.9` est la seule application complète du thème, et le deck FX3, « La
calculatrice, pas à pas », la construit avec vous : la vue en FXML d'abord,
puis le contrôleur branché sur ses boutons, enfin le modèle et les
opérateurs. La classe d'application et le `Lanceur` sont fournis.

Suivez le deck dans l'ordre, et faites chaque étape dans votre projet au
moment où elle est montrée. Quand vient le modèle, vérifiez-le avant
d'écrire les opérateurs : la première question de fin vous demande d'écrire
sa classe de test, et c'est le bon moment. Un contrôleur qui appelle un
modèle juste est bien plus simple à mettre au point.

---

## Section 5 - La suite

### 5.1 · Pour aller plus loin

**Source** nouvelle ; projet `DemineurClaude`

**Slide**

- Le démineur : un projet JavaFX complet, facultatif
- Vous écrivez la grille et ses règles ; la fenêtre est fournie
- Onze tests JUnit vérifient votre grille, sans ouvrir de fenêtre

**Note**

Le démineur est un projet à part, livré séparément du recueil. Il applique
exactement ce que la section 3 a posé : toute la logique du jeu tient dans
une classe `Grille`, qui ne connaît rien à JavaFX, et que des tests JUnit
vérifient. L'interface, elle, vous est donnée.

C'est un travail facultatif, à faire à votre rythme, et un bon
entraînement à la frontière entre modèle et vue : les tests vous disent si
votre grille est juste avant même que vous ne lanciez une partie.

Le thème compte un dixième exercice, `FX.10`, sur les threads d'une
application graphique. Il est hors examen et n'est pas traité en séance.

**Réserve** Le démineur a son dépôt, `DemineurClaude`, avec un énoncé en
sept étapes (D.1 à D.7) et un projet étudiant généré par
`depot_demineur.py`. Les onze tests et le squelette n'ont pas été compilés
côté Claude : à lancer avant de l'annoncer.

---

### 5.2 · Le fil rouge

**Source** `GameHub_enonces.docx`, G.33 et G.34

**Slide**

- **G.34** - Des boutons qui savent quand se taire *(fil rouge GameHub)*
- Relire la question de fin du deck FX1

**Note**

Le deck FX1 se terminait sur une question : les boutons qui prendraient
plus d'allumettes qu'il n'en reste devraient être désactivés, mais où
écrire cette règle, et combien de fois ?

`G.34` y répond par un binding. La fenêtre du Nim tient une
`IntegerProperty` qui suit la taille de la pile, et chaque bouton se
désactive par une seule instruction : celui qui prend trois allumettes,
quand il en reste moins de trois. À la fin, tous sont grisés, sans aucune
condition « partie finie ». Les classes du Nim, elles, ne changent
toujours pas.

Avant d'écrire une ligne, demandez-vous qui met cette propriété à jour, et
pourquoi elle vit dans la fenêtre plutôt que dans la pile.

**Réserve** `G.34` est écrit dans le projet GameHub, mais n'a été ni
compilé ni lancé : JavaFX n'est pas disponible côté Claude.
