package be.ephec.java.demo.poo.slides;

import java.time.LocalDate;

/** Slide « Methodes de classe » (POO, section 4) : on les appelle sur la classe, sans objet. */
public class MethodesDeClasse {

    public static void main(String[] args) {
        double racine = Math.sqrt(16);
        int annee = LocalDate.now().getYear();
        System.out.println("Racine de 16 : " + racine);
        System.out.println("Annee : " + annee);
    }

    /* Sortie attendue :
    Racine de 16 : 4.0
    ~Annee : \d{4}
    */
}
