package be.ephec.java.fic.e01;

/**
 * FIC.1 — A COMPLETER.
 *
 * Un cours a un intitule et un charge de cours. L'intitule ne change pas ;
 * le charge de cours, si.
 */
public class Cours {

    // TODO : declarez les deux champs

    /** Le constructeur est declare : completez son corps. */
    public Cours(String intitule, Enseignant chargeDeCours) {
        throw new UnsupportedOperationException("le constructeur n'est pas encore implemente");
    }

    public String getIntitule() {
        throw new UnsupportedOperationException("getIntitule n'est pas encore implementee");
    }

    public Enseignant getChargeDeCours() {
        throw new UnsupportedOperationException("getChargeDeCours n'est pas encore implementee");
    }

    /** Le charge de cours peut changer d'une annee a l'autre. */
    public void setChargeDeCours(Enseignant chargeDeCours) {
        throw new UnsupportedOperationException("setChargeDeCours n'est pas encore implementee");
    }

    /** Rend "Java (Alan Turing)" : l'intitule, puis le charge entre parentheses. */
    @Override
    public String toString() {
        throw new UnsupportedOperationException("toString n'est pas encore implementee");
    }
}
