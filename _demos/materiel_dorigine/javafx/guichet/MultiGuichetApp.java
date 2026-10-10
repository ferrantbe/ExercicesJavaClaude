package guichet;
import javafx.application.Application;
import javafx.application.Platform;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.util.*;
import java.util.concurrent.*;

public class MultiGuichetApp extends Application {

    private VBox guichetContainer;
    private int guichetCount = 0;
    private Map<Integer, GuichetPane> guichets = new HashMap<>();

    @Override
    public void start(Stage primaryStage) {
        guichetContainer = new VBox(10);
        guichetContainer.setPadding(new Insets(10));

        Button btnAjouterGuichet = new Button("Ajouter un guichet");
        btnAjouterGuichet.setOnAction(e -> ajouterGuichet());

        HBox topControls = new HBox(10, btnAjouterGuichet);
        VBox root = new VBox(15, topControls, new Separator(), guichetContainer);
        root.setPadding(new Insets(15));

        Scene scene = new Scene(root, 800, 600);
        primaryStage.setScene(scene);
        primaryStage.setTitle("Guichets multiples avec files choisies");
        primaryStage.show();
    }

    private void ajouterGuichet() {
        int id = ++guichetCount;
        GuichetPane pane = new GuichetPane(id);
        guichets.put(id, pane);
        guichetContainer.getChildren().add(pane);
    }

    private class GuichetPane extends VBox {
        private final int id;
        private final ExecutorService executor = Executors.newSingleThreadExecutor();
        private final Queue<String> file = new LinkedList<>();
        private final ListView<String> listView = new ListView<>();
        private final Label lblEnCours = new Label("(Aucun client en cours)");
        private final Button btnAjouterClient = new Button("Ajouter client ici");
        private final Button btnToggle = new Button("Fermer le guichet");
        private boolean ouvert = true;
        private int clientIndex = 1;

        public GuichetPane(int id) {
            this.id = id;
            setPadding(new Insets(10));
            setSpacing(10);
            setStyle("-fx-border-color: #ccc; -fx-border-radius: 8; -fx-padding: 10");

            Label titre = new Label("Guichet " + id);
            titre.setStyle("-fx-font-weight: bold; -fx-font-size: 14px");

            btnAjouterClient.setOnAction(e -> ajouterClient());
            btnToggle.setOnAction(e -> toggleOuverture());

            getChildren().addAll(titre, lblEnCours, listView, new HBox(10, btnAjouterClient, btnToggle));
        }

        private void ajouterClient() {
            if (!ouvert) {
                Alert alert = new Alert(Alert.AlertType.INFORMATION, "Ce guichet est fermé.");
                alert.showAndWait();
                return;
            }
            String nom = "Client " + (clientIndex++);
            file.add(nom);
            listView.getItems().add(nom);

            executor.submit(() -> {
                synchronized (this) {
                    String client = file.poll();
                    Platform.runLater(() -> {
                        listView.getItems().remove(client);
                        lblEnCours.setText("En cours : " + client);
                    });
                    try {
                        Thread.sleep(1000 + new Random().nextInt(2000));
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                    Platform.runLater(() -> lblEnCours.setText("(Aucun client en cours)"));
                }
            });
        }

        private void toggleOuverture() {
            ouvert = !ouvert;
            btnToggle.setText(ouvert ? "Fermer le guichet" : "Ouvrir le guichet");
            btnAjouterClient.setDisable(!ouvert);
        }
    }

    public static void main(String[] args) {
        launch();
    }
}
