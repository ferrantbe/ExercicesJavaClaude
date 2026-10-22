package be.ephec.java.pkg.e03;

/** PKG.3 — CORRIGE. Classe fournie, inchangee. */
public class Programme {

    public static void main(String[] args) {
        Deck deck = new Deck();
        deck.preparer();

        System.out.println("Premiere carte : " + deck.piocher());
        System.out.println("Restantes : " + deck.cartesRestantes());
    }
}
