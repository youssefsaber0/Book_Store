package com.example.application.endpoints.helloreact;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class HelloReactEndpoint {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private final ObjectMapper mapper = new ObjectMapper();

    @Nonnull
    public String sayHello(@Nonnull String name) {
        if (name.isEmpty()) {
            return "Hello stranger";
        } else {
            return "Hello " + name;
        }
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
            List<Map<String, Object>> ls = jdbcTemplate.queryForList("SELECT  ANY_VALUE(b.isbn) isbn, ANY_VALUE(b.title) title, ANY_VALUE(b.publication_year) publication_year, ANY_VALUE(b.category) category, ANY_VALUE(b.publication_year) publication_year, ANY_VALUE(b.stock) stock, ANY_VALUE(b.price) price, ANY_VALUE(b.publisher_name) publisher_name, GROUP_CONCAT(a.author_name) author FROM BOOK b JOIN AUTHOR a ON FIND_IN_SET(a.isbn, b.isbn) LIMIT " + (page * 30) + ", 30;");   
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }
}