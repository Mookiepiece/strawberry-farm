import React, { useState } from 'react';
import { useMountedState } from 'react-use';
import { Box, Button } from '🦄';

const Demo: React.FC = () => {
  const isMounted = useMountedState();
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);

    setTimeout(() => {
      isMounted() && setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Box gap={10}>
        <div>
          <Button primary solid onClick={handleLoading} loading={loading}>
            主要实心按钮
          </Button>
        </div>
        <div>
          <Button primary onClick={handleLoading} loading={loading}>
            主要按钮
          </Button>
        </div>
        <div>
          <Button onClick={handleLoading} loading={loading}>
            次级按钮
          </Button>
        </div>
        <div>
          <Button textual onClick={handleLoading} loading={loading}>
            文字按钮
          </Button>
        </div>
        <div>
          <Button primary solid block onClick={handleLoading} loading={loading}>
            块状按钮
          </Button>
        </div>
        <div>
          <Button primary block onClick={handleLoading} loading={loading}>
            块状按钮
          </Button>
        </div>
        <div>
          <Button block onClick={handleLoading} loading={loading}>
            块状按钮
          </Button>
        </div>
        <div>
          <Button textual block onClick={handleLoading} loading={loading}>
            块状按钮
          </Button>
        </div>
      </Box>
    </>
  );
};
export default Demo;
