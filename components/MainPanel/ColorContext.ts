import React from 'react';

export const ColorContext = React.createContext({
    color: '',
    setColor: (color: string) => {
    },
});