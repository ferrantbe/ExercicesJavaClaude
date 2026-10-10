package be.ephec.java.gen.e05;

/**
 * GEN.5 — CORRIGE.
 *
 * Le <T> se place entre les modificateurs et le type de retour. Il declare
 * que la methode est generique, independamment de sa classe — laquelle ne
 * l'est pas du tout ici.
 *
 * Remarquez que la methode ne fait rien de T sinon appeler son toString. Elle
 * aurait donc pu prendre un Object en parametre et fonctionner tout autant.
 * C'est un point honnete a signaler : la genericite n'apporte ici presque
 * rien, parce que le type de retour ne depend pas de T.
 *
 * Elle prend tout son sens quand le type de retour, lui, dependrait de T :
 *
 *     public static <T> T premier(List<T> liste)
 *
 * Ici, l'appelant recupere un T, pas un Object, et n'a aucun transtypage a
 * ecrire. C'est la que la difference se voit.
 */
public class UtilGenerique {

    public static <T> String otGnirts(T objet) {
        // String.valueOf plutot que objet.toString() : il gere le cas ou
        // l'objet vaut null, ou toString() planterait.
        return new StringBuilder(String.valueOf(objet)).reverse().toString();
    }
}
