-- -------------------
-- Add book function
-- -------------------


DELIMITER $$
CREATE FUNCTION `add_book`(id int,id_book INT,qty INT) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
	
    INSERT INTO CART(user_id,book_id,qty)
    Values(id,id_book,qty);
RETURN TRUE;
END $$
DELIMITER 