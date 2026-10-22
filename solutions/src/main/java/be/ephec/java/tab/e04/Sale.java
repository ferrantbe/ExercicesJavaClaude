package be.ephec.java.tab.e04;

/**
 * TAB.4 — CORRIGE.
 *
 * Le prix reel n'est PAS un champ. Il se deduit du prix catalogue et de la
 * reduction, donc le stocker creerait une donnee redondante qui pourrait se
 * desynchroniser — exactement le probleme du champ age en POO.3.
 */
public class Sale {

    private final Car voiture;
    private final double prixCatalogue;
    private final double reduction;

    public Sale(Car voiture, double prixCatalogue, double reduction) {
        this.voiture = voiture;
        this.prixCatalogue = prixCatalogue;
        this.reduction = reduction;
    }

    public double prixReel() {
        return prixCatalogue * (1 - reduction);
    }

    public Car getVoiture() {
        return voiture;
    }

    public double getPrixCatalogue() {
        return prixCatalogue;
    }

    /**
     * La vente ne connait pas le detail de la voiture : elle le lui demande.
     * Notez qu'on interroge la voiture par ses accesseurs plutot que d'aller
     * chercher ses champs — voir la regle CC-OBJ.1 du memento Clean Code.
     */
    public String enTexte() {
        return String.format("%s %s [%s] : %s -> %s",
                voiture.getMarque(), voiture.getModele(), voiture.getNumeroDeSerie(),
                prixCatalogue, prixReel());
    }
}
