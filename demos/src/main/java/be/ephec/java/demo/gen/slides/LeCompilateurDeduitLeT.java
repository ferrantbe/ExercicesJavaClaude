package be.ephec.java.demo.gen.slides;

import java.util.List;
import java.util.Random;

/**
 * Slides « Le compilateur deduit le T » et « Une methode statique declare son
 * T » (GEN, section 5). Le Random a une graine, pour une sortie stable ; la
 * slide utilise Math.random(), qui change a chaque lancement.
 */
public class LeCompilateurDeduitLeT {

    static class Tirage {
        private static final Random HASARD = new Random(5);

        public static <T> T auHasard(List<T> elements) {
            int i = HASARD.nextInt(elements.size());
            return elements.get(i);
        }
    }

    public static void main(String[] args) {
        List<Valise> valises = List.of(new Valise("bleue"), new Valise("rouge"), new Valise("verte"));
        List<String> messages = List.of("Bonjour", "Bonsoir");

        Valise v = Tirage.auHasard(valises);    // T vaut Valise
        String s = Tirage.auHasard(messages);   // T vaut String
        Valise w = Tirage.<Valise>auHasard(valises);
        System.out.println(v + ", " + s + ", " + w);

        Casier<Valise> casier = Casier.contenant(new Valise("jaune"));
        System.out.println("Dans le casier : " + casier.retirer());
    }

    /* Sortie attendue :
    valise verte, Bonjour, valise verte
    Dans le casier : valise jaune
    */
}
