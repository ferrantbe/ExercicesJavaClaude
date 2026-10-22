package be.ephec.java.tmp.e02;

import java.time.LocalDate;

/**
 * TMP.2 — Cette classe vous est FOURNIE. Executez-la AVANT de coder.
 *
 * Il contient une erreur. Le compilateur ne dit rien, l'execution ne plante
 * pas, et pourtant le resultat est faux. Trouvez pourquoi.
 */
public class Programme {

    public static void main(String[] args) {
        LocalDate rendezVous = LocalDate.of(2027, 1, 19);

        System.out.println("Rendez-vous initial : " + rendezVous);

        rendezVous.plusWeeks(1);

        System.out.println("Apres report d'une semaine : " + rendezVous);
    }
}
