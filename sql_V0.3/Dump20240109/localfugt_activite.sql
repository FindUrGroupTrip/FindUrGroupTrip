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
-- Table structure for table `activite`
--

DROP TABLE IF EXISTS `activite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `lieu` varchar(45) DEFAULT 'Pas de lieu défini',
  `date` date DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `moyenne_notes` float DEFAULT '0',
  `image` varchar(200) DEFAULT NULL,
  `image_path` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activite`
--

LOCK TABLES `activite` WRITE;
/*!40000 ALTER TABLE `activite` DISABLE KEYS */;
INSERT INTO `activite` VALUES (12,'naci','brunello','2023-11-30','oui',0,NULL,NULL),(13,'TEST','fz','2023-12-06','fz',0,NULL,NULL),(14,'zrz','rz','2023-11-22','rz',0,NULL,NULL),(15,'test','reset','2023-11-29','reset',0,NULL,NULL),(16,'Nuno','Brun','2023-11-29','café',0,NULL,NULL),(17,'TEST','fz','2023-12-02','fazfzf',0,NULL,NULL),(18,'aujourd\'hui','pantin','2023-12-04','test',0,NULL,NULL),(19,'dd','zdzd','2023-12-06','dzdzdcafé',0,NULL,NULL),(20,'demonstration1','Panitn','2023-12-10','demo',0,NULL,NULL),(21,'demo V0.2','Pantin','2023-12-10','v02',0,NULL,NULL),(22,'tset','set','2023-11-27','tset',0,NULL,NULL),(23,'dad','adad','2024-02-02','ad',0,'activite_images/Capture_décran_2023-12-21_180916.png',NULL),(24,'cq','cq','2024-01-27','cq',0,'Capture d’écran 2023-12-21 180916.png',NULL),(25,'oui','oui','2024-01-11','oui',0,'Capture d’écran 2023-12-21 180916.png',NULL),(26,'oui','oui','2024-01-11','oui',0,'Capture d’écran 2023-12-21 180916.png',NULL),(27,'dq','dqd','2024-01-26','dq',0,'niveau median cSP.png',NULL),(28,'da','dad','2024-01-20','adad',0,'activite_images/niveau_salaire.png',NULL),(29,'dqd','qdq','2024-01-27','dqd',0,'activite_images/Logo_MATMUT_2022.svg.png',NULL),(30,'az','az','2024-01-25','az',0,'activite_images/Logo_MATMUT_2022.svg_Z005E8l.png',NULL),(31,'FRED','FED','2024-01-24','FRED',0,'activite_images/Apprendre_avec_insee.png',NULL),(32,'ULTIME','ULTIME','2024-01-24','ULE',0,'activite_images/CASD.png','/media/activite_images/CASD.png'),(33,'OUIOUIOUI','reactform','2024-01-31','qdqd',0,'activite_images/Logo_MATMUT_2022.svg_jr19S3R.png',NULL),(34,'OUIOUIOUI','reactform','2024-01-31','qdqd',0,'activite_images/Logo_MATMUT_2022.svg_7wxp4YU.png','/media/activite_images/Logo_MATMUT_2022.svg_7wxp4YU.png'),(35,'RZR','ARA','2024-01-22','RAR',0,'activite_images/niveau_salaire_vuJhqx3.png','/media/activite_images/niveau_salaire_vuJhqx3.png');
/*!40000 ALTER TABLE `activite` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09 10:31:59
