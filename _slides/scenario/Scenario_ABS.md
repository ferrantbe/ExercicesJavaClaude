# Scénario du module ABS — Classes abstraites

Huit sections, 45 slides (46 avec le sommaire posé par le finaliseur).

Retouches faites à la main dans PowerPoint, qu'une reconstruction ne reproduit pas :
les deux flèches animées — « commun » vers le haut, « différent » vers le bas — sur la
règle de partage (4.3) et sur la slide des trois questions (8.2), et le sous-niveau de
puces des trois questions sur cette même slide 8.2.

## Fabrication

Sections à déclarer dans `module_abs.py`, listes `SECTIONS` et `LIBELLES` :

| # | `SECTIONS` (titre de l'intercalaire) | `LIBELLES` (repère et sommaire) |
|---|---|---|
| 1 | L'héritage en Java | L'héritage en Java |
| 2 | Le même code, trois fois | Le même code, trois fois |
| 3 | La classe abstraite | La classe abstraite |
| 4 | Ce qui monte, ce qui descend | Ce qui monte, ce qui descend |
| 5 | Le polymorphisme | Le polymorphisme |
| 6 | La mère appelle la fille | La mère appelle la fille |
| 7 | Deux étages | Deux étages |
| 8 | Décider soi-même | Décider soi-même |

