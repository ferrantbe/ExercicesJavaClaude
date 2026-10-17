package be.ephec.java.poo.e02;

/**
 * POO.2 — CORRIGE.
 *
 * Le changement par rapport a POO.1 : les champs sont private. L'exterieur
 * passe obligatoirement par les accesseurs, ce qui donne a la classe un
 * endroit ou controler ce qui entre. (Ce controle viendra avec les
 * exceptions, plus tard.)
 *
 * Pour le champ age, ce corrige retient UNE des trois options possibles :
 * un getter, pas de setter. Ce n'est pas LA bonne reponse, c'est un choix
 * defendable. Voyez le commentaire sur getAge().
 */
public class Personne {

    private String nom;
    private String prenom;
    private int anneeDeNaissance;
    private int age;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        // "this.nom" designe le champ, "nom" tout court designe le parametre.
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public int getAnneeDeNaissance() {
        return anneeDeNaissance;
    }

    public void setAnneeDeNaissance(int anneeDeNaissance) {
        this.anneeDeNaissance = anneeDeNaissance;
    }

    /**
     * Choix retenu : un getter, pas de setter.
     *
     * Avec un setter, n'importe qui aurait pu enregistrer une personne nee
     * en 1990 et agee de 7 ans, sans que la classe puisse s'y opposer. En le
     * supprimant, on ferme au moins cette porte-la.
     *
     * Mais le probleme n'est pas resolu pour autant : personne ne peut plus
     * renseigner l'age, donc ce getter retourne 0. Lancez le Programme, vous le
     * verrez. Un champ qu'on ne peut ni ecrire ni calculer ne sert a rien.
     *
     * Si vous aviez choisi une autre option, relisez votre justification a
     * la lumiere de celle-ci. Aucune des trois n'est satisfaisante, et c'est
     * exactement ce que POO.3 va vous faire constater.
     */
    public int getAge() {
        return age;
    }

    public int computeAge(int annee) {
        return annee - anneeDeNaissance;
    }

    /**
     * display affiche le champ age, pas computeAge : c'est bien l'age
     * *stocke* que la classe est censee connaitre. Et il vaut 0.
     */
    public void display() {
        System.out.println(prenom + " " + nom + ", " + age + " ans");
    }
}
