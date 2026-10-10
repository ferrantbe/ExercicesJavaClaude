package be.ephec.java.demo.lam;

/**
 * DEMO LAM — etat final.
 *
 * Les deux ecritures sont ici cote a cote, et la difference saute aux
 * yeux : la classe abstraite a garde ses six lignes, l'interface est
 * passee a une.
 *
 * Ce qu'il faut retenir, dans l'ordre ou la demonstration l'a montre :
 *
 *   une lambda n'est possible que pour une interface FONCTIONNELLE,
 *   c'est-a-dire qui ne declare qu'une methode abstraite ;
 *
 *   elle ne change rien a ce que fait le programme, seulement a ce qu'il
 *   coute a ecrire et a lire ;
 *
 *   IntelliJ sait faire la transformation lui-meme, et il ne la propose
 *   PAS sur la classe abstraite — l'outil connait la regle.
 */
public class Demo {

    public static void main(String[] args) {
        // Aucune lambda possible ici, et ce n'est pas un oubli.
        ClasseAbstraite objet = new ClasseAbstraite() {
            @Override
            public void methodeAbstraite() {
                System.out.println("Ceci est la methode abstraite, rendue concrete");
            }
        };

        // La meme idee, en une ligne, parce que MonInterface est fonctionnelle.
        MonInterface monObjet = () -> System.out.println("Ceci est la methode d'interface, rendue concrete");

        objet.methodeConcrete();
        objet.methodeAbstraite();
        monObjet.methodeDInterface();

        // Une lambda est un objet comme un autre : on peut la ranger,
        // la passer en parametre, en garder plusieurs.
        executer(() -> System.out.println("Une lambda ecrite a l'appel"));
        executer(monObjet);
    }

    /**
     * Cette methode ne connait que l'interface. Elle accepte donc aussi
     * bien une classe anonyme qu'une lambda : ce sont deux ecritures de la
     * meme chose.
     */
    private static void executer(MonInterface action) {
        action.methodeDInterface();
    }
}
