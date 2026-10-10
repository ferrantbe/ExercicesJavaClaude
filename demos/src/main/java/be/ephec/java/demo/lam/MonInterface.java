package be.ephec.java.demo.lam;

/**
 * DEMO LAM — etat final.
 *
 * Une seule methode abstraite : c'est ce qui en fait une interface
 * FONCTIONNELLE, et c'est la seule condition pour qu'une lambda puisse
 * l'implementer.
 *
 * L'annotation a ete ajoutee pendant la demonstration. Elle ne change
 * rien au fonctionnement : elle demande au compilateur de verifier la
 * regle, et de refuser qu'on ajoute une seconde methode plus tard.
 */
@FunctionalInterface
public interface MonInterface {

    void methodeDInterface();
}
