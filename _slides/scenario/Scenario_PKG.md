# Scénario du module PKG — Packages et visibilité

*Six sections, 30 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

## Fabrication

Sections à déclarer dans `module_pkg.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | Un package, un dossier | Packages et dossiers |
| 2 | Le niveau sans mot-clé | La visibilité de package |
| 3 | Champ public ou accesseur | Champ public ou accesseur |
| 4 | La surface publique | Réduire la surface publique |
| 5 | Découper en packages | Découper en packages |
| 6 | Le quatrième niveau | Quatrième niveau : protected |

**Sources** : deck 02 slides 13 à 29, `PKG_enonces.docx`, `Demo_PKG.docx`,
`Memento_Clean_Code.docx` (CC-OBJ.2, CC-CLS.1, CC-CLS.2), `Memento_Technique.docx`
(TEC-MVN.1), `Scenario_ABS.md` (slides 1.5 et 6.5, où `protected` a déjà été
enseigné), `Scenario_POO.md` (slide 1.2, où packages et classe publique unique
ont été annoncés).

**Place dans le cours** : huitième deck, après ITF. L'héritage, `protected` et
les interfaces sont connus. La section 6 consolide donc `protected` au lieu de
l'introduire.

**Décisions appliquées** :

- Le deck pose les notions sans répondre aux questions des exercices. Trois
  questions sont laissées ouvertes exprès et signalées dans les notes : le
  périmètre exact de `private` (`PKG.1`), la compilation d'une dépendance qui
  remonte (`PKG.4`), l'accès `protected` sur un autre objet que soi (`PKG.5`).
- Les exemples de code utilisent un domaine neutre, une bibliothèque, pour ne
  pas réutiliser les classes des exercices (`Coffre`, `Deck`, `Capteur`) ni
  celles de la démonstration (`Distributeur`, `Boisson`, `Stock`).
- La démonstration se joue en fin de section 2, une fois les trois niveaux
  posés : sa première question (« quelle est leur visibilité ? ») a alors une
  réponse.
- La structure de projet IntelliJ « à la sauvage » et la comparaison
  IntelliJ / Maven (02/21 à 24) ne sont pas reprises : le cours travaille
  uniquement avec Maven, et TEC-MVN.1 le documente. Seule la conséquence utile
  ici est gardée : le test et sa classe partagent un package (slide 1.5).

**Défauts du deck d'origine corrigés** :

- « Accesseurs » pour désigner `public`, `private`... (02/17 à 20). Dans ce
  cours, un accesseur est une méthode `getX`, et le fascicule `PKG` emploie le
  mot dans ce sens. Le deck dit « modificateur d'accès ».
- « Classes non publiques (`private` ou `protected`) » (02/29) : une classe de
  premier niveau ne peut être ni l'une ni l'autre.
- « Utilisées à l'intérieur du même fichier » (02/29) : une classe sans
  modificateur est visible dans tout le package.
- « La convention en Java » (02/28) : une classe publique dans un fichier qui
  ne porte pas son nom est une erreur de compilation, pas un écart de style.
- Le tableau 02/19 marque la visibilité par défaut « non » pour une
  sous-classe, sans préciser qu'une sous-classe du même package y a accès.
- « Regrouper les classes sous une forme hiérarchisée » (02/15) : la hiérarchie
  existe dans les noms et les dossiers, pas dans les droits (slide 1.4).

---

## Section 0 — Titre

### 0.1 · JAVA 2

**Source** gabarit, slide 1

**Slide**

- Module PKG
- Packages et visibilité

**Note**

Les deux modules précédents ont montré comment des classes partagent du code
et collaborent. Celui-ci pose une question qu'on a laissée de côté jusqu'ici :
qui a le droit de voir quoi.

Vous avez jusqu'ici écrit `private` devant les champs et `public` devant le
reste, souvent par habitude. Le module donne à ce choix ses raisons, et y
ajoute un niveau que la plupart des programmeurs emploient sans le savoir.

La question n'est pas théorique. Elle se pose à chaque classe de la quatrième
question d'examen, où il faut décider ce que la classe mère montre à ses
filles, et ce qu'elle cache au reste du programme.

---

## Section 1 — Un package, un dossier

### 1.1 · Un package, un dossier

*(intercalaire)*

### 1.2 · Ranger une classe

**Source** d02/15, réécrite ; rappel du module POO

**Slide**

- La ligne `package` ouvre toujours le fichier
- Chaque segment du nom est un dossier sur le disque
- Du général au précis : organisation, projet, thème

```java
// src/main/java/be/ephec/biblio/modele/Livre.java

