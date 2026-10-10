# Renumérotation des exercices — Java IN2 2026-2027

Table de correspondance entre la numérotation actuelle (héritée de 2023-2024) et la
numérotation thématique proposée.

Principe : le préfixe encode le **thème**, jamais le rang de la séance. Un déplacement de
sujet dans le calendrier ne provoque plus aucune renumérotation.

Convention de package associée : `be.ephec.java.<theme>.e<nn>` — le package se déduit
mécaniquement du code de l'exercice (`TAB.3` → `be.ephec.java.tab.e03`).

---

## Séance 1 — 19/01 — Parallèle C#/Java, IntelliJ, POO, Scanner, types primitifs

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 1 | `POO.1` | Classe `Personne`, champs publics, `computeAge`, `display` | 01 / s50 |
| Exercice 2 | `POO.2` | Encapsulation de `Personne`, accesseurs | 01 / s53 |
| Exercice 3 | `POO.3` | Application `Hello`, saisie via `Scanner` | 01 / s59 |
| Exercice 4 | `POO.4` | Application `Base`, `parseInt` avec radix | 01 / s64 |
| G.1 | `G.1` | Classe `Joueur` (pseudo, email, immuables) | 01 / s65 |
| G.2 | `G.2` | Classe `Partie` (deux joueurs) | 01 / s66 |
| G.3 | `G.3` | Classe `GameHub`, `main`, saisie des joueurs | 01 / s67 |

## Séance 2 — 26/01 — Dates, packages, tableaux, enum, record

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 5 ⚠ | `TMP.1` | Date de naissance, écart en années/mois/semaines/jours | 02 / s8 |
| Exercice 6 ⚠ | `PKG.1` | Effet des accesseurs entre deux packages | 02 / s18 |
| Exercice 5b ⚠ | `TAB.1` | Matrice carrée n×n remplie de 1 à n² | 02 / s37 |
| Exercice 6 ⚠ | `TAB.2` | Triangle de Pascal, `int[][] triangle(int n)` | 02 / s39 |
| Exercice 7 | `TAB.3` | Classe `Player`, opérateur ternaire | 02 / s41 |
| Exercice 8 | `TAB.4` ❓ | `Car` / `Sale` / `Vendor` / `Person`, associations | 02 / s42 |
| Exercice 9 | `ENU.1` | Feu de signalisation, enum `CouleurDeFeu` | 02 / s47 |
| Exercice 10 | `ENU.2` | Classe `Temperature` (Celsius / Fahrenheit) | 02 / s48 |
| Exercice 11 ⚠ | `ENU.3` | Classe `Card` + enum `Color` | 02 / s50, 03 / s11 |
| Exercice 12 | `ENU.4` | Record `Student` | 02 / s56 |
| G.4 → G.9 | inchangés | `LocalDateTime`, packages, enum, record, `GameHub` | 02 / s57-62 |

## Séance 3 — 02/02 — Classes abstraites, interfaces

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 14 | `ABS.1` | Classe abstraite `Shape` | 03 / s17 |
| Exercice 15 | `ABS.2` | Classe abstraite `Animal`, `makeNoise` | 03 / s18 |
| Exercice 16 | `ABS.3` | Rapport bancaire, `VisualiseurFricEnVrac` | 03 / s28 |
| Exercice 17 | `ITF.1` | Interface + deux implémentations | 03 / s35 |
| Exercice 18 ⚠ | `ITF.2` | Paiements en ligne (PayPal / carte) | 03 / s36, 04 / s8 |
| Exercice 19 | `ITF.3` | Interface `Translatable` (reprend `ABS.1`) | 03 / s39 |
| Exercice 20 | `ITF.4` | Pattern Observer, classe `Prospect` | 03 / s62 |
| G.10 → G.13 | inchangés | Classe abstraite `Jeu`, `ObservateurPartie`, `JournalParties` | 03 / s63-66 |

## Séance 4 — 09/02 — Interfaces avancées, static, classes anonymes, pile et tas

**Aucun exercice propre.** Le deck 04 ne contient que des rappels des exercices 14 à 20.
Les slides sur gameHub (`JeuNim`, `JeuFactory`, stratégies) y sont présentées en mode
magistral et constituent la matière la plus évidente à convertir en exercices.

