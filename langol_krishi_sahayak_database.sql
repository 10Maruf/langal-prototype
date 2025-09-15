-- =====================================================
-- Langol Krishi Sahayak System - Complete Database Schema
-- Created for XAMPP/MySQL
-- For Farmer, Consultant and Customer
-- Database: langol_krishi_sahayak
-- =====================================================

DROP DATABASE IF EXISTS `langol_krishi_sahayak`;

CREATE DATABASE `langol_krishi_sahayak` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `langol_krishi_sahayak`;

-- =====================================================
-- 1. User Management Tables
-- =====================================================

-- Main users table
CREATE TABLE `users` (
    `user_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `user_type` ENUM(
        'farmer',
        'expert',
        'customer'
    ) NOT NULL,
    `phone` VARCHAR(20) UNIQUE,
    `is_verified` BOOLEAN DEFAULT FALSE,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_type` (`user_type`),
    INDEX `idx_users_phone` (`phone`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- User profiles table
CREATE TABLE `user_profiles` (
    `profile_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `user_id` VARCHAR(36) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `nid_number` VARCHAR(17) UNIQUE,
    `date_of_birth` DATE,
    `father_name` VARCHAR(255),
    `mother_name` VARCHAR(255),
    `address` TEXT,
    `district` VARCHAR(100),
    `upazila` VARCHAR(100),
    `division` VARCHAR(100),
    `profile_photo_url` VARCHAR(500),
    `nid_photo_url` VARCHAR(500),
    `location` VARCHAR(255),
    `bio` TEXT,
    `verification_status` ENUM(
        'pending',
        'verified',
        'rejected'
    ) DEFAULT 'pending',
    `verified_by` VARCHAR(36),
    `verified_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`verified_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_profile_verification` (`verification_status`),
    INDEX `idx_profile_district` (`district`),
    INDEX `idx_profile_nid` (`nid_number`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Farmer detailed information
CREATE TABLE `farmer_details` (
    `farmer_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `user_id` VARCHAR(36) NOT NULL,
    `farm_size` DECIMAL(10, 2),
    `farm_size_unit` ENUM('acre', 'bigha', 'katha') DEFAULT 'bigha',
    `farm_type` VARCHAR(100),
    `experience_years` INT,
    `land_ownership` VARCHAR(255),
    `land_documents_url` VARCHAR(500),
    `registration_date` DATE,
    `farming_methods` JSON,
    `krishi_card_number` VARCHAR(50),
    `occupation` VARCHAR(100) DEFAULT 'Farmer',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_farmer_farm_size` (`farm_size`),
    INDEX `idx_farmer_experience` (`experience_years`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Expert/Consultant qualifications
CREATE TABLE `expert_qualifications` (
    `expert_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `user_id` VARCHAR(36) NOT NULL,
    `qualification` VARCHAR(255),
    `specialization` VARCHAR(255),
    `experience_years` INT,
    `institution` VARCHAR(255),
    `certification_url` VARCHAR(500),
    `consultation_fee` DECIMAL(10, 2),
    `consultation_fee_currency` VARCHAR(3) DEFAULT 'BDT',
    `availability_schedule` JSON,
    `rating` DECIMAL(3, 2) DEFAULT 0.00,
    `total_consultations` INT DEFAULT 0,
    `is_government_approved` BOOLEAN DEFAULT FALSE,
    `license_number` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_expert_specialization` (`specialization`),
    INDEX `idx_expert_rating` (`rating`),
    INDEX `idx_expert_government` (`is_government_approved`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Customer business details
CREATE TABLE `customer_business_details` (
    `business_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `user_id` VARCHAR(36) NOT NULL,
    `business_name` VARCHAR(255),
    `business_type` VARCHAR(255),
    `trade_license_number` VARCHAR(100),
    `trade_license_url` VARCHAR(500),
    `business_address` TEXT,
    `tax_identification_number` VARCHAR(50),
    `established_year` YEAR,
    `employee_count` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_business_type` (`business_type`),
    INDEX `idx_trade_license` (`trade_license_number`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 2. Social Feed System Tables
-- =====================================================

-- Post tags
CREATE TABLE `post_tags` (
    `tag_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `tag_name` VARCHAR(100) UNIQUE NOT NULL,
    `usage_count` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_tag_name` (`tag_name`),
    INDEX `idx_tag_usage` (`usage_count`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Social feed posts
CREATE TABLE `posts` (
    `post_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `author_id` VARCHAR(36) NOT NULL,
    `content` TEXT NOT NULL,
    `post_type` ENUM(
        'general',
        'marketplace',
        'question',
        'advice',
        'expert_advice'
    ) DEFAULT 'general',
    `marketplace_listing_id` VARCHAR(36),
    `images` JSON,
    `location` VARCHAR(255),
    `likes_count` INT DEFAULT 0,
    `comments_count` INT DEFAULT 0,
    `shares_count` INT DEFAULT 0,
    `views_count` INT DEFAULT 0,
    `is_pinned` BOOLEAN DEFAULT FALSE,
    `is_reported` BOOLEAN DEFAULT FALSE,
    `is_deleted` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_posts_author_date` (
        `author_id`,
        `created_at` DESC
    ),
    INDEX `idx_posts_type` (`post_type`),
    INDEX `idx_posts_created` (`created_at` DESC),
    INDEX `idx_posts_location` (`location`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Post-tag relationships
CREATE TABLE `post_tag_relations` (
    `post_id` VARCHAR(36) NOT NULL,
    `tag_id` VARCHAR(36) NOT NULL,
    PRIMARY KEY (`post_id`, `tag_id`),
    FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `post_tags` (`tag_id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Post likes
CREATE TABLE `post_likes` (
    `like_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `post_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `liked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_like` (`post_id`, `user_id`),
    FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_likes_post` (`post_id`),
    INDEX `idx_likes_user` (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Post comments and replies
CREATE TABLE `comments` (
    `comment_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `post_id` VARCHAR(36) NOT NULL,
    `author_id` VARCHAR(36) NOT NULL,
    `content` TEXT NOT NULL,
    `parent_comment_id` VARCHAR(36),
    `likes_count` INT DEFAULT 0,
    `is_reported` BOOLEAN DEFAULT FALSE,
    `is_deleted` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
    FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
    INDEX `idx_comments_post` (`post_id`),
    INDEX `idx_comments_author` (`author_id`),
    INDEX `idx_comments_parent` (`parent_comment_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Comment likes
CREATE TABLE `comment_likes` (
    `like_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `comment_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `liked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_comment_like` (`comment_id`, `user_id`),
    FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_comment_likes_comment` (`comment_id`),
    INDEX `idx_comment_likes_user` (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 3. Marketplace System Tables
-- =====================================================

-- Marketplace categories
CREATE TABLE `marketplace_categories` (
    `category_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `category_name` VARCHAR(100) NOT NULL,
    `category_name_bn` VARCHAR(100),
    `description` TEXT,
    `icon_url` VARCHAR(500),
    `parent_category_id` VARCHAR(36),
    `is_active` BOOLEAN DEFAULT TRUE,
    `sort_order` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`parent_category_id`) REFERENCES `marketplace_categories` (`category_id`) ON DELETE SET NULL,
    INDEX `idx_category_name` (`category_name`),
    INDEX `idx_category_active` (`is_active`),
    INDEX `idx_category_parent` (`parent_category_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Marketplace listings
CREATE TABLE `marketplace_listings` (
    `listing_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `seller_id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(12, 2),
    `currency` VARCHAR(3) DEFAULT 'BDT',
    `category_id` VARCHAR(36),
    `listing_type` ENUM(
        'sell',
        'rent',
        'buy',
        'service'
    ) DEFAULT 'sell',
    `status` ENUM(
        'active',
        'sold',
        'expired',
        'draft'
    ) DEFAULT 'active',
    `images` JSON,
    `location` VARCHAR(255),
    `contact_phone` VARCHAR(20),
    `contact_email` VARCHAR(255),
    `is_featured` BOOLEAN DEFAULT FALSE,
    `views_count` INT DEFAULT 0,
    `saves_count` INT DEFAULT 0,
    `contacts_count` INT DEFAULT 0,
    `tags` JSON,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `expires_at` TIMESTAMP DEFAULT(
        CURRENT_TIMESTAMP + INTERVAL 60 DAY
    ),
    FOREIGN KEY (`seller_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `marketplace_categories` (`category_id`) ON DELETE SET NULL,
    INDEX `idx_listings_status` (`status`),
    INDEX `idx_listings_category` (`category_id`),
    INDEX `idx_listings_seller` (`seller_id`),
    INDEX `idx_listings_location` (`location`),
    INDEX `idx_listings_type` (`listing_type`),
    INDEX `idx_listings_created` (`created_at` DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Listing saves/favorites
CREATE TABLE `marketplace_listing_saves` (
    `save_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `listing_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `saved_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_save` (`listing_id`, `user_id`),
    FOREIGN KEY (`listing_id`) REFERENCES `marketplace_listings` (`listing_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_saves_listing` (`listing_id`),
    INDEX `idx_saves_user` (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 4. Consultation System Tables
-- =====================================================

-- Consultation sessions
CREATE TABLE `consultations` (
    `consultation_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `farmer_id` VARCHAR(36) NOT NULL,
    `expert_id` VARCHAR(36),
    `topic` VARCHAR(255),
    `crop_type` VARCHAR(100),
    `issue_description` TEXT NOT NULL,
    `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `status` ENUM(
        'pending',
        'in_progress',
        'resolved',
        'cancelled'
    ) DEFAULT 'pending',
    `location` VARCHAR(255),
    `images` JSON,
    `consultation_fee` DECIMAL(10, 2),
    `payment_status` ENUM('pending', 'paid', 'refunded'),
    `preferred_time` VARCHAR(100),
    `consultation_type` ENUM(
        'voice',
        'video',
        'chat',
        'in_person'
    ) DEFAULT 'chat',
    `urgency` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `resolved_at` TIMESTAMP NULL,
    FOREIGN KEY (`farmer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`expert_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_consultations_farmer` (`farmer_id`),
    INDEX `idx_consultations_expert` (`expert_id`),
    INDEX `idx_consultations_status` (`status`),
    INDEX `idx_consultations_priority` (`priority`),
    INDEX `idx_consultations_created` (`created_at` DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Consultation responses
CREATE TABLE `consultation_responses` (
    `response_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `consultation_id` VARCHAR(36) NOT NULL,
    `expert_id` VARCHAR(36) NOT NULL,
    `response_text` TEXT NOT NULL,
    `attachments` JSON,
    `is_final_response` BOOLEAN DEFAULT FALSE,
    `diagnosis` TEXT,
    `treatment` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`consultation_id`) REFERENCES `consultations` (`consultation_id`) ON DELETE CASCADE,
    FOREIGN KEY (`expert_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_responses_consultation` (`consultation_id`),
    INDEX `idx_responses_expert` (`expert_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 5. Disease Diagnosis System Tables
-- =====================================================

-- Disease diagnosis
CREATE TABLE `diagnoses` (
    `diagnosis_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `farmer_id` VARCHAR(36) NOT NULL,
    `crop_type` VARCHAR(100),
    `symptoms_description` TEXT,
    `uploaded_images` JSON,
    `farm_area` DECIMAL(10, 2),
    `area_unit` ENUM('acre', 'bigha', 'katha') DEFAULT 'bigha',
    `ai_analysis_result` JSON,
    `expert_verification_id` VARCHAR(36),
    `is_verified_by_expert` BOOLEAN DEFAULT FALSE,
    `urgency` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `status` ENUM(
        'pending',
        'diagnosed',
        'completed'
    ) DEFAULT 'pending',
    `location` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`farmer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`expert_verification_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_diagnoses_farmer` (`farmer_id`),
    INDEX `idx_diagnoses_crop` (`crop_type`),
    INDEX `idx_diagnoses_status` (`status`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Disease treatments
CREATE TABLE `disease_treatments` (
    `treatment_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `diagnosis_id` VARCHAR(36) NOT NULL,
    `disease_name` VARCHAR(255),
    `disease_name_bn` VARCHAR(255),
    `probability_percentage` DECIMAL(5, 2),
    `treatment_description` TEXT,
    `estimated_cost` DECIMAL(10, 2),
    `treatment_guidelines` JSON,
    `prevention_guidelines` JSON,
    `video_links` JSON,
    `disease_type` VARCHAR(100),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`diagnosis_id`) REFERENCES `diagnoses` (`diagnosis_id`) ON DELETE CASCADE,
    INDEX `idx_treatments_diagnosis` (`diagnosis_id`),
    INDEX `idx_treatments_disease` (`disease_name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Treatment chemicals
CREATE TABLE `treatment_chemicals` (
    `chemical_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `treatment_id` VARCHAR(36) NOT NULL,
    `chemical_name` VARCHAR(255),
    `chemical_type` ENUM(
        'fungicide',
        'pesticide',
        'herbicide',
        'fertilizer',
        'bactericide'
    ) DEFAULT 'fungicide',
    `dose_per_acre` DECIMAL(8, 2),
    `dose_unit` VARCHAR(20),
    `price_per_unit` DECIMAL(10, 2),
    `application_notes` TEXT,
    `safety_precautions` TEXT,
    `application_method` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`treatment_id`) REFERENCES `disease_treatments` (`treatment_id`) ON DELETE CASCADE,
    INDEX `idx_chemicals_treatment` (`treatment_id`),
    INDEX `idx_chemicals_type` (`chemical_type`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 6. Crop Recommendation System Tables
-- =====================================================

-- Crop recommendations
CREATE TABLE `crop_recommendations` (
    `recommendation_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `farmer_id` VARCHAR(36) NOT NULL,
    `location` VARCHAR(255),
    `soil_type` VARCHAR(100),
    `season` VARCHAR(50),
    `land_size` DECIMAL(10, 2),
    `land_unit` ENUM('acre', 'bigha', 'katha') DEFAULT 'bigha',
    `budget` DECIMAL(12, 2),
    `recommended_crops` JSON,
    `climate_data` JSON,
    `market_analysis` JSON,
    `profitability_analysis` JSON,
    `year_plan` JSON,
    `expert_id` VARCHAR(36),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`farmer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`expert_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_recommendations_farmer` (`farmer_id`),
    INDEX `idx_recommendations_season` (`season`),
    INDEX `idx_recommendations_location` (`location`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Crops database
CREATE TABLE `crops_database` (
    `crop_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `crop_name` VARCHAR(100) NOT NULL,
    `crop_name_bn` VARCHAR(100),
    `season` VARCHAR(50),
    `region` VARCHAR(100),
    `cost_per_bigha` DECIMAL(10, 2),
    `yield_per_bigha` DECIMAL(8, 2),
    `market_price_per_unit` DECIMAL(8, 2),
    `duration_days` INT,
    `profit_per_bigha` DECIMAL(10, 2),
    `difficulty_level` ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    `is_quick_harvest` BOOLEAN DEFAULT FALSE,
    `cost_breakdown` JSON,
    `cultivation_plan` JSON,
    `description` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_crops_name` (`crop_name`),
    INDEX `idx_crops_season` (`season`),
    INDEX `idx_crops_profit` (`profit_per_bigha`),
    INDEX `idx_crops_difficulty` (`difficulty_level`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 7. Weather and Market Information Tables
-- =====================================================

-- Weather data
CREATE TABLE `weather_data` (
    `weather_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `location` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `temperature_min` DECIMAL(5, 2),
    `temperature_max` DECIMAL(5, 2),
    `humidity` DECIMAL(5, 2),
    `rainfall` DECIMAL(8, 2),
    `wind_speed` DECIMAL(6, 2),
    `weather_condition` VARCHAR(100),
    `weather_condition_bn` VARCHAR(100),
    `forecast_data` JSON,
    `agricultural_advice` TEXT,
    `agricultural_advice_bn` TEXT,
    `season` VARCHAR(50),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_location_date` (`location`, `date`),
    INDEX `idx_weather_location_date` (`location`, `date` DESC),
    INDEX `idx_weather_season` (`season`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Market prices
CREATE TABLE `market_prices` (
    `price_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `crop_name` VARCHAR(100) NOT NULL,
    `crop_name_bn` VARCHAR(100),
    `market_location` VARCHAR(255),
    `price_per_unit` DECIMAL(10, 2),
    `unit` VARCHAR(20),
    `price_date` DATE NOT NULL,
    `price_trend` ENUM('up', 'down', 'stable') DEFAULT 'stable',
    `source` VARCHAR(255),
    `wholesale_price` DECIMAL(10, 2),
    `retail_price` DECIMAL(10, 2),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_market_prices_date` (`price_date` DESC),
    INDEX `idx_market_prices_crop` (`crop_name`),
    INDEX `idx_market_prices_location` (`market_location`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Agricultural news
CREATE TABLE `agricultural_news` (
    `news_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `title` VARCHAR(500) NOT NULL,
    `title_bn` VARCHAR(500),
    `content` TEXT NOT NULL,
    `content_bn` TEXT,
    `summary` TEXT,
    `summary_bn` TEXT,
    `author` VARCHAR(255),
    `source_url` VARCHAR(500),
    `featured_image_url` VARCHAR(500),
    `category` VARCHAR(100),
    `tags` JSON,
    `is_government_notice` BOOLEAN DEFAULT FALSE,
    `is_featured` BOOLEAN DEFAULT FALSE,
    `publish_date` TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_news_publish_date` (`publish_date` DESC),
    INDEX `idx_news_category` (`category`),
    INDEX `idx_news_featured` (`is_featured`),
    INDEX `idx_news_government` (`is_government_notice`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 8. Notification System Table
-- =====================================================

-- Notifications
CREATE TABLE `notifications` (
    `notification_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `recipient_id` VARCHAR(36) NOT NULL,
    `sender_id` VARCHAR(36),
    `notification_type` ENUM(
        'consultation_request',
        'post_interaction',
        'system',
        'marketplace',
        'diagnosis',
        'weather_alert'
    ) DEFAULT 'system',
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `related_entity_id` VARCHAR(36),
    `is_read` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `read_at` TIMESTAMP NULL,
    FOREIGN KEY (`recipient_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_notifications_recipient` (`recipient_id`, `is_read`),
    INDEX `idx_notifications_type` (`notification_type`),
    INDEX `idx_notifications_created` (`created_at` DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 9. System Configuration Table
-- =====================================================

-- System settings
CREATE TABLE `system_settings` (
    `setting_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `setting_key` VARCHAR(100) UNIQUE NOT NULL,
    `setting_value` TEXT,
    `setting_type` ENUM(
        'string',
        'number',
        'boolean',
        'json'
    ) DEFAULT 'string',
    `description` TEXT,
    `is_public` BOOLEAN DEFAULT FALSE,
    `updated_by` VARCHAR(36),
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_settings_key` (`setting_key`),
    INDEX `idx_settings_public` (`is_public`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 10. Additional Tables (According to Codebase)
-- =====================================================

-- Farmer queries (for consultants)
CREATE TABLE `farmer_queries` (
    `query_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `farmer_id` VARCHAR(36) NOT NULL,
    `expert_id` VARCHAR(36),
    `location` VARCHAR(255),
    `land_size` DECIMAL(8, 2),
    `land_unit` ENUM('acre', 'bigha', 'katha') DEFAULT 'bigha',
    `current_crop` VARCHAR(100),
    `season` VARCHAR(50),
    `budget` DECIMAL(12, 2),
    `query_text` TEXT NOT NULL,
    `status` ENUM(
        'pending',
        'responded',
        'completed'
    ) DEFAULT 'pending',
    `response_text` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `responded_at` TIMESTAMP NULL,
    FOREIGN KEY (`farmer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`expert_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    INDEX `idx_queries_farmer` (`farmer_id`),
    INDEX `idx_queries_expert` (`expert_id`),
    INDEX `idx_queries_status` (`status`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Login sessions
CREATE TABLE `user_sessions` (
    `session_id` VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    `user_id` VARCHAR(36) NOT NULL,
    `session_token` VARCHAR(255) NOT NULL,
    `device_info` TEXT,
    `ip_address` VARCHAR(45),
    `is_active` BOOLEAN DEFAULT TRUE,
    `expires_at` TIMESTAMP DEFAULT(
        CURRENT_TIMESTAMP + INTERVAL 30 DAY
    ),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    INDEX `idx_sessions_user` (`user_id`),
    INDEX `idx_sessions_token` (`session_token`),
    INDEX `idx_sessions_active` (`is_active`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- 11. Dummy Data Insert (For Testing)
-- =====================================================

-- Marketplace category data
INSERT INTO
    `marketplace_categories` (
        `category_id`,
        `category_name`,
        `category_name_bn`,
        `description`
    )
VALUES (
        UUID(),
        'crops',
        'Crops and Vegetables',
        'All types of crops and vegetables'
    ),
    (
        UUID(),
        'machinery',
        'Machinery',
        'Agricultural machinery and equipment'
    ),
    (
        UUID(),
        'fertilizer',
        'Fertilizers and Pesticides',
        'Chemical and organic fertilizers, pesticides'
    ),
    (
        UUID(),
        'seeds',
        'Seeds and Seedlings',
        'High quality seeds and seedlings'
    ),
    (
        UUID(),
        'livestock',
        'Livestock',
        'Cattle, goats, poultry and other animals'
    ),
    (
        UUID(),
        'tools',
        'Tools',
        'Agricultural tools'
    ),
    (
        UUID(),
        'other',
        'Others',
        'Other agricultural related products'
    );

-- Post tag data
INSERT INTO
    `post_tags` (`tag_id`, `tag_name`)
VALUES (UUID(), 'rice'),
    (UUID(), 'wheat'),
    (UUID(), 'corn'),
    (UUID(), 'tomato'),
    (UUID(), 'potato'),
    (UUID(), 'onion'),
    (UUID(), 'disease'),
    (UUID(), 'fertilizer'),
    (UUID(), 'pesticide'),
    (UUID(), 'organic_farming'),
    (UUID(), 'modern_farming'),
    (UUID(), 'market_price'),
    (UUID(), 'weather'),
    (UUID(), 'advice'),
    (UUID(), 'question');

-- Crops database
INSERT INTO
    `crops_database` (
        `crop_id`,
        `crop_name`,
        `crop_name_bn`,
        `season`,
        `region`,
        `cost_per_bigha`,
        `yield_per_bigha`,
        `market_price_per_unit`,
        `duration_days`,
        `profit_per_bigha`,
        `difficulty_level`,
        `is_quick_harvest`
    )
VALUES (
        UUID(),
        'Rice',
        'Rice',
        'Rabi',
        'All regions',
        20000,
        25,
        28,
        120,
        45000,
        'easy',
        FALSE
    ),
    (
        UUID(),
        'Wheat',
        'Wheat',
        'Rabi',
        'Northern region',
        15000,
        15,
        25,
        110,
        22500,
        'easy',
        TRUE
    ),
    (
        UUID(),
        'Corn',
        'Corn',
        'Kharif',
        'All regions',
        18000,
        20,
        22,
        100,
        26000,
        'medium',
        TRUE
    ),
    (
        UUID(),
        'Potato',
        'Potato',
        'Rabi',
        'Northern region',
        25000,
        150,
        15,
        90,
        97500,
        'medium',
        FALSE
    ),
    (
        UUID(),
        'Tomato',
        'Tomato',
        'Rabi',
        'All regions',
        30000,
        80,
        40,
        75,
        102000,
        'hard',
        FALSE
    ),
    (
        UUID(),
        'Onion',
        'Onion',
        'Rabi',
        'Southern region',
        22000,
        60,
        35,
        85,
        88000,
        'medium',
        FALSE
    );

-- System settings
INSERT INTO
    `system_settings` (
        `setting_id`,
        `setting_key`,
        `setting_value`,
        `setting_type`,
        `description`,
        `is_public`
    )
VALUES (
        UUID(),
        'app_name',
        'Langol Krishi Sahayak',
        'string',
        'Application name',
        TRUE
    ),
    (
        UUID(),
        'app_version',
        '1.0.0',
        'string',
        'Application version',
        TRUE
    ),
    (
        UUID(),
        'max_upload_size',
        '10485760',
        'number',
        'Maximum upload size (bytes)',
        FALSE
    ),
    (
        UUID(),
        'consultation_fee_min',
        '100',
        'number',
        'Minimum consultation fee',
        TRUE
    ),
    (
        UUID(),
        'consultation_fee_max',
        '5000',
        'number',
        'Maximum consultation fee',
        TRUE
    ),
    (
        UUID(),
        'enable_notifications',
        'true',
        'boolean',
        'Enable/disable notifications',
        FALSE
    ),
    (
        UUID(),
        'default_language',
        'bn',
        'string',
        'Default language',
        TRUE
    ),
    (
        UUID(),
        'supported_languages',
        '["bn", "en"]',
        'json',
        'Supported languages',
        TRUE
    );

-- =====================================================
-- 12. Triggers and Functions
-- =====================================================

-- Post likes count update trigger
DELIMITER / /

CREATE TRIGGER `update_post_likes_count` 
AFTER INSERT ON `post_likes`
FOR EACH ROW
BEGIN
    UPDATE `posts` 
    SET `likes_count` = (
        SELECT COUNT(*) FROM `post_likes` 
        WHERE `post_id` = NEW.`post_id`
    )
    WHERE `post_id` = NEW.`post_id`;
END //

DELIMITER;

-- Post likes count delete trigger
DELIMITER / /

CREATE TRIGGER `update_post_likes_count_delete` 
AFTER DELETE ON `post_likes`
FOR EACH ROW
BEGIN
    UPDATE `posts` 
    SET `likes_count` = (
        SELECT COUNT(*) FROM `post_likes` 
        WHERE `post_id` = OLD.`post_id`
    )
    WHERE `post_id` = OLD.`post_id`;
END //

DELIMITER;

-- Comment count update trigger
DELIMITER / /

CREATE TRIGGER `update_post_comments_count` 
AFTER INSERT ON `comments`
FOR EACH ROW
BEGIN
    UPDATE `posts` 
    SET `comments_count` = (
        SELECT COUNT(*) FROM `comments` 
        WHERE `post_id` = NEW.`post_id` AND `is_deleted` = FALSE
    )
    WHERE `post_id` = NEW.`post_id`;
END //

DELIMITER;

-- Expert rating update trigger
DELIMITER / /

CREATE TRIGGER `update_expert_rating` 
AFTER INSERT ON `consultation_responses`
FOR EACH ROW
BEGIN
    UPDATE `expert_qualifications` 
    SET `total_consultations` = `total_consultations` + 1
    WHERE `user_id` = NEW.`expert_id`;
END //

DELIMITER;

-- =====================================================
-- 13. Views (For Reporting)
-- =====================================================

-- Active users view
CREATE VIEW `active_users_view` AS
SELECT u.`user_id`, u.`user_type`, up.`full_name`, up.`location`, up.`district`, u.`created_at`, u.`is_verified`
FROM `users` u
    LEFT JOIN `user_profiles` up ON u.`user_id` = up.`user_id`
WHERE
    u.`is_active` = TRUE;

-- Popular posts view
CREATE VIEW `popular_posts_view` AS
SELECT
    p.`post_id`,
    p.`content`,
    p.`post_type`,
    p.`likes_count`,
    p.`comments_count`,
    p.`shares_count`,
    p.`views_count`,
    up.`full_name` AS `author_name`,
    p.`created_at`
FROM
    `posts` p
    JOIN `users` u ON p.`author_id` = u.`user_id`
    LEFT JOIN `user_profiles` up ON u.`user_id` = up.`user_id`
WHERE
    p.`is_deleted` = FALSE
ORDER BY (
        p.`likes_count` + p.`comments_count` + p.`shares_count`
    ) DESC;

-- Active marketplace view
CREATE VIEW `active_marketplace_view` AS
SELECT
    ml.`listing_id`,
    ml.`title`,
    ml.`price`,
    ml.`listing_type`,
    ml.`location`,
    mc.`category_name_bn`,
    up.`full_name` AS `seller_name`,
    ml.`views_count`,
    ml.`saves_count`,
    ml.`created_at`
FROM
    `marketplace_listings` ml
    JOIN `users` u ON ml.`seller_id` = u.`user_id`
    LEFT JOIN `user_profiles` up ON u.`user_id` = up.`user_id`
    LEFT JOIN `marketplace_categories` mc ON ml.`category_id` = mc.`category_id`
WHERE
    ml.`status` = 'active';

-- Pending consultations view
CREATE VIEW `pending_consultations_view` AS
SELECT
    c.`consultation_id`,
    c.`topic`,
    c.`crop_type`,
    c.`priority`,
    farmer.`full_name` AS `farmer_name`,
    expert.`full_name` AS `expert_name`,
    c.`created_at`,
    c.`status`
FROM
    `consultations` c
    JOIN `users` u_farmer ON c.`farmer_id` = u_farmer.`user_id`
    LEFT JOIN `user_profiles` farmer ON u_farmer.`user_id` = farmer.`user_id`
    LEFT JOIN `users` u_expert ON c.`expert_id` = u_expert.`user_id`
    LEFT JOIN `user_profiles` expert ON u_expert.`user_id` = expert.`user_id`
WHERE
    c.`status` IN ('pending', 'in_progress');

-- =====================================================
-- 14. Index Optimization
-- =====================================================

-- Full-text indexes for search optimization
ALTER TABLE `posts` ADD FULLTEXT (`content`);

ALTER TABLE `marketplace_listings`
ADD FULLTEXT (`title`, `description`);

ALTER TABLE `agricultural_news` ADD FULLTEXT (`title`, `content`);

-- Composite indexes
CREATE INDEX `idx_posts_type_created` ON `posts` (
    `post_type`,
    `created_at` DESC
);

CREATE INDEX `idx_listings_status_category` ON `marketplace_listings` (`status`, `category_id`);

CREATE INDEX `idx_consultations_status_priority` ON `consultations` (`status`, `priority`);

-- =====================================================
-- Successful completion message
-- =====================================================

SELECT 'Langol Krishi Sahayak Database successfully created!' as 'Status';

SELECT COUNT(TABLE_NAME) as 'Total Tables Created', 'langol_krishi_sahayak' as 'Database Name'
FROM INFORMATION_SCHEMA.TABLES
WHERE
    TABLE_SCHEMA = 'langol_krishi_sahayak';

-- =====================================================
-- Note:
-- This script is created for XAMPP/MySQL 8.0+
-- UUID() function is supported in MySQL 8.0+
-- For older versions use VARCHAR(36)
-- =====================================================