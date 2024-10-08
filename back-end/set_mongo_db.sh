#!/bin/bash

# Nome do container
CONTAINER_NAME=aulas_mongo

# Nome do volume
VOLUME_NAME=mongodb_data

# Informações do banco de dados (a serem definidas no arquivo .env)
MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME:-admin}
MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD:-password123}
DATABASE_NAME=mydatabase

# Função para criar o container do MongoDB
create_mongo_container() {
  docker run -d --name "$CONTAINER_NAME" -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME="$MONGO_INITDB_ROOT_USERNAME" \
    -e MONGO_INITDB_ROOT_PASSWORD="$MONGO_INITDB_ROOT_PASSWORD" \
    -v "$VOLUME_NAME":/data/db mongosh
}

# Função para verificar se o container está rodando
is_container_running() {
  docker ps -q --filter "name=$CONTAINER_NAME" | grep -q .
}

# Função para iniciar o container caso ele não esteja rodando
start_mongo_container() {
  if ! is_container_running; then
    create_mongo_container
  fi
}

# Função para parar e remover o container
stop_and_remove_container() {
  if is_container_running; then
    docker stop "$CONTAINER_NAME" && docker rm "$CONTAINER_NAME"
  fi
}

# Função para criar um usuário no MongoDB
create_user() {
  docker exec -it "$CONTAINER_NAME" mongosh "$DATABASE_NAME" --eval "
    db.createUser({
      user: '$MONGO_INITDB_ROOT_USERNAME',
      pwd: '$MONGO_INITDB_ROOT_PASSWORD',
      roles: [{ role: 'readWrite', db: '$DATABASE_NAME' }]
    });
  "
}

# Verificar se o container está rodando e iniciá-lo se necessário
start_mongo_container

# Criar o usuário (se necessário, ajuste as credenciais e o banco)
create_user
