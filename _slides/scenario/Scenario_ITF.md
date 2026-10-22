# Scénario du module ITF — Interfaces

*Six sections, 37 slides plus le sommaire. Rubriques : `**Source**` et
`**Réserve**` sont des commentaires de fabrication, `**Slide**` et `**Note**`
produisent le contenu et les notes du présentateur.*

**Sources** : deck 03 slides 29 à 66, deck 04 slides 12 à 20, `ITF_enonces.docx`,
`Demo_ITF.docx`, `ABS_enonces.docx` (pour `ABS.4`), `Memento_Clean_Code.docx`.

**Décisions appliquées** : démonstration en ouverture ; méthodes par défaut
gardées pour information, sans exercice ; interfaces de marquage gardées, propos
corrigé et ancré sur `Serializable` ; interfaces fonctionnelles réduites à une
slide d'annonce ; cas Transport mené jusqu'à la suppression du test de type.

---

## Section 0 — Titre

### 0.1 · JAVA 2

**Source** gabarit ABS, slide 1

**Slide**

- Module ITF
- Interfaces

**Note**

Le module précédent a montré comment partager du code entre des classes
voisines. Celui-ci répond à une autre question : comment faire travailler
ensemble des classes qui n'ont rien en commun.

La réponse tient dans le sous-titre du fascicule : décrire ce qu'on attend, sans
dire qui le fera. Une interface énonce un service, et laisse à d'autres le soin
de le rendre.

C'est la notion qui porte le découplage, et donc la majorité des conceptions que
vous rencontrerez en entreprise. Elle sert aussi dans deux questions d'examen :
la hiérarchie d'`ABS.4`, dont le sommet est une interface, et l'interface
graphique, qui fonctionne entièrement sur ce principe.

---

## Section 1 — Ce qu'une interface déclare

### 1.1 · Ce qu'une interface déclare

*(intercalaire)*

### 1.2 · Démonstration

**Source** `Demo_ITF.docx`, 12 minutes

**Slide**

- Démo : trois mots, et le programme accepte l'inconnu

**Note**

La démonstration part d'un programme qui fonctionne : un fournisseur, des
clients abonnés, des produits qui arrivent. Il n'y a aucun bug à corriger. Ce
qui va changer, c'est ce que ce code permettra de faire demain.

Une épicerie veut être prévenue elle aussi. Elle a la bonne méthode, avec la
bonne signature, et le compilateur la refuse quand même : le fournisseur a été
écrit pour une classe, pas pour une capacité.

La fausse bonne idée est jouée volontairement : faire hériter `Magasin` de
`Client`. Ça compile, et c'est un mensonge fait au compilateur. Un magasin n'est
pas un client.

L'interface `Abonne` est alors extraite, et trois mots changent dans le
fournisseur. Le magasin est prévenu comme les clients. Le point d'orgue est la
question finale : que faut-il pour ajouter un entrepôt ? Une classe, trois
lignes, et pas une seule modification ailleurs.

Le patron qui vient d'être joué porte un nom. Il sera nommé à la section 5, une
fois la syntaxe installée.

---

### 1.3 · Déclarer une interface

**Source** d03/32 et 33, réécrites

**Slide**

- Une interface énonce ce qu'une classe doit savoir faire, sans dire comment
- Le mot-clé `interface` remplace le mot-clé `class`
- Les méthodes s'y déclarent par leur entête, sans corps
- Elles sont publiques sans qu'on l'écrive : `public` y est superflu

```java
public interface Mesurable {

    double mesure();
}
```

**Note**

Une interface ressemble à une classe abstraite qui n'aurait que des méthodes
abstraites. La ressemblance est un bon point de départ, et la section 3 dira où
elle s'arrête.

L'écriture est dépouillée. Pas d'accolades après la méthode, un point-virgule à
la place, et aucun modificateur : une méthode d'interface est destinée à être
écrite ailleurs, donc elle est publique, et le préciser n'apporte rien. Le
compilateur l'accepte si vous l'écrivez, mais IntelliJ le signalera comme
redondant.

Le nom choisi ici dit une capacité, pas une nature. C'est une habitude utile :
beaucoup d'interfaces du JDK se terminent par `-able`, `Comparable`,
`Runnable`, `Serializable`.

Le code complet, à exécuter : demos, classe `demo.itf.slides.LeTypePeutEtreLInterface`.

---

### 1.4 · Une classe s'engage

**Source** d03/34, réécrite

**Slide**

- Le mot-clé `implements` déclare qu'une classe tient la promesse
- Le compilateur vérifie que toutes les méthodes annoncées sont écrites
- Deux classes sans aucun rapport peuvent tenir la même promesse

```java
public class Examen implements Mesurable {

    private final int points;

    @Override
    public double mesure() {
        return points;
    }
}

public class Colis implements Mesurable {

    private final double grammes;

    @Override
    public double mesure() {
        return grammes;
    }
}
```

**Note**

