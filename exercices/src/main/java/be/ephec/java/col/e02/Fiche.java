package be.ephec.java.col.e02;

/**
 * COL.2 — Ce record vous est FOURNI.
 *
 * Une fiche d'annuaire : un nom, un numero de telephone, une adresse. Trois
 * donnees qui ne changent pas, donc un record — comme en ENU.4.
 *
 * Il vous est donne pour que vous puissiez vous concentrer sur l'Annuaire,
 * qui est le vrai sujet de l'exercice. Notez au passage que les accesseurs
 * s'appellent nom(), numero() et adresse(), sans prefixe get.
 */
public record Fiche(String nom, String numero, String adresse) {
}
