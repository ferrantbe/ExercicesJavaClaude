package be.ephec.java.demo.col;

import java.util.Collections;
import java.util.Set;
import java.util.TreeSet;

/**
 * DEMO COL — etat final.
 *
 * Deux lignes ont change depuis le depart, et deux problemes ont disparu.
 *
 *   List -> Set       les doublons deviennent impossibles. Ce n'est plus
 *                     une regle que l'appelant doit respecter, c'est une
 *                     propriete de la structure.
 *
 *   HashSet -> TreeSet  l'ordre alphabetique est permanent. On ne trie
 *                     jamais : il n'y a aucun instant ou la liste ne soit
 *                     pas triee.
 *
 * La lecon n'est pas la syntaxe, c'est la methode : on choisit une
 * collection sur la PROMESSE qu'elle tient, et on laisse la structure
 * porter la regle plutot que la vigilance de celui qui l'utilise.
 */
public class ListeDInvites {

    private final Set<String> invites = new TreeSet<>();

    public void inviter(String nom) {
        invites.add(nom);
    }

    public int nombre() {
        return invites.size();
    }

    /**
     * Rendu non modifiable : sans cela, n'importe qui pourrait vider la
     * liste sans passer par inviter(). Voir CC-OBJ.2.
     */
    public Set<String> tous() {
        return Collections.unmodifiableSet(invites);
    }
}
