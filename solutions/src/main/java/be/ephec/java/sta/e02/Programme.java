package be.ephec.java.sta.e02;

/** STA.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Duree cours = Duree.deHeures(3).plus(Duree.deMinutes(35));
        Duree pause = Duree.deMinutes(15);

        System.out.println("Cours : " + cours);
        System.out.println("Pause : " + pause);
        System.out.println("Total : " + Duree.total(cours, pause, cours));
        System.out.println("Aucune duree : " + Duree.total());

        // new Duree(90);   // ne compile pas : le constructeur est prive.
        //
        // Ce que cela empeche : ecrire un nombre sans dire dans quelle
        // unite. C'est une contrainte, et c'est le but.
    }
}
