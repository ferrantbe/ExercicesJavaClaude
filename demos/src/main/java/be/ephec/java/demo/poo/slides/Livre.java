package be.ephec.java.demo.poo.slides;

import java.time.LocalDate;

/**
 * Le livre des slides POO, dans sa version finale : champs prives, constructeur,
 * accesseurs, validation et toString. Chaque partie reprend une slide, indiquee
 * en commentaire.
 */
public class Livre {

    // Slide « Le constructeur »
    private String titre;
    private int anneeDeParution;

    public Livre(String titre, int anneeDeParution) {
        this.titre = titre;
        this.anneeDeParution = anneeDeParution;
    }

    // Slide « Fermer les champs, ouvrir des accesseurs »
    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public int getAnneeDeParution() {
        return anneeDeParution;
    }

    // Slide « Ce que le detour permet »
    public void setAnneeDeParution(int annee) {
        if (annee < 0) {
            throw new IllegalArgumentException("Annee invalide : " + annee);
        }
        this.anneeDeParution = annee;
    }

    // Slide « La donnee qui n'existe pas »
    public int getAge() {
        return LocalDate.now().getYear() - anneeDeParution;
    }

    // Slide « La methode toString »
    @Override
    public String toString() {
        return titre + " (" + anneeDeParution + ")";
    }
}
