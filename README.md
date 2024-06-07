# Grupo 13

Este es el repositorio del *Grupo 13*, cuyos integrantes son:

* Camilo Díaz Galaz - 202004543-7
* Erik Sepúlveda - 201873548-5
* Felipe Brauer - 201773540-6
* José Aros - 202130556-4
* **Tutor**: Tabata Ahumada

## Wiki

- [Puede acceder a la wiki de nuestro proyecto actual mediante el siguiente enlace](https://github.com/Cam1loadg/INF225P201G13/wiki)

## Historias de usuario

- [Puede acceder a las historias de usuario de nuestro proyecto actual mediante el siguiente enlace](https://github.com/Cam1loadg/INF225P201G13/issues)

## Identificicación del proyecto base del semestre 2023-2

- Nuestro proyecto base fue realizado por integrantes del Grupo 11 del paralelo 201 del año 2023-2 con el fin de brindar un sistema el cual permita llevar un registro de las horas agendadas en el área de imagen,
modernizando y mejorando así la manera de registrar existente, además de evitar las modificaciones arbitrarias, los errores al momento de ingresar datos y los problemas de legibilidad existentes.


## Lineamientos Entregas

- [Lineamiento Entrega 1 (PDF)](https://aula.usm.cl/pluginfile.php/5819266/mod_resource/content/1/Hito%201%20vf.pdf)
- [Lineamiento Entrega 2 (PDF)](https://aula.usm.cl/pluginfile.php/5834724/mod_resource/content/1/Hito%202%20vf.pdf)
- [Lineamiento Entrega 3 (PDF)](https://aula.usm.cl/pluginfile.php/5859038/mod_resource/content/1/Hito%203%20vf.pdf)
- [Lineamiento Entrega 4 (PDF)](https://aula.usm.cl/pluginfile.php/5880739/mod_resource/content/1/Hito%204%20vf.pdf)

  ## Vídeos
  
[Vídeo Explicativo Hito 4](https://www.youtube.com/watch?v=WInZvphc8ZQ)


## Aspectos técnicos relevantes

_Todo aspecto relevante cuando para poder usar el proyecto o consideraciones del proyecto base a ser entregado_

## Instrucciones compilación

_Prerrequisitos:_ 
* Instalar NodeJS (Versión LTS).
* Configurar una Base de Datos en MongoDB.

### Cliente

Desde la carpeta `client`, abrir una terminal y seguir los siguientes pasos:

1. Para instalar los módulos necesarios para iniciar el cliente (frontend) utilizar el comando:

```
npm install
```

2. Para iniciar el cliente en modo desarrollador, alojado en [http://localhost:3000](http://localhost:3000), se utiliza el siguiente comando:

```
npm start
```

3. Para detener el cliente, en la terminal realizar `CTRL+C`, luego `Y` y `Enter`.

### Servidor

**Importante:** El servidor utiliza MongoDB, entonces para conectar a una Base de Datos en MongoDB, se debe modificar el archivo `Database/index.js` y cambiar la URL `const MONGO_URL` de ser necesario.

Desde la carpeta `server`, abrir una terminal y seguir los siguientes pasos:

1. Para instalar los módulos necesarios para iniciar el servidor (backend) utilizar el comando:

```
npm install
```

2. Para iniciar el servidor, alojado en [http://localhost:5000](http://localhost:5000), se utiliza el siguiente comando:

```
npm start
```

3. Para detener el servidor, en la terminal realizar `CTRL+C`, luego `Y` y `Enter`.
