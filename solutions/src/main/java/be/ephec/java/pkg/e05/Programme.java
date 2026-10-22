package be.ephec.java.pkg.e05;

import be.ephec.java.pkg.e05.base.Capteur;
import be.ephec.java.pkg.e05.derive.CapteurMoyenne;
import be.ephec.java.pkg.e05.derive.Tableau;

/** PKG.5 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Capteur brut = new Capteur("Thermometre", "SN-2026-4f2a");
        CapteurMoyenne lisse = new CapteurMoyenne("Hygrometre", "SN-2026-9b71");

        brut.mesurer(21.5);
        lisse.lisser(60);
        lisse.lisser(70);   // (0 + 60) / 2 = 30, puis (30 + 70) / 2 = 50

        System.out.println(lisse.decrire());
        System.out.printf("Somme : %.2f%n", Tableau.sommeDesMesures(brut, lisse));
        System.out.println("Plus eleve : " + Tableau.plusEleve(brut, lisse));

        // brut.derniereMesure;   // ne compile pas : ce package n'est ni
        //                        // celui de Capteur, ni une sous-classe.
    }
}
