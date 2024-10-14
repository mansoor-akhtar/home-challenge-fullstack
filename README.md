# home-challenge-fullstack

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)


## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mansoor-akhtar/home-challenge-fullstack.git
   cd home-challenge-fullstack

2. **Docker build:**

   ```bash
   docker-compose build
   docker compose up -d

3. **Database Connection:**
Add entries for database configuration in .env file in backend laravel project
    ```bash
    DB_CONNECTION=mysql
    DB_HOST=mysql_db
    DB_PORT=3306
    DB_DATABASE=world_news
    DB_USERNAME=root
    DB_PASSWORD=root

4. **Migration and Passport setup:**
Go to backend container and run following command from terminal to run migration and do entry for passport client
```bash
docker exec -ti backend /bin/bash
php artisan migrate
php artisan passport:client --personal


4. **Run application:**
After successfull running of each and every step you should be able to run the application with below url

```bash
http://localhost:3000/

