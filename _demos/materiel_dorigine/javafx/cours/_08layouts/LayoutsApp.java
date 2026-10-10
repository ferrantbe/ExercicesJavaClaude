package _08layouts;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.*;
import javafx.stage.Stage;

public class LayoutsApp extends Application {
    private Stage stage;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        stage = primaryStage;

        Button btnFlow = new Button("FlowLayout");
        btnFlow.setOnAction(e -> showFlow());
        Button btnHBox = new Button("HBox");
        btnHBox.setOnAction(e -> showHBox());
        Button btnVBox = new Button("VBox");
        btnVBox.setOnAction(e -> showVBox());
        Button btnBorder = new Button("BorderPane");
        btnBorder.setOnAction(e -> showBorder());
        Button btnGrid = new Button("GridPane");
        btnGrid.setOnAction(e -> showGrid());
        Button btnStack = new Button("StackPane");
        btnStack.setOnAction(e -> showStack());


        HBox root = new HBox();
        root.setAlignment(Pos.CENTER);
        root.setSpacing(20);
        root.getChildren().addAll(btnFlow, btnHBox, btnVBox, btnBorder, btnGrid, btnStack);
        Scene scene = new Scene(root, 600, 400);
        primaryStage.setScene(scene);
        primaryStage.show();

    }

    private void showFlow() {
        Stage stage = new Stage();
        FlowPane root = new FlowPane();
        addButtons(root);
        Scene scene = new Scene(root, 400, 400);
        stage.setScene(scene);
        stage.setTitle("FlowPane");
        stage.show();
    }

    private void showHBox() {
        Stage stage = new Stage();
        HBox root = new HBox();
        root.setAlignment(Pos.CENTER);
        addButtons(root);
        Scene scene = new Scene(root, 400, 400);
        stage.setScene(scene);
        stage.setTitle("HBox");
        stage.show();
    }

    private void showVBox() {
        Stage stage = new Stage();
        VBox root = new VBox();
        root.setAlignment(Pos.CENTER);
        addButtons(root);
        Scene scene = new Scene(root, 400, 400);
        stage.setScene(scene);
        stage.setTitle("VBox");
        stage.show();
    }

    private void showBorder() {
        Stage stage = new Stage();
        BorderPane root = new BorderPane();
        Button btnTop = new Button("Top");
        root.setTop(btnTop);
        root.setAlignment(btnTop, Pos.CENTER);

        Button btnBottom = new Button("Bottom");
        root.setBottom(btnBottom);
        root.setAlignment(btnBottom, Pos.CENTER);

        Button btnCenter = new Button("Center");
        root.setCenter(btnCenter);
        root.setAlignment(btnCenter, Pos.CENTER);

        Button btnLeft = new Button("Left");
        root.setLeft(btnLeft);
        root.setAlignment(btnLeft, Pos.CENTER);

        Button btnRight = new Button("Right");
        root.setRight(btnRight);
        root.setAlignment(btnRight, Pos.CENTER);

        Scene scene = new Scene(root, 400, 400);
        stage.setScene(scene);
        stage.setTitle("BorderPane");
        stage.show();
    }

    private void showGrid() {
        Stage stage = new Stage();
        GridPane root = new GridPane();
        root.add(new Button("4, 0"), 4, 0);
        root.add(new Button("0, 2"), 0, 2);
        root.add(new Button("1, 2"), 1, 2);
        root.add(new Button("3, 1"), 3, 1);
        root.add(new Button("2, 2 col 2"), 2, 2, 2, 1);


        Scene scene = new Scene(root, 400, 400);
        stage.setScene(scene);
        stage.setTitle("GridPane");
        stage.show();
    }

    private void showStack() {
        Stage stage = new Stage();
        StackPane root = new StackPane();
        addButtons(root);
        Scene scene = new Scene(root, 400, 400);
        stage.setScene(scene);
        stage.setTitle("StackPane");
        stage.show();
    }

    private void addButtons(Pane root) {
        for (int i = 0; i < 6; i++) {
            Button btn = new Button("Bouton" + i);
            btn.setPrefWidth((7 - i) * 20);
            root.getChildren().add(btn);
        }
    }
}