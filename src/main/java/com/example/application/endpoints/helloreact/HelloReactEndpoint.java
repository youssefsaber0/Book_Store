package com.example.application.endpoints.helloreact;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.example.application.security.UserInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
@SuppressWarnings("null")
public class HelloReactEndpoint {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private final ObjectMapper mapper = new ObjectMapper();

    private int getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        return jdbcTemplate.queryForObject("SELECT user_id FROM USER WHERE email = ?", Integer.class, new Object[] { name });
    }

    @Nonnull
    public String testDBQuery() {
        try {
            List<Map<String, Object>> ls = jdbcTemplate.queryForList("select * from BOOK");
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBook(@Nonnull int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK LIMIT ?, 30;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql, new Object[] { page });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public boolean register(@Nonnull String username, @Nonnull String password) {
        try {
            final String sql = "INSERT INTO USER (first_name, last_name, email, password, role, shipping_address, phone_number, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW());";
            final String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            jdbcTemplate.update(sql, new Object[] { username, "", username, hashedPassword, "admin", "", "" });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Nonnull
    public UserInfo getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        Map<String, Object> ls = jdbcTemplate.queryForMap("SELECT * FROM USER WHERE email = ?;", new Object[] { name });
        UserInfo userInfo = new UserInfo(
            (Integer) ls.get("user_id"),
            (String) ls.get("first_name"),
            (String) ls.get("last_name"),
            (String) ls.get("email"),
            (String) ls.get("role"),
            (String) ls.get("shipping_address"),
            (String) ls.get("phone_number")
        );
        return userInfo;
    }
}