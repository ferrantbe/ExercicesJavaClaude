package be.ephec.java.rec.e02;

/**
 * REC.2 — A COMPLETER.
 *
 * Un deux-roues a... deux roues, quel qu'il soit.. La classe reste
 * abstraite : elle ne sait toujours pas calculer sa taxe.
 */
public abstract class DeuxRoues extends Vehicule {

    public DeuxRoues(String marque, int annee, Energie energie) {
        super(marque, annee, energie);
    }

    @Override
    public int nombreDeRoues() {
        throw new UnsupportedOperationException("nombreDeRoues n'est pas encore implementee");
    }
}
