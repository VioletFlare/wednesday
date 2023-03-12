-- `rank`.wednesday_guilds definition

CREATE TABLE `wednesday_guilds` (
  `id` varchar(32) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- `rank`.wednesday_accounts definition

CREATE TABLE `wednesday_accounts` (
  `username` varchar(32) DEFAULT NULL,
  `cookies` int(11) DEFAULT NULL,
  `guild_id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  PRIMARY KEY (`user_id`,`guild_id`),
  KEY `guild_id` (`guild_id`),
  CONSTRAINT `wednesday_accounts_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `wednesday_guilds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- `rank`.wednesday_qotd definition

CREATE TABLE `wednesday_qotd` (
  `content` varchar(4096) NOT NULL,
  `guild_id` varchar(32) NOT NULL,
  `message_id` varchar(32) NOT NULL,
  PRIMARY KEY (`guild_id`,`message_id`),
  UNIQUE KEY `message_id` (`message_id`),
  KEY `guild_id` (`guild_id`),
  CONSTRAINT `wednesday_messages_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `wednesday_guilds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- `rank`.wednesday_qotd_responses definition

CREATE TABLE `wednesday_qotd_responses` (
  `username` varchar(32) DEFAULT NULL,
  `user_id` varchar(32) NOT NULL,
  `qotd_message_id` varchar(32) NOT NULL,
  `message_id` varchar(32) NOT NULL,
  `content` varchar(4096) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`qotd_message_id`),
  KEY `qotd_message_id` (`qotd_message_id`),
  CONSTRAINT `wednesday_qotd_responses_ibfk_1` FOREIGN KEY (`qotd_message_id`) REFERENCES `wednesday_qotd` (`message_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- `rank`.wednesday_booster_rewards definition

CREATE TABLE `wednesday_booster_rewards` (
  `guild_id` varchar(32) NOT NULL,
  `last_reward_ts` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`guild_id`),
  KEY `wednesday_booster_rewards_ibfk_1` (`guild_id`),
  CONSTRAINT `wednesday_booster_rewards_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `wednesday_guilds` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;