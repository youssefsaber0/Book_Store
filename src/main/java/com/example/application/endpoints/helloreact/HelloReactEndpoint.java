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
}