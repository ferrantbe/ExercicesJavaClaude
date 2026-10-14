package be.ephec.java.demo.poo.slides;

/**
 * Slide « Deux noms, un seul objet » (POO, section 6).
 *
 * Copier un int copie la valeur ; copier une reference copie l'adresse :
 * l1 et l2 designent le meme livre.
 */
public class DeuxNomsUnSeulObjet {

    public static void main(String[] args) {
        int a = 5;
        int b = a;
        b = 7;                                       // a vaut toujours 5
        System.out.println("a = " + a + ", b = " + b);

        Livre l1 = new Livre("Dune", 1965);
        Livre l2 = l1;                               // l2 designe le MEME objet
        l2.setAnneeDeParution(1966);
        System.out.println(l1.getAnneeDeParution()); // 1966
    }

    /* Sortie attendue :
    a = 5, b = 7
    1966
    */
}
