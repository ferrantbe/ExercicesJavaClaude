package be.ephec.java.travail;

/**
 * DEPART ABS — l'une des trois classes, toutes ecrites separement.
 *
 * Regardez envoyer() dans les trois : c'est exactement le meme code, a un
 * mot pres.
 */
public class NotificationSMS {

    private final String destinataire;

    public NotificationSMS(String destinataire) {
        this.destinataire = destinataire;
    }

    public String envoyer(String message) {
        if (message == null || message.isBlank()) {
            return "Rien a envoyer";
        }
        return "Envoi d'un SMS a " + destinataire + " : " + message;
    }
}
