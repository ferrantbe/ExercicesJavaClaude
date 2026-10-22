package be.ephec.java.poo.e04;

import java.util.Scanner;

/**
 * POO.4 — CORRIGE.
 *
 * Le point de l'exercice n'est pas le Scanner, c'est ce qui se passe a
 * l'appel de modifie(...). Voir le commentaire en fin de fichier.
 */
public class Hello {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ce programme vous salue et calcule votre age");
        System.out.println("a partir de votre annee de naissance.");
        System.out.println();

        System.out.print("Nom : ");
        String nom = scanner.nextLine();

        System.out.print("Prenom : ");
        String prenom = scanner.nextLine();

        System.out.print("Annee de naissance : ");
        int annee = scanner.nextInt();
        // nextInt laisse le retour a la ligne dans le tampon. Si une saisie
        // de texte suivait, elle recevrait une chaine vide. Ici c'est la
        // derniere saisie, mais prenez l'habitude de vider le tampon.
        scanner.nextLine();

        Personne personne = new Personne();
        personne.setNom(nom);
        personne.setPrenom(prenom);
        personne.setAnneeDeNaissance(annee);

        System.out.println();
        System.out.println("Avant l'appel :");
        personne.display();

        int nombre = 42;
        System.out.println("nombre = " + nombre);

        modifie(nombre, personne);

        System.out.println();
        System.out.println("Apres l'appel :");
        personne.display();
        System.out.println("nombre = " + nombre);

        scanner.close();
    }

    private static void modifie(int nombre, Personne personne) {
        nombre = 7;
        personne.setNom("Terieur");
        personne.setPrenom("Alex");
    }

    /*
     * CE QU'IL FAUT RETENIR
     *
     * Apres l'appel, nombre vaut toujours 42, mais la personne s'appelle
     * Alex Terieur. Pourtant modifie(...) a bien affecte ses deux parametres.
     *
     * Java passe TOUJOURS les parametres par valeur. Pour un int, la valeur
     * copiee est le nombre lui-meme : la modification reste locale a la
     * methode. Pour un objet, la valeur copiee est la REFERENCE, c'est-a-dire
     * l'adresse de l'objet. La copie et l'original designent donc le meme
     * objet, et setNom agit sur cet objet unique.
     *
     * Verifiez-le : si modifie faisait "personne = new Personne();" au lieu
     * de "personne.setNom(...)", l'objet d'origine ne bougerait pas non plus.
     * On ne remplacerait que la copie de l'adresse.
     */
}
