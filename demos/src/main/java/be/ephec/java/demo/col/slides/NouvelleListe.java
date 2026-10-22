package be.ephec.java.demo.col.slides;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

/** Slide « Creer au premier usage » (COL, section 6). */
public class NouvelleListe implements Function<String, List<String>> {

    @Override
    public List<String> apply(String auteur) {
        return new ArrayList<>();
    }
}