Vous avez déjà croisé `implements` au module précédent : la classe `Prestation`
d'`ABS.4` s'engageait sur l'interface `Facturable` sans écrire la méthode, parce
qu'elle était abstraite. Ici, les deux classes sont concrètes, donc elles
écrivent.

Regardez ce que ces deux classes ont en commun : rien. Un examen se mesure en
points, un colis en grammes, et aucune classe mère ne les réunirait sans
inventer une parenté qui n'existe pas. C'est exactement ce que la classe
abstraite ne sait pas faire, et ce pour quoi l'interface existe.

L'annotation `@Override` n'est pas obligatoire, mais elle vaut d'être écrite :
elle fait vérifier par le compilateur que la méthode correspond bien à une
promesse. Une faute de frappe dans le nom devient une erreur de compilation au
lieu d'un silence.

Le code complet, à exécuter : demos, classe `demo.itf.slides.LeTypePeutEtreLInterface`.

---

### 1.5 · Le type peut être l'interface

**Source** d03/32, réécrite

**Slide**

- On déclare des variables du type de l'interface, mais on ne l'instancie pas
- À travers ce type, seules les méthodes de l'interface sont visibles
- C'est le polymorphisme du module ABS, sans classe mère

```java
Mesurable m = new Colis(1250);
System.out.println(m.mesure());        // OK

Mesurable autre = new Mesurable();     // erreur de compilation
System.out.println(m.destinataire());  // erreur de compilation
```

**Note**

Une interface n'a pas de constructeur et ne décrit aucun objet : il n'y a rien à
instancier. Elle ne sert que de type.

La seconde erreur est plus intéressante que la première. L'objet référencé est
bel et bien un colis, et il a sans doute un destinataire, mais la variable est
déclarée `Mesurable` : le compilateur ne regarde que ce que ce type promet. Ce
n'est pas une gêne, c'est l'intérêt même du procédé. Le code qui manipule des
mesurables ne peut plus dépendre par accident d'un détail des colis.

La question est posée en fin d'`ITF.3` sur un tableau de `Translatable` :
essayez d'y appeler une méthode qui n'est pas dans l'interface, et lisez ce que
dit le compilateur.

Le code complet, à exécuter : demos, classe `demo.itf.slides.LeTypePeutEtreLInterface`.

---

### 1.6 · Recevoir un comportement en paramètre

**Source** d04/15 et 16, réécrites

**Slide**

- Une méthode qui reçoit un `Mesurable` accepte tout ce qui en est un
- Y compris des classes écrites longtemps après elle
- Le type du paramètre déclare le besoin, pas le fournisseur

```java
public static double total(Mesurable[] choses) {
    double somme = 0;
    for (Mesurable chose : choses) {
        somme += chose.mesure();
    }
    return somme;
}
```

**Note**

Cette méthode additionne des examens et des colis dans le même tableau, et
elle ignore lesquels. Elle fonctionnera aussi avec une classe qui n'existe pas
encore, du moment que cette classe implémente `Mesurable`.

C'est le point le plus important de la section, et il sera vérifié dès `ITF.1` :
le test y passe à votre méthode une soustraction fabriquée sur place, que vous
n'avez pas écrite et dont votre code n'a jamais entendu parler.

Retenez la formulation : le type d'un paramètre déclare ce dont la méthode a
besoin. Écrire `Colis` au lieu de `Mesurable` reviendrait à exiger beaucoup plus
que nécessaire. La section 4 en fera un principe.

Le code complet, à exécuter : demos, classe `demo.itf.slides.RecevoirUnComportementEnParametre`.

---

### 1.7 · Exercices

**Slide**

- **ITF.1** - Une interface et deux implémentations
- **ITF.2** - Payer en ligne
- Écrire : CC-MET.7

**Note**

`ITF.1` isole l'idée dans le plus petit programme possible : une interface à une
méthode, deux implémentations, et une méthode qui reçoit un calculateur. Le
troisième paramètre est déclaré `Calculateur` et non `Addition`, et toute la
suite du module tient dans cette différence.

`ITF.2` reprend la même structure sur un cas réaliste, où l'interface sépare
vraiment deux parties du programme : le client d'un côté, les moyens de paiement
de l'autre. Deux points de vigilance. Les classes de paiement retournent leur
compte-rendu au lieu de l'afficher, ce qui est la règle CC-MET.7 : une classe
qui écrit elle-même sur la console devient inutilisable ailleurs et intestable.
Et le formatage du montant précise `Locale.US`, sans quoi une machine
configurée en français écrit une virgule et le test échoue sur un caractère.

La question de fin d'`ITF.2` mérite d'être posée à voix haute : le virement
bancaire arrive, quelles classes faut-il écrire, et lesquelles faut-il modifier ?

---

## Section 2 — Plusieurs interfaces à la fois

### 2.1 · Plusieurs interfaces à la fois

*(intercalaire)*

### 2.2 · Une seule mère, autant d'interfaces qu'on veut

**Source** d03/38, réécrite

**Slide**

