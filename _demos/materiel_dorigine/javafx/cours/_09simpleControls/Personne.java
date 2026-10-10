package _09simpleControls;

public class Personne {

    private final String nom;
    private final String prenom;
    private final char sex;
    private boolean en, fr, nl;

    public Personne(String nom, String prenom, char sex, boolean en, boolean fr, boolean nl) {
        this.nom = nom;
        this.prenom = prenom;
        this.sex = sex;
        this.en = en;
        this.nl = nl;
        this.fr = fr;
    }

    @Override
    public String toString() {
        return nom.toUpperCase() + " "+ prenom + " ("+ sex + ") [" + (en?"EN":"  ")+(fr?"FR":"  ") + (nl?"NL":"  ")+"]" ;
    }
}
