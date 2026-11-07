'use client';
import * as React from 'react';

type CardContextValue = {
  href?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const CardContext = React.createContext<CardContextValue | null>(null);

const useCardContext = () => {
  const context = React.useContext(CardContext);

  if (context === null) {
    throw new Error('useCardContext must be used within a Card');
  }
  return context;
};

const CardContextProvider = CardContext.Provider;

export { CardContextProvider, useCardContext };
