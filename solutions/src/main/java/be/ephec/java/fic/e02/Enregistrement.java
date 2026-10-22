package be.ephec.java.fic.e02;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.List;

/**
 * FIC.2 — CORRIGE.
 *
 * Trois choses a retenir.
 *
 * 1. Le try-avec-ressources ferme le flux tout seul, meme si une exception
 *    survient au milieu. Sans lui, un fichier reste ouvert et, sur certains
 *    systemes, verrouille.
 *
 * 2. Un seul writeObject suffit pour toute la liste. La serialisation suit
 *    les references : ecrire la liste ecrit les etudiants, donc leurs cours,
 *    donc leurs enseignants. C'est pourquoi les trois classes doivent etre
 *    Serializable, et pas seulement celle qu'on nomme.
 *
 * 3. readObject retourne un Object. Le transtypage est inevitable et le
 *    compilateur avertit qu'il ne peut pas le verifier : la serialisation est
 *    anterieure a la genericite, et le fichier ne contient aucune trace du
 *    type parametre.
 */
public class Enregistrement {

    public static void enregistrer(List<Etudiant> etudiants, File fichier) throws IOException {
        try (ObjectOutputStream flux = new ObjectOutputStream(new FileOutputStream(fichier))) {
            flux.writeObject(etudiants);
        }
    }

    @SuppressWarnings("unchecked")
    public static List<Etudiant> relire(File fichier) throws IOException, ClassNotFoundException {
        try (ObjectInputStream flux = new ObjectInputStream(new FileInputStream(fichier))) {
            return (List<Etudiant>) flux.readObject();
        }
    }
}
