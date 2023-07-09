import entities.Borrow;

import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicInteger;

public class BorrowThread extends Thread {

    public static final int nThreads = 16;
    public static AtomicInteger successOps = new AtomicInteger(0);
    public static Semaphore semaphore = new Semaphore(nThreads);

    private final int id;
    private final LibraryManagementSystem library;
    private final Borrow borrow;

    public BorrowThread(int id, LibraryManagementSystem library, Borrow borrow) {
        this.id = id;
        this.library = library;
        this.borrow = borrow;
    }

    @Override
    public void run() {
        try {
            System.out.printf("Thread %d begin to wait signal\n", id);
            semaphore.acquire();
            System.out.printf("Thread %d start to borrow book\n", id);
            if (library.borrowBook(borrow).ok) {
                successOps.incrementAndGet();
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void acquireAll() {
        try {
            semaphore.acquire(nThreads);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static void releaseAll() {
        semaphore.release(nThreads);
    }

}
