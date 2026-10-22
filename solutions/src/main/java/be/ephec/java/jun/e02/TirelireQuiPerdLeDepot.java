package be.ephec.java.jun.e02;

/** JUN.2 — CORRIGE. Fournie, inchangee : elle ne respecte PAS le contrat. */
public class TirelireQuiPerdLeDepot implements Tirelire {

    private double contenu = 0;
    private boolean premierDepot = true;

    @Override
    public void depot(double montant) {
        if (premierDepot) {
            premierDepot = false;
            return;
        }
        contenu += montant;
    }

    @Override
    public void retrait(double montant) throws ContenuInsuffisant {
        if (montant > contenu) {
            throw new ContenuInsuffisant("Contenu insuffisant");
        }
        contenu -= montant;
    }

    @Override
    public double getContenu() {
        return contenu;
    }
}
