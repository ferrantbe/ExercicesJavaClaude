package be.ephec.java.tab.e04;

/**
 * TAB.4 — CORRIGE.
 *
 * Les trois champs sont final : une voiture ne change ni de marque, ni de
 * modele, ni de numero de serie. Le mot final le dit au compilateur, qui
 * refusera toute tentative de modification.
 */
public class Car {

    private final String marque;
    private final String modele;
    private final String numeroDeSerie;

    public Car(String marque, String modele, String numeroDeSerie) {
        this.marque = marque;
        this.modele = modele;
        this.numeroDeSerie = numeroDeSerie;
    }

    public String getMarque() {
        return marque;
    }

    public String getModele() {
        return modele;
    }

    public String getNumeroDeSerie() {
        return numeroDeSerie;
    }
}
