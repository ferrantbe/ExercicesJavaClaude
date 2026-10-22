package be.ephec.java.pkg.e03;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * PKG.3 — A COMPLETER.
 *
 * Cette classe fonctionne, mais tout y est public : n'importe qui peut vider
 * le paquet, remplacer la liste, ou appeler des methodes internes dans le
 * mauvais ordre.
 *
 * TODO : reduisez la surface publique au strict necessaire.
 *        Le Programme fourni doit continuer a compiler sans etre modifie ;
 *        tout ce dont il ne se sert pas doit cesser d'etre public.
 *        Choisissez private ou la visibilite par defaut selon le cas.
 */
public class Deck {

    public List<String> cartes = new ArrayList<>();
    public int distribuees = 0;

    public void remplir() {
        for (String couleur : new String[]{"Coeur", "Pique", "Carreau", "Trefle"}) {
            for (int valeur = 1; valeur <= 13; valeur++) {
                cartes.add(valeur + " de " + couleur);
            }
        }
    }

    public void melanger() {
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

    public void verifierIntegrite() {
        if (cartes.size() + distribuees != 52) {
            throw new IllegalStateException("Le paquet a ete altere");
        }
    }
}
