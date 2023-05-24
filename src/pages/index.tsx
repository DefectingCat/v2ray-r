import { invoke } from '@tauri-apps/api/tauri';
import { Button, Input, message } from 'antd';
import Title from 'components/pages/page-title';
import MainLayout from 'layouts/main-layout';
import { ChangeEventHandler, useState } from 'react';
import { URL_VALID } from 'utils/consts';

function App() {
  // Add subscripition
  const [subscripition, setSubscripiton] = useState('');
  const [status, setStatus] = useState<'' | 'error'>('');
  const handleSub: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    const valid = URL_VALID.test(value);
    setStatus(!subscripition ? '' : valid ? '' : 'error');
    setSubscripiton(value);
  };
  // Send request
  const [loading, setLoading] = useState(false);
  const handlAdd = async () => {
    try {
      setLoading(true);
      await invoke('add_subscription', { url: subscripition });
      message.success('Add subscripition success');
    } catch (err) {
      console.error(err);
      message.error(`Failed to add subscripition ${err?.toString()}`);
    } finally {
      setLoading(false);
      setStatus('');
      setSubscripiton('');
    }
  };

  return (
    <>
      <MainLayout>
        <div className="mt-1 mb-4">
          <Title>Proxies</Title>
        </div>

        <div>
          <Title.h2>Subscription</Title.h2>
          <div className="flex items-center">
            <div className="flex items-center  mr-2">
              <div className="mr-2">URL</div>
              <div className="relative">
                <Input
                  value={subscripition}
                  onChange={handleSub}
                  allowClear
                  placeholder="Subscription url"
                  status={status}
                  disabled={loading}
                />
              </div>
            </div>
            <Button
              disabled={!subscripition || status === 'error'}
              onClick={handlAdd}
              className="mr-2"
              loading={loading}
            >
              Add
            </Button>
            <Button
              onClick={async () => {
                console.log(await invoke('get_config'));
              }}
            >
              Update All
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default App;
