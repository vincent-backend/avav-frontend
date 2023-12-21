import Base from '@/layouts/Baseof'
import Image from 'next/image'

export default function Home() {
  return (
    <Base>
    {/*background*/}
    <div className="absolute w-full h-full bg-cover bg-center bg-[url('/images/home/bg_top_pic.png')] md:bg-[url('/images/home/md/bg_top_pic.png')] -z-10" />
    <div className="absolute w-[358px] h-[670px] bg-[url('/images/home/top_left_line.svg')]" />
    <div className="absolute w-[661px] md:w-[1100px] h-[995px] md:h-[1658px] top-[389px] right-0 bg-[url('/images/home/bg_right_light.svg')] md:bg-[url('/images/home/md/bg_right_light.svg')] opacity-70" />
    <div className="container pt-48 min-h-[2000px]">
      aaa
    </div>
    </Base>
  )
}
