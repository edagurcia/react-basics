# UP-TASK Backend

Cuando se utiliza populate project viene con todas sus propiedades, por eso
en este caso para comparar las ID debe ser task.project.\_id.toString()
en el caso de DELETE y UPDATE no porque no hay populate
al no tener un populate project es un ObjectId de mongo

Al utilizar cors hacerlo como en el archivo generado para este proyecto, ya que en modo de desarrollo permite utilizar postman para hacer pruebas.
