package be.ephec.java.demo.itf.slides;

/**
 * Slide « Des constantes, et des methodes utilitaires » (ITF, section 6).
 *
 * SEUIL est une constante de l'interface ; negligeable s'appelle sur
 * l'interface elle-meme, comme une methode de classe.
 */
public class DesConstantesEtDesMethodesUtilitaires {

    public static void main(String[] args) {
        System.out.println("Seuil : " + Mesurable.SEUIL);
        System.out.println(Mesurable.negligeable(new Colis(0.0005)));
        System.out.println(Mesurable.negligeable(new Colis(1250)));
    }

    /* Sortie attendue :
    Seuil : 0.001
    true
    false
    */
}
