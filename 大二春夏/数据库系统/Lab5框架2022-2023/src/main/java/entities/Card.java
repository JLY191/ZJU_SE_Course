package entities;

import java.util.Objects;
import java.util.Random;

public final class Card {

    public enum CardType {
        Student("S"),
        Teacher("T");

        private final String str;

        CardType(String str) {
            this.str = str;
        }

        public String getStr() {
            return str;
        }

        public static CardType values(String s) {
            if ("S".equals(s)) {
                return Student;
            } else if ("T".equals(s)) {
                return Teacher;
            } else {
                return null;
            }
        }

        public static CardType random() {
            return values()[new Random().nextInt(values().length)];
        }
    };

    private int cardId;
    private String name;
    private String department;
    private CardType type;

    /* we assume that two cards are equal iff their name...type are equal */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Card card = (Card) o;
        return name.equals(card.name) &&
                department.equals(card.department) &&
                type == card.type;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, department, type);
    }

    @Override
    public String toString() {
        return "Card {" + "cardId=" + cardId +
                ", name='" + name + '\'' +
                ", department='" + department + '\'' +
                ", type=" + type +
                '}';
    }

    public Card() {
    }

    public Card(int cardId, String name, String department, CardType type) {
        this.cardId = cardId;
        this.name = name;
        this.department = department;
        this.type = type;
    }

    @Override
    public Card clone() {
        return new Card(cardId, name, department, type);
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId(int cardId) {
        this.cardId = cardId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public CardType getType() {
        return type;
    }

    public void setType(CardType type) {
        this.type = type;
    }
}
