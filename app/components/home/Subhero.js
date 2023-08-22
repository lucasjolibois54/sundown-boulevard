import React from 'react';

export default function Subhero() {

    const items = [
        { title: 'Title 1', imageUrl: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80' },
        { title: 'Title 2', imageUrl: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80' },
        { title: 'Title 3', imageUrl: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80' }
    ];

    return (
        <div className="bg-bgColorDark min-h-screen flex items-center justify-center">
          <div className="border-gray-700 border container mx-auto w-screen h-400 flex items-center">
            {items.map((item, index) => (
              <div key={index} className="item relative flex-grow flex items-center justify-center" data-order={index + 1}>
                  <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover z-10" />
                  <div className="z-20 text-white">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
    );
}