package be.ephec.biblio.modele;

public class Livre {
    // ...
}
```

**Note**

Vous avez rencontré la règle au module POO, avec la classe `Personne` du
package `progoo`. Elle se précise ici : un nom de package à plusieurs segments
correspond à autant de dossiers imbriqués.

L'usage est de commencer par le nom de domaine de l'organisation, à l'envers :
`be.ephec` pour l'EPHEC. Deux équipes qui écrivent chacune une classe `Livre`
ne se gênent alors jamais. Les exercices suivent la même logique, avec
`be.ephec.java.pkg.e01` pour le premier exercice de ce thème.

IntelliJ crée les dossiers quand vous créez un package, et signale tout écart
entre la ligne `package` d'un fichier et le dossier où il se trouve. Un nom de
package s'écrit entièrement en minuscules.

---

### 1.3 · Le nom complet d'une classe

**Source** nouvelle

**Slide**

- Le nom complet d'une classe commence par son package
- L'instruction `import` permet d'écrire le nom court
- Les classes de `java.lang` se passent d'import

```java
package be.ephec.biblio.service;

import be.ephec.biblio.modele.Livre;   // nom complet
import java.time.LocalDate;

public class Emprunt {
    private Livre livre;                // nom court
    private LocalDate dateRetour;
}
```

**Note**

Le nom complet de la classe `Livre` est `be.ephec.biblio.modele.Livre`. Un
`import` ne copie rien et ne charge rien : c'est un raccourci d'écriture, qui
dit au compilateur où chercher quand il rencontre le nom court. Sans lui, il
faudrait écrire le nom complet à chaque fois.

Une classe du même package se passe d'import. Les classes de `java.lang` aussi,
comme `String`, `Math` ou `System` : le compilateur les importe d'office, ce qui
explique que vous ne les ayez jamais importées.

L'écriture `import java.util.*;` importe toutes les classes du package
`java.util`, mais pas celles de ses sous-packages. Quand deux classes portent le
même nom court, `java.util.Date` et `java.sql.Date` par exemple, il faut écrire
le nom complet d'au moins l'une des deux.

---

### 1.4 · Un sous-package est un package à part

**Source** d02/15, propos corrigé

**Slide**

- Les noms de packages forment une arborescence, mais pas les droits
- Un package n'a aucun accès privilégié à ses sous-packages, ni l'inverse
- Deux sous-packages voisins sont deux packages distincts, et étrangers

```java
be.ephec.biblio              Main
be.ephec.biblio.modele       Livre, Auteur
be.ephec.biblio.service      Emprunt, Catalogue

// trois packages, sans lien de parente
```

**Note**

L'idée fausse est tenace, et l'ancien support la favorisait en parlant de
packages « hiérarchisés ». La hiérarchie existe dans les noms et dans les
dossiers. Pour le compilateur, `be.ephec.biblio` et `be.ephec.biblio.modele`
sont deux packages aussi étrangers l'un à l'autre que `java.util` et
`java.time`.

L'arborescence est donc un rangement, pas une famille. Elle aide le lecteur à
s'y retrouver, et c'est tout.

Gardez cette slide en tête pour `PKG.2` : les deux classes y vivent dans
`e02.coffre` et `e02.controle`, deux sous-packages du même parent, et pourtant
deux packages différents.

---

### 1.5 · Deux dossiers, un seul package

**Source** TEC-MVN.1 du mémento technique

**Slide**

- Maven range le code dans `src/main/java` et les tests dans `src/test/java`
- Une classe de test déclare le même package que la classe qu'elle teste
- Pour le compilateur, elles sont voisines : deux dossiers, un seul package

```java
src/main/java/be/ephec/biblio/modele/Livre.java
src/test/java/be/ephec/biblio/modele/LivreTest.java

