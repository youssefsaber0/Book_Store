DELIMITER //
create procedure add_book(isbn varchar(17), title varchar(255), category int, publication_year int, stock int, threshold int, price double, publisher_name varchar(50))
BEGIN
    insert into book 
    values(isbn, title, category, publication_year, stock, threshold, price, publisher_name);
END
//

DELIMITER //
create trigger check_book_quantity 
before update on book for each row
BEGIN
	IF (new.stock < 0) THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = "REQUIRED NUMBER OF BOOKS IS NOT AVAILABLE";
    END IF;
END
//

DELIMITER //
create procedure dec_book_quantity_by(book_isbn varchar(17), val int)
BEGIN
	update book set stock = stock - val where isbn = book_isbn;
END
//


DELIMITER //
create trigger order_books 
after update on book for each row
BEGIN
	IF (new.stock < new.threshold) THEN
		insert into `order`(isbn, QTY) 
        values(new.isbn, new.threshold - new.stock);
	END IF;
END
//


DELIMITER // 
create trigger add_order_to_library
before delete on `order` for each row
BEGIN
	update book set stock = stock + old.QTY where isbn = old.isbn;
END
//

DELIMITER // 
create procedure get_book_by_id(book_isbn varchar(17))
BEGIN
	select * from book where isbn = book_isbn;
END
//


DELIMITER // 
create procedure get_book_by_category(cat int)
BEGIN
	select * from book where category = cat;
END
//


DELIMITER // 
create procedure get_book_by_author(auth varchar(255))
BEGIN
	select book.* from book join author on book.isbn where author.author_name = auth;
END
//


DELIMITER // 
create procedure get_book_by_publisher(pub varchar(50))
BEGIN
	select * from book where publisher_name = pub;
END
//