## Séance 5 — 16/02 — Collections

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 27 | `COL.1` | Collection triée de n entiers aléatoires | 05 / s41 |
| Exercice 28 | `COL.2` | Annuaire (téléphones et adresses) | 05 / s42 |
| Exercice 29 | `COL.3` | Lecture de `Lorem.txt` via `Scanner` | 05 / s43 |
| Exercice 30 | `COL.4` | Lecture de `Lorem.txt` (suite) | 05 / s44 |
| Exercice 31 | `COL.5` | `removeIf(Predicate<? super E>)` | 05 / s45 |
| Exercice 32 | `COL.6` | 100 entiers aléatoires dans un `HashSet` | 05 / s46 |
| Exercice 33 | `COL.7` | `Map` étudiants → ensemble de cours | 05 / s47 |
| G.14 → G.20 | inchangés | `Deck` en `List`, `Carte`, `JeuBatailleV0` et `V1` | 06 / s13-19 |

## Séance 6 — 23/02 — Exceptions

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 22 | `EXC.1` | `MoveException`, `Point.deplace` | 06 / s40 |
| Exercice 23 (1/4 → 4/4) | `EXC.2a` → `EXC.2d` | Classe `Compte`, contrôle IBAN, exceptions | 06 / s45-48 |
| Exercice 24 | `EXC.3` | Messages d'exception appropriés | 06 / s58 |
| Exercice 25 (1/2, 2/2) | `EXC.4a`, `EXC.4b` | Provoquer et traiter des exceptions sur tableau | 06 / s64-65 |
| Exercice 26 | `EXC.5` | Lecture d'une stack trace | 06 / s68 |

Aucun incrément GameHub.

## Séance 7 — 09/03 — JUnit

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 43 | `JUN.1` | Tests de `Calculator` en TDD | 07 / s50 |
| Exercice 44 | `JUN.2` | Classe `Tirelire` et sa classe de test | 07 / s54 |
| Exercice 45 | `JUN.3` | Tests de la méthode de `COL.1` | 07 / s55 |

Aucun incrément GameHub.

## Séance 8 — 16/03 — Types génériques

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 34 | `GEN.1` | Classe `Paire<T>` | 08 / s20 |
| Exercice 35 | `GEN.2` | Classe `Couple2<U, V>` | 08 / s23 |
| Exercice 36 | `GEN.3` | Classe `TripletI` | 08 / s52 |
| Exercice 37 | `GEN.4` | `Personne` / `Etudiant` et généricité | 08 / s53 |
| Exercice 38 | `GEN.5` | `UtilGenerique.otGnirts`, méthode générique statique | 08 / s54 |
| Exercice 39 | `GEN.6` | Analyse de `Couple<T>` | 08 / s55 |

Aucun incrément GameHub.

## Séance 9 — 23/03 — Lambdas, références de méthodes

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 40 | `LAM.1` | Interface fonctionnelle `Calculateur` | 08 / s88 |
| Exercice 41 | `LAM.2` | Programme `Affichage`, filtrage par lambda | 08 / s97 |
| Exercice 42 | `LAM.3` | Extension de `LAM.2` (négatifs et pairs) | 08 / s98 |

Aucun incrément GameHub.

## Séance 10 — 06/04 — JavaFX : MVC, FXML, calculatrice

**Aucun exercice propre.** Le deck 09 ne contient que des rappels des exercices 43 à 45.
La calculatrice y est construite entièrement par le professeur.

## Séance 11 — 13/04 — JavaFX : événements, layouts, contrôles

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 46 | `FX.1` | `EventFilter` sur `MouseEvent.MOUSE_CLICKED` | 10 / s29 |
| Exercice 47 | `FX.2` | Compteur (champ texte + bouton) | 10 / s45 |
| Exercice 48 | `FX.3` | Ajout d'un bouton `Reset` | 10 / s46 |
| Exercice 49 | `FX.4` | Comptage séparé hommes / femmes | 10 / s47 |
| Exercice 50 | `FX.5` | Pilotage au clavier | 10 / s48 |
| Exercice 51 ⚠ | `FX.6` | Projet de longue haleine (trois semaines) | 10 / s49 |

## Séance 12 — 20/04 — JavaFX : properties et binding, fichiers

| Actuel | Nouveau | Énoncé | Source |
|---|---|---|---|
| Exercice 51 ⚠ | `FX.7` | Propriétés du `TextField` dans la Javadoc | 11-Prop / s19 |
| Exercice 52 | `FX.8` | `valueProperty` du `Slider` | 11-Prop / s20 |
| Exercice 1a | `FIC.1` | Classes `Etudiant`, `Enseignant`, `Cours` | 11-Fic / s44 |
| Exercice 1b | `FIC.2` | `ProgrammeEnregistrement` | 11-Fic / s45 |
| Exercice 1c | `FIC.3` | `EcritListeEtudiants` (fichier texte) | 11-Fic / s46 |

