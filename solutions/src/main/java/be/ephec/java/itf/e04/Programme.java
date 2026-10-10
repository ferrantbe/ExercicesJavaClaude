package be.ephec.java.itf.e04;

/** ITF.4 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Magasin magasin = new Magasin();

        Client martin = new Client("Martin");
        Employe sophie = new Employe("Sophie");
        Prospect dupont = new Prospect("Dupont");

        magasin.abonner(martin);
        magasin.abonner(sophie);
        magasin.abonner(dupont);

        magasin.receptionne("grille-pain");

        // Un seul appel a receptionne, trois reactions differentes.
        ObservateurDeProduits[] tous = {martin, sophie, dupont};
        for (ObservateurDeProduits observateur : tous) {
            System.out.println(observateur.dernierMessage());
        }
    }
}
