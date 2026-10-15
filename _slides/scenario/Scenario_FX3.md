# Scénario du deck FX3 - La calculatrice, pas à pas

*Quatre sections, 27 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_fx3.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Ce qu'on va construire | Le projet |
| 2 | La vue, pas à pas | La vue |
| 3 | Le contrôleur | Le contrôleur |
| 4 | Le modèle, et la fin | Le modèle |

**FX3 est un code de deck, pas de thème.** Le thème reste FX, avec un seul
fascicule. Ce deck accompagne un seul exercice, FX.9, qu'il guide pas à pas.

**Source** : l'ancien deck 09 (JavaFX Calculatrice), slides 24 à 74, demandé
par le professeur le 15/10/2026 pour que les étudiants suivent la construction
de l'écran étape par étape. Réécrites pour le projet du cours :

- **retirées** parce que fausses aujourd'hui : la configuration d'IntelliJ, le
  SDK JavaFX, l'assistant de projet, `HelloApplication` (slides 16 à 22). Le
  projet Maven et la classe `Lanceur` les remplacent (deck FX1, section 1) ;
- **alignées** sur le corrigé de FX.9 : `Controleur`, `Modele`, `affichage`,
  `chiffrePresse`, `operateurPresse`, `effacer`, `calculer`, `premierNombre`,
  `operateurEnAttente`, `nouvelleSaisie`, le package `be.ephec.java.fx.e09`,
  le fichier `calculatrice.fxml` dans `src/main/resources` ;
- **corrigées** : l'ancien modèle rendait 0 pour une division par zéro ; celui
  de FX.9 lève une exception, que le contrôleur traduit en « Erreur »
  (CC-ERR.1). L'ancien deck donnait 250 pour la largeur du rectangle, et 230
  pour les boutons : le rectangle fait ici 230, la largeur des quatre boutons
  et de leurs trois espaces ;
- **laissées à l'étudiant**, comme dans l'ancien deck : le corps de
  `chiffrePresse`, de `calculer` et d'`operateurPresse`. Le deck en donne la
  règle, pas le code.

**Le FXML de FX.9** n'est plus fourni : le squelette ne contient que la
racine et `fx:controller`, et l'étudiant écrit le reste en suivant la section
2. Le corrigé contient le fichier complet, identique à celui que construit
le deck.

---

## Section 0 - Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module FX - la calculatrice
- Pas à pas, de la vue au modèle

**Note**

Ce deck n'apprend rien de neuf : il assemble ce que les deux decks FX ont
posé, sur une seule application. Vous allez construire une calculatrice
complète, en suivant les étapes ensemble : d'abord l'écran, en FXML, puis
le contrôleur qui réagit aux boutons, enfin le modèle qui calcule.

C'est l'exercice FX.9. Gardez-le ouvert à côté du deck : chaque étape se
fait dans votre projet, au moment où elle est montrée.

---

## Section 1 - Ce qu'on va construire

### 1.1 · Ce qu'on va construire

*(intercalaire)*

### 1.2 · Une calculatrice simplifiée

**Source** d09/25, réécrite

**Slide**

- Les quatre opérations, sur des entiers seulement
- Les opérations s'enchaînent dans l'ordre où on les tape
- `2 x 3 + 4 x 5` donne donc 50, et non 26

**Note**

On simplifie pour garder la logique lisible. Pas de décimales : la
calculatrice travaille sur des entiers, et 13 divisé par 4 donne 3.

Pas de priorité des opérations non plus. Chaque opérateur calcule ce qui
précède : 2 x 3 donne 6, plus 4 donne 10, fois 5 donne 50. Une vraie
calculatrice donnerait 26, en faisant d'abord les multiplications. C'est
une amélioration possible, citée à la fin du deck.

---

### 1.3 · Trois fichiers, trois rôles

**Source** d09/27, réécrite pour le projet Maven

**Slide**

- La vue : `calculatrice.fxml`, à écrire en premier
- Le contrôleur : `Controleur`, qui réagit aux boutons
- Le modèle : `Modele`, qui calcule, sans rien savoir de JavaFX
- Fournis : `ApplicationCalculatrice` et `Lanceur`

```java
src/main/java/be/ephec/java/fx/e09/
    ApplicationCalculatrice.java   // fournie
    Lanceur.java                   // fournie
    Controleur.java                // a ecrire
    Modele.java                    // a ecrire
src/main/resources/be/ephec/java/fx/e09/
    calculatrice.fxml              // a ecrire
```

