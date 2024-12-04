CREATE DATABASE  IF NOT EXISTS `awashama_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `awashama_db`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: awashama_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `artikel`
--

DROP TABLE IF EXISTS `artikel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artikel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(8000) NOT NULL,
  `deskripsi` varchar(300) NOT NULL,
  `kategori` varchar(8000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artikel`
--

LOCK TABLES `artikel` WRITE;
/*!40000 ALTER TABLE `artikel` DISABLE KEYS */;
INSERT INTO `artikel` VALUES (1,'Pilihan berkelanjutan yang kian diminati konsumen','Permintaan produk organik terus meningkat mendorong para petani','berita'),(5,'uhuy','kiwkiw','berita'),(6,'hahaha','mmmmmmmmmmmm','hahahahahahahaha');
/*!40000 ALTER TABLE `artikel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkout`
--

DROP TABLE IF EXISTS `checkout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `jumlah_produk` int NOT NULL,
  `jenis_pengiriman` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `metode_pembayaran` varchar(255) NOT NULL,
  `promo` varchar(255) DEFAULT NULL,
  `note_pelanggan` text,
  `status` enum('dikemas','dikirim','berhasil') NOT NULL DEFAULT 'dikemas',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout`
--

LOCK TABLES `checkout` WRITE;
/*!40000 ALTER TABLE `checkout` DISABLE KEYS */;
INSERT INTO `checkout` VALUES (1,'1','1',50,'jnt','jalan silber','transfer','11.11','dipercepat bosku','dikemas'),(2,'3','1',50,'jnt','jhehehe','blalbal','11.11','kiwkiw','dikirim'),(5,'1','1',50,'jnt','jalan silberanti','transfer','11.11','dipercepat bosku hihiw','dikemas');
/*!40000 ALTER TABLE `checkout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keranjang`
--

DROP TABLE IF EXISTS `keranjang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keranjang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `jumlah_produk` int NOT NULL,
  `jenis_pengiriman` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `metode_pembayaran` varchar(255) NOT NULL,
  `promo` varchar(255) DEFAULT NULL,
  `note_pelanggan` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keranjang`
--

LOCK TABLES `keranjang` WRITE;
/*!40000 ALTER TABLE `keranjang` DISABLE KEYS */;
INSERT INTO `keranjang` VALUES (1,'1','1',2,'jnt','jl,Silaberanti GG Kelapa','transfer','23.11','tolong di percepat ya proses nya'),(4,'12','2',5,'kirim','palembang','tranfer','11.11','kiwkiw');
/*!40000 ALTER TABLE `keranjang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pembayaran`
--

DROP TABLE IF EXISTS `pembayaran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pembayaran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_pembayaran` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pembayaran`
--

LOCK TABLES `pembayaran` WRITE;
/*!40000 ALTER TABLE `pembayaran` DISABLE KEYS */;
INSERT INTO `pembayaran` VALUES (1,'bca'),(3,'bri'),(4,'transfer');
/*!40000 ALTER TABLE `pembayaran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pengiriman`
--

DROP TABLE IF EXISTS `pengiriman`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pengiriman` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jenis_pengiriman` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pengiriman`
--

LOCK TABLES `pengiriman` WRITE;
/*!40000 ALTER TABLE `pengiriman` DISABLE KEYS */;
INSERT INTO `pengiriman` VALUES (1,'jnt'),(3,'jnt'),(4,'express'),(5,'kiwkiw');
/*!40000 ALTER TABLE `pengiriman` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_produk` varchar(45) NOT NULL,
  `harga` int DEFAULT NULL,
  `stok` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `produk_chk_1` CHECK ((`harga` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produk`
--

LOCK TABLES `produk` WRITE;
/*!40000 ALTER TABLE `produk` DISABLE KEYS */;
INSERT INTO `produk` VALUES (1,'pupuk',55,100),(3,'Beras',20000,100),(5,'beras',50,10);
/*!40000 ALTER TABLE `produk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promo`
--

DROP TABLE IF EXISTS `promo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_promo` varchar(45) NOT NULL,
  `diskon` int DEFAULT NULL,
  `kategori_diskon` enum('persen','harga') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nama_promo_UNIQUE` (`nama_promo`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promo`
--

LOCK TABLES `promo` WRITE;
/*!40000 ALTER TABLE `promo` DISABLE KEYS */;
INSERT INTO `promo` VALUES (1,'uhuy',50,'persen'),(3,'11.11',50000,'persen'),(4,'121',60000,'persen'),(7,'yuhuuu',60000,'persen'),(8,'kiwkiw',70,'harga'),(9,'kiw',80000,'harga'),(12,'ahay',80,'persen'),(13,'yahu',50000,'harga');
/*!40000 ALTER TABLE `promo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'alif','$2b$10$DIb1vQEydMZJN7umsgbd8ORe6OUn7QfaC8MDU2aQG5/GfbkNcjOiS','user'),(4,'belle','$2b$10$PfmUVT6xjKxg0FGu0GFQ3uPrLbqajPMYzTVEPA892nIl3/ipgxEC.','user'),(11,'shintia','$2b$10$BAJncDotBnOKzB1mDqEPuexU.Pd.Q5xfEDyc3gDFQM4ksizog6Wuu','user'),(12,'alifkurniawan','$2b$10$oY7SD/r.i6rwHXsaNkxR3urPIA7WR.QR0fmxmJtIIJLTwYfXNvVcC','user'),(13,'MuhamadAlifKurniawan','$2b$10$7t1a08xjCNhaXu5cib1n3.ISSqCf9o8DpmlCIBGL8vX9.GKOpaz4i','user'),(14,'mahdi','$2b$10$CMo408l99k7qXsBrGEyDmuFfVSdo3itHMJevw4uTpL57JIgJmv2Se','user'),(16,'wapek','$2b$10$hlvPJybVgW77zxy4C46rz.htlA.HEPYNhqdmQIEfTAavUL2p0/xqG','admin'),(17,'putri','$2b$10$iAEFx2lipYEAVE7Z40lui.6IpKaphE2TVUOYTt845PCiVtlnMj4Yq','admin'),(18,'kikiw','$2b$10$G2F8EaacAXTPm6ZwJeCV3eDI76nej5hVTvzUzCCAy1ti3RmrF0Dbi','user'),(19,'kiwkiw','$2b$10$a6.ctGZlxVkydsqTcLJBq.ZN8N3AYy52BGDMK4Koq7IIEMbUhpc9a','admin'),(20,'cmew','$2b$10$OATdZZKbja9dY1q6mOgL4.gVyLNLYfwS23luC6lwNlYAc3r1UiLZG','admin'),(21,'cmeww','$2b$10$ubKNfaQrklwQuhOCvWdP4uWMITakLYCYv/S99V4YsgUDGorfUmKwy','user'),(22,'alifganteng','$2b$10$W5StuUXkcEkUUozZFRG3AumHhYOSBhzsfZZUcxW3Y/1cm2h8MeqAG','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-04 16:23:30
