[![Build Status](https://travis-ci.org/emanuelbalcazar/geoperfil.svg?branch=master)]()

# Proyecto GeoPerfil

Proyecto de investigación realizado por los alumnos de la UNPSJB PM.

## Requisitos

- [NodeJS 10.x](https://nodejs.org/es/)
- [PostgreSQL](https://www.postgresql.org/)
- [AdonisJS](https://adonisjs.com/)
- [Vue Cli](https://cli.vuejs.org/guide/installation.html)

## Despliegue

Clonar el proyecto: 
```
git clone https://github.com/emanuelbalcazar/geoperfil
```

Instalar dependencias dentro del proyecto:
```
npm install
```

Ejecutar las migraciones con:
```
adonis migration:run
```

Ejecutar los seeders con:
```
adonis seed
```

Desplegar el servidor con:
```
adonis serve
```

o desplegar en modo desarrollo:

```
adonis serve --dev
```

## FrontEnd

La interfaz web se encuentra dentro de la carpeta de `frontend` y se levanta aparte del servidor backend adonis.
El frontend utiliza el template base de [vuestic-admin](https://github.com/epicmaxco/vuestic-admin)

Para desplegar hay que:

Moverse a la carpeta frontend:

```
cd frontend
```

Instalar las dependencias:

```
npm install
```

Levantar el frontend con:

```
npm run serve
```

