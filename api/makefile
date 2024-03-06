include .env
export $(shell sed 's/=.*//' .env)

up:
	docker-compose up
	
up-db:
	docker-compose -f docker-compose.db.yml up --build

down: 
	docker-compose down

logs:
	docker-compose logs -f ${COMPOSE_PROJECT_NAME}

reload: down up

clean: down
	@echo "=============Cleaning up============="
	docker system prune -f
	docker volume prune -f

build:
	docker build -t sqaasadmin/chatbot-api:${DOCKER_IMAGE_TAG_NAME} .

restart: clean build up

attach:
	docker-compose exec ${COMPOSE_PROJECT_NAME} bash

allLogs:
	docker-compose logs -f

