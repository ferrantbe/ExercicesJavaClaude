package be.ephec.java.gen.e04;

/**
 * GEN.4 — A COMPLETER.
 *
 * Le probleme a resoudre : ecrire UNE methode capable de traiter aussi bien
 * un Triplet<Personne> qu'un Triplet<Etudiant>.
 *
 * Vous constaterez qu'ecrire  Triplet<Personne>  en parametre ne suffit pas.
 * Un Etudiant est bien une Personne, mais un Triplet<Etudiant> n'est PAS un
 * Triplet<Personne> — les types generiques ne se comportent pas comme les
 * tableaux sur ce point.
 *
 * C'est ce que le JOKER resout :  Triplet<? extends Personne>  se lit
 * « un triplet de quelque chose qui est une Personne ».
 */
public class Affichage {

    /**
     * Retourne les noms des trois occupants, separes par ", " :
     *     "Ada, Alan, Grace"
     *
     * La methode doit accepter un Triplet<Personne> COMME un Triplet<Etudiant>.
     */
    public static String noms(Triplet<? extends Personne> triplet) {
        throw new UnsupportedOperationException("noms n'est pas encore implementee");
    }
}
