import type { ApplicationSettings } from '@/entities/settings';
import type { FormEvent } from 'react';

import { useEffect, useState } from 'react';

import { MESSAGE_TYPES } from '@/external/message-type';
import { useAppContext } from '@/shared/lib/contexts';
import { Button, Checkbox, Form, FormTitle } from '@/shared/ui/components';

import { CustomProjectInput } from './custom-project-input';
import { LinkedCheckbox } from './linked-checkbox';

export const SettingsForm = () => {
  const [settings, setSettings] = useState<ApplicationSettings>({
    customField: 'Status',
    includeLabels: true,
    includeMilestone: false,
    includeComments: false,
    includeLinking: false,
  });

  const { applicationSettings, setApplicationSettings } = useAppContext();

  useEffect(() => {
    if (applicationSettings) {
      setSettings(applicationSettings);
    }
  }, [applicationSettings]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setApplicationSettings(settings);
    parent.postMessage(
      {
        pluginMessage: {
          type: MESSAGE_TYPES.SEND_GITHUB_SETTINGS,
          data: {
            settings: { ...settings },
          },
        },
      },
      '*'
    );
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        footer={
          <Button type="submit" size="large" appearance="primary">
            Save Settings
          </Button>
        }
      >
        <FormTitle text="Settings" />
        <CustomProjectInput
          value={settings.customField}
          onChange={({ target }) => setSettings({ ...settings, customField: target.value })}
          label={"Project's custom field"}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Checkbox
            size="medium"
            label={'Include labels'}
            checked={settings.includeLabels}
            onChange={({ target }) => setSettings({ ...settings, includeLabels: target.checked })}
          />
          <Checkbox
            size="medium"
            label={'Include comments'}
            checked={settings.includeComments}
            onChange={({ target }) => setSettings({ ...settings, includeComments: target.checked })}
          />
          <Checkbox
            size="medium"
            label={'Include milestone'}
            checked={settings.includeMilestone}
            onChange={({ target }) =>
              setSettings({ ...settings, includeMilestone: target.checked })
            }
          />
          <LinkedCheckbox
            label={'Include linking between PR and Issues'}
            checked={settings.includeLinking}
            onChange={({ target }) => setSettings({ ...settings, includeLinking: target.checked })}
          />
        </div>
      </Form>
    </div>
  );
};
