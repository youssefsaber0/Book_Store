DELIMITER //
create trigger check_book_quantity 
before update on BOOK for each row
BEGIN
	IF (new.stock < 0) THEN
		SIGNAL SQLSTATE '45000' 
		SET MESSAGE_TEXT = "REQUIRED NUMBER OF BOOKS IS NOT AVAILABLE";
    END IF;
END
//


DELIMITER //
create trigger order_books 
after update on BOOK for each row
BEGIN
	IF (new.stock < new.threshold) THEN
		insert into `ORDER`(isbn, qty) 
        values(new.isbn, new.threshold - new.stock);
	END IF;
END
//


DELIMITER // 
create trigger add_order_to_library
before delete on `ORDER` for each row
BEGIN
	update BOOK set stock = stock + old.qty where isbn = old.isbn;
END
//