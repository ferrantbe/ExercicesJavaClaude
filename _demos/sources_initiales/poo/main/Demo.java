package be.ephec.java.travail;

/** DEPART POO — etat de l'etape 2. */
public class Demo {

    public static void main(String[] args) {
        Livre livre = new Livre();
        livre.titre = "Clean Code";
        livre.auteur = "Robert C. Martin";
        livre.anneeDeParution = 2008;

        System.out.println(livre.titre + ", " + livre.auteur
                + " (" + livre.anneeDeParution + ")");

        // La ligne qui fait tout l'interet de l'etape 2 : elle passe.
        livre.anneeDeParution = -3000;
        System.out.println("Annee : " + livre.anneeDeParution);
    }
}