- Une classe Java n'hérite que d'une seule autre : pas de double `extends`
- Rien n'empêche d'implémenter plusieurs interfaces
- L'ordre des mots est imposé : `extends` d'abord, `implements` ensuite

```java
public class Square extends Shape
        implements Translatable, Rotatable {

    // ...
}
```

**Note**

L'héritage multiple est interdit en Java, et pour une bonne raison : si deux
classes mères fournissaient la même méthode avec deux corps différents, aucune
règle simple ne dirait laquelle s'applique.

Les interfaces ne posent pas ce problème, puisqu'elles ne fournissent aucun
corps. Une classe peut donc en implémenter autant qu'elle veut, et s'engager
ainsi sur plusieurs promesses indépendantes.

Une classe peut n'avoir aucune classe mère et implémenter quand même des
interfaces : `extends` est facultatif, `implements` aussi, et les deux
s'utilisent séparément ou ensemble.

---

### 2.3 · Un comportement qui traverse les familles

**Source** nouvelle, motivée par `ITF.3`

**Slide**

- Une classe abstraite dit ce qu'un objet est, une interface ce qu'il sait faire
- Une image et un texte peuvent se déplacer sans être des formes
- Aucune classe mère ne réunirait les trois sans mentir

```java
public interface Translatable {
    void translate(double dx, double dy);
}

public interface Rotatable {
    void rotate(double alpha);
}
```

**Note**

Un carré est une forme, et cette phrase justifie la classe abstraite `Shape` du
module précédent. Un carré sait se déplacer, et cette phrase-là justifie une
interface, parce que la capacité déborde largement la famille des formes.

C'est le même raisonnement que dans la démonstration : le magasin savait
réagir à une annonce sans être un client. Une capacité se moque de la
généalogie.

Les deux interfaces sont séparées, et ce n'est pas un hasard. Une figure
pourrait se déplacer sans pouvoir tourner. Réunir les deux méthodes dans une
seule interface obligerait toute classe déplaçable à savoir tourner : la
section 4 dira pourquoi c'est une mauvaise idée.

---

### 2.4 · Où écrire la méthode

**Source** d03/39, question de l'énoncé `ITF.3`

**Slide**

- Une classe abstraite peut implémenter l'interface pour toutes ses filles
- La règle est celle du module ABS : ce qui est commun monte, ce qui varie descend
- La question se pose à chaque méthode, et `ITF.3` vous la pose pour de bon

```java
public abstract class Shape
        implements Translatable, Rotatable {

    // abstraites, ou ecrites ici ?
}
```

**Note**

`Shape` s'engage sur les deux interfaces, et deux issues sont possibles. Soit
elle déclare les méthodes abstraites et laisse chaque forme les écrire, soit
elle les écrit une fois pour toutes et ses filles n'ont rien à faire.

Le critère est celui de la section 4 du module ABS, et il n'a pas changé : le
code serait-il identique dans les trois sous-classes ? Si oui, il monte.

Je ne réponds pas ici. C'est la question à trancher d'`ITF.3`, et l'énoncé vous
demande d'y répondre avant de coder. Vous saurez que votre réponse était la
bonne si les trois sous-classes n'ont pas une ligne à changer.

---

### 2.5 · Exercices

**Slide**

- **ITF.3** - Des formes qui se déplacent et tournent
- Les formes d'`ABS.1` sont reprises ici, complètes
- Concevoir : CC-CLS.3

**Note**

L'exercice combine les deux outils du moment : une hiérarchie de classes, et
deux interfaces qui la traversent. Le travail d'écriture est court, la décision
est tout l'exercice.

Le dernier test manipule un tableau de `Translatable`. Les objets y sont vus à
travers l'interface seulement, et c'est l'occasion de vérifier ce que dit la
slide 1.5 : essayez d'appeler `rotate` ou `nom` sur un élément de ce tableau.

La dernière question de l'énoncé est ouverte, et je n'ai pas de réponse
définitive à vous donner : la normalisation de l'angle apparaît dans `ABS.1` et
de nouveau ici. Est-ce une duplication au sens de CC-CLS.3 ? Les deux packages
étant indépendants par construction, la question mérite d'être posée plutôt que
tranchée.

---

## Section 3 — Interface ou classe abstraite ?

### 3.1 · Interface ou abstraite ?

*(intercalaire)*

### 3.2 · Deux outils, deux intentions

**Source** d04/19 et 20, condensées ; tableau du fascicule ITF

**Slide**

|  | **Classe abstraite** | **Interface** |
| --- | --- | --- |
| Contient du code ? | oui, et des champs | des signatures seulement |
| Combien par classe ? | une seule | autant qu'on veut |
| Ce qu'elle exprime | « est un » | « sait faire » |
| Ce qu'elle apporte | le partage du code | le découplage |

**Note**

Le tableau tient en quatre lignes, et la troisième est celle qui décide presque
toujours. Formulez la phrase à voix haute : un carré est une forme, un carré
sait se déplacer. La bonne réponse est celle des deux phrases qui n'est pas
ridicule.

