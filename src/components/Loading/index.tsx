import { useStore } from "../../store"

export default function Loading() {
  const { loading } = useStore();

  if(!loading) return <></>;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#000000F0] flex justify-center items-center">
      <div className="flex items-center space-x-3">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
        </span>
        <span className="text-white font-medium text-2xl">Loading</span>
      </div>
    </div>
  )
}