import GYMLOADING from "@/assets/GYMLOADING.webm"
const LoadngSpinner = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen bg-page-bg'>
        <video src={GYMLOADING} autoPlay loop muted/>
    </div>
  )
}

export default LoadngSpinner