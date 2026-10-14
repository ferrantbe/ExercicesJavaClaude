package be.ephec.java.demo.abs.slides;

/** Une fille concrete de Notification (ABS, section 3) : elle ne fournit que son canal. */
public class NotificationPush extends Notification {

    public NotificationPush(String destinataire) {
        super(destinataire);
    }

    @Override
    protected String canal() {
        return "push";
    }
}
