package be.ephec.java.cours08.convertTemp;

public class Programme {
    public static void main(String[] args) {
        System.out.println("Conversiopn de T°");

        double c = 15.2;
        double f = ConvertisseurTemp.CtoF(c);

        double cFromF = ConvertisseurTemp.FtoC(f);
        System.out.println(c == c);
        System.out.println(c == cFromF);

        System.out.println(c);
        System.out.println(cFromF);
        System.out.println((c - cFromF) < 0.001);

    }
}
