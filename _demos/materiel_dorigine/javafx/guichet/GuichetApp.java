package guichet;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.*;

public class GuichetApp extends Application {

    private ExecutorService executor;
    private Queue<String> fileAttente = new LinkedList<>();
    private Label lblEnCours = new Label("Personne en cours : (aucun)");
    private ListView<String> listView = new ListView<>();
    private Guichet guichet;

    @Override
    public void start(Stage primaryStage) {
        executor = Executors.newFixedThreadPool(2); // simulate 2 clients en parallèle
        guichet = new Guichet();

        Button ajouterClient = new Button("Ajouter un client");

        // ajouterClient.setOnAction(e -> ajouterNouveauClient());
        ajouterClient.addEventHandler(ActionEvent.ACTION, e -> ajouterNouveauClient());
        ajouterClient.addEventHandler(MouseEvent.MOUSE_CLICKED, e -> ajouterNouveauClient());
        ajouterClient.addEventHandler(KeyEvent.KEY_PRESSED, ke -> System.out.println(ke.getCode()));

        VBox layout = new VBox(10,
                new Label("File d'attente :"),
                listView,
                lblEnCours,
                ajouterClient
        );
        layout.setPadding(new Insets(15));

        Scene scene = new Scene(layout, 400, 350);
        primaryStage.setScene(scene);
        primaryStage.setTitle("Guichet Simulé");
        primaryStage.show();

        primaryStage.setOnCloseRequest(e -> executor.shutdownNow());
    }

    private void ajouterNouveauClient() {
        String nom = "Client " + (fileAttente.size() + 1);
        fileAttente.add(nom);
        listView.getItems().add(nom);

        executor.submit(() -> {
            synchronized (guichet) {
                String client = fileAttente.poll();

                Platform.runLater(() -> {
                    listView.getItems().remove(client);
                    lblEnCours.setText("Personne en cours : " + client);
                });

                guichet.servirClient(client);

                Platform.runLater(() -> lblEnCours.setText("Personne en cours : (aucun)"));
            }
        });
    }

    public static void main(String[] args) {
        launch();
    }

    // Classe interne : le guichet simulé
    static class Guichet {
        public void servirClient(String nom) {
            try {
                Thread.sleep(1000 + (int) (Math.random() * 2000));
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }
}
