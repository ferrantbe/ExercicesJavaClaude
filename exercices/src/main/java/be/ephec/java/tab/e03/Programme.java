package be.ephec.java.tab.e03;

/** TAB.3 — Cette classe vous est FOURNIE. Lancez-la une fois vos deux methodes ecrites. */
public class Programme {

    public static void main(String[] args) {
        Player max = new Player("Max");
        Player paul = new Player("Paul");

        Player vainqueur = new Game(max, paul, 5).jouerEtRendreLeVainqueur();

        System.out.printf("%s %d - %s %d%n",
                max.getPrenom(), max.getPoints(), paul.getPrenom(), paul.getPoints());
        System.out.println("Et le gagnant est " + vainqueur.getPrenom());
    }
}
