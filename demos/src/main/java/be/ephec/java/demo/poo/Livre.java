package be.ephec.java.demo.poo;

/**
 * DEMO POO — etat final de la classe construite en direct.
 *
 * Au depart, les trois champs etaient publics, il n'y avait aucun
 * accesseur, et l'annee -3000 passait sans broncher.
 */
public class Livre {

    private final String titre;
    private final String auteur;
    private int anneeDeParution;

    public Livre(String titre, String auteur, int anneeDeParution) {
        this.titre = titre;
        this.auteur = auteur;
        setAnneeDeParution(anneeDeParution);
    }

    public String getTitre() {
        return titre;
    }

    public String getAuteur() {
        return auteur;
    }

    public int getAnneeDeParution() {
        return anneeDeParution;
    }

    /**
     * C'est ici, et nulle part ailleurs, qu'on peut poser une regle.
     * Un champ public ne l'aurait jamais permis.
     */
    public void setAnneeDeParution(int anneeDeParution) {
        if (anneeDeParution < 1450) {
            throw new IllegalArgumentException(
                    "Gutenberg n'avait pas encore imprime : " + anneeDeParution);
        }
        this.anneeDeParution = anneeDeParution;
    }

    /**
     * L'age n'est pas un champ. Le stocker obligerait a le mettre a jour
     * chaque annee, et personne ne le ferait.
     */
    public int ageEn(int annee) {
        return annee - anneeDeParution;
    }

    public String decrire() {
        return titre + ", " + auteur + " (" + anneeDeParution + ")";
    }
}
