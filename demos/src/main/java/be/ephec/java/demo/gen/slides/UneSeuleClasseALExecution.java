package be.ephec.java.demo.gen.slides;

/**
 * Slides « Une seule classe a l'execution » et « Verifier, puis effacer »
 * (GEN, section 3). Le parametre de type n'existe que pour le compilateur.
 */
public class UneSeuleClasseALExecution {

    public static void main(String[] args) {
        Casier<Valise> pourValises = new Casier<>();
        Casier<String> pourMessages = new Casier<>();

        System.out.println(
                pourValises.getClass() == pourMessages.getClass());   // true
        System.out.println(pourValises.getClass().getSimpleName());   // Casier, sans <Valise>
    }

    /* Sortie attendue :
    true
    Casier
    */
}
