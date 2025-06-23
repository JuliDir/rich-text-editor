import RichTextEditorForm from "@/components/RichTextEditor/RichTextEditorForm"
import { Button } from "@/components/shadcn/button"
import { Badge } from "@/components/shadcn/badge"
import { Github, Heart, Linkedin } from "lucide-react"
import Link from "next/link"

export default function RichTextEditorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      <div className="container mx-auto px-4 pt-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-4">
            Rich Text Editor
          </h1>
          <p className="text-md text-slate-600 dark:text-slate-400 mb-4">
            Un editor de texto enriquecido moderno y elegante
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="https://es.react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800"
              >
              ⚛️ React
              </Badge>
            </Link>
            <Link
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="secondary" className="bg-black text-white dark:bg-white dark:text-black">
              ▲ Next.js
              </Badge>
            </Link>
            <Link
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
              variant="secondary"
              className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 border-cyan-200 dark:border-cyan-800"
              >
              🎨 Tailwind CSS
              </Badge>
            </Link>
            <Link
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800"
              >
              🎯 shadcn/ui
              </Badge>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-xl">
          <RichTextEditorForm />
        </div>
      </div>

      <footer className="py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Link
              href="https://www.linkedin.com/in/julian-di-rocco/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-200/80 dark:hover:bg-gray-800"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              href="https://github.com/JuliDir/rich-text-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-200/80 dark:hover:bg-gray-800"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
            <span>Desarrollado con</span>
            <Heart className="h-4 w-4 text-red-500" fill="red" />
            <span>por Julián Di Rocco</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
