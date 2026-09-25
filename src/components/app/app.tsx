import { contentWidthArr, defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps.ts';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [articleState, setArticleState] =
    useState<ArticleStateType>(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--image-width':
            articleState.contentWidth.value === contentWidthArr[0].value
              ? '1600px'
              : articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApply={setArticleState} />
      <Article />
    </main>
  );
};
