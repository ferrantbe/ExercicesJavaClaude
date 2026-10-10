package be.ephec.java.exc.e05;

/**
 * EXC.5 — CORRIGE.
 *
 * La trace produite est celle-ci :
 *
 *   Exception in thread "main" java.lang.ArithmeticException: / by zero
 *       at be.ephec.java.exc.e05.Sort.<init>(Sort.java:16)
 *       at be.ephec.java.exc.e05.Joueur.lanceUnSort(Joueur.java:6)
 *       at be.ephec.java.exc.e05.Partie.joueUnTour(Partie.java:15)
 *       at be.ephec.java.exc.e05.Partie.demarre(Partie.java:10)
 *       at be.ephec.java.exc.e05.ProgrammeJdR.main(ProgrammeJdR.java:12)
 *
 * Comment la lire :
 *
 *   La PREMIERE ligne donne le type de l'exception et son message. Ici le
 *   message « / by zero » dit tout : une division entiere par zero.
 *
 *   La premiere ligne « at » dit OU l'erreur s'est produite. Les suivantes
 *   remontent la chaine des appels ; la derniere est toujours le point
 *   d'entree du programme.
 *
 *   L'erreur est donc dans Sort, mais la CAUSE est ailleurs : c'est
 *   joueUnTour qui a demande un sort sur zero cible. Une trace sert autant a
 *   trouver le coupable qu'a remonter jusqu'a celui qui l'a mis en position
 *   de faillir.
 *
 *   Le numero de ligne entre parentheses vous amene directement au bon
 *   endroit : dans IntelliJ, il est cliquable.
 */
public class Diagnostic {

    public static String typeDException() {
        return "ArithmeticException";
    }

    public static String messageDeLException() {
        return "/ by zero";
    }

    public static String classeFautive() {
        return "Sort";
    }

    /**
     * Un constructeur n'apparait jamais sous le nom de sa classe dans une
     * trace : la JVM le designe par <init>. De meme, un bloc statique
     * apparait sous le nom <clinit>. C'est deroutant la premiere fois, et
     * c'est un indice precieux — la faute est dans une construction d'objet.
     */
    public static String methodeFautive() {
        return "<init>";
    }

    public static String methodeAppelante() {
        return "lanceUnSort";
    }

    /**
     * On ne peut pas modifier Sort, mais on peut ne pas l'appeler pour rien.
     * Le test precede l'appel : c'est ce qu'on appelle une garde.
     *
     * Traiter le probleme par un try/catch autour de new Sort(...) aurait
     * aussi « marche », mais utiliser une exception pour un cas parfaitement
     * previsible revient a se servir d'un signal d'alarme comme d'un
     * interrupteur.
     */
    public static int degatsParCibleSansPlanter(int degatsTotaux, int nombreDeCibles) {
        if (nombreDeCibles == 0) {
            return 0;
        }
        return new Sort(degatsTotaux, nombreDeCibles).getDegatsParCible();
    }
}
