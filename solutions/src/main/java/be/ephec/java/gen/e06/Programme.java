package be.ephec.java.gen.e06;

/** GEN.6 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Couple<Integer> anonyme = new Couple<>(12, 16);
        CoupleNomme<Integer> nomme = new CoupleNomme<>("notes", 12, 16);

        anonyme.affiche();
        nomme.affiche();

        // affiche() n'a pas ete redefinie : c'est celle de Couple qui
        // s'execute dans les deux cas. Mais elle appelle description(), et
        // c'est la version de CoupleNomme qui repond pour le second objet.
        //
        // Autrement dit, la classe mere appelle du code que la classe fille a
        // ecrit apres elle. C'est exactement ce que fait la classe abstraite
        // du theme ABS avec sa methode abstraite.

        Couple<Integer> vueCommeCouple = nomme;
        System.out.println(vueCommeCouple.description());
        // Le type de la variable ne decide de rien : c'est le type reel de
        // l'objet qui choisit la methode.
    }
}
