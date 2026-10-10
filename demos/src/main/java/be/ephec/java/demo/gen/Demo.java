package be.ephec.java.demo.gen;

/**
 * DEMO GEN — etat final.
 *
 * Ce qu'il faut regarder : plus aucun transtypage chez l'appelant, et la
 * ligne commentee qui ne compile plus. C'est tout le service rendu.
 */
public class Demo {

    public static void main(String[] args) {
        Pile<Integer> pile = new Pile<>();

        pile.empiler(10);
        pile.empiler(20);
        pile.empiler(30);

        // pile.empiler("trente");   // ne compile pas — et c'est le but

        int total = 0;
        while (pile.taille() > 0) {
            total += pile.depiler();   // aucun cast : depiler() rend un Integer
        }
        System.out.println("Total : " + total);

        // La meme classe, avec un autre type, sans une ligne de plus.
        Pile<String> mots = new Pile<>();
        mots.empiler("monde");
        mots.empiler("bonjour");
        System.out.println(mots.depiler() + " " + mots.depiler());
    }
}
