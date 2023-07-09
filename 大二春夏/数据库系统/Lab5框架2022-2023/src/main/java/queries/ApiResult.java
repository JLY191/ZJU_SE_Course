package queries;

public class ApiResult {

    /* whether the operation is successfully completed */
    public boolean ok;
    /* information message returned by Api */
    public String message;
    /* other information returned by the interface */
    public Object payload;

    public ApiResult(boolean ok, Object payload) {
        this.ok = ok;
        this.payload = payload;
    }

    public ApiResult(boolean ok, String message) {
        this.ok = ok;
        this.message = message;
    }

    public ApiResult(boolean ok, String message, Object payload) {
        this.ok = ok;
        this.message = message;
        this.payload = payload;
    }

}
