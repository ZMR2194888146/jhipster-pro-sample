/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import DepartmentAuthorityDetailComponent from '@/entities/settings/department-authority/department-authority-details.vue';
import DepartmentAuthorityClass from '@/entities/settings/department-authority/department-authority-details.component';
import DepartmentAuthorityService from '@/entities/settings/department-authority/department-authority.service';
import store from '@/store';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('DepartmentAuthority Management Detail Component', () => {
    let wrapper: Wrapper<DepartmentAuthorityClass>;
    let comp: DepartmentAuthorityClass;
    let departmentAuthorityServiceStub: SinonStubbedInstance<DepartmentAuthorityService>;

    beforeEach(() => {
      departmentAuthorityServiceStub = sinon.createStubInstance<DepartmentAuthorityService>(DepartmentAuthorityService);

      wrapper = shallowMount<DepartmentAuthorityClass>(DepartmentAuthorityDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { departmentAuthorityService: () => departmentAuthorityServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundDepartmentAuthority = { id: 123 };
        // @ts-ignore
        departmentAuthorityServiceStub.find.resolves(foundDepartmentAuthority);

        // WHEN
        comp.retrieveDepartmentAuthority(123);
        await comp.$nextTick();

        // THEN
        expect(comp.departmentAuthority).toBe(foundDepartmentAuthority);
      });
    });
  });
});
