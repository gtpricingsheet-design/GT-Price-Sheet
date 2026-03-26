"use client"

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div id="loadingScreen" className={isLoading ? '' : 'fade'}>
      <div className="spinner" />
      <p>Loading</p>
    </div>
  )
}
