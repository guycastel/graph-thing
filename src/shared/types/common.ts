// Shared types used across multiple domains

export interface Position {
  x: number
  y: number
}

export interface ApiResponse<T> {
  data: T
  loading: boolean
  error: string | null
}

export interface LoadingState {
  loading: boolean
  error: string | null
}
