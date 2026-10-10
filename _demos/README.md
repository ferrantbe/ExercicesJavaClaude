# Les démonstrations du cours

Ce dossier ne part jamais chez les étudiants.

| Ici | Ce que c'est |
|---|---|
| `materiel_dorigine/` | les classes de démonstration des années précédentes, citées dans les slides, et le projet JavaFX |
| `Demo_POO.docx` et les autres | le **scénario** : étapes, durées, ce qui se dit, ce qu'on rate exprès |
| `sources_initiales/` | l'état de **départ**, rangé en `main/` et `test/` |

Le **code final** vit ailleurs, dans le module `demos/`, et il est publié avec
les corrigés après la séance — sources principales **et** classes de test. La
démonstration `JUN` construit une classe de test en direct : la livrer sans
elle n'aurait aucun sens.

## Avant une séance

    python3 _outils/preparer_demo.py poo

Le script vide le module `_travail/` — le bac à sable — et y recopie l'état de
départ. Vous ouvrez le scénario à côté, et vous tapez.

Sans argument, il liste ce qui existe. Avec `--vider`, il remet le bac à sable
à neuf.

## Pourquoi trois endroits différents

| Dossier | Contenu | Compilé | Distribué |
|---|---|---|---|
| `_demos/` | scénarios et sources initiales | non | non |
| `_travail/` | le bac à sable, jetable | oui | non |
| `demos/` | l'état final, la référence | oui | avec les solutions |

La séparation a une raison pratique. Du code à moitié tapé pendant le cours ne
doit pas empêcher `demos/` de compiler, puisque `demos/` est ce que les
étudiants recevront. Et rien de ce qui traîne dans le bac à sable ne peut
partir par accident.

Les sources initiales, elles, vivent hors de tout module : celle d'`exc` plante
volontairement, et il serait fâcheux qu'elle casse quoi que ce soit.

## Ce qui existe

| Module | Durée | Quand la jouer | Objectif |
|---|---|---|---|
| `POO` | 12 à 15 min | avant `POO.1` | `A.1` |
| `STA` | 10 min | avant `STA.1` | `A.1` |
| `GEN` | 12 min | avant `GEN.1` | `A.1` |
| `ENU` | 10 min | avant `ENU.1` | `A.1` |
| `TMP` | 12 min | avant `TMP.1` | `A.3` |
| `COL` | 12 min | avant `COL.1` | `A.3` |
| `ABS` | 12 min | avant `ABS.1` | `A.4` |
| `ITF` | 12 min | avant `ITF.1` | `C.1` |
| `LAM` | 12 min | avant `LAM.1` | `A.6` |
| `FX` | 15 min | avant `FX.1` | `A.5` |
| `EXC` | 10 à 12 min | avant `EXC.1` | `B.3` |
| `JUN` | 15 min | avant `JUN.1` | `B.1`, `B.2` |

**Aucune démonstration ne reprend le domaine d'un exercice.** Montrer d'avance
le piège que l'énoncé fait chercher volerait la découverte : `GEN` emploie donc
une pile là où `GEN.1` écrit une paire, `ENU` un lecteur de musique là où
`ENU.1` prend un feu de signalisation, `ABS` des notifications là où `ABS.1`
prend des formes, `COL` une liste d'invités et `TMP` la durée d'un cours.

**Les trois dernières sont bâties sur vos propres classes**, reprises de
`materiel_dorigine/` : le patron Observateur en deux étapes pour `ITF`, les
classes anonymes pour `LAM`, et `_00clickMe` plus `_05eventPropagation` pour
`FX`. Les autres emploient des domaines inventés, pour ne pas déflorer les
exercices.

Trois modules n'en ont pas encore : `PKG`, `TAB` et `FIC`. La colonne « Démo de
code » de `_objectifs/Objectifs_et_couverture.xlsx` en tient le compte.

## Après la démonstration

Rien à faire. L'état d'arrivée est déjà dans `demos/`, écrit et relu ; le bac à
sable sera écrasé à la démonstration suivante.
