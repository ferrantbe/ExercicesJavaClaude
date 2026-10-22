package be.ephec.java.fic.e01;

/** FIC.1 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Enseignant turing = new Enseignant("Turing", "Alan");
        Enseignant hopper = new Enseignant("Hopper", "Grace");

        Cours java = new Cours("Java", turing);
        Cours algebre = new Cours("Algebre", turing);
        Cours compilation = new Cours("Compilation", hopper);

        Etudiant ada = new Etudiant("Lovelace", "Ada");
        ada.inscrire(java);
        ada.inscrire(algebre);
        ada.inscrire(compilation);

        Etudiant charles = new Etudiant("Babbage", "Charles");
        charles.inscrire(java);

        System.out.println(ada);
        System.out.println(charles);

        ada.desinscrire(algebre);
        System.out.println("Apres desinscription : " + ada);

        // Le charge de cours peut changer sans que les inscriptions bougent.
        java.setChargeDeCours(hopper);
        System.out.println("Le cours de Java : " + java);
    }
}
