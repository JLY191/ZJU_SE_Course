package queries;

import entities.Book;

import java.util.List;

public class BookQueryResults {

    private int count;   /* number of results, equal to results.size() */
    private List<Book> results;

    public BookQueryResults(List<Book> results) {
        this.count = results.size();
        this.results = results;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public List<Book> getResults() {
        return results;
    }

    public void setResults(List<Book> results) {
        this.results = results;
    }
}
