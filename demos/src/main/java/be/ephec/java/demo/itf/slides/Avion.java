package be.ephec.java.demo.itf.slides;

/** Un transport a moteur (ITF, section 4). */
public class Avion extends Transport implements Motorise {

    @Override
    public void bouge() {
        System.out.println("Avion : vole");
    }

    @Override
    public void faisLePlein() {
        System.out.println("Avion : plein fait");
    }
}
