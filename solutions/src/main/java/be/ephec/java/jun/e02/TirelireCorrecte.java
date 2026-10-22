package be.ephec.java.jun.e02;

/** JUN.2 — CORRIGE. Fournie, inchangee : elle respecte le contrat. */
public class TirelireCorrecte implements Tirelire {

    private double contenu = 0;

    @Override
    public void depot(double montant) {
        contenu += montant;
    }

    @Override
    public void retrait(double montant) throws ContenuInsuffisant {
        if (montant > contenu) {
            throw new ContenuInsuffisant("Contenu de " + contenu
                    + ", retrait de " + montant + " impossible");
        }
        contenu -= montant;
    }

    @Override
    public double getContenu() {
        return contenu;
    }
}
