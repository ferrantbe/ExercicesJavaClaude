# Mettre ce projet sur GitHub

Le dépôt est **déjà initialisé** avec un premier commit : 872 fichiers,
environ 12 Mo. Il ne lui manque qu'un serveur distant.

## Les quatre commandes

Créez d'abord le dépôt sur GitHub - vide, sans README ni .gitignore,
sinon il faudra fusionner deux historiques sans rapport.

```
git remote add origin https://github.com/VOTRE-COMPTE/ExercicesJavaClaude.git
git branch -M main
git push -u origin main
```

Et pour connaître l'URL plus tard :

```
git remote -v
```

## Public ou privé : la question qui décide du reste

**Un dépôt public**, je peux le cloner. Une conversation neuve commence
alors par une commande, sans aucun envoi de votre part.

**Un dépôt privé**, je ne peux pas. Le clone y demande un jeton
d'authentification, et je n'ai pas le droit d'en manipuler un.

Le dépôt contient les **corrigés** des soixante et onze exercices. En public,
un étudiant qui cherche bien les trouve. Trois issues :

- tout en public, en acceptant que les corrigés soient trouvables ;
- un dépôt public pour les énoncés et les outils, un privé pour les
  corrigés - au prix de deux dépôts à tenir ;
- tout en privé, et vous continuez à m'envoyer l'archive.

## Ce que je ne peux pas faire, dans tous les cas

**Pousser.** Un `push` demande des identifiants. Le fonctionnement reste
donc à sens unique : vous publiez, je clone, je vous rends un zip ou un
patch que vous appliquez.

## Ce qui n'est pas suivi, et pourquoi

Le `.gitignore` écarte deux catégories.

**Ce qui se refabrique** : `target/`, `livraisons/`, `_dossiers/`, les
caches Python, les restes de Word - dont un `~$...docx` qui a déjà fait
échouer un outil.

**Les decks sources et le gabarit**, dans `_slides/`. Douze fichiers,
environ 70 Mo, qui ne changeront plus. Les suivre alourdirait chaque
clone sans rien apporter. Si vous préférez tout avoir d'un seul coup,
retirez les trois dernières lignes du `.gitignore` - c'est défendable
aussi, et ça supprimerait la pièce jointe à chaque conversation « slides ».

**Les réglages d'IntelliJ** (`.idea/`, `*.iml`) contiennent des chemins
propres à votre machine.

Les `.docx` produits, eux, **sont suivis** : ce sont des livrables, et
leur poids reste raisonnable - sauf `Guide_IntelliJ.docx`, 4,1 Mo à lui
seul à cause de ses captures.

## Deux dépôts ont été retirés avant ce commit

Un dépôt **vide** à la racine, créé par IntelliJ : initialisé, aucun
commit.

Un dépôt de 24 commits dans `_demos/depot_gamehub/` - une copie du fil
rouge datant d'août, arrêtée avant la renumérotation de septembre. Un
dépôt imbriqué dans un autre n'est pas suivi par Git : il n'en reste
qu'un pointeur vers un commit introuvable ailleurs. Le dépôt GameHub à
jour vit dans son propre projet, `GameHubClaude/depot/`.
