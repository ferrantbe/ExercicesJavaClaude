package be.ephec.java.poo.e02;

/** POO.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Personne personne = new Personne();

        personne.setNom("Lovelace");
        personne.setPrenom("Ada");
        personne.setAnneeDeNaissance(1815);

        // Il n'existe pas de setAge : impossible de renseigner l'age.
        // getAge() rend donc 0, la valeur par defaut d'un int.
        System.out.println(personne.getPrenom() + " " + personne.getNom()
                + " a " + personne.getAge() + " ans");

        // computeAge, lui, sait repondre — parce qu'il calcule.
        System.out.println("Calcule pour 2027 : " + personne.computeAge(2027) + " ans");

        personne.display();
    }
}
