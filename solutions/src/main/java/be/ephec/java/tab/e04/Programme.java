package be.ephec.java.tab.e04;

/** TAB.4 — CORRIGE. */
public class Programme {

    public static void main(String[] args) {
        Person jules = new Person("Desmet", "Jules");
        Vendor vendeur = new Vendor(jules);

        Sale[] ventes = {
                new Sale(new Car("Renault", "Clio", "VF123"), 20000, 0.10),
                new Sale(new Car("Peugeot", "208", "VF456"), 22000, 0.05),
                new Sale(new Car("Toyota", "Yaris", "JT789"), 24000, 0)
        };

        System.out.println("Ventes de " + jules.getPrenom() + " " + jules.getNom() + " :");
        for (Sale vente : ventes) {
            vendeur.enregistrer(vente);
            System.out.println("  " + vente.enTexte());
        }

        System.out.printf("Chiffre d'affaires : %.2f%n", vendeur.chiffreDAffaires());
    }
}
