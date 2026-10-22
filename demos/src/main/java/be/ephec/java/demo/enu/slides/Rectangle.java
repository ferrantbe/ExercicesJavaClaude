package be.ephec.java.demo.enu.slides;

/** Slides « Ajouter une methode » et « Valider a la construction » (ENU, section 7). */
public record Rectangle(int largeur, int hauteur) {

    public Rectangle {
        if (largeur <= 0 || hauteur <= 0) {
            throw new IllegalArgumentException("dimensions positives");
        }
    }

    public int aire() {
        return largeur * hauteur;
    }
}
