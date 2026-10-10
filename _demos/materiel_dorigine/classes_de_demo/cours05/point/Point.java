package be.ephec.java.cours05.point;

public class Point {

    private int x, y;

    public Point(int x, int y) throws ConstructorException {
        if (x < 0 || y < 0) throw new ConstructorException("Message");
        this.x = x;
        this.y = y;
    }
}
