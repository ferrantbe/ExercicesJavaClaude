package be.ephec.java.pkg.e04;

/** PKG.4 — TODO : doit demenager vers be.ephec.java.pkg.e04.service */
public class Inscription {

    public Partie inscrire(String... pseudos) {
        Partie partie = new Partie();
        for (String pseudo : pseudos) {
            partie.ajouter(new Joueur(pseudo));
        }
        return partie;
    }
}
