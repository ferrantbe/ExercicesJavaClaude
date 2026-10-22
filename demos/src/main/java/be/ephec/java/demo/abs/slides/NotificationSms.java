package be.ephec.java.demo.abs.slides;

/** Une fille concrete de Notification (ABS, section 3) : elle ne fournit que son canal. */
public class NotificationSms extends Notification {

    public NotificationSms(String destinataire) {
        super(destinataire);
    }

    @Override
    protected String canal() {
        return "sms";
    }
}