Sources : deck 01 slides 37 à 43 (héritage, comparaison C#), deck 03 slides 13 à 28,
`ABS_enonces.docx`, `Demo_ABS.docx`.

Le deck POO renvoie explicitement l'héritage et le polymorphisme à ce module
(slide « Les quatre principes de la POO »). La section 1 les enseigne donc en Java,
sur des classes concrètes, avant que l'abstraction n'entre en scène.

Le rapport bancaire du deck 03 (slides 19 à 27, quatre banques, CSV, XML, JSON, API,
chaîne `DonneeBanque` / `InfoCompte` / `Mouvement`) est remplacé par la version du
fascicule : deux banques dont les colonnes sont dans un ordre différent.

Défauts du deck d'origine corrigés ici : `@Overrides` au lieu de `@Override` (03 / s25),
trois noms pour le même type de retour — `Rapport`, `RapportBanque`, `BankData`
(03 / s22 à s25), `marque` déclaré `final` et initialisé à la chaîne vide (03 / s15).

**Point à valider :** les noms des trois méthodes abstraites du visualiseur
(`donnees`, `nomBanque`, `lire`) sont déduits de la prose du fascicule,
faute d'avoir le squelette sous les yeux. À aligner sur le code réel avant diffusion.

---

### 0.1 · Page de titre

**Slide**

- Module ABS
- Classes abstraites

**Note**

Ce module répond à une question de conception : que faire quand plusieurs classes font
la même chose, à un détail près. La réponse tient en une phrase, qui sert de sous-titre
au fascicule : ce qui est commun monte, ce qui varie descend.

L'outil pour cela est la classe abstraite, et le mécanisme qui la rend utile est le
polymorphisme. Les deux ont été annoncés au module POO, où la slide des quatre
principes renvoyait ici.

C'est aussi la matière de la quatrième question de l'examen, et l'endroit où se
concentre l'erreur la plus fréquente : recopier la même méthode dans trois
sous-classes.

## Section 1 — L'héritage en Java

### 1.1 · L'héritage en Java

**Slide**

*(intercalaire)*

**Note**

Vous avez vu l'héritage en C#. Cette section le retrouve en Java, sur des classes
ordinaires : la syntaxe, l'appel au constructeur de la classe mère, la redéfinition
d'une méthode et la visibilité. Rien d'abstrait avant la section 3.

### 1.2 · Une classe qui reprend une autre

**Source** — deck 01, slides 37 et 38, réécrits en Java seul

**Slide**

- Le mot-clé `extends` place une classe sous une autre
- La sous-classe reçoit les champs et les méthodes de la classe mère, sans les réécrire
- Elle ajoute ce qui lui est propre

```java
public class CompteEpargne extends CompteBancaire {

    private final double taux;

    public void crediterInterets() {
        deposer(getSolde() * taux);
    }
}
```

**Note**

L'héritage exprime une relation : un compte d'épargne *est* un compte bancaire. Tout ce
que `CompteBancaire` sait faire, `CompteEpargne` le sait aussi, sans qu'une seule ligne
soit recopiée.

La sous-classe ajoute ce qui la distingue : ici un taux, et une méthode qui s'en sert.
Elle appelle `deposer` et `solde` sans les avoir écrites, puisqu'elle en a hérité.

Une classe ne peut étendre qu'une seule classe. C'est une différence importante avec
les interfaces, que le module suivant abordera.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UneClasseQuiReprendUneAutre`.

### 1.3 · Appeler le constructeur de la classe mère

**Source** — deck 01, slide 40

**Slide**

- Le mot-clé `super` appelle le constructeur de la classe mère
- Cet appel est toujours la première instruction du constructeur
- La classe mère initialise sa part, la classe fille initialise la sienne

```java
public class CompteEpargne extends CompteBancaire {

    public CompteEpargne(long numero, double taux) {
        super(numero);
        this.taux = taux;
    }
    ...
}
```

**Note**

Un objet `CompteEpargne` contient aussi un `CompteBancaire`, avec ses champs. Quelqu'un
doit les initialiser, et ce quelqu'un est le constructeur de la classe mère.

L'appel s'écrit `super(...)` et doit être la première instruction du constructeur. Si
vous ne l'écrivez pas, le compilateur ajoute `super()` tout seul — et se plaint quand la
classe mère n'a pas de constructeur sans argument.

Le mot-clé `super` sert aussi à appeler une méthode de la mère depuis la fille, quand
on la redéfinit sans vouloir la remplacer complètement.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UneClasseQuiReprendUneAutre`.

### 1.4 · Redéfinir une méthode

**Source** — deck 01, slide 41

**Slide**

- Une sous-classe peut redéfinir une méthode héritée en la réécrivant
- L'annotation `@Override` demande au compilateur de vérifier qu'il s'agit bien d'une redéfinition
- Elle est facultative, et il faut toujours l'écrire

```java
public class CompteEpargne extends CompteBancaire {
    ...
    @Override
    public void deposer(double montant) {
        super.deposer(montant);
        journaliser(montant);
    }
}
```

**Note**

Redéfinir, c'est fournir une autre version d'une méthode que la mère possède déjà. La
signature doit être la même, sinon il ne s'agit plus d'une redéfinition mais d'une
nouvelle méthode qui vit à côté.

C'est précisément ce que `@Override` empêche. Une faute de frappe dans le nom, un
paramètre oublié, et le compilateur refuse — alors que sans l'annotation, le programme
compilerait et appellerait la méthode de la mère, en silence. L'annotation est
facultative pour le langage ; elle ne l'est pas dans votre code.

L'appel à `super.deposer` ajoute un comportement sans jeter celui de la mère. Sans lui,
la version de la fille remplacerait purement et simplement l'autre.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UneClasseQuiReprendUneAutre`.

### 1.5 · Ce que la fille voit de la mère

**Slide**

- Un champ `private` de la mère reste invisible dans la fille
- Le modificateur `protected` ouvre le membre aux sous-classes, et aussi au package
- Un accesseur `public` reste une solution, quand l'information regarde tout le monde

```java
public class CompteBancaire {

    private double solde;        // invisible dans CompteEpargne
    protected long numero;       // visible dans CompteEpargne
}
```

**Note**

Hériter ne donne pas tous les droits. Un champ `private` appartient à la classe qui le
déclare, et la sous-classe ne peut pas le lire directement — même si l'objet le contient
bel et bien.

Le modificateur `protected` ouvre l'accès aux sous-classes et au package, et à personne
d'autre. C'est le bon choix pour ce qui est un détail de fonctionnement partagé avec les
filles, mais qui ne regarde pas le reste du programme. Le module PKG le replacera parmi
les quatre niveaux de visibilité, et `PKG.5` lui est consacré.

Le réflexe de tout passer en `protected` pour se simplifier la vie coûte cher : chaque
champ ouvert est un champ que les sous-classes peuvent corrompre, et qu'on ne peut plus
renommer sans les casser.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UneClasseQuiReprendUneAutre`.

### 1.6 · De C# à Java

**Source** — deck 01, slide 43, réduit à l'héritage

**Slide**

| En C# | En Java |
|---|---|
| `class Fille : Mere` | `class Fille extends Mere` |
| `: base(...)` | `super(...)`, première instruction du constructeur |
| `override` | `@Override`, facultative (mais bonne pratique) |
| `is` | `instanceof` |
| `abstract` | `abstract` |

**Note**

Les concepts sont les mêmes, l'écriture change. Deux différences méritent l'attention.

En C#, `override` est obligatoire et fait partie de la déclaration. En Java, `@Override`
est une annotation facultative, ce qui veut dire qu'on peut redéfinir sans la mettre, et
donc se tromper sans être prévenu.

En C#, l'appel au constructeur de base s'écrit dans l'en-tête ; en Java, il s'écrit dans
le corps, en première instruction. La conséquence est la même, la place est différente.

### 1.7 · A une personne, ou est une personne ?

**Source** — promesse du module TAB (slide « Un objet peut en contenir un autre », sa note,
et l'encadré « Une remarque sur le vendeur » du fascicule TAB), ajoutée le 13/10/2026

**Slide**

- Au module TAB, un vendeur **avait une** `Person` : un champ. L'héritage permet l'autre modèle : `Vendor extends Person`
- **Est une** : le vendeur reçoit tout ce que sait la personne. Simple, tant que ce rôle ne change pas
- **A une** : le vendeur est un rôle. La même personne peut aussi être cliente, ou cesser de vendre

```java
// a une personne : un rôle          // est une personne : l'héritage
class Vendor {                        class Vendor extends Person {
    private Person personne;              private Sale[] ventes;
    private Sale[] ventes;            }
}
```

**Note**

Au module TAB, le vendeur de l'exercice TAB.4 possédait une Person : c'était un champ,
comme un autre. Maintenant que l'héritage est là, l'autre modèle s'écrit : un vendeur est
une personne, Vendor extends Person.

Les deux se défendent. L'héritage est le plus direct : le vendeur reçoit le nom, le
prénom et tout ce que la personne sait faire, sans rien redéclarer. Il convient tant que
le vendeur restera vendeur, toute sa vie dans le programme.

Le modèle par rôle est plus souple. La même personne peut être vendeur et cliente à la
fois, ou cesser d'être vendeur sans disparaître. Avec l'héritage, c'est impossible : un
objet ne change jamais de classe, et une classe Java n'a qu'une seule mère. Une personne
qui est à la fois vendeur et cliente ne peut pas hériter des deux.

La question à se poser est donc moins « est-ce vrai dans la vie ? » que « ce rôle
peut-il changer, ou se cumuler ? ». Si oui, le champ ; si non, l'héritage.

## Section 2 — Le même code, trois fois

### 2.1 · Le même code, trois fois

**Slide**

*(intercalaire)*

**Note**

Cette section pose le problème que la classe abstraite résout, et montre le geste par
lequel on le corrige. Le problème est la duplication entre classes sœurs, et c'est
l'erreur la plus fréquente à l'examen.

### 2.1a · Un exemple : prévenir un utilisateur

**Source** — slide de contexte ajoutée le 14/10/2026, à la demande du professeur, pour que
la section ne commence pas directement par le code

**Slide**

- Une application doit prévenir ses utilisateurs, et elle a plusieurs moyens de le faire
- Un mail, un SMS, une notification sur le téléphone : trois canaux, un même geste, envoyer un texte
- Première idée, la plus naturelle : une classe par canal, chacune écrite pour elle-même
- Voyons ce que cette première idée coûte, avant de chercher mieux

```java
NotificationMail          NotificationSms          NotificationPush
  envoyer(texte)            envoyer(texte)           envoyer(texte)
```

**Note**

Avant de parler de classe abstraite, il faut un problème qu'elle résout. Celui-ci est
volontairement ordinaire : une application qui doit prévenir ses utilisateurs, par mail,
par SMS ou par une notification sur le téléphone.

Les trois canaux font la même chose, envoyer un texte, mais chacun à sa façon. La
première idée, celle que presque tout le monde a, est d'écrire une classe par canal,
chacune de son côté. Elle n'est pas mauvaise : elle fonctionne, et chaque classe est
simple.

Les slides suivantes montrent ce qu'elle coûte : du code répété trois fois, et surtout
aucun moyen de traiter les trois canaux ensemble. C'est ce double défaut que la classe
abstraite va corriger.

### 2.2 · Trois classes, un seul comportement

**Slide**

- Trois canaux, trois classes indépendantes
- La méthode d'envoi y est écrite trois fois
- Une règle nouvelle devra être portée dans chacune

```java
public class NotificationMail {
    public void envoyer(String texte) {
        System.out.println("mail : " + texte);
    }
}

public class NotificationSms {
    public void envoyer(String texte) {
        System.out.println("sms : " + texte);
    }
}
```

**Note**

Rien dans ce code n'est faux. Il compile, il fonctionne, et chaque classe est courte et
lisible. Le défaut n'apparaît qu'au moment où la demande change.

Ajoutez une règle — refuser les messages vides, horodater l'envoi, compter les
notifications — et il faut la porter dans chaque classe. Le jour où l'une est oubliée,
le programme se met à se comporter différemment selon le canal, et personne ne saura
dire pourquoi.

C'est l'objet de CC-CLS.3 du mémento Clean Code : la duplication entre sous-classes se
traite en faisant remonter ce qui est commun, pas en le recopiant plus soigneusement.

Le code complet, à exécuter : demos, classe `demo.abs.slides.TroisClassesUnComportement`.

### 2.3 · Ce qu'on ne peut pas faire

**Slide**

- Ranger les trois notifications dans un tableau demande un type commun
- Ces trois classes n'en ont aucun, aux yeux du compilateur
- Sans type commun, pas de boucle : chaque canal se traite à la main

```java
NotificationMail[] canaux = { mail, sms, push };

// refus : sms et push ne sont pas des NotificationMail
```

**Note**

La duplication est le défaut visible. Voici le défaut invisible, et il est plus grave.

Ces trois classes font la même chose, et le compilateur n'en sait rien. Il n'existe
aucun type qui les désigne toutes les trois, donc aucun moyen d'écrire une boucle qui
les traite ensemble. Le seul type commun est `Object`, qui ne sait rien envoyer du tout.

Le programme se retrouve à répéter le même traitement canal par canal, avec une
condition pour chacun. Ajouter Slack demandera de retoucher tous ces endroits.

Le code complet, à exécuter : demos, classe `demo.abs.slides.TroisClassesUnComportement`.

### 2.4 · Démonstration

**Slide**

- Démo : laisser l'outil supprimer la duplication

**Note**

La démonstration part des trois notifications et montre le geste inverse de la
recopie : faire remonter. Les deux tentatives impossibles — le tableau, puis la
modification en trois endroits — sont jouées d'abord.

L'extraction de la classe mère est faite par IntelliJ, sans qu'une ligne soit tapée.
Reste ensuite à décider ce qui ne peut pas remonter : le nom du canal, qui devient
abstrait. Le tableau de l'étape 2 compile alors.

### 2.5 · Le geste, pas le code

**Slide**

- Le refactoring `Extract Superclass` crée la classe mère et y déplace ce qu'on désigne
- Le refactoring `Pull Members Up` fait remonter une méthode d'une classe existante
- L'outil déplace, corrige les déclarations et ne se trompe pas de nom

**Note**

Repérer une duplication, c'est une chose ; la supprimer sans rien casser en est une
autre. IntelliJ le fait pour vous, et c'est un geste à connaître pour lui-même.

Clic droit sur la classe, puis `Refactor` → `Extract` → `Superclass` : l'outil demande
le nom de la nouvelle classe mère et la liste de ce qui doit y monter. Pour les classes
suivantes, `Refactor` → `Pull Members Up` fait remonter les membres déjà écrits.

L'intérêt n'est pas le temps gagné, qui est faible. C'est qu'un déplacement fait à la
main oublie un import, renomme mal un champ ou laisse une copie derrière lui, alors que
l'outil met à jour tout ce qui référence ce qu'il déplace. Voir IDE.21.

## Section 3 — La classe abstraite

### 3.1 · La classe abstraite

**Slide**

*(intercalaire)*

**Note**

Le mot-clé `abstract`, ce qu'il interdit, et à quoi sert une classe qu'on ne peut pas
construire.

### 3.2 · Une classe qu'on ne peut pas instancier

**Source** — deck 03, slide 14

**Slide**

- Le mot-clé `abstract` interdit la création d'objets de cette classe
- On peut toujours déclarer une variable de ce type
- Seules les sous-classes concrètes se construisent

```java
public abstract class Notification { ... }

Notification envoi;                  // d'accord
envoi = new Notification("Ada");     // refus a la compilation
envoi = new NotificationMail("Ada"); // d'accord
```

**Note**

La classe mère extraite à la section précédente pose une question : que voudrait dire
`new Notification(...)` ? Une notification qui n'est ni un mail, ni un SMS, ni un push
n'a pas de canal, donc rien à faire.

Le mot-clé `abstract` transforme cette absurdité en erreur de compilation. La classe
existe, elle a des champs, des méthodes et un constructeur, mais elle ne produit aucun
objet à elle seule.

La distinction à retenir est celle entre déclarer et instancier. La variable `envoi` est
de type `Notification` : c'est une promesse sur ce qu'elle sait faire, pas sur la classe
exacte de l'objet qu'elle désigne.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UnTypeQuOnNeConstruitPas`.

### 3.3 · À quoi sert un type qu'on ne construit pas

**Slide**

- Il sert de type de variable, de paramètre et de valeur de retour
- Il sert surtout de type d'élément dans un tableau (et plus tard dans une Collection, voir COL)
- Il désigne ce que toutes les sous-classes savent faire, et rien de plus

```java
Notification[] canaux = {
    new NotificationMail("Ada"),
    new NotificationSms("0470..."),
    new NotificationPush("ada42")
};
```

**Note**

C'est la réponse à la question posée par le deck d'origine : à quoi peut bien servir une
classe qu'on ne peut pas instancier ?

Elle sert de vocabulaire. Écrire `Notification[]` dit au compilateur que tous les
éléments savent envoyer, sans dire par quel canal. Une méthode qui prend une
`Notification` en paramètre accepte les trois sortes et n'a pas à les distinguer.

Le tableau ci-dessus ne contient aucune `Notification`, au sens strict. Il ne contient
que des objets de sous-classes — et c'est la section 5 qui expliquera ce qui se passe
quand on appelle une méthode dessus.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UnTypeQuOnNeConstruitPas`.

### 3.4 · Un constructeur, quand même

**Slide**

- Une classe abstraite a un constructeur, même si personne ne l'appelle directement
- Le constructeur de la sous-classe l'appelle par `super`
- Le déclarer `protected` dit qu'il n'est là que pour elles

```java
public abstract class Notification {

    protected final String destinataire;

    protected Notification(String destinataire) {
        this.destinataire = destinataire;
    }
}
```

**Note**

Une classe abstraite porte des champs, et ces champs doivent être initialisés. C'est le
travail d'un constructeur, exactement comme ailleurs — la seule différence est que
personne ne l'appelle par `new`, mais toujours par `super` depuis une sous-classe.

Pourquoi `protected` plutôt que `public`, puisque `new` est de toute façon interdit ?
Parce que le modificateur est une déclaration d'intention. Il dit à celui qui lit la
classe : ce constructeur existe pour les sous-classes. C'est une question d'`ABS.1`, et
elle mérite une vraie réponse.

## Section 4 — Ce qui monte, ce qui descend

Le code complet, à exécuter : demos, classe `demo.abs.slides.UnTypeQuOnNeConstruitPas`.

### 4.1 · Ce qui monte, ce qui descend

**Slide**

*(intercalaire)*

**Note**

La règle de partage, qui est le cœur du module. Tout le reste en découle : la méthode
abstraite, l'obligation faite aux sous-classes, et la façon de juger un découpage.

### 4.2 · La méthode abstraite

**Source** — deck 03, slide 15

**Slide**

- Une méthode abstraite se déclare par son entête, suivi d'un point-virgule
- Elle n'a pas de corps : la classe mère ne sait pas comment faire
- Une classe qui contient une méthode abstraite est elle-même abstraite

```java
public abstract class Notification {

    protected abstract String canal();
}
```

**Note**

Déclarer une méthode abstraite, c'est nommer une obligation. La classe mère affirme que
toute notification a un canal, et reconnaît dans le même mouvement qu'elle ne peut pas
dire lequel.

L'écriture est celle d'un entête ordinaire, sans accolades, terminé par un
point-virgule. Le mot-clé `abstract` apparaît sur la méthode, et la classe doit le
porter aussi.

Le lien entre les deux est à sens unique : une classe abstraite peut très bien n'avoir
aucune méthode abstraite, alors qu'une classe qui en a une est forcément abstraite.

Le code complet, à exécuter : demos, classe `demo.abs.slides.UnTypeQuOnNeConstruitPas`.

### 4.3 · La règle de partage

**Source** — fascicule ABS, « Ce qu'il faut avoir en tête »

**Slide**

- Une méthode dont le code serait identique partout appartient à la classe mère
- Une méthode dont le code diffère à chaque fois est abstraite
- Le reste du thème n'est que l'application de ce principe

```java
public abstract class Forme {

    // ce qui VARIE : chaque sous-classe le definit
    public abstract String nom();

    // ce qui est COMMUN : ecrit une seule fois
    public void affiche() {
        System.out.println("Je suis un " + nom());
    }
}
```

**Note**

Voici la règle entière, et elle tient en deux lignes. Ce qui est commun monte, ce qui
varie descend.

Regardez la méthode `affiche`. Elle est écrite une seule fois, dans la classe mère, et
elle appelle `nom`, qui n'existe nulle part. Cela compile, parce que le compilateur sait
que toute sous-classe concrète en fournira une version. C'est le mécanisme qui portera
la section 6.

Le test pratique est simple. Si vos trois sous-classes contiennent plus d'une méthode,
demandez-vous ce qui aurait dû monter. C'est la question posée en fin d'`ABS.1`, et elle
revient à chaque exercice du thème.

Le code complet, à exécuter : demos, classe `demo.abs.slides.LaRegleDePartage`.

### 4.4 · L'obligation faite aux sous-classes

**Slide**

- Une sous-classe concrète définit toutes les méthodes
- Sinon elle est abstraite à son tour, et doit le dire
- Le compilateur ne laisse pas passer l'oubli

```java
public class Cercle extends Forme {

    @Override
    public String nom() {
        return "cercle";
    }
}
```

**Note**

C'est la contrepartie de la promesse faite par la classe mère. Elle a déclaré que toute
forme a un nom ; chaque forme concrète doit le fournir.

Une sous-classe qui n'en définit qu'une partie reste incomplète. Java l'autorise, à
condition qu'elle se déclare `abstract` elle aussi — et ce n'est pas un accident de
parcours, c'est exactement ce dont la section 7 aura besoin.

Remarquez que `Cercle` ne contient qu'une méthode. Tout le reste — la position, la
rotation, l'affichage — vit dans la classe mère et n'est écrit qu'une fois.

Le code complet, à exécuter : demos, classe `demo.abs.slides.LaRegleDePartage`.

### 4.4a · `@Override`, aussi pour une méthode abstraite

**Source** — slide ajoutée le 14/10/2026, à la demande du professeur : sur la slide
précédente, `@Override` apparaît sans être expliqué dans ce contexte

**Slide**

- Rappel : `@Override` demande au compilateur de vérifier qu'on redéfinit bien une méthode de la classe mère
- Définir une méthode abstraite, c'est aussi la redéfinir : l'annotation s'écrit de la même façon
- Avec elle, une faute de frappe est signalée sur la ligne fautive, et non sur la classe

```java
public class Cercle extends Forme {

    @Override
    public String Nom() {          // refus : Nom() ne redéfinit rien
        return "cercle";
    }
}
```

**Note**

L'annotation `@Override` a été présentée avec la redéfinition, en début de module : elle
demande au compilateur de vérifier qu'une méthode remplace bien une méthode de la classe
mère. Elle s'applique exactement de la même façon quand la méthode de la mère est
abstraite. Pour Java, fournir le corps d'une méthode abstraite, c'est la redéfinir.

On pourrait penser l'annotation inutile ici, puisque le compilateur refuse déjà une
classe concrète qui oublie une méthode abstraite. La différence est dans l'endroit où il
le dit. Sans `@Override`, une faute de frappe comme `Nom()` au lieu de `nom()` crée une
nouvelle méthode, et l'erreur tombe sur la ligne de la classe : `Cercle` ne définirait
pas `nom()`. Avec l'annotation, l'erreur tombe sur la méthode mal écrite, qui ne
redéfinit rien. On trouve la faute là où elle est.

Vous n'avez d'ailleurs pas à l'écrire vous-même : quand IntelliJ génère les méthodes à
fournir (Code → Implement Methods), il ajoute `@Override` à chacune.

Le code complet : demos, classe `demo.abs.slides.Cercle`.

### 4.5 · Petit détour : le reste d'une division négative

**Slide**

- En Java, le reste garde le signe du dividende : `-90 % 360` vaut `-90`
- Un modulo seul ne ramène donc pas une valeur dans un intervalle positif
- Ajouter le diviseur puis reprendre le modulo corrige le cas

```java
-90 % 360               // -90, et non 270

(-90 % 360 + 360) % 360 // 270
```

**Note**

Ce point n'a rien à voir avec les classes abstraites. Il est ici parce qu'`ABS.1` en a
besoin et qu'il piège tout le monde une fois.

La rotation d'une forme doit toujours valoir entre 0 inclus et 360 exclu. Le réflexe est
d'écrire un modulo, et il fonctionne pour `setRotation(370)`, qui donne bien 10. Il
échoue pour `setRotation(-90)`, parce qu'en Java le reste de la division garde le signe
du dividende.

La correction tient en une expression : ajouter le diviseur au résultat, puis reprendre
le modulo. Le premier modulo ramène la valeur dans l'intervalle, l'addition la rend
positive, le second efface le tour de trop. Le test d'`ABS.1` vérifie ce cas
précisément.

Le code complet, à exécuter : demos, classe `demo.abs.slides.LeResteDUneDivisionNegative`.

### 4.6 · Exercices

**Slide**

- **ABS.1** - Des formes géométriques
- Concevoir : CC-CLS.3

**Note**

Le premier exercice du thème demande une décision à chaque méthode : monte-t-elle ou
descend-elle ? Le nom varie d'une forme à l'autre, donc il est abstrait. L'affichage et
l'effacement s'écrivent une seule fois, à partir du nom.

La mesure de la réussite est donnée par l'énoncé : chacune de vos trois sous-classes ne
devrait contenir qu'une seule méthode. Si l'une en a deux, quelque chose n'est pas
remonté.

Les questions de fin d'exercice portent sur le constructeur `protected`, sur ce que dit
le compilateur devant `new Shape(...)`, et sur ce tableau de `Shape` qui ne contient
aucun `Shape` — de quoi préparer la section suivante.

## Section 5 — Le polymorphisme

### 5.1 · Le polymorphisme

**Slide**

*(intercalaire)*

**Note**

Le mécanisme qui rend la classe abstraite utile : appeler une méthode sur un objet dont
on ignore la classe exacte, et obtenir quand même le bon comportement.

### 5.2 · Un tableau du type le plus général

**Slide**

- Le tableau du code suivant est déclaré `Shape[]` et ne contient aucun `Shape`
- Chaque case désigne un objet d'une sous-classe concrète
- La boucle traite les trois formes sans savoir lesquelles elle traite

```java
Shape[] formes = {
    new Circle(centre), new Square(centre), new Triangle(centre)
};

for (Shape forme : formes) {
    forme.affiche();
}
```

**Note**

C'est la question posée en fin d'`ABS.1` : comment un tableau de `Shape` peut-il exister
alors que `Shape` ne s'instancie pas ?

Parce que le type déclaré d'une variable et la classe réelle de l'objet sont deux choses
différentes. Le type déclaré dit ce qu'on a le droit de demander ; la classe réelle dit
qui répond. Un `Circle` *est* un `Shape`, donc il a sa place dans le tableau.

La boucle ne contient aucune trace des trois formes. Ajouter un losange ne la changera
pas d'une ligne.

### 5.3 · Qui répond à l'appel

**Slide**

- La méthode exécutée est celle de la classe réelle de l'objet
- Le choix se fait à l'exécution, pas à la compilation
- C'est le polymorphisme, annoncé au module POO

```java
Shape forme = new Circle(centre);

forme.affiche();   // "Je suis un cercle et je m'affiche"
```

**Note**

La variable est déclarée `Shape`, et pourtant c'est la version du cercle qui s'exécute.
Le compilateur vérifie seulement que `Shape` possède bien une méthode `affiche` ; le
choix de la version revient à la machine virtuelle, au moment de l'appel, en regardant
l'objet réel.

Ce mécanisme porte un nom, la liaison dynamique, et c'est lui qui donne tout son
intérêt à la classe abstraite. Sans lui, déclarer un tableau de `Shape` ne servirait à
rien, puisqu'on n'obtiendrait jamais que le comportement générique.

C'est le troisième des quatre principes de la POO, annoncé au module POO et renvoyé
ici.

### 5.4 · Ni `instanceof`, ni test de type

**Slide**

- Un test de type dans la boucle signale une hiérarchie mal découpée
- Ce que vous testez, la machine virtuelle le sait déjà
- Ajouter une sorte de `Shape` nécessite une classe, et aucune autre modification ; si vous utilisez un `instanceof` vous devrez faire d'autres modifications

```java
for (Shape forme : formes) {
    if (forme instanceof Circle) {   // a ne pas ecrire
        ...
    }
}
```

**Note**

L'opérateur `instanceof` existe et a ses usages, mais il n'a rien à faire dans une
boucle comme celle-ci. Si vous avez besoin de savoir quelle forme vous tenez pour
décider quoi faire, c'est que le quoi-faire aurait dû être une méthode de la forme.

Le test pratique est celui de CC-CLS.4 : combien de classes faut-il modifier pour
ajouter une sorte de plus ? Avec le polymorphisme, aucune — on écrit la nouvelle
classe, et le programme existant la traite sans le savoir. Avec des tests de type, il
faut retrouver chaque endroit où le test est écrit.

Les énoncés `ABS.2` à `ABS.5` posent tous cette contrainte explicitement. Ce n'est pas
une coquetterie : c'est le seul moyen de vérifier que le découpage tient.

### 5.5 · Exercices

**Slide**

- **ABS.2** - Des animaux qui font du bruit
- Concevoir : CC-CLS.4

**Note**

Le même geste qu'`ABS.1`, sur un cas plus court, mais avec une nouveauté : le tableau
est rempli au hasard, donc le programme ignore vraiment ce qu'il contient.

Les deux questions de fin d'exercice valent le détour. Ajouter une vache demande de
compter les lignes à modifier dans le programme. Et refaire l'exercice sans classe
abstraite, avec deux classes indépendantes, fait toucher du doigt ce qui devient
impossible.

## Section 6 — La mère appelle la fille

### 6.1 · La mère appelle la fille

**Slide**

*(intercalaire)*

**Note**

Le cas professionnel : la classe mère écrit le déroulé complet d'un traitement, et
laisse aux sous-classes les seuls endroits qui varient. C'est la forme la plus utile de
la classe abstraite, et le sujet d'`ABS.3`.

### 6.2 · De quoi il s'agit

**Source** — fascicule ABS, contexte d'ABS.3 ; diagramme ajouté le 14/10/2026, à la
demande du professeur. Dans le deck remanié, le diagramme est dessiné (formes) ; la
version texte ci-dessous est celle que produit le moteur.

**Slide**

- Une application affiche les mouvements bancaires d'une seule banque, Fric en Vrac
- Il faut ajouter Banquier Pépère : mêmes informations, autre ordre de colonnes
- Le total et le rapport restent les mêmes d'une banque à l'autre

```java
              VisualiseurDeDonneesBancaires   (abstraite)   - - ->  Mouvement
              total()  rapport()                                     compte, montant,
              donneesBrutes()  nomDeLaBanque()  versMouvement(ligne)   communication
                  ^                                   ^
   VisualiseurFricEnVrac                  VisualiseurBanquierPepere
   existe déjà : votre modèle             à écrire : ABS.3
```

**Note**

Voici la situation, avant tout code. Une application affiche les mouvements bancaires de
ses utilisateurs. Elle fonctionne aujourd'hui avec une seule banque, Fric en Vrac, et il
faut y ajouter Banquier Pépère.

Les deux banques livrent exactement les mêmes informations : un compte, un montant, une
communication. Chaque ligne devient un Mouvement, un record. Elles ne les livrent pas
dans le même ordre de colonnes, et c'est la seule chose qui les distingue.

Le diagramme montre où l'on va. En haut, la classe abstraite VisualiseurDeDonneesBancaires
sait calculer le total et mettre le rapport en forme ; ces deux méthodes sont écrites une
fois pour toutes. Les trois méthodes en italique, elle ne sait pas les écrire : d'où
viennent les données, comment s'appelle la banque, comment se lit une ligne. Ce sont ses
méthodes abstraites.

En bas, une sous-classe par banque. Celle de Fric en Vrac existe déjà et vous sert de
modèle ; celle de Banquier Pépère est à écrire, et c'est tout l'exercice ABS.3. La
question du dispositif est donc : où placer ce qui diffère, pour n'écrire qu'une fois ce
qui ne diffère pas ?

### 6.3 · Le squelette, puis le détail

**Source** — deck 03, slides 23 et 24, ramenés à la version du fascicule

**Slide**

- La classe mère écrit le traitement entier
- Elle déclare abstraits les seuls points qui varient
- Une méthode concrète appelle une méthode abstraite

```java
public abstract class VisualiseurDeDonneesBancaires {

    // a fournir par chaque banque
    protected abstract String[][] donneesBrutes();
    protected abstract String nomDeLaBanque();
    protected abstract Mouvement versMouvement(String[] ligne);

    // deja ecrit, une fois pour toutes
    public Mouvement[] mouvements() { ... }
    public double total() { ... }
    public String rapport() { ... }
}
```

**Note**

Regardez l'ordre des choses. La classe mère ne délègue pas le traitement : elle le
possède. Elle sait convertir l'ensemble, additionner les montants et mettre en forme le
rapport. Ce qu'elle ignore, c'est d'où viennent les données, comment s'appelle la banque
et comment se lit une ligne.

Ces trois trous sont déclarés abstraits. Chaque banque les bouche à sa façon, et hérite
de tout le reste sans rien écrire.

Le renversement est le point à comprendre : ce n'est pas la sous-classe qui appelle la
mère, c'est la mère qui appelle la sous-classe. Le code commun mène la danse et vient
chercher le détail au moment où il en a besoin.

### 6.4 · Deux banques, un seul traitement

**Slide**

- Les deux banques livrent les mêmes informations, dans un ordre de colonnes différent
- Seule la lecture d'une ligne change ; le total et le rapport sont communs
- Une troisième banque coûtera une classe, et pas une ligne ailleurs

```java
Banque            ligne[0]        ligne[1]   ligne[2]
-------------------------------------------------------
Fric en Vrac      compte          montant    communication
Banquier Pepere   communication   compte     montant
```

*(Dans le deck remanié, ce bloc est un tableau : une ligne d'en-têtes, une ligne par
banque, et une couleur par information, la même d'une banque à l'autre. Modifié le
14/10/2026, à la demande du professeur.)*

**Note**

Le cas est réduit à l'essentiel, et c'est volontaire : deux banques, trois colonnes, et
un ordre qui diffère. Le tableau le montre ligne par ligne : chaque banque livre un
compte, un montant et une communication, mais pas dans les mêmes cases. Les couleurs
suivent chaque information d'une banque à l'autre ; les en-têtes donnent l'indice de la
colonne, celui qu'on lit dans le tableau de chaînes, ligne[0], ligne[1] et ligne[2].

Toute la différence entre les deux visualiseurs tient donc dans versMouvement : l'un lit
le compte en ligne[0], l'autre en ligne[1]. Le reste est identique.

C'est exactement la situation où la duplication est tentante. Recopier le visualiseur
existant et déplacer trois indices prend cinq minutes et fonctionne. Puis le calcul du
total se révèle faux un jour, et il faut le corriger dans les deux : c'est la troisième
question de fin d'exercice.

La bonne réponse tient en trois méthodes de deux lignes, et rien d'autre.

### 6.5 · Pourquoi `protected`

**Slide**

- Une méthode que seule la classe mère appelle n'a pas à être `public`
- Le modificateur `protected` l'ouvre aux sous-classes, et la ferme au reste
- Une méthode abstraite `protected` reste redéfinissable par les sous-classes

**Note**

La question est posée en fin d'`ABS.3` : pourquoi la méthode qui convertit une ligne
est-elle `protected`, puisque c'est précisément une méthode qu'une autre classe doit
définir ?

Parce que « une autre classe » veut dire ici « une sous-classe », et rien de plus. Le
programme qui affiche les rapports n'a aucune raison de lire une ligne lui-même : il
appelle `rapport` et `total`. Tout ce qui sert à construire le résultat est un détail de
fabrication.

Ouvrir ces méthodes en `public` ne casserait rien aujourd'hui. Cela transformerait
simplement un détail interne en promesse faite au reste du programme, qu'il faudrait
ensuite tenir.

### 6.6 · La mesure de la réussite

**Slide**

- La nouvelle classe devrait faire une vingtaine de lignes, dont trois méthodes de deux lignes
- Si elle est plus longue, c'est que quelque chose a été recopié de la mère
- Et le programme ne contient ni `instanceof`, ni condition sur la banque

**Note**

L'énoncé donne le critère avant que vous ne commenciez, et ce n'est pas courant. Servez-
vous-en : c'est un moyen de vérifier votre travail sans attendre les tests.

Une classe trop longue est le signe qu'on a dupliqué ce qui existait déjà. Un programme
qui teste la banque est le signe qu'on n'a pas fait confiance au polymorphisme.

Le tableau du programme est déclaré `VisualiseurDeDonneesBancaires[]`, et la boucle
appelle `rapport` et `total` sans savoir quelle banque répond. C'est le même geste
qu'`ABS.2`, sur un cas qui ressemble au travail réel.

### 6.7 · Exercices

**Slide**

- **ABS.3** - Deux banques, un seul traitement

**Note**

L'exercice ne vous demande pas d'écrire un dispositif, mais d'en compléter un qui existe
déjà. C'est la situation la plus fréquente en entreprise, et elle demande une discipline
particulière : lire ce qui est fourni avant d'écrire, et n'ajouter que ce qui manque
réellement.

Le visualiseur de la première banque vous sert de modèle. Il montre la forme attendue,
et il est déjà couvert par les tests.

## Section 7 — Deux étages

### 7.1 · Deux étages

**Slide**

*(intercalaire)*

**Note**

Les trois exercices précédents n'avaient qu'un seul niveau d'abstraction. Cette section
en ajoute un second, et c'est la forme que prend la quatrième question de l'examen.

### 7.2 · Une classe abstraite peut en étendre une autre

**Slide**

- Rien n'interdit deux niveaux d'abstraction
- Chaque étage porte ce qui est commun en dessous
- Seules les feuilles de l'arbre sont concrètes

```
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

Une société facture au forfait ou à l'heure, et chaque façon connaît deux variantes.
Deux niveaux de regroupement apparaissent donc naturellement : ce qui est vrai de toute
prestation, et ce qui n'est vrai que des prestations horaires.

La hiérarchie suit ce découpage. `Prestation` porte le client, parce que toute
prestation en a un. `Horaire` porte le taux et le nombre d'heures, parce que les
prestations au forfait n'en ont pas. `Urgence` porte la majoration, parce qu'elle est
seule à en avoir une.

Quatre classes sont concrètes, trois ne le sont pas. Une classe est abstraite tant
qu'elle ne suffit pas à décrire une prestation réelle.

### 7.3 · Où placer chaque champ

**Slide**

- Un champ se déclare à l'étage où il devient commun
- Trop haut, il encombre qui n'en a pas l'usage
- Trop bas, il s'écrit deux fois

```java
public abstract class Horaire extends Prestation {

    private final double tauxHoraire;
    private final int heures;

    protected double base() {
        return heures * tauxHoraire;
    }
}
```

**Note**

C'est la même règle qu'à la section 4, appliquée à plusieurs étages. Le taux horaire
n'appartient pas à `Prestation`, puisqu'un abonnement n'en a pas. Il n'appartient pas
non plus à `Depannage` et à `Urgence` séparément, puisque les deux en ont un. Il
appartient à `Horaire`.

La méthode `base` suit le même raisonnement : le produit des heures par le taux est
commun aux deux sous-classes, donc il monte. `Urgence` s'en servira en y appliquant sa
majoration.

Sa visibilité est une des deux décisions que l'exercice vous laisse. C'est un détail de
calcul dont les sous-classes ont besoin, et personne d'autre — voir PKG.5.

### 7.4 · Implémenter sans définir

**Slide**

- Une classe abstraite peut implémenter une interface sans écrire ses méthodes
- La promesse est reportée sur les sous-classes concrètes
- La méthode `facture` appelle `montant`, qui n'existe encore nulle part

```java
public abstract class Prestation implements Facturable {

    public String facture() {
        return client + " : " + montant() + " EUR";
    }
}
```

**Note**

Les interfaces sont le sujet du module suivant. Il suffit ici d'en savoir ceci : une
interface énonce ce qu'une classe doit savoir faire, et `implements` s'engage à le
faire.

`Prestation` s'y engage sans tenir l'engagement, et c'est légal parce qu'elle est
abstraite : elle reporte l'obligation sur ses descendants, exactement comme une méthode
abstraite ordinaire. Ce sont les quatre classes concrètes qui écriront `montant`, chacune
à sa façon.

La méthode `facture`, elle, est écrite tout de suite, et appelle une méthode qui
n'existe dans aucune classe au moment où on l'écrit. C'est le mécanisme de la section 6,
poussé un cran plus loin.

### 7.5 · Exercices

**Slide**

- **ABS.4** - Une hiérarchie à deux niveaux
- À faire après le module ITF

**Note**

L'exercice réunit tout le module : deux étages d'abstraction, une interface à
implémenter, un champ à placer au bon niveau, un tableau du type le plus général et pas
un seul test de type.

Il demande l'interface `Facturable`, qui appartient au module suivant. Faites-le donc
après ITF — l'énoncé le rappelle.

Les deux décisions qu'il vous laisse sont les plus intéressantes : où implémenter
`montant`, et quelle visibilité donner aux accesseurs intermédiaires. Aucune des deux
n'est vérifiée par un test, et toutes deux se voient à la lecture.

## Section 8 — Décider soi-même

### 8.1 · Décider soi-même

**Slide**

*(intercalaire)*

**Note**

Le dernier exercice du thème ne fournit aucun squelette. C'est le seul du recueil, et
c'est la situation de l'examen.

### 8.2 · Quand il n'y a plus de squelette

**Slide**

- L'énoncé décrit ce que le programme doit faire, et s'arrête là
- Combien de classes, laquelle est abstraite, où va chaque méthode : à vous de savoir
- Les trois questions à se poser avant d'écrire une ligne
- Qu'est-ce que les classes ont en commun ?
- Ce qui est commun monte, et ne s'écrit qu'une fois
- Que sait faire la classe « en général » ?

**Note**

Les quatre exercices précédents donnaient les classes, les signatures et les types : il
restait à remplir les corps. Ici, vous partez d'un fichier vide, et les décisions de
conception sont l'exercice lui-même.

Trois questions suffisent à démarrer. Qu'est-ce que les sortes ont en commun ? Ce qui
est commun monte, et ne s'écrit qu'une fois. Que sait faire un envoi « en général » ?
S'il y a une chose qu'il ne sait pas faire alors que toutes ses sortes la savent, vous
tenez votre méthode abstraite. L'étiquette doit-elle être écrite trois fois ? Regardez
ce qui y change d'une sorte à l'autre, et relisez `ABS.1`.

La classe de test est fournie, mais en commentaire, parce qu'elle appelle des classes
qui n'existent pas encore. Décommentez-la quand vos classes seront écrites, d'un seul
coup, avec `Ctrl+/`.

### 8.3 · Exercices

**Slide**

- **ABS.5** - Tout écrire, à partir de rien
- **G.10** - La classe abstraite `Jeu`
- Attention à la borne : « jusqu'à 50 g » inclut les 50 g…

**Note**

`ABS.5` vous fait écrire un service postal à trois tarifs. Le piège n'est pas dans le
calcul mais dans la borne : « jusqu'à 50 g inclus » s'écrit avec un `<=`, et une erreur
d'un gramme ne se voit pas en essayant au hasard. Le test à la borne l'attrape tout de
suite.

La dernière question de l'exercice mérite qu'on s'y arrête : comparez le temps passé
sur `ABS.5` et sur `ABS.4`, et demandez-vous où est passée la différence — à écrire, ou
à décider.

Côté fil rouge, `G.10` introduit la classe abstraite `Jeu`, qui porte la partie en cours
et déclare une méthode `jouer` que chaque jeu définira. C'est le socle sur lequel les
jeux concrets viendront se poser.
