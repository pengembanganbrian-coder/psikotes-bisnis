import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO, SITE_URL } from '../config/seo'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Memasang judul, deskripsi, canonical, dan meta robots sesuai rute.
 * Rute di config/seo.js diindeks; rute lain (hasil tes, dashboard, login,
 * laporan pribadi) diberi noindex supaya tidak muncul di Google.
 */
export default function RouteSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/'
    const seo = SEO[path]
    const url = SITE_URL + (path === '/' ? '/' : path)

    if (seo) {
      document.title = seo.title
      setMeta('name', 'description', seo.description)
      setMeta('property', 'og:title', seo.title)
      setMeta('property', 'og:description', seo.description)
      setMeta('property', 'og:url', url)
      setMeta('name', 'robots', 'index, follow')
      setCanonical(url)
    } else {
      setMeta('name', 'robots', 'noindex, nofollow')
      setCanonical(url)
    }
  }, [pathname])

  return null
}
