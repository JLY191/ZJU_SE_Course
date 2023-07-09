package utils;

public interface DBInitializer {

    String sqlDropBook();
    String sqlDropCard();
    String sqlDropBorrow();
    String sqlCreateBook();
    String sqlCreateCard();
    String sqlCreateBorrow();

}
