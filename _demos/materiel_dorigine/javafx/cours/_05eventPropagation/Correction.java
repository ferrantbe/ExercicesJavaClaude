package _05eventPropagation;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class Correction extends Application {
    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {

        CheckBox cb = new CheckBox("consume actif");


        Rectangle rect = new Rectangle(120, 60, Color.GREEN);
        rect.setX(140); rect.setY(80);

        Circle cerc = new Circle(200, Color.LIGHTPINK);
        cerc.setCenterX(360); cerc.setCenterY(240);
        cerc.addEventHandler(MouseEvent.MOUSE_CLICKED, me -> afficheEvent("cercle 1"));
        cerc.addEventHandler(MouseEvent.MOUSE_CLICKED, me -> afficheEvent("cercle 2"));

        Pane p = new Pane();
        p.getChildren().addAll(cerc, rect);

        BorderPane bp = new BorderPane();
        bp.setCenter(p);
        bp.setTop(cb);

        bp.addEventFilter(MouseEvent.MOUSE_CLICKED, me -> {
            afficheEvent("border pane");
            if (cb.isSelected())
                me.consume();
        });


        Scene scene = new Scene(bp, 640, 480);

        primaryStage.setScene(scene);
        primaryStage.setTitle("EventFilter et EventHandler");
        primaryStage.setResizable(true);
        primaryStage.show();

    }

    private void afficheEvent(String s) {
        System.out.println(s);
    }
}
