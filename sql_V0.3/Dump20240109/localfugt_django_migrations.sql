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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-10-01 18:45:52.820007'),(2,'auth','0001_initial','2023-10-01 18:45:53.424226'),(3,'admin','0001_initial','2023-10-01 18:45:53.584373'),(4,'admin','0002_logentry_remove_auto_add','2023-10-01 18:45:53.608985'),(5,'admin','0003_logentry_add_action_flag_choices','2023-10-01 18:45:53.625405'),(6,'contenttypes','0002_remove_content_type_name','2023-10-01 18:45:53.740850'),(7,'auth','0002_alter_permission_name_max_length','2023-10-01 18:45:53.822633'),(8,'auth','0003_alter_user_email_max_length','2023-10-01 18:45:53.896777'),(9,'auth','0004_alter_user_username_opts','2023-10-01 18:45:53.923169'),(10,'auth','0005_alter_user_last_login_null','2023-10-01 18:45:53.992101'),(11,'auth','0006_require_contenttypes_0002','2023-10-01 18:45:54.000099'),(12,'auth','0007_alter_validators_add_error_messages','2023-10-01 18:45:54.025062'),(13,'auth','0008_alter_user_username_max_length','2023-10-01 18:45:54.108048'),(14,'auth','0009_alter_user_last_name_max_length','2023-10-01 18:45:54.191999'),(15,'auth','0010_alter_group_name_max_length','2023-10-01 18:45:54.241922'),(16,'auth','0011_update_proxy_permissions','2023-10-01 18:45:54.267388'),(17,'auth','0012_alter_user_first_name_max_length','2023-10-01 18:45:54.349532'),(18,'sessions','0001_initial','2023-10-01 18:45:54.399110'),(27,'FUGTApp','0001_initial','2023-11-24 20:10:02.702909'),(28,'FUGTApp','0002_activite','2023-11-24 20:10:02.734866'),(29,'FUGTApp','0003_alter_activite_options','2023-11-24 20:10:02.742883'),(30,'FUGTApp','0004_alter_activite_table','2023-11-24 20:10:02.750866'),(31,'authtoken','0001_initial','2023-11-27 22:16:04.685479'),(32,'authtoken','0002_auto_20160226_1747','2023-11-27 22:16:04.765455'),(33,'authtoken','0003_tokenproxy','2023-11-27 22:16:04.773454'),(34,'FUGTApp','0002_image_reservationanonyme','2023-11-28 21:34:51.754569'),(35,'FUGTApp','0003_reservation_alter_activite_options','2023-12-03 22:24:20.226252'),(36,'FUGTApp','0004_alter_activite_options_alter_reservation_options','2023-12-03 22:32:25.084178'),(37,'FUGTApp','0005_remove_reservation_date_reserved_and_more','2023-12-05 00:30:47.693026'),(38,'FUGTApp','0006_alter_reservation_nom_alter_reservation_prenom_and_more','2023-12-05 00:30:47.707023'),(44,'FUGTApp','0007_activitereservation','2023-12-05 00:41:20.927202'),(45,'FUGTApp','0008_delete_reservation','2023-12-05 00:41:20.933203'),(48,'FUGTApp','0011_delete_activitereservation','2023-12-05 01:44:59.926948'),(53,'FUGTApp','0002_activitereservation_image','2023-12-05 02:06:07.305286'),(54,'FUGTApp','0003_alter_activitereservation_table','2023-12-05 02:27:39.952442');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
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
