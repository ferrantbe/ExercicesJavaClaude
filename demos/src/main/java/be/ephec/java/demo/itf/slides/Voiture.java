package be.ephec.java.demo.itf.slides;

/** Un transport a moteur (ITF, section 4). */
public class Voiture extends Transport implements Motorise {

    @Override
    public void bouge() {
        System.out.println("Voiture : roule");
    }

    @Override
    public void faisLePlein() {
        System.out.println("Voiture : plein fait");
    }
}
