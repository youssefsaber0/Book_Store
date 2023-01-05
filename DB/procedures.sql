-- ---------------------------------
-- Delete item from cart procedure
-- ---------------------------------


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_item_from_cart`(id varchar(17))
BEGIN
	Delete from cart where isbn = id;
END $$
DELIMITER 


-- ---------------------------------
-- Get items in cart procedure
-- ---------------------------------

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_items_in_cart`(id int)
BEGIN
    select * from cart where user_id = id;
END $$
DELIMITER 


-- ---------------------------------
-- Get prices procedure
-- ---------------------------------

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prices`(id int)
BEGIN
    select b.isbn, b.title,b.price,qty as quantity, price*qty as total_price
    FROM cart 
    JOIN book as b using(isbn)
    where user_id = id;
END $$
DELIMITER 

-- ---------------------------------
-- Logout procedure
-- ---------------------------------


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Logout`(id int)
BEGIN
    DELETE FROM cart WHERE user_id=id;
END $$
DELIMITER 

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