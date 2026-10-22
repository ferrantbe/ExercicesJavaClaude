package be.ephec.java.pkg.e05.derive;

import be.ephec.java.pkg.e05.base.Capteur;

import java.util.Locale;

/**
 * PKG.5 — CORRIGE.
 *
 * CE QUE CETTE CLASSE PEUT ATTEINDRE, et c'est tout l'exercice :
 *
 *   nom               public, donc oui ;
 *   derniereMesure    protected, et cette classe HERITE : donc oui,
 *                     malgre le changement de package ;
 *   numeroDeSerie     private : non, et l'heritage n'y change rien.
 *
 * Le message du compilateur sur la troisieme ligne est explicite :
 *
 *     numeroDeSerie has private access in Capteur
 *
 * LA LECON. protected est la seule visibilite dont la portee ne se decrit
 * pas par un perimetre. public, private et la visibilite de package
 * dessinent des cercles ; protected suit les liens d'heritage, ou qu'ils
 * mènent. C'est pourquoi il ne pouvait pas etre presente avant ABS.
 */
public class CapteurMoyenne extends Capteur {

    public CapteurMoyenne(String nom, String numeroDeSerie) {
        super(nom, numeroDeSerie);
    }

    /**
     * L'acces DIRECT au champ protected, depuis un autre package.
     *
     * On aurait pu ecrire  mesurer((valeur + lire()) / 2)  et se passer de
     * protected. Ce serait meme preferable : moins la sous-classe touche
     * aux champs de sa mere, moins elle en depend. Voir CC-OBJ.2.
     *
     * L'exercice demande l'acces direct pour le rendre visible ; la vie
     * reelle demande souvent le contraire.
     */
    public void lisser(double valeur) {
        derniereMesure = (derniereMesure + valeur) / 2;
    }

    public String decrire() {
        // numeroDeSerie est inaccessible ; identifiantCourt() est publique.
        return String.format(Locale.US, "%s (%s) : %.2f",
                nom, identifiantCourt(), lire());
    }
}
