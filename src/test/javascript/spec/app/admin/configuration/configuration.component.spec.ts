import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import Configuration from '@/admin/configuration/configuration.vue';
import ConfigurationClass from '@/admin/configuration/configuration.component';
import ConfigurationService from '@/admin/configuration/configuration.service';
import store from '@/store';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('Configuration Component', () => {
  let wrapper: Wrapper<ConfigurationClass>;
  let configuration: ConfigurationClass;

  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        data: {
          contexts: [{ beans: [{ prefix: 'A' }, { prefix: 'B' }] }],
          propertySources: [{ properties: { key1: { value: 'value' } } }],
        },
      })
    );
    wrapper = shallowMount<ConfigurationClass>(Configuration, {
      store,
      i18n,
      localVue,
      provide: { configurationService: () => new ConfigurationService() },
    });
    configuration = wrapper.vm;
  });

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  describe('OnRouteEnter', () => {
    it('should set all default values correctly', () => {
      expect(configuration.configKeys).toEqual([]);
      expect(configuration.filtered).toBe('');
      expect(configuration.orderProp).toBe('prefix');
      expect(configuration.reverse).toBe(false);
    });
    it('Should call load all on init', async () => {
      // WHEN
      configuration.init();
      await configuration.$nextTick();

      // THEN
      expect(mockedAxios.get).toHaveBeenCalledWith('management/env');
      expect(mockedAxios.get).toHaveBeenCalledWith('management/configprops');
    });
  });
  describe('keys method', () => {
    it('should return the keys of an Object', () => {
      // GIVEN
      const data = {
        key1: 'test',
        key2: 'test2',
      };

      // THEN
      expect(configuration.keys(data)).toEqual(['key1', 'key2']);
      expect(configuration.keys(undefined)).toEqual([]);
    });
  });
});