// les deux fichiers commencent par la meme ligne :
package be.ephec.biblio.modele;
```

**Note**

Le package est une notion du langage, le dossier racine est une convention de
Maven. Maven sépare le code et les tests pour ne pas livrer les seconds avec le
premier, mais il les compile dans le même package.

Une classe de test et la classe qu'elle teste sont donc voisines au sens
strict, même si l'arborescence d'IntelliJ les affiche dans deux branches
différentes. Toutes les classes de test du recueil sont construites ainsi.

La section suivante dira pourquoi ce voisinage compte.

---

## Section 2 — Le niveau sans mot-clé

### 2.1 · Le niveau sans mot-clé

*(intercalaire)*

### 2.2 · Qui peut atteindre le membre d'une classe

**Source** d02/17, réécrite ; titre et première ligne revus le 14/10/2026, à la demande
du professeur

**Slide**

- Un membre d'une classe, c'est l'un de ses champs ou l'une de ses méthodes
- Le niveau `private` : le code de la classe seul
- Le niveau `public` : tout le programme
- Sans modificateur : le package, et nulle part ailleurs

```java
package be.ephec.biblio.modele;

public class Livre {

    private String isbn;               // la classe Livre
    String cote() { ... }              // le package modele
    public String titre() { ... }      // tout le programme
}
```

**Note**

Un mot de vocabulaire d'abord. `public`, `private` et les autres s'appellent
des modificateurs d'accès. L'ancien support disait « accesseurs », mais dans ce
cours un accesseur est une méthode comme `getTitre`, et la section 3 en parle.

Le titre parle de membres : c'est le nom commun aux champs et aux méthodes d'une
classe. Dans le code de la slide, isbn est un champ, cote et titre sont des méthodes ;
tous trois sont des membres de Livre, et chacun a son niveau d'accès. Les
modificateurs s'appliquent aussi aux constructeurs, et à la classe elle-même. Il en existe un quatrième, `protected`, que vous avez
rencontré au module ABS : il attendra la section 6, parce qu'il ne se comprend
qu'avec l'héritage.

Retenez les mots exacts de la première ligne : le code de la classe. `PKG.1` vous
demande ce que cela implique quand deux objets de la même classe se
rencontrent. Essayez avant de conclure.

---

### 2.3 · Le niveau qu'on choisit sans le savoir

**Source** nouvelle ; Demo_PKG, étape 1

**Slide**

- Sans mot-clé : on l'obtient en n'écrivant rien
- Il s'appelle visibilité de package, ou par défaut
- Il vaut pour les membres, les constructeurs, la classe

```java
package be.ephec.biblio.modele;

class Fiche {                  // invisible hors du package
    String cote;               // idem
    Fiche(String cote) {       // idem
        this.cote = cote;
    }
}
```

**Note**

Le deck POO l'avait signalé en passant : la classe `Personne`, déclarée sans
modificateur, n'était visible que dans son package. La règle vaut pour tout ce
qu'on déclare sans y penser.

Son danger est que rien ne signale qu'on l'a choisi. Tant que toutes les
classes vivent dans le même package, ce niveau ne se
distingue pas de `public` : tout compile, partout. Il se comporte comme
`private` pour les autres packages, et on ne le découvre que le jour où le
programme est découpé.

Il a pourtant un usage délibéré, qui découle de la slide 1.5. Une classe de test
vit dans le même package que la classe testée : un membre laissé à ce niveau lui
est accessible, sans être ouvert au reste du programme.

---

### 2.4 · Démonstration

**Source** `Demo_PKG.docx`, 20 à 25 minutes

**Slide**

- Démo : déménager une classe, et voir ce qui casse

**Note**

La démonstration part d'un programme qui fonctionne, entièrement rangé dans un
seul package, et le découpe en trois avec l'outil de refactoring. La compilation
se brise aussitôt.

Chaque erreur désigne un endroit où le code s'appuyait sur une proximité qui
vient de disparaître. Les messages sont lus un par un avant d'être corrigés, et
le compilateur pose à chaque fois une question de conception. Notez les
réponses qui sont données, et celles qui sont écartées.

---

### 2.5 · Exercices

**Slide**

- **PKG.1** - Ce que voit une classe du même package
- Expérimenter d'abord : le test ne dit pas quelle ligne est fausse

**Note**

L'exercice est une expérience. Six lignes commentées, une par membre :
décommentez-les une à une et notez celles que le compilateur refuse. La liste
attendue par le test se déduit de ce que vous avez observé, pas l'inverse.

La première question de fin d'exercice porte sur le périmètre exact de
`private`. Elle vaut le détour, et la réponse surprend souvent.

---

## Section 3 — Champ public ou accesseur

### 3.1 · Champ public ou accesseur

*(intercalaire)*

### 3.2 · Ce qu'un champ public promet

**Source** nouvelle ; CC-OBJ.2

**Slide**

- Un champ public se lit et s'écrit, par n'importe qui
- La classe ne sait plus qui le modifie, ni comment
- Son nom et son type ne peuvent plus changer

```java
public class Livre {

