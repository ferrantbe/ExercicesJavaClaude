package be.ephec.java.demo.poo;

/**
 * DEMO POO — etat final de la demonstration du cours.
 *
 * Cette classe est le point d'ARRIVEE d'une construction faite en direct
 * pendant la seance. On y est parti d'une classe vide, avec des champs
 * publics, et on l'a fermee pas a pas.
 *
 * Ce qu'il faut regarder en la relisant :
 *   Livre n'expose aucun champ, et pourtant on peut tout faire ;
 *   la verification de l'annee est DANS le setter, seul endroit possible ;
 *   l'age n'est pas un champ, c'est un calcul.
 */
public class Demo {

    public static void main(String[] args) {
        Livre livre = new Livre("Clean Code", "Robert C. Martin", 2008);

        System.out.println(livre.decrire());
        System.out.println("Age du livre en 2027 : " + livre.ageEn(2027) + " ans");

        // Avec des champs publics, cette annee absurde passait sans broncher.
        try {
            livre.setAnneeDeParution(-3000);
        } catch (IllegalArgumentException refus) {
            System.out.println("Refuse : " + refus.getMessage());
        }
    }
}
