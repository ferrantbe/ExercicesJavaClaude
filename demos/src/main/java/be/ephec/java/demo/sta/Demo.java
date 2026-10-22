package be.ephec.java.demo.sta;

/**
 * DEMO STA — etat final.
 *
 * Ce qu'il faut regarder : le numero n'est plus donne par l'appelant, et
 * le compteur se lit sur la CLASSE, pas sur un objet.
 */
public class Demo {

    public static void main(String[] args) {
        System.out.println("Avant : " + Voiture.nombreConstruites() + " voiture(s)");

        Voiture premiere = new Voiture("Clio", 20000);
        Voiture deuxieme = new Voiture("208", 22000);
        Voiture troisieme = new Voiture("Yaris", 24000);

        System.out.println(premiere.decrire());
        System.out.println(deuxieme.decrire());
        System.out.println(troisieme.decrire());

        // Le compteur s'appelle sur la classe. IntelliJ avertit d'ailleurs
        // si on l'appelle sur une instance : premiere.nombreConstruites().
        System.out.println("Apres : " + Voiture.nombreConstruites() + " voiture(s)");

        // Et la constante aussi, sans qu'aucune voiture n'existe.
        System.out.println("TVA : " + (Voiture.TVA * 100) + " %");
    }
}
