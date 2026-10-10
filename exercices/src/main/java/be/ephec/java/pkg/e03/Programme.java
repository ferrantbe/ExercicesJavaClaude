package be.ephec.java.pkg.e03;

/**
 * PKG.3 — Cette classe vous est FOURNIE. Ne la modifiez pas.
 *
 * Elle definit ce dont un utilisateur du Deck a reellement besoin.
 * Tout le reste peut cesser d'etre public.
 */
public class Programme {

    public static void main(String[] args) {
        Deck deck = new Deck();
        deck.preparer();

        System.out.println("Premiere carte : " + deck.piocher());
        System.out.println("Restantes : " + deck.cartesRestantes());
    }
}
