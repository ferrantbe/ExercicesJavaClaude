package be.ephec.java.travail;

import java.util.List;

/**
 * DEMO FIC — etat de DEPART.
 *
 * Trois contacts en memoire, et rien pour les conserver. Fermez le
 * programme, et tout disparait : c'est le probleme que le thème resout.
 */
public class Demo {

    public static void main(String[] args) {
        List<Contact> carnet = List.of(
                new Contact("Ada Lovelace", "0470 11 22 33", 1000),
                new Contact("Alan Turing", "0475 44 55 66", 1200),
                new Contact("Grace Hopper", "0479 77 88 99", 1030));

        carnet.forEach(System.out::println);
    }
}
