CREATE DATABASE  IF NOT EXISTS `sql10505126` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sql10505126`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: sql10.freemysqlhosting.net    Database: sql10505126
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `documento` varchar(45) NOT NULL,
  `fechaNacimiento` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(500) NOT NULL,
  `img` varchar(45) NOT NULL,
  `roles_id` int(11) NOT NULL,
  `activo` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`,`roles_id`),
  KEY `fk_usuarios_roles1_idx` (`roles_id`),
  CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan','Meirino','25495653','2022-06-14','1160404026','juan@dh.com','$2a$10$vL4DHkDlnRDIf8jwv4GjaOMF2JAs/.AyBR.Qim','1655853850009.png',1,1),(4,'Administrador','Administrador','111','2022-07-14','111','administrador@administrador.com','$2a$10$X9YBJ0DTD9.HnecPBKIe4e/IU4AHQr6uHALWs0Gz6dna8e8U0MF1K','1657669548754.png',1,1),(5,'German','Carosio','32244174','2022-07-13','1161245050','carosiogerman@gmail.com','$2a$10$h.1kG/puKqs3IVVlcKhSPOmrznrDBsyq8SLShN','1657671324393.png',2,1),(6,'pp','pp','11','2022-07-13','11','pp@pp.com','$2a$10$X9YBJ0DTD9.HnecPBKIe4e/IU4AHQr6uHALWs0Gz6dna8e8U0MF1K','default.png',2,1),(7,'Juan','Meirino','25987787','1976-08-10','45677896','juan@juan.com','$2a$10$r1zIHpf/F2nVeBS8XRj5D.yDcowX.9iGcpTSRfakODYhlHVLqAuAy','1657749963632.jpg',1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-13 19:12:15
