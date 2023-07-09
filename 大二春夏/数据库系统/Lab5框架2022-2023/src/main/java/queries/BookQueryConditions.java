package queries;

import entities.Book;

/**
 * Note: (1) all non-null attributes should be used as query
 *       conditions and connected by "AND" operations.
 *       (2) for range query of an attribute, the maximum and
 *       minimum values use closed intervals.
 *       eg: minA=x, maxA=y ==> x <= A <= y
 *           minA=null, maxA=y ==> A <= y
 *           minA=x, maxA=null ==> A >= x
 * */
public class BookQueryConditions {
    /* Note: use exact matching */
    private String category;
    /* Note: use fuzzy matching */
    private String title;
    /* Note: use fuzzy matching */
    private String press;
    private Integer minPublishYear;
    private Integer maxPublishYear;
    /* Note: use fuzzy matching */
    private String author;
    private Double minPrice;
    private Double maxPrice;
    /* sort by which field */
    private Book.SortColumn sortBy;
    /* default sort by PK */
    private SortOrder sortOrder;

    public BookQueryConditions() {
        this.category = null;
        this.title = null;
        this.press = null;
        this.minPublishYear = null;
        this.maxPublishYear = null;
        this.author = null;
        this.minPrice = null;
        this.maxPrice = null;
        sortBy = Book.SortColumn.BOOK_ID;
        sortOrder = SortOrder.ASC;
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

    public Integer getMinPublishYear() {
        return minPublishYear;
    }

    public void setMinPublishYear(Integer minPublishYear) {
        this.minPublishYear = minPublishYear;
    }

    public Integer getMaxPublishYear() {
        return maxPublishYear;
    }

    public void setMaxPublishYear(Integer maxPublishYear) {
        this.maxPublishYear = maxPublishYear;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice) {
        this.minPrice = minPrice;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Book.SortColumn getSortBy() {
        return sortBy;
    }

    public void setSortBy(Book.SortColumn sortBy) {
        this.sortBy = sortBy;
    }

    public SortOrder getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(SortOrder sortOrder) {
        this.sortOrder = sortOrder;
    }
}
