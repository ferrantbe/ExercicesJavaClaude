package _05eventPropagation;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class EventPropagationApp extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {

        HBox hbox = new HBox();
        CheckBox cb = new CheckBox("consume au niveau du BorderPane");
        hbox.getChildren().add(cb);

        Pane pane = new Pane();
        Color blue = Color.BLUE;
        Rectangle rect = new Rectangle(100, 100);
        rect.setFill(blue);
        rect.setX(200);
        rect.setY(200);

        Circle cercle = new Circle(200, Color.RED);

        pane.getChildren().addAll(rect, cercle);
        cercle.setCenterX(600);
        cercle.setCenterY(300);

        // on crée le layout dans lesquels seront déposés le hbox et la zone de texte
        BorderPane root = new BorderPane();
        root.setCenter(pane);
        root.setTop(hbox);
        Scene scene = new Scene(root, 1200, 600);

        cercle.addEventHandler(MouseEvent.MOUSE_CLICKED, me -> System.out.println("MouseEvent1 sur cercle"));
        cercle.addEventHandler(MouseEvent.MOUSE_CLICKED, me -> System.out.println("MouseEvent2 sur cercle"));
        root.addEventFilter(MouseEvent.MOUSE_CLICKED, me -> {
            System.out.println("MouseEvent sur BorderPane");
            if (cb.isSelected())
                me.consume();
        });

        primaryStage.setScene(scene);
        primaryStage.setTitle("Evenements Souris");
        primaryStage.setResizable(true);
        primaryStage.show();

    }
}
