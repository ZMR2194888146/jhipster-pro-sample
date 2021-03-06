import { Component, Vue, Inject, Prop, Watch } from 'vue-property-decorator';
import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';
import { IAnnouncementRecord, AnnouncementRecord } from '@/shared/model/system/announcement-record.model';
import AnnouncementRecordService from './announcement-record.service';

const validations: any = {
  announcementRecord: {
    id: {},
    anntId: {},
    userId: {},
    hasRead: {},
    readTime: {},
  },
};

@Component({
  validations,
  components: {},
})
export default class AnnouncementRecordUpdateTemplate extends Vue {
  @Inject('announcementRecordService') private announcementRecordService: () => AnnouncementRecordService;
  public announcementRecord: IAnnouncementRecord = new AnnouncementRecord();
  public isSaving = false;
  public loading = false;
  public formJsonData = {
    list: [],
    config: {
      layout: 'horizontal',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      hideRequiredMark: false,
      customStyle: '',
    },
  };
  public dataFormContent = [];
  public announcementRecordId = null;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.announcementRecordId) {
        vm.retrieveAnnouncementRecord(to.params.announcementRecordId);
      }
    });
  }
  created(): void {}

  public mounted(): void {}

  public save(): void {
    this.isSaving = true;
    if (this.announcementRecord.id) {
      this.announcementRecordService()
        .update(this.announcementRecord)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.announcementRecord.updated', { param: param.id }).toString();
          this.$message.info(message);
          this.$router.go(-1);
        });
    } else {
      this.announcementRecordService()
        .create(this.announcementRecord)
        .then(param => {
          this.isSaving = false;
          const message = this.$t('lwjsApp.announcementRecord.created', { param: param.id }).toString();
          this.$message.success(message);
          this.$router.go(-1);
        });
    }
  }

  public retrieveAnnouncementRecord(announcementRecordId): void {
    this.announcementRecordService()
      .find(announcementRecordId)
      .then(res => {
        this.announcementRecord = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  // ??????????????????????????????????????????????????????????????????????????????????????????
  public toTreeNode(items: any, valueFieldName: string, labelFieldName: string, currentId?: any, disabledParent: boolean = false) {
    const nzTreeNode = [];
    if (!items) {
      return nzTreeNode;
    }
    items.forEach(item => {
      let disabledChildren = false;
      const option = {
        value: item[valueFieldName],
        label: item[labelFieldName],
        disabled: disabledParent, // ????????????????????????????????????????????????????????????
        children: undefined,
      };
      if (item[valueFieldName] === currentId) {
        option.disabled = true;
        disabledChildren = true;
      }
      if (item.children && item.children.length > 0) {
        option.children = this.toTreeNode(item.children, valueFieldName, labelFieldName, currentId, disabledChildren);
      }
      nzTreeNode.push(option);
    });
    console.log(nzTreeNode);
    return nzTreeNode;
  }
}
