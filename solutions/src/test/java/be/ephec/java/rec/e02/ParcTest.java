package be.ephec.java.rec.e02;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Modifier;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/** REC.2 — Verification automatique. */
class ParcTest {

    private static final double PRECISION = 0.001;

    @Test
    @DisplayName("Vehicule, Automobile et DeuxRoues sont abstraites, les quatre sortes ne le sont pas")
    void classesAbstraites() {
        assertTrue(Modifier.isAbstract(Vehicule.class.getModifiers()));
        assertTrue(Modifier.isAbstract(Automobile.class.getModifiers()));
        assertTrue(Modifier.isAbstract(DeuxRoues.class.getModifiers()));
        assertFalse(Modifier.isAbstract(Voiture.class.getModifiers()));
        assertFalse(Modifier.isAbstract(Camionnette.class.getModifiers()));
        assertFalse(Modifier.isAbstract(Moto.class.getModifiers()));
        assertFalse(Modifier.isAbstract(Scooter.class.getModifiers()));
    }

    @Test
    @DisplayName("Tout vehicule est Taxable")
    void taxable() {
        assertTrue(Taxable.class.isAssignableFrom(Vehicule.class));
        assertTrue(Modifier.isInterface(Taxable.class.getModifiers()));
    }

    @Test
    @DisplayName("Les accesseurs rendent ce que le constructeur a recu")
    void accesseurs() {
        Voiture voiture = new Voiture("Toyota", 2019, Energie.ESSENCE, 85);

        assertEquals("Toyota", voiture.getMarque());
        assertEquals(2019, voiture.getAnnee());
        assertEquals(Energie.ESSENCE, voiture.getEnergie());
        assertEquals(85, voiture.getPuissanceKw());
        assertEquals(1200, new Camionnette("Renault", 2016, Energie.DIESEL, 1200).getChargeUtileKg());
        assertEquals(937, new Moto("Ducati", 2021, Energie.ESSENCE, 937).getCylindreeCc());
    }

    @Test
    @DisplayName("Quatre roues pour les automobiles, deux pour les deux-roues")
    void roues() {
        assertEquals(4, new Voiture("Toyota", 2019, Energie.ESSENCE, 85).nombreDeRoues());
        assertEquals(4, new Camionnette("Renault", 2016, Energie.DIESEL, 1200).nombreDeRoues());
        assertEquals(2, new Moto("Ducati", 2021, Energie.ESSENCE, 937).nombreDeRoues());
        assertEquals(2, new Scooter("Niu", 2023, Energie.ELECTRIQUE).nombreDeRoues());
    }

    @Test
    @DisplayName("La description est la meme pour toutes les sortes")
    void description() {
        assertEquals("Toyota (2019), 4 roues, essence",
                new Voiture("Toyota", 2019, Energie.ESSENCE, 85).description());
        assertEquals("Niu (2023), 2 roues, electrique",
                new Scooter("Niu", 2023, Energie.ELECTRIQUE).description());
    }

    @Test
    @DisplayName("Une voiture : 2 euros par kW, selon l'energie")
    void taxeVoiture() {
        assertEquals(170.0, new Voiture("Toyota", 2019, Energie.ESSENCE, 85).taxeAnnuelle(), PRECISION);
        assertEquals(212.5, new Voiture("Peugeot", 2019, Energie.DIESEL, 85).taxeAnnuelle(), PRECISION);
        assertEquals(83.2, new Voiture("Tesla", 2022, Energie.ELECTRIQUE, 208).taxeAnnuelle(), PRECISION);
    }

    @Test
    @DisplayName("Une camionnette : 120 euros plus un euro par 10 kg, selon l'energie")
    void taxeCamionnette() {
        assertEquals(240.0, new Camionnette("Renault", 2016, Energie.ESSENCE, 1200).taxeAnnuelle(), PRECISION);
        assertEquals(300.0, new Camionnette("Renault", 2016, Energie.DIESEL, 1200).taxeAnnuelle(), PRECISION);
        assertEquals(120.5, new Camionnette("Fiat", 2020, Energie.ESSENCE, 5).taxeAnnuelle(), PRECISION,
                "5 kg valent un demi-euro : la division ne doit pas etre entiere");
    }

    @Test
    @DisplayName("Une moto : un quart d'euro par cm3 ; un scooter : 25 euros")
    void taxeDeuxRoues() {
        assertEquals(234.25, new Moto("Ducati", 2021, Energie.ESSENCE, 937).taxeAnnuelle(), PRECISION);
        assertEquals(25.0, new Scooter("Vespa", 2018, Energie.ESSENCE).taxeAnnuelle(), PRECISION);
        assertEquals(5.0, new Scooter("Niu", 2023, Energie.ELECTRIQUE).taxeAnnuelle(), PRECISION);
    }

    @Test
    @DisplayName("Un parc vide n'a ni taille, ni taxe, ni doyen")
    void parcVide() {
        Parc parc = new Parc();

        assertEquals(0, parc.taille());
        assertEquals(0.0, parc.taxeTotale(), PRECISION);
        assertTrue(parc.descriptions().isEmpty());
        assertThrows(IllegalStateException.class, parc::doyen);
    }

    @Test
    @DisplayName("Le parc additionne les taxes de toutes les sortes")
    void taxeTotale() {
        Parc parc = parcDeDemo();

        assertEquals(170.0 + 300.0 + 234.25 + 5.0, parc.taxeTotale(), PRECISION);
        assertEquals(4, parc.taille());
    }

    @Test
    @DisplayName("Les descriptions suivent l'ordre d'ajout")
    void descriptions() {
        List<String> descriptions = parcDeDemo().descriptions();

        assertEquals(List.of(
                "Toyota (2019), 4 roues, essence",
                "Renault (2016), 4 roues, diesel",
                "Ducati (2021), 2 roues, essence",
                "Niu (2023), 2 roues, electrique"), descriptions);
    }

    @Test
    @DisplayName("compter ne retient que l'energie demandee")
    void compter() {
        Parc parc = parcDeDemo();

        assertEquals(2, parc.compter(Energie.ESSENCE));
        assertEquals(1, parc.compter(Energie.DIESEL));
        assertEquals(1, parc.compter(Energie.ELECTRIQUE));
    }

    @Test
    @DisplayName("Le doyen est le plus ancien ; a egalite, le premier ajoute")
    void doyen() {
        Parc parc = parcDeDemo();
        assertEquals("Renault", parc.doyen().getMarque());

        parc.ajouter(new Scooter("Vespa", 2016, Energie.ESSENCE));
        assertEquals("Renault", parc.doyen().getMarque(), "a annee egale, le premier ajoute reste doyen");

        parc.ajouter(new Moto("Honda", 2009, Energie.ESSENCE, 250));
        assertEquals("Honda", parc.doyen().getMarque());
    }

    private static Parc parcDeDemo() {
        Parc parc = new Parc();
        parc.ajouter(new Voiture("Toyota", 2019, Energie.ESSENCE, 85));
        parc.ajouter(new Camionnette("Renault", 2016, Energie.DIESEL, 1200));
        parc.ajouter(new Moto("Ducati", 2021, Energie.ESSENCE, 937));
        parc.ajouter(new Scooter("Niu", 2023, Energie.ELECTRIQUE));
        return parc;
    }
}
