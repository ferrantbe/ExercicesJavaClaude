package be.ephec.java.col.e07;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

/**
 * COL.7 — CORRIGE.
 *
 * Une Map dont les valeurs sont des collections. Deux choix meritent d'etre
 * expliques.
 *
 *   Les cours sont dans un TreeSet plutot qu'une List : un Set garantit
 *   qu'un etudiant ne s'inscrit pas deux fois au meme cours, et l'arbre les
 *   garde tries. La structure porte la regle, plutot que de compter sur la
 *   vigilance de l'appelant.
 *
 *   coursDe retourne un ensemble VIDE pour un etudiant inconnu, jamais null.
 *   L'appelant peut donc boucler dessus sans rien verifier. Voir CC-ERR.2 du
 *   memento Clean Code.
 */
public class Inscriptions {

    private final Map<String, Set<String>> parEtudiant = new HashMap<>();

    /**
     * computeIfAbsent remplace « si l'etudiant n'est pas encore la, lui creer
     * un ensemble vide, puis y ajouter le cours ». Il retourne l'ensemble
     * existant, ou celui qu'il vient de creer.
     */
    public void inscrire(String etudiant, String cours) {
        parEtudiant.computeIfAbsent(etudiant, nom -> new TreeSet<>()).add(cours);
    }

    public Set<String> coursDe(String etudiant) {
        return parEtudiant.getOrDefault(etudiant, new TreeSet<>());
    }

    public List<String> etudiants() {
        List<String> noms = new ArrayList<>(parEtudiant.keySet());
        Collections.sort(noms);
        return noms;
    }

    public String rapport() {
        StringBuilder texte = new StringBuilder();

        for (String etudiant : etudiants()) {
            if (texte.length() > 0) {
                texte.append('\n');
            }
            texte.append(etudiant).append(" : ")
                 .append(String.join(", ", coursDe(etudiant)));
        }
        return texte.toString();
    }
}
