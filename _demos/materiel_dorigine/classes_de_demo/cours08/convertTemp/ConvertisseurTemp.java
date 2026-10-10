package be.ephec.java.cours08.convertTemp;

public class ConvertisseurTemp {
    public static double CtoF(double c) {
        double f = 32 + c * 9 / 5;
        return f;
    }

    public static double FtoC(double f) {
        double c = (f - 32) * 5 / 9;
        return c;
    }
}
