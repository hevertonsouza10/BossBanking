import Spline from '@splinetool/react-spline/next'

export default function SplineScene({
  onLoad,
}: {
  onLoad?: () => void
}) {
  return (
    <Spline
      scene="https://prod.spline.design/qKkYeGEZYllgUbLo/scene.splinecode"
      className="h-full w-full"
      onLoad={onLoad}
    />
  )
}