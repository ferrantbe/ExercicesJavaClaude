package be.ephec.java.abs.e02;

/**
 * ABS.2 — CORRIGE.
 *
 * Meme decoupage qu'en ABS.1 : le cri varie, la facon de le faire entendre
 * ne varie pas.
 */
public abstract class Animal {

    public abstract String cri();

    public void makeNoise() {
        System.out.println(cri());
    }
}
