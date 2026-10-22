package be.ephec.java.demo.itf.slides;

/** Le transport sans moteur (ITF, section 4) : il n'implemente pas Motorise. */
public class Velo extends Transport {

    @Override
    public void bouge() {
        System.out.println("Velo : pedale");
    }
}
