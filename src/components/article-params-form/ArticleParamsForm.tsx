import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleOutsideClick = (event: MouseEvent): void => {
      const panel = panelRef.current;
      const { target } = event;

      if (!panel || !(target instanceof Node)) return;
      if (panel.contains(target) || panel.previousElementSibling?.contains(target)) {
        return;
      }

      setIsSidebarOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const handleToggle = (): void => {
    setIsSidebarOpen((previousIsSidebarOpen) => !previousIsSidebarOpen);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onApply(formState);
  };

  const handleReset = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isSidebarOpen} onClick={handleToggle} />
      <aside
        ref={panelRef}
        className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(fontFamilyOption) =>
              setFormState((previousState) => ({ ...previousState, fontFamilyOption }))
            }
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(fontSizeOption) =>
              setFormState((previousState) => ({ ...previousState, fontSizeOption }))
            }
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(fontColor) =>
              setFormState((previousState) => ({ ...previousState, fontColor }))
            }
          />
          <div className={styles.separator}>
            <Separator />
          </div>
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(backgroundColor) =>
              setFormState((previousState) => ({ ...previousState, backgroundColor }))
            }
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(contentWidth) =>
              setFormState((previousState) => ({ ...previousState, contentWidth }))
            }
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
