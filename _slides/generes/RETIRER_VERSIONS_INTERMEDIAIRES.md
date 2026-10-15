# Alléger l'historique des decks

Git conserve **chaque version de chaque fichier, pour toujours**. Un deck
pèse de deux à six mégaoctets ; régénérer les seize en ajoute une quarantaine
que rien n'effacera jamais.

Ce document explique comment retirer les versions intermédiaires tout en
gardant la courante. **Lisez-le en entier avant de commencer** : l'opération
réécrit l'historique, et ce n'est pas anodin.

---

## Quand le faire — le seuil

**Déclenchez quand `.git` dépasse 500 Mo.**

```
cd ExercicesJavaClaude
du -sh .git
```

Pourquoi 500 Mo ? GitHub recommande de rester **sous 1 Go**, et
« fortement » sous 5 Go. Au-delà, le support peut vous écrire pour demander
une action corrective. Agir à la moitié du seuil recommandé laisse de la
marge : l'opération ne se fait pas dans l'urgence, et le dépôt reste
confortable à cloner entre-temps.

Repère : au 11/10/2026, `.git` pesait **158 Mo**, et une régénération
complète des seize decks en ajoute environ **39 Mo**. Il reste donc de la
place pour une petite dizaine de régénérations complètes.

**Un second signal, plus parlant que les mégaoctets** : le temps de clone.
S'il dépasse deux ou trois minutes sur une bonne connexion, c'est le moment,
quel que soit le chiffre.

---

## Avant d'en arriver là — l'hygiène qui coûte le moins

Ne poussez pas chaque retouche. Un deck corrigé trois fois dans la soirée
peut n'être poussé qu'une fois, le soir venu.

Les versions qui méritent d'entrer dans l'historique sont celles qui
**comptent** : l'état de début d'année, celui d'après une séance donnée,
celui d'après la session d'examen. Pas les vingt états intermédiaires d'une
relecture.

Cette seule discipline repousse le seuil de plusieurs années.

---

## La procédure

### Ce qu'elle fait, et ce qu'elle coûte

Elle retire `_slides/generes/` de **tout** l'historique, puis y replace les
decks courants dans un commit neuf.

**Elle réécrit l'historique.** Les identifiants de tous les commits changent.
Conséquences :

- il faudra un `push --force` ;
- tout clone existant devient incompatible et doit être refait ;
- les liens vers un commit précis, s'il en existe, cesseront de fonctionner.

Avec un dépôt et un seul utilisateur, c'est tenable. À plusieurs, cela se
négocie avant.

### 0. L'outil

```
brew install git-filter-repo
```

### 1. Une sauvegarde complète, d'abord

```
cd ..
git clone --mirror https://github.com/ferrantbe/ExercicesJavaClaude.git sauvegarde-$(date +%Y%m%d).git
```

Cette copie contient tout l'historique. Si l'opération tourne mal, elle
permet de tout restaurer. **Ne sautez pas cette étape.**

### 2. Mettre les decks courants de côté

```
cd ExercicesJavaClaude
git status --short          # doit être vide : commitez d'abord
cp -R _slides/generes ~/decks_courants
ls ~/decks_courants         # tous les .pptx du dossier et les deux .md
```

### 3. Retirer le dossier de tout l'historique

```
git filter-repo --path _slides/generes/ --invert-paths --force
du -sh .git                 # la chute doit être nette
```

### 4. Remettre les decks courants

**Ne sautez pas cette étape** : sans elle, le dossier disparaît aussi de la
version courante (c'est arrivé le 15/10/2026, et il a fallu le restaurer).

```
mkdir -p _slides
cp -R ~/decks_courants/. _slides/generes/
git add _slides/generes
git commit -m "Les decks, version courante — historique des versions allégé"
```

### 5. Republier

`git filter-repo` retire le lien vers GitHub, par précaution. Il faut le
remettre :

```
git remote add origin https://github.com/ferrantbe/ExercicesJavaClaude.git
git push --force origin main
```

### 6. Vérifier, depuis un clone neuf

```
cd /tmp
git clone https://github.com/ferrantbe/ExercicesJavaClaude.git controle
cd controle
ls _slides/generes/*.pptx | wc -l     # autant qu'au point 2
du -sh .git
git log --oneline | head -3
```

Si les decks sont là et que `.git` a maigri, c'est réussi. Vous pouvez
alors supprimer `~/decks_courants`, mais **gardez la sauvegarde du point 1
quelques semaines**.

---

## Ce que cette procédure ne fait pas

Elle ne touche ni aux **decks sources** de `_slides/sources/` — 65 Mo qui ne
changent jamais, donc une seule version dans l'historique — ni aux documents,
ni au code. Seules les versions successives des decks produits disparaissent.

Si un jour le poids vient d'ailleurs, repérez-le avant d'agir :

```
git count-objects -vH
```

---

## L'alternative, si vous ne voulez pas réécrire l'historique

Publier les decks en **release GitHub** plutôt que dans le dépôt. Une
release stocke des fichiers attachés à une version, sans peser sur
l'historique ni sur les clones.

C'est plus propre à long terme, mais cela sépare les decks du reste du
matériel — exactement ce que vous vouliez éviter en choisissant de tout
garder ensemble. À reconsidérer seulement si la réécriture devient une
corvée récurrente.

---

## Le nettoyage du 15/10/2026, et ce qu'il a appris

Le dépôt pesait 689 Mo. La procédure ci-dessus n'en a retiré que 35 : le poids
venait surtout des **decks remaniés** (81 versions pour 12 decks, 355 Mo) et
des **illustrations en PNG** (184 Mo, même sans historique). Le second passage
a ramené le dépôt à **255 Mo** :

```
# les illustrations en JPEG (qualite 90), les PNG supprimes
cd _illustrations/illus_generees
for f in *.png; do sips -s format jpeg -s formatOptions 90 "$f" --out "${f%.png}.jpg" >/dev/null; done
rm *.png
cd ../..
git add -A && git commit -m "Illustrations en JPEG"

# les decks remanies courants mis de cote, puis l'historique reecrit
cp -R _slides/remanies ~/remanies_courants
git filter-repo --path _slides/remanies --path-glob '_illustrations/illus_generees/*.png' --invert-paths --force
mkdir -p _slides/remanies
cp -R ~/remanies_courants/. _slides/remanies/
git add -A && git commit -m "Decks remaniés : version courante seule"
git remote add origin https://github.com/ferrantbe/ExercicesJavaClaude.git
git push --force -u origin main
```

Trois pièges rencontrés :

- **`git filter-repo` retire le lien vers GitHub** : `git push` répond alors
  « No configured push destination ». C'est normal : `git remote add origin`,
  puis `git push --force -u origin main`.
- **`cp -R dossier destination` copie le dossier À L'INTÉRIEUR de la
  destination si elle existe déjà** (on obtient `remanies/remanies_courants/`).
  Toujours écrire `cp -R source/. destination/`, avec le point.
- **Ne pas oublier l'étape 4** : un dossier retiré de l'historique disparaît
  aussi de la version courante tant qu'on ne l'a pas remis.

Depuis ce nettoyage, `_slides/generes/` ne garde que les decks **pas encore
remaniés** : les autres se régénèrent à tout moment avec le moteur, et leur
version remaniée est dans `_slides/remanies/`.