Les deux premières lignes sont des conséquences. Une interface ne porte pas de
code, donc elle ne partage rien, donc rien n'empêche d'en implémenter
plusieurs. Une classe abstraite contient du code et des champs, donc elle ne peut
être qu'une.

La première ligne mérite une nuance depuis Java 8, et la section 6 la donnera.
Elle reste vraie de tout ce que vous écrirez cette année.

---

### 3.3 · Les deux ensemble

**Source** `ABS_enonces.docx`, structure d'`ABS.4`

**Slide**

- Les deux outils ne s'excluent pas
- L'interface énonce ce que tout le monde sait faire
- La hiérarchie partage le code, étage par étage

```java
Facturable          interface : double montant()
  |
  +- Prestation     abstraite : client, facture()
      |
      +- Forfait    abstraite : prixForfait
      |   +- Abonnement
      |   +- Installation
      |
      +- Horaire    abstraite : tauxHoraire, heures
          +- Depannage
          +- Urgence
```

**Note**

Vous avez déjà vu cette structure au module précédent, sans pouvoir la
compléter. Le sommet est une interface, et c'est ce qui bloquait.

La répartition suit deux règles distinctes, qu'il vaut la peine de séparer.
L'interface dit ce que toute prestation doit savoir faire : donner son montant.
Les classes abstraites, elles, rangent les champs et le code commun à l'étage où
ils deviennent communs.

Notez la conséquence sur `Prestation` : elle implémente `Facturable` sans écrire
`montant`, ce qui est légal parce qu'elle est abstraite. Elle reporte
l'obligation sur ses descendants, exactement comme une méthode abstraite
ordinaire.

---

### 3.4 · Exercices

**Slide**

- **ABS.4** - Une hiérarchie à deux niveaux *(fascicule ABS)*
- Annoncé au module ABS, il devient faisable maintenant

**Note**

C'est l'exercice mis de côté au module précédent, faute de connaître les
interfaces. L'attente est terminée.

Il réunit tout ce qui vient d'être dit : deux étages d'abstraction, une
interface à implémenter, un champ à placer au bon niveau, un tableau du type le
plus général et pas un seul test de type. C'est aussi la forme exacte de la
quatrième question de l'examen.

Deux décisions vous appartiennent, et aucune des deux n'est vérifiée par un
test. Où implémenter `montant`, puisque ni `Prestation`, ni `Forfait`, ni
`Horaire` ne savent calculer. Et quelle visibilité donner aux accesseurs
intermédiaires, dont seules les sous-classes ont besoin : voir `PKG.5`.

---

## Section 4 — Dépendre d'un contrat, pas d'une classe

### 4.1 · Dépendre d'un contrat

*(intercalaire)*

### 4.1a · Le modèle MVC : qui fait quoi

**Source** — slide ajoutée le 14/10/2026, à la demande du professeur, pour situer les
classes `GUI` et `Controleur` des slides suivantes. Dans le deck remanié, le diagramme
est dessiné (formes) ; la version texte ci-dessous est celle que produit le moteur.

**Slide**

- Une application graphique se découpe souvent en trois rôles : la vue, le contrôleur et le modèle
- La vue (`GUI`) affiche et capte les gestes de l'utilisateur ; le modèle contient les données et les règles
- Le contrôleur fait le lien : il reçoit l'action, met le modèle à jour, et demande à la vue d'afficher

```java
Utilisateur  -- clic -->  Vue (GUI)  -- action -->  Controleur  -- met a jour -->  Modele
                                     <-- affiche(message) --
```

**Note**

Les slides qui suivent parlent d'un contrôleur et d'une classe GUI. Ces deux noms
viennent d'un découpage très répandu dans les applications graphiques, le modèle MVC :
Modèle, Vue, Contrôleur.

La vue est ce que l'utilisateur voit : la fenêtre, ses boutons, ses zones de texte. Elle
capte les gestes, un clic, une saisie, mais ne décide de rien. Le modèle contient les
données et les règles du métier, sans rien savoir de l'écran. Le contrôleur fait le lien :
il reçoit l'action transmise par la vue, met le modèle à jour, puis demande à la vue
d'afficher le résultat.

Chaque rôle peut ainsi changer sans toucher aux autres : une autre fenêtre, une version
console, des règles qui évoluent. Du moins en principe. La flèche « affiche » est celle qui
pose problème : si le contrôleur la tient vers une classe GUI précise, il ne pourra plus
parler à rien d'autre. C'est exactement ce que montre la slide suivante. Les modules FX
reviendront sur ce découpage avec JavaFX.

### 4.2 · Deux classes qui se tiennent

**Source** d03/48, code corrigé

**Slide**

- Le contrôleur nomme la classe `GUI` : il ne marche qu'avec elle
- Changer d'affichage oblige à le modifier
- Les deux classes ne peuvent plus être testées séparément

