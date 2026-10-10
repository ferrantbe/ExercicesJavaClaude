# Le matériel JavaFX d'origine

Deux projets, reçus tels quels et conservés sans modification.

## `cours/` — les démonstrations du cours

Quinze packages, numérotés, qui forment déjà une progression. C'est le
matériel de démonstration de `FX`, et il n'y a pas à l'inventer.

| Package | Ce qu'il montre |
|---|---|
| `_00clickMe` | le bouton, `setOnAction`, avec la classe anonyme laissée en commentaire |
| `_01clickCounter` | un compteur, l'état qui vit entre deux clics |
| `_02event` | l'événement comme objet |
| `_03keyEvent` | `setOnKeyPressed`, `setOnKeyTyped`, `setOnKeyReleased` sur la même zone |
| `_04mouseEvent` | `addEventHandler` et `setOnMouseXxx`, avec un gestionnaire partagé entre plusieurs événements |
| `_05eventPropagation` | la propagation, `addEventFilter`, `consume()` — avec une `Correction` |
| `_06sceneSwitcher` | changer de scène dans le même `Stage` |
| `_07exitApp` | une boîte de confirmation, la fermeture |
| `_08layouts` | les gestionnaires de placement |
| `_09simpleControls` | les contrôles, plus une commande de pizza complète |
| `_10advancedControls` | `ComboBox`, `Slider`, `ProgressBar` |
| `_10propertiesAndListeners` | `DoubleProperty` et la convention des accesseurs de propriété |
| `_20proprietes` | le **même** `ChangeListener` écrit de trois façons : classe nommée, anonyme, lambda |
| `com/example/javafx_cours` | le squelette FXML généré par IntelliJ |

## `exercices/` — les exercices 47 à 52

La progression que les étudiants font eux-mêmes, sur un seul exemple.

| Exercice | Ce qu'il ajoute |
|---|---|
| `ex47` | un bouton, un `ActionEvent`, un `TextField` |
| `ex48` | un second bouton, donc un second gestionnaire |
| `ex49` | deux compteurs, `HBox` dans `VBox` |
| `ex50` | un `KeyEvent` sur la racine, des `Label` au lieu de champs |
| `ex51` | `textProperty().addListener` |
| `ex52` | un `Slider` et l'écoute de sa valeur |

## `guichet/` — hors examen

Trois variantes autour des `Thread` et de `Platform.runLater`.

## Deux points techniques relevés

Les deux projets emploient **JPMS**, avec un `opens` et un `exports` par
package. Le projet maître s'en passe volontairement : en mode classpath, FXML
fonctionne par réflexion sans rien déclarer, et on évite d'éditer
`module-info.java` à chaque nouveau package.

Ils utilisent **JavaFX 20.0.1** ; le projet maître est en 21.0.2.

## Ce que `_20proprietes` apporte ailleurs

Ce package montre le même `ChangeListener` en classe nommée, en classe anonyme
et en lambda. C'est exactement la démonstration `LAM` proposée — et elle est
déjà écrite, avec ton matériel.
