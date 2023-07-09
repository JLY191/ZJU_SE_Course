package entities;

import java.util.Date;

public final class Borrow {
    private int cardId;
    private int bookId;
    /* Note: we use unix time stamp to represent borrow time & return time */
    private long borrowTime;
    private long returnTime; // set to 0 if the user has not returned the book

    public Borrow() {
    }

    public Borrow(Book book, Card card) {
        this.bookId = book.getBookId();
        this.cardId = card.getCardId();
    }

    public Borrow(int bookId, int cardId) {
        this.bookId = bookId;
        this.cardId = cardId;
    }

    @Override
    public String toString() {
        return "Borrow {" + "cardId=" + cardId +
                ", bookId=" + bookId +
                ", borrowTime=" + borrowTime +
                ", returnTime=" + returnTime +
                '}';
    }

    public void resetBorrowTime() {
        this.borrowTime = new Date().getTime();
        try {
            Thread.sleep(1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void resetReturnTime() {
        this.returnTime = new Date().getTime();
        try {
            Thread.sleep(1);
        } catch (Exception e) {
            e.printStackTrace();
        }
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
