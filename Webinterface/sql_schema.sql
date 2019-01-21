CREATE DATABASE  IF NOT EXISTS `tippkick` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `tippkick`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: tippkick
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `matches_table`
--

DROP TABLE IF EXISTS `matches_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `matches_table` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `player_home` int(11) NOT NULL,
  `player_away` int(11) NOT NULL,
  `player_home_goals_total` int(11) DEFAULT NULL,
  `player_home_goals_halftime` int(11) DEFAULT NULL,
  `player_away_goals_total` int(11) DEFAULT NULL,
  `player_away_goals_halftime` int(11) DEFAULT NULL,
  `match_day` int(11) DEFAULT NULL,
  `season_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `fk_user_idx` (`player_home`),
  KEY `fk_player_away_idx` (`player_away`),
  KEY `fk_season_id_idx` (`season_id`),
  CONSTRAINT `fk_player_away` FOREIGN KEY (`player_away`) REFERENCES `users` (`_id`),
  CONSTRAINT `fk_player_home` FOREIGN KEY (`player_home`) REFERENCES `users` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_season_id` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches_table`
--

LOCK TABLES `matches_table` WRITE;
/*!40000 ALTER TABLE `matches_table` DISABLE KEYS */;
INSERT INTO `matches_table` VALUES (1,1,3,1,0,5,3,1,NULL),(2,3,1,5,3,8,1,2,NULL),(3,1,3,1,1,1,1,3,NULL);
/*!40000 ALTER TABLE `matches_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seasons` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `current` tinyint(4) DEFAULT '0',
  `initialized` tinyint(4) DEFAULT '0',
  `closed` tinyint(4) DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `archived` tinyint(4) DEFAULT '0',
  `archived_at` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (1,'17/18',0,0,1,'2019-01-11 11:56:18',1,NULL),(15,'test',0,0,0,'2019-01-13 10:07:05',1,NULL),(22,'test2',0,0,0,'2019-01-13 10:35:15',1,NULL),(23,'test3',0,0,0,'2019-01-13 10:35:50',1,NULL),(24,'test5',0,0,0,'2019-01-13 10:36:00',1,NULL),(25,'asdsad',0,0,0,'2019-01-13 14:28:05',1,NULL),(26,'dad',0,0,0,'2019-01-13 14:29:11',1,NULL),(33,'18/19',1,0,0,'2019-01-14 18:47:05',0,NULL),(34,'neuertest',0,0,0,'2019-01-14 18:55:26',0,NULL);
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `imageContentType` varchar(45) DEFAULT NULL,
  `imageData` blob,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Fabian',NULL,'2018-12-12 23:03:16',NULL,NULL),(3,'Sebastian','test','2019-01-10 11:15:40',NULL,NULL),(4,'Max','test','2019-01-10 12:46:29',NULL,NULL),(5,'Christoph','test','2019-01-11 09:44:09',NULL,NULL),(7,'jules','test','2019-01-17 10:50:13',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-21 18:05:35
