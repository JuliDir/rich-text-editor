# RichTextEditor

Un componente de editor de texto enriquecido (WYSIWYG) para React, construido con TypeScript, Tailwind CSS y componentes de shadcn/ui. Incluye una barra de herramientas completa, soporte para atajos de teclado, integración con formularios y capacidad de generar contenido mediante IA.

## 🚀 Características

- ✅ **Editor WYSIWYG completo** con barra de herramientas visual
- ✅ **Formato de texto**: negrita, itálica, subrayado
- ✅ **Colores**: texto y fondo con paleta de colores personalizable
- ✅ **Alineación**: izquierda, centro, derecha
- ✅ **Listas**: ordenadas y desordenadas
- ✅ **Historial**: deshacer y rehacer
- ✅ **Atajos de teclado** estándar
- ✅ **Integración con react-hook-form**
- ✅ **Generación de contenido con IA**
- ✅ **Contador de caracteres**
- ✅ **Altura ajustable** (mínima y máxima)
- ✅ **Tema oscuro/claro** compatible
- ✅ **Tooltips** informativos en cada herramienta

## 🛠️ Tecnologías

- **React 18+** con TypeScript
- **Tailwind CSS** para el diseño y estilos
- **shadcn/ui** para componentes base (Button, Separator, Tooltip, Popover)
- **react-hook-form** para manejo de formularios
- **Sonner** para notificaciones toast
- **Lucide React** para iconografía

## 📦 Instalación

```bash
# Instalar dependencias base
npm install react react-hook-form

# Instalar shadcn/ui components
npx shadcn-ui@latest add button separator tooltip popover

# Instalar iconos y notificaciones
npm install lucide-react sonner

# Asegurar Tailwind CSS esté configurado
npm install -D tailwindcss
```

## 🎯 Uso Básico

### Componente independiente

```tsx
import RichTextEditor from '@/components/RichTextEditor';

function MyComponent() {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      rows={5}
      maxRows={15}
      prompt="Genera contenido sobre..."
    />
  );
}
```

### Integración con react-hook-form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import RichTextEditor from '@/components/RichTextEditor';

type FormData = {
  content: string;
};

function RichTextForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { content: '' }
  });

  const onSubmit = (data: FormData) => {
    toast.success('Contenido guardado!');
    console.log('HTML generado:', data.content);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            rows={10}
            maxRows={20}
          />
        )}
      />
      
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## ⚙️ Props del Componente

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `string` | `""` | Contenido HTML actual del editor |
| `onChange` | `(value: string) => void` | - | Callback ejecutado al cambiar el contenido |
| `onBlur` | `() => void` | - | Callback ejecutado al perder el foco |
| `rows` | `number` | `3` | Líneas mínimas visibles (altura mínima) |
| `maxRows` | `number` | `10` | Líneas máximas antes del scroll interno |
| `prompt` | `string` | - | Prompt para generación de contenido con IA |

## ⌨️ Atajos de Teclado

El editor soporta los siguientes atajos de teclado estándar:

| Atajo | Acción |
|-------|---------|
| `Ctrl + B` | Negrita |
| `Ctrl + I` | Itálica |
| `Ctrl + U` | Subrayado |
| `Ctrl + Z` | Deshacer |
| `Ctrl + Y` | Rehacer |
| `Ctrl + Shift + Z` | Rehacer (alternativo) |

> **Nota**: Los atajos funcionan automáticamente gracias a los comandos nativos del navegador (`document.execCommand`).

## 🤖 Integración con IA

### Configuración del Hook useOpenAI

Para habilitar la generación de contenido con IA, necesitas configurar el hook `useOpenAI`:

```tsx
// hooks/useOpenAI.ts
import { useState, useCallback } from 'react';
import { getAIResponse } from '@/service/openai';

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = useCallback(async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAIResponse(prompt);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, generate };
}
```

### Servicio de IA (Ejemplo con OpenAI)

