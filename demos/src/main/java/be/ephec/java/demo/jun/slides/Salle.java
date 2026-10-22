package be.ephec.java.demo.jun.slides;

/**
 * La salle de spectacle que testent les slides JUN.
 *
 * Slide « Une documentation est une liste de tests » : chaque phrase de la
 * Javadoc de reserver devient un test de SalleTest.
 */
public class Salle {

    private final int capacite;
    private int reservees;

    public Salle(int capacite) {
        this.capacite = capacite;
    }

    public int placesLibres() {
        return capacite - reservees;
    }

    /**
     * Reserve des places.
     *
     * @throws IllegalArgumentException si places <= 0
     * @throws SalleCompleteException   s'il reste moins de
     *         places que demande ; rien n'est alors reserve
     */
    public void reserver(int places)
            throws SalleCompleteException {
        if (places <= 0) {
            throw new IllegalArgumentException("Nombre de places invalide : " + places);
        }
        // Slide « Un test se justifie par le defaut qu'il attrape » :
        // ecrivez >= au lieu de >, et un seul test passe au rouge,
        // reserverToutesLesPlacesLibres.
        if (places > placesLibres()) {
            throw new SalleCompleteException(
                    "Plus que " + placesLibres() + " places");
        }
        reservees += places;
    }
}
