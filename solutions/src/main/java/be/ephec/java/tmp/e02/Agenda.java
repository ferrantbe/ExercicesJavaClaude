package be.ephec.java.tmp.e02;

import java.time.LocalDate;

/**
 * TMP.2 — CORRIGE.
 *
 * Le piege du Programme fourni tient en une ligne :
 *
 *     rendezVous.plusWeeks(1);
 *
 * plusWeeks ne modifie pas rendezVous. Elle ne le PEUT pas : un LocalDate est
 * immuable, sa valeur est fixee a la construction et ne changera jamais. La
 * methode fabrique donc une NOUVELLE date et la rend — et comme personne ne
 * recupere ce resultat, il est jete aussitot.
 *
 * C'est la meme mecanique que String :
 *
 *     texte.toUpperCase();          // ne fait rien
 *     texte = texte.toUpperCase();  // fonctionne
 *
 * L'immuabilite n'est pas une gene, c'est une garantie : vous pouvez passer
 * un LocalDate a n'importe quelle methode sans craindre qu'elle le modifie
 * dans votre dos.
 */
public class Agenda {

    public static LocalDate dansUneSemaine(LocalDate date) {
        return date.plusWeeks(1);
    }

    public static LocalDate reporterDe(LocalDate date, int jours) {
        // plusDays accepte les nombres negatifs : inutile de traiter le cas
        // a part, ni d'appeler minusDays.
        return date.plusDays(jours);
    }
}