```java
public class Controleur {

    private GUI afficheur;

    public void setAfficheur(GUI afficheur) {
        this.afficheur = afficheur;
    }
}
```

**Note**

Ce code fonctionne, et c'est ce qui le rend instructif : le défaut n'est pas un
bug, il est dans la dépendance.

Le contrôleur n'a besoin que d'une chose, afficher un message. Il exige
pourtant une classe entière, avec tout ce qu'elle contient. Le jour où
l'application gagne une version console, ou une version qui écrit dans un
fichier de trace, le contrôleur devra être rouvert.

Il y a une conséquence moins visible et plus coûteuse : pour tester le
contrôleur, il faut construire une interface graphique. Nous y reviendrons au
module JUN.

Le code complet, à exécuter : demos, classe `demo.itf.slides.DeuxClassesQuiSeTiennent`.

---

### 4.3 · Une interface entre les deux

**Source** d03/49, code corrigé

**Slide**

- L'interface énonce le seul service dont on a besoin
- Le contrôleur ne nomme plus aucune classe concrète
- Console, fenêtre ou trace : au choix, sans le rouvrir

```java
public interface Afficheur {
    void affiche(String message);
}

public class Controleur {

    private Afficheur afficheur;

    public void setAfficheur(Afficheur afficheur) { ... }
}

```

**Note**

Trois mots ont changé, et la dépendance a changé de sens. Le contrôleur ne
dépend plus de la fenêtre : les deux dépendent de l'interface, qui est plus
petite et plus stable que l'une comme l'autre.

C'est ce que la démonstration a montré en ouverture du module, sur un autre
sujet. Le fournisseur ne connaissait plus ses abonnés, et c'est pour cela qu'il
pouvait parler à n'importe lequel.

Le gain de testabilité devient concret : une classe de test peut fournir au
contrôleur un afficheur de quatre lignes qui retient le dernier message, et
vérifier ce qui a été signalé sans ouvrir la moindre fenêtre.

Le code complet, à exécuter : demos, classe `demo.itf.slides.UneInterfaceEntreLesDeux`.

---

### 4.4 · Le type le plus faible qui suffit

**Source** d04/18, réécrite

**Slide**

- Le principe de ségrégation : ne demander que ce dont on a vraiment besoin
- Choisir le type d'un paramètre, c'est choisir ce qu'on s'autorise à appeler
- Une interface qui déclare trop de méthodes oblige ses implémentations à trop en faire

**Note**

Le principe a deux conséquences pratiques, et elles se lisent sur les deux
slides précédentes.

La première porte sur les types que vous écrivez dans vos déclarations. Un
paramètre, un champ, une variable : le type le plus faible qui suffit est le
bon. Déclarer `Afficheur` plutôt que `Fenetre` n'est pas une coquetterie, c'est
une réduction délibérée de ce que le code peut faire.

La seconde porte sur les interfaces que vous concevez. Une interface qui
déclarerait à la fois `affiche`, `efface`, `redimensionne` et `imprime`
obligerait toute classe affichante à savoir imprimer. Mieux vaut plusieurs
petites interfaces, qu'une classe combine si elle le souhaite. C'est la raison
pour laquelle `Translatable` et `Rotatable` sont deux interfaces et pas une.

---

### 4.4a · Des transports et une station-service

**Source** d03/51 (les classes de transport), reprise en diagramme le 14/10/2026, à la
demande du professeur, pour présenter la situation avant le code. Dans le deck remanié,
le diagramme est dessiné (formes) ; la version texte ci-dessous est celle que produit le
moteur.

**Slide**

- Une petite hiérarchie de transports : chacun sait bouger, à sa façon
- Une station-service doit faire le plein des transports qu'on lui présente
- Mais seuls certains ont un moteur, et aucune classe ne les rassemble

```java
                       Transport  (abstraite)       StationService
                       bouge()                      faireLePlein(?)
        ^            ^             ^            ^
     Voiture       Avion          Moto         Velo
     a moteur      a moteur       a moteur     sans moteur
```

**Note**

Voici la situation avant tout code. Une classe abstraite Transport déclare ce que tout
transport sait faire, bouger, et quatre sous-classes le font chacune à leur façon : la
voiture roule, l'avion vole, la moto se faufile, le vélo pédale. Le découpage est
correct : chacune de ces classes est bien un transport.

Arrive une station-service, qui doit faire le plein des transports qu'on lui présente.
Le problème apparaît tout de suite sur le diagramme : faire le plein n'a de sens que pour
les transports à moteur. Ce sont la voiture, l'avion et la moto, mais pas le vélo. Or
aucune classe de la hiérarchie ne rassemble les transports à moteur : la propriété
traverse la famille au lieu de la suivre.

La slide suivante montre la première réponse qui vient à l'esprit, et pourquoi elle ne
tient pas.

### 4.5 · Un comportement qui ne suit pas la hiérarchie

**Source** d03/51 à 53, code corrigé

**Slide**

- Faire le plein concerne la voiture, mais pas le vélo
- Aucune classe mère ne dessine ce découpage
- La station teste le type, et sera rouverte sans cesse

