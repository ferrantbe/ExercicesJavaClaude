package be.ephec.java.tab.e03;

/** TAB.3 — CORRIGE. Classe fournie, inchangee. */
public class Player {

    private final String prenom;
    private int points;

    public Player(String prenom) {
        this.prenom = prenom;
    }

    public String getPrenom() {
        return prenom;
    }

    public int getPoints() {
        return points;
    }

    public void ajouterUnPoint() {
        this.points++;
    }
}