**Note**

C'est le découpage MVC du deck FX2, appliqué. Chaque rôle a son fichier, et
c'est l'ordre de travail : la vue d'abord, parce qu'on la voit tout de
suite ; puis le contrôleur, branché sur ses boutons ; enfin le modèle, que
le contrôleur appelle.

Le fichier FXML n'est pas à côté des classes : il est dans
`src/main/resources`, sous le même chemin de package. C'est là que Maven
range les fichiers qui ne sont pas du code, et c'est là que
`getResource` les cherche.

`ApplicationCalculatrice` charge la vue et l'affiche ; `Lanceur` démarre
le tout. Vous n'y touchez pas.

---

### 1.4 · L'application charge la vue

**Source** d09/22 et 50, réécrites ; `ApplicationCalculatrice` de FX.9

**Slide**

- `start` charge le fichier FXML, et en fait la scène
- La racine du FXML nomme le contrôleur : `fx:controller`
- JavaFX crée lui-même le contrôleur, et le relie à la vue

```java
FXMLLoader chargeur = new FXMLLoader(
        ApplicationCalculatrice.class.getResource("calculatrice.fxml"));

stage.setScene(new Scene(chargeur.load()));
```

**Note**

C'est le mécanisme vu à la fin du deck FX2. Le chargeur lit le fichier,
crée un objet pour chaque élément, et rend la racine : on en fait la scène.

En lisant la racine, il trouve l'attribut `fx:controller`. Il crée alors un
objet de cette classe, sans que vous écriviez de `new`, et c'est lui qui
recevra les clics. Le squelette de FX.9 contient déjà cette racine : vous
partez d'un fichier qui se charge, et qui affiche une fenêtre vide.

Le code complet : demos, classe `demo.fx.slides.fx2.ApplicationLampe`, le même
mécanisme sur la lampe.

---

### 1.5 · Les composants utilisés

**Source** d09/26, réécrite

**Slide**

| Composant | Rôle dans la calculatrice |
|---|---|
| `VBox` | la racine : empile les lignes de haut en bas |
| `StackPane` | l'écran : superpose un cadre et un texte |
| `Rectangle` | le cadre de l'écran |
| `Text` | le nombre affiché |
| `HBox` | une ligne de boutons, de gauche à droite |
| `Button` | une touche |

**Note**

Six classes suffisent, toutes vues dans le deck FX1. Deux conteneurs pour
ranger, `VBox` et `HBox`, un conteneur pour superposer, `StackPane`, et
trois composants qu'on voit : un cadre, un texte et des boutons.

Le `Rectangle` est une forme, et non un contrôle : il ne réagit à rien, il
dessine seulement le cadre de l'écran. Le `Text` est posé par-dessus.

---

## Section 2 - La vue, pas à pas

### 2.1 · La vue, pas à pas

*(intercalaire)*

### 2.2 · Le plan de l'écran

**Source** d09/34 à 36, réécrites

**Slide**

- Une `VBox` de 300 sur 300, espacement 10
- En haut, un `StackPane` : un cadre de 230 sur 50, et le texte
- Puis quatre `HBox` de quatre boutons de 50 sur 50, espacés de 10

```java
+--------------------------------+
|  [            0             ]  |   StackPane : Rectangle + Text
|    [7]  [8]  [9]  [/]          |   HBox
|    [4]  [5]  [6]  [x]          |   HBox
|    [1]  [2]  [3]  [-]          |   HBox
|    [0]  [C]  [=]  [+]          |   HBox
+--------------------------------+   VBox
```

**Note**

Avant d'écrire une ligne, on dessine l'arbre. La racine est une `VBox`, qui
empile ses enfants. Son premier enfant est l'écran ; les quatre suivants sont
les lignes de touches.

Les dimensions sont choisies pour tomber juste : quatre boutons de 50 et
trois espaces de 10 font 230, exactement la largeur du cadre. Tout sera
donc aligné, une fois centré.

---

### 2.3 · Deux mots de XML

**Source** d09/31 et 32, condensées

**Slide**

- Un élément s'ouvre et se ferme : `<HBox> ... </HBox>`, ou `<Text />`
- Il peut porter des attributs : `<Button text="7" />`
- Les éléments s'emboîtent : l'emboîtement est l'arbre

```java
<marin id="12">
    <nom>Surcouf</nom>
    <prenom>Robert</prenom>
</marin>
```

**Note**

