package be.ephec.java.demo.abs.slides;

/**
 * Slides « Une classe qu'on ne peut pas instancier » et « A quoi sert un type
 * qu'on ne construit pas » (ABS, section 3).
 *
 * Notification ne se construit pas, mais elle sert de type commun : un seul
 * tableau, une seule boucle, et chaque objet envoie par son propre canal.
 * Retirez les barres de commentaire devant le new Notification : refus.
 */
public class UnTypeQuOnNeConstruitPas {

    public static void main(String[] args) {
        Notification envoi;                    // d'accord
        // envoi = new Notification("Ada");     // refus a la compilation
        envoi = new NotificationMail("Ada");   // d'accord
        envoi.envoyer("Bienvenue");

        Notification[] canaux = {
            new NotificationMail("Ada"),
            new NotificationSms("0470..."),
            new NotificationPush("ada42")
        };
        for (Notification canal : canaux) {
            canal.envoyer("Votre colis arrive");
        }
    }

    /* Sortie attendue :
    mail a Ada : Bienvenue
    mail a Ada : Votre colis arrive
    sms a 0470... : Votre colis arrive
    push a ada42 : Votre colis arrive
    */
}
