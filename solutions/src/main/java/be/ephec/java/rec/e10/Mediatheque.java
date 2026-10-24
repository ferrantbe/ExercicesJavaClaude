package be.ephec.java.rec.e10;

import java.util.ArrayList;
import java.util.List;

/** REC.10 — Corrige. Aucun instanceof : chaque document repond pour lui-meme. */
public class Mediatheque {

    private final List<Document> documents = new ArrayList<>();

    public void ajouter(Document document) {
        documents.add(document);
    }

    public int taille() {
        return documents.size();
    }

    public double penalitesTotales(int joursDeRetard) {
        double total = 0;
        for (Document document : documents) {
            total += document.penalite(joursDeRetard);
        }
        return total;
    }

    public List<String> descriptions() {
        List<String> resultat = new ArrayList<>();
        for (Document document : documents) {
            resultat.add(document.description());
        }
        return resultat;
    }

    public int compter(Etat etat) {
        int compte = 0;
        for (Document document : documents) {
            if (document.getEtat() == etat) {
                compte++;
            }
        }
        return compte;
    }
}
