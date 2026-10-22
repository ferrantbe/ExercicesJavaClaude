package be.ephec.java.demo.poo.slides;

/** Slide « Le probleme d'un champ public » (POO, section 3) : rien n'empeche une valeur absurde. */
public class LeProblemeDUnChampPublic {

    public static void main(String[] args) {
        LivreAChampsPublics dune = new LivreAChampsPublics();
        dune.titre = "Dune";
        dune.anneeDeParution = -3000;   // champ public : accepte sans broncher
        System.out.println(dune.titre + " paru en " + dune.anneeDeParution);
    }

    /* Sortie attendue :
    Dune paru en -3000
    */
}
