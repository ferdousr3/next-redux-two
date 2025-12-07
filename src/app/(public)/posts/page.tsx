'use client';

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, createPost, updatePost, deletePost, setSelectedPost } from '@/lib/features/posts/slice'
import type { RootState, AppDispatch } from '@/store/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PostForm } from '@/components/forms/PostForm'
import { Plus, Edit, Trash2, Lock, LogIn, Loader2 } from 'lucide-react'
import { Post } from '@/types/post'
import Link from 'next/link'
import { toast } from 'sonner'
import { DeleteConfirmDialog } from '@/components/shared/ConfirmDialog'
import { PostListSkeleton } from '@/components/shared/PostSkeleton'

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, creating, updating, selectedPost, deleting, initialized } = useSelector((state: RootState) => state.posts)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<Post | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!initialized) {
        dispatch(fetchPosts({ limit: 20 }))
    }
  }, [dispatch, initialized])

  // Check if user can modify a post
  const canModifyPost = (post: Post) => {
    if (!isAuthenticated || !user) return false
    if (!post.creatorId) return true // Legacy data or admin override if needed
    return post.creatorId === user.id
  }

  const handleSubmit = async (data: any) => {
    if (selectedPost) {
      const result = await dispatch(updatePost({ id: selectedPost.id, data }))
      if (updatePost.fulfilled.match(result)) {
        toast.success('Post updated successfully')
        setIsDialogOpen(false)
        dispatch(setSelectedPost(null))
      }
    } else {
      const result = await dispatch(createPost(data))
      if (createPost.fulfilled.match(result)) {
        toast.success('Post created successfully')
        setIsDialogOpen(false)
        dispatch(setSelectedPost(null))
      }
    }
  }

  const handleEdit = (post: Post) => {
    if (!canModifyPost(post)) {
      toast.error('You can only edit your own posts')
      return
    }
    dispatch(setSelectedPost(post))
    setIsDialogOpen(true)
  }

  const handleDeleteClick = (post: Post) => {
    if (!canModifyPost(post)) {
      toast.error('You can only delete your own posts')
      return
    }
    setPostToDelete(post)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return
    const result = await dispatch(deletePost(postToDelete.id))
    if (deletePost.fulfilled.match(result)) {
      toast.success('Post deleted successfully')
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) dispatch(setSelectedPost(null))
  }

  // Removed simple PageLoading, will handle with Skeleton below

  // Determine if we should show authenticated actions
  const showAuthActions = isMounted && isAuthenticated

  return (
    <div className="container py-10 px-6 md:px-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Posts
          </h1>
          <p className="text-muted-foreground">Read and explore all posts</p>
        </div>

        {showAuthActions ? (
          <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
              </DialogHeader>
              <PostForm
                initialData={selectedPost ? { title: selectedPost.title, content: selectedPost.content || '' } : undefined}
                onSubmit={handleSubmit}
                onCancel={() => handleDialogClose(false)}
                isLoading={creating || updating}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login to Create
            </Button>
          </Link>
        )}
      </div>

      {loading && !initialized ? (
        <PostListSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const canModify = canModifyPost(post)
            return (
              <Card key={post.id} className="transition-shadow group">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {post.content || 'No content'}
                  </p>

                  {/* Only show edit/delete if user is logged in AND owns the post */}
                  {showAuthActions && canModify ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(post)}
                        disabled={deleting === post.id}
                      >
                        {deleting === post.id ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4 mr-1" />}
                        Delete
                      </Button>
                    </div>
                  ) : showAuthActions ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>Not your post</span>
                    </div>
                  ) : (
                    <Link href="/login" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700">
                      <LogIn className="w-4 h-4" />
                      Login to edit
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        itemName={postToDelete ? `"${postToDelete.title}"` : 'this post'}
        onConfirm={handleDeleteConfirm}
        loading={deleting === postToDelete?.id}
      />
    </div>
  )
}
