package be.ephec.java.demo.poo.slides;

/** Slide « Ce que le detour permet » (POO, section 3) : le setter refuse la valeur absurde. */
public class CeQueLeDetourPermet {

    public static void main(String[] args) {
        Livre dune = new Livre("Dune", 1965);
        try {
            dune.setAnneeDeParution(-3000);
        } catch (IllegalArgumentException e) {
            System.out.println("Refus : " + e.getMessage());
        }
        System.out.println("L'objet est intact : " + dune);
    }

    /* Sortie attendue :
    Refus : Annee invalide : -3000
    L'objet est intact : Dune (1965)
    */
}
