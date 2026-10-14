package be.ephec.java.demo.itf.slides;

/**
 * Slides « Un comportement qui ne suit pas la hierarchie » et « L'interface
 * supprime le test » (ITF, section 4).
 *
 * La station ne recoit que des Motorise : elle n'a rien a verifier, et le
 * velo est refuse par le compilateur, pas par un if. Retirez les barres de
 * commentaire devant la derniere ligne pour le constater.
 */
public class LInterfaceSupprimeLeTest {

    public static void main(String[] args) {
        Transport[] transports = { new Voiture(), new Avion(), new Moto(), new Velo() };
        for (Transport t : transports) {
            t.bouge();
        }

        StationService station = new StationService();
        station.faireLePlein(new Voiture());
        station.faireLePlein(new Moto());
        // station.faireLePlein(new Velo());   // refus : un Velo n'est pas Motorise
    }

    /* Sortie attendue :
    Voiture : roule
    Avion : vole
    Moto : se faufile
    Velo : pedale
    Voiture : plein fait
    Moto : plein fait
    */
}
