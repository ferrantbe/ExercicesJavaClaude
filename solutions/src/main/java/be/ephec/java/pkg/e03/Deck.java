package be.ephec.java.pkg.e03;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * PKG.3 — CORRIGE.
 *
 * Le Programme n'utilise que trois operations : preparer, piocher et
 * cartesRestantes. Tout le reste est un detail d'implementation, et le
 * rendre public revenait a promettre de ne jamais le changer.
 */
public class Deck {

    // private : personne d'autre ne doit pouvoir vider ni remplacer la liste.
    private final List<String> cartes = new ArrayList<>();
    private int distribuees = 0;

    // private : etapes internes de preparer(), sans interet a l'exterieur.
    private void remplir() {
        for (String couleur : new String[]{"Coeur", "Pique", "Carreau", "Trefle"}) {
            for (int valeur = 1; valeur <= 13; valeur++) {
                cartes.add(valeur + " de " + couleur);
            }
        }
    }

    private void melanger() {
        Collections.shuffle(cartes);
    }

    public void preparer() {
        remplir();
        melanger();
        distribuees = 0;
    }

    public String piocher() {
        distribuees++;
        return cartes.remove(0);
    }

    public int cartesRestantes() {
        return cartes.size();
    }

    /**
     * Visibilite par defaut plutot que private : la classe de test vit dans
     * le meme package et peut donc l'appeler, sans que le reste du programme
     * y ait acces. C'est un usage courant et legitime du niveau par defaut.
     */
    void verifierIntegrite() {
        if (cartes.size() + distribuees != 52) {
            throw new IllegalStateException("Le paquet a ete altere");
        }
    }
}