Le FXML est du XML : des étiquettes qui encadrent des données. Un élément
s'ouvre et se ferme ; s'il ne contient rien, il se ferme lui-même, d'une
barre avant le chevron. Un élément peut porter des attributs, sous la forme
`nom="valeur"`.

Ce qui compte pour nous, c'est l'emboîtement : un élément écrit à
l'intérieur d'un autre en est l'enfant. L'arbre du plan précédent va donc
s'écrire tel quel.

---

### 2.4 · Le squelette

**Source** d09/37, réécrite

**Slide**

- La racine est la `VBox`, qui nomme le contrôleur
- Ses enfants : un `StackPane`, puis quatre `HBox`, vides pour l'instant

```java
<VBox xmlns:fx="http://javafx.com/fxml"
      fx:controller="be.ephec.java.fx.e09.Controleur">
    <StackPane></StackPane>
    <HBox></HBox>
    <HBox></HBox>
    <HBox></HBox>
    <HBox></HBox>
</VBox>
```

**Note**

Le squelette de FX.9 vous donne la racine, avec son contrôleur. Ajoutez-y
les cinq enfants, vides : l'arbre est déjà là, il ne reste qu'à le remplir.

Le nom du contrôleur est complet, package compris. Une faute dans ce nom, et
le chargement échoue au lancement, avec un message qui parle de
`ClassNotFoundException`.

---

### 2.5 · Un attribut, c'est un setter

**Source** d09/38 à 41, réécrites

**Slide**

- Chaque élément est une classe Java, chaque attribut une méthode `set`
- `setAlignment` devient l'attribut `alignment`
- La Javadoc de la classe dit donc quels attributs existent

```java
<VBox prefWidth="300" prefHeight="300" spacing="10" alignment="CENTER" ...>
    <StackPane alignment="CENTER"></StackPane>
```

**Note**

`<VBox>` crée un objet `VBox`, exactement comme `new VBox()`. Et chaque
attribut appelle le setter correspondant : `prefWidth="300"` appelle
`setPrefWidth(300)`, `alignment="CENTER"` appelle `setAlignment` avec la
constante `Pos.CENTER` de l'énumération.

C'est la règle à retenir, parce qu'elle vous rend autonome : pour savoir ce
qu'on peut écrire sur un élément, on cherche les setters de sa classe dans
la Javadoc. L'espacement entre les enfants d'une `VBox` ? Il y a un
`setSpacing` : l'attribut s'appelle `spacing`.

---

### 2.6 · Le cadre de l'écran

**Source** d09/42 et 43, réécrites

**Slide**

- Dans le `StackPane`, un `Rectangle` de 230 sur 50
- Chaque classe utilisée doit être importée en tête du fichier
- IntelliJ propose l'import manquant, comme pour le code Java

```java
<?import javafx.scene.layout.*?>
<?import javafx.scene.shape.*?>
<?import javafx.scene.text.*?>
<?import javafx.scene.control.*?>

<StackPane alignment="CENTER">
    <Rectangle width="230" height="50" fill="TRANSPARENT" stroke="GRAY"/>
</StackPane>
```

**Note**

Le rectangle est transparent, avec un bord gris : c'est le cadre de
l'afficheur. Ouvrez à ce moment le fichier dans Scene Builder (guide
IntelliJ, IDE.29) : il refusera d'abord d'afficher `StackPane`, `HBox` ou
`Rectangle`.

La raison est la même qu'en Java : le FXML ne connaît une classe que si on
l'importe. Les instructions `<?import ...?>` se placent en tête du fichier,
avant la racine. Les quatre lignes de la slide couvrent tout ce dont la
calculatrice a besoin. Sous le curseur rouge, Alt+Entrée propose l'import
manquant.

---

### 2.7 · Le texte, relié au contrôleur

**Source** d09/44 à 46, réécrites

**Slide**

- Par-dessus le cadre, un `Text` qui affichera les nombres
- `fx:id` lui donne un nom ; le contrôleur a un champ du même nom
- `@FXML` dit à JavaFX d'y injecter l'objet créé

```java
<StackPane alignment="CENTER">
    <Rectangle width="230" height="50" fill="TRANSPARENT" stroke="GRAY"/>
    <Text fx:id="affichage" text="0"/>
</StackPane>

public class Controleur {
    @FXML
    private Text affichage;
}
```

**Note**

Dans un `StackPane`, le dernier enfant est au-dessus : le texte s'affiche
donc par-dessus le cadre, centré.

