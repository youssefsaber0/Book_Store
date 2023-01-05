#book sales
create or replace view book_sales as 
SELECT b.isbn, b.title, b.price, b.publisher_name, SUM(s.qty) as sold_amount 
FROM BOOK AS b JOIN SOLD_BOOK AS s WHERE b.isbn = s.isbn
GROUP BY isbn
ORDER BY sold_amount DESC;

#top 5 customers (purchased more books) in the last 3 months
create or replace view top_customers as 
SELECT u.user_id, u.first_name, u.last_name, u.email, SUM(qty) as purchased_books
FROM CHECKOUT_INFO AS c JOIN user AS u ON u.user_id = c.user_id
        JOIN SOLD_BOOK as s ON s.checkout_id = c.checkout_id
WHERE DATEDIFF(CURDATE(), date_out)< 91
GROUP BY user_id
ORDER BY purchased_books DESC
LIMIT 5;

# top 10 sold-book in the last 3 month
create or replace view best_sellers as 
SELECT b.isbn, b.title, b.price, b.publisher_name, SUM(s.qty) as sold_amount 
FROM BOOK AS b JOIN SOLD_BOOK AS s JOIN checkout_info AS ch WHERE b.isbn = s.isbn AND DATEDIFF(CURDATE(), ch.date_out)< 31
GROUP BY isbn
ORDER BY sold_amount DESC
LIMIT 10;