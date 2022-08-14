import React, { useContext } from 'react';
import { i18nContext } from '@docs/utils/i18n';
import logo from '@docs/../assets/logo.png';
import { useHistory } from 'react-router-dom';
import { Button } from '🦄';
import './styles.scss';

const Home: React.FC = () => {
  const i18n = useContext(i18nContext);
  const history = useHistory();

  return (
    <div
      style={{
        textAlign: 'center',
      }}
      className="homepage"
    >
      <main>
        <img src={logo} alt="logo" />
        <div>
          <h2>Strawberry Farm</h2>
          <p>{i18n['🗺️IndexPageDesc']}</p>
          <div>
            <Button
              primary
              style={{ transform: 'scale(1.5)', marginTop: 24, width: 240 }}
              onClick={() => history.push('/docs')}
            >
              {i18n['🗺️IndexPageGetStarted']}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
