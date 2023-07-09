package utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnector {

    private final ConnectConfig conf;
    private Connection conn;

    public DatabaseConnector(ConnectConfig conf) {
        this.conf = conf;
    }

    public boolean connect() {
        if (conn != null) {
            return false;
        }
        try {
            String url = conf.getType().url(conf.getHost(), conf.getPort(), conf.getDB());
            conn = DriverManager.getConnection(url, conf.getUser(), conf.getPassword());
            if (conn != null) {
                /* Note: you need to connect & release trx explicitly */
                conn.setAutoCommit(false);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean release() {
        if (conn == null) {
            return false;
        }
        try {
            conn.close();
            conn = null;
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Connection getConn() {
        return conn;
    }

    public ConnectConfig getConf() {
        return conf;
    }
}
