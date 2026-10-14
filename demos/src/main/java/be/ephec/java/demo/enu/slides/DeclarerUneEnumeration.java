package be.ephec.java.demo.enu.slides;

/**
 * Slides « Declarer une enumeration », « L'ordre de declaration des valeurs
 * compte », « Pour passer a la valeur suivante » et « Comparer deux valeurs »
 * (ENU, sections 2 et 3).
 */
public class DeclarerUneEnumeration {

    public static void main(String[] args) {
        CouleurDeFeu couleur = CouleurDeFeu.VERT;
        couleur = CouleurDeFeu.ROUGE;   // d'accord
        // couleur = 7;                 // refus a la compilation
        System.out.println(couleur);

        System.out.println(CouleurDeFeu.VERT.ordinal());      // 0
        System.out.println(CouleurDeFeu.ROUGE.ordinal());     // 2
        System.out.println(CouleurDeFeu.values().length);     // 3

        CouleurDeFeu[] cycle = CouleurDeFeu.values();
        int suivante = (couleur.ordinal() + 1) % cycle.length;
        couleur = cycle[suivante];
        System.out.println("Apres ROUGE : " + couleur);

        if (couleur == CouleurDeFeu.VERT) {
            System.out.println("Passez");
        }
    }

    /* Sortie attendue :
    ROUGE
    0
    2
    3
    Apres ROUGE : VERT
    Passez
    */
}
