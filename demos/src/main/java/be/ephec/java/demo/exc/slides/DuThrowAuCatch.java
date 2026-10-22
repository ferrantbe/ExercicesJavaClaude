package be.ephec.java.demo.exc.slides;

/**
 * Slide « Du throw au catch » (EXC, section 1).
 *
 * Le meme trajet que dans ElleRemonteLaPile, mais le main entoure l'appel
 * d'un try : l'exception s'arrete dans son catch, et le programme continue.
 */
public class DuThrowAuCatch {

    public static void main(String[] args) {
        Ascenseur ascenseur = new Ascenseur(5);
        try {
            ascenseur.monter(12);
        } catch (IllegalArgumentException e) {
            System.out.println("Traitee dans main : " + e.getMessage());
        }
        System.out.println("Le programme continue");
    }

    /* Sortie attendue :
    Traitee dans main : Etage 12 au-dela du dernier, 5
    Le programme continue
    */
}
