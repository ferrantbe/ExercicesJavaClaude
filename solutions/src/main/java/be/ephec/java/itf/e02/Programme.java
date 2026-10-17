package be.ephec.java.itf.e02;

/** ITF.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Client client = new Client();

        // C'est ICI, et seulement ici, qu'on affiche. Les classes de paiement
        // retournent du texte ; le programme decide d'en faire quoi. Voir CC-MET.7.
        Paiement[] moyens = {new PayPal(), new CarteDeCredit()};

        for (Paiement moyen : moyens) {
            System.out.println(client.executePaiement(moyen, 42.50));
            System.out.println();
        }
    }
}
