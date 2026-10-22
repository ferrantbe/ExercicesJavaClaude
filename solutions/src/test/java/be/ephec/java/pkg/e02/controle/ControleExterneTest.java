package be.ephec.java.pkg.e02.controle;

import be.ephec.java.pkg.e02.coffre.Coffre;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

/** PKG.2 — Verification automatique. */
class ControleExterneTest {

    @Test
    @DisplayName("Le numero se lit depuis un autre package")
    void leNumeroSeLitDepuisLExterieur() {
        assertEquals("C-07", new ControleExterne().numeroDu(new Coffre()));
    }

    @Test
    @DisplayName("Le champ numero n'est pas devenu public pour autant")
    void leChampNumeroEstRestePrive() throws NoSuchFieldException {
        Field numero = Coffre.class.getDeclaredField("numero");

        assertFalse(Modifier.isPublic(numero.getModifiers()),
                "Passer le champ en public etait la solution paresseuse : "
                        + "elle donne aussi le droit de l'ecrire a n'importe qui.");
    }
}
