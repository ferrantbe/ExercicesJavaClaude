package be.ephec.java.demo.itf.slides;

/**
 * Slide « Ajouter une methode sans casser l'existant » (ITF, section 6).
 *
 * klaxonne a ete ajoutee avec un corps par defaut : Camion, ecrit avant elle,
 * compile toujours et en profite ; Ambulance la redefinit.
 */
public class AjouterUneMethodeSansCasser {

    interface Vehicle {
        void demarre();
        void arrete();

        default void klaxonne() {
            System.out.println("Tuut");
        }
    }

    static class Camion implements Vehicle {
        public void demarre() { System.out.println("Camion demarre"); }
        public void arrete() { System.out.println("Camion arrete"); }
    }

    static class Ambulance implements Vehicle {
        public void demarre() { System.out.println("Ambulance demarre"); }
        public void arrete() { System.out.println("Ambulance arrete"); }

        @Override
        public void klaxonne() {
            System.out.println("Pin-pon");
        }
    }

    public static void main(String[] args) {
        Vehicle[] vehicules = { new Camion(), new Ambulance() };
        for (Vehicle v : vehicules) {
            v.demarre();
            v.klaxonne();
        }
    }

    /* Sortie attendue :
    Camion demarre
    Tuut
    Ambulance demarre
    Pin-pon
    */
}
