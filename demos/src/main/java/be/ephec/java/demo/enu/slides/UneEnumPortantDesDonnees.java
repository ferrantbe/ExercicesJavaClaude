package be.ephec.java.demo.enu.slides;

/** Slide « Une enum peut porter des donnees » (ENU, section 5). */
public class UneEnumPortantDesDonnees {

    public static void main(String[] args) {
        for (Discount remise : Discount.values()) {
            System.out.println(remise + " : 200 euros deviennent " + remise.appliquer(200));
        }
    }

    /* Sortie attendue :
    BASIC : 200 euros deviennent 190.0
    FIDELITY : 200 euros deviennent 185.0
    SPECIAL : 200 euros deviennent 180.0
    */
}
