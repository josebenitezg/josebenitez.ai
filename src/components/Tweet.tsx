import { Tweet } from 'react-tweet'

export default function StaticTweet({ id }: { id: string }) {
  return (
    <div className="flex justify-center my-6">
      <Tweet id={id} />
    </div>
  )
} 