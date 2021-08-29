import { createContext, useContext, useState } from 'react';

import { IArticle } from '../types/general';

type ArticlesState = {
  articles: IArticle[];
  setArticles: (data: IArticle[]) => void;
};

type ArticlesContextProviderProps = {
  children: React.ReactNode;
};

const ArticlesContext = createContext<ArticlesState | undefined>(undefined);

const ArticlesContextProvider = ({
  children,
}: ArticlesContextProviderProps): JSX.Element => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  return (
    <ArticlesContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

const useArticlesContext = (): ArticlesState => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error(
      'useArticlesContext must be used within an ArticlesContextProvider'
    );
  }
  return context;
};

export { ArticlesContextProvider, useArticlesContext };
