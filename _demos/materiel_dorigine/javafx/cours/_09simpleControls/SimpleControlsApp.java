package _09simpleControls;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class SimpleControlsApp extends Application {

    private TextField txtNom, txtPrenom;
    private RadioButton rbH, rbF;
    private CheckBox cbEN, cbFR, cbNL;
    private Stage primaryStage;

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {

        this.primaryStage = primaryStage;
        // on crée le bouton
        Button btnOK = new Button("Enregistrer");
        btnOK.setOnAction(e -> confirmForm());

        // on crée le label
        Label lblNom = new Label("Nom");
        txtNom = new TextField();
        txtNom.setPromptText("Entrez votre Nom");
        HBox hbNom = new HBox();
        hbNom.setSpacing(20);
        hbNom.getChildren().addAll(lblNom, txtNom);


        Label lblPrenom = new Label("Prénom");
        txtPrenom = new TextField();
        txtPrenom.setPromptText("Entrez votre Prénom");
        HBox hbPrenom = new HBox();
        hbPrenom.setSpacing(20);
        hbPrenom.getChildren().addAll(lblPrenom, txtPrenom);


        rbH = new RadioButton("Homme");
        rbF = new RadioButton("Femme");
        HBox hbSex = new HBox();
        hbSex.setSpacing(20);
        hbSex.getChildren().addAll(rbH, rbF);
        ToggleGroup tgSex = new ToggleGroup();
        rbH.setToggleGroup(tgSex);
        rbF.setToggleGroup(tgSex);


        cbEN = new CheckBox("Anglais");
        cbFR = new CheckBox("Français");
        cbNL = new CheckBox("Néerlandais");
        HBox hbLng = new HBox();
        hbLng.setSpacing(20);
        hbLng.getChildren().addAll(cbEN, cbFR, cbNL);


        // on crée le layout dans lesquels seront déposés le bouton et le label
        VBox root = new VBox();
        root.setAlignment(Pos.CENTER);
        root.setSpacing(20);
        root.getChildren().addAll(hbNom, hbPrenom, hbSex, hbLng, btnOK);

        Scene scene = new Scene(root);

        primaryStage.setScene(scene);
        primaryStage.setTitle("Who are you?");
        primaryStage.show();
    }

    private void confirmForm() {
        Personne p = new Personne(txtNom.getText(), txtPrenom.getText(), rbH.isSelected()? 'H': 'F', cbEN.isSelected(), cbFR.isSelected(), cbNL.isSelected());
        System.out.println(p);
        primaryStage.close();
    }
}
