package _04mouseEvent;

import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class MouseEventApp extends Application {
    TextArea textArea;
    CheckBox cbClicked;
    CheckBox cbDragged;
    CheckBox cbEntered;
    CheckBox cbExited;
    CheckBox cbMoved;
    CheckBox cbPressed;
    CheckBox cbReleased;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        // on crée le bouton
        Button btnReset = new Button("Remise à Zéro");
        btnReset.setOnAction(e -> textArea.setText(""));
        // btnReset.addEventHandler(ActionEvent.ACTION, (e -> System.out.println("Button!")));

        Label lbl = new Label("Utilisez votre souris pour déclencher des événements...");

        cbClicked = new CheckBox("Clicked");
        cbDragged = new CheckBox("Dragged");
        cbEntered = new CheckBox("Entered");
        cbExited = new CheckBox("Exited");
        cbMoved = new CheckBox("Moved");
        cbPressed = new CheckBox("Pressed");
        cbReleased = new CheckBox("Released");

        // le label et le bouton sont dans une HBox
        HBox hbox = new HBox();
        hbox.setAlignment(Pos.CENTER);
        hbox.setSpacing(20);
        hbox.getChildren().addAll(lbl, btnReset, cbClicked, cbDragged, cbEntered, cbExited, cbMoved, cbPressed, cbReleased);

        // on crée le textArea
        textArea = new TextArea();
        textArea.focusTraversableProperty().setValue(false);
        textArea.setEditable(false);
        // textArea.setDisable(true);

        StackPane sp = new StackPane(textArea);
        Color blue = Color.BLUE;
        Rectangle rect = new Rectangle(100, 100);
        rect.setFill(blue);
        rect.addEventHandler(MouseEvent.MOUSE_CLICKED, mouseHandler);

        sp.getChildren().add(rect);

        // on crée le layout dans lesquels seront déposés le hbox et la zone de texte
        BorderPane root = new BorderPane();
        root.setTop(hbox);
        root.setCenter(sp);

        Scene scene = new Scene(root, 1200, 600);


        rect.setOnMouseClicked(mouseHandler);
        rect.setOnMouseDragged(mouseHandler);
        rect.setOnMouseEntered(mouseHandler);
        rect.setOnMouseExited(mouseHandler);
        rect.setOnMouseMoved(mouseHandler);
        rect.setOnMousePressed(mouseHandler);
        rect.setOnMouseReleased(mouseHandler);


        primaryStage.setScene(scene);
        primaryStage.setTitle("Evenements Souris");
        primaryStage.setResizable(true);
        primaryStage.setFullScreen(true);
        primaryStage.show();
    }

    EventHandler<MouseEvent> mouseHandler = (me) -> {

        String oldText = textArea.getText();

        String eventType = me.getEventType().toString();
        if (!cbClicked.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_CLICKED))
            return;
        if (!cbDragged.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_DRAGGED))
            return;
        if (!cbEntered.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_ENTERED))
            return;
        if (!cbExited.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_EXITED))
            return;
        if (!cbDragged.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_DRAGGED))
            return;
        if (!cbMoved.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_MOVED))
            return;
        if (!cbPressed.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_PRESSED))
            return;
        if (!cbReleased.isSelected() && me.getEventType().equals(MouseEvent.MOUSE_RELEASED))
            return;

        String xy = "X, Y : (" + me.getX() + ", " + me.getY() + ")\n";
        String sceneXy = "SceneX, SceneY : (" + me.getSceneX() + ", " + me.getSceneY() + ")\n";
        String screenXy = "ScreenX, ScreenY : (" + me.getScreenX() + ", " + me.getScreenY() + ")\n";
        String altControlMetaShift = (me.isAltDown() ? "A" : " ") +
                (me.isControlDown() ? "C" : " ") +
                (me.isMetaDown() ? "M" : " ") +
                (me.isShiftDown() ? "S" : " ");

        StringBuilder newText = new StringBuilder();
        newText.append("Event type:  ");
        newText.append(eventType);
        newText.append("\n");
        newText.append(xy);
        newText.append("\t");
        newText.append(sceneXy);
        newText.append("\t");
        newText.append(screenXy);
        newText.append("\tSpecial: ");
        newText.append(altControlMetaShift);
        newText.append("\n\n");

        this.textArea.appendText(newText.toString());
        me.consume();

    };
}

