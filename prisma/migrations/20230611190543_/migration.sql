-- CreateTable
CREATE TABLE `driver` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `position` TINYINT UNSIGNED NULL,
    `points` DECIMAL(65, 30) NULL,
    `team` VARCHAR(100) NULL,
    `image` VARCHAR(191) NULL,
    `country` VARCHAR(255) NULL,
    `podiums` TINYINT UNSIGNED NULL,
    `totalPoints` DECIMAL(65, 30) NULL,
    `grandsPrixEntered` SMALLINT UNSIGNED NULL,
    `worldChampionships` TINYINT UNSIGNED NULL,
    `highestRaceFinish` VARCHAR(10) NULL,
    `highestGridPosition` TINYINT UNSIGNED NULL,
    `dateOfBirth` DATE NULL,
    `placeOfBirth` VARCHAR(100) NULL,
    `bio` JSON NULL,

    UNIQUE INDEX `driver_id_key`(`id`),
    UNIQUE INDEX `driver_name_url_key`(`name`, `url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
