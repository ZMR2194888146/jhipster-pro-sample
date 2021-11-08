import { Component, Inject, Prop, Vue, Ref } from 'vue-property-decorator';
import { IUser, User } from '@/shared/model/system/user.model';
import UserService from './user.service';
import { IDepartment } from '@/shared/model/settings/department.model';
import DepartmentService from '@/entities/settings/department/department.service';
import { IPosition } from '@/shared/model/settings/position.model';
import PositionService from '@/entities/settings/position/position.service';
import { AxiosResponse } from 'axios';
import { getFilter, getSearchQueryData, removeBlankChildren } from '@/utils/entity-utils';

@Component
export default class UserComponent extends Vue {
  @Inject('userService') private userService: () => UserService;
  @Inject('departmentService') private departmentService!: () => DepartmentService;
  @Inject('positionService') private positionService!: () => PositionService;
  @Ref('searchInput') public searchInput: any;
  @Ref('xGrid') public xGrid: any;
  public searchFormConfig = {
    fieldList: [],
    toggleSearchStatus: false,
    matchType: 'and',
  };
  public xGridData: any[] = [];
  public xGridColumns: any[] = [];
  public xGridTableToolbars = {
    perfect: true,
    custom: true,
    slots: {
      buttons: 'toolbar_buttons',
    },
  };
  public xGridTreeConfig: boolean | Object = false;
  public xGridSelectRecords: any[] = [];
  private loading: boolean = false;
  public relationshipsData: any = {};
  public xGridPagerConfig = {
    layouts: ['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total'],
    pageSize: 15,
    pageSizes: [5, 10, 15, 20, 30, 50],
    total: 0,
    pagerCount: 5,
    currentPage: 1,
  };
  public xGridSortConfig = {
    trigger: 'default',
    defaultSort: {
      field: 'id',
      order: 'asc',
    },
  };

  public xGridFilterConfig = {
    remote: true,
  };

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public filterTreeSpan = 0;

  @Prop(Object) otherPresetOrder: { [key: string]: any } | undefined;
  public treeFilterData: any[] = [];
  public expandedKeys: any[] = [];
  public autoExpandParent = true;
  public checkedKeys: any[] = [];
  public selectedKeys: any[] = [];
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
  @Prop(Boolean) showInOther;
  public editInModal = false;
  public updateModalVisible: boolean = false;
  public userId = null;
  public clickUserId = null;
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

  handleToggleSearch() {
    this.searchFormConfig.toggleSearchStatus = !this.searchFormConfig.toggleSearchStatus;
  }

  public formSearch(): void {
    this.loading = true;
    const paginationQuery = {
      page: 0,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: getSearchQueryData(this.searchFormConfig),
    };
    this.userService()
      .retrieve(paginationQuery)
      .then(res => {
        this.xGridData = res.data;
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
        this.loading = false;
      })
      .catch(err => {
        this.$message.error(err.message);
        this.loading = false;
      });
  }

  public loadAll(): void {
    this.loading = true;

    const paginationQuery = {
      listModelName: 'User',
      page: this.xGridPagerConfig.currentPage - 1,
      size: this.xGridPagerConfig.pageSize,
      sort: this.sort(),
      filter: getFilter(this.searchValue, this.mapOfFilter),
    };
    this.userService()
      .retrieve(paginationQuery)
      .then(res => {
        this.xGridData = res.data;
        this.xGridPagerConfig.total = Number(res.headers['x-total-count']);
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
        this.$message.success('删除成功');
        this.loadAll();
      })
      .catch(err => this.$message.error(err.message));
  }

