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

Hito 4: Para volver a ejecutar tests.py hay que borrar manualmente en la base de datos el/los nuevo(s) usuario(s) creado(s) durante la ejecución anterior (funcionando correctamente solo debería ser el de los datos válidos, puesto que los inválidos no deberían crearse) o la otra opción es modificar el rut de prueba por otro que no exista en la base de datos, sin embargo, en dicho caso hay que tener cuidado de que sea un rut real dado que el digito verificador se calcula a partir del resto del rut.

Hito 5: Para ejecutar el plan de pruebas, debe cambiar el destino al archivo CSV correspondiente en cada prueba, siendo así prueba_2 usado para Registrar citas y rut_consulta para Consultar Citas.

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
