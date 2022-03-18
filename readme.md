# Apache Newspaper

Os dejo un pequeño resumen de cosas modificadas y actualizaciones

## Cambios en DB

Hemos añadido un nuevo campo en la base de datos de las noticias. La linea nueva añadida seria tiponoti

-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.22-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla essentialmode.apache_newspaper_noticias
CREATE TABLE IF NOT EXISTS `apache_newspaper_noticias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tiponoti` varchar(50) NOT NULL DEFAULT 'ACTUALIDAD',
  `title` varchar(50) NOT NULL,
  `reportero` varchar(50) DEFAULT NULL,
  `comment` varchar(500) NOT NULL,
  `img` text NOT NULL,
  `dateadded` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


## Añadido el comando de rebelcam

Con ese comando nos aparece la weazelcam de objeto y se puede inicar la "grabacion" con una interface configurada

## Añadido nueva redaccion

El acceso a la redaccion sigue siendo la misma, pero ahora podemos borrar noticias que hayamos escrito por si tenemos algun fallo al hacerlo
Desde la redaccion podemos acceder al periodico sin tener que usar el item