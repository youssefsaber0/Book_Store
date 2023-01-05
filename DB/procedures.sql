DELIMITER //
create procedure dec_book_quantity_by(book_isbn varchar(17), val int)
BEGIN
	update BOOK set stock = stock - val where isbn = book_isbn;
END
//

DELIMITER //
create procedure add_book(isbn varchar(17), title varchar(255), category int, publication_year int, stock int, threshold int, price double, publisher_name varchar(50))
BEGIN
    insert into BOOK 
    values(isbn, title, category, publication_year, stock, threshold, price, publisher_name);
END
//



DELIMITER // 
create procedure get_book_by_id(book_isbn varchar(17))
BEGIN
	select * from BOOK where isbn = book_isbn;
END
//


DELIMITER // 
create procedure get_book_by_category(cat int)
BEGIN
	select * from BOOK where category = cat;
END
//


DELIMITER // 
create procedure get_book_by_author(auth varchar(255))
BEGIN
	select BOOK.* from BOOK join AUTHOR on BOOK.isbn where AUTHOR.author_name = auth;
END
//


DELIMITER // 
create procedure get_book_by_publisher(pub varchar(50))
BEGIN
	select * from BOOK where publisher_name = pub;
END
//

DELIMITER //
create procedure add_author(book_isbn varchar(13), auth varchar(255))
BEGIN
    insert into AUTHOR
    values(book_isbn, auth);
END
//

DELIMITER $$
create procedure checkout_cart(userId int, card_no varchar(16))
begin
	declare last_id int;

	-- error handling and rollback
 	DECLARE exit handler for sqlexception
		BEGIN
			select false as response;
			ROLLBACK;
		END;
	start transaction;
		-- insert the info
        insert into BOOKSTORE.CHECKOUT_INFO(user_id, credit_card, date_out) 
        value(userId, card_no, current_date());
        select last_insert_id() into last_id;
        -- get all items in cart and place them in sold books ...  
        insert into BOOKSTORE.SOLD_BOOK 
        (select last_id, c.isbn, c.qty, b.price 
        from BOOKSTORE.CART as c natural join BOOKSTORE.BOOK as b 
        where c.user_id=userId);
        
        -- update the stock
        update BOOKSTORE.BOOK as b1
        set 
        b1.stock = b1.stock - (select e.qty 
								from BOOKSTORE.CART as e
                                where e.user_id=userId and b1.isbn=e.isbn)
        where b1.isbn in (select c.isbn
        from BOOKSTORE.CART as c 
        where c.user_id=userId);
        
        
        -- delete from cart
		delete from BOOKSTORE.CART as c where c.user_id = userId;
	
		select true as response;
	commit;
end$$
DELIMITER 