# Scénario du deck FX1 - Une fenêtre qui réagit

*Cinq sections et une slide de fil rouge, 31 slides plus le sommaire.
Rubriques : `**Source**` et `**Réserve**` sont des commentaires de
fabrication, `**Slide**` et `**Note**` produisent le contenu et les notes du
présentateur.*

## Fabrication

Sections à déclarer dans `module_fx1.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Lancer une application JavaFX | Le lancement |
| 2 | Une fenêtre et ses composants | La fenêtre |
| 3 | Brancher un bouton | Les gestionnaires |
| 4 | Ce que dit un événement | Les événements |
| 5 | Un événement voyage | La propagation |

La slide du fil rouge (6.1) n'a pas d'intercalaire, comme la slide 5.1 du
deck FIC.

**FX1 est un code de deck, pas de module.** Le module reste FX, avec un seul
fascicule (`FX_enonces.docx`) et des exercices numérotés de FX.1 à FX.10.
Ce deck couvre FX.1 à FX.5 ; le deck FX2 couvre FX.6 à FX.9.

**Sources** : deck 10 (`d10.pptx`, 49 slides : événements, Stage et Scene,
layouts, contrôles), deck 09 (`d09.pptx`, slides 7 à 22 : présentation et
configuration, en grande partie périmées), `FX_enonces.docx`,
`Demo_FX.docx` et son code (`demos/.../demo/fx/`), les corrigés de
`be.ephec.java.fx` (e01 à e05), le mémento technique (TEC-FX.1, TEC-FX.2,
TEC-FX.4), le guide IntelliJ (IDE.11, IDE.14, IDE.28, ERR.7), les scénarios
ITF (5.5, l'observateur annonce JavaFX) et LAM (4.1, qui promet le retrait
d'un gestionnaire rangé dans un champ), les six questions 5 d'examen de
2022 à 2025. L'intercalaire vient de `d10`, slide 2.

**Place dans le cours** : quatorzième deck (`ORDRE = 14`, partagé avec FX2,
décidé). Les interfaces et l'observateur (ITF), les collections, les
exceptions, JUnit, la généricité et les lambdas, références de méthode
comprises (LAM), sont connus.

**Le poids à l'examen** : ce deck porte toute la question 5. Les six
sessions lues portent sur `setOnAction` et le clic souris (2022, 2024 s1),
`removeEventHandler` avec un gestionnaire rangé dans un champ (2023), un
`KeyEvent` posé sur la racine, par `getCharacter` ou par `getCode` et les
flèches (2023, 2024), un filtre, un gestionnaire et `consume()` (2025,
deux sessions). Le deck FX2 ne porte rien qui soit évalué.

**Le partage avec la démonstration et le fascicule** :

- La démonstration est jouée en trois temps, au lieu d'un bloc avant FX.1
  (décidé) : étapes 1 et 2 en 3.3 (le bouton qui ne fait rien, puis les
  trois écritures du gestionnaire), étape 3 en 4.2 (le `KeyEvent` posé sur
  la scène), étapes 4 et 5 en 5.2 (la propagation, puis `consume`). Chaque
  fois, le deck explique après coup ce que la démonstration a montré. Il ne
  montre ni la classe anonyme dépliée, ni l'erreur des parenthèses
  (`setOnAction(clicBouton())`), que la démonstration rate exprès.
- Le fascicule porte : le tableau du vocabulaire, du `Stage` au contrôle,
  et le squelette `MonApp` ; les « deux réflexes » (ce qui survit à `start`
  est un champ, la lambda dit quand et la méthode dit quoi) ; la méthode
  `rafraichir` (FX.2) ; l'arbre des conteneurs, l'espacement et la marge
  intérieure (FX.3) ; l'encadré « posez le gestionnaire sur la racine » et
  le `String` de `getCharacter` (FX.4) ; l'empilement à construire (FX.5) ;
  l'absence de classe de test. Le deck ne les répète pas.
- Le deck porte ce que ni l'un ni l'autre ne pose : la bibliothèque hors du
  JDK, la classe `Lanceur` en séance, l'appel de `start`, le graphe de
  scène, le catalogue des conteneurs et des contrôles, la programmation
  événementielle, `EventHandler` comme interface fonctionnelle et comme
  observateur, `addEventHandler` et `removeEventHandler`, le contenu d'un
  événement et `getSource`, les familles d'événements, `KEY_PRESSED` et
  `getCode`, le `MouseEvent`, les deux phases de la propagation, filtre et
  gestionnaire, `consume`.

**Décisions appliquées** :

- Le lancement ouvre le deck (section 1) : rien ne s'exécute sans lui.
  La classe `Lanceur` y est expliquée en séance, bien que le fascicule la
  présente aussi : c'est le premier obstacle des premières minutes.
- `KEY_PRESSED` et `getCode` sont posés après le renvoi vers FX.4, et
  précédés d'une slide qui pose la question explicitement (4.6) : la
  deuxième question de FX.4 fait chercher la différence entre `KEY_TYPED`
  et `KEY_PRESSED`, et l'examen 2024 s2 exige `getCode`. L'étudiant cherche,
  puis le deck répond.
- Le deck donne des réponses dans ses exemples quand une notion l'exige
  (décidé) : `setOnAction` n'accepte qu'un gestionnaire (3.5, question 2 de
  FX.5), `setEditable` (2.5), `consume` dans un filtre (5.5, seconde partie
  de FX.5). C'est ce que l'examen évalue.
- `removeEventHandler` et le gestionnaire rangé dans un champ (3.5) tiennent
  la promesse du deck LAM (4.1) et préparent la question 5 de 2023.
- Les exemples suivent une lampe de bureau (`Lampe`, un `Label` d'état, un
  bouton interrupteur, une ampoule en `Circle`), pour ne réutiliser ni le
  compteur des exercices, ni `ClicApp` et `PropagationApp` de la
  démonstration, ni la calculatrice de FX.9.
- Le fil rouge reçoit un nouvel incrément, G.33, présenté en 6.1. Le deck
  FX2 présentera G.34.

**Retirés des anciens decks** :

- L'histoire AWT, Swing, JavaFX et les sept modules (d09/9 à 13) : TEC-FX.1
  et TEC-FX.3, cités en note de 1.2.
- La configuration d'IntelliJ (d09/16) et la création d'un projet par
  l'assistant JavaFX (d09/20 à 22) : elles ne s'appliquent pas à un projet
  Maven, IDE.28 les remplace.
- Le MVC (d09/14) et Scene Builder (d09/17 et 18) : deck FX2.
- Les huit sommaires répétés de d10 (3, 6, 31, 36, 38, 40).
- Les trois écritures du gestionnaire sur trois slides (d10/18 à 21) : la
  démonstration les montre, 3.4 n'en garde que l'idée.
- Les coordonnées illustrées du `MouseEvent` (d10/14 et 15) : une ligne de
  4.8.
- Les styles et le propriétaire d'un `Stage` (d10/34), plusieurs scènes dans
  une fenêtre (d10/35), quitter l'application (d10/37) : aucun exercice.
  `WINDOW_CLOSE_REQUEST` reste cité dans le tableau de 4.4.
- `FlowPane` et `GridPane` (d10/39) : aucun exercice, cités en note de 2.4.
- `CheckBox`, `Slider`, `ProgressBar` et les contrôles avancés (d10/42 et
  43) : deck FX2, qui en a besoin pour FX.6 et FX.7.
- Les énoncés 46 à 51 (d10/29 et 45 à 49), et leur copie dans d11 (3 à 6) :
  le fascicule. La version « touches H et F » du deck 10 disparaît avec eux.
  Le démineur (d10/49) est annoncé en fin de deck FX2.

**Défauts des anciens decks corrigés** :

- La configuration d'IntelliJ (d09/16) fait télécharger un SDK JavaFX et
  activer un greffon : faux pour un projet Maven. Corrigé en 1.2.
- La source d'un événement serait « la souris » (d10/10) : c'est le nœud
  dont le gestionnaire est en train de s'exécuter. Corrigé en 4.3 et 5.3.
- `button.setOnAction(e -> System.out.println("Button!");` (d10/22) ne
  compile pas : une parenthèse manque. Retiré.
- `setEventHandler` est présenté comme une méthode utilisable de `Node`
  (d10/23) : elle est `protected`. Retirée.
- Un événement consommé « ne déclenche plus d'autre EventFilter ni
  EventHandler » (d10/27) : les gestionnaires posés sur le même nœud sont
  encore appelés. Nuancé en 5.5, voir la réserve.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module FX - première partie
- Une fenêtre qui réagit

**Note**

Jusqu'ici, vos programmes posaient des questions et attendaient la réponse
dans la console. Ce module change de rapport : c'est l'utilisateur qui
décide de ce qui arrive, et quand. Votre programme attend, et réagit.

Le module FX est le plus gros du cours, et il est découpé en deux decks. Ce
premier deck couvre les cinq premiers exercices, de la première fenêtre au
voyage d'un événement. Le second traitera des propriétés et de
l'architecture d'une application.

Ce premier deck porte toute la question JavaFX de l'examen. Chaque année,
elle demande de relier un composant au code qu'il déclenche : c'est
exactement ce que vous allez apprendre ici.

---

## Section 1 - Lancer une application JavaFX

### 1.1 · Lancer une application JavaFX

*(intercalaire)*

### 1.2 · JavaFX n'est plus dans le JDK

**Source** nouvelle ; TEC-FX.2 et IDE.28 ; remplace d09/16, périmée

**Slide**

- Depuis Java 11, JavaFX est une bibliothèque à part
- Le projet du cours la déclare dans son `pom.xml`, comme JUnit
- Maven la télécharge : rien à installer, rien à configurer

```xml
<dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-controls</artifactId>
    <version>21.0.2</version>
</dependency>
```

**Note**

JavaFX a été livrée avec le JDK pendant quelques années, puis en a été
retirée. C'est devenu un projet indépendant, OpenJFX. Installer un JDK 21 ne
vous donne donc pas JavaFX : il faut l'ajouter au projet, comme n'importe
quelle bibliothèque.

Le projet du cours le fait pour vous depuis le premier jour. Les lignes de
la slide sont déjà dans son `pom.xml`, à côté de celles de JUnit, et Maven a
téléchargé la bibliothèque au premier chargement.

Vous trouverez en ligne des procédures qui font télécharger un SDK JavaFX et
le déclarer dans IntelliJ. Ne les suivez pas : elles concernent les projets
sans Maven. Voir IDE.28 du guide IntelliJ.

Si vous vous demandez pourquoi Java a connu trois bibliothèques graphiques
successives, AWT, Swing et JavaFX, la réponse est en TEC-FX.1 du mémento
technique.

---

### 1.3 · La classe à lancer s'appelle `Lanceur`

**Source** nouvelle ; TEC-FX.4, fascicule « La classe à lancer »

**Slide**

- Une application JavaFX hérite de `Application`
- Lancée directement, elle refuse de démarrer
- On lance une autre classe, qui n'hérite de rien et appelle `launch`

```java
public class LanceurLampe {

    public static void main(String[] args) {
        Application.launch(Lampe.class, args);
    }
}
```

**Note**

Chaque exercice et chaque démonstration de ce module contient une classe
dont le nom commence par `Lanceur`. C'est elle qu'il faut exécuter, et non
celle qui hérite d'`Application`.

La raison est un contrôle du lanceur de Java. Quand la classe principale
hérite d'`Application`, il exige que JavaFX soit chargé d'une façon
particulière, comme module. Or Maven place les bibliothèques sur le
classpath ordinaire. Le lanceur s'arrête alors, avant d'avoir exécuté une
seule ligne de votre code, avec un message qui semble faux.

Une classe qui n'hérite de rien ne déclenche pas ce contrôle. Son `main`
s'exécute, et c'est `Application.launch` qui démarre JavaFX. Ce n'est pas un
bricolage : c'est la forme recommandée pour une application JavaFX qui ne
passe pas par les modules. L'explication complète est en TEC-FX.4.

Vous n'avez rien à écrire dans ces classes. Elles sont fournies.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurLampe`.

---

### 1.4 · Si rien ne démarre

**Source** nouvelle ; ERR.7 et IDE.28

**Slide**

- « JavaFX runtime components are missing » : rien ne manque
- Vous avez lancé la classe d'application au lieu du `Lanceur`
- En secours : `javafx:run`, dans la fenêtre Maven (guide IntelliJ, `IDE.28`)

**Note**

C'est le message le plus fréquent des premières minutes de JavaFX, et le
plus trompeur. Il dit que des composants manquent, alors qu'ils sont tous
là. Il signifie seulement que la bibliothèque n'a pas été annoncée à la
machine virtuelle au démarrage.

Le premier réflexe est de vérifier la classe lancée : la configuration
d'exécution d'IntelliJ désigne-t-elle bien le `Lanceur` ?

Le second est de passer par Maven. Dans la fenêtre Maven, sous Plugins puis
javafx, un double-clic sur `javafx:run` construit lui-même la bonne ligne de
commande. La classe lancée est réglée dans le `pom.xml` : le premier
exercice par défaut, un autre si vous le précisez. La procédure pas à pas,
avec le choix du module et le lancement d'un autre exercice, est en IDE.28
du guide IntelliJ ; le message lui-même est expliqué en ERR.7.

---

## Section 2 - Une fenêtre et ses composants

### 2.1 · Une fenêtre et ses composants

*(intercalaire)*

### 2.2 · Qui appelle `start` ?

**Source** d10/4 et 5, réécrites

**Slide**

- La méthode `launch` crée l'objet `Application`, puis appelle `start`
- JavaFX fournit la fenêtre, et la passe en paramètre
- La méthode `start` construit l'écran, l'affiche, et se termine
- La fenêtre, elle, reste ouverte

```java
public class Lampe extends Application {

    @Override
    public void start(Stage fenetre) {
        Label etat = new Label("Eteinte");
        fenetre.setScene(new Scene(new StackPane(etat), 300, 150));
        fenetre.setTitle("Lampe");
        fenetre.show();
    }
}
```

**Note**

Vous n'écrivez jamais `new Lampe()`, et vous ne créez pas la fenêtre. C'est
JavaFX qui le fait : `launch` construit un objet de votre classe, avec son
constructeur sans paramètre, puis appelle sa méthode `start` en lui donnant
une fenêtre déjà prête. Votre travail se limite à la remplir et à
l'afficher.

La classe `Application` est abstraite, et `start` est sa méthode abstraite :
c'est le module ABS appliqué à une bibliothèque. JavaFX sait quand appeler
`start` ; vous seul savez quoi y mettre.

Remarquez la dernière ligne de la slide. La méthode `start` se termine en
quelques millisecondes, mais la fenêtre reste ouverte et le programme
continue de tourner. Ce qu'il fait pendant ce temps est le sujet de la
section suivante.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurLampe`.

---

### 2.3 · Le graphe de scène

**Source** d10/33 et 35, réécrites ; partagée en deux le 15/10/2026, à la demande
du professeur, quand le schéma Stage / Scene / racine / nœuds a été ajouté. Dans le
deck remanié, ce schéma est une image, à droite des puces.

**Slide**

- Une fenêtre (`Stage`) affiche une scène (`Scene`)
- La scène contient une seule racine
- Un conteneur range des enfants, qui peuvent être des conteneurs
- L'ensemble forme un arbre de nœuds (`Node`)

**Note**

Tout ce qu'une fenêtre affiche est un nœud, un objet d'une sous-classe de
`Node` : un libellé, un bouton, un cercle, et aussi les conteneurs qui les
rangent. Les nœuds s'emboîtent : une racine contient des enfants, qui
contiennent leurs propres enfants. On appelle cet arbre le graphe de scène.

L'image se lit de bas en haut. La fenêtre, le `Stage`, est fournie par
JavaFX. Elle affiche une scène, la `Scene`. La scène n'accepte qu'un nœud,
sa racine. Et cette racine contient tous les autres nœuds : ce sont eux qu'on
voit.

Pour afficher plusieurs composants, on les range donc dans un conteneur, qui
devient la racine. La slide suivante construit cet empilement en code.

---

### 2.3a · Construire le graphe de scène

**Source** seconde moitié de l'ancienne slide 2.3

**Slide**

- On crée les nœuds, puis le conteneur qui les range, puis la scène autour de la racine
- `getChildren()` retourne la liste des enfants : on peut y ajouter après coup

```java
Label etat = new Label("Eteinte");
Button interrupteur = new Button("Interrupteur");

VBox racine = new VBox(etat, interrupteur);
Scene scene = new Scene(racine, 300, 150);

// Un enfant peut s'ajouter apres coup
racine.getChildren().add(new Label("Bureau"));
```

**Note**

Le même arbre, construit en code, dans l'ordre où on l'écrit : d'abord les
nœuds qu'on verra, le libellé et le bouton ; puis le conteneur qui les range,
une `VBox`, qui devient la racine ; enfin la scène, qui reçoit cette racine.
Il ne reste qu'à donner la scène à la fenêtre, ce que fait `start`.

Les enfants d'un conteneur se lisent et se modifient par `getChildren`, qui
retourne une liste : vous savez déjà vous en servir depuis le module COL. On
peut donc ajouter un nœud après coup, comme la dernière ligne le montre.

Si on ne donne pas de taille à la scène, elle s'adapte à son contenu.

Gardez cet arbre en tête. Il est la clé de la section 5 : un événement le
parcourt de haut en bas, puis de bas en haut.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurInterrupteur`.

---

### 2.4 · Les conteneurs

**Source** d10/39, réduite aux quatre conteneurs des exercices

**Slide**

| Conteneur | Range ses enfants | Usage typique |
|---|---|---|
| `HBox` | côte à côte | une rangée de boutons |
| `VBox` | les uns sous les autres | un formulaire |
| `BorderPane` | en cinq zones | une application |
| `StackPane` | empilés et centrés | un texte sur une forme |

**Note**

En JavaFX, on ne place pas un composant à des coordonnées fixes. On le
confie à un conteneur, qui décide de sa position et la recalcule quand la
fenêtre change de taille. C'est ce qui permet à une interface de rester
lisible quand on l'agrandit.

Les quatre conteneurs du tableau sont ceux des exercices. Un `BorderPane` ne
range pas ses enfants dans une liste : il a cinq zones, le haut, le bas, la
gauche, la droite et le centre, et on les remplit une à une, par `setTop`,
`setCenter` ou `setBottom`. Un `StackPane` centre ses enfants les uns sur
les autres. Un `StackPane` empile ses enfants dans
l'ordre où on les ajoute : le dernier est au-dessus.

Il en existe d'autres, que vous rencontrerez dans la Javadoc : `FlowPane`,
qui passe à la ligne comme un texte, et `GridPane`, qui range en lignes et
en colonnes.

---

### 2.5 · Les contrôles

**Source** d10/41 et 42, réduites aux contrôles de FX.1 à FX.4

**Slide**

- Un `Label` affiche un texte que l'utilisateur ne modifie pas
- Un `TextField` reçoit une saisie, que `getText` relit
- Un `Button` déclenche une action quand on l'actionne

```java
Label consigne = new Label("Piece :");
TextField saisie = new TextField("Bureau");
Button valider = new Button("Valider");

saisie.setPromptText("ex. Cuisine");
String piece = saisie.getText();
saisie.setEditable(false);
```

**Note**

Un contrôle est un nœud avec lequel l'utilisateur interagit. Les trois de
la slide suffisent pour les quatre premiers exercices.

Les trois partagent `setText` et `getText`. Le `TextField` y ajoute ses
propres réglages : un texte d'invite grisé tant que le champ est vide, et
`setEditable(false)`, qui le met en lecture seule. Un champ en lecture seule
affiche une valeur que seul le programme peut changer.

La Javadoc de chaque contrôle est longue : ne cherchez pas à la lire en
entier. Cherchez-y ce dont vous avez besoin, au moment où vous en avez
besoin. Ctrl+Q sur un nom de classe l'ouvre sans quitter l'éditeur, voir
IDE.14.

D'autres contrôles, la case à cocher et le curseur, attendront le deck
suivant, qui en a besoin.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurInterrupteur`.

---

## Section 3 - Brancher un bouton

### 3.1 · Brancher un bouton

*(intercalaire)*

### 3.2 · Le programme attend

**Source** d10/8 et 9, réécrites

**Slide**

- Un programme console décide de l'ordre dans lequel les choses arrivent
- Une interface graphique attend que l'utilisateur agisse
- Chaque geste produit un événement
- JavaFX le transmet au code qui s'y est abonné, et à lui seul

**Note**

Dans un programme console, c'est vous qui menez : le programme affiche une
question, lit la réponse, passe à la suivante. L'ordre est écrit dans le
code.

Une interface graphique renverse ce rapport. L'utilisateur peut cliquer sur
n'importe quel bouton, dans n'importe quel ordre, ou taper au clavier. Le
programme ne sait pas ce qui va arriver : il attend. Chaque geste, un clic,
une touche, un déplacement de souris, devient un objet, un événement, que
JavaFX transmet au code qui a demandé à en être prévenu. On appelle cette
façon de programmer la programmation événementielle.

Vous avez déjà rencontré ce mécanisme sous un autre nom. Au module ITF, le
magasin prévenait ses abonnés sans les connaître : c'est l'observateur.
Un bouton fonctionne exactement ainsi. Il ne connaît pas votre programme ;
il connaît une interface, et votre code vient s'y abonner.

Un événement sans abonné se perd. C'est ce que va montrer la
démonstration.

---

### 3.3 · Démonstration

**Source** `Demo_FX.docx`, étapes 1 et 2, 7 minutes, avant FX.1

**Slide**

- Démo : le bouton qui ne fait rien

**Note**

La démonstration part d'un bouton qui s'affiche, s'enfonce quand on
clique, et ne déclenche rien. Tout y est correct ; il manque une seule
chose.

Elle le branche ensuite de trois façons qui produisent le même objet.
Retenez moins la syntaxe que la question : quel est cet objet que le bouton
reçoit, et qu'en fait-il ?

---

### 3.4 · Un gestionnaire est un objet

**Source** d10/16 et 17, réécrites ; reprend l'idée de d10/18 à 21

**Slide**

- L'interface `EventHandler` déclare une seule méthode, `handle`
- Elle est fonctionnelle : une lambda suffit à en créer un objet
- Le bouton garde cet objet, et appelle `handle` à chaque clic

```java
// javafx.event.EventHandler, simplifiee
public interface EventHandler<T extends Event> {
    void handle(T evenement);
}

// Le bouton recoit un objet qui implemente l'interface
interrupteur.setOnAction(evenement -> basculer());
```

**Note**

La démonstration a montré trois écritures, et elles produisent la même
chose : un objet qui implémente `EventHandler`. Le bouton le range, et
quand on clique, il appelle sa méthode `handle` en lui passant
l'événement.

L'interface est générique : son paramètre dit quel type d'événement le
gestionnaire reçoit. Celui d'un bouton reçoit un `ActionEvent`. Elle est
aussi fonctionnelle, puisqu'elle ne déclare qu'une méthode : c'est pourquoi
la lambda suffit, et c'est pourquoi le deck LAM vous l'annonçait.

Lisez la lambda de la slide en deux temps. La flèche dit quand : au moment
où l'événement survient. La méthode appelée dit quoi : basculer la lampe.
Le paramètre `evenement` est reçu, même si on ne s'en sert pas ici.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurInterrupteur`.

---

### 3.5 · `setOnAction` n'est qu'un raccourci

**Source** d10/22 et 23, réécrites et corrigées ; scénario LAM, 4.1 ;
examen 2023

**Slide**

- La méthode `addEventHandler` nomme le type d'événement écouté
- Les gestionnaires ajoutés s'additionnent
- Pour en retirer un, `removeEventHandler` veut le même objet : on le range dans un champ

```java
private final EventHandler<ActionEvent> basculement =
        evenement -> basculer();

private void verrouiller() {
    interrupteur.removeEventHandler(ActionEvent.ACTION, basculement);
}

private void deverrouiller() {
    interrupteur.addEventHandler(ActionEvent.ACTION, basculement);
}
```

**Note**

La méthode `setOnAction` est un raccourci. Elle n'accepte qu'un
gestionnaire à la fois : un second appel remplace le premier. La forme
longue, `addEventHandler`, dit explicitement quel type d'événement on
écoute, ici `ActionEvent.ACTION`, et elle cumule : deux gestionnaires
ajoutés s'exécutent tous les deux.

Pour retirer un gestionnaire, `removeEventHandler` demande l'objet exact qui
a été ajouté. Écrire deux fois la même lambda ne suffit pas : chaque
écriture crée un objet distinct, et le retrait ne trouverait rien à
retirer. C'est la promesse du module LAM : une lambda est une valeur, qu'on
range dans un champ pour la retrouver plus tard.

C'est aussi une question d'examen classique : activer un bouton et en
désactiver un autre, en ajoutant et retirant leurs gestionnaires.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurInterrupteur`.

---

### 3.6 · Exercices

**Slide**

- **FX.1** - Un compteur de participants
- **FX.2** - Un bouton Reset
- **FX.3** - Deux compteurs, et une mise en page

**Note**

Les trois exercices construisent la même application, de plus en plus
riche. `FX.1` branche un bouton, `FX.2` en ajoute un second qui agit sur le
même compteur, `FX.3` double les compteurs et compose les conteneurs.

Ce module n'a aucune classe de test. Chaque énoncé se termine par la liste
de ce que vous devez observer en lançant l'application : parcourez-la point
par point, c'est elle qui remplace la barre verte de JUnit.

Lisez les deux réflexes de l'introduction du fascicule avant `FX.1`. Ils
vous éviteront l'erreur la plus fréquente : un composant déclaré dans
`start`, et introuvable ensuite.

---

## Section 4 - Ce que dit un événement

### 4.1 · Ce que dit un événement

*(intercalaire)*

### 4.2 · Démonstration

**Source** `Demo_FX.docx`, étape 3, 4 minutes, avant FX.4

**Slide**

- Démo : une touche frappée

**Note**

La démonstration ajoute un gestionnaire de clavier à l'application de
tout à l'heure. Observez deux choses : ce que le gestionnaire reçoit, et
l'endroit où on le pose.

---

### 4.3 · Ce que transporte un événement

**Source** d10/10 et 16, réécrites et corrigées ; d09/61

**Slide**

- Le gestionnaire reçoit l'événement en paramètre
- La méthode `getSource` retourne le composant dont le gestionnaire s'exécute
- La méthode `getEventType` dit ce qui s'est passé
- Un même gestionnaire peut alors servir à plusieurs composants

```java
// dans start
allumer.setOnAction(this::noterBouton);
eteindre.setOnAction(this::noterBouton);

private void noterBouton(ActionEvent evenement) {
    Button presse = (Button) evenement.getSource();
    journal.setText("Dernier bouton : " + presse.getText());
}
```

**Note**

Jusqu'ici, le paramètre du gestionnaire était ignoré. Il contient pourtant
tout ce qu'on sait de l'événement : son type, le composant concerné, et
selon la famille, la touche frappée ou la position de la souris.

La méthode `getSource` retourne un `Object` : il faut le transtyper pour
s'en servir comme bouton. Le transtypage est sûr ici, puisque seuls des
boutons ont reçu ce gestionnaire. Vous retrouverez ce geste dans le deck
suivant, pour un gestionnaire partagé par les dix chiffres d'une
calculatrice.

La référence de méthode `this::noterBouton` vient du module LAM : elle vaut
la lambda `evenement -> noterBouton(evenement)`.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurInterrupteur`.

---

### 4.4 · Les familles d'événements

**Source** d10/11 et 12, réunies en tableau

**Slide**

| Classe | Produit par | Types utiles ici |
|---|---|---|
| `ActionEvent` | un bouton actionné | `ACTION` |
| `KeyEvent` | le clavier | `KEY_PRESSED`, `KEY_TYPED` |
| `MouseEvent` | la souris | `MOUSE_CLICKED` |
| `WindowEvent` | la fenêtre | `WINDOW_CLOSE_REQUEST` |

**Note**

Toutes ces classes héritent d'`Event`. Chacune déclare des champs statiques
qui désignent ses types précis : ce sont eux qu'on passe à
`addEventHandler`, comme `ActionEvent.ACTION` à la slide 3.5. Le tableau ne
retient que ceux des exercices et de l'examen ; il y en a d'autres,
`KEY_RELEASED`, `MOUSE_MOVED` ou `MOUSE_ENTERED` par exemple. Chaque famille
a aussi un type `ANY`, qui les regroupe tous.

Un `ActionEvent` vient aussi d'un champ de saisie quand on y presse Entrée,
et `WINDOW_CLOSE_REQUEST` survient quand l'utilisateur ferme la fenêtre :
c'est là qu'on lui demanderait de confirmer.

Un piège vous attend à l'import. Il existe un `KeyEvent` et un `MouseEvent`
dans `java.awt.event`, hérités d'une bibliothèque plus ancienne, et ils
n'ont rien à voir avec ceux de JavaFX. Quand la complétion vous propose un
nom, lisez le paquetage avant de valider : il doit commencer par `javafx`.
Voir TEC-FX.1 et IDE.11.

---

### 4.5 · Exercices

**Slide**

- **FX.4** - Compter au clavier

**Note**

`FX.4` reprend l'application de `FX.3` et lui ajoute le clavier : les
touches 1, 2 et 0 font ce que font les boutons. Les boutons continuent de
fonctionner.

L'encadré de l'énoncé vous dit où poser le gestionnaire. La question de
fin vous demande pourquoi cela fonctionne même quand un bouton a le focus :
gardez-la pour la section suivante, qui y répond.

---

### 4.6 · À vous de chercher

**Source** nouvelle ; deuxième question de FX.4

**Slide**

- La touche « flèche haut » ne produit aucun caractère
- Comment votre programme peut-il savoir qu'on l'a enfoncée ?
- Cherchez dans la Javadoc de `KeyEvent` : comparez `KEY_TYPED` et `KEY_PRESSED`

**Note**

Prenez cinq minutes avant de passer à la slide suivante. Ctrl+Q sur
`KeyEvent` ouvre sa Javadoc ; sa description explique la différence entre
les trois types d'événements clavier, et dit quelles méthodes ont un sens
pour chacun.

Une piste : le gestionnaire de `FX.4` lit un caractère. Qu'obtient-il pour
une touche qui n'en produit pas ?

---

### 4.7 · Une touche, deux événements

**Source** d10/12 et 13, réécrites ; examen 2024 s2

**Slide**

- Le type `KEY_TYPED` donne un caractère, par `getCharacter`
- Le type `KEY_PRESSED` donne une touche, par `getCode`, un `KeyCode`
- Une flèche n'a pas de caractère : seul `KEY_PRESSED` la voit

```java
racine.addEventHandler(KeyEvent.KEY_PRESSED, this::toucheEnfoncee);

private void toucheEnfoncee(KeyEvent evenement) {
    switch (evenement.getCode()) {
        case UP -> augmenterIntensite();
        case DOWN -> diminuerIntensite();
        default -> { }
    }
}
```

**Note**

Une touche enfoncée produit toujours un `KEY_PRESSED`, puis un
`KEY_RELEASED` quand on la lâche. Si elle produit un caractère, un
`KEY_TYPED` s'y ajoute. Les deux familles ne répondent pas à la même
question : `KEY_TYPED` dit quel texte l'utilisateur a tapé, `KEY_PRESSED`
dit quelle touche physique il a enfoncée. Les flèches, Échap ou F1
n'ont pas de caractère : seul `KEY_PRESSED` les voit, et `getCode` les
nomme par une valeur de l'énumération `KeyCode`.

La méthode `getCharacter` n'a de sens que pour `KEY_TYPED`, et `getCode`
que pour `KEY_PRESSED` et `KEY_RELEASED` : dans l'autre cas, elles
retournent une valeur vide. C'est pourquoi le gestionnaire de `FX.4`
n'aurait rien vu de la flèche haut.

Le `switch` sur une énumération vient du module ENU : les étiquettes
s'écrivent sans le nom du type, `UP` et non `KeyCode.UP`. La branche
`default` vide dit explicitement que les autres touches ne font rien.

**Réserve** Les flèches servent aussi à JavaFX pour déplacer le focus d'un
bouton à l'autre. À vérifier sur une machine : le gestionnaire posé sur la
racine reçoit-il bien les flèches quand un bouton a le focus ? L'examen
2024 s2 le suppose, avec des carrés et sans bouton.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurClavierEtSouris`.

---

### 4.8 · La souris

**Source** d10/14 et 15, réduites ; examen 2022

**Slide**

- Le type `MOUSE_CLICKED` survient quand on presse puis relâche sur le même nœud
- Les méthodes `getX` et `getY` donnent la position dans le nœud
- La méthode `getClickCount` distingue le simple clic du double clic
- La méthode `getButton` dit quel bouton de la souris a servi

```java
ampoule.addEventHandler(MouseEvent.MOUSE_CLICKED, evenement -> {
    if (evenement.getClickCount() == 2) {
        basculer();
    }
});
```

**Note**

N'importe quel nœud peut recevoir des événements de souris, pas seulement
un bouton : ici, l'ampoule est un `Circle`. La position se lit aussi dans la scène, par `getSceneX`
et `getSceneY`, ou sur l'écran, par `getScreenX`. Un double clic produit deux
`MOUSE_CLICKED` : le premier avec un compte de 1, le second avec un compte
de 2. Le test de la slide ne réagit donc qu'au second.

Un bouton produit à la fois un `ActionEvent` et des `MouseEvent`, et ce ne
sont pas les mêmes déclencheurs. L'`ActionEvent` survient aussi quand on
actionne le bouton au clavier, avec la barre d'espace. Le `MOUSE_CLICKED`
ne survient qu'à la souris. Quand un énoncé demande d'utiliser le clic de
souris comme déclencheur, c'est le second qu'il attend.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurClavierEtSouris`.

---

## Section 5 - Un événement voyage

### 5.1 · Un événement voyage

*(intercalaire)*

### 5.2 · Démonstration

**Source** `Demo_FX.docx`, étapes 4 et 5, 7 minutes, avant FX.5

**Slide**

- Démo : un événement voyage

**Note**

La démonstration pose trois gestionnaires : deux sur un cercle, un sur le
conteneur qui l'entoure. Un seul clic les déclenche tous les trois.
Notez l'ordre dans lequel ils s'affichent, avant qu'on ne l'explique.

Puis une case à cocher change le comportement du conteneur. Regardez ce
que deviennent les gestionnaires du cercle.

---

### 5.3 · L'aller et le retour

**Source** d10/24 et 25, réécrites

**Slide**

- JavaFX trace d'abord le chemin, de la fenêtre jusqu'au nœud visé
- L'événement descend ce chemin : c'est la capture
- Il atteint la cible, puis remonte le même chemin : c'est le bouillonnement
- Chaque nœud traversé peut intervenir, à l'aller comme au retour

**Note**

Un clic sur le cercle ne concerne pas que le cercle. Le cercle est dans un
conteneur, qui est dans la scène, qui est dans la fenêtre : le clic a eu
lieu dans chacun d'eux. JavaFX en tient compte en faisant voyager
l'événement le long de la branche du graphe de scène qui mène au nœud
cliqué, la cible.

Le voyage a deux phases. À la descente, de la fenêtre vers la cible, chaque
nœud peut intercepter l'événement avant ses enfants. À la remontée, de la
cible vers la fenêtre, chaque nœud peut réagir à ce qui s'est passé chez
ses enfants. Le terme anglais de la seconde phase, *bubbling*, évoque une
bulle qui remonte à la surface.

Voilà pourquoi le gestionnaire de clavier de `FX.4` fonctionne sur la
racine : la touche est adressée au composant qui a le focus, et remonte
jusqu'à elle. C'est aussi pourquoi `getSource` change au fil du voyage :
il désigne le nœud dont le gestionnaire s'exécute, alors que `getTarget`
désigne toujours la cible.

---

### 5.3a · La propagation des événements

**Source** deck 10 (JavaFX Événements), slide 24, importée telle quelle le 15/10/2026
avec son animation, à la demande du professeur. Dans le deck remanié, le schéma et
l'animation sont ceux d'origine ; la version texte ci-dessous est celle que produit
le moteur. Crédit : Stack Overflow, question 25740103.

**Slide**

- On clique sur le cercle : l'événement part de la cible
- Il remonte le chemin vers la fenêtre, nœud par nœud
- Chaque gestionnaire rencontré pour ce type d'événement est appelé

**Note**

L'animation montre ce que fait un gestionnaire enregistré par addEventHandler.
On clique sur le cercle : l'événement part de lui, la cible, et remonte le chemin
vers la fenêtre, nœud par nœud. Chaque nœud traversé qui porte un gestionnaire
pour ce type d'événement le déclenche au passage.

Ici, deux gestionnaires sont attachés au même nœud : ils sont appelés tous les
deux, l'un après l'autre. C'est la phase de remontée, qu'on appelle le
bouillonnement : l'image de la bulle qui remonte à la surface.

---

### 5.3b · Les `EventFilter`

**Source** deck 10, slide 25, importée avec son animation (voir 5.3a).

**Slide**

- Le chemin est parcouru en deux phases
- La capture : l'événement descend de la fenêtre vers la cible
- Le bouillonnement : il remonte de la cible vers la fenêtre

**Note**

L'événement ne part pas directement de la cible. JavaFX trace d'abord le
chemin, de la fenêtre jusqu'au nœud visé, puis le fait parcourir deux fois.

Première phase, la capture : l'événement descend du Stage vers la cible, en
passant par la scène et chaque conteneur. Seconde phase, le bouillonnement : il
remonte le même chemin, de la cible vers le Stage. L'animation montre ce trajet
en U.

Les deux phases existent pour tout événement. Ce qui change, c'est qui écoute à
quel moment : c'est l'objet de la slide suivante.

---

### 5.3c · `EventHandler` et `EventFilter`

**Source** deck 10, slide 26, importée avec son animation (voir 5.3a).

**Slide**

- Deux types d'objets traitent les événements
- Les `EventFilter` lors de la descente
- Les `EventHandler` lors de la remontée

**Note**

Deux sortes d'objets peuvent réagir sur ce trajet. Les filtres, enregistrés par
addEventFilter, sont appelés pendant la descente. Les gestionnaires, enregistrés
par addEventHandler ou par les raccourcis setOnAction et setOnMouseClicked, sont
appelés pendant la remontée.

Un filtre posé sur un conteneur voit donc passer l'événement avant ses enfants,
et avant la cible. C'est ce qui lui permet de l'intercepter, par consume, avant
qu'il n'arrive : la slide consume() le montre.

Dans la quasi-totalité des cas, un gestionnaire suffit. Le filtre sert quand un
conteneur doit surveiller ou bloquer ce qui arrive à tous ses enfants.

---

### 5.4 · Filtre ou gestionnaire

**Source** d10/26, réécrite en tableau

**Slide**

| | Filtre | Gestionnaire |
|---|---|---|
| Phase | la descente | la remontée |
| Ordre | du haut vers la cible | de la cible vers le haut |
| Ajout | `addEventFilter` | `addEventHandler` |
| Sert à | intercepter avant les enfants | réagir à ce qui s'est passé |

**Note**

Filtre et gestionnaire sont le même type d'objet, un `EventHandler`. Ce qui les
distingue, c'est le moment où on les appelle : un filtre pendant la
descente, un gestionnaire pendant la remontée. C'est pour cela qu'ils
portent deux noms, et qu'on les ajoute par deux méthodes différentes.

Dans la démonstration, le filtre du conteneur s'affichait avant les
gestionnaires du cercle. Ce n'était pas une question d'ordre d'écriture :
le conteneur est traversé à la descente, avant que l'événement n'atteigne
le cercle.

Les raccourcis `setOnAction` ou `setOnMouseClicked` posent tous des
gestionnaires. Presque tout le code JavaFX en reste là. Un filtre se justifie
quand un conteneur doit voir un événement avant ses enfants, et parfois les
en priver. C'est le sujet de la slide suivante.

---

### 5.5 · `consume()`

**Source** d10/27, réécrite et corrigée ; examens 2025

**Slide**

- La méthode `consume` marque l'événement comme traité
- Les nœuds suivants du chemin ne le reçoivent plus
- Consommé par un filtre, il n'atteint jamais la cible
- Les autres gestionnaires du même nœud sont, eux, encore appelés

```java
panneau.addEventFilter(MouseEvent.MOUSE_CLICKED, evenement -> {
    if (verrouille) {
        evenement.consume();
    }
});
```

**Note**

Un filtre qui consomme l'événement l'arrête dans sa descente : la cible et
tout ce qui suit ne le verront jamais. C'est ce qu'a fait la case à cocher
de la démonstration. On s'en sert pour bloquer une saisie, ou pour qu'un
panneau verrouillé ignore les clics qui lui sont destinés, sans toucher au
code de ses enfants.

Vous connaissez maintenant deux façons de rendre un composant sourd. On
peut retirer son gestionnaire, par `removeEventHandler`, ou laisser le
gestionnaire en place et intercepter l'événement plus haut, par un filtre.
La première agit sur un composant, la seconde sur tout ce qu'un conteneur
contient.

La dernière ligne de la slide est une nuance. `consume` arrête le voyage
d'un nœud au suivant ; il n'empêche pas les autres gestionnaires posés sur
le même nœud de s'exécuter.

**Réserve** La quatrième puce est tirée de l'implémentation de JavaFX
(tous les gestionnaires d'un même nœud reçoivent l'événement, la
consommation est vérifiée avant de passer au nœud suivant), pas d'un essai.
À vérifier sur une machine avant la séance : deux gestionnaires sur un même
nœud, le premier appelle `consume`, le second s'affiche-t-il ? Si ce n'est
pas le cas, retirer la puce et le dernier paragraphe de la note.

Le code complet, à lancer : demos, classe `demo.fx.slides.fx1.LanceurClavierEtSouris`.

---

### 5.6 · Exercices

**Slide**

- **FX.5** - Un événement voyage

**Note**

`FX.5` fait construire ce que la démonstration a montré, avec un
empilement de quatre niveaux : vous verrez le filtre, puis les
gestionnaires, et vous constaterez ce qu'un clic à côté du cercle
déclenche.

La seconde partie tient en une ligne. Ne la cherchez pas dans le cercle.

---

## Section 6 - Le fil rouge

### 6.1 · Le fil rouge

**Source** `GameHub_enonces.docx`, G.17 et G.33

**Slide**

- **G.33** - Le Nim dans une fenêtre *(fil rouge GameHub)*
- Les classes du Nim servent telles quelles, sauf sa boucle

**Note**

Jusqu'ici, on joue à GameHub dans la console. `G.33` donne une fenêtre au
jeu de Nim, vous contre la machine : un libellé affiche la pile, trois
boutons prennent une, deux ou trois allumettes, et les touches 1, 2 et 3
font la même chose. Après chaque coup, la stratégie de la machine joue le
sien. La fenêtre est une application à part, avec son propre lanceur : le
hub console ne change pas.

La contrainte qui compte : la pile, les règles et les stratégies servent
sans une ligne changée. `JeuNim`, en revanche, ne sert pas : sa méthode
`jouer` est une boucle qui va jusqu'au bout de la partie sans s'arrêter, et
une fenêtre ne peut pas l'attendre. La question de l'incrément est là : où
est passée la boucle ? Relisez la slide 3.2 avant de répondre.

Une question à garder pour le deck suivant : les boutons qui prendraient
plus d'allumettes qu'il n'en reste devraient être désactivés. Où écririez-
vous cette règle, et combien de fois ?

**Réserve** `G.33` est écrit dans le projet GameHub (`fenetre/FenetreNim`,
`LanceurFenetreNim`), mais n'a été ni compilé ni lancé : JavaFX n'est pas
disponible côté Claude. À éprouver avant la séance. La question de fin
annonce `G.34`, au deck FX2.