    public int exemplaires;
}

// ailleurs, sans que Livre le sache
livre.exemplaires = -3;
```

**Note**

Un champ public donne deux droits à la fois, lire et écrire, à tout le monde et
pour toujours. La classe perd la main sur sa propre donnée : rien ne l'empêche
de valoir moins trois, et rien ne la prévient quand c'est le cas.

La troisième ligne est la plus coûteuse à long terme, parce que d'autres
classes dépendent du champ. Le jour où vous voudrez
renommer ce champ, changer son type ou le remplacer par un calcul, toutes les
classes qui l'emploient devront changer avec lui. Dans une équipe, ces classes
ne sont pas toutes les vôtres.

---

### 3.3 · Ce que l'accesseur garde

**Source** nouvelle ; CC-OBJ.2

**Slide**

- Un accesseur public ne donne que la lecture
- La classe peut calculer, formater, refuser la valeur
- Son corps change sans qu'aucun appelant ne le sache

```java
public class Livre {

    private int exemplaires;
    private int empruntes;

    public int getDisponibles() {       // hier : un champ
        return exemplaires - empruntes;
    }
}
```

**Note**

La méthode `getDisponibles` retournait hier un champ, elle fait aujourd'hui un
calcul, et aucun appelant n'a eu à changer. C'est la réponse à une question que
beaucoup se posent depuis le module POO : à
quoi bon un getter qui se contente de retourner un champ ? Le jour où il fait
autre chose, personne ne doit le savoir, et c'est précisément ce qu'il permet.

Le getter et le champ public ne sont donc pas équivalents, même quand leur code
se ressemble. L'un expose une donnée, l'autre un comportement : celui de la
donner.

L'autre moitié de la règle CC-OBJ.2 compte autant : un accesseur n'est pas une
obligation. Écrire un getter et un setter pour chaque champ revient à rendre les
champs publics avec plus de lignes. Chaque accesseur est une décision.

---

### 3.4 · Exercices

**Slide**

- **PKG.2** - Ce que voit une classe d'un autre package
- Concevoir : CC-OBJ.2

**Note**

La première partie reprend l'expérience de `PKG.1`, avec une seule différence :
le package. Notez lequel des six membres change de camp, et rapprochez-le de la
section 2.

La seconde partie impose une contrainte qui est toute la consigne : le champ
reste tel qu'il est. Le passer en `public` ferait compiler l'exercice en dix
secondes, et l'un des deux tests est écrit pour le refuser.

---

## Section 4 — La surface publique

### 4.1 · La surface publique

*(intercalaire)*

### 4.2 · Chaque membre public est une promesse

**Source** nouvelle

**Slide**

- Ce qui est public peut être utilisé n'importe où, donc ne peut plus changer librement
- Fermer un membre ouvert casse le code des autres ; ouvrir un membre fermé ne casse rien
- D'où la règle : partir du plus fermé, et n'ouvrir que sur un besoin réel

**Note**

On appelle surface publique l'ensemble de ce qu'une classe montre aux autres
packages. C'est la partie de la classe sur laquelle d'autres s'appuient, et donc
la seule qu'on ne peut plus modifier sans prévenir.

L'asymétrie de la deuxième ligne décide de tout. Une méthode privée qu'on rend
publique ne casse rien, puisque personne ne l'utilisait. Une méthode publique
qu'on rend privée casse tous ceux qui l'appelaient, et on ne sait pas toujours
qui ils sont.

Ouvrir par défaut, c'est donc s'interdire de changer d'avis. Fermer par défaut
laisse toutes les portes ouvertes, au sens propre.

---

### 4.3 · Choisir, membre par membre

**Source** nouvelle

**Slide**

- Le niveau `private` d'abord : le cas le plus fréquent
- La visibilité de package si une voisine en a besoin
- Le niveau `public` pour ce que les autres appellent

```java
public class Catalogue {

