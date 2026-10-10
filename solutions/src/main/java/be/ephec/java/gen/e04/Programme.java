package be.ephec.java.gen.e04;

/** GEN.4 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Triplet<Personne> personnes = new Triplet<>(
                new Personne("Ada"), new Personne("Alan"), new Personne("Grace"));

        Triplet<Etudiant> etudiants = new Triplet<>(
                new Etudiant("Ada"), new Etudiant("Alan"), new Etudiant("Grace"));

        // La MEME methode accepte les deux, grace au joker.
        System.out.println(Affichage.noms(personnes));
        System.out.println(Affichage.noms(etudiants));

        // Avec  noms(Triplet<Personne>)  en signature, la seconde ligne
        // n'aurait pas compile : « incompatible types: Triplet<Etudiant>
        // cannot be converted to Triplet<Personne> ».
    }
}
