# Api RestFul - Plataforma de Gestion de Eventos

Librerias utilizadas en el proyecto

1. [Fastify](https://fastify.dev/)
2. [Bcrypt](https://www.npmjs.com/package/bcrypt)
3. [Axios](https://www.npmjs.com/package/axios)
4. [xlsx](https://www.npmjs.com/package/xlsx)

Pasos para correr el proyecto

1. Instalar la version de node `v20.16`
2. Estar seguro que tengas instalado `yarn` en tu local. En caso de no tener yarn instalado puedes ejecutar el siguiente comando con npm `npm install -g yarn`.
3. Correr `yarn install` para instalar todas las dependencias del proyecto.
4. Para correr el servidor solo debes ejecutar el siguiente comando `yarn dev` y la app correra automaticamente en el puerto `:8080`
5. Ejecutar manualmente las sentencias creadas en el siguiente directorio `sql/schema.sql` donde se encuentran las tablas usadas y la base de datos.
6. Debes crear un archivo de variables de entorno `.env` para las variables usadas en el proyecto tales como:

- `DB_HOST=`
- `DB_PORT=`
- `DB_USER=`
- `DB_PASSWORD=`
- `DB_NAME=`
- `JWT_SECRET=`
- `MAPBOX_TOKEN=`

Para acceder a la documentacion de la api es necesario ir a la siguiente ruta: `host:8080/api-docs`
