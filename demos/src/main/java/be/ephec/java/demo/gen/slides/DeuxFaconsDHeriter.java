package be.ephec.java.demo.gen.slides;

/**
 * Slides « Deux facons d'heriter » et « Une interface generique » (GEN,
 * section 6).
 */
public class DeuxFaconsDHeriter {

    static class Velo {
        @Override
        public String toString() { return "velo"; }
    }

    static class Manteau {
        @Override
        public String toString() { return "manteau"; }
    }

    static class CasierFerme<T> extends Casier<T> {     // la fille reste generique
        private final String code;

        public CasierFerme(String code) {
            this.code = code;
        }
    }

    static class CasierVelo extends Casier<Velo> {      // la fille fixe le T
        // deposer(Velo) et retirer() : Velo, herites tels quels
    }

    interface Depot<T> {
        void deposer(T objet);
        T retirer();
    }

    static class Vestiaire implements Depot<Manteau> {
        private Manteau accroche;

        @Override
        public void deposer(Manteau m) { accroche = m; }

        @Override
        public Manteau retirer() { return accroche; }
    }

    public static void main(String[] args) {
        CasierFerme<String> ferme = new CasierFerme<>("1234");
        ferme.deposer("lettre");
        System.out.println(ferme.retirer());

        CasierVelo garage = new CasierVelo();
        garage.deposer(new Velo());
        // garage.deposer("lettre");   // refus : ce casier ne prend que des Velo
        System.out.println(garage.retirer());

        Depot<Manteau> vestiaire = new Vestiaire();
        vestiaire.deposer(new Manteau());
        System.out.println(vestiaire.retirer());
    }

    /* Sortie attendue :
    lettre
    velo
    manteau
    */
}
