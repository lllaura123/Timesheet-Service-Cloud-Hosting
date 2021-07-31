package com.exxeta.timesheetapproveservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
@Profile({"cloud", "local", "default"})
public class UserDBRepository {
    @Value("${db.url}")
    private String dbUrl;
    @Value("${db.userName}")
    private String dbUsername;
    @Value("${db.password}")
    private String dbPassword;

    public void addUser(String userName, String password, boolean isStudent) {
        executeSqlUpdate("CREATE TABLE IF NOT EXISTS users (userName varchar(255) NOT NULL, password varchar(255) NOT NULL, isStudent BOOLEAN NOT NULL, PRIMARY KEY (userName))");
        executeSqlUpdate("INSERT INTO users(userName,password, isStudent) VALUES('" + userName + "','" + password + "','" + isStudent + "') ON CONFLICT(userName) DO UPDATE " +
                "SET password=EXCLUDED.password, isStudent=EXCLUDED.isStudent;");
    }

    public void deleteUser(String username){
        executeSqlUpdate("DELETE FROM students WHERE userName='" + username + "'");
    }

    public boolean loginDataIsValid(String userName, String password){
        try (Connection con = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)
        ) {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE userName='" + userName + "' AND password='"+password+"'");
            if (rs.next()) {
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean userIsStudent(String userName) {
        boolean isStudent = true;
        try (Connection con = DriverManager.getConnection(dbUrl, dbUsername, dbPassword)
        ) {
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE userName='" + userName + "'");
            if (rs.next()) {
                isStudent=rs.getBoolean("isStudent");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return isStudent;
    }

    private void executeSqlUpdate(String sql) {
        try (Connection con = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
             Statement stmt = con.createStatement()) {
            stmt.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
