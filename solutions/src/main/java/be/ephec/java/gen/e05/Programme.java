package be.ephec.java.gen.e05;

/** GEN.5 — CORRIGE. */
public class Programme {

    /** Une classe locale avec son propre toString, pour la demonstration. */
    private record Ville(String nom, int habitants) {
        @Override
        public String toString() {
            return nom + "(" + habitants + ")";
        }
    }

    public static void main(String[] args) {
        System.out.println(UtilGenerique.otGnirts("Java"));
        System.out.println(UtilGenerique.otGnirts(1234));
        System.out.println(UtilGenerique.otGnirts(3.5));
        System.out.println(UtilGenerique.otGnirts(new Ville("Bruxelles", 1200000)));

        // La methode ne connait rien de Ville : elle appelle son toString,
        // c'est tout. Le type est decide a chaque appel.
    }
}
