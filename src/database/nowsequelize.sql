-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2026 at 03:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nowsequelize`
--

-- --------------------------------------------------------

--
-- Table structure for table `commentmodels`
--

CREATE TABLE `commentmodels` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `commentmodels`
--

INSERT INTO `commentmodels` (`id`, `content`, `createdAt`, `updatedAt`, `userId`, `postId`) VALUES
(34, 'hello ', '2026-09-10 01:28:50', '2026-09-10 01:29:41', 1, 1),
(35, 'hello in our world', '2026-09-10 01:28:50', '2026-09-10 01:28:50', 2, 1),
(36, 'hello in our world', '2026-09-10 01:28:50', '2026-09-10 01:28:50', 1, 1),
(37, 'hello in our world', '2026-09-10 01:29:20', '2026-09-10 01:29:20', 1, 1),
(38, 'hello in our world', '2026-09-10 01:29:20', '2026-09-10 01:29:20', 2, 1),
(39, 'hello in our world', '2026-09-10 01:29:20', '2026-09-10 01:29:20', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `postmodels`
--

CREATE TABLE `postmodels` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postmodels`
--

INSERT INTO `postmodels` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'hello1', 'hello in my website', '2026-09-10 01:22:14', '2026-09-10 01:22:14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'mostafa mahmoud', 'mostafa@gmail.com', 'password@password', 'user', '2026-09-10 01:15:00', '2026-09-10 01:15:00', NULL),
(2, 'hello world', 'hello@gmail.com', 'passwordPassword', 'admin', '2026-09-10 01:15:20', '2026-09-10 01:21:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `commentmodels`
--
ALTER TABLE `commentmodels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `postId` (`postId`);

--
-- Indexes for table `postmodels`
--
ALTER TABLE `postmodels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `commentmodels`
--
ALTER TABLE `commentmodels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `postmodels`
--
ALTER TABLE `postmodels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `commentmodels`
--
ALTER TABLE `commentmodels`
  ADD CONSTRAINT `commentmodels_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `commentmodels_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `postmodels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `postmodels`
--
ALTER TABLE `postmodels`
  ADD CONSTRAINT `postmodels_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
