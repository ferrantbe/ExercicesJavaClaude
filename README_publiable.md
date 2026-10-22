# Exercices Java — IN2, 2026-2027

## Ouvrir le projet

Dans IntelliJ : **File → Open**, puis sélectionner le fichier **`pom.xml`** situé
à côté de ce README — pas le dossier, et pas un des sous-dossiers. IntelliJ
propose alors « Open as Project » : acceptez.

Ouvrir le dossier fonctionne parfois, mais pas toujours : IntelliJ crée alors des
modules ordinaires plutôt que des modules Maven, et ces modules n'ont aucun JDK.
Passer par le `pom.xml` évite le problème.

Au premier chargement, IntelliJ télécharge les bibliothèques (JUnit, JavaFX) :
compter une à deux minutes selon la connexion.

### Si plus rien ne se lance à cause d'un exercice inachevé

Tout `exercices/src/main/java` se compile d'un bloc. Un fichier laissé à moitié
écrit empêche donc de lancer **tous** les autres exercices, y compris ceux des
modules précédents.

Le remède le plus rapide : sélectionnez les lignes en chantier et commentez-les
avec `Ctrl+/` (`⌘/` sous macOS). Tout recompile, et vous reprendrez plus tard.

Les modules `solutions/` et `demos/` ne dépendent pas d'`exercices/` : ils
restent utilisables même quand votre code ne compile pas. La section `ERR.9` du
guide IntelliJ détaille deux autres solutions.

## Si la compilation échoue sur « JDK isn't specified for module »

    java: JDK isn't specified for module 'solutions'

Un module Maven ne définit pas son propre JDK : il hérite de celui du projet. Ce
message signifie donc, presque toujours, qu'aucun JDK n'est déclaré au niveau du
projet.

**File → Project Structure → Project**, champ *SDK* : choisissez un JDK 21. Si la
liste est vide, *Add SDK → Download JDK*, version 21, distribution Amazon Corretto
ou Eclipse Temurin — en veillant à l'architecture de votre machine : **aarch64**
sur un Mac Apple Silicon, **x86_64** ailleurs. Vérifiez au passage que *Language
level* est sur 21.

Si le message persiste, fermez le projet, supprimez le dossier `.idea/` et les
éventuels fichiers `.iml`, puis rouvrez en sélectionnant `pom.xml`. Vous ne perdez
rien : `.idea/` ne contient que des préférences d'affichage, et il est déjà ignoré
par Git.

## Le nom du dossier n'a pas d'importance

Les outils retrouvent le projet en remontant jusqu'au `pom.xml`, et Maven ne
s'intéresse qu'à ce fichier. Vous pouvez donc renommer le dossier racine sans
rien casser — utile si vous gardez plusieurs copies du projet côte à côte.

Une seule précaution : les archives des modules contiennent toujours un dossier
`ExercicesJava/`. Voir plus bas, dans « Recevoir les exercices ».

## Le fil rouge GameHub

Le fil rouge GameHub est distribué dans un projet séparé, `GameHub`.

## Structure

```
ExercicesJava/
├── pom.xml          configuration commune — ne pas modifier
├── documents/       les documents de référence, valables toute l'année
├── enonces/         les fascicules d'exercices, un par module
├── exercices/       VOTRE code. C'est ici que vous travaillez.
│   ├── src/main/java/be/ephec/java/<theme>/e<nn>/
│   └── src/test/java/be/ephec/java/<theme>/e<nn>/
├── solutions/       les corrigés, publiés sur Moodle à la fin de chaque module
│   └── src/main/java/be/ephec/java/<theme>/e<nn>/
├── demos/           les exemples construits au cours, publiés en même temps
│   └── src/main/java/be/ephec/java/demo/<theme>/
└── demos_depart/    le point de départ de chaque démonstration, hors Maven
```

`demos/` contient les exemples que le professeur écrit en direct pendant le
cours. Vous recevez leur point de départ au début du module, dans
`demos_depart/`, et leur état final **à la fin** : l'intérêt d'une
démonstration est dans sa construction, pas dans son état final. Le code y est commenté comme un
corrigé, et signale ce qu'il faut regarder en le relisant.

`documents/` contient le mémento Exercices, le mémento Clean Code, le mémento
technique, le guide IntelliJ, et un récapitulatif des codes employés dans tout
le cours. Ils ne
dépendent d'aucun module : les énoncés y renvoient au fil de l'année par des
codes comme `CC-NOM.1`, `TEC-EXE.2` ou `IDE.17`.

| Fichier | Ce qu'on y trouve |
|---|---|
| `Codes_du_cours.docx` | à quoi correspond chaque abréviation |
| `Memento_Exercices.docx` | comment travailler les exercices, valable pour tous les modules |
| `Memento_Clean_Code.docx` | 34 règles d'écriture, `CC-*` |
| `Memento_Technique.docx` | plateforme, compilation, exécution, Maven, `TEC-*` |
| `Guide_IntelliJ.docx` | l'outil, `IDE.*`, et une annexe d'erreurs `ERR.*` |

