/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import DepartmentComponent from '@/entities/settings/department/department.vue';
import DepartmentClass from '@/entities/settings/department/department.component';
import DepartmentService from '@/entities/settings/department/department.service';
import store from '@/store';
const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
  },
};

describe('Component Tests', () => {
  describe('Department Management Component', () => {
    let wrapper: Wrapper<DepartmentClass>;
    let comp: DepartmentClass;
    let departmentServiceStub: SinonStubbedInstance<DepartmentService>;

    beforeEach(() => {
      departmentServiceStub = sinon.createStubInstance<DepartmentService>(DepartmentService);
      // @ts-ignore
      departmentServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<DepartmentClass>(DepartmentComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          departmentService: () => departmentServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      // @ts-ignore
      departmentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadAll();
      await comp.$nextTick();

      // THEN
      expect(departmentServiceStub.retrieve.called).toBeTruthy();
      expect(comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      // @ts-ignore
      departmentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(departmentServiceStub.retrieve.called).toBeTruthy();
      expect(comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      departmentServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(departmentServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      departmentServiceStub.retrieve.reset();
      // @ts-ignore
      departmentServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(departmentServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.departments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      // @ts-ignore
      departmentServiceStub.delete.resolves({});

      // WHEN
      comp.removeById(123);
      await comp.$nextTick();

      // THEN
      expect(departmentServiceStub.delete.called).toBeTruthy();
      expect(departmentServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
