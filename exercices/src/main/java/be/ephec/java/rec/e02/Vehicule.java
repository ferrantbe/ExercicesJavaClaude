package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Le vehicule en general : une marque, une annee, une energie. Il est
 * Taxable, mais ne sait pas calculer sa taxe : chaque sorte concrete le
 * fera. Il ne sait pas non plus combien de roues il a.
 *
 * La description, elle, est la meme pour tous : c'est donc ici qu'elle
 * s'ecrit, une seule fois, a partir des methodes abstraites.
 */
public abstract class Vehicule implements Taxable {

    private String marque;
    private int annee;
    private Energie energie;

    public Vehicule(String marque, int annee, Energie energie) {
        throw new UnsupportedOperationException("Vehicule n'est pas encore implementee");
    }

    public String getMarque() {
        throw new UnsupportedOperationException("getMarque n'est pas encore implementee");
    }

    public int getAnnee() {
        throw new UnsupportedOperationException("getAnnee n'est pas encore implementee");
    }

    public Energie getEnergie() {
        throw new UnsupportedOperationException("getEnergie n'est pas encore implementee");
    }

    /** Le nombre de roues depend de la famille : automobile ou deux-roues. */
    public abstract int nombreDeRoues();

    /**
     * "Toyota (2019), 4 roues, essence" : la marque, l'annee entre
     * parentheses, le nombre de roues, le libelle de l'energie.
     */
    public String description() {
        throw new UnsupportedOperationException("description n'est pas encore implementee");
    }
}
