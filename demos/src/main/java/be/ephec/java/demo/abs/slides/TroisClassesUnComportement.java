package be.ephec.java.demo.abs.slides;

/**
 * Slides « Trois classes, un seul comportement » et « Ce qu'on ne peut pas
 * faire » (ABS, section 2).
 *
 * Trois classes sans lien entre elles : le code se repete, et aucun type ne
 * permet de les ranger ensemble. Retirez les barres de commentaire devant le
 * tableau : le programme ne compile plus.
 */
public class TroisClassesUnComportement {

    static class NotificationMail {
        public void envoyer(String texte) {
            System.out.println("mail : " + texte);
        }
    }

    static class NotificationSms {
        public void envoyer(String texte) {
            System.out.println("sms : " + texte);
        }
    }

    static class NotificationPush {
        public void envoyer(String texte) {
            System.out.println("push : " + texte);
        }
    }

    public static void main(String[] args) {
        NotificationMail mail = new NotificationMail();
        NotificationSms sms = new NotificationSms();
        NotificationPush push = new NotificationPush();

        mail.envoyer("Votre colis arrive");
        sms.envoyer("Votre colis arrive");
        push.envoyer("Votre colis arrive");

        // NotificationMail[] canaux = { mail, sms, push };
        // refus : sms et push ne sont pas des NotificationMail
    }

    /* Sortie attendue :
    mail : Votre colis arrive
    sms : Votre colis arrive
    push : Votre colis arrive
    */
}
