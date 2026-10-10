package be.ephec.java.pkg.e05.derive;

import be.ephec.java.pkg.e05.base.Capteur;

/**
 * PKG.5 — A COMPLETER.
 *
 * Une sous-classe de Capteur, dans un AUTRE package. Elle lisse les
 * mesures : chaque nouvelle valeur compte pour moitie, l'ancienne pour
 * l'autre moitie.
 *
 * L'INTERET DE L'EXERCICE est dans ce que vous pouvez atteindre.
 * Essayez, dans lisser(), d'ecrire chacune de ces trois lignes :
 *
 *     numeroDeSerie          private
 *     derniereMesure         protected
 *     nom                    public
 *
 * Deux passent, une est refusee. Notez laquelle, et le message exact.
 */
public class CapteurMoyenne extends Capteur {

    public CapteurMoyenne(String nom, String numeroDeSerie) {
        super(nom, numeroDeSerie);
    }

    /**
     * Enregistre une mesure lissee : la moyenne de la nouvelle valeur et
     * de la precedente.
     *
     * Ecrivez-la en accedant DIRECTEMENT au champ protected, sans passer
     * par lire() ni par mesurer(). C'est ce que protected autorise, et
     * c'est tout l'objet de l'exercice.
     */
    public void lisser(double valeur) {
        throw new UnsupportedOperationException("lisser n'est pas encore implementee");
    }

    /**
     * Rend "Thermometre (4f2a) : 21.50", au format US.
     *
     * Le numero de serie est private : vous ne pouvez pas l'atteindre,
     * meme en heritant. Une methode publique de la classe mere vous le
     * donne sous une forme acceptable — trouvez-la.
     */
    public String decrire() {
        throw new UnsupportedOperationException("decrire n'est pas encore implementee");
    }
}
