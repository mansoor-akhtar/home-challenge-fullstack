configure-backend:
	docker exec backend bash -c "php artisan migrate"
	docker exec backend bash -c "php artisan passport:client --personal"