    private Livre[] livres = new Livre[100];

    public void ajouter(Livre livre) { ... }
    public Livre chercher(String isbn) { ... }

    boolean estCoherent() { ... }       // pour les tests
    private void agrandir() { ... }
}
```

**Note**

Lisez la classe en partant de ce qu'un utilisateur du catalogue doit pouvoir
faire : ajouter un livre, en chercher un. Ce sont les deux seules méthodes
publiques. Le tableau et la façon de l'agrandir sont des détails de
fabrication, et restent privés.

La méthode `estCoherent` est un cas intermédiaire. Elle vérifie que le
catalogue n'est pas corrompu, ce qui intéresse les tests mais pas les
utilisateurs. Une voisine, ici, c'est d'abord la classe de test : la visibilité
de package la met à sa portée,
et la cache au reste du programme.

Le choix se fait donc membre par membre, et une question suffit : qui a
réellement besoin de ceci ?

---

### 4.4 · Une seule classe publique par fichier

**Source** d02/27 à 29, corrigées

**Slide**

- Une classe est publique ou de package, rien d'autre
- Un fichier contient au plus une classe publique, et porte son nom
- C'est une règle du compilateur, pas une convention

```java
// fichier Catalogue.java

public class Catalogue { ... }

class Rayon { ... }             // permis : visible dans le package

public class Etagere { ... }    // erreur de compilation
```

**Note**

La surface publique se mesure aussi en classes. Une classe sans modificateur
est un détail d'implémentation de son package, et les autres packages
l'ignorent. Les modificateurs `private` et `protected` sont interdits sur une
classe écrite directement dans son fichier : ils n'auraient pas de sens.

L'ancien support présentait la règle du fichier comme une convention. C'est une
erreur de compilation : le compilateur exige qu'une classe publique `Etagere`
vive dans un fichier `Etagere.java`, et il le dit dans son message.

Rien n'interdit de placer plusieurs classes non publiques dans un même fichier,
mais l'usage est d'en écrire une par fichier, et IntelliJ s'y range. Une classe
non publique reste visible dans tout son package, pas seulement dans son
fichier.

**Réserve** les classes imbriquées, déclarées à l'intérieur d'une autre classe,
peuvent être `private` ou `protected`. Elles ne sont pas au programme de ce
module ; les classes anonymes du module LAM en sont une forme.

---

### 4.5 · Exercices

**Slide**

- **PKG.3** - Réduire la surface publique d'une classe
- Concevoir : CC-CLS.2

**Note**

La classe fournie fonctionne, et tout y est public. Le programme fourni définit
ce dont un utilisateur a réellement besoin : il n'appelle que trois opérations.
Le travail consiste à fermer tout le reste sans que ce programme cesse de
compiler.

Comptez les promesses que faisait la version d'origine, et celles que fait la
vôtre. La différence est la mesure du travail accompli.

---

## Section 5 — Découper en packages

### 5.1 · Découper en packages

*(intercalaire)*

### 5.2 · Ranger par responsabilité

**Source** d02/16, réduite à trois couches

**Slide**

- Un package regroupe des classes qui changent pour les mêmes raisons
- Un découpage courant compte trois couches : le modèle, les services, l'application
- Le modèle porte les données du domaine, et ne connaît personne

```java
be.ephec.biblio.modele          Livre, Auteur
be.ephec.biblio.service         Emprunt, Catalogue
be.ephec.biblio.application     Main
```

**Note**

Le critère de découpage est celui de la règle CC-CLS.1, appliqué à un groupe de
classes : une raison de changer. Le modèle change quand le domaine change, un
service quand une règle de gestion change, l'application quand on change la
façon de la lancer ou de l'afficher.

L'ancien support comptait une quatrième couche, la persistance, qui écrit les
données dans une base ou un fichier. Elle viendra avec le module FIC.

Le modèle est la couche la plus précieuse, parce qu'elle ne dépend d'aucune
autre. La même classe `Livre` peut servir demain dans une application graphique
sans qu'une ligne y change.

---

### 5.3 · Les imports dessinent les dépendances

**Source** Demo_PKG, étape 5, généralisée

**Slide**

- Les `import` d'une classe disent de quoi elle dépend
- Dans un programme bien découpé, les dépendances vont toutes dans le même sens
- Une dépendance qui remonte signale une responsabilité rangée dans la mauvaise couche

```java
application  ->  service  ->  modele

