package be.ephec.java.gen.e06;

/**
 * GEN.6 — CORRIGE.
 *
 * Deux mots-cles a ne pas confondre, et c'est le piege annonce dans l'enonce :
 *
 *   super(...)   appelle un constructeur de la classe MERE. Il doit etre la
 *                premiere instruction du constructeur.
 *
 *   this(...)    appelle un AUTRE constructeur de la MEME classe.
 *
 * Le meme mot super sert aussi a appeler une methode de la classe mere —
 * super.description() ci-dessous — ce qui evite de recopier son contenu.
 * Recopier aurait fonctionne, jusqu'au jour ou la description de Couple
 * change et ou personne ne pense a repercuter. Voir CC-CLS.3.
 */
public class CoupleNomme<T> extends Couple<T> {

    private final String nom;

    public CoupleNomme(String nom, T premier, T second) {
        super(premier, second);
        this.nom = nom;
    }

    public String getNom() {
        return nom;
    }

    @Override
    public String description() {
        return nom + " -> " + super.description();
    }
}
