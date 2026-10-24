package be.ephec.java.rec.e04;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REC.4 — Corrige.
 *
 * A remarquer : containsKey avant put pour refuser le doublon, et
 * getOrDefault pour compter par initiale sans tester si la lettre est deja
 * la. Le tri se fait sur une COPIE de la liste des valeurs : les valeurs
 * d'une Map ne se trient pas en place.
 */
public class Registre {

    private final Map<String, Etudiant> inscrits = new HashMap<>();

    public void inscrire(Etudiant etudiant) {
        String matricule = etudiant.getMatricule();
        if (inscrits.containsKey(matricule)) {
            throw new IllegalArgumentException("Deja inscrit : " + matricule);
        }
        inscrits.put(matricule, etudiant);
    }

    public int taille() {
        return inscrits.size();
    }

    public Etudiant trouver(String matricule) throws EtudiantInconnuException {
        Etudiant etudiant = inscrits.get(matricule);
        if (etudiant == null) {
            throw new EtudiantInconnuException(matricule);
        }
        return etudiant;
    }

    public List<Etudiant> parNom() {
        List<Etudiant> tries = new ArrayList<>(inscrits.values());
        tries.sort(new ParNom());
        return tries;
    }

    public Map<Character, Integer> parInitiale() {
        Map<Character, Integer> comptes = new HashMap<>();
        for (Etudiant etudiant : inscrits.values()) {
            char initiale = etudiant.getNom().charAt(0);
            comptes.put(initiale, comptes.getOrDefault(initiale, 0) + 1);
        }
        return comptes;
    }
}
