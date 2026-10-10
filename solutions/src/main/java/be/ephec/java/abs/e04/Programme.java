package be.ephec.java.abs.e04;

/**
 * ABS.4 — CORRIGE.
 *
 * Ce qu'il faut regarder : le tableau est de type Prestation, et la
 * boucle ne teste aucun type. Chaque prestation sait ce qu'elle vaut.
 *
 * Ajouter une cinquieme sorte — un devis, une maintenance annuelle —
 * demanderait une classe et un element de plus dans ce tableau. Rien
 * d'autre, et surtout pas une condition supplementaire ici.
 */
public class Programme {

    public static void main(String[] args) {
        Prestation[] prestations = {
                new Abonnement("Ada Lovelace", 125),
                new Installation("Alan Turing", 200, 45.50),
                new Depannage("Grace Hopper", 65, 3),
                new Urgence("Charles Babbage", 65, 2, 0.5)
        };

        double total = 0;
        for (Prestation prestation : prestations) {
            System.out.println(prestation.facture());
            total += prestation.montant();
        }
        System.out.printf(java.util.Locale.US, "%nTotal : %.2f EUR%n", total);
    }
}
