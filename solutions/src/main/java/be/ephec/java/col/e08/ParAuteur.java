package be.ephec.java.col.e08;

import java.util.Comparator;

/**
 * COL.8 — Par auteur, puis par titre pour les livres d'un meme auteur.
 *
 * Le second critere n'est pas un detail : un TreeSet range ses elements avec
 * ce comparateur, et considere comme doublons deux livres pour lesquels il
 * retourne 0. Sans le titre, il ne garderait qu'un livre par auteur.
 */
public class ParAuteur implements Comparator<Livre> {

    @Override
    public int compare(Livre premier, Livre second) {
        int parAuteur = premier.auteur().compareTo(second.auteur());
        if (parAuteur != 0) {
            return parAuteur;
        }
        return premier.titre().compareTo(second.titre());
    }
}
