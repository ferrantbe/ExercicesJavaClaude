package be.ephec.java.rec.e10;

/**
 * REC.10 — A COMPLETER.
 *
 * CET EXERCICE N'A PAS DE SQUELETTE : c'est la question 4 de l'examen,
 * dans ses conditions. Vous partez de ce seul fichier et creez toutes les
 * classes dans ce package. L'enonce complet est dans le fascicule ; voici
 * les noms, imposes parce que la classe de test les emploie :
 *
 *     Empruntable      interface : int dureeMaxJours(), double penalite(int joursDeRetard)
 *     Etat             enumeration : NEUF, BON, ABIME, avec un libelle
 *     Document         abstraite, implemente Empruntable
 *                      Document(String titre, int annee, Etat etat)
 *                      String getTitre(), int getAnnee(), Etat getEtat()
 *                      String categorie()       abstraite
 *                      String description()     "Dune (1965), livre, bon etat"
 *     Imprime          abstraite, herite de Document, avec un nombre de pages
 *     Support          abstraite, herite de Document, avec une duree en minutes
 *     Livre, Revue     heritent d'Imprime      (titre, annee, etat, pages)
 *     Dvd, JeuVideo    heritent de Support     (titre, annee, etat, minutes)
 *     Mediatheque      void ajouter(Document), int taille(),
 *                      double penalitesTotales(int joursDeRetard),
 *                      List<String> descriptions(), int compter(Etat)
 *
 * Les durees et les penalites sont dans le fascicule. Ce qui n'y est pas
 * — ou placer le taux par jour, s'il faut une methode abstraite de plus,
 * si une classe intermediaire a quelque chose a dire — est a vous.
 *
 * LA CLASSE DE TEST VOUS EST FOURNIE, ENTIEREMENT EN COMMENTAIRE, dans
 * src/test/java, dans ce meme package. Vous la decommenterez quand vos
 * classes seront ecrites.
 */
public class Programme {

    public static void main(String[] args) {
        // TODO : une mediatheque avec un document de chaque sorte, ses
        //        descriptions, le nombre de documents abimes, et le total
        //        des penalites pour trois jours de retard sur tout.
    }
}
