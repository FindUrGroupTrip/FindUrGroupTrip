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
-- Table structure for table `vacation`
--

DROP TABLE IF EXISTS `vacation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacation` (
  `idvacation` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `lieu` varchar(45) DEFAULT 'Pas de lieu défini',
  `date` date DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `nb_souhait` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idvacation`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacation`
--

LOCK TABLES `vacation` WRITE;
/*!40000 ALTER TABLE `vacation` DISABLE KEYS */;
INSERT INTO `vacation` VALUES (1,'Randonnées du Bois','Meudon','2023-12-15','Une belle randonnée en plein cœur du bois de Meudon.',0),(2,'Plage de sable fin','Nice','2023-12-20','Journée détente sur la plage de Nice avec du sable fin et une mer turquoise.',0),(3,'Visite du musée Louvre','Paris','2023-12-25','Découverte de l\'art classique au célèbre musée du Louvre.',0),(4,'Escapade en montagne','Chamonix','2023-12-30','Weekend d\'aventure en montagne avec des vues à couper le souffle.',0),(5,'Croisière sur la Seine','Paris','2024-01-05','Une soirée romantique avec une croisière sur la Seine.',0),(6,'Dégustation de vins','Bordeaux','2024-01-10','Explorez les vignobles de Bordeaux avec une dégustation de vins.',0),(7,'Balade en vélo','Amsterdam','2024-01-15','Découvrez la ville d\'Amsterdam à vélo avec une balade relaxante.',0),(8,'Plongée sous-marine','Bora Bora','2024-01-20','Explorez les fonds marins de Bora Bora avec une plongée sous-marine.',0),(9,'Cours de cuisine','Toscane','2024-01-25','Apprenez les secrets de la cuisine italienne lors d\'un cours de cuisine en Toscane.',0),(10,'Safari en Afrique','Kenya','2024-01-30','Partez à l\'aventure avec un safari passionnant au Kenya.',0);
/*!40000 ALTER TABLE `vacation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09 10:32:00
