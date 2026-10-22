package be.ephec.java.demo.itf.slides;

/** Un transport a moteur (ITF, section 4). */
public class Moto extends Transport implements Motorise {

    @Override
    public void bouge() {
        System.out.println("Moto : se faufile");
    }

    @Override
    public void faisLePlein() {
        System.out.println("Moto : plein fait");
    }
}
