'use client';

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLawyers, setQuery } from '@/lib/features/lawyers/slice'
import type { RootState, AppDispatch } from '@/store/store'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { PageLoading } from '@/components/shared/Loading'
import { PageError } from '@/components/shared/Error'

export default function LawyersPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { lawyers, loading, error, initialized } = useSelector((state: RootState) => state.lawyers)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!initialized) {
        dispatch(fetchLawyers({ page: 1, size: 10 }))
    }
  }, [dispatch, initialized])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    dispatch(setQuery({ search: value, page: 1 }))
    dispatch(fetchLawyers({ search: value, page: 1, size: 10 }))
  }

  const handleRetry = () => {
     dispatch(fetchLawyers({ search: searchTerm, page: 1, size: 10 }))
  }

  if (loading && !initialized) {
     return <PageLoading message="Loading lawyers..." />
  }

  if (error && !initialized) {
     return <PageError message={error} onRetry={handleRetry} />
  }

  return (
    <div className="container py-10 px-6 md:px-24">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Find a Lawyer</h1>
          <p className="text-muted-foreground">
            Browse our list of qualified legal professionals.
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search lawyers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {!loading && lawyers.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No lawyers found. Try adjusting your search.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          <Card
            key={lawyer.id}
            className="overflow-hidden transition-shadow"
          >
            <div className="h-32 bg-muted relative">
              {/* Placeholder for cover image */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-teal-100"></div>
            </div>
            <CardHeader className="relative pt-0">
              <div className="absolute -top-12 left-6 h-24 w-24 rounded-full border-4 border-background bg-muted overflow-hidden">
                {/* Placeholder for profile image */}
                 {lawyer.profilePictureUrl ? (
                    <img src={lawyer.profilePictureUrl} alt={lawyer.name} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400">
                    {lawyer.name.charAt(0)}
                    </div>
                 )}
              </div>
              <div className="pt-14">
                <CardTitle>{lawyer.name}</CardTitle>
                <CardDescription>{lawyer.lawyerType}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Institute:</span>
                  <span className="font-medium">{lawyer.instituteName}</span>
                </div>
                {lawyer.rating && (
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="font-medium text-yellow-600">
                        ★ {lawyer.rating}
                    </span>
                    </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{lawyer.city || 'N/A'}</span>
                </div>
                <Button className="w-full mt-4">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
