package com.example.application.endpoints.helloreact;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.example.application.DTO.AddToCartRequest;
import com.example.application.DTO.SignUpRequest;
import com.example.application.DTO.UpdateUserRequest;
import com.example.application.DTO.AddBookRequest;

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
    @Nonnull
    public List<Map<String, Object>> getBooks() {
        try {
            List<Map<String, Object>> ls = jdbcTemplate.queryForList("select * from BOOK");

            return ls;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }}
    private int getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        return jdbcTemplate.queryForObject("SELECT user_id FROM USER WHERE email = ?", Integer.class,
                new Object[] { name });
    }

    public void addToCart(@Nonnull AddToCartRequest request) {
        try {
            int userId = getUserId();
            String isbn = request.isbn();
            int quantity = request.quantity();
            final String isItemInCartSql = "SELECT COUNT(*) FROM CART WHERE user_id = ? AND isbn = ?;";
            final String addToCartSql = "INSERT INTO CART (user_id, isbn, qty) VALUES (?, ?, ?);";
            final String updateCartSql = "UPDATE CART SET qty = qty + ? WHERE user_id = ? AND isbn = ?;";
            boolean isItemInCart = jdbcTemplate.queryForObject(isItemInCartSql, Boolean.class,
                    new Object[] { userId, isbn });
            if (isItemInCart) {
                jdbcTemplate.update(updateCartSql, new Object[] { quantity, userId, isbn });
            } else {
                jdbcTemplate.update(addToCartSql, new Object[] { userId, isbn, quantity });
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Error("Error");
        }
    }

    @Nonnull
    public String getAllBooks(int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql, new Object[] { (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBookByTitle(@Nonnull String keyword, int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK WHERE title LIKE ? LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql,
                    new Object[] { "%" + keyword + "%", (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBookByISBN(@Nonnull String keyword, int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK WHERE isbn LIKE ? LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql,
                    new Object[] { "%" + keyword + "%", (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBookByPublicationYear(@Nonnull String keyword, int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK WHERE publication_year = ? LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql, new Object[] { keyword, (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBookByPublisher(@Nonnull String keyword, int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK WHERE publisher_name LIKE ? LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql,
                    new Object[] { "%" + keyword + "%", (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBookByAuthor(@Nonnull String keyword, int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK WHERE EXISTS (SELECT * FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn AND author_name LIKE ?) LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql, new Object[] { keyword, (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String searchBookByCategory(int keyword, int page) {
        try {
            final String sql = "SELECT *, (SELECT GROUP_CONCAT(author_name SEPARATOR ', ') FROM AUTHOR WHERE AUTHOR.isbn = BOOK.isbn) AS authors FROM BOOK WHERE category = ? LIMIT ?, 10;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql, new Object[] { keyword, (page - 1) * 10 });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    @Nonnull
    public String getCartItems() {
        try {
            final int userId = getUserId();
            final String sql = "SELECT CART.isbn AS isbn, BOOK.title AS title, BOOK.price AS price, CART.qty AS quantity FROM CART, BOOK WHERE CART.user_id = ? AND CART.isbn = BOOK.isbn;";
            List<Map<String, Object>> ls = jdbcTemplate.queryForList(sql, new Object[] { userId });
            final String str = mapper.writeValueAsString(ls);
            return str;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error";
        }
    }

    public void removeCartItem(@Nonnull String isbn) {
        try {
            final int userId = getUserId();
            final String sql = "DELETE FROM CART WHERE user_id = ? AND isbn = ?;";
            jdbcTemplate.update(sql, new Object[] { userId, isbn });
        } catch (Exception e) {
            e.printStackTrace();
            throw new Error("Error");
        }
    }

    @Nonnull
    public boolean register(@Nonnull SignUpRequest req) {
        try {
            final String firstName = req.firstName();
            final String lastName = req.lastName();
            final String email = req.email();
            final String password = req.password();
            final String role = req.role();
            final String shippingAddress = req.shippingAddress();
            final String phoneNumber = req.phoneNumber();
            final String isEmailExistsSql = "SELECT COUNT(*) FROM USER WHERE email = ?;";
            final String registerSql = "INSERT INTO USER (first_name, last_name, email, password, role, shipping_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);";
            final boolean isEmailExists = jdbcTemplate.queryForObject(isEmailExistsSql, Integer.class,
                    new Object[] { email }) > 0;
            if (isEmailExists) {
                return false;
            }
            final String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            jdbcTemplate.update(registerSql,
                    new Object[] { firstName, lastName, email, hashedPassword, role, shippingAddress, phoneNumber });
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void updateUser(@Nonnull UpdateUserRequest req) {
        try {
            final int userId = getUserId();
            final String firstName = req.firstName();
            final String lastName = req.lastName();
            final String email = req.email();
            final String password = req.password();
            final String shippingAddress = req.shippingAddress();
            final String phoneNumber = req.phoneNumber();
            final String isEmailExistsSql = "SELECT COUNT(*) FROM USER WHERE email = ? AND user_id != ?;";
            final String registerSql = "UPDATE USER SET first_name = ?, last_name = ?, email = ?, password = ?, shipping_address = ?, phone_number = ? WHERE user_id = ?;";
            final boolean isEmailExists = jdbcTemplate.queryForObject(isEmailExistsSql, Integer.class,
                    new Object[] { email, userId }) > 0;
            if (isEmailExists) {
                throw new Error("Email already exists");
            }
            final String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            jdbcTemplate.update(registerSql,
                    new Object[] { firstName, lastName, email, hashedPassword, shippingAddress, phoneNumber, userId });
        } catch (Exception e) {
            e.printStackTrace();
            throw new Error("Error");
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
                (String) ls.get("phone_number"));
        return userInfo;
    }

    @Nonnull
    public List<Map<String, Object>> getAllPublishers() {
        try {
            List<Map<String, Object>> ls = jdbcTemplate.queryForList("select * from publisher");
            // final String str = mapper.writeValueAsString(ls);
            return ls;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Nonnull
    public boolean AddBookRequest(@Nonnull AddBookRequest addBookRequest) {
        System.out.println(addBookRequest.publisher());

        try {
            int category = 0;
            switch (addBookRequest.category()) {
                case "Science":
                    category = 1;
                    break;
                case "Art":
                    category = 2;
                    break;
                case "Religion":
                    category = 3;
                    break;
                case "History":
                    category = 4;
                    break;
                case "Geography":
                    category = 5;
                    break;
            }
            // isbn varchar(17), title varchar(255), category int, publication_year int,
            // stock int, threshold int, price double, publisher_name varchar(50)
            jdbcTemplate.update("CALL add_book(?,?,?,?,?,?,?,?)",
                    addBookRequest.isbn(),
                    addBookRequest.title(),
                    category,
                    addBookRequest.publishYear(),
                    addBookRequest.numberOfCopies(),
                    addBookRequest.threshhold(),
                    addBookRequest.price(),
                    addBookRequest.publisher());
            final String authorSql = "INSERT INTO author VALUES ( ?, ?);";

            String[] authors = addBookRequest.authors();
            for (int i = 0; i < authors.length; i++) {
                jdbcTemplate.update(authorSql, new Object[] { addBookRequest.isbn(), authors[i] });

            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}