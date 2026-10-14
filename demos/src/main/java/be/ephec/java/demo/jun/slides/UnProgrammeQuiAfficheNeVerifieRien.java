package be.ephec.java.demo.jun.slides;

/**
 * Slide « Un programme qui affiche ne verifie rien » (JUN, section 1).
 *
 * Le programme affiche 98. Encore faut-il le lire, savoir que 98 est juste,
 * et recommencer a chaque modification : c'est ce que fait SalleTest, seul.
 */
public class UnProgrammeQuiAfficheNeVerifieRien {

    public static void main(String[] args)
            throws SalleCompleteException {
        Salle salle = new Salle(100);

        salle.reserver(2);

        System.out.println(salle.placesLibres());   // 98 ?
    }

    /* Sortie attendue :
    98
    */
}
