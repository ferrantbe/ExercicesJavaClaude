package be.ephec.java.sta.e01;

/**
 * STA.1 — CORRIGE.
 *
 * TROIS USAGES DE static, ET TROIS RAISONS DIFFERENTES.
 *
 *   PLACES_MAX      une CONSTANTE. static parce que la valeur est la meme
 *                   pour tous, final parce qu'elle ne changera pas. Les
 *                   deux mots disent deux choses distinctes.
 *
 *   emises          un ETAT PARTAGE. Il n'appartient a aucune reservation,
 *                   il appartient a la classe. C'est ce qui permet de
 *                   numeroter sans que l'appelant s'en occupe.
 *
 *   nombreEmises()  une METHODE de classe. Elle repond sur l'ensemble, pas
 *                   sur un exemplaire — on l'appelle donc sur la classe.
 *
 * A RETENIR SUR LA MEMOIRE. Trois reservations existent, et il n'y a
 * qu'UNE case pour emises. Le champ numero, lui, a une case par objet.
 * Voir TEC-EXE.2 du memento technique.
 */
public class Reservation {

    public static final int PLACES_MAX = 50;

    private static int emises = 0;

    private final String nom;
    private final int numero;

    public Reservation(String nom) {
        this.nom = nom;

        // L'ordre compte : on incremente d'abord, pour que la premiere
        // reservation porte le numero 1 et non 0.
        emises++;
        this.numero = emises;
    }

    public String getNom() {
        return nom;
    }

    public int getNumero() {
        return numero;
    }

    /**
     * Ecrire  return this.numero;  ici provoque :
     *
     *     non-static variable this cannot be referenced from a static context
     *
     * this designe l'objet sur lequel la methode est appelee. Il n'y en a
     * pas : la question porte sur l'ensemble. C'est la meme raison qui
     * explique pourquoi le main est statique.
     */
    public static int nombreEmises() {
        return emises;
    }

    public static boolean resteDeLaPlace() {
        return emises < PLACES_MAX;
    }

    @Override
    public String toString() {
        return "Reservation n" + numero + " : " + nom;
    }
}
