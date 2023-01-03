-- ---------------------------------
-- Delete item from cart procedure
-- ---------------------------------


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_item_from_cart`(id int)
BEGIN
	Delete from cart where book_id = id;
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
    select b.book_id, b.title,b.price,qty as quantity, price*qty as total_price
    FROM cart 
    JOIN book as b using(book_id)
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



