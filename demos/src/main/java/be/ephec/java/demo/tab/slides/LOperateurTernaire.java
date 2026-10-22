package be.ephec.java.demo.tab.slides;

/**
 * Slides « La syntaxe » et « Ce qu'un if ne permet pas » (TAB, section 4).
 *
 * Le ternaire est une expression : il a une valeur, qu'on peut retourner ou
 * ranger dans une variable. Un if est une instruction : il n'en a pas.
 */
public class LOperateurTernaire {

    public static int max(int a, int b) {
        return a > b ? a : b;
    }

    public static void main(String[] args) {
        System.out.println(max(3, 8));
        int a = 12, b = 5;
        int plusGrand = a > b ? a : b;      // possible
        // int plusGrand = if (a > b) a; ...   // n'existe pas
        System.out.println(plusGrand);
        System.out.println(a + " est " + (a % 2 == 0 ? "pair" : "impair"));
    }

    /* Sortie attendue :
    8
    12
    12 est pair
    */
}
