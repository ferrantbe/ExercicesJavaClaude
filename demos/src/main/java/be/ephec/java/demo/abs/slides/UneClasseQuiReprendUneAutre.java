package be.ephec.java.demo.abs.slides;

/**
 * Slides 1 a 4 de la section « L'heritage en Java » (ABS).
 *
 * CompteEpargne recoit deposer et getSolde de sa mere, y ajoute ses interets,
 * et redefinit deposer pour journaliser chaque depot. Remarquez que les
 * interets passent eux aussi par le journal : crediterInterets appelle
 * deposer, et c'est la version redefinie qui repond.
 */
public class UneClasseQuiReprendUneAutre {

    public static void main(String[] args) {
        CompteEpargne livret = new CompteEpargne(1234, 0.02);
        livret.deposer(1000);
        livret.crediterInterets();
        System.out.println("Solde : " + livret.getSolde());
    }

    /* Sortie attendue :
    Compte 1234 : depot de 1000.0
    Compte 1234 : depot de 20.0
    Solde : 1020.0
    */
}
