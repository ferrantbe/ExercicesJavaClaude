package be.ephec.java.demo.itf;

import java.util.HashSet;
import java.util.Set;

/**
 * DEMO ITF — etat final.
 *
 * TROIS mots ont change depuis le depart : les trois « Client » sont
 * devenus « Abonne ». Rien d'autre.
 *
 * Et pourtant cette classe est passee d'un fournisseur qui ne sait
 * prevenir que des clients a un fournisseur qui previent n'importe qui
 * sachant recevoir la nouvelle — y compris des classes qui n'existaient
 * pas quand elle a ete ecrite.
 *
 * C'est le patron Observateur, et c'est surtout l'illustration la plus
 * courte de ce que « dependre d'une interface » veut dire. Voir CC-CLS.4.
 */
public class Fournisseur {

    private final Set<Abonne> abonnes = new HashSet<>();

    public void addSubscriber(Abonne abonne) {
        abonnes.add(abonne);
    }

    public void removeSubscriber(Abonne abonne) {
        abonnes.remove(abonne);
    }

    private void informSubscribers() {
        System.out.println("Fournisseur - J'informe mes abonnes");
        for (Abonne abonne : abonnes) {
            abonne.update();
        }
    }

    public void addProduct() {
        System.out.println("Fournisseur - Nouveau produit arrive...");
        informSubscribers();
    }
}
