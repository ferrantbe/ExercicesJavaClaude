package be.ephec.java.demo.abs.slides;

/**
 * La classe abstraite des slides de la section 3 d'ABS.
 *
 * Slide « Un constructeur, quand meme » : la classe ne s'instancie pas, mais
 * son constructeur initialise le destinataire pour toutes ses filles.
 * Slide « La methode abstraite » : chaque fille dit par quel canal elle passe.
 */
public abstract class Notification {

    protected final String destinataire;

    protected Notification(String destinataire) {
        this.destinataire = destinataire;
    }

    protected abstract String canal();

    // ce qui est commun aux trois canaux, ecrit une seule fois
    public void envoyer(String texte) {
        System.out.println(canal() + " a " + destinataire + " : " + texte);
    }
}
