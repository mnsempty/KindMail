# MANUAL DE DESPLIEGUE

Para poner en marcha KindMail de forma local es necesario seguir los pasos descritos a continuación. Además, se deberá tener el archivo de configuración `.env` para poder realizarlo correctamente. Los comandos se deberán insertar en la consola preferida por el usuario, se recomienda abrir varias consolas para poder poner en marcha el backend y el frontend. Se describen los pasos:

1. **Clonar el repositorio**:

   ```git clone https://github.com/mnsempty/KindMail```

2. **Insertar el `.env` en la carpeta `backend`**.

3. **Actualizar npm en backend desde la consola**:

    ```cd kindmail```

    ```cd backend```

    ```npm update```

4. **Actualizar npm en frontend desde la consola**:

   ```cd..```

   ```cd frontend```

   ```npm update```

5. **Poner en marcha frontend desde la consola**:

   ```npm run dev```

6. **Poner en marcha backend desde la consola**:

   ```cd kindmail```

   ```cd backend```

   ```npm start```
