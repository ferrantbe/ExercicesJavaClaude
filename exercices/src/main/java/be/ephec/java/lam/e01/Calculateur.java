package be.ephec.java.lam.e01;

/**
 * LAM.1 — Cette interface vous est FOURNIE.
 *
 * Une interface FONCTIONNELLE est une interface qui ne declare qu'UNE seule
 * methode abstraite. C'est ce qui permet de l'implementer par une expression
 * lambda plutot que par une classe.
 *
 * L'annotation @FunctionalInterface n'est pas obligatoire, mais elle demande
 * au compilateur de verifier cette regle : si quelqu'un ajoute une seconde
 * methode, il le signalera.
 */
@FunctionalInterface
public interface Calculateur {

    int calcul(int n);
}
