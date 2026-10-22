package be.ephec.java.travail;

/**
 * DEPART LAM — deux classes anonymes, cote a cote.
 *
 * Elles se ressemblent comme deux gouttes d'eau. L'une pourra s'ecrire en
 * lambda, l'autre jamais — et toute la demonstration tient a comprendre
 * pourquoi.
 */
public class Demo {

    public static void main(String[] args) {
        ClasseAbstraite objet = new ClasseAbstraite() {
            @Override
            public void methodeAbstraite() {
                System.out.println("Ceci est la methode abstraite, rendue concrete");
            }
        };

        MonInterface monObjet = new MonInterface() {
            @Override
            public void methodeDInterface() {
                System.out.println("Ceci est la methode d'interface, rendue concrete");
            }
        };

        objet.methodeConcrete();
        objet.methodeAbstraite();
        monObjet.methodeDInterface();
    }
}
