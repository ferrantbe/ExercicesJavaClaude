package be.ephec.java.jun.e02;

/**
 * JUN.2 — Cette interface vous est FOURNIE.
 *
 * Le contrat d'une tirelire, en trois methodes. Quatre classes l'implementent
 * dans ce package : une seule le respecte.
 */
public interface Tirelire {

    /** Ajoute un montant au contenu. */
    void depot(double montant);

    /**
     * Retire un montant.
     *
     * @throws ContenuInsuffisant si le montant demande depasse le contenu ;
     *                            dans ce cas le contenu ne change pas
     */
    void retrait(double montant) throws ContenuInsuffisant;

    /** Retourne le contenu courant. */
    double getContenu();
}