  public sort(): Array<any> {
    const result: any[] = [];
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

  public editEntity(row: IUser): void {
    if (this.showInOther || this.editInModal) {
      this.userId = row.id;
      this.updateModalVisible = true;
    } else {
      this.$router.push({ path: row.id + '/edit', append: true });
    }
  }

  filterByColumn(fieldName: string, filterValue: string[]) {
    this.mapOfFilter[fieldName].value = filterValue;
    this.loadAll();
  }

  getFilterTest() {
    const result: { [key: string]: any } = {};
    if (this.searchValue) {
      result['jhiCommonSearchKeywords'] = this.searchValue;
      return result;
    }
    Object.keys(this.mapOfFilter).forEach(key => {
      const filterResult: any[] = [];
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

  public updateModalCancel(e: any) {
    this.userId = null;
    this.updateModalVisible = false;
    this.loadAll();
  }

  public newEntity(): void {
    if (this.showInOther || this.editInModal) {
      this.updateModalVisible = true;
    } else {
      this.$router.push({ path: 'new', append: true });
    }
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

  public editClosedEvent({ row, column }) {
    let field = column.property;
    let cellValue = row[field];
    // 判断单元格值是否被修改
    if (this.xGrid.isUpdateByRow(row, field)) {
      const entity = { id: row.id };
      entity[field] = cellValue;
      this.userService()
        .updateBySpecifiedField(entity, field)
        .then(res => {
          this.$message.success({
            content: `信息更新成功。 ${field}=${cellValue}`,
            duration: 1,
          });
          this.xGrid.reloadRow(row, null, field);
        })
        .catch(error => {
          this.$message.error({
            content: `信息保存可能存在问题！ ${field}=${cellValue}`,
            onClose: () => {},
          });
        });
    }
  }

  public xGridCheckboxChangeEvent() {
    this.xGridSelectRecords = this.xGrid.getCheckboxRecords();
  }

  public changeEvent(e: any) {
    console.log(e);
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
        this.generateColumns();
      })
      .catch(error => {
        this.loading = false;
        this.$message.error({
          content: `数据获取失败`,
          onClose: () => {},
        });
      });
  }

  public xGridPageChange({ currentPage, pageSize }) {
    this.xGridPagerConfig.currentPage = currentPage;
    this.xGridPagerConfig.pageSize = pageSize;
    this.loadAll();
  }

  public xGridSortChange({ property, order }) {
    this.mapOfSort = {};
    this.mapOfSort[property] = order;
    this.loadAll();
  }

  public xGridFilterChange({ column, property, values, datas, filters, $event }) {
    const type = column.params ? column.params.type : '';
    var tempValues;
    if (type === 'STRING') {
      tempValues = datas[0];
    } else if (type === 'INTEGER' || type === 'LONG' || type === 'DOUBLE' || type === 'FLOAT' || type === 'ZONED_DATE_TIME') {
      tempValues = datas[0];
    } else if (type === 'BOOLEAN') {
      tempValues = values;
    }
    this.mapOfFilter[property] = { value: tempValues, type: type };
    this.loadAll();
  }

  public switchFilterTree() {
    this.filterTreeSpan = this.filterTreeSpan > 0 ? 0 : 6;
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
      title: '账户名',
      field: 'login',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '密码',
      field: 'password',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '名字',
      field: 'firstName',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '姓氏',
      field: 'lastName',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '电子邮箱',
      field: 'email',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '手机号码',
      field: 'mobile',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '生日',
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
      title: '激活状态',
      field: 'activated',
      minWidth: 70,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'BOOLEAN' },
      editRender: { name: 'ASwitch', type: 'visible', events: { change: this.changeEvent } },
      filters: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    });
    this.xGridColumns.push({
      title: '语言Key',
      field: 'langKey',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '头像地址',
      field: 'imageUrl',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '激活Key',
      field: 'activationKey',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '重置码',
      field: 'resetKey',
      minWidth: 160,
      treeNode: false,
      sortable: true,
      remoteSort: true,
      params: { type: 'STRING' },
      editRender: { name: 'AInput', events: { change: this.changeEvent, pressEnter: this.changeEvent } },
      filters: [{ data: '' }],
      filterRender: { name: 'AInput', props: { placeholder: '请输入包含字符' } },
    });
    this.xGridColumns.push({
      title: '部门',
      field: 'department.id',
      minWidth: 120,
      editRender: { name: 'ASelectListModal', options: this.relationshipsData['departments'], optionProps: { value: 'id', label: 'name' } },
    });
    this.xGridColumns.push({
      title: '岗位',
      field: 'position.id',
      minWidth: 120,
      editRender: { name: 'ASelectListModal', options: this.relationshipsData['positions'], optionProps: { value: 'id', label: 'name' } },
    });
    this.xGridColumns.push({ title: '操作', field: 'operation', fixed: 'right', width: 140, slots: { default: 'recordAction' } });
  }
}
