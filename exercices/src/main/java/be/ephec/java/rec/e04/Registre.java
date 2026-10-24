package be.ephec.java.rec.e04;

import java.util.List;
import java.util.Map;

/**
 * REC.4 — A COMPLETER.
 *
 * Le registre des inscrits. Il retrouve un etudiant par son matricule : le
 * bon rangement est donc une Map, du matricule vers l'etudiant.
 */
public class Registre {

    // TODO : la Map des etudiants, par matricule.

    /**
     * Inscrit l'etudiant.
     *
     * @throws IllegalArgumentException si ce matricule est deja inscrit —
     *                                  l'exception existe dans le JDK
     */
    public void inscrire(Etudiant etudiant) {
        throw new UnsupportedOperationException("inscrire n'est pas encore implementee");
    }

    public int taille() {
        throw new UnsupportedOperationException("taille n'est pas encore implementee");
    }

    /**
     * L'etudiant qui porte ce matricule.
     *
     * @throws EtudiantInconnuException si personne ne le porte
     */
    public Etudiant trouver(String matricule) throws EtudiantInconnuException {
        throw new UnsupportedOperationException("trouver n'est pas encore implementee");
    }

    /** Tous les inscrits, tries par nom puis prenom, avec ParNom. */
    public List<Etudiant> parNom() {
        throw new UnsupportedOperationException("parNom n'est pas encore implementee");
    }

    /**
     * Combien d'inscrits ont un nom qui commence par chaque lettre.
     * Seules les lettres presentes figurent dans le resultat :
     * {L=2, T=1} pour Lovelace, Liskov et Turing.
     */
    public Map<Character, Integer> parInitiale() {
        throw new UnsupportedOperationException("parInitiale n'est pas encore implementee");
    }
}
