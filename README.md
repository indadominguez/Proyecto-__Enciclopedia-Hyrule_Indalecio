## Descripción del proyecto 

La aplicación es una **enciclopedia web interactiva del universo de The Legend of Zelda**, diseñada para que los usuarios puedan explorar información de toda la saga, buscar contenido en tiempo real, guardar elementos como favoritos y exportar datos del catálogo de juegos.

Su objetivo principal es ofrecer una experiencia centralizada donde los fans puedan consultar personajes, criaturas y elementos del universo Zelda de forma rápida, organizada y persistente.

---

## Tecnologías y herramientas 

---

## La Zelda API 

---

## Formatos de datos 
En el desarrollo de aplicaciones y el intercambio de información entre sistemas, es fundamental utilizar formatos que permitan estructurar, transportar y validar datos de manera eficiente. Entre los más utilizados se encuentran XML y JSON, junto con sus respectivos mecanismos de validación: XSD y JSON Schema.

A continuación, se explicará qué es cada uno de estos conceptos, cuáles son sus diferencias principales y en qué situaciones es más adecuado utilizar cada uno.

---

### XML (eXtensible Markup Language)

Es un **lenguaje de marcado** diseñado para **almacenar y transportar datos** de forma estructurada.

- Usa etiquetas (similar a HTML)
- Es extensible y muy flexible
- Legible por humanos y máquinas

### JSON (JavaScript Object Notation)

Es un **formato de intercambio** de datos ligero basado en pares **clave-valor**.

- Sintaxis simple y compacta
- Fácil de leer y escribir
- Muy utilizado en APIs REST
- Compatible con la mayoría de lenguajes

### XSD (XML Schema Definition)

Es un lenguaje que define la estructura y las reglas de un **documento XML**.

- Validar documentos XML
- Definir tipos de datos (string, int, etc.)
- Establecer restricciones (campos obligatorios, longitud, etc.)
- Definir jerarquías

### JSON Schema

Es un lenguaje para definir y validar la estructura de **documentos JSON**.

- Validar datos JSON
- Definir tipos de datos
- Establecer campos obligatorios
- Restringir valores

---

## Esquemas 

---

## Almacenamiento 

En la aplicación se utilizan dos sistemas de almacenamiento distintos porque cada uno cumple un objetivo diferente dentro de la arquitectura del proyecto.

---

### Local Storage

Se utiliza para almacenar información temporal, especialmente datos que no necesitan ser persistentes ni compartidos entre dispositivos.

**Utilizarlo como caché tienes las siguientes ventajas importantes:**

- Acceso muy rápido: los datos se leen directamente desde el navegador sin necesidad de hacer peticiones a un servidor o a una API externa.
- Reducción de peticiones HTTP: si ya se han cargado datos previamente (por ejemplo, resultados de búsquedas o listados), no es necesario volver a solicitarlos, lo que mejora el rendimiento.
- Funciona sin conexión: incluso si el usuario pierde conexión a internet, la información cacheada sigue disponible.
- Simplicidad de implementación: no requiere configuración ni autenticación.

Un ejemplo dento de la aplicación es si alguien hace la misma busqueda más de una vez, el resultado se guarda y evita hacer de nuevo una llamada a la api.

---

### Limitaciones del Local Storage

Aunque el Local Storage es muy útil tiene varias limitaciones importantes que lo hacen inadecuado para almacenar datos como favoritos:

- No es multi-dispositivo: los datos solo existen en el navegador donde se guardan.
- Se pueden perder fácilmente: si el usuario borra caché o datos del navegador, los favoritos desaparecen.
- No hay seguridad real: cualquier usuario puede modificar los datos desde las herramientas del desarrollador.
- No hay control de usuarios: no existe autenticación ni separación entre usuarios.
- Capacidad limitada: normalmente alrededor de 5MB por dominio.
- No permite consultas complejas: no se pueden hacer filtros avanzados ni búsquedas eficientes.

Por estas razones, solo es adecuado para datos temporales o de mejora de rendimiento, no para información importante del usuario.

---

### Firebase Firestore

Por otro lado, Firestore se utiliza para almacenar datos importantes del usuario, como en este caso la lista de favoritos, ya que estos deben de ser persistentes y accesibles desde cualquier dispositivo.

Las ventajas más importantes son:

- Almacenamiento en la nube: Los datos no dependen del dispositivo, sino de la cuenta del usuario.
- Persistencia real: los favoritos permanecen aunque el usuario cierre sesión o cambie de navegador.
- Escalabilidad y estructura: permite organizar datos por colecciones (usuarios → favoritos → elementos).
- Integración con autenticación: se puede asociar cada documento a un usuario concreto.

---

### Reglas de Seguridad de Firestore

Firestore utiliza un sistema llamado **Security Rules**, que define quién puede leer o escribir datos en la base de datos. Estas reglas son fundamentales para garantizar la seguridad de la aplicación.

Las reglas funcionan como un conjunto de condiciones que se comprueban cada vez que alguien intenta acceder a la base de datos.

- Si el usuario cumple las condiciones → se le permite el acceso
- Si no las cumple → se le bloquea el acceso

Esto hace que Firestore sea una base de datos muy segura si está bien configurada.

**En producción, las reglas se vuelven más estrictas.**

- Solo los usuarios que han iniciado sesión pueden acceder a los datos
- Cada usuario solo puede ver y modificar su propia información
- Se impide el acceso a datos de otros usuarios
- Se pueden definir permisos diferentes según el tipo de dato (por ejemplo, favoritos, perfiles, publicaciones, etc.)

Esto garantiza que cada usuario solo tenga acceso a su propia información.

---

### Alternativas de Almacenamiento

**1. Cookies**

Las cookies son pequeños archivos de datos que el navegador guarda y que pueden ser enviados al servidor en cada petición.

¿Cuándo se usan?

Se utilizan principalmente para guardar información muy básica como sesiones de usuario, preferencias simples o identificadores temporales.

Ventajas:

- Se envían automáticamente al servidor
- Útiles para mantener sesiones iniciadas
- Funcionan de forma sencilla en casi todos los navegadores
- Permiten cierto control desde **el backend**

Desventajas:

- Muy poca capacidad de almacenamiento
- Menos seguras si no se configuran correctamente
- No adecuadas para guardar datos complejos
- Se envían en cada petición, lo que puede afectar el rendimiento


**2. IndexedDB**

IndexedDB es una base de datos integrada en el navegador que permite almacenar grandes cantidades de información de forma estructurada.

¿Cuándo se usa?

Se utiliza en aplicaciones web avanzadas que necesitan trabajar offline o manejar muchos datos en el cliente.

Ventajas:

- Mucho más capacidad que localStorage
- Permite almacenar objetos complejos
- Funciona sin conexión a internet
- Ideal para aplicaciones web **tipo PWA**

Desventajas:

- Más compleja de programar
- No sincroniza datos entre dispositivos
- Depende del navegador del usuario

---

## Decisiones técnicas  

---

## Instrucciones de uso 

