package be.ephec.java.demo.exc.slides;

/**
 * Slide « Elle remonte la pile » (EXC, section 1).
 *
 * verifier leve l'exception, monter est abandonnee, et comme personne ne
 * l'attrape, elle sort du main : la JVM affiche la trace. Lisez-la de haut
 * en bas : verifier, puis monter, puis main.
 */
public class ElleRemonteLaPile {

    public static void main(String[] args) {
        Ascenseur ascenseur = new Ascenseur(5);
        ascenseur.monter(3);       // passe
        ascenseur.monter(12);      // leve l'exception, qui remonte jusqu'ici
        System.out.println("Cette ligne n'est jamais affichee");
    }

    /* Sortie attendue :
    Ascenseur arrive a l'etage 3
    Exception in thread "main" java.lang.IllegalArgumentException: Etage 12 au-dela du dernier, 5
    */
}
