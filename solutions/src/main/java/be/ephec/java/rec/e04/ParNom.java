package be.ephec.java.rec.e04;

import java.util.Comparator;

/**
 * REC.4 — Corrige.
 *
 * On ne compare le prenom que si les noms sont egaux : c'est le "puis"
 * de l'enonce. compareTo rend un negatif, zero ou un positif, et c'est
 * exactement ce que compare doit rendre : on le transmet tel quel.
 */
public class ParNom implements Comparator<Etudiant> {

    @Override
    public int compare(Etudiant a, Etudiant b) {
        int parNom = a.getNom().compareTo(b.getNom());
        if (parNom != 0) {
            return parNom;
        }
        return a.getPrenom().compareTo(b.getPrenom());
    }
}
