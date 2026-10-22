package be.ephec.java.tab.e03;

/** TAB.3 — Cette classe vous est FOURNIE. */
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
