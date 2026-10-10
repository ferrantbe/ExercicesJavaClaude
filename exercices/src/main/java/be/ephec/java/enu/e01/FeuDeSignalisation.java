package be.ephec.java.enu.e01;

/**
 * ENU.1 — A COMPLETER.
 *
 * Un feu a une couleur et un etat. Un feu qui vient d'etre construit est
 * INACTIF, et un feu inactif est ORANGE — c'est le clignotant de nuit.
 */
public class FeuDeSignalisation {

    // TODO : declarez les champs necessaires (couleur, etat)

    // TODO : ecrivez le constructeur : un feu neuf est inactif, donc orange

    /** Rend le feu inactif : il passe a l'orange et ne changera plus de couleur. */
    public void desactive() {
        throw new UnsupportedOperationException("desactive n'est pas encore implementee");
    }

    /** Rend le feu actif : il passe au rouge et peut de nouveau changer. */
    public void active() {
        throw new UnsupportedOperationException("active n'est pas encore implementee");
    }

    /**
     * Fait passer le feu a la couleur suivante : VERT -> ORANGE -> ROUGE -> VERT.
     * Un feu inactif ne change pas de couleur.
     */
    public void changeDeCouleur() {
        throw new UnsupportedOperationException("changeDeCouleur n'est pas encore implementee");
    }

    public CouleurDeFeu getCouleur() {
        throw new UnsupportedOperationException("getCouleur n'est pas encore implementee");
    }

    public boolean estActif() {
        throw new UnsupportedOperationException("estActif n'est pas encore implementee");
    }

    /**
     * Rend l'etat du feu sous forme de texte, dans ce format exact :
     *     "ROUGE (actif)"   ou   "ORANGE (inactif)"
     */
    public String enTexte() {
        throw new UnsupportedOperationException("enTexte n'est pas encore implementee");
    }
}
