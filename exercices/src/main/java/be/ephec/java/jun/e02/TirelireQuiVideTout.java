package be.ephec.java.jun.e02;

/** JUN.2 — Cette classe vous est FOURNIE. Elle ne respecte PAS le contrat. */
public class TirelireQuiVideTout implements Tirelire {

    private double contenu = 0;

    @Override
    public void depot(double montant) {
        contenu += montant;
    }

    @Override
    public void retrait(double montant) throws ContenuInsuffisant {
        if (montant > contenu) {
            throw new ContenuInsuffisant("Contenu insuffisant");
        }
        contenu = 0;
    }

    @Override
    public double getContenu() {
        return contenu;
    }
}
