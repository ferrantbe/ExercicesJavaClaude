package be.ephec.java.demo.col.slides;

import java.util.ArrayList;
import java.util.List;

/**
 * Slides « Une methode qui recoit un critere » et « Ecrire le critere dans une
 * classe » (COL, section 5). removeIf parcourt la liste et demande a TitreLong,
 * pour chaque titre, s'il faut le retirer.
 */
public class UneMethodeQuiRecoitUnCritere {

    public static void main(String[] args) {
        List<String> titres = new ArrayList<>(List.of(
                "Nana", "Les Rougon-Macquart, tome premier", "Germinal", "Le Ventre de Paris et autres recits"));
        titres.removeIf(new TitreLong());
        System.out.println(titres);
    }

    /* Sortie attendue :
    [Nana, Germinal]
    */
}
