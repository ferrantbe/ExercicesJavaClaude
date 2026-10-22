package be.ephec.java.poo.e04;

import java.time.LocalDate;

/**
 * POO.4 — Cette classe vous est FOURNIE, complete et fonctionnelle.
 *
 * C'est la Personne encapsulee de POO.3. Vous n'avez pas a la reecrire :
 * l'exercice porte sur la classe Hello. Vous pouvez toutefois comparer
 * cette version a la votre.
 */
public class Personne {

    private String nom;
    private String prenom;
    private int anneeDeNaissance;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
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

    public int getAge() {
        return computeAge(LocalDate.now().getYear());
    }

    public void display() {
        System.out.println(prenom + " " + nom + ", " + getAge() + " ans");
    }
}
