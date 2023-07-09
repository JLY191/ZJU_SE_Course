import entities.Book;
import entities.Borrow;
import entities.Card;
import queries.*;
import utils.DBInitializer;
import utils.DatabaseConnector;

import java.sql.*;
import java.util.List;

public class LibraryManagementSystemImpl implements LibraryManagementSystem {

    private final DatabaseConnector connector;

    public LibraryManagementSystemImpl(DatabaseConnector connector) {
        this.connector = connector;
    }

    @Override
    public ApiResult storeBook(Book book) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult incBookStock(int bookId, int deltaStock) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult storeBook(List<Book> books) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult removeBook(int bookId) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult modifyBookInfo(Book book) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult queryBook(BookQueryConditions conditions) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult borrowBook(Borrow borrow) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult returnBook(Borrow borrow) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult showBorrowHistory(int cardId) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult registerCard(Card card) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult removeCard(int cardId) {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult showCards() {
        return new ApiResult(false, "Unimplemented Function");
    }

    @Override
    public ApiResult resetDatabase() {
        Connection conn = connector.getConn();
        try {
            Statement stmt = conn.createStatement();
            DBInitializer initializer = connector.getConf().getType().getDbInitializer();
            stmt.addBatch(initializer.sqlDropBorrow());
            stmt.addBatch(initializer.sqlDropBook());
            stmt.addBatch(initializer.sqlDropCard());
            stmt.addBatch(initializer.sqlCreateCard());
            stmt.addBatch(initializer.sqlCreateBook());
            stmt.addBatch(initializer.sqlCreateBorrow());
            stmt.executeBatch();
            commit(conn);
        } catch (Exception e) {
            rollback(conn);
            return new ApiResult(false, e.getMessage());
        }
        return new ApiResult(true, null);
    }

    private void rollback(Connection conn) {
        try {
            conn.rollback();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void commit(Connection conn) {
        try {
            conn.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
