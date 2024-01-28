import Hero from '../components/Layout/Hero'
import HomeMenu from '../components/Layout/HomeMenu'
import SectionHeaders from '../components/Layout/SectionHeaders'

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className='text-center my-16'>
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'} />
        <div className='text-gray-500 max-w-lg mx-auto mt-4 flex flex-col gap-5'>
          <p>
            this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a
            testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis
            is a testthis is a testthis is a testthis is a testthis is a testthis is a test
          </p>
          <p>
            this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a
            testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis
            is a testthis is a testthis is a testthis is a testthis is a testthis is a test
          </p>
          <p>
            this is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a testthis is a
            testthis is a testthis is a testthis is a testthis is a testthis
          </p>
        </div>
      </section>
      <section className='text-center my-8'>
        <SectionHeaders subHeader={"Don't hesitate to"} mainHeader={'Contact us'} />
        <div className='mt-8'>
          <a className='text-4xl underline text-gray-500' href='tel: +84123456789'>
            +84123456789
          </a>
        </div>
      </section>
    </>
  )
}
