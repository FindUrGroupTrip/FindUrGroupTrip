CREATE DATABASE  IF NOT EXISTS `localfugt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `localfugt`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: localfugt
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('3xw7q6hqpo3af8kroz8abg4r6sdjp7lu','.eJxVjMsOwiAQRf-FtSEwtDxcuvcbCMxMpWogKe3K-O_apAvd3nPOfYmYtrXErfMSZxJnocXpd8sJH1x3QPdUb01iq-syZ7kr8qBdXhvx83K4fwcl9fKtVWA9GnSskWwKKpis7eQdMk-ICjyBZmQyQD7AAAqsVZRBhwEdjF68P-qzN58:1rFKKR:lRQUVHZ5d5DXICrh4AD4QyYccKQwqMX6VBDlTCyk9Z4','2024-01-01 20:35:07.272003'),('dswhczysv1zmu1vbtmuu90mk6ijfdipw','.eJxVjMsOwiAQRf-FtSEwtDxcuvcbCMxMpWogKe3K-O_apAvd3nPOfYmYtrXErfMSZxJnocXpd8sJH1x3QPdUb01iq-syZ7kr8qBdXhvx83K4fwcl9fKtVWA9GnSskWwKKpis7eQdMk-ICjyBZmQyQD7AAAqsVZRBhwEdjF68P-qzN58:1qok3x:bWVN01TMrZMUqjCxsfsv_xZ9DsJAuqD1A3i0uhju_sg','2023-10-20 12:36:13.761505'),('sn2dc9ksyhsua2lyhd48vip87vvufehc','.eJxVjMsOwiAQRf-FtSHMlIK4dO83kBkeUjWQlHZl_HdD0oVu7znnvoWnfSt-72n1SxQXAeL0uzGFZ6oDxAfVe5Oh1W1dWA5FHrTLW4vpdT3cv4NCvYwamZB1QgcTw9mRzUabpJkAlMpojXUYVGY7T0CAeXJ65uxicjFbVOLzBdooN5k:1qn1Tl:sHgzkipRlwerXwJ9Mk2O-8DmRXpWVsXdhiQnWA2ZN80','2023-10-15 18:47:45.361743');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09 10:32:01