```tsx
// service/openai.ts
export async function getAIResponse(prompt: string): Promise<string> {
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    throw new Error('Error al generar contenido');
  }

  const data = await response.json();
  return data.content;
}
```

### Habilitar IA en el Editor

Una vez configurado el servicio, descomenta la línea en `useRichTextEditor`:

```tsx
// hooks/useRichTextEditor.ts
import { useOpenAI } from "@/hooks/useOpenAI";

export const useRichTextEditor = ({ /* props */ }) => {
  // Descomentar esta línea:
  const { loading, generate } = useOpenAI();

  // Actualizar handleGenerateContent:
  const handleGenerateContent = useCallback(async () => {
    if (!prompt) return;
    
    try {
      const content = await generate(prompt);
      // Aplicar contenido generado al editor...
    } catch (error) {
      toast.error('Error generando contenido');
    }
  }, [prompt, generate]);

  // ...resto del hook
};
```

## 🎨 Personalización y Extensión

### Agregar Nuevos Botones de Formato

Para agregar nuevos botones a la barra de herramientas:

```tsx
// Ejemplo: Botón de tachado
<FormatButton 
  command="strikeThrough" 
  icon={<Strikethrough className="h-4 w-4" />} 
  label="Tachado" 
  isActive={isCommandActive("strikeThrough")} 
  onClick={handleFormat} 
/>
```

### Personalizar Colores

Modifica el array `TEXT_COLORS` en `constants.ts`:

```tsx
export const TEXT_COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
  // Agregar más colores...
];
```

### Nuevos Comandos de Formato

El editor soporta todos los comandos estándar de `document.execCommand`:

- `fontSize` - Tamaño de fuente
- `fontName` - Tipo de fuente
- `createLink` - Crear enlaces
- `insertImage` - Insertar imágenes
- `formatBlock` - Encabezados (H1, H2, etc.)

## 🔧 Hooks Personalizados

### useRichTextEditor

Hook principal que maneja toda la lógica del editor:

```tsx
const {
  activeCommands,    // Set<string> - comandos activos
  isFocused,         // boolean - estado del foco
  loading,           // boolean - carga de IA
  handleFormat,      // (command: string, value?: string) => void
  isCommandActive,   // (command: string) => boolean
  handleGenerateContent, // () => Promise<void>
  updateActiveCommands,  // () => void
  handleInput,       // () => void
} = useRichTextEditor({ value, onChange, prompt, editorRef });
```

## 🎭 Componentes Auxiliares

### FormatButton

Botón reutilizable para comandos de formato:

```tsx
<FormatButton 
  command="bold"
  icon={<Bold className="h-4 w-4" />}
  label="Negrita"
  isActive={isCommandActive("bold")}
  onClick={handleFormat}
/>
```

### ColorPickerButton

Selector de colores con popover:

```tsx
<ColorPickerButton 
  command="foreColor"
  icon={<Palette className="h-4 w-4" />}
  label="Color de texto"
  colors={TEXT_COLORS}
  onFormat={handleFormat}
/>
```

### AIGenerateButton

Botón para generar contenido con IA:

```tsx
<AIGenerateButton 
  loading={loading}
  onClick={handleGenerateContent}
/>
```

## 🐛 Solución de Problemas

### El contenido no se sincroniza

Asegúrate de que el prop `value` se actualice correctamente:

```tsx
const [content, setContent] = useState('');

<RichTextEditor 
  value={content}
  onChange={setContent} // ✅ Correcto
/>
```

### Los atajos de teclado no funcionan

Verifica que el editor tenga el foco y que `document.execCommand` esté disponible en tu navegador.

### La IA no se conecta

1. Verifica que el hook `useOpenAI` esté descomentado
2. Configura correctamente tu servicio de IA
3. Proporciona un `prompt` válido al componente

## 👨‍💻 Autor

**Julián Di Rocco**  
📧 jgdirocco@gmail.com  

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ⭐ Soporte

Si este proyecto te fue útil, considera darle una estrella ⭐ en GitHub.

---

**¿Necesitas ayuda?** Abre un issue o contáctame directamente.