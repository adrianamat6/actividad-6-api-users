src/app/
├── interfaces/         # Los contratos de datos (Por ejemplo: IUser, IUserResponse)
├── services/           # La lógica de datos (Plural: UsersService)
├── components/         # Piezas atómicas (reutilizables)
│   ├── navbar/         # El menú superior: Tendrá los enlaces a "Home" y "Nuevo Usuario".
│   └── user-card/      # La tarjeta que se repite. Recibirá un usuario y mostrará su foto, nombre,etc.
├── pages/              # Componentes con RUTA (Páginas completas)
│   ├── home/           # Listado Grid de usuario. Componente padre
│   ├── user-view/      # Detalle de un solo usuario
│   └── user-form/      # Formulario para Crear y Editar (Reutilizable). 
└── app.routes.ts       # Definición de navegación