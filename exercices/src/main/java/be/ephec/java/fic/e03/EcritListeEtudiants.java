package be.ephec.java.fic.e03;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * FIC.3 — A COMPLETER.
 *
 * Enregistrer les memes etudiants, mais sous forme de TEXTE cette fois.
 *
 * Pour ecrire : un PrintWriter construit sur un FileWriter, avec println.
 * Pour relire : le Scanner que vous connaissez, construit sur un File.
 *
 * Utilisez le try-avec-ressources dans les deux cas.
 */
public class EcritListeEtudiants {

    /**
     * Ecrit un etudiant par ligne, au format exact :
     *
     *     Lovelace;Ada;Java,Algebre
     *     Turing;Alan;
     *
     * Le nom, le prenom et les intitules de cours separes par des
     * points-virgules ; les cours separes entre eux par des virgules. Un
     * etudiant sans cours laisse la troisieme partie vide.
     */
    public static void ecrire(List<Etudiant> etudiants, File fichier) throws IOException {
        throw new UnsupportedOperationException("ecrire n'est pas encore implementee");
    }

    /**
     * Relit le fichier et rend les lignes telles quelles.
     *
     * Contrairement au fichier .dat de FIC.2, celui-ci se lit — par un
     * programme comme par un humain.
     */
    public static List<String> lireLignes(File fichier) throws IOException {
        throw new UnsupportedOperationException("lireLignes n'est pas encore implementee");
    }

    /**
     * Reconstruit les etudiants a partir des lignes du fichier.
     *
     * Les cours n'ont plus de charge de cours : le format texte ne l'a pas
     * conserve. Creez donc un Enseignant "Inconnu Inconnu" pour chacun.
     *
     * C'est la difference de fond entre les deux formats, et le sujet de la
     * derniere question de l'enonce.
     */
    public static List<Etudiant> relire(File fichier) throws IOException {
        throw new UnsupportedOperationException("relire n'est pas encore implementee");
    }
}
