import entities.Book;
import entities.Borrow;
import entities.Card;
import queries.ApiResult;
import queries.BookQueryConditions;

import java.sql.PreparedStatement;
import java.util.List;

/**
 * Note:
 *      (1) all functions in this interface will be regarded as a
 *          transaction. this means that after successfully completing
 *          all operations in a function, you need to call commit(),
 *          or call rollback() if one of the operations in a function fails.
 *          as an example, you can see {@link LibraryManagementSystemImpl#resetDatabase}
 *          to find how to use commit() and rollback().
 *      (2) for each function, you need to briefly introduce how to
 *          achieve this function and how to solve challenges in your
 *          lab report.
 *      (3) if you don't know what the function means, or what it is
 *          supposed to do, looking to the test code might help.
 */
public interface LibraryManagementSystem {

    /* Interface for books */

    /**
     * register a book to database.
     *
     * Note that:
     *      (1) book_id should be stored to book after successfully
     *          completing this operation.
     *      (2) you should not register this book if the book already
     *          exists in the library system.
     *
     * @param book all attributes of the book
     */
    ApiResult storeBook(Book book);

    /**
     * increase the book's inventory by bookId & deltaStock.
     *
     * Note that:
     *      (1) you need to check the correctness of book_id
     *      (2) deltaStock can be negative, but make sure that
     *          the result of book.stock + deltaStock is not negative!
     *
     * @param bookId book's book_id
     * @param deltaStock increase count to book's stock, must be greater
     */
    ApiResult incBookStock(int bookId, int deltaStock);

    /**
     * batch store books.
     *
     * Note that:
     *      (1) you should not call the interface storeBook()
     *          multiple times to achieve this function!!!
     *          hint: use {@link PreparedStatement#executeBatch()}
     *          and {@link PreparedStatement#addBatch()}
     *      (2) if one of the books fails to import, all operations
     *          should be rolled back using rollback() function provided
     *          by JDBC!!!
     *      (3) when binding params to SQL, you are required to avoid
     *          the risk of SQL injection attack!!!
     *
     * @param books list of books to be stored
     */
    ApiResult storeBook(List<Book> books);

    /**
     * remove this book from library system.
     *
     * Note that if someone has not returned this book,
     * the book should not be removed!
     *
     * @param bookId the book to be removed
     */
    ApiResult removeBook(int bookId);

    /**
     * modify a book's information by book_id.book_id.
     *
     * Note that you should not modify its book_id and stock!
     *
     * @param book the book to be modified
     */
    ApiResult modifyBookInfo(Book book);

    /**
     * query books according to different query conditions.
     *
     * Note that:
     *      (1) you should let the DBMS to filter records
     *          that do not satisfy the conditions instead of
     *          filter records in your API.
     *      (2) when binding params to SQL, you also need to avoid
     *          the risk of SQL injection attack.
     *      (3) [*] if all else is equal, sort by book_id in
     *          ascending order!
     *
     * @param conditions query conditions
     *
     * @return query results should be returned by ApiResult.payload
     *         and should be an instance of {@link queries.BookQueryResults}
     */
    ApiResult queryBook(BookQueryConditions conditions);

    /* Interface for borrow & return books */

    /**
     * a user borrows one book with the specific card.
     * the borrow operation will success iff there are
     * enough books in stock & the user has not borrowed
     * the book or has returned it.
     *
     * @param borrow borrow information, include borrower &
     *               book's id & time
     */
    ApiResult borrowBook(Borrow borrow);

    /**
     * A user return one book with specific card.
     *
     * @param borrow borrow information, include borrower & book's id & return time
     */
    ApiResult returnBook(Borrow borrow);

    /**
     * list all borrow histories for a specific card.
     * the returned records should be sorted by borrow_time DESC, book_id ASC
     *
     * @param cardId show which card's borrow history
     * @return query results should be returned by ApiResult.payload
     *         and should be an instance of {@link queries.BorrowHistories}
     */
    ApiResult showBorrowHistory(int cardId);

    /**
     * create a new borrow card. do nothing and return failed if
     * the card already exists.
     *
     * Note that card_id should be stored to card after successfully
     * completing this operation.
     *
     * @param card all attributes of the card
     */
    ApiResult registerCard(Card card);

    /**
     * simply remove a card.
     *
     * Note that if there exists any un-returned books under this user,
     * this card should not be removed.
     *
     * @param cardId card to be removed
     */
    ApiResult removeCard(int cardId);

    /**
     * list all cards order by card_id.
     *
     * @return query results should be returned by ApiResult.payload
     *         and should be an instance of {@link queries.CardList}
     */
    ApiResult showCards();

    /**
     * reset database to its initial state.
     * you are not allowed to complete & modify this function.
     */
    ApiResult resetDatabase();

}
