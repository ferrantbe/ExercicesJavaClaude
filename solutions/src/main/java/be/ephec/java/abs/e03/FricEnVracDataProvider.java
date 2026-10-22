package be.ephec.java.abs.e03;

/**
 * ABS.3 — CORRIGE. Fournie, inchangee.
 *
 * La banque Fric en Vrac livre ses donnees brutes dans cet ordre :
 *     compte, montant, communication
 */
public class FricEnVracDataProvider {

    public String[][] provideBankData() {
        return new String[][]{
                {"BE01 1234 5678 9012", "150.00", "Loyer"},
                {"BE01 1234 5678 9012", "-42.50", "Courses"},
                {"BE99 8765 4321 0987", "1200.00", "Salaire"}
        };
    }
}
