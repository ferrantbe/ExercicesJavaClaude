package be.ephec.java.cours12;

public class Programme {

    public static void main(String[] args) {

        // création des Threads

        MonThread threads[] = new MonThread[10];
        for (int i = 0; i < 10; i++) {
            threads[i] = new MonThread();
            threads[i].setNumero(i + 1);
        }

        // création des Runnables
        MonRunnable runnables[] = new MonRunnable[10];
        for (int i = 0; i < 10; i++) {
            runnables[i] = new MonRunnable();
            runnables[i].setNumero(i + 1);
        }

        // lancement des Threads
        for (int i = 0; i < 10; i++) {
            runnables[i] = new MonRunnable();
            runnables[i].setNumero(i + 1);
        }

        // lancement des Runnables
        for (int i = 0; i < 10; i++) {
            threads[i].start();
            new Thread(runnables[i]).start();
        }
    }

    static class MonThread extends Thread {
        private int numero;

        public int getNumero() {
            return numero;
        }

        public void setNumero(int numero) {
            this.numero = numero;
        }

        public void run() {
            for (int i = 0; i < 100; i++)
                System.out.printf("Je suis le thread numéro %d - %d.%n", numero, i);

        }
    }

    static class MonRunnable implements Runnable {

        private int numero;

        public void setNumero(int numero) {
            this.numero = numero;
        }

        public void run() {
            for (int i = 0; i < 100; i++)
                System.out.printf("Je suis le runnable numéro %d - %d.%n", numero, i);
        }
    }
}