// les classes du modele n'importent
// ni les services, ni l'application
```

**Note**

Tant que tout vit dans un seul package, les dépendances existent mais ne se
voient pas. Le découpage les rend lisibles : la liste des `import` en haut d'un
fichier est la liste de ce dont la classe a besoin pour exister.

Lisez la flèche comme « connaît ». L'application connaît les services, qui
connaissent le modèle. Le modèle ne connaît personne, et c'est ce qui le rend
réutilisable.

`PKG.4` vous demande ce qui se passerait si une classe du modèle importait un
service. La question a deux volets, ce que dit le compilateur et ce que dit la
conception : répondez aux deux séparément.

---

### 5.4 · Déplacer une classe avec l'outil

**Source** Demo_PKG, étape 2 ; d02/58

**Slide**

- Le refactoring `Move`, touche `F6`, déplace le fichier et corrige la ligne `package`
- Il ajoute les `import` dans toutes les classes qui l'utilisent
- Un fichier déplacé à la main garde une ligne `package` fausse, et une copie en laisse deux

**Note**

Clic droit sur la classe dans l'arborescence, puis `Refactor`, puis `Move`, ou
directement `F6`. IntelliJ demande le package de destination, déplace le
fichier, réécrit sa première ligne et met à jour tous les `import` du projet.

C'est le même principe que les refactorings du module ABS : l'outil connaît
toutes les références, vous non. La manœuvre est détaillée dans IDE.21 du guide
IntelliJ. Un déplacement à la main en oublie toujours
une, et un copier-coller laisse deux classes du même nom dans deux packages, ce
qui compile parfaitement et ne fait jamais ce qu'on croit.

Sur un clavier de Mac, la touche `F6` demande parfois d'appuyer en même temps
sur `fn`.

---

### 5.5 · Exercices

**Slide**

- **PKG.4** - Découper un programme en packages
- Concevoir : CC-CLS.1

**Note**

Quatre classes, un seul package, trois packages à créer. Faites-le avec `F6` :
le dernier test vérifie qu'aucune classe ne subsiste à l'ancienne place, ce qui
vous protège d'un copier-coller.

Une fois le découpage fait, regardez les imports de chaque classe et dessinez
les flèches. Puis relisez la section 2 : certaines classes s'appuyaient sur la
visibilité de package de leurs voisines. Le sont-elles encore ?

---

## Section 6 — Le quatrième niveau

### 6.1 · Le quatrième niveau

*(intercalaire)*

### 6.2 · Le rappel du module ABS

**Source** Scenario_ABS, slides 1.5 et 6.5

**Slide**

- Le niveau `protected` ouvre un membre aux sous-classes
- Il l'ouvre aussi au package, ce qu'on oublie souvent
- Son effet propre : une sous-classe d'un autre package

```java
package be.ephec.biblio.modele;
public abstract class Document {
    private final String cote;
    protected int pages;

