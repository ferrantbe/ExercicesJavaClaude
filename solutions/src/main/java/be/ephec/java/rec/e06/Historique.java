package be.ephec.java.rec.e06;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * REC.6 — Corrige.
 *
 * A remarquer : tout() ne rend pas la liste interne, ni une copie. Une
 * copie serait sure, mais elle ne refleterait plus les ajouts suivants ;
 * la vue non modifiable, elle, suit l'historique et refuse d'etre
 * changee. Pour occurrences(), equals plutot que == : deux Integer de
 * meme valeur ne sont pas forcement le meme objet.
 */
public class Historique<T> {

    private final List<T> enregistrements = new ArrayList<>();

    public void enregistrer(T element) {
        enregistrements.add(element);
    }

    public T dernier() {
        if (enregistrements.isEmpty()) {
            throw new IllegalStateException("L'historique est vide");
        }
        return enregistrements.get(enregistrements.size() - 1);
    }

    public List<T> tout() {
        return Collections.unmodifiableList(enregistrements);
    }

    public int taille() {
        return enregistrements.size();
    }

    public boolean estVide() {
        return enregistrements.isEmpty();
    }

    public int occurrences(T element) {
        int compte = 0;
        for (T enregistre : enregistrements) {
            if (enregistre.equals(element)) {
                compte++;
            }
        }
        return compte;
    }
}
