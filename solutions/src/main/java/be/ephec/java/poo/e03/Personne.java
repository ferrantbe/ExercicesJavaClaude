package be.ephec.java.poo.e03;

import java.time.LocalDate;

/**
 * POO.3 — CORRIGE.
 *
 * La question posee en POO.2 trouve ici sa reponse : le champ age ne merite
 * pas d'exister. Une donnee qui se deduit d'une autre ne se stocke pas, elle
 * se calcule — sinon les deux finissent par diverger.
 *
 * Aucune des trois options de POO.2 n'etait donc entierement satisfaisante.
 * Avec un setter, on pouvait ecrire un age incoherent. Sans setter, l'age
 * restait a 0. Sans accesseur du tout, le champ ne servait a rien. C'est que
 * le probleme n'etait pas dans les accesseurs : il etait dans le champ.
 */
public class Personne {

    private String nom;
    private String prenom;
    private int anneeDeNaissance;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        // "this.nom" designe le champ, "nom" tout court designe le parametre.
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public int getAnneeDeNaissance() {
        return anneeDeNaissance;
    }

    public void setAnneeDeNaissance(int anneeDeNaissance) {
        this.anneeDeNaissance = anneeDeNaissance;
    }

    public int computeAge(int annee) {
        return annee - anneeDeNaissance;
    }

    /**
     * getAge ne refait pas la soustraction : il delegue a computeAge.
     * Un seul endroit connait la regle de calcul, donc un seul endroit a
     * corriger le jour ou elle change.
     */
    public int getAge() {
        return computeAge(LocalDate.now().getYear());
    }

    public void display() {
        System.out.println(prenom + " " + nom + ", " + getAge() + " ans");
    }
}
