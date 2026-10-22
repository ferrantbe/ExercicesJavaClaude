package be.ephec.java.gen.e03;

/** GEN.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        TripletI<String> mots = new TripletI<>("un", "deux", "trois");
        TripletI<Integer> nombres = new TripletI<>(1, 2, 3);

        System.out.println(mots.getPremier() + " " + mots.getSecond()
                + " " + mots.getTroisieme());
        System.out.println(nombres.getPremier() + nombres.getSecond()
                + nombres.getTroisieme());

        TripletD<String, Integer, Double> melange = new TripletD<>("Ada", 36, 1.75);
        System.out.println(melange.getPremier() + ", " + melange.getSecond()
                + ", " + melange.getTroisieme());
    }
}
