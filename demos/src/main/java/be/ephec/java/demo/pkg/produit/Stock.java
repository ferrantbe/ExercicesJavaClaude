package be.ephec.java.demo.pkg.produit;

import java.util.ArrayList;
import java.util.List;

/**
 * DEMO PKG — etat d'ARRIVEE.
 *
 * Elle est dans le MEME package que Boisson : elle pourrait donc atteindre
 * ses champs si on les avait laisses sans modificateur. On ne l'a pas fait,
 * et elle passe par les accesseurs comme tout le monde.
 *
 * La liste, en revanche, reste invisible de l'exterieur. C'est ce que le
 * cours appelle reduire la surface publique : une seule facon d'ajouter,
 * une seule de chercher, et rien d'autre.
 */
public class Stock {

    private final List<Boisson> boissons = new ArrayList<>();

    public void ajouter(Boisson boisson) {
        boissons.add(boisson);
    }

    public Boisson trouver(String nom) {
        for (Boisson boisson : boissons) {
            if (boisson.getNom().equals(nom)) {
                return boisson;
            }
        }
        return null;
    }
}
