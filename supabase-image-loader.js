const projectId = 'dyhumgxwuzsrinvjiefx'

export default function supabaseLoader ({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/render/image/public/blogverse-public/${src}?width=${Math.min(width, 1200)}&quality=${quality || 75
    }`
}