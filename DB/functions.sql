-- -------------------
-- Is Manager function
-- -------------------
DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `IS_MANAGER`(email_in VARCHAR(45)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN 
    DECLARE urole ENUM('admin','customer');
    SELECT role INTO urole FROM user WHERE email = email_in;
    IF (urole = 'admin') THEN 
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END $$
DELIMITER 



-- -------------------
-- Add book function
-- -------------------


DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `add_book`(id int,id_book INT,qty INT) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
	
    INSERT INTO cart(user_id,book_id,qty)
    Values(id,id_book,qty);
RETURN TRUE;
END $$
DELIMITER 


-- -------------------
-- sign in function
-- -------------------


DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `SIGN_IN`(email_in VARCHAR(100),PASS VARCHAR(45)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN 
    DECLARE EX_PASS VARCHAR(45);
    SELECT password INTO EX_PASS FROM user WHERE email = email_in;
    IF (STRCMP(BINARY PASS,EX_PASS)=0) THEN 
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END $$
DELIMITER 


-- -------------------
-- sign up function
-- -------------------


DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `sign_up`(
    first varchar(20),
    last varchar(20),
    email_in varchar(100),
    pass varchar(30) ,
    date_in date,
    role_in enum('admin','customer'),
    address varchar(100) ,
    phone char(11)
    ) RETURNS varchar(500) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
DECLARE msg varchar(500);

if (SELECT EXISTS(SELECT * from user WHERE email = email_in) = 1) 
-- THEN RETURN TRUE;
then set msg = concat('Please check your email, this email exists already.....');
else
set msg = concat('You sign_up Successfully.....');
INSERT INTO user(first_name, last_name, email, password, reg_date, role, shipping_address, phone_number) 
    VALUES (first, last, email_in, pass, date_in, role_in, address, phone);
end if ;
return msg;
END $$
DELIMITER 


-- -------------------
-- update user function
-- -------------------

DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `update_user`(
    first varchar(20),
    last varchar(20),
    email_in varchar(100),
    pass varchar(30) ,
    date_in date,
    role_in enum('admin','customer'),
    address varchar(100) ,
    phone char(11)
    ) RETURNS BOOLEAN
    DETERMINISTIC
BEGIN


if (SELECT EXISTS(SELECT * from user WHERE email = email_in) = 0) 
then RETURN FALSE; 
else

UPDATE user
set first_name = first,
    last_name = last,
    password = pass,
    reg_date = date_in,
    role = role_in,
    shipping_address = address,
    phone_number = phone
WHERE email = email_in;
end if ;
return TRUE;
END $$
DELIMITER 
