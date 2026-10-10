package be.ephec.java.poo.e01;

/**
 * POO.1 — CORRIGE.
 *
 * Les quatre champs sont public parce que l'enonce le demande. Retenez que
 * c'est exactement ce qu'il ne faut pas faire : n'importe quel code peut
 * ecrire personne.anneeDeNaissance = -40 sans que la classe puisse s'y
 * opposer. POO.2 corrige ce defaut.
 */
public class Personne {

    public String nom;
    public String prenom;
    public int anneeDeNaissance;
    public int age;

    /**
     * Une soustraction, rien de plus. La methode ne consulte pas le champ age
     * et ne le met pas a jour : elle repond a la question "quel age a cette
     * personne en telle annee", ce qui n'est pas la meme chose que "quel age
     * a-t-elle aujourd'hui".
     */
    public int computeAge(int annee) {
        return annee - anneeDeNaissance;
    }

    public void display() {
        System.out.println(prenom + " " + nom
                + ", ne(e) en " + anneeDeNaissance
                + ", age enregistre : " + age);
    }
}
