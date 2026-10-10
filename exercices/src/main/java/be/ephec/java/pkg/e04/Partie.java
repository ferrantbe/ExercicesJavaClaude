package be.ephec.java.pkg.e04;

import java.util.ArrayList;
import java.util.List;

/** PKG.4 — TODO : doit demenager vers be.ephec.java.pkg.e04.modele */
public class Partie {

    private final List<Joueur> joueurs = new ArrayList<>();

    public void ajouter(Joueur joueur) {
        joueurs.add(joueur);
    }

    public int nombreDeJoueurs() {
        return joueurs.size();
    }
}