Chaque module a son fascicule dans `enonces/` : c'est là que se trouvent les
énoncés complets, pas dans les slides.

Un package par exercice. Le nom du package se déduit du code de l'exercice :
`TAB.3` vit dans `be.ephec.java.tab.e03`.

`exercices/` et `solutions/` utilisent les **mêmes noms de packages**. Ce
n'est pas une erreur : ils sont compilés séparément, donc il n'y a aucun
conflit, et le corrigé passe exactement les mêmes tests que votre code.

## Travailler un exercice

1. Ouvrir le package de l'exercice sous `exercices/src/main/java/`.
2. Les squelettes fournis lèvent une `UnsupportedOperationException` :
   remplacer ces lignes par votre code.
3. Ne changer ni les noms de classes, ni les noms de méthodes, ni les types :
   les tests s'appuient dessus.
4. Ouvrir la classe de test correspondante sous `exercices/src/test/java/`,
   cliquer sur la double flèche verte dans la marge.
5. Tout est rouge au départ, c'est normal. L'objectif est le vert.

**Un test vert ne garantit pas que la réponse est correcte.** Il vérifie le
comportement, pas la lisibilité, le nommage ou la pertinence de la conception —
qui comptent aussi à l'examen.

## Recevoir les exercices d'un nouveau module

Le cours avance module par module ; une séance du soir, de 18:00 à 21:35,
peut en couvrir un ou plusieurs. Chaque module donne lieu à deux archives sur
Moodle : `ModuleNN_XXX_debut.zip` au début du module (les énoncés, leurs
tests, le fascicule, et le point de départ des démonstrations), et
`ModuleNN_XXX_fin.zip` à la fin (les corrigés et les démonstrations
complètes). Le projet lui-même, `Module00_ExercicesJava.zip`, est donné une
seule fois, au début de l'année.

Deux voies, au choix : les archives sur Moodle, ou Git. **Pour les
exercices, ne mélangez pas les deux dans un même projet** : un pull refuserait
d'écraser les fichiers déjà extraits d'une archive.

### Par l'archive (la voie normale)

Chaque archive **contient elle-même un dossier
`ExercicesJava`, et doit donc être extraite dans le dossier PARENT du vôtre**,
pas à sa racine. Les deux arborescences fusionnent alors, et les nouveaux
packages viennent s'ajouter aux anciens.

Pour retrouver ce dossier parent : dans IntelliJ, clic droit sur la racine du
projet, `Open In` → `Finder` (macOS) ou `Explorer` (Windows), puis remonter
d'un niveau.

**macOS.** Le double-clic ne convient pas : l'Utilitaire d'archive extrait à
côté du zip, et s'il trouve un dossier du même nom il en crée un second
(`ExercicesJava 2`) au lieu de fusionner. Passez par le Terminal :

    unzip -o ~/Downloads/ModuleNN_..._debut.zip -d ~/chemin/du/parent

**Windows.** Clic droit sur le zip, `Extraire tout`. Attention au chemin
proposé : Windows ajoute par défaut un sous-dossier portant le nom du zip.
Effacez-le pour ne garder que le dossier parent. En PowerShell :

    Expand-Archive -Path "$HOME\Downloads\ModuleNN_..._debut.zip" `
                   -DestinationPath "C:\chemin\parent" -Force

Si vous avez renommé votre dossier de projet, l'archive ne fusionnera pas avec
lui : elle créera un `ExercicesJava/` à côté. Extrayez-la alors dans un dossier
temporaire et recopiez son contenu à la main, ou renommez-la avant extraction.

L'archive n'apporte que les packages du module : elle ne touche pas à ceux
des modules précédents. En revanche, extraire deux fois l'archive de début
d'un même module **écraserait** le travail déjà fait sur ces exercices-là. Si vous devez
la reprendre, extrayez-la ailleurs et recopiez seulement ce dont vous avez
besoin.

### Par Git (facultatif)

Si vous savez vous servir de Git, vous pouvez cloner le projet une fois, au
lieu d'extraire une archive à chaque module. Dans IntelliJ : **File → New →
Project from Version Control**, avec l'adresse
`https://github.com/ferrantbe/ExercicesJava.git`.

Ensuite, à chaque nouveau module : commitez votre travail (`Ctrl+K`, `⌘K`
sous macOS), puis **Git → Pull**. Un module n'ajoute que de nouveaux
packages, donc le pull ne touche pas à ce que vous avez écrit. Si un
exercice déjà distribué doit être corrigé, une annonce sur Moodle le dira.

Les corrigés et les démonstrations ne passent pas par Git : ils restent sur
Moodle, et l'archive de fin de module s'extrait comme celle du début.

## Lancer une application JavaFX

Chaque application JavaFX est accompagnée d'une classe `Lanceur`. C'est elle
qu'il faut exécuter, pas la classe qui hérite d'`Application` : lancer
directement cette dernière échoue avec le message *JavaFX runtime components
are missing*. Le `Lanceur` n'hérite de rien et se contente d'appeler
`Application.launch`, ce qui suffit à contourner le problème.
