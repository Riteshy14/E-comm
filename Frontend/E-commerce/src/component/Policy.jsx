
const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-30 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src='exchange_icon.png' className='w-12 m-auto mb-5' alt="Easy Exchange" />
        <p className='font-semibold'>Hassle-Free Exchanges</p>
        <p className='text-gray-500'>Easily exchange products within 7 days</p>
        <p className="text-gray-500">of delivery with no extra charges.</p>
      </div>
      
      <div>
        <img src='quality_icon.png' className='w-12 m-auto mb-5' alt="Quality Products" />
        <p className='font-semibold'>Premium Quality Guaranteed</p>
        <p className='text-gray-500'>We carefully select products to ensure the</p>
        <p className="text-gray-500"> highest quality for our customers.</p>
      </div>
      
      <div>
        <img src='support_img.png' className='w-12 m-auto mb-5' alt="Customer Support" />
        <p className='font-semibold'>24/7 Customer Support</p>
        <p className='text-gray-500'>Our dedicated support team is available anytime</p>
        <p className="text-gray-500">to help you with your queries.</p>
      </div>

    </div>
  )
}

export default Policy
