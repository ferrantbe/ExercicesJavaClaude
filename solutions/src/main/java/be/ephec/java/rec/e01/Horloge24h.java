package be.ephec.java.rec.e01;

/**
 * REC.1 — Corrige.
 *
 * A remarquer : le constructeur passe par les deux modificateurs plutot que
 * de recopier leurs controles. La validation n'est ecrite qu'une fois par
 * champ (CC-CLS.3), et une borne a changer ne se change qu'a un endroit.
 */
public class Horloge24h {

    private static final int HEURES_PAR_JOUR = 24;
    private static final int MINUTES_PAR_HEURE = 60;

    private int heures;
    private int minutes;

    public Horloge24h(int heures, int minutes) throws HeureInvalideException {
        setHeures(heures);
        setMinutes(minutes);
    }

    public int getHeures() {
        return heures;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setHeures(int heures) throws HeureInvalideException {
        if (heures < 0 || heures >= HEURES_PAR_JOUR) {
            throw new HeureInvalideException("Heures invalides : " + heures
                    + " (attendu : de 0 a " + (HEURES_PAR_JOUR - 1) + ")");
        }
        this.heures = heures;
    }

    public void setMinutes(int minutes) throws HeureInvalideException {
        if (minutes < 0 || minutes >= MINUTES_PAR_HEURE) {
            throw new HeureInvalideException("Minutes invalides : " + minutes
                    + " (attendu : de 0 a " + (MINUTES_PAR_HEURE - 1) + ")");
        }
        this.minutes = minutes;
    }

    /**
     * Tout est ramene en minutes, additionne, puis redecoupe. C'est plus
     * court et plus sur que de gerer la retenue des minutes a la main :
     * le modulo fait le tour du cadran pour nous.
     */
    public void ajouter(int heures, int minutes) {
        int total = this.heures * MINUTES_PAR_HEURE + this.minutes
                + heures * MINUTES_PAR_HEURE + minutes;
        int parJour = HEURES_PAR_JOUR * MINUTES_PAR_HEURE;
        total = total % parJour;
        this.heures = total / MINUTES_PAR_HEURE;
        this.minutes = total % MINUTES_PAR_HEURE;
    }

    /** Une surcharge qui delegue : la logique n'existe qu'une fois. */
    public void ajouter(Horloge24h duree) {
        ajouter(duree.getHeures(), duree.getMinutes());
    }

    /** %02d : un entier sur deux positions, complete par des zeros. */
    @Override
    public String toString() {
        return String.format("%02d:%02d", heures, minutes);
    }
}
