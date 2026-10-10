package be.ephec.java.travail;

/** DEPART STA — l'appelant numerote lui-meme, et peut se tromper. */
public class Demo {

    public static void main(String[] args) {
        Voiture premiere = new Voiture("Clio", 1);
        Voiture deuxieme = new Voiture("208", 2);
        Voiture troisieme = new Voiture("Yaris", 2);   // oups

        System.out.println(premiere.decrire());
        System.out.println(deuxieme.decrire());
        System.out.println(troisieme.decrire());
    }
}
