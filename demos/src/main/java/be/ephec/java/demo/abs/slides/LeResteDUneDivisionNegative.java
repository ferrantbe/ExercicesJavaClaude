package be.ephec.java.demo.abs.slides;

/**
 * Slide « Petit detour : le reste d'une division negative » (ABS, section 4).
 *
 * En Java, le reste garde le signe du dividende. Pour ramener un angle entre
 * 0 et 359, on ajoute 360 avant de reprendre le reste.
 */
public class LeResteDUneDivisionNegative {

    public static void main(String[] args) {
        System.out.println(-90 % 360);                // -90, et non 270
        System.out.println((-90 % 360 + 360) % 360);  // 270
        System.out.println((450 % 360 + 360) % 360);  // 90 : marche aussi au-dela de 360
    }

    /* Sortie attendue :
    -90
    270
    90
    */
}
