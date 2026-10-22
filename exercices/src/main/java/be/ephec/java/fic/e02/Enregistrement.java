package be.ephec.java.fic.e02;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * FIC.2 — A COMPLETER.
 *
 * Enregistrer des OBJETS dans un fichier, puis les relire. C'est ce qu'on
 * appelle la serialisation.
 *
 * Deux classes du JDK font tout le travail :
 *   ObjectOutputStream, construit sur un FileOutputStream, pour ecrire ;
 *   ObjectInputStream,  construit sur un FileInputStream,  pour relire.
 *
 * Utilisez le try-avec-ressources : le flux se ferme tout seul, meme si une
 * exception survient.
 *
 *     try (ObjectOutputStream flux = new ObjectOutputStream(...)) {
 *         ...
 *     }
 */
public class Enregistrement {

    /** Ecrit la liste d'etudiants dans le fichier, en un seul writeObject. */
    public static void enregistrer(List<Etudiant> etudiants, File fichier) throws IOException {
        throw new UnsupportedOperationException("enregistrer n'est pas encore implementee");
    }

    /**
     * Relit la liste d'etudiants depuis le fichier.
     *
     * readObject retourne un Object : un transtypage est inevitable, et le
     * compilateur vous avertira qu'il ne peut pas le verifier. C'est une
     * limite de la serialisation, pas une erreur de votre part.
     */
    public static List<Etudiant> relire(File fichier) throws IOException, ClassNotFoundException {
        throw new UnsupportedOperationException("relire n'est pas encore implementee");
    }
}
