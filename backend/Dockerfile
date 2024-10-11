# backend/Dockerfile

FROM php:8.1-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install zip

# Set the working directory
WORKDIR /var/www

# Copy the Laravel application
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies
RUN composer install

# Expose the port
EXPOSE 9000

CMD ["php-fpm"]
