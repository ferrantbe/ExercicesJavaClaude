package be.ephec.java.enu.e03;

/**
 * ENU.3 — CORRIGE.
 *
 * L'ordre de declaration est celui du jeu : c'est lui que suivra values(),
 * donc celui dans lequel le Deck sera construit.
 */
public enum Value {
    AS("As"),
    DEUX("2"),
    TROIS("3"),
    QUATRE("4"),
    CINQ("5"),
    SIX("6"),
    SEPT("7"),
    HUIT("8"),
    NEUF("9"),
    DIX("10"),
    VALET("Valet"),
    DAME("Dame"),
    ROI("Roi");

    private final String libelle;

    Value(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }
}
