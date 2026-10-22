package be.ephec.java.fic.e03;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * FIC.3 — Cette classe vous est FOURNIE, complete.
 *
 * Notez que la serialisation d'un Etudiant entraine celle de ses Cours, et
 * donc celle de leurs Enseignants. Tout le graphe d'objets accessibles part
 * dans le fichier — c'est pourquoi les trois classes doivent etre
 * Serializable, et pas seulement celle qu'on enregistre.
 */
public class Etudiant implements Serializable {

    private final String nom;
    private final String prenom;
    private final List<Cours> cours = new ArrayList<>();

    public Etudiant(String nom, String prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void inscrire(Cours unCours) {
        if (!cours.contains(unCours)) {
            cours.add(unCours);
        }
    }

    public void desinscrire(Cours unCours) {
        cours.remove(unCours);
    }

    public List<Cours> getCours() {
        return Collections.unmodifiableList(cours);
    }

    public int nombreDeCours() {
        return cours.size();
    }

    @Override
    public String toString() {
        StringBuilder texte = new StringBuilder(nom + " " + prenom);
        if (!cours.isEmpty()) {
            texte.append(" : ");
            for (int i = 0; i < cours.size(); i++) {
                if (i > 0) {
                    texte.append(", ");
                }
                texte.append(cours.get(i).getIntitule());
            }
        }
        return texte.toString();
    }
}
