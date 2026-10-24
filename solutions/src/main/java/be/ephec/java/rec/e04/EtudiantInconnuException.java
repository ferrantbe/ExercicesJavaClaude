package be.ephec.java.rec.e04;

/**
 * REC.4 — Corrige.
 *
 * Le constructeur recoit le matricule, pas un message tout fait : c'est
 * l'exception qui sait comment se decrire, et l'appelant n'a rien a
 * rediger (CC-ERR.5).
 */
public class EtudiantInconnuException extends Exception {

    public EtudiantInconnuException(String matricule) {
        super("Aucun etudiant ne porte le matricule " + matricule);
    }
}
