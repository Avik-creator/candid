export type Profile = {
  user_id: string
  username: string
  display_name: string | null
  bio: string | null
  prompt: string
  accepting: boolean
  created_at: string
}

export type Message = {
  id: string
  profile_user_id: string
  body: string
  reply: string | null
  is_read: boolean
  is_published: boolean
  is_favorite: boolean
  created_at: string
  replied_at: string | null
}
