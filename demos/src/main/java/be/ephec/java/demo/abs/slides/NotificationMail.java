package be.ephec.java.demo.abs.slides;

/** Une fille concrete de Notification (ABS, section 3) : elle ne fournit que son canal. */
public class NotificationMail extends Notification {

    public NotificationMail(String destinataire) {
        super(destinataire);
    }

    @Override
    protected String canal() {
        return "mail";
    }
}