## Séance 13 — 11/05 — Clean Code, Threads, récapitulatifs

| Actuel | Nouveau | Énoncé |
|---|---|---|
| Récapitulatif 1 | `REC.1` | `CompteBancaire` |
| Récapitulatif 2 | `REC.2` | `Etudiant` et champ de classe `nbEtudiants` |
| Récapitulatif 3 | `REC.3` | `Thermometre` |
| Récapitulatif 4 | `REC.4` | `Horloge24h` |
| Récapitulatif 5 | `REC.5` | Interface générique `Stockage<T>` |
| Récapitulatif 6 | `REC.6` | `Outils.filtrer` |
| Récapitulatif 7 | `REC.7` | `Outils.echanger` |
| Récapitulatif 8 | `REC.8` | Interface `Roulant`, classe abstraite `Vehicule` |
| Récapitulatif 9 | `REC.9` | Classe `Verificateur` et ses tests |
| Récapitulatif 10 | `REC.10` | `EventFilter` filtrant des caractères |
| Récapitulatif 11 | `REC.11` | Site de vente, classe abstraite `Article` |
| Récapitulatif 12 | `REC.12` | Classe `Boite<T>` |

---

## Points marqués ⚠ — à trancher

**Collisions de numéros.** Trois numéros désignent aujourd'hui deux énoncés différents :

- `5` = date de naissance (02 / s8) **et** matrice n×n (02 / s37, rebaptisé `5b` en 03 / s5)
- `6` = accesseurs entre packages (02 / s18) **et** triangle de Pascal (02 / s39)
- `51` = projet de longue haleine (10 / s49) **et** propriétés du `TextField` (11-Prop / s19)

La renumérotation les résout d'elle-même.

**Variantes divergentes.** Deux énoncés existent en deux versions dont le texte diffère.
Il faut choisir la version définitive :

- Exercice 11 — `Card` : la version 02 / s50 écrit « une couleur (Color) », la version
  03 / s11 écrit « une couleur (enum Color) »
- Exercice 18 — paiements en ligne : 03 / s36 et 04 / s8 diffèrent

**Numéros inexistants.** Les exercices 13 et 21 n'apparaissent nulle part.

**Classement incertain.** ❓ L'exercice 8 (`Car` / `Sale` / `Vendor` / `Person` avec
multiplicités) porte sur les associations entre classes, pas sur les tableaux. Il est placé
provisoirement en `TAB.4` parce qu'il tombe dans cette séance, mais un préfixe distinct
serait plus juste.

---

## Références croisées à réécrire

Ces énoncés citent un autre exercice, par son numéro ou par son package. Chacun doit être
mis à jour en même temps que la renumérotation, sinon la consigne devient incompréhensible.

| Énoncé | Cite | Forme actuelle |
|---|---|---|
| `ITF.3` (ex-19) | `ABS.1` (ex-14) | « copiez les classes du package `e14` dans le package `e19` » |
| `ITF.4` (ex-20) | — | « `be.ephec.java.cours03.observer.step2` » |
| `G.14` | `ENU.3` (ex-11) | « le Deck a été défini dans `cours02.exercice11` » |
| `LAM.3` (ex-42) | `LAM.2` (ex-41) | « adaptez le programme précédent » |
| `JUN.3` (ex-45) | `COL.1` (ex-27) | « vous avez normalement écrit une méthode qui… » |
| `FX.3` (ex-48) | `FX.2` (ex-47) | « vous reprenez l'application précédente » |
| `FX.4` (ex-49) | `FX.2` (ex-47) | « votre application fonctionnant bien… » |
| `FX.5` (ex-50) | `FX.2` (ex-47) | implicite |
| `TAB.3` (ex-7) | lui-même | « le package `exercice07` contient une classe `Player` » |

Les packages `cours02`, `cours03` encodent en outre le **rang de la séance**, ce qui est
exactement le couplage à supprimer.

---

## Trous constatés

| Séance | Constat |
|---|---|
| 4 | Aucun exercice propre — matière gameHub présentée en magistral |
| 6 → 13 | Aucun incrément GameHub (le fil rouge s'arrête à `G.20`, séance 5) |
| 10 | Aucun exercice propre — la calculatrice est construite par le professeur |

Le fil rouge est donc absent sur les créneaux Q1 (exceptions), Q2 (généricité),
Q3 (JUnit) et Q5 (JavaFX) de l'examen. Il ne couvre aujourd'hui que Q4.
