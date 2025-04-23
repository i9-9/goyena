# Configuración de Google Sheets para el Formulario de Contacto

Esta guía te ayudará a configurar la integración con Google Sheets para el formulario de contacto de Goyena.

## Requisitos

- Una cuenta de Google
- Acceso a [Google Cloud Console](https://console.cloud.google.com/)

## Pasos para la Configuración

### 1. Crear un Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto haciendo clic en el selector de proyectos en la parte superior de la página
3. Dale un nombre descriptivo como "Goyena Website"
4. Espera a que se cree el proyecto y selecciónalo

### 2. Habilitar las APIs necesarias

1. En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
2. Busca y habilita las siguientes APIs:
   - Google Sheets API
   - Google Drive API

### 3. Crear una cuenta de servicio

1. En el menú lateral, ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" y selecciona "Cuenta de servicio"
3. Dale un nombre a la cuenta de servicio (por ejemplo, "goyena-sheets")
4. Puedes dejar los permisos en blanco por ahora
5. Haz clic en "Listo"

### 4. Crear una clave para la cuenta de servicio

1. En la lista de cuentas de servicio, haz clic en la cuenta recién creada
2. Ve a la pestaña "Claves"
3. Haz clic en "Agregar clave" > "Crear nueva clave"
4. Selecciona el formato JSON
5. Haz clic en "Crear" para descargar el archivo JSON de credenciales

### 5. Crear una hoja de cálculo en Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com/)
2. Crea una nueva hoja de cálculo
3. Nombra la hoja (por ejemplo, "Goyena - Contactos") 
4. Opcionalmente, puedes agregar los siguientes encabezados en la primera fila:
   - Fecha
   - Nombre
   - Apellido
   - Teléfono
   - Email
   - Búsqueda
   - Mensaje

### 6. Compartir la hoja de cálculo con la cuenta de servicio

1. En tu hoja de cálculo, haz clic en el botón "Compartir" en la esquina superior derecha
2. En el campo "Agregar personas", ingresa el email de la cuenta de servicio (lo encontrarás en el archivo JSON como `client_email`)
3. Asegúrate de darle permisos de "Editor"
4. Desactiva la opción de notificar a las personas
5. Haz clic en "Compartir"

### 7. Configurar las variables de entorno en el proyecto

1. Abre el archivo JSON de credenciales descargado
2. En tu archivo `.env.local`, actualiza las siguientes variables:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=client_email del archivo JSON
GOOGLE_PRIVATE_KEY=private_key del archivo JSON (mantén las comillas y los \n)
GOOGLE_SPREADSHEET_ID=ID de tu hoja de cálculo (lo encontrarás en la URL después de /d/ y antes de /edit)
```

Ejemplo de URL de hoja de cálculo:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v/edit#gid=0
```

En este caso, el ID sería:
```
1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v
```

## Verificar la integración

1. Reinicia el servidor de desarrollo
2. Completa y envía el formulario de contacto
3. Verifica que los datos aparezcan en tu hoja de cálculo de Google

## Solución de problemas

Si encuentras errores, verifica lo siguiente:

1. Asegúrate de que las APIs de Google Sheets y Google Drive estén habilitadas
2. Verifica que la cuenta de servicio tenga permisos de editor en la hoja de cálculo
3. Comprueba que el ID de la hoja de cálculo sea correcto
4. Asegúrate de que las variables de entorno estén correctamente formateadas
   - El `GOOGLE_PRIVATE_KEY` debe incluir los caracteres `\n` para los saltos de línea

Para depurar, puedes revisar los logs del servidor en la consola de desarrollo. 