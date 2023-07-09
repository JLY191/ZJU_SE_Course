package queries;

import entities.Book;
import entities.Borrow;

import java.util.List;

public class BorrowHistories {

    public static class Item {
        private int cardId;
        private int bookId;
        private String category;
        private String title;
        private String press;
        private int publishYear;
        private String author;
        private double price;
        private long borrowTime;
        private long returnTime;

        public Item() {
        }

        public Item(int cardId, Book book, Borrow borrow) {
            this.cardId = cardId;
            this.bookId = book.getBookId();
            this.category = book.getCategory();
            this.title = book.getTitle();
            this.press = book.getPress();
            this.publishYear = book.getPublishYear();
            this.author = book.getAuthor();
            this.price = book.getPrice();
            this.borrowTime = borrow.getBorrowTime();
            this.returnTime = borrow.getReturnTime();
        }

        @Override
        public String toString() {
            return "Item {" + "cardId=" + cardId +
                    ", bookId=" + bookId +
                    ", category='" + category + '\'' +
                    ", title='" + title + '\'' +
                    ", press='" + press + '\'' +
                    ", publishYear=" + publishYear +
                    ", author='" + author + '\'' +
                    ", price=" + price +
                    ", borrowTime=" + borrowTime +
                    ", returnTime=" + returnTime +
                    '}';
        }

        public int getCardId() {
            return cardId;
        }

        public void setCardId(int cardId) {
            this.cardId = cardId;
        }

        public int getBookId() {
            return bookId;
        }

        public void setBookId(int bookId) {
            this.bookId = bookId;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getPress() {
            return press;
        }

        public void setPress(String press) {
            this.press = press;
        }

        public int getPublishYear() {
            return publishYear;
        }

        public void setPublishYear(int publishYear) {
            this.publishYear = publishYear;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public long getBorrowTime() {
            return borrowTime;
        }

        public void setBorrowTime(long borrowTime) {
            this.borrowTime = borrowTime;
        }

        public long getReturnTime() {
            return returnTime;
        }

        public void setReturnTime(long returnTime) {
            this.returnTime = returnTime;
        }
    }

    private int count;
    private List<Item> items;

    public BorrowHistories(List<Item> items) {
        this.count = items.size();
        this.items = items;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
