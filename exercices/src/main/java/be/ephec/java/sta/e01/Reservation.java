package be.ephec.java.sta.e01;

/**
 * STA.1 — A COMPLETER.
 *
 * Jusqu'ici, tous vos champs appartenaient a un OBJET : chaque Personne a
 * son nom, chaque Compte son solde.
 *
 * Certaines informations n'appartiennent a aucun objet en particulier.
 * Combien de reservations ont ete emises ? La question porte sur
 * l'ensemble, pas sur une reservation. C'est ce que static exprime.
 *
 *     private int x           une case par objet
 *     private static int x    UNE case, partagee par tous
 */
public class Reservation {

    /**
     * La capacite de la salle.
     *
     * Elle vous est DECLAREE, parce qu'un champ ne peut pas lever
     * d'exception comme le font les methodes a completer : sans elle, la
     * classe de test ne compilerait meme pas.
     *
     * Trois mots la decrivent, et chacun dit une chose differente :
     * public, car tout le monde peut la lire ; static, car elle est la
     * meme pour tous ; final, car elle ne changera pas. Par convention,
     * une constante s'ecrit en MAJUSCULES.
     */
    // TODO : la salle compte 50 places. Corrigez la valeur.
    public static final int PLACES_MAX = 0;

    /**
     * Le nombre de reservations emises depuis le demarrage.
     *
     * Declare pour la meme raison que PLACES_MAX. Mais lisez ses deux
     * mots : private, car personne ne doit le remettre a zero du dehors ;
     * static, car il appartient a la CLASSE et non a une reservation.
     * Il n'est pas final — c'est tout l'interet.
     */
    private static int emises = 0;

    private final String nom;
    private final int numero;

    /**
     * Le constructeur ne recoit PAS le numero : c'est la classe qui le
     * distribue. Incrementez le compteur, puis prenez sa valeur.
     */
    public Reservation(String nom) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public String getNom() {
        throw new UnsupportedOperationException("getNom n'est pas encore implementee");
    }

    public int getNumero() {
        throw new UnsupportedOperationException("getNumero n'est pas encore implementee");
    }

    /**
     * Combien de reservations ont ete emises depuis le demarrage.
     *
     * Cette methode repond sur l'ENSEMBLE : elle est donc statique, et
     * s'appelle sur la classe. Essayez d'y ecrire this.numero, et lisez
     * ce que dit le compilateur — sa reponse explique tout.
     */
    public static int nombreEmises() {
        throw new UnsupportedOperationException("nombreEmises n'est pas encore implementee");
    }

    /** Retourne true s'il reste de la place : moins de PLACES_MAX emises. */
    public static boolean resteDeLaPlace() {
        throw new UnsupportedOperationException("resteDeLaPlace n'est pas encore implementee");
    }

    /** Retourne "Reservation n3 : Ada Lovelace". */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
