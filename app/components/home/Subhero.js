import React from 'react';
import { useCursor } from '@/cursor/CursorContext';
import Link from 'next/link';

export default function Subhero() {
  const { setCursorText, setCursorVariant } = useCursor();

  const handleResetMouse = (e) => {
    setCursorText("");
    setCursorVariant("default");
  };

    const items = [
        { title: '', imageUrl: 'https://media.discordapp.net/attachments/1068131427910168670/1146054717051523082/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_5efd3154-ce34-4c38-80d6-edbe288115bc.png?width=1034&height=1034' },
        { title: '', imageUrl: 'https://media.discordapp.net/attachments/1068131427910168670/1146054941539053668/lucasjolibois54_a_bar_restaurant_random_color_design_in_the_sty_8bb530de-61e2-40c0-80f3-998826c65aad.png?width=1034&height=1034' },
        { title: '', imageUrl: 'https://media.discordapp.net/attachments/1068131427910168670/1144228292115824701/lucasjolibois54_a_beer_bottle_on_a_shelf_with_a_random_color_de_f5ec295b-cf7c-4086-8ca7-3524e70d396e.png?width=1034&height=1034' }
    ];

    return (
        <>
        <h2 className=' text-center font- text-4xl md:text-6xl !-mt-36'>Gallery From The Bar</h2>
        <div className=" mt-10 flex items-center justify-center">
          <div className="border-gray-700 border container mx-auto w-screen h-400 flex items-center">
            {items.map((item, index) => (
               <div key={index} className=" item relative flex-grow flex items-center justify-center" data-order={index + 1}>
              <Link href="/order"
              onClick={handleResetMouse}
              
              onMouseEnter={() => {
                setCursorText("Order");
                setCursorVariant("viewContent");
              }}
              onMouseLeave={() => {
                setCursorText("");
                setCursorVariant("default");
              }}><img src={item.imageUrl} alt={item.title} className="rounded-lg absolute inset-0 w-full h-full object-cover z-10" /></Link>
                  <div className="z-20 text-white"><p className='text-white text-center font-bold text-3xl'>{item.title}</p></div>
              </div>
            ))}
          </div>
        </div>
        </>
    );
}
