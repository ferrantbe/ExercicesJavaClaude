package be.ephec.java.demo.sta;

/**
 * DEMO STA — etat final.
 *
 * Trois usages de static, et trois raisons differentes.
 *
 *   TVA          une CONSTANTE : la meme valeur pour tout le monde, et
 *                elle ne changera pas. final en plus de static.
 *
 *   construites  un ETAT PARTAGE : il n'appartient a aucune voiture en
 *                particulier, il appartient a la classe. C'est ce qui
 *                permet de numeroter sans que l'appelant s'en occupe.
 *
 *   nombreConstruites  une METHODE de classe : elle repond a une question
 *                sur l'ensemble, pas sur un exemplaire. On l'appelle sur
 *                la classe, pas sur un objet.
 */
public class Voiture {

    /** Une constante : majuscules, static et final. */
    public static final double TVA = 0.21;

    /** Partage par toutes les voitures. Une seule case en memoire. */
    private static int construites = 0;

    private final String modele;
    private final double prixHorsTva;
    private final int numero;

    public Voiture(String modele, double prixHorsTva) {
        this.modele = modele;
        this.prixHorsTva = prixHorsTva;

        // Le compteur avance a chaque construction, sans que personne
        // n'ait a y penser.
        construites++;
        this.numero = construites;
    }

    public int getNumero() {
        return numero;
    }

    public double prixTvac() {
        return prixHorsTva * (1 + TVA);
    }

    public String decrire() {
        return String.format(java.util.Locale.US,
                "Voiture n%d : %s, %.2f TVAC", numero, modele, prixTvac());
    }

    /**
     * Une methode statique ne peut pas utiliser this : elle n'est appelee
     * sur aucun objet. Essayez d'ecrire  return this.numero;  ici, et
     * lisez ce que dit le compilateur.
     */
    public static int nombreConstruites() {
        return construites;
    }
}