C'est ce texte que le contrôleur modifiera à chaque touche. Il lui faut donc
une référence vers lui. Le lien passe par deux bouts qui doivent
correspondre exactement : l'attribut `fx:id` dans le FXML, et un champ de
même nom et de même type dans le contrôleur, marqué `@FXML`. Au chargement,
JavaFX crée le `Text`, puis le range dans ce champ.

Le champ reste privé : `@FXML` donne à JavaFX le droit de le remplir, sans
l'ouvrir à personne d'autre.

---

### 2.8 · Une ligne de touches

**Source** d09/47 et 48, réécrites

**Slide**

- Chaque `HBox` est espacée de 10, comme la `VBox`
- Elle contient quatre `Button` de 50 sur 50, avec leur texte

```java
<HBox spacing="10">
    <Button text="7" prefWidth="50" prefHeight="50"/>
    <Button text="8" prefWidth="50" prefHeight="50"/>
    <Button text="9" prefWidth="50" prefHeight="50"/>
    <Button text="/" prefWidth="50" prefHeight="50"/>
</HBox>
```

**Note**

Les quatre lignes se ressemblent : écrivez la première, vérifiez-la dans
Scene Builder, puis copiez-la trois fois et changez les textes. La dernière
ligne porte 0, C, = et +.

Les boutons ne font encore rien : aucune méthode ne leur est attachée. On
les branchera à la section suivante.

---

### 2.9 · Un défaut à corriger

**Source** d09/49, réécrite

**Slide**

- Dans Scene Builder, les lignes de touches sont collées à gauche
- Le cadre, lui, est centré : rien n'est aligné
- À vous de trouver l'attribut qui corrige cela

**Note**

C'est la petite énigme de la vue. La `VBox` centre ses enfants, mais chaque
`HBox` occupe toute la largeur, et range ses boutons à partir de la gauche.

La réponse est un attribut déjà rencontré, à poser sur chaque `HBox` :
`alignment="CENTER"`. Laissez les étudiants chercher avant de la donner :
c'est exactement la démarche de la slide « Un attribut, c'est un setter ».

---

### 2.10 · Vérifier, puis lancer

**Source** d09/50, réécrite

**Slide**

- Scene Builder montre la vue à chaque étape, sans lancer
- Lancer `Lanceur` affiche la calculatrice
- Les boutons ne font rien encore : c'est normal

**Note**

Deux façons de vérifier, à alterner. Scene Builder affiche le FXML tel
quel, sans programme : c'est le plus rapide pour juger d'un alignement.
Lancer l'application, par `Lanceur`, prouve en plus que le fichier se
charge, que le contrôleur est trouvé, et que le champ `affichage`
correspond au `fx:id`.

Si le lancement échoue, lisez la fin du message : un nom de contrôleur mal
écrit, un `fx:id` sans champ correspondant, ou un import oublié en sont
presque toujours la cause.

---

### 2.11 · Un dernier détail, facultatif

**Source** d09/73, réécrite

**Slide**

- `fx:define` crée un objet réutilisable dans la vue
- Une police de 18, définie une fois, sert au texte et aux touches

```java
<fx:define>
    <Font fx:id="POLICE" size="18"/>
</fx:define>

<Text fx:id="affichage" text="0" font="$POLICE"/>
<Button text="7" prefWidth="50" prefHeight="50" font="$POLICE"/>
```

**Note**

Une amélioration d'aspect, à faire si le temps le permet. `fx:define`
déclare un objet sans l'afficher, ici une police, et lui donne un nom. Le
signe dollar y fait référence ensuite, autant de fois qu'on veut.

L'intérêt est le même qu'une constante en Java : changer la taille à un
seul endroit change toute la calculatrice. Il faut importer `Font`, dans
`javafx.scene.text`, déjà couvert par l'import de la slide du cadre.

---

## Section 3 - Le contrôleur

### 3.1 · Le contrôleur

*(intercalaire)*

### 3.2 · Que doit faire chaque touche ?

**Source** d09/56 et 57, réécrites

**Slide**

- Un comportement par touche ? Un seul pour toutes ?
- Deux familles : les chiffres modifient le nombre affiché
- Les opérateurs calculent, et retiennent ce qui a été tapé
- Et « C » remet tout à zéro

**Note**

Posez la question avant de montrer la réponse. Seize touches, mais combien
de comportements différents ? Les dix chiffres font la même chose : ils
ajoutent leur chiffre au nombre affiché. Les opérateurs et le « = » font
tous la même chose aussi : ils déclenchent un calcul.

