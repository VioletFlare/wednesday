-- `rank`.wednesday_guilds definition

CREATE TABLE `wednesday_guilds` (
  `id` varchar(32) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- `rank`.wednesday_cookies definition

CREATE TABLE `wednesday_cookies` (
  `username` varchar(32) DEFAULT NULL,
  `cookies` int(11) DEFAULT NULL,
  `guild_id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  PRIMARY KEY (`user_id`,`guild_id`),
  KEY `guild_id` (`guild_id`),
  CONSTRAINT `wednesday_cookies_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `wednesday_guilds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;