package be.ephec.java.gen.e04;

/**
 * GEN.4 — CORRIGE.
 *
 * Le point de l'exercice, et il surprend tout le monde :
 *
 *     un Etudiant EST une Personne
 *     mais un Triplet<Etudiant> N'EST PAS un Triplet<Personne>
 *
 * Ecrire  noms(Triplet<Personne> triplet)  compile tres bien, mais refuse
 * qu'on lui passe un Triplet<Etudiant>. C'est deroutant, et c'est voulu.
 *
 * La raison : si un Triplet<Etudiant> etait acceptable la ou l'on attend un
 * Triplet<Personne>, rien n'empecherait la methode d'y ranger une Personne
 * ordinaire. Le triplet contiendrait alors une Personne alors que son
 * proprietaire le croit rempli d'Etudiants — et le probleme n'apparaitrait
 * qu'a la lecture suivante, ailleurs.
 *
 * Java interdit donc la substitution, et offre le JOKER pour les cas ou l'on
 * se contente de LIRE :
 *
 *     Triplet<? extends Personne>   « un triplet de quelque chose qui est une
 *                                     Personne »
 *
 * On peut lire ce triplet — tout ce qu'il contient est au moins une Personne.
 * On ne peut rien y ecrire, et c'est precisement ce qui rend la lecture sure.
 *
 * Les tableaux, eux, autorisent cette substitution : Etudiant[] passe la ou
 * l'on attend Personne[]. Le prix a payer est que l'erreur n'apparait qu'a
 * l'execution, sous la forme d'une ArrayStoreException.
 */
public class Affichage {

    public static String noms(Triplet<? extends Personne> triplet) {
        return String.join(", ",
                triplet.getPremier().getNom(),
                triplet.getSecond().getNom(),
                triplet.getTroisieme().getNom());
    }
}
