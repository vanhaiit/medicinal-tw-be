#!/bin/bash

echo "Stopping containers..."
sudo docker-compose down

echo "Removing database volume..."
sudo docker volume rm medicinal-tw-be_db

echo "Done. You can now run 'docker-compose up' to recreate a fresh database."