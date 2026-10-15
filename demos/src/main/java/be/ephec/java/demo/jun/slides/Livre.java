package be.ephec.java.demo.jun.slides;

import java.time.LocalDate;

/**
 * Slide « Ni le jour, ni le hasard » (JUN, section 5).
 *
 * Le livre du module POO, dont getAge lisait la date du jour. Le calcul recoit
 * maintenant l'annee en parametre, et devient testable ; la version sans
 * parametre reste, pour l'usage courant.
 */
public class Livre {

    private final String titre;
    private final int anneeDeParution;

    public Livre(String titre, int anneeDeParution) {
        this.titre = titre;
        this.anneeDeParution = anneeDeParution;
    }

    public int getAge(int anneeCourante) {          // testable
        return anneeCourante - anneeDeParution;
    }

    public int getAge() {                           // pratique
        return getAge(LocalDate.now().getYear());
    }

    public String getTitre() {
        return titre;
    }
}