```java
public class StationService {

    // a ne pas ecrire
    public void faireLePlein(Transport transport) {
        if (transport instanceof Velo) {
            // ne rien faire
        } else {
            // faire le plein
        }
    }
}
```

**Note**

Le module ABS a déjà condamné le test de type, mais la situation n'est pas la
même. Là-bas, le test trahissait une hiérarchie mal découpée, et la solution
était de faire descendre le comportement dans les sous-classes.

Ici, le découpage de la hiérarchie est correct : un vélo est bien un transport.
C'est le comportement qui traverse la famille au lieu de la suivre. Aucune
classe mère ne sépare les transports à moteur des autres, et en inventer une
mentirait sur ce qu'est un transport.

Le jour où un tricycle arrive à la pompe, la station devra être modifiée. Elle
le sera à chaque nouveau transport, et rien dans le compilateur ne préviendra
qu'on l'a oubliée.

Le code complet, à exécuter : demos, classe `demo.itf.slides.LInterfaceSupprimeLeTest`.

---

### 4.6 · L'interface supprime le test

**Source** d03/54 et 55, chute corrigée

**Slide**

- Seuls les transports à moteur implémentent `Motorise`
- La station reçoit un `Motorise` : le vélo est refusé
- Le test de type a disparu, il n'a pas été déplacé

```java
public interface Motorise {
    void faisLePlein();
}

public class StationService {

    public void faireLePlein(Motorise motorise) {
        motorise.faisLePlein();
    }
}
```

**Note**

Il faut aller jusqu'au bout du raisonnement. Écrire `if (transport instanceof
Motorise)` dans la station ferait disparaître le nom du vélo, mais garderait le
test : on aurait déplacé le problème, pas résolu.

En déclarant le paramètre `Motorise`, la station n'a plus rien à vérifier. Un
appel avec un vélo ne compile pas, et l'erreur est signalée à l'endroit où elle
est commise. C'est la règle CC-CLS.4 du mémento, et le principe de ségrégation
de la slide précédente, appliqués ensemble.

Le tricycle peut arriver : s'il a un moteur, il implémente `Motorise`, et la
station le sert sans avoir été rouverte. Sinon il ne se présente pas à la
pompe.

Le code complet, à exécuter : demos, classe `demo.itf.slides.LInterfaceSupprimeLeTest`.

---

## Section 5 — Le patron Observateur

### 5.1 · Le patron Observateur

*(intercalaire)*

### 5.2 · Un patron de conception

**Source** d03/57, condensée

**Slide**

- Une solution éprouvée à un problème de conception qui revient souvent
- Ce n'est ni une bibliothèque ni du code à copier : c'est une structure
- On les range en trois familles : création, structure, comportement

**Note**

Les patrons de conception ne s'installent pas et ne s'importent pas. Ils se
reconnaissent : vous rencontrez un problème, vous constatez qu'il a déjà une
forme connue, et vous appliquez la structure de classes qui va avec.

Leur premier intérêt est le vocabulaire. Dire « c'est un observateur » à un
collègue transmet en trois mots ce qu'il faudrait un quart d'heure à décrire.

Celui que nous allons nommer est un patron de comportement, et vous l'avez déjà
vu tourner : c'est celui de la démonstration. Le catalogue de référence en ligne
est refactoring.guru, si vous voulez en parcourir d'autres.

---

### 5.3 · Le problème

**Source** d03/58, réécrite

**Slide**

- Plusieurs objets veulent être prévenus quand quelque chose arrive
- Les faire demander sans cesse : coûteux, et toujours en retard d'un instant
- Prévenir tout le monde nommément : le magasin doit connaître chacun d'eux

**Note**

Le besoin est banal et revient partout : un produit arrive en stock, un fichier
change, un bouton est cliqué, et plusieurs parties du programme veulent le
savoir.

Les deux solutions spontanées sont mauvaises, chacune à sa façon. Faire
interroger le magasin en boucle par les intéressés gaspille du temps et arrive
toujours après coup. Faire prévenir nommément chaque intéressé oblige le magasin
à tenir une liste par type d'acteur, et à être modifié chaque fois qu'un nouveau
type apparaît.

Ce que nous cherchons est un dispositif où les intéressés se signalent
eux-mêmes, et où le magasin ne sait rien d'eux.

---

### 5.4 · Le dispositif

**Source** d03/59 à 61, réécrites ; classes d'`ITF.4`

**Slide**

- L'interface `Abonne` déclare une seule méthode
- Le magasin tient un tableau d'abonnés, rien de plus
- S'abonner, se désabonner, prévenir : trois méthodes

```java
public class Magasin {

    private final Abonne[] abonnes = new Abonne[10];

