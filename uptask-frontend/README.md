# UpTask Frontend

Para poder utilizar el alias de @ en las importaciones se re configuro el vite.config.ts y tsconfig.json y tsconfig.node.json

En los formularios la función noValidate evita la validación de HTML5 para poder utilizar zod o yup. Eje:

<form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
></form>

Cuando se utilizan variables de entorno o .env es necesario:

crear el archivo env.d.ts :

/// <reference types="vite/client" />

interface ImportMetaEnv {
readonly VITE_APP_TITLE: string;
// more env variables...
}

interface ImportMeta {
readonly env: ImportMetaEnv;
}

y modificar el archivo tsconfig.json :

{
"compilerOptions": {
"target": "ES2020",
"useDefineForClassFields": true,
"lib": ["ES2020", "DOM", "WebWorker"],
"module": "ESNext",
"skipLibCheck": true,
"types": ["vite/client"],

    /* Configuración clave del alias */
    "baseUrl": "./src", // Indica la carpeta base para la resolución de módulos
    "paths": {
      "@/*": ["*"] // Mapea @/algo a src/algo
    },

    /* Opciones de Bundler */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true

},
"include": ["src"],
"references": [{ "path": "./tsconfig.node.json" }]
}