    protected Document(String cote) {
        this.cote = cote;
    }
}
```

**Note**

Vous avez employé `protected` au module ABS, pour un champ que les filles
devaient lire et pour les méthodes que la mère appelle et que les filles
écrivent. Ce module donne sa place exacte parmi les quatre niveaux.

La deuxième ligne surprend presque toujours. Un membre `protected` est visible
de tout le package, sous-classe ou non. Il est donc plus ouvert que la
visibilité de package, jamais moins.

D'où la troisième ligne : dans le même package, `protected` ne change rien.
Son effet propre ne se voit que lorsqu'une sous-classe vit ailleurs, et c'est
exactement la situation de `PKG.5`.

---

### 6.3 · Les quatre niveaux

**Source** d02/19, tableau corrigé

**Slide**

| Niveau | Classe | Package | Sous-classe ailleurs | Reste |
|---|---|---|---|---|
| `private` | oui | non | non | non |
| *(rien)* | oui | oui | non | non |
| `protected` | oui | oui | oui | non |
| `public` | oui | oui | oui | oui |

**Note**

Le tableau se lit de haut en bas comme une échelle : chaque niveau ouvre tout
ce qu'ouvre le précédent, plus une colonne. C'est ce qui permet de le
reconstruire sans l'apprendre.

La colonne « sous-classe ailleurs » désigne une sous-classe rangée dans un
autre package. Une sous-classe du même package est d'abord une voisine : elle
relève de la deuxième colonne. L'ancien tableau confondait les deux cas.

Dans une interface, la question ne se pose presque pas : comme vu au module
ITF, ses méthodes sont publiques sans qu'on l'écrive.

**Réserve** l'accès `protected` depuis une sous-classe d'un autre package ne
vaut que sur des objets du type de cette sous-classe, pas sur n'importe quel
objet de la classe mère. C'est la dernière question de `PKG.5`, posée pour être
essayée : ne pas y répondre avant.

---

### 6.4 · Choisir `protected`

**Source** nouvelle ; prolonge Scenario_ABS 1.5

**Slide**

- Un membre `protected` engage envers toutes les filles
- Un champ `protected` pose la question du champ public
- Il convient aux méthodes que les filles écrivent

```java
public abstract class Document {

    private int pages;                   // la mere

    protected int getPages() {           // les filles
        return pages;
    }

    protected abstract String format();  // idem
}
```

**Note**

Un membre `protected` est une promesse faite à toutes les sous-classes,
présentes et futures. La règle de la section 4 s'applique donc sans
changement. Une sous-classe peut
être écrite par quelqu'un d'autre, dans un autre package, des mois plus tard.
Tout ce qui lui est ouvert ne peut plus changer sans la casser.

Un champ `protected` laisse donc les filles lire et écrire, comme le faisait le
champ public de la section 3, devant un public plus petit. Un champ privé et un
accesseur `protected` laissent la mère maîtresse de la valeur.

Le niveau `protected` trouve son meilleur usage dans les méthodes que la mère
appelle et que les filles écrivent, comme au module ABS.

Ce n'est pas une interdiction. `PKG.5` vous fait écrire les deux versions, et la
question de fin vous demande laquelle vous préférez, et pourquoi.

---

### 6.5 · Exercices

**Slide**

- **PKG.5** - `protected`, ou ce que l'héritage ouvre
- L'exercice `ABS.4` vous laissait une décision de visibilité : vous pouvez la trancher

**Note**

L'exercice place deux classes dans le même package, autour d'une classe mère
rangée ailleurs. L'une en hérite, l'autre s'en sert seulement. Les deux sont
voisines et n'ont pourtant pas les mêmes droits.

Le cœur de l'exercice est le tableau d'expériences : trois champs, deux classes,
six essais. Notez le message exact du compilateur à chaque refus, puis écrivez
en une phrase ce que `protected` ouvre.

Au module ITF, `ABS.4` vous demandait quelle visibilité donner aux accesseurs
intermédiaires de la hiérarchie, dont seules les sous-classes ont besoin. Vous
avez maintenant tout ce qu'il faut pour répondre.
