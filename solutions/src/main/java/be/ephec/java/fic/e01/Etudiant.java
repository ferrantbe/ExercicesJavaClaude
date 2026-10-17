package be.ephec.java.fic.e01;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * FIC.1 — CORRIGE.
 *
 * Deux points meritent l'attention.
 *
 * getCours rend une vue NON MODIFIABLE de la liste. Retourner la liste elle-meme
 * laisserait n'importe qui la vider sans passer par desinscrire, et
 * l'encapsulation ne servirait plus a rien. Voir CC-OBJ.2.
 *
 * inscrire verifie que le cours n'y est pas deja. On aurait pu utiliser un
 * Set, mais l'enonce demande de conserver l'ordre d'inscription, ce qu'un Set
 * ordinaire ne garantit pas.
 */
public class Etudiant {

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
