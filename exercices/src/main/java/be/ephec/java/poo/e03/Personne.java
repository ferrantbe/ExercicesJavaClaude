package be.ephec.java.poo.e03;

/**
 * POO.3 — A COMPLETER.
 *
 * Repartez de votre Personne de POO.2, et repondez pour de bon a la question
 * qui y etait posee : le champ age disparait, et l'age se calcule.
 */
public class Personne {

    // TODO : declarez ici les TROIS champs, en private :
    //          nom              (String)
    //          prenom           (String)
    //          anneeDeNaissance (int)
    //        Plus de champ age.

    // Les accesseurs ci-dessous sont deja DECLARES : completez leur corps.
    // Ne les regenerez pas avec Alt+Inser, vous obtiendriez des doublons.

    public String getNom() {
        throw new UnsupportedOperationException("getNom n'est pas encore implementee");
    }

    public void setNom(String nom) {
        throw new UnsupportedOperationException("setNom n'est pas encore implementee");
    }

    public String getPrenom() {
        throw new UnsupportedOperationException("getPrenom n'est pas encore implementee");
    }

    public void setPrenom(String prenom) {
        throw new UnsupportedOperationException("setPrenom n'est pas encore implementee");
    }

    public int getAnneeDeNaissance() {
        throw new UnsupportedOperationException("getAnneeDeNaissance n'est pas encore implementee");
    }

    public void setAnneeDeNaissance(int anneeDeNaissance) {
        throw new UnsupportedOperationException("setAnneeDeNaissance n'est pas encore implementee");
    }

    /**
     * Inchangee depuis POO.2 : l'age a l'annee passee en parametre.
     *
     * @param annee l'annee a laquelle on veut connaitre l'age
     * @return annee moins l'annee de naissance
     */
    public int computeAge(int annee) {
        throw new UnsupportedOperationException("computeAge n'est pas encore implementee");
    }

    /**
     * L'age de la personne aujourd'hui.
     *
     * Cette methode ne refait pas le calcul : elle appelle computeAge en lui
     * passant l'annee courante, obtenue par LocalDate.now().getYear()
     * (import java.time.LocalDate).
     *
     * @return l'age a l'annee courante
     */
    public int getAge() {
        throw new UnsupportedOperationException("getAge n'est pas encore implementee");
    }

    /** Affiche les proprietes de la personne sur la console. Format libre. */
    public void display() {
        throw new UnsupportedOperationException("display n'est pas encore implementee");
    }
}
