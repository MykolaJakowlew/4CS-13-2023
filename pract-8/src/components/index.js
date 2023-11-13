import NewsItemComponent from './news-item';
import { getName } from 'country-list';
import { getLangNameFromCode } from 'language-name-map';
import './style.css';

import newsService from '../services/news.api';
import { useEffect, useState } from 'react';
import LoaderComponent from './loader';
import SelectorComponent from './selectors';
import SearchContext from '../context/search.context';

const dataSetCategories = [
  "business",
  "science",
  "sports",
  "entertainment",
  "health",
  "technology"
].map(category => ({ value: category, name: category }));

const dataSetLanguageCodes = [
  "en", "zh-Hans", "zh-Hant", "id", "cs", "uk", "he", "ar", "de", "es-419", "ja", "ko", "fr", "it", "lv", "lt", "ml", "th", "hu", "nl", "no", "pl", "pt-419", "pt-150", "ro", "sk", "sl", "sv", "vi", "tr", "el", "bg", "sr", "mr", "hi", "bn", "ta", "te"
].map(languageCode => ({
  value: languageCode,
  name: getLangNameFromCode(languageCode)?.name
  // name: getLangNameFromCode(languageCode) ? getLangNameFromCode(languageCode).name : undefined
})).filter(el => el.name);

const dataSetCountryCodes = [
  "MY", "GB", "CN", "TW", "AU", "BW", "ET", "KR", "GH", "IE", "KE", "LV", "NA", "IN", "BD", "TH", "NZ", "NG", "PK", "PH", "SG", "ZA", "TZ", "UG", "ZW", "ID", "CZ", "DE", "AT", "CH", "AR", "EG", "CL", "CO", "CU", "US", "MX", "PE", "VE", "LB", "CA", "FR", "MA", "SN", "IT", "LT", "HK", "JP", "HU", "BE", "NL", "NO", "PL", "BR", "PT", "RO", "SK", "SI", "SE", "VN", "TR", "GR", "BG", "RS", "UA", "IL", "AE", "SA",
].map(countryCode => ({ value: countryCode, name: getName(countryCode) }));

const IS_DEV = false;

function App () {

  const [newsItems, setNewsItems] = useState({ articles: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  const setSearchParamsHook = (key, value) => {
    setSearchParams((prevSearchParams) => {
      return { ...prevSearchParams, [key]: value };
    });
  };

  useEffect(() => {
    newsService.topNews({ isDev: IS_DEV })
      .then((data) => {
        setNewsItems(data);
        setIsLoaded(true);
      });
  }, []);

  const searchClick = async () => {
    const params = {
      country: searchParams.country,
      language: searchParams.language,
      category: searchParams.category
    };

    console.log(`params:`, params);

    setIsLoaded(false);
    const response = await newsService.topNews({ isDev: IS_DEV, ...params });
    // => newsService.topNews({ 
    //      isDev: IS_DEV,
    //      country: searchParams.country,
    //      language: searchParams.language,
    //      category: searchParams.category
    // });
    setNewsItems(response);
    setIsLoaded(true);
  };

  return (
    <div className="App">
      <SearchContext.Provider value={{
        searchParams: searchParams,
        setSearchParams: setSearchParamsHook
      }}>
        <header>
          <SelectorComponent
            paramKey='country'
            title='country'
            dataSet={dataSetCountryCodes}
          />
          <SelectorComponent
            paramKey='language'
            title='language'
            dataSet={dataSetLanguageCodes}
          />
          <SelectorComponent
            paramKey='category'
            title='category'
            dataSet={dataSetCategories}
          />
        </header>
        <div className='search-wrapper'>
          <button onClick={searchClick}>Search</button>
        </div>
        <div className='news-wrapper'>
          {!isLoaded && <LoaderComponent />}
          {
            newsItems.articles.map(item => {
              return <NewsItemComponent
                date={new Date(item.published_date)}
                title={item.title}
                description={item.description}
                publisher={{
                  name: item.publisher.name,
                  url: item.publisher.url
                }}
                category={item.keywords ? item.keywords[0] : ''}
                imageSrc={item.thumbnail}
                subTitle={null}
              />;
            })
          }
        </div>
      </SearchContext.Provider>
    </div >
  );
}

export default App;
