package be.ephec.java.enu.e01;

/** ENU.1 — CORRIGE. */
public class FeuDeSignalisation {

    private CouleurDeFeu couleur;
    private boolean actif;

    public FeuDeSignalisation() {
        // Un feu neuf est inactif. Plutot que de recopier ici l'etat
        // correspondant, on appelle la methode qui le definit deja.
        desactive();
    }

    public void desactive() {
        this.actif = false;
        this.couleur = CouleurDeFeu.ORANGE;
    }

    public void active() {
        this.actif = true;
        this.couleur = CouleurDeFeu.ROUGE;
    }

    /**
     * Aucune condition sur la couleur courante : values() rend le tableau des
     * trois couleurs dans l'ordre de declaration, ordinal() donne la position
     * de la couleur actuelle, et le reste de la division par 3 ramene a zero
     * apres la derniere. Ajouter une quatrieme couleur ne changerait rien ici.
     */
    public void changeDeCouleur() {
        if (!actif) {
            return;
        }
        CouleurDeFeu[] cycle = CouleurDeFeu.values();
        this.couleur = cycle[(couleur.ordinal() + 1) % cycle.length];
    }

    public CouleurDeFeu getCouleur() {
        return couleur;
    }

    public boolean estActif() {
        return actif;
    }

    /**
     * couleur s'affiche par son nom de constante, parce que le toString par
     * defaut d'une enum rend exactement cela.
     */
    public String enTexte() {
        return couleur + (actif ? " (actif)" : " (inactif)");
    }
}
