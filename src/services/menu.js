
import { supabase } from '../lib/supabase'

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, image_url, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getProducts(categoryId = null) {
  let query = supabase
    .from('products')
    .select(`
      id,
      category_id,
      name,
      slug,
      description,
      price_kobo,
      image_url,
      is_available
    `)
    .eq('is_available', true)
    .order('name', { ascending: true })

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}
