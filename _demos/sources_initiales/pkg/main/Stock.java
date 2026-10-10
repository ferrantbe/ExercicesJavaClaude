package be.ephec.java.travail;

import java.util.ArrayList;
import java.util.List;

/** DEMO PKG — etat de DEPART. */
public class Stock {

    List<Boisson> boissons = new ArrayList<>();

    void ajouter(Boisson boisson) {
        boissons.add(boisson);
    }

    Boisson trouver(String nom) {
        for (Boisson boisson : boissons) {
            if (boisson.nom.equals(nom)) {
                return boisson;
            }
        }
        return null;
    }
}
