package queries;

import java.util.Random;

public enum SortOrder {
    ASC("asc"),
    DESC("desc");

    private final String value;

    public String getValue() {
        return value;
    }

    SortOrder(String value) {
        this.value = value;
    }

    public static SortOrder random() {
        return values()[new Random().nextInt(values().length)];
    }
}
