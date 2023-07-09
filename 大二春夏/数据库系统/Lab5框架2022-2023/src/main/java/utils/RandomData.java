package utils;

import entities.Book;
import org.apache.commons.lang3.RandomUtils;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

public final class RandomData {

    public static final List<String> categories = Arrays.asList("Computer Science", "Nature", "Philosophy",
            "History", "Autobiography", "Magazine", "Dictionary", "Novel", "Horror", "Others");
    public static final List<String> press = Arrays.asList("Press-A", "Press-B", "Press-C", "Press-D",
            "Press-E", "Press-F", "Press-G", "Press-H");
    public static final List<String> authors = Arrays.asList("Nonehyo", "DouDou", "Coco", "Yuuku", "SoonWhy",
            "Fubuki", "Authentic", "Immortal", "ColaOtaku", "Erica", "ZaiZai", "DaDa", "Hgs");
    public static final List<String> titles = Arrays.asList("Database System Concepts", "Computer Networking",
            "Algorithms", "Database System Designs", "Compiler Designs", "C++ Primer", "Operating System",
            "The Old Man and the Sea", "How steel is made", "Le Petit Prince", "The Metamorphosis",
            "Miserable World", "Gone with the wind", "Eugenie Grandet", "Analysis of Dreams");
    public static final List<String> departments = Arrays.asList("Computer Science", "Law",
            "Management", "Civil Engineering", "Architecture", "Environmental Science",
            "English Language", "General Education", "Ideological & Political");

    public static Book randomBook() {
        return new Book(randomCategory(), randomTitle(), randomPress(), randomPublishYear(),
                randomAuthor(), randomPrice(), randomStock());
    }

    public static String randomCategory() {
        return categories.get(new Random().nextInt(categories.size()));
    }

    public static String randomPress() {
        return press.get(new Random().nextInt(press.size()));
    }

    public static String randomAuthor() {
        return authors.get(new Random().nextInt(authors.size()));
    }

    public static String randomTitle() {
        return titles.get(new Random().nextInt(titles.size()));
    }

    public static int randomPublishYear() {
        return RandomUtils.nextInt(2000, 2023);
    }

    public static double randomPrice() {
        double v = RandomUtils.nextDouble(0.1, 233.3);
        return Double.parseDouble(String.format("%.2f", v));
    }

    public static int randomStock() {
        return RandomUtils.nextInt(1, 100);
    }

    public static String randomDepartment() {
        return departments.get(new Random().nextInt(departments.size()));
    }

    private static final Calendar calStart = Calendar.getInstance();
    private static final Calendar calEnd = Calendar.getInstance();
    static {
        calStart.set(Calendar.YEAR, 2017);
        calEnd.set(Calendar.YEAR, 2023);
    }

    public static long randomTime() {
        return RandomUtils.nextLong(calStart.getTimeInMillis(), calEnd.getTimeInMillis());
    }

}
