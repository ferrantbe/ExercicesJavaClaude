package be.ephec.java.pkg.e04.modele;

import java.util.ArrayList;
import java.util.List;

/** PKG.4 — CORRIGE. */
public class Partie {

    private final List<Joueur> joueurs = new ArrayList<>();

    public void ajouter(Joueur joueur) {
        joueurs.add(joueur);
    }

    public int nombreDeJoueurs() {
        return joueurs.size();
    }
}
