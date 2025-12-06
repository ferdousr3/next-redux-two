import { httpClient } from '@/lib/http-client'
import { Product, ProductInput, ProductQuery } from '@/types/product'

export class ProductApiService {
   private baseUrl = '/v1/products'

   async getAllProducts(query?: ProductQuery) {
      const params = new URLSearchParams()
      if (query?.search) params.append('search', query.search)
      if (query?.page) params.append('page', query.page.toString())
      if (query?.size) params.append('size', query.size.toString())

      const response = await httpClient.get<{ data: Product[], pagination: { total: number } }>(`${this.baseUrl}?${params.toString()}`)
      // Adapt response structure if needed, or assume backend matches interface
      // Original code returned { products, total } manually
      return { products: response.data.data, total: response.data.pagination?.total || response.data.data.length }
   }

   async getProduct(id: string) {
      const response = await httpClient.get<{ data: Product }>(`${this.baseUrl}/${id}`)
      return response.data.data
   }

   async createProduct(data: ProductInput) {
      const response = await httpClient.post<{ data: Product }>(this.baseUrl, data)
      return response.data.data
   }

   async updateProduct(id: string, data: Partial<Product>) {
      // Backend uses PATCH method
      const response = await httpClient.patch<{ data: Product }>(`${this.baseUrl}/${id}`, data)
      return response.data.data
   }

   async deleteProduct(id: string) {
      const response = await httpClient.delete<{ data: Product }>(`${this.baseUrl}/${id}`)
      return response.data.data
   }
}

export const productApi = new ProductApiService()
