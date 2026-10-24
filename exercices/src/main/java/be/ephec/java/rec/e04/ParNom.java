package be.ephec.java.rec.e04;

import java.util.Comparator;

/**
 * REC.4 — A COMPLETER.
 *
 * L'ordre alphabetique des etudiants : par nom, puis par prenom quand deux
 * noms sont egaux. Les String savent se comparer entre elles : cherchez
 * la methode qui le fait. Voir COL.8 pour un comparateur du meme genre.
 */
public class ParNom implements Comparator<Etudiant> {

    @Override
    public int compare(Etudiant a, Etudiant b) {
        throw new UnsupportedOperationException("compare n'est pas encore implementee");
    }
}
