package be.ephec.java.fic.e03;

import java.io.Serializable;

/** FIC.3 — Cette classe vous est FOURNIE, complete. */
public class Cours implements Serializable {

    private final String intitule;
    private Enseignant chargeDeCours;

    public Cours(String intitule, Enseignant chargeDeCours) {
        this.intitule = intitule;
        this.chargeDeCours = chargeDeCours;
    }

    public String getIntitule() {
        return intitule;
    }

    public Enseignant getChargeDeCours() {
        return chargeDeCours;
    }

    public void setChargeDeCours(Enseignant chargeDeCours) {
        this.chargeDeCours = chargeDeCours;
    }

    @Override
    public String toString() {
        return intitule + " (" + chargeDeCours + ")";
    }
}
