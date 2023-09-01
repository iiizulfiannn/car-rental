-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2023 at 03:25 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rental`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `email`, `password`) VALUES
(3, 'zuladmin@gmail.com', '$2a$08$XYLEHvQShq9Ds/kzHXvIwuZIRZcDLxHX8jrQte63GyCBd/fb7J3o.');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `carId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `carType` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `fuel` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `hourRate` int(11) NOT NULL,
  `dayRate` int(11) NOT NULL,
  `monthRate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`carId`, `name`, `carType`, `rating`, `fuel`, `image`, `hourRate`, `dayRate`, `monthRate`) VALUES
(9, 'Toyota Corolla 3', 'Sedan', 5, 'Petrol', 'steradian-ToyotaCorolla3.png', 10, 60, 1500),
(10, 'Suzuki Brio', 'Sedan', 5, 'Petrol', 'steradian-SuzukiBrio.png', 10, 60, 1500);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `pickUpLoc` varchar(255) NOT NULL,
  `dropOffLoc` varchar(255) NOT NULL,
  `pickUpDate` date NOT NULL,
  `dropOffDate` date NOT NULL,
  `pickUpTime` time NOT NULL,
  `carId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `adminId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `email`, `phoneNumber`, `city`, `zip`, `message`, `password`, `username`, `address`) VALUES
(3, 'zulser@gmail.com', '089671578273', 'Bandung', '039453', 'dicipline', '$2a$08$lugRtR.huozLCcukzaefSefeuGbWPE2WXF4.za.x6CmZuBIs4niCW', 'zuluser', 'Jl Karet No. 12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`carId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `ForeignKeyUserId` (`userId`),
  ADD KEY `ForeignKeyAdminId` (`adminId`),
  ADD KEY `ForeignKeyCardId` (`carId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `carId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `ForeignKeyAdminId` FOREIGN KEY (`adminId`) REFERENCES `admin` (`adminId`),
  ADD CONSTRAINT `ForeignKeyCardId` FOREIGN KEY (`carId`) REFERENCES `cars` (`carId`),
  ADD CONSTRAINT `ForeignKeyUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
