package be.ephec.java.gen.e02;

/** GEN.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Couple2<Integer, Integer> paire = new Couple2<>(3, 4);
        Couple2<Integer, Double> mesure = new Couple2<>(3, 4.5);
        Couple2<String, Integer> age = new Couple2<>("Ada", 36);

        System.out.println(paire);
        System.out.println(mesure);
        System.out.println(age);
    }
}
