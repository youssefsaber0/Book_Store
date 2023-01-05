-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BOOKSTORE
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BOOKSTORE
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BOOKSTORE` ;
USE `BOOKSTORE` ;

-- -----------------------------------------------------
-- Table `BOOKSTORE`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`USER` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(20) NOT NULL,
  `last_name` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `reg_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` ENUM('admin', 'customer') NOT NULL,
  `shipping_address` VARCHAR(100) NULL,
  `phone_number` CHAR(11) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`CATEGORY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`CATEGORY` (
  `cat_id` INT NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE INDEX `category_UNIQUE` (`category` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`PUBLISHER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`PUBLISHER` (
  `publisher_name` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `address` VARCHAR(255) NULL,
  PRIMARY KEY (`publisher_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`BOOK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`BOOK` (
  `isbn` VARCHAR(17) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `category` INT NOT NULL,
  `publication_year` INT NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `threshold` INT NOT NULL,
  `price` DOUBLE NOT NULL,
  `publisher_name` VARCHAR(50) NULL,
  PRIMARY KEY (`isbn`),
  INDEX `title_ind` (`title` ASC) VISIBLE,
  INDEX `cat_ind` (`category` ASC) INVISIBLE,
  INDEX `publsiher_name_idx` (`publisher_name` ASC) VISIBLE,
  CONSTRAINT `cat_id`
    FOREIGN KEY (`category`)
    REFERENCES `BOOKSTORE`.`CATEGORY` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `publsiher_name`
    FOREIGN KEY (`publisher_name`)
    REFERENCES `BOOKSTORE`.`PUBLISHER` (`publisher_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`ORDER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`ORDER` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `isbn` VARCHAR(17) NOT NULL,
  `QTY` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`order_id`),
  INDEX `Book_idx` (`isbn` ASC) VISIBLE,
  CONSTRAINT `ordered_book`
    FOREIGN KEY (`isbn`)
    REFERENCES `BOOKSTORE`.`BOOK` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`CART`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`CART` (
  `user_id` INT NOT NULL,
  `isbn` VARCHAR(17) NOT NULL,
  `qty` INT NOT NULL DEFAULT 1,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `book_idx` (`isbn` ASC) VISIBLE,
  PRIMARY KEY (`user_id`, `isbn`),
  CONSTRAINT `cart_book`
    FOREIGN KEY (`isbn`)
    REFERENCES `BOOKSTORE`.`BOOK` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cart_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `BOOKSTORE`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`CHECKOUT_INFO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`CHECKOUT_INFO` (
  `checkout_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `credit_card` VARCHAR(16) NOT NULL,
  `date_out` DATE NOT NULL,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`checkout_id`),
  CONSTRAINT `checked_out_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `BOOKSTORE`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`AUTHOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`AUTHOR` (
  `isbn` VARCHAR(17) NOT NULL,
  `author_name` VARCHAR(255) NOT NULL,
  INDEX `Book_idx` (`isbn` ASC) VISIBLE,
  PRIMARY KEY (`author_name`, `isbn`),
  CONSTRAINT `authored_book`
    FOREIGN KEY (`isbn`)
    REFERENCES `BOOKSTORE`.`BOOK` (`isbn`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BOOKSTORE`.`SOLD_BOOK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`SOLD_BOOK` (
  `checkout_id` INT NOT NULL,
  `isbn` VARCHAR(17) NOT NULL,
  `qty` INT NOT NULL,
  `price_per_unit` INT NULL,
  PRIMARY KEY (`checkout_id`, `isbn`),
  CONSTRAINT `order_id`
    FOREIGN KEY (`checkout_id`)
    REFERENCES `BOOKSTORE`.`CHECKOUT_INFO` (`checkout_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
