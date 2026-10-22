package be.ephec.java.itf.e01;

/** ITF.1 — CORRIGE. */
public class Programme {

    /**
     * Le point important de tout l'exercice tient dans le type du troisieme
     * parametre : Calculateur, et non Addition ni Multiplication.
     *
     * Cette methode ne sait pas quel calcul elle declenche, et n'a pas besoin
     * de le savoir. Elle fonctionnera avec des calculateurs qui n'existaient
     * pas quand elle a ete ecrite — la classe de test en fabrique un pour le
     * demontrer.
     */
    public static int effectueCalcul(int a, int b, Calculateur calculateur) {
        return calculateur.calcule(a, b);
    }

    public static void main(String[] args) {
        Calculateur addition = new Addition();
        Calculateur multiplication = new Multiplication();

        System.out.println("3 + 4 = " + effectueCalcul(3, 4, addition));
        System.out.println("3 x 4 = " + effectueCalcul(3, 4, multiplication));

        // Les deux variables sont declarees Calculateur : le programme ne
        // manipule que l'interface, jamais les classes concretes.
        Calculateur[] calculateurs = {addition, multiplication};
        for (Calculateur calculateur : calculateurs) {
            System.out.println("sur 6 et 7 : " + effectueCalcul(6, 7, calculateur));
        }
    }
}
