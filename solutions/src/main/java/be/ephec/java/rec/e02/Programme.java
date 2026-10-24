package be.ephec.java.rec.e02;

import java.util.Locale;

/**
 * REC.2 — Corrige.
 *
 * Quatre sortes de vehicules, un seul parc, aucun test de type : la
 * boucle de descriptions() et celle de taxeTotale() font le travail.
 */
public class Programme {

    public static void main(String[] args) {
        Parc parc = new Parc();
        parc.ajouter(new Voiture("Toyota", 2019, Energie.ESSENCE, 85));
        parc.ajouter(new Camionnette("Renault", 2016, Energie.DIESEL, 1200));
        parc.ajouter(new Moto("Ducati", 2021, Energie.ESSENCE, 937));
        parc.ajouter(new Scooter("Niu", 2023, Energie.ELECTRIQUE));
        parc.ajouter(new Voiture("Tesla", 2022, Energie.ELECTRIQUE, 208));

        for (String description : parc.descriptions()) {
            System.out.println(description);
        }
        System.out.println();
        System.out.println("Electriques : " + parc.compter(Energie.ELECTRIQUE));
        System.out.println("Doyen       : " + parc.doyen().description());
        System.out.printf(Locale.US, "Taxe totale : %.2f EUR%n", parc.taxeTotale());
    }
}
