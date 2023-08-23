# Githubpedia 💻

Prueba técnica que consiste en  desarrollar una aplicación web utilizando Next.js para conectarte y consumir el API de GitHub. La aplicación deberá:

[✅] Permitir listar los usuarios.

[✅] Buscar repositorios públicos por nombre de usuario.

[✅] Mostrar los detalles básicos de cada repositorio encontrado.

[✅] Implementar una funcionalidad adicional que permita guardar ciertos repositorios como "Favoritos" en la aplicación.

[✅] Uso de autenticación básica para realizar las peticiones.


## Instalación

1 . Clone o descargue el zip del [repositorio](https://github.com/aventuradev/githubpedia.git).

2 . En la carpeta del proyecto instale los módulos con:
```bash
npm install
```
3 . Al mismo nivel del archivo package.json cree un archivo:  `.env.local`

y cree una variable llamada: `NEXT_PUBLIC_GITHUB_TOKEN`
 
que tendrá como valor tu token de acceso generado en tu cuenta de github, *(en la siguiente sección es cómo crear el token)*, de la siguiente manera:
```javascript
NEXT_PUBLIC_GITHUB_TOKEN='YOUR_TOKEN'
```

4 . Con esto realizado solo resta iniciar el proyecto con el comando:
```bash
npm run dev
```
que se ejecutara por defecto en el puerto 3000, pudiendo así acceder a través del
```javascript
http://localhost:300
```

## Cómo crear el token de acceso de github

1 . Ya autenticad@ en tu perfil de github, en la esquina superior derecha de cualquier página, haz clic en tu foto de perfil y luego haz clic en **Configuración**.

2 . En la parte inferior de barra lateral izquierda, haz clic en **Configuración del desarrollador**.

3 . En la barra lateral izquierda, en Tokens de acceso personal , haga clic en **Tokens (clásicos)**.

4 . Haga clic en **Generar nuevo token**.

5 . En **Nombre del token**, ingresa un nombre para el token. **En Caducidad**, selecciona una caducidad para el token. Opcionalmente, en **Descripción**, agregua una nota para describir el propósito del token.

6 . En Permisos , solo necesitas marcar los de **usuarios**

```javascript
[✅] usuarios
    [✅] read:userRead
    [✅] user:emailAccess 
    [✅] user:follow
```

7 . Haces clic en **Generar token**. Una vez generado, lo copias y lo colocas en le archivo mencionado antes. 


## Sobre el desarrollo

Entre los aspectos principales para el desarrollo del proyecto fue el uso ***Context**, para sacar ventaja de *la permanencia de los datos* una vez solicitados y poder utilizarlos y reutilizarlos por toda la aplicación sin la necesidad de recurrir a *peticiones innecesarias* al API. Combinadolo tambiéb con la creación y uso de **Hooks personalidos** para funciones específicas requeridas, de igual forma, por toda la aplicación. 

El ***diseño del Frontend*** inspirado en la misma plataforma de github con CSS Vanilla 100% sin ningún uso de librería.

## ¡Un proyecto muy entretenido de desarrollar!