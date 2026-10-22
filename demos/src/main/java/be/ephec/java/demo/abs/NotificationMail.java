package be.ephec.java.demo.abs;

/**
 * DEMO ABS — etat final.
 *
 * Toute la classe tient en une methode : c'est le signe que la
 * factorisation a bien ete faite.
 */
public class NotificationMail extends Notification {

    public NotificationMail(String destinataire) {
        super(destinataire);
    }

    @Override
    protected String canal() {
        return "courriel";
    }
}