    public void receptionne(String produit) {
        for (Abonne abonne : abonnes) {
            abonne.nouveauProduit(produit);
        }
    }
}
```

**Note**

Lisez la classe `Magasin` en cherchant le mot `Client`. Il n'y est pas, et c'est
tout le patron.

La méthode `receptionne` appelle `nouveauProduit` sur chaque abonné, sans savoir
lequel répondra ni ce qu'il fera. C'est le polymorphisme du module ABS, à ceci
près que les objets du tableau n'ont aucune classe mère commune.

Le tableau a une taille fixe de dix, ce qui est une limite assumée : nous
n'avons pas encore de quoi faire mieux. Le module COL la lèvera, et l'énoncé
d'`ITF.4` pose la question.

---

### 5.5 · Ce que ça change

**Source** `Demo_ITF.docx`, étape 5

**Slide**

- Ajouter un acteur : une classe, et rien d'autre à modifier
- Le magasin ne saura jamais à qui il parle
- On ne demande pas son état à l'abonné : on lui demande d'agir (CC-OBJ.1)

**Note**

La mesure de la réussite est un décompte de fichiers. Ajouter un entrepôt, un
prospect ou un transporteur demande une classe et pas une ligne ailleurs. Avec
trois listes séparées dans le magasin, une par type d'acteur, il aurait fallu
rouvrir le magasin à chaque fois.

Le patron repose entièrement sur une inversion : ce n'est pas le magasin qui va
chercher les intéressés, ce sont eux qui viennent se déclarer. Le magasin garde
l'initiative de l'appel, mais pas la connaissance des destinataires.

Ce dispositif vous servira plus tôt que vous ne le croyez. Toute la gestion des
événements en JavaFX fonctionne ainsi : un bouton ne connaît pas votre
programme, il connaît une interface, et votre code vient s'y abonner.

---

### 5.6 · Exercices

**Slide**

- **ITF.4** - Prévenir sans connaître
- Vous ne modifiez ni le `Magasin`, ni l'interface, ni les deux autres abonnés

**Note**

L'exercice consiste à ajouter un `Prospect` à un dispositif qui existe déjà et
qui fonctionne. C'est une situation fréquente en entreprise, et elle demande une
discipline particulière : lire ce qui est fourni avant d'écrire, et n'ajouter
que ce qui manque.

La contrainte est la vraie consigne. Si vous vous surprenez à vouloir modifier
le `Magasin`, relisez-le : rien n'y nomme un client ni un employé, donc rien n'a
besoin d'y changer.

Les deux questions de fin d'exercice valent le détour. Combien de fichiers
avez-vous modifiés, et combien en auriez-vous modifiés avec trois listes
séparées ? Et surtout : le magasin appelle `nouveauProduit` sur chaque abonné,
comment sait-il quelle version exécuter ?

---

## Section 6 — Ce qu'une interface contient aussi

### 6.1 · Ce qu'elle contient aussi

*(intercalaire)*

### 6.2 · Des constantes, et des méthodes utilitaires

**Source** d04/12, réécrite

**Slide**

- Un champ d'interface est implicitement `public static final`
- Une interface peut contenir des méthodes `static`, corps compris
- Elles s'appellent sur l'interface : `Mesurable.negligeable(colis)`

```java
public interface Mesurable {

    double SEUIL = 0.001;   // public static final

    double mesure();

    static boolean negligeable(Mesurable m) {
        return m.mesure() < SEUIL;
    }
}
```

**Note**

Les trois modificateurs d'un champ d'interface sont implicites et ne se
modifient pas : une interface ne peut déclarer que des constantes. Les écrire
est autorisé mais redondant. Une conséquence pratique : un champ sans valeur
initiale ne compile pas, puisqu'il est `final`.

La méthode `static` est un ajout de Java 8, et elle se comporte comme celle
d'une classe : elle contient son corps, elle s'appelle sur l'interface, et aucune
classe implémentante ne la redéfinit ni n'en hérite. Elle sert à ranger les
petits utilitaires liés à l'interface là où on les cherche.

Ne confondez pas les deux `static` : celui du champ est imposé, celui de la
méthode est un choix.

Le code complet, à exécuter : demos, classe `demo.itf.slides.DesConstantesEtDesMethodesUtilitaires`.

---

### 6.3 · Ajouter une méthode sans casser l'existant

**Source** d04/13 à 17, condensées ; code corrigé

**Slide**

- Une interface implémentée par dix classes ne peut pas gagner une méthode : les dix cessent de compiler
- Une méthode `default` contient un corps, dont toutes les classes héritent
- Chacune peut la redéfinir, aucune n'y est obligée

```java
public interface Vehicle {

    void demarre();
    void arrete();

