package be.ephec.java.poo.e03;

/** POO.3 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Personne personne = new Personne();

        personne.setNom("Lovelace");
        personne.setPrenom("Ada");
        personne.setAnneeDeNaissance(1815);

        // L'age n'a jamais ete renseigne, et il est pourtant juste.
        // Comparez avec POO.2, ou le meme programme affichait 0.
        System.out.println(personne.getPrenom() + " " + personne.getNom()
                + " a " + personne.getAge() + " ans");

        // computeAge reste disponible pour interroger une autre annee.
        System.out.println("En 2040, elle aurait eu "
                + personne.computeAge(2040) + " ans");

        personne.display();
    }
}
