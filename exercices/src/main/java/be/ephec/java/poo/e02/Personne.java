package be.ephec.java.poo.e02;

/**
 * POO.2 — A COMPLETER.
 *
 * La meme classe qu'en POO.1, mais encapsulee : plus aucun champ n'est
 * accessible depuis l'exterieur.
 *
 * Le champ age, lui, vous pose une question a laquelle vous devez repondre.
 * Lisez l'enonce avant de coder.
 */
public class Personne {

    // TODO : declarez ici les quatre champs, en private :
    //          nom              (String)
    //          prenom           (String)
    //          anneeDeNaissance (int)
    //          age              (int)

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

    // TODO : le champ age. Trois possibilites, et c'est a vous de trancher :
    //          - un getter ET un setter, comme pour les autres champs ;
    //          - un getter seul ;
    //          - ni l'un ni l'autre.
    //        Chacune a une consequence : relisez l'enonce, choisissez,
    //        et notez votre raisonnement en une ou deux phrases.
    //        Aucun test ne verifie votre choix : les trois passent au vert.

    /**
     * Calcule l'age de la personne a l'annee donnee.
     *
     * @param annee l'annee a laquelle on veut connaitre l'age
     * @return annee moins l'annee de naissance
     */
    public int computeAge(int annee) {
        throw new UnsupportedOperationException("computeAge n'est pas encore implementee");
    }

    /** Affiche les proprietes de la personne sur la console. Format libre. */
    public void display() {
        throw new UnsupportedOperationException("display n'est pas encore implementee");
    }
}
