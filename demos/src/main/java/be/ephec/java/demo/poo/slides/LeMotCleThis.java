package be.ephec.java.demo.poo.slides;

/**
 * Slide « Le mot-cle this » (POO, section 2).
 *
 * Sans this, le parametre se recoit lui-meme, et le champ garde sa valeur
 * par defaut : null.
 */
public class LeMotCleThis {

    static class AvecThis {
        private String titre;

        AvecThis(String titre) {
            this.titre = titre;   // le champ recoit le parametre
        }
    }

    static class SansThis {
        private String titre;

        SansThis(String titre) {
            titre = titre;        // le parametre recoit... lui-meme
        }
    }

    public static void main(String[] args) {
        System.out.println("Avec this : " + new AvecThis("Dune").titre);
        System.out.println("Sans this : " + new SansThis("Dune").titre);
    }

    /* Sortie attendue :
    Avec this : Dune
    Sans this : null
    */
}