D'où trois méthodes dans le contrôleur, et non seize : `chiffrePresse`,
`operateurPresse` et `effacer`.

---

### 3.3 · Trois méthodes, branchées sur la vue

**Source** d09/55, 58 et 59, réécrites

**Slide**

- Une méthode du contrôleur, marquée `@FXML`, reçoit un `ActionEvent`
- Dans le FXML, `onAction="#nom"` désigne la méthode à appeler
- Pour commencer, chaque méthode écrit un mot dans la console

```java
@FXML
private void chiffrePresse(ActionEvent evenement) {
    System.out.println("chiffre");
}

<Button text="7" prefWidth="50" prefHeight="50" onAction="#chiffrePresse"/>
<Button text="+" prefWidth="50" prefHeight="50" onAction="#operateurPresse"/>
```

**Note**

C'est `setOnAction` du deck FX1, écrit dans le FXML. Le dièse dit au
chargeur de chercher une méthode de ce nom dans le contrôleur, et de
l'appeler à chaque clic. Oublier le dièse est l'erreur la plus fréquente.

Avant d'écrire la logique, branchez tout et lancez : chaque clic doit faire
apparaître « chiffre », « opérateur » ou « effacer » dans la console. Une
touche muette est une touche mal branchée, et c'est le bon moment de le
voir.

Le squelette de FX.9 contient déjà les trois méthodes, qui lèvent une
exception : remplacez leur corps par un `println` pour cette étape.

---

### 3.4 · Quelle touche a été pressée ?

**Source** d09/61, réécrite

**Slide**

- Dix boutons, une seule méthode : c'est l'événement qui le dit
- `getSource` rend le bouton cliqué, `getText` son texte

```java
String chiffre = ((Button) evenement.getSource()).getText();
```

**Note**

C'est la source de l'événement, vue dans le deck FX1. `getSource` rend un
`Object`, puisqu'un événement peut venir de n'importe quoi. Ici, on sait que
c'est un bouton : on le convertit, puis on lit son texte.

Écrire dix méthodes, une par chiffre, aurait fonctionné, et aurait été dix
fois la même chose.

---

### 3.5 · Les chiffres

**Source** d09/62, réécrite

**Slide**

- Si l'écran montre « 0 », le chiffre le remplace
- Sinon, il s'accole à la fin : 56 puis 2 donne 562
- `affichage.getText()` lit l'écran, `affichage.setText(...)` l'écrit
- À vous d'écrire `chiffrePresse`

**Note**

Sans la première règle, taper 5 puis 6 afficherait « 056 ». Les deux
règles tiennent en un `if`.

Écrivez-la maintenant, et vérifiez : taper 5, 6, 2 doit afficher 562, et le
zéro de départ doit disparaître au premier chiffre. Une seconde règle
viendra s'ajouter quand le contrôleur saura calculer.

---

### 3.6 · Et les opérateurs ?

**Source** d09/63, réécrite

**Slide**

- Un opérateur ne modifie pas seulement l'écran : il calcule
- Avant de l'écrire, il faut savoir qui calcule
- Comment programmeriez-vous une calculatrice sans fenêtre ?

**Note**

Une pause, avant la section suivante. Demandez aux étudiants comment ils
écriraient une calculatrice en console : que ferait le programme, quelles
seraient ses variables, et de quel type ?

La réponse les mène au modèle : une classe qui calcule, sans rien savoir de
l'écran, et qu'on peut tester seule.

---

## Section 4 - Le modèle, et la fin

### 4.1 · Le modèle, et la fin

*(intercalaire)*

### 4.2 · Ce que fait le modèle

**Source** d09/66 et 67, réécrites ; division par zéro selon FX.9

**Slide**

- Une seule méthode : `calculer(premier, second, operateur)`
- Elle choisit l'opération d'après l'opérateur, et rend le résultat
- Une division par zéro lève une `ArithmeticException`
- À vous d'écrire `Modele`, puis sa classe de test

```java
public long calculer(long premier, long second, String operateur) {
    return switch (operateur) {
        case "+" -> premier + second;
        // ... les trois autres, et la division par zero
    };
}
```

**Note**

Le modèle est le cœur de la calculatrice, et la partie la plus simple :
deux nombres, un opérateur, un résultat. Un `switch` sur l'opérateur suffit.

La division par zéro est le seul piège. L'ancien cours rendait 0, ce qui
faisait passer une erreur pour un résultat. Le modèle de FX.9 lève une
exception, et c'est le contrôleur qui décidera d'afficher « Erreur ».
Voir CC-ERR.1.

