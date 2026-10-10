package be.ephec.java.poo.e01;

import java.time.LocalDate;

/** POO.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        // Aucun constructeur n'a ete declare : Java en fournit un sans
        // parametre, qui laisse tous les champs a leur valeur par defaut
        // (null pour un String, 0 pour un int).
        Personne personne = new Personne();

        personne.nom = "Lovelace";
        personne.prenom = "Ada";
        personne.anneeDeNaissance = 1815;

        // Le champ age doit etre rempli a la main. C'est la faiblesse de ce
        // modele : rien ne garantit que age et anneeDeNaissance restent
        // coherents. Il suffit d'oublier cette ligne.
        personne.age = personne.computeAge(LocalDate.now().getYear());

        System.out.println(personne.prenom + " " + personne.nom
                + " a " + personne.age + " ans");

        personne.display();
    }
}
