package be.ephec.java.demo.itf.slides;

/**
 * L'interface des slides « Declarer une interface » (section 1) et « Des
 * constantes, et des methodes utilitaires » (section 6) d'ITF.
 */
public interface Mesurable {

    double SEUIL = 0.001;   // public static final

    double mesure();

    static boolean negligeable(Mesurable m) {
        return m.mesure() < SEUIL;
    }
}
