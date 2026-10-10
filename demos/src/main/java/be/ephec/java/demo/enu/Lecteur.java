package be.ephec.java.demo.enu;

/**
 * DEMO ENU — etat final.
 *
 * Le cycle sans aucune condition.
 *
 *   values()   rend les modes dans l'ordre de declaration
 *   ordinal()  donne la position du mode courant
 *   % length   ramene a zero apres le dernier
 *
 * Au depart, la meme methode comptait trois conditions. Ajouter un mode
 * en aurait demande une quatrieme — et c'est precisement ce qu'on a fait
 * a la fin de la demonstration, sans toucher a cette ligne.
 */
public class Lecteur {

    private Mode mode = Mode.NORMAL;

    public Mode getMode() {
        return mode;
    }

    public void modeSuivant() {
        Mode[] cycle = Mode.values();
        mode = cycle[(mode.ordinal() + 1) % cycle.length];
    }
}
