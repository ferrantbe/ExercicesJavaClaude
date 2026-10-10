package be.ephec.java.cours02.printf;

import java.util.Locale;

public class ProgrammePrintF {
    public static void main(String[] args) {

        System.out.printf(Locale.US, "%,d %n", 10000);

        System.out.printf(Locale.FRENCH, "%,d %n", 10000);


        System.out.printf("%,d %n", 10000);
        System.out.printf(Locale.FRENCH, "%d %n", 10000);

    }
}
