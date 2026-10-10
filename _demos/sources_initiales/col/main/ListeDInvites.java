package be.ephec.java.travail;

import java.util.ArrayList;
import java.util.List;

/**
 * DEPART COL — une liste, parce que c'est ce qu'on ecrit sans reflechir.
 *
 * Elle accepte les doublons, et ne trie rien.
 */
public class ListeDInvites {

    private final List<String> invites = new ArrayList<>();

    public void inviter(String nom) {
        invites.add(nom);
    }

    public int nombre() {
        return invites.size();
    }

    public List<String> tous() {
        return invites;
    }
}
