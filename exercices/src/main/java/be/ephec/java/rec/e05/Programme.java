package be.ephec.java.rec.e05;

/**
 * REC.5 — A COMPLETER.
 *
 * CET EXERCICE N'A PAS DE SQUELETTE, comme ABS.5 : a l'examen, vous
 * partirez d'un projet sans vos classes. Ici, vous partez de ce seul
 * fichier. Les classes sont a creer, dans ce package.
 *
 * Ce qu'il faut ecrire — les noms sont imposes, parce que la classe de
 * test les emploie :
 *
 *     CompteBancaire(String numero, String titulaire)   solde initial : 0
 *     String getNumero(), String getTitulaire(), double getSolde()
 *     void deposer(double montant)
 *     void retirer(double montant)
 *     String toString()     "BE01 - Ada Lovelace : 150.00 EUR"
 *                           (String.format avec Locale.US, pour le point)
 *
 *     MontantInvalideException     controlee ; levee par deposer et retirer
 *                                  si le montant est negatif ou nul
 *     SoldeInsuffisantException    controlee ; levee par retirer si le
 *                                  montant depasse le solde ; son message
 *                                  cite le solde et le montant demande
 *
 * Une operation refusee ne change pas le solde. A vous de decider ce que
 * chaque exception recoit en parametre, et comment le message se forme.
 *
 * LA CLASSE DE TEST VOUS EST FOURNIE, ENTIEREMENT EN COMMENTAIRE, dans
 * src/test/java, dans ce meme package : les classes qu'elle emploie
 * n'existent pas encore, et un fichier qui ne compile pas bloquerait tout
 * le module. Vous la decommenterez quand vos classes seront ecrites.
 */
public class Programme {

    public static void main(String[] args) {
        // TODO : ouvrez un compte, deposez, retirez, affichez le compte
        //        apres chaque operation, puis provoquez les deux exceptions
        //        et affichez leurs messages.
    }
}
