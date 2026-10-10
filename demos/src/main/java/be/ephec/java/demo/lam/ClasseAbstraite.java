package be.ephec.java.demo.lam;

/**
 * DEMO LAM — etat final, inchangee depuis le depart.
 *
 * Elle est ici pour ce qu'elle NE PERMET PAS : aucune lambda ne peut
 * l'implementer, meme si elle n'a qu'une seule methode abstraite.
 *
 * La raison tient en une phrase : une lambda n'est pas un objet a moitie
 * construit, c'est une fonction. Une classe abstraite peut avoir un etat,
 * un constructeur, des methodes concretes ; une lambda n'a rien de tout
 * cela a offrir.
 */
public abstract class ClasseAbstraite {

    public abstract void methodeAbstraite();

    public void methodeConcrete() {
        System.out.println("Je suis la methode concrete");
    }
}
