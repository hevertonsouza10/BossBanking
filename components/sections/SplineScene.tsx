import Spline from '@splinetool/react-spline/next'

export default function SplineScene({
  onLoad,
}: {
  onLoad?: () => void
}) {
  return (
    <Spline
      scene="https://prod.spline.design/x5wn5bZMT-Kfm7MB/scene.splinecode"
      className="h-full w-full"
      onLoad={onLoad}
    />
  )
}