/*
This component has two roles:
1. Render a locale dropdown. When a visitor selects a locale, 
   (a) the current path is reloaded with the selected locale, and
   (b) the Stackbit editor (if running within it) is notified, so it can update its own switch.
2. Listen to locale changes in the Stackbit visual editor, and reload the page accordingly.

This bi-di integration with Stackbit is *optional*, but provides extra convenience for content editors.
*/
import localization from '../utils/localization';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useRef } from 'react';

export const LocaleSwitcher = ({ pageLocale }) => {
  const router = useRouter();
  // When notifying Stackbit of a change, it will fire an event back - which should be ignored
  const selfTriggeredSwitch = useRef(false);

  // Listen to locale changes in the Stackbit editor
  useEffect(() => {
    const handler = (event) => {
      if (selfTriggeredSwitch.current) {
        selfTriggeredSwitch.current = false;
        return;
      }

      const locale = event?.detail?.locale;
      if (!locale) return;

      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale });
    };
    window.addEventListener('stackbitLocaleChanged', handler);
    return () => {
      window.removeEventListener('stackbitLocaleChanged', handler);
    };
  }, [router]);

  // On user selection in the dropdown
  const onInputSelect = (e) => {
    const locale = e.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale });

    selfTriggeredSwitch.current = true;
    window.stackbit?.setLocale(locale); // Notify Stackbit editor
  };

  return (
    <div>
      <div className="inline-block relative">
        <select
          value={pageLocale}
          onChange={onInputSelect}
          className="bg-inherit text-inherit appearance-none w-full pr-8 outline-none text-right"
        >
          {localization.locales.map((lang) => {
            return (
              <option value={lang} key={lang}>
                {lang}
              </option>
            );
          })}
        </select>
        <ChevronDown />
      </div>
    </div>
  );
};

const ChevronDown = () => {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  );
};
