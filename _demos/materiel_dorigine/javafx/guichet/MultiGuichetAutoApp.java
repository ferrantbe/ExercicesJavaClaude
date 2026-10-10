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

public class MultiGuichetAutoApp extends Application {

    private HBox guichetContainer;
    private int guichetCount = 0;
    private Map<Integer, GuichetPane> guichets = new HashMap<>();
    private ScheduledExecutorService clientArrivalScheduler;
    private boolean autoArrivalsEnabled = false;

    @Override
    public void start(Stage primaryStage) {
        guichetContainer = new HBox(10);
        guichetContainer.setPadding(new Insets(10));

        Button btnAjouterGuichet = new Button("Ajouter un guichet");
        btnAjouterGuichet.setOnAction(e -> ajouterGuichet());

        Button btnArriveeClient = new Button("Déclencher arrivée d'un client");
        btnArriveeClient.setOnAction(e -> ajouterClientAutomatique());

        Button btnToggleAuto = new Button("Activer arrivée automatique");
        btnToggleAuto.setOnAction(e -> toggleArriveeAutomatique(btnToggleAuto));

        HBox controls = new HBox(10, btnAjouterGuichet, btnArriveeClient, btnToggleAuto);
        VBox root = new VBox(15, controls, new Separator(), guichetContainer);
        root.setPadding(new Insets(15));

        Scene scene = new Scene(root, 1000, 600);
        primaryStage.setScene(scene);
        primaryStage.setTitle("Guichets multiples avec files choisies");
        primaryStage.show();

        clientArrivalScheduler = Executors.newSingleThreadScheduledExecutor();
        primaryStage.setOnCloseRequest(e -> {
            clientArrivalScheduler.shutdownNow();
            guichets.values().forEach(GuichetPane::shutdown);
        });
    }

    private void toggleArriveeAutomatique(Button toggleButton) {
        autoArrivalsEnabled = !autoArrivalsEnabled;
        toggleButton.setText(autoArrivalsEnabled ? "Désactiver arrivée automatique" : "Activer arrivée automatique");
        if (autoArrivalsEnabled) {
            clientArrivalScheduler.scheduleAtFixedRate(this::ajouterClientAutomatique, 2, 3, TimeUnit.SECONDS);
        } else {
            clientArrivalScheduler.shutdownNow();
            clientArrivalScheduler = Executors.newSingleThreadScheduledExecutor();
        }
    }

    private void ajouterGuichet() {
        int id = ++guichetCount;
        GuichetPane pane = new GuichetPane(id);
        guichets.put(id, pane);
        Platform.runLater(() -> guichetContainer.getChildren().add(pane));
    }

    private void ajouterClientAutomatique() {
        List<GuichetPane> ouverts = guichets.values().stream().filter(g -> g.ouvert).toList();
        if (ouverts.isEmpty()) return;
        GuichetPane cible = ouverts.get(new Random().nextInt(ouverts.size()));
        cible.ajouterClientAuto();
    }

    private class GuichetPane extends VBox {
        private final int id;
        private final ExecutorService executor = Executors.newSingleThreadExecutor();
        private final Queue<String> file = new ConcurrentLinkedQueue<>();
        private final ListView<String> listView = new ListView<>();
        private final Label lblEnCours = new Label("(Aucun client en cours)");
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

            btnToggle.setOnAction(e -> toggleOuverture());

            getChildren().addAll(titre, lblEnCours, listView, btnToggle);
        }

        public void ajouterClientAuto() {
            String nom = "Client " + (id * 1000 + clientIndex++);
            file.add(nom);
            Platform.runLater(() -> listView.getItems().add(nom));

            executor.submit(() -> {
                String client;
                synchronized (this) {
                    client = file.poll();
                }
                if (client == null) return;
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
            });
        }

        private void toggleOuverture() {
            ouvert = !ouvert;
            btnToggle.setText(ouvert ? "Fermer le guichet" : "Ouvrir le guichet");
            if (!ouvert) {
                List<String> restants = new ArrayList<>(file);
                file.clear();
                Platform.runLater(listView.getItems()::clear);
                List<GuichetPane> autresOuverts = guichets.values().stream().filter(g -> g != this && g.ouvert).toList();
                for (String client : restants) {
                    if (!autresOuverts.isEmpty()) {
                        GuichetPane cible = autresOuverts.get(new Random().nextInt(autresOuverts.size()));
                        cible.redirigerClient(client);
                    }
                }
            }
        }

        private void redirigerClient(String nom) {
            file.add(nom);
            Platform.runLater(() -> listView.getItems().add(nom));

            executor.submit(() -> {
                String client;
                synchronized (this) {
                    client = file.poll();
                }
                if (client == null) return;
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
            });
        }

        public void shutdown() {
            executor.shutdownNow();
        }
    }

    public static void main(String[] args) {
        launch();
    }
}
