package be.ephec.java.col.e02;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * COL.2 — CORRIGE.
 *
 * Reponse a la question de l'enonce : oui, on peut obtenir les fiches dans
 * l'ordre des noms, et de deux facons.
 *
 *   Garder une HashMap et trier les cles a la demande, comme ci-dessous.
 *   L'ordre est alors recalcule a chaque appel.
 *
 *   Remplacer la HashMap par une TreeMap. Les cles sont alors triees en
 *   permanence, et nomsDansLOrdre se reduit a  new ArrayList<>(fiches.keySet()).
 *   Essayez : une seule ligne change, et le test passe toujours.
 *
 * Le choix depend de l'usage. Si l'ordre est demande souvent, la TreeMap est
 * plus simple et evite de trier a chaque fois ; si l'ordre n'est qu'un besoin
 * occasionnel d'affichage, la HashMap est plus rapide en insertion.
 */
public class Annuaire {

    private final Map<String, Fiche> fiches = new HashMap<>();

    public void ajouter(Fiche fiche) {
        // put remplace la valeur si la cle existe deja : c'est exactement le
        // comportement demande, aucun test n'est necessaire.
        fiches.put(fiche.nom(), fiche);
    }

    public Fiche chercher(String nom) {
        return fiches.get(nom);
    }

    public int taille() {
        return fiches.size();
    }

    public List<String> nomsDansLOrdre() {
        List<String> noms = new ArrayList<>(fiches.keySet());
        java.util.Collections.sort(noms);
        return noms;
    }
}
