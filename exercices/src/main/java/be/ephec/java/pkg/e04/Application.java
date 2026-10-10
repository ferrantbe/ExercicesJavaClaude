package be.ephec.java.pkg.e04;

/** PKG.4 — TODO : doit demenager vers be.ephec.java.pkg.e04.application */
public class Application {

    public static void main(String[] args) {
        Partie partie = new Inscription().inscrire("Ada", "Alan", "Grace");
        System.out.println(partie.nombreDeJoueurs() + " joueurs inscrits");
    }
}
