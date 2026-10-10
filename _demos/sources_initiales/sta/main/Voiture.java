package be.ephec.java.travail;

/**
 * DEPART STA — aucune notion de static.
 *
 * Chaque voiture porte son numero, et c'est l'appelant qui doit le lui
 * donner. Rien ne garantit qu'il ne se repete pas.
 */
public class Voiture {

    private final String modele;
    private final int numero;

    public Voiture(String modele, int numero) {
        this.modele = modele;
        this.numero = numero;
    }

    public String decrire() {
        return "Voiture n" + numero + " : " + modele;
    }
}
