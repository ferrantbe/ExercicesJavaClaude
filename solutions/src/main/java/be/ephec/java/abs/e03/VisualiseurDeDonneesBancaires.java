package be.ephec.java.abs.e03;

/**
 * ABS.3 — CORRIGE. Fournie, inchangee.
 *
 * Elle porte tout ce qui ne depend pas de la banque : convertir les lignes
 * brutes en mouvements, additionner, et mettre en forme le rapport.
 *
 * Ce qui depend de la banque est laisse abstrait : d'ou viennent les donnees,
 * et comment se lit une ligne.
 */
public abstract class VisualiseurDeDonneesBancaires {


    /** Les lignes brutes, telles que la banque les fournit. */
    protected abstract String[][] donneesBrutes();

    /** Le nom de la banque, tel qu'il apparaitra dans le rapport. */
    protected abstract String nomDeLaBanque();

    /** Convertit UNE ligne brute en mouvement, selon l'ordre propre a la banque. */
    protected abstract Mouvement versMouvement(String[] ligne);

    /** Rend tous les mouvements, convertis. */
    public Mouvement[] mouvements() {
        String[][] brutes = donneesBrutes();
        Mouvement[] mouvements = new Mouvement[brutes.length];
        for (int i = 0; i < brutes.length; i++) {
            mouvements[i] = versMouvement(brutes[i]);
        }
        return mouvements;
    }

    /** Rend la somme des montants. */
    public double total() {
        double total = 0;
        for (Mouvement mouvement : mouvements()) {
            total += mouvement.montant();
        }
        return total;
    }

    /** Rend le rapport, une ligne par mouvement, precede du nom de la banque. */
    public String rapport() {
        StringBuilder texte = new StringBuilder(nomDeLaBanque());
        for (Mouvement mouvement : mouvements()) {
            texte.append('\n').append(String.format(java.util.Locale.US,
                    "  %s  %10.2f  %s",
                    mouvement.numeroDeCompte(), mouvement.montant(), mouvement.communication()));
        }
        return texte.toString();
    }
}
