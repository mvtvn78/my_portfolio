import { withBase } from 'vitepress'

export function assetUrl(path: string | null | undefined): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return withBase(path.startsWith('/') ? path : `/${path}`)
}
