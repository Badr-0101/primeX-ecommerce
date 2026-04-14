
const Header = ({title,target}: {title:string,target:string}) => {
  return (
      <div>
          <h2 className='text-2xl font-bold text-white'>{title} <span className='text-primary'>{target}</span></h2>    
    </div>
  )
}

export default Header