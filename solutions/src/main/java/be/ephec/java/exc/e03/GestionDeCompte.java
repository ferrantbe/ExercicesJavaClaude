package be.ephec.java.exc.e03;

/** EXC.3 — CORRIGE. */
public class GestionDeCompte {

    public static void main(String[] args) {
        String[] numeros = {
                "BE68 5390 0754 7034",
                "BE68 5390 0754",
                "FR68 5390 0754 7034",
                "BE68 5390 0754 7035"
        };

        // UN SEUL catch : ici, la reaction est la meme dans les trois cas —
        // afficher le probleme. Ecrire trois blocs identiques n'apporterait
        // rien et alourdirait le code. Voir CC-ERR.5.
        for (String numero : numeros) {
            try {
                Compte compte = new Compte(numero);
                System.out.println("Compte ouvert : " + compte.getNumero());
            } catch (IbanInvalideException e) {
                System.out.println("Refuse (" + numero + ") : " + e.getMessage());
            }
        }

        // Si la reaction devait differer — proposer une correction pour une
        // faute de frappe, rediriger vers une banque etrangere — alors les
        // trois classes distinctes prendraient tout leur sens :
        //
        //     catch (IbanPrefixeException e) { ... }
        //     catch (IbanInvalideException e) { ... }
        //
        // L'ordre compte : du plus precis au plus general, sans quoi le
        // compilateur signale que le second catch est inatteignable.
    }
}
