package be.ephec.java.col.e02;

/** COL.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Annuaire annuaire = new Annuaire();

        annuaire.ajouter(new Fiche("Turing", "0475 11 22 33", "Londres"));
        annuaire.ajouter(new Fiche("Lovelace", "0496 44 55 66", "Londres"));
        annuaire.ajouter(new Fiche("Hopper", "0470 77 88 99", "New York"));

        System.out.println("Fiche de Lovelace : " + annuaire.chercher("Lovelace"));
        System.out.println("Fiche de Babbage  : " + annuaire.chercher("Babbage"));

        System.out.println("\nAnnuaire (" + annuaire.taille() + " fiches) :");
        for (String nom : annuaire.nomsDansLOrdre()) {
            System.out.println("  " + annuaire.chercher(nom));
        }
    }
}
