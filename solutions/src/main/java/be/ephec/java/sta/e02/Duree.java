package be.ephec.java.sta.e02;

/**
 * STA.2 — CORRIGE.
 *
 * POURQUOI UN CONSTRUCTEUR PRIVE. Il oblige a passer par une fabrique, et
 * les fabriques, elles, portent un nom.
 *
 *     new Duree(2)         deux quoi ?
 *     Duree.deHeures(2)    aucun doute
 *
 * Un constructeur ne peut pas dire dans quelle unite il attend son
 * argument : il porte le nom de sa classe, et rien d'autre. Deux fabriques
 * de meme signature sont possibles la ou deux constructeurs de meme
 * signature ne le seraient pas.
 *
 * POURQUOI total() EST STATIQUE. Elle ne porte sur aucune duree en
 * particulier. L'ecrire comme methode d'instance obligerait a en choisir
 * une arbitrairement pour l'appeler.
 */
public class Duree {

    private static final int MINUTES_PAR_HEURE = 60;

    private final int minutes;

    private Duree(int minutes) {
        this.minutes = minutes;
    }

    public static Duree deMinutes(int minutes) {
        return new Duree(minutes);
    }

    public static Duree deHeures(int heures) {
        return new Duree(heures * MINUTES_PAR_HEURE);
    }

    public int enMinutes() {
        return minutes;
    }

    /**
     * Rend une NOUVELLE duree : ni celle-ci ni l'autre ne changent.
     *
     * C'est l'immuabilite rencontree en TMP.2 avec LocalDate, appliquee a
     * une classe qu'on ecrit soi-meme. Le champ est final, donc il n'y a
     * pas d'autre facon de faire.
     */
    public Duree plus(Duree autre) {
        return new Duree(this.minutes + autre.minutes);
    }

    public static Duree total(Duree... durees) {
        int somme = 0;
        for (Duree duree : durees) {
            somme += duree.minutes;
        }
        return new Duree(somme);
    }

    @Override
    public String toString() {
        if (minutes < MINUTES_PAR_HEURE) {
            return minutes + "min";
        }
        return (minutes / MINUTES_PAR_HEURE) + "h"
                + String.format("%02d", minutes % MINUTES_PAR_HEURE);
    }
}
