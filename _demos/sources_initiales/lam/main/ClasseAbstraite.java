package be.ephec.java.travail;

/**
 * DEPART LAM — une classe abstraite a une methode abstraite et une
 * methode concrete.
 */
public abstract class ClasseAbstraite {

    public abstract void methodeAbstraite();

    public void methodeConcrete() {
        System.out.println("Je suis la methode concrete");
    }
}
