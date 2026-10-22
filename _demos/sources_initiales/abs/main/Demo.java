package be.ephec.java.travail;

/**
 * DEPART ABS — trois classes sans rien en commun.
 *
 * Remarquez ce qu'on ne peut PAS faire : les mettre dans un meme tableau.
 * Elles n'ont aucun type commun, alors qu'elles font la meme chose.
 */
public class Demo {

    public static void main(String[] args) {
        NotificationMail mail = new NotificationMail("mail@exemple.be");
        NotificationSMS sms = new NotificationSMS("0475 11 22 33");
        NotificationPush push = new NotificationPush("appareil 4f2a");

        System.out.println(mail.envoyer("Cours annule"));
        System.out.println(sms.envoyer("Cours annule"));
        System.out.println(push.envoyer("Cours annule"));

        System.out.println(mail.envoyer("   "));
    }
}
