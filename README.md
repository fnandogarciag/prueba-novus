# Prueba Novus

Como cualquier app de Node.js, se debe instalar los paquetes con el siguiente comando

```
npm i
```

Se usa una base de datos de MongoDB en el archivo .env, existe un ejemplo en la carpeta raíz, pero debe tener el siguiente formato y conectarse a mongo db

```
MONGO_DB_NAME=demo
MONGO_URL=mongodb://root:root123@localhost:27017?retryWrites=true&writeConcern=majority
```

> MONGO_DB_NAME: nombre de la base de datos a usar

> MONGO_URL: la url de la base de datos

Como se usa MongoDB solo con agregar lo anterior se configura automáticamente.

Para abrir el servidor de pruebas se usa el siguiente comando

```
npm run dev
```
