package be.ephec.java.cours05.point;

public class Programme {
    public static void main(String[] args)  {
        try {
            Point a = new Point(2, 5);
        } catch (ConstructorException ce) {
            System.out.println("Zut");
        }

    }
}
