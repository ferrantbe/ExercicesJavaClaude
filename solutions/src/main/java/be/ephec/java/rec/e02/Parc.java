package be.ephec.java.rec.e02;

import java.util.ArrayList;
import java.util.List;

/**
 * REC.2 — Corrige.
 *
 * A remarquer : pas un seul instanceof. Le parc demande sa taxe a chaque
 * vehicule, et chacun repond selon sa sorte (CC-CLS.4). Ajouter une
 * cinquieme sorte de vehicule ne demande pas de toucher au parc.
 */
public class Parc {

    private final List<Vehicule> vehicules = new ArrayList<>();

    public void ajouter(Vehicule vehicule) {
        vehicules.add(vehicule);
    }

    public int taille() {
        return vehicules.size();
    }

    public double taxeTotale() {
        double total = 0;
        for (Vehicule vehicule : vehicules) {
            total += vehicule.taxeAnnuelle();
        }
        return total;
    }

    public List<String> descriptions() {
        List<String> resultat = new ArrayList<>();
        for (Vehicule vehicule : vehicules) {
            resultat.add(vehicule.description());
        }
        return resultat;
    }

    public int compter(Energie energie) {
        int compte = 0;
        for (Vehicule vehicule : vehicules) {
            if (vehicule.getEnergie() == energie) {
                compte++;
            }
        }
        return compte;
    }

    /**
     * Le strict inferieur (<) garantit qu'a annee egale, c'est le premier
     * ajoute qui reste : le suivant n'est pas "plus ancien".
     */
    public Vehicule doyen() {
        if (vehicules.isEmpty()) {
            throw new IllegalStateException("Le parc est vide : pas de doyen");
        }
        Vehicule doyen = vehicules.get(0);
        for (Vehicule vehicule : vehicules) {
            if (vehicule.getAnnee() < doyen.getAnnee()) {
                doyen = vehicule;
            }
        }
        return doyen;
    }
}
