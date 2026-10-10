package be.ephec.java.exc.e03;

/**
 * EXC.3 — CORRIGE.
 *
 * Classe mere commune aux trois erreurs d'IBAN. Elle ne sert qu'a une chose,
 * mais elle sert beaucoup : permettre a l'appelant d'ecrire UN SEUL catch
 * quand sa reaction est la meme dans les trois cas.
 *
 * C'est la reponse a la question posee en fin d'enonce, et l'application
 * directe de CC-ERR.5 du memento Clean Code : on ne definit pas une exception
 * par cause technique, on la definit selon ce que l'appelant doit distinguer.
 *
 * Ici, on offre les deux : trois classes pour qui veut reagir differemment,
 * une classe mere pour qui veut tout traiter d'un coup.
 */
public class IbanInvalideException extends Exception {

    public IbanInvalideException(String message) {
        super(message);
    }
}
