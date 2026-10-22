package be.ephec.java.demo.abs;

/**
 * DEMO ABS — etat final.
 *
 * Cette classe n'a pas ete ecrite a la main : elle est le resultat d'un
 * « Pull Members Up » d'IntelliJ, applique aux trois classes de depart qui
 * portaient chacune la meme methode envoyer().
 *
 * Le partage des roles qui en resulte :
 *
 *   ce qui est COMMUN — le destinataire, le refus d'un message vide, la
 *   forme de la phrase — est monte ici, ecrit une seule fois ;
 *
 *   ce qui VARIE — le nom du canal — est reste abstrait, et chaque
 *   sous-classe le fournit en une ligne.
 *
 * Recopier envoyer() dans trois sous-classes est une erreur tres
 * frequente a l'examen. Voir CC-CLS.3 du memento Clean Code.
 */
public abstract class Notification {

    private final String destinataire;

    protected Notification(String destinataire) {
        this.destinataire = destinataire;
    }

    /** Le seul point ou les trois notifications different. */
    protected abstract String canal();

    public String getDestinataire() {
        return destinataire;
    }

    public String envoyer(String message) {
        if (message == null || message.isBlank()) {
            return "Rien a envoyer";
        }
        return "Envoi d'un " + canal() + " a " + destinataire + " : " + message;
    }
}
