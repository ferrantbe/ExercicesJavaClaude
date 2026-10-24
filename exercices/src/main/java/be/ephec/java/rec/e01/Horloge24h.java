package be.ephec.java.rec.e01;

/**
 * REC.1 — A COMPLETER.
 *
 * Une horloge sur 24 heures : des heures de 0 a 23, des minutes de 0 a 59.
 * Toute valeur hors bornes est refusee par une HeureInvalideException, que
 * ce soit a la construction ou par un modificateur.
 */
public class Horloge24h {

    private int heures;
    private int minutes;

    /**
     * Cree l'horloge a l'heure donnee.
     *
     * @throws HeureInvalideException si les heures ne sont pas dans [0, 23]
     *                                ou les minutes dans [0, 59]
     */
    public Horloge24h(int heures, int minutes) throws HeureInvalideException {
        throw new UnsupportedOperationException("Horloge24h n'est pas encore implementee");
    }

    public int getHeures() {
        throw new UnsupportedOperationException("getHeures n'est pas encore implementee");
    }

    public int getMinutes() {
        throw new UnsupportedOperationException("getMinutes n'est pas encore implementee");
    }

    /**
     * Remplace les heures.
     *
     * @throws HeureInvalideException si la valeur n'est pas dans [0, 23] ;
     *                                l'horloge ne change alors pas
     */
    public void setHeures(int heures) throws HeureInvalideException {
        throw new UnsupportedOperationException("setHeures n'est pas encore implementee");
    }

    /**
     * Remplace les minutes.
     *
     * @throws HeureInvalideException si la valeur n'est pas dans [0, 59] ;
     *                                l'horloge ne change alors pas
     */
    public void setMinutes(int minutes) throws HeureInvalideException {
        throw new UnsupportedOperationException("setMinutes n'est pas encore implementee");
    }

    /**
     * Avance l'horloge de la duree donnee. Les minutes qui depassent 59
     * deviennent des heures, et les heures qui depassent 23 repartent de 0 :
     * 23:50 + 0:20 donne 00:10.
     *
     * La duree est positive ou nulle ; ce qu'il advient d'une duree negative
     * n'est pas specifie.
     */
    public void ajouter(int heures, int minutes) {
        throw new UnsupportedOperationException("ajouter n'est pas encore implementee");
    }

    /**
     * Avance l'horloge de la duree que represente l'autre horloge.
     * Une seule ligne devrait suffire : l'autre methode ajouter fait deja tout.
     */
    public void ajouter(Horloge24h duree) {
        throw new UnsupportedOperationException("ajouter n'est pas encore implementee");
    }

    /**
     * L'heure au format "HH:MM", toujours sur deux chiffres : "09:03", "22:45".
     * String.format sait le faire : cherchez comment on demande un entier
     * sur deux positions, complete par des zeros.
     */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
