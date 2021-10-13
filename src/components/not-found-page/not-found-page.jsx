import React from 'react';
import {Link} from 'react-router-dom';

import {LocalPath} from '../../constants/local-path';

const NotFoundPage = () => {
  return <>
    <main className="not-found-page">
      <h1>Страница не найдена</h1>
      <Link className="page-link" to={LocalPath.INDEX}>Вернуться на главную страницу</Link>
    </main>
  </>;
};

export {NotFoundPage};
