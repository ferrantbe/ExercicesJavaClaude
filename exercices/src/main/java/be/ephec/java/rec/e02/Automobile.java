package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Une automobile a quatre roues, quelle qu'elle soit.. La classe reste
 * abstraite : elle ne sait toujours pas calculer sa taxe.
 */
public abstract class Automobile extends Vehicule {

    public Automobile(String marque, int annee, Energie energie) {
        super(marque, annee, energie);
    }

    @Override
    public int nombreDeRoues() {
        throw new UnsupportedOperationException("nombreDeRoues n'est pas encore implementee");
    }
}
