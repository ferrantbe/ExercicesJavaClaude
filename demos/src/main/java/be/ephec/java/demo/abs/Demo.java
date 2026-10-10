package be.ephec.java.demo.abs;

/**
 * DEMO ABS — etat final.
 *
 * Ce qu'il faut regarder : le TABLEAU. Au depart il etait impossible — les
 * trois classes n'avaient aucun type commun — et c'est ce que la classe
 * abstraite a rendu possible.
 *
 * Le programme ne teste le type d'aucune notification. Ajouter un canal
 * Slack demanderait une classe de plus et un element de plus dans ce
 * tableau, rien d'autre.
 */
public class Demo {

    public static void main(String[] args) {
        Notification[] canaux = {
                new NotificationMail("mail@exemple.be"),
                new NotificationSMS("0475 11 22 33"),
                new NotificationPush("appareil 4f2a")
        };

        for (Notification canal : canaux) {
            System.out.println(canal.envoyer("Cours annule"));
        }

        System.out.println(canaux[0].envoyer("   "));
    }
}
