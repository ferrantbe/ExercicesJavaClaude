package be.ephec.java.abs.e02;

import java.util.Random;

/** ABS.2 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Random hasard = new Random();
        Animal[] animaux = new Animal[10];

        for (int i = 0; i < animaux.length; i++) {
            animaux[i] = hasard.nextBoolean() ? new Dog() : new Cat();
        }

        // Aucun instanceof, aucun test de type : chaque animal sait quoi dire.
        // C'est le polymorphisme, et c'est ce qui permettrait d'ajouter une
        // Vache sans toucher a cette boucle.
        for (Animal animal : animaux) {
            animal.makeNoise();
        }
    }
}
