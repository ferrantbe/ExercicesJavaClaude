package be.ephec.java.gen.e03;

/**
 * GEN.3 — CORRIGE. Trois elements de types possiblement differents.
 *
 * Comparez les deux classes : la seule difference tient au nombre de
 * parametres de type. TripletD est donc strictement plus permissive que
 * TripletI — TripletD<String, String, String> fait ce que fait
 * TripletI<String>.
 *
 * Faut-il pour autant se passer de TripletI ? Non : TripletI EXPRIME que les
 * trois valeurs sont de meme nature, et le compilateur le fait respecter. Un
 * type ne sert pas seulement a stocker, il sert aussi a dire.
 */
public class TripletD<T, U, V> {

    private final T premier;
    private final U second;
    private final V troisieme;

    public TripletD(T premier, U second, V troisieme) {
        this.premier = premier;
        this.second = second;
        this.troisieme = troisieme;
    }

    public T getPremier() {
        return premier;
    }

    public U getSecond() {
        return second;
    }

    public V getTroisieme() {
        return troisieme;
    }
}