    default void klaxonne() {
        System.out.println("Tuut");
    }
}
```

**Note**

Le problème est celui d'une interface déjà publiée. Vous l'avez écrite il y a
six mois, une dizaine de classes l'implémentent, et on vous demande d'y ajouter
le klaxon. Sans les méthodes par défaut, il faudrait rouvrir les dix classes.

Java 8 a introduit ce mécanisme parce que ses concepteurs avaient exactement ce
problème, à l'échelle de la planète : ajouter des méthodes à `List` et à ses
voisines sans casser tout le code existant du monde.

Vous n'écrirez pas de méthode par défaut cette année, et aucun exercice n'en
demande. Vous en utiliserez pourtant sans le savoir, dès le module COL.

Une remarque honnête pour finir : cette notion écorne le tableau de la
section 3. Depuis Java 8, une interface peut contenir du code. La distinction
utile reste celle des intentions, « est un » contre « sait faire », et une
interface qui se met à contenir beaucoup de code est généralement une classe
abstraite qui s'ignore.

Le code complet, à exécuter : demos, classe `demo.itf.slides.AjouterUneMethodeSansCasser`.

---

### 6.4 · Une interface sans aucune méthode

**Source** d03/41, propos corrigé

**Slide**

- Une interface de marquage ne déclare rien : elle pose une étiquette
- Elle ne dit pas « sait faire », mais « appartient à cette catégorie »
- `Serializable` autorise un objet à être écrit dans un fichier, et c'est tout

```java
public class Contact implements Serializable {

    // rien a implementer : l'interface ne demande rien
}
```

**Note**

L'exemple que vous rencontrerez pour de bon est `Serializable`, au module FIC.
Elle ne déclare aucune méthode, donc il n'y a rien à écrire. Sans elle,
l'écriture de l'objet dans un fichier lève `NotSerializableException` ; avec
elle, tout fonctionne, et vous n'aurez rien tapé de plus qu'un `implements`.

Le mécanisme est simple : la bibliothèque vérifie à l'exécution que l'objet
porte l'étiquette. `Cloneable` fonctionne de la même façon, `Object.clone`
levant `CloneNotSupportedException` si la classe ne l'implémente pas.

Un mot d'histoire, parce que cela explique la rareté du procédé : depuis Java 5,
ce rôle d'étiquette est mieux tenu par les annotations, `@Override`,
`@Deprecated`, `@FunctionalInterface`. On ne crée donc plus guère d'interfaces
de marquage. `Serializable` reste sur votre route parce qu'elle est plus
ancienne que les annotations.

---

### 6.5 · Une interface, une seule méthode

**Source** d03/42 à 45, condensées

**Slide**

- Une interface avec exactement une méthode abstraite est dite fonctionnelle
- Vous en avez écrit deux : `Calculateur` et `Translatable`
- L'annotation `@FunctionalInterface` fait vérifier la règle
- Au module LAM, elles gagneront une écriture abrégée

```java
@FunctionalInterface
public interface Calculateur {

    int calcule(int a, int b);
}
```

**Note**

Le nom est plus impressionnant que la chose : une seule méthode abstraite, c'est
tout. Vous en avez écrit sans le savoir, et le JDK en est plein. `Runnable` avec
`run`, `Comparator` avec `compare`, et `EventHandler` avec `handle`, que vous
retrouverez à chaque bouton du module FX.

L'annotation est facultative et joue le même rôle qu'`@Override` : elle ne
change rien au code produit, elle fait refuser par le compilateur une interface
qui ne respecterait pas la règle. C'est une déclaration d'intention vérifiée.

L'intérêt viendra au module LAM. Partout où une interface fonctionnelle est
attendue, Java autorise une écriture courte, l'expression lambda, qui tient sur
une ligne au lieu d'une classe entière. Vous saurez alors ce que cette ligne
abrège, parce que vous aurez écrit la version longue.

**Réserve** la subtilité du décompte, si un étudiant pose la question : les
méthodes publiques héritées d'`Object`, comme `equals` ou `toString`, ne comptent
pas dans le total. Une interface qui redéclare `equals` et déclare une autre
méthode reste fonctionnelle. Hors programme, mais la question arrive parfois.

---

## Section 7 — Le fil rouge

### 7.1 · Le fil rouge

**Slide**

- **G.11** - L'interface `ObservateurPartie` *(fil rouge GameHub)*
- **G.12** - La partie enregistre ses observateurs *(fil rouge GameHub)*
- **G.13** - Un journal qui suit la partie *(fil rouge GameHub)*
- La liste d'observateurs de `G.12` vous est donnée : les collections sont le sujet du module COL

**Note**

Les trois incréments appliquent le patron de cette séance au fil rouge. `G.11`
déclare l'interface `ObservateurPartie`, avec ses trois moments : le début, le
coup, la fin.

`G.12` fait de la `Partie` le sujet observé. Elle reçoit une liste
d'observateurs, les méthodes pour les ajouter et les retirer, et trois méthodes
privées qui les préviennent. L'énoncé vous donne la ligne qui crée la liste et
la boucle qui la parcourt : les collections sont le sujet du module COL, il n'y
a rien à deviner ici.

`G.13` écrit le premier observateur, un journal qui affiche le déroulement sur
la console. Vous pourrez en ajouter d'autres plus tard, un compteur de coups ou
un chronomètre, sans toucher à la `Partie`. C'est le décompte de fichiers de la
slide 5.5, sur votre propre projet.
