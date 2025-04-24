package com.example.mohangpj.scheduleapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.SQLException;

@RestController
public class DbTestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/api/db-test")
    public String testDb() throws SQLException {
        return "DB 연결 성공: " + dataSource.getConnection().getMetaData().getURL();
    }
}
