package be.ephec.java.exc.e05;

/**
 * EXC.5 — A COMPLETER.
 *
 * Lancez ProgrammeJdR, lisez la trace d'exception, et repondez.
 *
 * Une trace se lit DE HAUT EN BAS pour aller du lieu de l'erreur vers son
 * origine : la premiere ligne « at » indique ou l'exception a ete levee, les
 * suivantes remontent la chaine des appels jusqu'au main.
 *
 * C'est exactement la pile d'appels decrite en TEC-EXE.1 du memento
 * technique, affichee au moment ou tout s'arrete.
 */
public class Diagnostic {

    /** Le nom simple de l'exception levee, par exemple "NullPointerException". */
    public static String typeDException() {
        throw new UnsupportedOperationException("typeDException n'est pas encore implementee");
    }

    /** Le message de l'exception, tel qu'il apparait apres les deux points. */
    public static String messageDeLException() {
        throw new UnsupportedOperationException("messageDeLException n'est pas encore implementee");
    }

    /** Le nom simple de la classe ou l'exception a ete levee. */
    public static String classeFautive() {
        throw new UnsupportedOperationException("classeFautive n'est pas encore implementee");
    }

    /**
     * Le nom de la methode fautive, tel qu'il figure dans la trace.
     *
     * Attention : ce n'est pas forcement un nom que vous avez ecrit. Recopiez
     * exactement ce que dit la trace, y compris la ponctuation.
     */
    public static String methodeFautive() {
        throw new UnsupportedOperationException("methodeFautive n'est pas encore implementee");
    }

    /**
     * Le nom de la methode qui a APPELE le code fautif, sans les parentheses.
     * Ce n'est ni la premiere ni la derniere ligne de la trace.
     */
    public static String methodeAppelante() {
        throw new UnsupportedOperationException("methodeAppelante n'est pas encore implementee");
    }

    /**
     * Corrigez maintenant le defaut, sans toucher aux classes fournies :
     * retournez les degats par cible, ou 0 si le sort ne vise personne.
     *
     * Vous ne pouvez pas modifier Sort : traitez donc le probleme ici, la ou
     * vous avez la main.
     */
    public static int degatsParCibleSansPlanter(int degatsTotaux, int nombreDeCibles) {
        throw new UnsupportedOperationException(
                "degatsParCibleSansPlanter n'est pas encore implementee");
    }
}