Le modèle n'importe rien de JavaFX : il se teste par JUnit, comme au module
JUN. C'est la première question de fin de FX.9, et le bon moment pour y
répondre.

---

### 4.3 · Le contrôleur connaît le modèle

**Source** d09/69 et 70, réécrites

**Slide**

- Le contrôleur crée son modèle, et le garde dans un champ
- Il retient aussi, entre deux clics, ce qu'on a tapé

```java
private final Modele modele = new Modele();

private long premierNombre = 0;
private String operateurEnAttente = "";
private boolean nouvelleSaisie = true;
```

**Note**

Une opération se tape en plusieurs clics : un nombre, un opérateur, un
second nombre, puis un autre opérateur ou « = ». Entre ces clics, le
contrôleur doit se souvenir du premier nombre et de l'opérateur choisi :
ce sont des champs, puisqu'une variable locale disparaît à la fin de la
méthode.

Le booléen `nouvelleSaisie` dit si le prochain chiffre commence un nouveau
nombre. Le modèle, lui, ne retient rien : il calcule ce qu'on lui donne.

---

### 4.4 · Les chiffres, une seconde règle

**Source** d09/71, réécrite

**Slide**

- Après un opérateur, le chiffre suivant repart de zéro
- Sinon, 5 + 6 afficherait 56
- C'est le rôle de `nouvelleSaisie`

**Note**

Après « 5 + », l'écran montre encore 5. Le chiffre suivant ne doit pas s'y
accoler : il commence le second nombre. Le contrôleur le sait grâce à
`nouvelleSaisie`, mis à vrai par chaque opérateur.

Complétez `chiffrePresse` : si une nouvelle saisie commence, le chiffre
remplace l'écran, et `nouvelleSaisie` repasse à faux.

---

### 4.5 · À vous : les opérateurs

**Source** d09/72, réécrite selon l'énoncé de FX.9

**Slide**

- S'il y a un opérateur en attente, on calcule ; on affiche le résultat
- On retient le nouvel opérateur ; « = » ne retient rien
- Une division par zéro affiche « Erreur », et tout repart à zéro
- `effacer` remet l'écran à 0, et oublie ce qui était en attente

**Note**

C'est la seule méthode que le deck ne guide pas pas à pas : l'énoncé de
FX.9 en donne la logique, et sa liste « Ce que vous devez observer » sert
de vérification.

Attention au tout premier opérateur : rien n'est encore en attente, il
n'y a donc rien à calculer. Et le contrôleur attrape l'exception du modèle,
puisque c'est lui qui sait quoi afficher.

---

### 4.6 · Vérifier la calculatrice

**Source** énoncé de FX.9, « Ce que vous devez observer »

**Slide**

- 12 + 5 = affiche 17 ; 13 / 4 = affiche 3
- 2 + 3 + 4 = affiche 9 : chaque opérateur calcule ce qui précède
- 1 / 0 = affiche « Erreur », puis la calculatrice repart
- « C » remet tout à zéro, y compris l'opérateur en attente

**Note**

Ce thème n'a pas de test JUnit pour la fenêtre : la vérification passe par
ces observations, une à une. La liste complète est dans l'énoncé de FX.9.

Le modèle, lui, a sa classe de test, si vous l'avez écrite à l'étape
précédente. C'est toute la différence que fait l'architecture : la partie
qui calcule se vérifie en une seconde, la fenêtre se vérifie à la main.

---

### 4.7 · Et après ?

**Source** d09/74, réécrite

**Slide**

- Taper les chiffres au clavier
- Respecter la priorité des opérations, puis les parenthèses
- Ajouter des opérations : modulo, puissance

**Note**

La calculatrice est volontairement limitée. Chaque amélioration de la
liste est un bon exercice libre.

Taper au clavier demande d'écouter les `KeyEvent` de la scène, vus dans le
deck FX1. La priorité des opérations change le modèle bien plus que le
contrôleur, et c'est le signe d'un bon découpage : la vue n'a pas à bouger.

---

### 4.8 · Exercices

**Slide**

- **FX.9** - Une calculatrice, en MVC

**Note**

FX.9 suit exactement ce deck : la vue d'abord, puis le contrôleur branché,
puis le modèle et sa classe de test, enfin les opérateurs. L'énoncé donne
la logique des opérateurs et la liste de ce qu'il faut observer.
