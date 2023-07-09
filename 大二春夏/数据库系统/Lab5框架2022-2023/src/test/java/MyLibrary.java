import entities.Book;
import entities.Borrow;
import entities.Card;
import org.apache.commons.lang3.RandomUtils;
import org.junit.Assert;
import queries.ApiResult;
import utils.RandomData;

import java.util.*;

public class MyLibrary {

    public List<Book> books;
    public List<Card> cards;
    public List<Borrow> borrows;

    public MyLibrary(List<Book> books, List<Card> cards, List<Borrow> borrows) {
        this.books = books;
        this.cards = cards;
        this.borrows = borrows;
    }

    public int nBooks() {
        return books.size();
    }

    public int nCards() {
        return cards.size();
    }

    public int nBorrows() {
        return borrows.size();
    }

    public static MyLibrary createLibrary(LibraryManagementSystem library, int nBooks,
                                          int nCards, int nBorrows) {
        /* create books */
        Set<Book> bookSet = new HashSet<>();
        while (bookSet.size() < nBooks) {
            bookSet.add(RandomData.randomBook());
        }
        List<Book> bookList = new ArrayList<>(bookSet);
        ApiResult res = library.storeBook(bookList);
        Assert.assertTrue(res.ok);
        /* create cards */
        List<Card> cardList = new ArrayList<>();
        for (int i = 0; i < nCards; i++) {
            Card c = new Card();
            c.setName(String.format("User%05d", i));
            c.setDepartment(RandomData.randomDepartment());
            c.setType(Card.CardType.random());
            cardList.add(c);
            Assert.assertTrue(library.registerCard(c).ok);
        }
        /* create histories */
        List<Borrow> borrowList = new ArrayList<>();
        PriorityQueue<Long> mills = new PriorityQueue<>();
        for (int i = 0; i < nBorrows * 2; i++) {
            mills.add(RandomData.randomTime());
        }
        for (int i = 0; i < nBorrows;) {
            Book b = bookList.get(RandomUtils.nextInt(0, nBooks));
            if (b.getStock() == 0) {
                continue;
            }
            i++;
            Card c = cardList.get(RandomUtils.nextInt(0, nCards));
            Borrow r = new Borrow();
            r.setCardId(c.getCardId());
            r.setBookId(b.getBookId());
            r.setBorrowTime(mills.poll());
            r.setReturnTime(mills.poll());
            Assert.assertTrue(library.borrowBook(r).ok);
            Assert.assertTrue(library.returnBook(r).ok);
            borrowList.add(r);
        }
        return new MyLibrary(bookList, cardList, borrowList);
    }

}
