import React, { useState } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from 'react-share';
import MainActionBtn from './MainActionBtn';
import DropDown from '../DropDown/DropDown';
import './index.css'

const ShareBtn = ({ url }) => {
    const [show, setShow] = useState(false);

    const buttons = [
        { Component: FacebookShareButton, key: 'facebook', logoColor: 'text-blue-600' },
        { Component: TwitterShareButton, key: 'twitter', logoColor: 'text-sky-500' },
        { Component: WhatsappShareButton, key: 'whatsapp', logoColor: 'text-green-500' },
        { Component: LinkedinShareButton, key: 'linkedin', logoColor: 'text-blue-800' },
    ];

    const text = 'Check out this amazing poll!';

    return (
        <DropDown
            showDropDown={show}
            setShowDropdown={setShow}
            Btn={<MainActionBtn icon={<ion-icon name="paper-plane"></ion-icon>} title='Share' onClick={() => setShow(!show)} />}
            dropDownElm={
                <div className="absolute bottom-10 md:bottom-12 right-0 flex gap-3 bg-white shadow-[0_0px_6px_2px_rgba(0,0,0,0.3)] rounded-lg py-2 px-3 md:px-5 z-10">
                    {buttons.map(({ Component, Icon, key, logoColor }, index) => (
                        <span className="up-down flex" style={{ animationDelay: `${index * 0.1}s` }} key={key} title={`Share on ${key}`}>
                            <Component url={url} title='Checkout this amazing poll'>
                                <span className={`text-xl md:text-3xl flex ${logoColor}`}><ion-icon name={`logo-${key}`}></ion-icon></span>
                            </Component>
                        </span>
                    ))}
                </div>
            }
            className='flex-grow'
        />
    );
};

export default ShareBtn;

