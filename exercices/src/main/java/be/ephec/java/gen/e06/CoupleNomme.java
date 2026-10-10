package be.ephec.java.gen.e06;

/**
 * GEN.6 — A COMPLETER.
 *
 * Une classe generique peut heriter d'une autre classe generique. Le
 * parametre de type se transmet : CoupleNomme<T> etend Couple<T>, donc le T
 * du fils est celui du pere.
 */
public class CoupleNomme<T> extends Couple<T> {

    // TODO : declarez le nom

    /**
     * Le constructeur est declare : completez son corps.
     *
     * Vous devrez commencer par appeler le constructeur de la classe mere.
     * Attention au mot-cle : ce n'est pas this().
     */
    public CoupleNomme(String nom, T premier, T second) {
        super(premier, second);
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public String getNom() {
        throw new UnsupportedOperationException("getNom n'est pas encore implementee");
    }

    /**
     * Redefinit la description pour y inclure le nom, au format exact :
     *     "notes -> premier: 12, second: 16"
     *
     * Reutilisez la description de la classe mere plutot que de la recopier.
     * Le mot-cle qui permet de l'appeler est le meme que celui du
     * constructeur.
     */
    @Override
    public String description() {
        throw new UnsupportedOperationException("description n'est pas encore implementee");
    }
}
