import { Component, Inject, Prop, Ref, Vue } from 'vue-property-decorator';
import { IUser, User } from '@/shared/model/system/user.model';

import UserService from './user.service';
import { IDepartment } from '@/shared/model/settings/department.model';
import DepartmentService from '@/entities/settings/department/department.service';
import { IPosition } from '@/shared/model/settings/position.model';
import PositionService from '@/entities/settings/position/position.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';

@Component
export default class UserCompactComponent extends Vue {
  @Inject('userService') private userService: () => UserService;
  @Inject('departmentService') private departmentService: () => DepartmentService;
  @Inject('positionService') private positionService: () => PositionService;
  @Ref() public searchInput;
  @Ref('xGridCompact') public xGridCompact;
  public xGridData = [];
  public xGridColumns = [];
  public xGridTableToolbars = {
    perfect: true,
    zoom: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons',
    },
  };
  public xGridCheckboxConfig = {
    labelField: 'id',
  };
  public xGridRadioConfig = {
    labelField: 'id',
  };
  public xGridRadioSelectRecord = null;
  public xGridSelectRecords = [];
  private loading: boolean = false;
  public relationshipsData: any = {};
  public xGridPagerConfig = {
    layouts: ['PrevPage', 'NextPage', 'Sizes', 'Total'],
    pageSize: 15,
    pageSizes: [5, 10, 15, 20, 30, 50],
    total: 0,
    pagerCount: 5,
    currentPage: 1,
  };

  @Prop(Boolean) showInOther;

  // @Ref('dataGrid') public dataGrid
  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public filterTreeSpan = 0;
  public dataTableColumns = [];
  public dataTableParams = {
    Status: 1,
    PageSize: 5,
  };
  public dataTableProps = {
    bordered: true,
  };
  public dataTableEventConfig = {
    tabToActive: true, //Tab?????????????????????????????????
    enterToActive: true, //???????????????????????????????????????
    rightArrowToActive: true, //?????????????????????????????????????????????
    leftArrowToActive: true, //?????????????????????????????????????????????
    upArrowToActive: true, //?????????????????????????????????????????????
    downArrowToActive: true, //?????????????????????????????????????????????
    resizeableColumn: false, //??????????????????,??????true?????????column??????????????????????????????????????????width:100
  };
  @Prop(Object) otherPresetOrder: { [key: string]: any };
  @Prop() rowIdName;
  @Prop(String) commonTableName;
  @Prop() selectIds;
  @Prop() selectModel;
  public treeFilterData = [];
  public expandedKeys = [];
  public autoExpandParent = true;
  public checkedKeys = [];
  public selectedKeys = [];
  public mapOfSort: { [key: string]: any } = {};
  public reverse = false;
  public totalItems = 0;
  public omitFields = ['id'];
  public users: IUser[] = [];
  public mapOfFilter: { [key: string]: any } = {
    department: { list: [], value: [], type: 'many-to-one' },
    position: { list: [], value: [], type: 'many-to-one' },
  };
  public editStatus: { [key: string]: any } = {};
  public isFetching = false;
  public searchValue = '';
  departments: IDepartment[];
  positions: IPosition[];

  public created(): void {
    this.initRelationships();
  }

  public mounted(): void {
    this.loadAll();
  }

  public clear(): void {
    this.xGridPagerConfig.currentPage = 1;
    this.loadAll();
  }
  public loadAll(): void {
    this.loading = true;

    const paginationQuery = {
      page: this.xGridPagerConfig.currentPage - 1,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: this.getFilter(),
    };
    this.userService()
      .retrieve(paginationQuery)
      .then(res => {
        this.xGridData = res.data;
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
        if (this.xGridSelectType === 'checkbox') {
          if (Array.isArray(this.selectIds) && this.selectIds.length > 0) {
            this.$nextTick(() => {
              const rows = [];
              this.selectIds.forEach(id => {
                rows.push(this.xGridCompact.getRowById(id));
              });
              this.xGridCompact.setCheckboxRow(rows, true);
              this.xGridSelectRecords = this.xGridCompact.getCheckboxRecords();
            });
          }
        } else {
          if (this.selectIds) {
            this.$nextTick(() => {
              this.xGridCompact.setRadioRow(this.xGridCompact.getRowById(this.selectIds));
              this.xGridRadioSelectRecord = this.xGridCompact.getRadioRecord();
            });
          }
        }
        this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        this.loading = false;
      });
  }

  public prepareRemove(instance: IUser): void {
    this.removeId = instance.id;
  }

  public removeById(removeId: number): void {
    this.userService()
      .delete(removeId)
      .then((res: AxiosResponse) => {
        const message = this.$t('lwjsApp.systemUser.deleted', { param: this.removeId }).toString();
        this.$message.success(message);
        this.loadAll();
      });
  }
  public removeByIds(ids: number[]) {
    this.userService()
      .deleteByIds(ids)
      .then((res: AxiosResponse) => {
        this.$message.success('????????????');
        this.loadAll();
      })
      .catch(err => this.$message.error(err.message));
  }

  public sort(): Array<any> {
    const result = [];
    Object.keys(this.mapOfSort).forEach(key => {
      if (this.mapOfSort[key] && this.mapOfSort[key] !== false) {
        if (this.mapOfSort[key] === 'asc') {
          result.push(key + ',asc');
        } else if (this.mapOfSort[key] === 'desc') {
          result.push(key + ',desc');
        }
      }
    });
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.loadAll();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  handleTableChange(pagination, filters, sorter) {
    if (sorter && sorter.columnKey) {
      this.propOrder = sorter.columnKey;
      this.reverse = sorter.order === 'ascend';
    } else {
      this.propOrder = 'id';
      this.reverse = false;
    }
    Object.keys(filters).forEach(key => {
      this.mapOfFilter[key].value = filters[key];
    });
    this.page = pagination.current;
    this.loadAll();
  }

  filterByColumn(fieldName: string, filterValue: string[]) {
    this.mapOfFilter[fieldName].value = filterValue;
    this.loadAll();
  }
  getFilter() {
    const result: { [key: string]: any } = {};
    if (this.searchValue) {
      result['jhiCommonSearchKeywords'] = this.searchValue;
      return result;
    }
    Object.keys(this.mapOfFilter).forEach(key => {
      const filterResult = [];
      if (this.mapOfFilter[key].type === 'Enum') {
        this.mapOfFilter[key].value.forEach(value => {
          filterResult.push(value);
        });
        result[key + '.in'] = filterResult;
      }
      if (['one-to-one', 'many-to-many', 'many-to-one', 'one-to-many'].includes(this.mapOfFilter[key].type)) {
        this.mapOfFilter[key].value.forEach(value => {
          filterResult.push(value);
        });
        result[key + 'Id.in'] = filterResult;
      }
    });
    return result;
  }

  cancelEdit(id: string): void {
    this.loadAll();
  }

  emitEmpty() {
    this.searchInput.focus();
    this.searchValue = '';
  }

  public newEntity(): void {
    this.$router.push({ path: 'new', append: true });
  }

  public onExpand(expandedKeys) {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.expandedKeys = expandedKeys;
    this.autoExpandParent = false;
  }
  public onCheck(checkedKeys) {
    console.log('onCheck', checkedKeys);
    this.checkedKeys = checkedKeys;
  }
  public onSelect(selectedKeys, info) {
    console.log('onSelect', info);
    console.log('record', info.node.record);
    const filterData = info.node.dataRef;
    if (filterData.type === 'filterGroup') {
      this.mapOfFilter[info.node.dataRef.key].value = [];
    } else if (filterData.type === 'filterItem') {
      this.mapOfFilter[info.node.dataRef.filterName].value = [info.node.dataRef.filterValue];
    }
    this.loadAll();
    this.selectedKeys = selectedKeys;
  }

  public initRelationships(): void {
    this.loading = true;
    Promise.all([this.departmentService().tree(), this.positionService().retrieve()])
      .then(([departments, positions]) => {
        this.relationshipsData['departments'] = departments.data;
        this.relationshipsData['positions'] = positions.data;
        const listOfFilterdepartment = departments.data.slice(0, departments.data.length > 8 ? 7 : departments.data.length - 1);
        this.mapOfFilter.department = { list: listOfFilterdepartment, value: [], type: 'many-to-one' };
        const listOfFilterposition = positions.data.slice(0, positions.data.length > 8 ? 7 : positions.data.length - 1);
        this.mapOfFilter.position = { list: listOfFilterposition, value: [], type: 'many-to-one' };
      })
      .catch(error => {
        this.loading = false;
        this.$message.error({
          content: `??????????????????`,
          onClose: () => {},
        });
      });
  }

  public changeEvent(e) {
    console.log(e);
  }

  public xGridPageChange({ currentPage, pageSize }) {
    this.xGridPagerConfig.currentPage = currentPage;
    this.xGridPagerConfig.pageSize = pageSize;
    this.loadAll();
  }

  public handleCancel() {
    this.$emit('cancel');
  }

  public handleOK() {
    if (this.xGridSelectType === 'checkbox') {
      this.$emit('ok', this.xGridSelectRecords);
    } else {
      this.$emit('ok', this.xGridRadioSelectRecord);
    }
  }

  public xGridCheckboxChangeEvent() {
    this.xGridSelectRecords = this.xGridCompact.getCheckboxRecords();
  }

  get xGridSelectType() {
    if (this.selectModel !== 'multiple') {
      return 'radio';
    } else {
      return 'checkbox';
    }
  }

  public xGridRadioChangeEvent() {
    this.xGridRadioSelectRecord = this.xGridCompact.getRadioRecord();
  }

  private generateColumns() {
    this.xGridColumns.push({ type: 'checkbox', width: 60 });
    this.xGridColumns.push({
      title: 'ID',
      field: 'id',
      minWidth: 80,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'LONG' },
      editRender: { name: 'AInputNumber', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: [0, 100] }],
      filterRender: { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } },
    });
    this.xGridColumns.push({
      title: '?????????',
      field: 'login',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'password',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'firstName',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'lastName',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '????????????',
      field: 'email',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '????????????',
      field: 'mobile',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'birthday',
      minWidth: 140,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'ZONED_DATE_TIME' },
      editRender: {
        name: 'ADatePicker',
        props: { type: 'date', format: 'YYYY-MM-DD hh:mm:ss' },
        events: { ok: this.changeEvent, change: this.changeEvent },
      },
      filters: [{ data: [] }],
      filterRender: { name: 'AARangePicker' },
    });
    this.xGridColumns.push({
      title: '????????????',
      field: 'activated',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '???', value: true },
        { label: '???', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '??????Key',
      field: 'langKey',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '????????????',
      field: 'imageUrl',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????Key',
      field: 'activationKey',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '?????????',
      field: 'resetKey',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '?????????????????????' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'department.id',
      minWidth: 120,
      editRender: { name: 'ASelectListModal', options: this.relationshipsData['departments'], optionProps: { value: 'id', label: 'name' } },
    });
    this.xGridColumns.push({
      title: '??????',
      field: 'position.id',
      minWidth: 120,
      editRender: { name: 'ASelectListModal', options: this.relationshipsData['positions'], optionProps: { value: 'id', label: 'name' } },
    });
    this.xGridColumns.push({ title: '??????', field: 'operation', fixed: 'right', width: 140, slots: { default: 'recordAction' } });
  }
}
