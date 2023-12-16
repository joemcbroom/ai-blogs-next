const projectId = 'dyhumgxwuzsrinvjiefx'

export default function supabaseLoader ({ src, width, quality }) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/blogverse-public/${src}
    }`
}