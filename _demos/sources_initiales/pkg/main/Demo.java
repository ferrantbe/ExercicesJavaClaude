package be.ephec.java.travail;

/** DEMO PKG — etat de DEPART. */
public class Demo {

    public static void main(String[] args) {
        Distributeur distributeur = new Distributeur();

        distributeur.stock.ajouter(new Boisson("Eau", 1.20));
        distributeur.stock.ajouter(new Boisson("Cafe", 0.80));

        distributeur.servir("Cafe", 1.00);
        distributeur.servir("The", 1.00);
        distributeur.servir("Eau", 1.00);

        // On lit la caisse directement. Personne ne nous en empeche : tout
        // est dans le meme package.
        System.out.printf("Caisse : %.2f EUR%n", distributeur.caisse);
    }
}
