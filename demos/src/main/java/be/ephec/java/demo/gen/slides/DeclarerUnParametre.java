package be.ephec.java.demo.gen.slides;

import java.util.ArrayList;
import java.util.List;

/**
 * Slides « Declarer un parametre, le fixer a l'usage », « Un T se transmet »,
 * « Plusieurs parametres » et « Un argument de type peut etre generique »
 * (GEN, sections 1 et 2).
 */
public class DeclarerUnParametre {

    static class Consigne<T> {
        private final List<T> depots = new ArrayList<>();

        public void deposer(T objet) {
            depots.add(objet);
        }

        public int nombreDeDepots() {
            return depots.size();
        }
    }

    public static void main(String[] args) {
        Casier<Valise> casier = new Casier<>();
        casier.deposer(new Valise("bleue"));
        // casier.deposer("un message");   // refus : ce casier ne prend que des Valise
        Valise v = casier.retirer();        // aucun transtypage
        System.out.println("Retire : " + v);

        Consigne<String> messages = new Consigne<>();
        messages.deposer("Bonjour");
        messages.deposer("Au revoir");
        System.out.println(messages.nombreDeDepots() + " depots");

        Ticket<Integer, Valise> t = new Ticket<>(42, new Valise("rouge"));
        System.out.println(t);

        Ticket<Integer, Casier<Valise>> ticket = new Ticket<>(7, Casier.contenant(new Valise("verte")));
        System.out.println("Le ticket 7 garde un casier, qui contient : " + ticket.getObjet().retirer());
    }

    /* Sortie attendue :
    Retire : valise bleue
    2 depots
    ticket 42 : valise rouge
    Le ticket 7 garde un casier, qui contient : valise verte
    */
}
