package be.ephec.java.rec.e10;

/** REC.10 — Corrige. Le contrat de ce qui peut etre emprunte. */
public interface Empruntable {

    int dureeMaxJours();

    /** La penalite pour ce nombre de jours de retard ; 0 si pas de retard. */
    double penalite(int joursDeRetard);
}
