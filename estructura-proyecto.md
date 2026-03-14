src/app/
├── shared/                 # Recursos GLOBALES (se repiten en toda la web)
│   └── navbar/             # El menú superior
├── components/             # Piezas ATÓMICAS (reutilizables pero no globales)
│   └── user-card/          # La tarjeta individual de usuario
├── pages/                  # Vistas con RUTA (Páginas completas)
│   ├── home/               # Listado Grid de usuarios (Componente padre)
│   ├── user-view/          # Detalle de un solo usuario (user/:id)
│   └── user-form/          # Formulario mixto (Crear / Actualizar)
├── services/               # Lógica de datos 
│   └── users.service.ts    
├── interfaces/             # Contratos de datos (SINGULAR: un solo objeto)
│   └── iuser.interface.ts  
└── app.routes.ts           # Configuración de navegación