# La banque de questions du cours

Les questions des tests Moodle, un fichier par module (23/10/2026).

    questions_POO.py    les questions du module POO, et leur export
    questions_POO.xml   le fichier a importer dans Moodle

Chaque question renvoie, en cas d'erreur, a la section du support qui la
traite (« Revoyez POO §6, « Primitifs et references » »).

## Modifier ou ajouter une question

1. Modifier la liste `Q` du script : l'enonce, les reponses (la bonne est
   designee par son rang), l'explication, la section du support et son titre.
2. Regenerer le fichier : `python3 _moodle/question_bank/questions_POO.py`.
3. Dans Moodle : banque de questions du cours, Import, format « Moodle XML ».
   Les questions arrivent dans la categorie « POO - Classes et objets ».

Une question deja importee n'est pas remplacee par un nouvel import : elle
est ajoutee une seconde fois. Pour corriger une question existante, la
modifier directement dans Moodle, puis reporter la correction dans le script.

## Le test du module

« Test du module POO », dans la section POO : 8 questions tirees au hasard
dans la categorie, une par page, correction immediate, reussi a 6 sur 8,
tentatives illimitees.
