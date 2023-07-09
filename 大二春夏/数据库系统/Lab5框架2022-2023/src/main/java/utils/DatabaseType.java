package utils;

public enum DatabaseType {
    MYSQL("mysql", "com.mysql.cj.jdbc.Driver", new MysqlInitializer()),
    // TODO: to be updated
    POSTGRES("postgresql", "org.postgresql.Driver", new MysqlInitializer()),
    SQLSERVER("sqlserver", "com.microsoft.sqlserver.jdbc.SQLServerDriver", new SqlServerInitializer());

    DatabaseType(String typeName, String driverName, DBInitializer dbInitializer) {
        this.typeName = typeName;
        this.driverName = driverName;
        this.dbInitializer = dbInitializer;
    }

    @Override
    public String toString() {
        return "DatabaseType{" +
                "typeName='" + typeName + '\'' +
                ", driverName='" + driverName + '\'' +
                '}';
    }

    public String url(String host, String port, String db) {
        switch (this) {
            case SQLSERVER:
                return String.format("jdbc:sqlserver://%s:%s;DatabaseName=%s;encrypt=false", host, port, db);
            case MYSQL:
            case POSTGRES:
                return String.format("jdbc:%s://%s:%s/%s", typeName, host, port, db);
        }
        return null;
    }

    public static DatabaseType instance(String typeName) throws IllegalArgumentException {
        for (DatabaseType type : DatabaseType.values()) {
            if (type.typeName.equals(typeName.toLowerCase())) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid database type name.");
    }

    public String getTypeName() {
        return typeName;
    }

    public String getDriverName() {
        return driverName;
    }

    public DBInitializer getDbInitializer() {
        return dbInitializer;
    }

    private final String typeName;
    private final String driverName;
    private final DBInitializer dbInitializer;

};