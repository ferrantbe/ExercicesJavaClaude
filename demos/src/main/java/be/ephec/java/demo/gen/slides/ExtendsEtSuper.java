package be.ephec.java.demo.gen.slides;

import java.util.ArrayList;
import java.util.List;

/**
 * Slides « Une Valise est un Bagage », « ? extends : on lit » et « ? super :
 * on ajoute » (GEN, section 4).
 */
public class ExtendsEtSuper {

    public static double poidsTotal(List<? extends Bagage> bagages) {
        double total = 0;
        for (Bagage b : bagages) {
            total += b.getPoids();
        }
        // bagages.add(new Sac());   ne compile pas
        return total;
    }

    public static void charger(List<? super Valise> soute, int n) {
        for (int i = 0; i < n; i++) {
            soute.add(new Valise("grise"));
        }
    }

    public static void main(String[] args) {
        List<Bagage> soute = new ArrayList<>();
        soute.add(new Valise("bleue"));       // accepte
        soute.add(new Sac());                 // accepte
        System.out.println(soute + " : " + poidsTotal(soute) + " kg");

        List<Valise> valises = List.of(new Valise("rouge"), new Valise("noire"));
        System.out.println("Valises seules : " + poidsTotal(valises) + " kg");   // accepte grace a ? extends

        charger(soute, 3);                    // accepte grace a ? super
        System.out.println(soute.size() + " bagages en soute");
    }

    /* Sortie attendue :
    [valise bleue, sac] : 24.0 kg
    Valises seules : 36.0 kg
    5 bagages en soute
    */
}
